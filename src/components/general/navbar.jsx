import { IconSearch } from '@tabler/icons-react';
import { Autocomplete, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './navbar.module.css';

const links = [
  { link: '/about', label: 'Home' },
  { link: '/pricing', label: 'Categories' },
  { link: '/learn', label: 'Books' },
  { link: '/community', label: 'Authors' },

];
const userLinks = [
  { link: '/community', label: 'Login' },
  { link: '/community', label: 'Sign Up' },
]

function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));
  const userItems = userLinks.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <a>Goodreads</a>
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            visibleFrom="xs"
          />
        {userItems}
        </Group>
      </div>
    </header>
  );
}

export default Navbar;