import { useEffect, useState } from "react";
import { BookShelf } from "../components/general/BookShelf";
import axiosInstance from "../apis/config";

function General() {
  {
    /*Fetch top 7 most popular Authors, Books, Categories information from database: 
    Counter of clicked cards information should be stored in db then retrieved */
  }

  {
    /*Dummy data:*/
  }
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axiosInstance.get("/api/books");

        const updatedBooks = response.data.array.map((book) => ({
          title: book.bookName,
          rating: book.averageRating,
          views: book.clicked,
          image: book.coverImage,
        }));
        setBooks(updatedBooks);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };

    const getAuthors = async () => {
      try {
        const response = await axiosInstance.get("/api/authors");

        const updatedAuthors = response.data.array.map((author) => ({
          title: author.authorName,
          views: 0,
          image: author.imageUrl,
        }));
        setAuthors(updatedAuthors);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };

    const getCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/categories");

        const updatedCategories = response.data.array.map((category) => ({
          title: category.categoryName,
          views: 0,
          image: category.coverImage,
        }));
        setCategories(updatedCategories);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };
    getBooks();
    getAuthors();
    getCategories();
  }, []);
  console.log(categories);
  console.log(authors);
  console.log(books);
  return (
    <>
      <BookShelf title="Popular Books" popular={books} />

      <BookShelf title="Popular Authors" popular={authors} />

      <BookShelf title="Popular Categories" popular={categories} />
    </>
  );
}

export default General;
