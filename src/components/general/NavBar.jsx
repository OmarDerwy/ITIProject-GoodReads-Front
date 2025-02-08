// import { IconSearch } from "@tabler/icons-react"
import {
  Autocomplete,
  Avatar,
  Burger,
  Button,
  Drawer,
  Group,
  Text,
} from "@mantine/core";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import classes from "../../styles/general/Navbar.module.css";
import BooksLogo from "/Logomark.svg";
import { CiSearch } from "react-icons/ci";
import { FaStar, FaRegStar } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const user = {
  name: "Userdagsag1",
  email: "user1@fighter.dev",
  image: "",
};

const links = [
  { link: "/", label: "Home" },
  { link: "/Categories", label: "Categories" },
  { link: "/Books", label: "Books" },
  { link: "/Authors", label: "Authors" },
];

function Navbar() {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState("");
  const location = useLocation();
  const activePage = location.pathname.split("/")[1];
  const [signedIn, setSignedIn] = useState(localStorage.getItem('userToken')? true: false);
  
  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={link.label === activePage || undefined}
    >
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

        <Group>
          <Group gap={5} className={classes.links} visibleFrom="md">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<CiSearch />}
            visibleFrom="md"
          />
          {signedIn ? (
            <Group visibleFrom="md" gap={10}>
              <Link
                style={{
                  textDecoration: "inherit",
                  color: "inherit ",
                  display: "inherit",
                }}
                to="/profile"
              >
                <Avatar src={user.image} alt={user.name} size="md" />
                <Text fw={500} size="sm" lh={1} mr={10} ml={5} my="auto">
                  {user.name}
                </Text>
              </Link>
              <Link
                style={{
                  textDecoration: "inherit",
                  color: "inherit",
                  display: "inherit",
                }}
                to="/Bookmarks"
              >
                {activePage === "Bookmarks" ? (
                  <FaStar size={25}></FaStar>
                ) : (
                  <FaRegStar size={25}></FaRegStar>
                )}
                <Text fw={500} size="sm" lh={1} mr={10} ml={5} my="auto">
                  Bookmarks
                </Text>
              </Link>
            </Group>
          ) : (
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
          )}

          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="md" />
          <Drawer opened={opened} onClose={toggle} size="100%">
            {signedIn ? (
              <Group gap={10}>
                <Link
                  style={{
                    textDecoration: "inherit",
                    color: "inherit ",
                    display: "inherit",
                  }}
                  to="/profile"
                  onClick={() => toggle()}
                >
                  <Avatar src={user.image} alt={user.name} size="md" />
                  <Text fw={500} size="sm" lh={1} mr={10} ml={5} my="auto">
                    {user.name}
                  </Text>
                </Link>
                <Link
                  style={{
                    textDecoration: "inherit",
                    color: "inherit",
                    display: "inherit",
                  }}
                  to="/Bookmarks"
                  onClick={() => toggle()}
                >
                  {activePage === "Bookmarks" ? (
                    <FaStar size={25}></FaStar>
                  ) : (
                    <FaRegStar size={25}></FaRegStar>
                  )}
                  <Text fw={500} size="sm" lh={1} mr={10} ml={5} my="auto">
                    Bookmarks
                  </Text>
                </Link>
              </Group>
            ) : (
              <Group>
                <Button
                  size="sm"
                  onClick={() => {
                    navigate("/Login");
                    toggle();
                  }}
                  className={classes.control}
                  variant="gradient"
                  gradient={{ from: "green", to: "lightgreen" }}
                  display="block"
                  fullWidth="true"
                >
                  Login
                </Button>
                <Button
                  component="a"
                  onClick={() => {
                    navigate("/sign-up");
                    toggle();
                  }}
                  size="sm"
                  variant="default"
                  className={classes.control}
                  fullWidth="true"
                  mb={20}
                >
                  Sign Up
                </Button>
              </Group>
            )}

            <Autocomplete
              className={classes.search}
              placeholder="Search"
              leftSection={<CiSearch />}
              mb={10}
              mt={10}
            />
            <Group
              gap={10}
              mb={10}
              pb={50}
              pt={10}
              display="block"
              onClick={() => toggle()}
            >
              {items}
            </Group>
          </Drawer>
        </Group>
      </div>
    </header>
  );
}

export default Navbar;
