import { useState } from "react";
import { Checkbox, Grid, Table } from "@mantine/core";
import classes from "./../styles/general/Bookmarks.module.css";
import { Link } from "react-router-dom";

const data = [
  { link: "/read", label: "Read" },
  { link: "/currently-reading", label: "Currently Reading" },
  { link: "/want-to-read", label: "Want to Read" },
];

function Bookmarks() {
  const [active, setActive] = useState("Billing");
  const [selectedRows, setSelectedRows] = useState([]);
  const elements = [
    { position: 6, symbol: "C", name: "Carbon" },
    { position: 7, symbol: "N", name: "Nitrogen" },
    { position: 39, symbol: "Y", name: "Yttrium" },
    { position: 56, symbol: "Ba", name: "Barium" },
    { position: 58, symbol: "Ce", name: "Cerium" },
  ];

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position} a </Table.Td>
      <Table.Td>{element.name} b </Table.Td>
      <Table.Td>{element.symbol} c </Table.Td>
      <Table.Td>{element.name} d </Table.Td>
      <Table.Td>{element.mass} e </Table.Td>
      <Table.Td>{element.symbol} f </Table.Td>
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
          event.preventDefault();
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
