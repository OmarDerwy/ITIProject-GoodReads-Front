import { useState } from "react";
import { Rating, Grid, Table, Select } from "@mantine/core";
import classes from "./../styles/general/Bookmarks.module.css";
import { Link } from "react-router-dom";

const data = [
  { label: "Read" },
  { label: "Currently Reading" },
  { label: "Want to Read" },
];

function Bookmarks() {
  const [active, setActive] = useState("Read");
  const bookmarks = [
    { position: 6, symbol: "C", name: "Carbon" },
    { position: 7, symbol: "N", name: "Nitrogen" },
    { position: 39, symbol: "Y", name: "Yttrium" },
    { position: 56, symbol: "Ba", name: "Barium" },
    { position: 58, symbol: "Ce", name: "Cerium" },
  ];

  const rows = bookmarks.map((bookmark) => (
    <Table.Tr key={bookmark.name}>
      <Table.Td>{bookmark.position} a </Table.Td>
      <Table.Td>{bookmark.name} b </Table.Td>
      <Table.Td>{bookmark.symbol} c </Table.Td>
      <Table.Td>
        {bookmark.name} d <Rating value={2.5} fractions={2} readOnly />
      </Table.Td>
      <Table.Td>
        {bookmark.mass} e <Rating defaultValue={2.5} fractions={2} />
      </Table.Td>
      <Table.Td>
        {bookmark.symbol} f{" "}
        <Select
          placeholder="Read status"
          data={["Currently read", "Want to read", "Read"]}
          defaultValue=""
        />
      </Table.Td>
    </Table.Tr>
  ));

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

  return (
    <>
      <Grid>
        <Grid.Col span="auto">
          <nav className={classes.navbar}>
            <div className={classes.navbarMain}>{links}</div>
          </nav>
        </Grid.Col>

        <Grid.Col span={9.33}>
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
