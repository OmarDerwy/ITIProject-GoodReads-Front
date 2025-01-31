import { IconBrandInstagram, IconBrandFacebook, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Anchor, Group, Text } from '@mantine/core';
import classes from '../../styles/landingpage/FooterCentered.module.css';


const links = [
  { link: 'https://facebook.com', label: 'ContactUs' },
  { link: 'https://facebook.com', label: 'Privacy' },
  { link: 'https://facebook.com', label: 'Blog' },
  { link: 'https://facebook.com', label: 'Careers' }
];

export default function FooterCentered() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Text size="lg" fw={700}>GOODREADS</Text>

        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg"
                      variant="gradient"
                      gradient={{ from: 'green', to: 'lightgreen' }}
                      radius="xl"
                      component="a"
                      href="https://twitter.com">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg"
                      variant="gradient"
                      gradient={{ from: 'green', to: 'lightgreen' }}
                      radius="xl"
                      component="a"
                      href="https://youtube.com">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg"
                      variant="gradient"
                      gradient={{ from: 'green', to: 'lightgreen' }}
                      radius="xl"
                      component="a"
                      href="https://instagram.com">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg"
                      variant="gradient"
                      gradient={{ from: 'green', to: 'lightgreen' }} 
                      radius="xl"
                      component="a"
                      href="https://facebook.com"
          >
            <IconBrandFacebook size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
