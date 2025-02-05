import { useEffect, useState } from "react";
import { Rating, Grid, Table, Select, Image } from "@mantine/core";
import classes from "./../styles/general/Bookmarks.module.css";
import { Link } from "react-router-dom";

const data = [
  { label: "All" },
  { label: "Read" },
  { label: "Currently Reading" },
  { label: "Want To Read" },
];

function Bookmarks() {
  const [active, setActive] = useState("All");
  const [bookmarksAll, setBookmarksAll] = useState([
    {
      cover: "gdsagdsag",
      name: "Cadgsag gdasgdsag",
      author: "Carbon dsfhsah",
      avgRating: 4,
      usrRating: 5,
      status: "Read",
    },
    {
      cover: "dgsag",
      name: "Ngsag adsgdasg",
      author: "Nitrogen ahfsdhds",
      avgRating: 3,
      usrRating: 5,
      status: "Read",
    },
    {
      cover: "dagsdasg",
      name: "Ydsagsag asdgdsag",
      author: "Yttrium FJDSJ",
      avgRating: 2,
      usrRating: 5,
      status: "Currently Reading",
    },
    {
      cover: "aDGSAGGS",
      name: "Basadg adsgasd",
      author: "Barium AGDSD",
      avgRating: 3.5,
      usrRating: 5,
      status: "Want To Read",
    },
    {
      cover: "ADSGSAG",
      name: "Cesadg asdgasdg",
      author: "Cerium fsadgsad",
      avgRating: 4.5,
      usrRating: 5,
      status: "Want To Read",
    },
  ]);

  const handleStatusChange = (newStatus, bookmarkName) => {
    const newBookmarksAll = bookmarksAll.map((bookmark) =>
      bookmark.name === bookmarkName
        ? { ...bookmark, status: newStatus }
        : bookmark
    );
    setBookmarksAll(newBookmarksAll);
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
      : bookmarksAll.filter((bookmark)=> bookmark.status === active);
  const rows = bookmarks.map((bookmark) => (
    <Table.Tr key={bookmark.name}>
      <Table.Td>
        <Image radius="md" src={bookmark.cover} h={84} w={84} />
      </Table.Td>
      <Table.Td>{bookmark.name}</Table.Td>
      <Table.Td>{bookmark.author}</Table.Td>
      <Table.Td>
        <Rating value={bookmark.avgRating} fractions={2} readOnly />
      </Table.Td>
      <Table.Td>
        <Rating defaultValue={bookmark.usrRating} fractions={2} />
      </Table.Td>
      <Table.Td>
        <Select
          placeholder="Read status"
          data={["Currently Reading", "Want To Read", "Read"]}
          defaultValue={bookmark.status}
          onChange={(_value, option) =>
            handleStatusChange(_value, bookmark.name)
          }
        />
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
