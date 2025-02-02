import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { Avatar, Container, Group, Text } from '@mantine/core';
import classes from '../../styles/userprofile/UserInfoIcons.module.css';

export function UserInfo() {
  return (
    <Container>
      <Group wrap="nowrap" justify='center'>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          size={94}
          radius="md"
        />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            Software engineer
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            Robert Glassbreaker
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <FaEnvelope stroke={1.5} size={16} className={classes.icon} />
            <Text fz="xs" c="dimmed">
              robert@glassbreaker.io
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <FaPhone stroke={1.5} size={16} className={classes.icon} />
            <Text fz="xs" c="dimmed">
              +11 (876) 890 56 23
            </Text>
          </Group>
        </div>
      </Group>
    </Container>
  );
}