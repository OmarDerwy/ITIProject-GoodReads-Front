// import { IconSearch } from "@tabler/icons-react"
import { Autocomplete, Burger, Button, Drawer, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
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
    <Link key={link.label} to={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group wrap="auto" align="flex-start" className="Logo">
          <Link
            style={{ textDecoration: "none" }}
            to="/"
            className={classes.inner}
          >
            <img src={BooksLogo} alt="Books Logo" />
            <p className={classes.p}>Books</p>
          </Link>
        </Group>

        <Group hiddenFrom="" >
          <Group gap={5} className={classes.links} visibleFrom="md">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<CiSearch />}
            visibleFrom="md"
          />
          <Group visibleFrom="md">
            <Button
              size="sm"
              onClick={() => navigate("/login")}
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
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="md" />
          <Drawer opened={opened} onClose={toggle} size="100%">
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<CiSearch />}
            mb={10}
          />
            <Group gap={10} mb={10} pb={50} pt={20} display="block" onClick={()=>toggle()}  >
              {items}
            </Group>
            <Button
              size="sm"
              onClick={() => {navigate("/Login"); toggle()}}
              className={classes.control}
              variant="gradient"
              gradient={{ from: "green", to: "lightgreen" }}
              gap={5}
              display="block"
              mb={10}
              fullWidth="true"
            >
              Login
            </Button>
            <Button
              component="a"
              onClick={() => {navigate("/sign-up"); toggle()}}
              size="sm"
              variant="default"
              className={classes.control}
              fullWidth="true"
            >
              Sign Up
            </Button>
            
          </Drawer>
        </Group>
      </div>
    </header>
  );
}

export default Navbar;
