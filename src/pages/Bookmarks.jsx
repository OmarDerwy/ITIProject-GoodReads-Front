import { useEffect, useState } from "react";
import { Rating, Grid, Table, Select, Image } from "@mantine/core";
import classes from "./../styles/general/Bookmarks.module.css";
import { Link } from "react-router-dom";
import axiosInstance from "../apis/config";
import { FaRegTrashAlt } from "react-icons/fa";

const data = [
  { label: "All" },
  { label: "Read" },
  { label: "Currently Reading" },
  { label: "Want To Read" },
];

function Bookmarks({userData, setUserData}) {
  const [user, setUser] = useState("");
  const [authors, setAuthors] = useState([]);
  
  useEffect(() => {
    if (userData) {
      setUser(userData.id);
    }
  }, [userData])
  console.log(user)
 
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axiosInstance.get("/api/auth");
  //       setUser(response.data.id);
  //     } catch (err) {
  //       console.log("Error: " + err.message);
  //     }
  //   };
  //   fetchUser();
  // }, []);
  const [active, setActive] = useState("All");
  const [shelf, setShelf] = useState([]);
  const [books, setBooks] = useState([]);
  const [bookmarksAll, setBookmarksAll] = useState([]);

  useEffect(() => {
    const fetchShelf = async () => {
      try {
        const response = await axiosInstance.get(`/api/shelves/${user}`);
        setShelf(response.data.shelves);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };
    fetchShelf();
  }, [user]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await Promise.all(
          shelf.map(async (sh) => {
            const response = await axiosInstance.get(`/api/books/${sh.bookId}`);
            return response.data;
          })
        );
        setBooks(booksData);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };
    if (shelf && shelf.length > 0) {
      fetchBooks();
    }
  }, [shelf]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axiosInstance.get("/api/authors");
        setAuthors(response.data.array);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };
    fetchAuthors();
  }, []);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        
        const ratingsResponse = await Promise.all(
          books.map((book) =>
            axiosInstance.get(`/api/ratings/${book._id}/${user}`).catch(()=>{
              return {data : {rating: 0}};
            })
          )
        );
  
        
        const ratingsMap = ratingsResponse.reduce((acc, response, index) => {
          const book = books[index];
          const userRating = response.data?.rating || 0; 
          acc[book._id] = userRating;
          return acc;
        }, {});
  
        
        const updatedBookmarks = books.map((book) => {
          const author = authors.find(
            (author) => author.authorName === book.authorName
          );
          const shelfStatus = shelf.find((sh) => sh.bookId === book._id)?.shelve;
          const usrRating = ratingsMap[book._id] || 0;
  
          return {
            cover: book.coverImage,
            name: book.bookName,
            author: book.authorName,
            avgRating: book.averageRating,
            usrRating, 
            status: shelfStatus,
            bookId: book._id,
            authorId: author ? author._id : null,
          };
        });
  
        setBookmarksAll(updatedBookmarks);
      } catch (err) {
        console.log("Error fetching ratings:", err);
      }
    };
  
    if (books.length > 0 && authors.length > 0 && shelf.length > 0) {
      fetchRatings(); 
    }
  }, [books, authors, shelf, user]);

  const handleStatusChange = (newStatus, bookmarkName, bookId) => {
    const newBookmarksAll = bookmarksAll.map((bookmark) =>
      bookmark.name === bookmarkName
        ? { ...bookmark, status: newStatus }
        : bookmark
    );
    setBookmarksAll(newBookmarksAll);
    axiosInstance.put(`/api/shelves`, {
      bookId: bookId,
      userId: user,
      shelve: newStatus,
    });
  };

  const handleRatingChange = (newRating, bookmarkName, bookId) => {
    const newBookmarksAll = bookmarksAll.map((bookmark) =>
      bookmark.name === bookmarkName
        ? { ...bookmark, usrRating: newRating }
        : bookmark
    );
    setBookmarksAll(newBookmarksAll);
    axiosInstance.post("/api/ratings", {
      bookId: bookId,
      userId: user,
      rating: newRating,
    });
  };

  const handleRemove = (bookId) => {
    const newBookmarksAll = bookmarksAll.filter(
      (bookmark) => bookmark.bookId != bookId
    );
    setBookmarksAll(newBookmarksAll);
    axiosInstance.delete(`/api/shelves/${bookId}/${user}`);
  };

  const links = data.map((item) => {
    return (
      <Link
        className={classes.link}
        data-active={item.label === active || undefined}
        to={item.link}
        key={item.label}
        onClick={(event) => {
          setActive(item.label);
        }}
      >
        <span>{item.label}</span>
      </Link>
    );
  });

  const bookmarks =
    active === "All"
      ? bookmarksAll
      : bookmarksAll.filter((bookmark) => bookmark.status === active);
  const rows = bookmarks.map((bookmark) => (
    <Table.Tr key={bookmark.name}>
      <Table.Td>
        <Image radius="md" src={bookmark.cover} h={84} w={84} />
      </Table.Td>
      <Table.Td>
        <Link to={`/books/${bookmark.bookId}`}>{bookmark.name}</Link>
      </Table.Td>
      <Table.Td>
        <Link to={`/authors/${bookmark.authorId}`}>{bookmark.author}</Link>
      </Table.Td>
      <Table.Td>
        <Rating value={bookmark.avgRating} fractions={4} readOnly />
      </Table.Td>
      <Table.Td>
        <Rating
          defaultValue={bookmark.usrRating}
          fractions={1}
          onChange={(_value) =>
            handleRatingChange(_value, bookmark.name, bookmark.bookId)
          }
        />
      </Table.Td>
      <Table.Td>
        <Select
          placeholder="Read status"
          data={["Currently Reading", "Want To Read", "Read"]}
          defaultValue={bookmark.status}
          onChange={(_value) =>
            handleStatusChange(_value, bookmark.name, bookmark.bookId)
          }
        />
      </Table.Td>
      <Table.Td>
        <FaRegTrashAlt
          onClick={() => {
            handleRemove(bookmark.bookId);
          }}
          style={{
            cursor: "pointer",
            marginLeft: "15px",
            width: "20px",
            height: "20px",
            color: "red",
          }}
        ></FaRegTrashAlt>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Grid>
        <Grid.Col span="auto">
          <nav className={classes.navbar}>
            <div className={classes.navbarMain}>{links}</div>
          </nav>
        </Grid.Col>

        <Grid.Col span={9}>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Cover</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Author</Table.Th>
                <Table.Th>Avg. Rating</Table.Th>
                <Table.Th>Rating</Table.Th>
                <Table.Th>Shelf</Table.Th>
                <Table.Th>Remove</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Bookmarks;
