// import { IconChevronDown } from '@tabler/icons-react';
import { Burger, Center, Container, Group, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './../../styles/landingpage/MinimalNavBar.module.css';
import BooksLogo from '/Logomark.svg';

// const links = [
//   { link: '/about', label: 'Features' },
//   {
//     link: '#1',
//     label: 'Learn',
//     links: [
//       { link: '/docs', label: 'Documentation' },
//       { link: '/resources', label: 'Resources' },
//       { link: '/community', label: 'Community' },
//       { link: '/blog', label: 'Blog' },
//     ],
//   },
//   { link: '/about', label: 'About' },
//   { link: '/pricing', label: 'Pricing' },
//   {
//     link: '#2',
//     label: 'Support',
//     links: [
//       { link: '/faq', label: 'FAQ' },
//       { link: '/demo', label: 'Book a demo' },
//       { link: '/forums', label: 'Forums' },
//     ],
//   },
// ];

export default function MinimalNavBar() {
  const [opened, { toggle }] = useDisclosure(false);

//   const items = links.map((link) => {
//     const menuItems = link.links?.map((item) => (
//       <Menu.Item key={item.link}>{item.label}</Menu.Item>
//     ));

//     if (menuItems) {
//       return (
//         <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
//           <Menu.Target>
//             <a
//               href={link.link}
//               className={classes.link}
//               onClick={(event) => event.preventDefault()}
//             >
//               <Center>
//                 <span className={classes.linkLabel}>{link.label}</span>
//                 <IconChevronDown size={14} stroke={1.5} />
//               </Center>
//             </a>
//           </Menu.Target>
//           <Menu.Dropdown>{menuItems}</Menu.Dropdown>
//         </Menu>
//       );
//     }

//     return (
//       <a
//         key={link.label}
//         href={link.link}
//         className={classes.link}
//         onClick={(event) => event.preventDefault()}
//       >
//         {link.label}
//       </a>
//     );
//   });

  return (
    <header className={classes.header}>
      <Container size="md">
        <a href="#" className={classes.inner}>
          <img src={BooksLogo} alt="Books Logo" />
          <p className={classes.p}>Books</p>
        </a>
      </Container>
    </header>
  );
}