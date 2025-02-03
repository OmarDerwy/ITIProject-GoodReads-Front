import { useState } from 'react';
import { Code, Group } from '@mantine/core';
import classes from './../styles/general/Bookmarks.module.css';

const data = [
  { link: '', label: 'Read' },
  { link: '', label: 'Currently Reading'},
  { link: '', label: 'Want to Read'},

];

function Bookmarks() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => {
    return (
      <a
        className={classes.link}
        data-active={item.label === active || undefined}
        href={item.link}
        key={item.label}
        onClick={(event) => {
          event.preventDefault();
          setActive(item.label);
        }}
      >
        <span>{item.label}</span>
      </a>
    );
  });

  return (
    <>
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>
    </nav>
    </>
    
  );
}


export default Bookmarks;