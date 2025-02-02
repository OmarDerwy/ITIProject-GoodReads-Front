// import { IconSearch } from "@tabler/icons-react"
import { Autocomplete, Burger, Button, Group } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from "@mantine/hooks";
import classes from "../../styles/general/Navbar.module.css";
import BooksLogo from "/Logomark.svg";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const links = [
  { link: "/", label: "Home" },
  { link: "/Categories", label: "Categories" },
  { link: "/Books", label: "Books" },
  { link: "/Authors", label: "Authors" },
];

function Navbar() {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group wrap="nowrap" align="flex-start" className="Logo">
          <Link style={{textDecoration: "none"}} to="#" className={classes.inner}>
            <img src={BooksLogo} alt="Books Logo" />
            <p className={classes.p}>Books</p>
          </Link>
        </Group>

        <Group>
          <Group gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<CiSearch />}
            visibleFrom="xs"
          />

          <Button
            size="sm"
            onClick={() => navigate("/Login")}
            className={classes.control}
            variant="gradient"
            gradient={{ from: "green", to: "lightgreen" }}
          >
            Login
          </Button>
          <Button
            component="a"
            onClick={() => navigate("/sign-up")}
            size="sm"
            variant="default"
            className={classes.control}
          >
            Sign Up
          </Button>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />

        </Group>
      </div>
    </header>
  );
}

export default Navbar;
