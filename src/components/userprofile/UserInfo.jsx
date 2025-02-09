import { FaMoneyCheck } from "react-icons/fa"; 
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { Avatar, Container, Group, Text, Paper } from '@mantine/core';
import classes from '../../styles/userprofile/UserInfoIcons.module.css';
// import { useEffect } from 'react';

export function UserInfo({userData}) {
    console.log(userData)
  return (
      <Container>
        
        <Group wrap="nowrap" justify='center' m={30}>
          <Avatar
            src={userData.avatar}
            size={94}
            radius="md"
          />
          <div>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              {userData.role}
            </Text>
            <Text fz="lg" fw={500} className={classes.name}>
              {userData.name}
            </Text>
            <Group wrap="nowrap" gap={10} mt={3}>
              <FaEnvelope stroke={1.5} size={16} className={classes.icon} />
              <Text fz="xs" c="dimmed">
                {userData.email}
              </Text>
            </Group>
            <Group wrap="nowrap" gap={10} mt={5}>
              <FaMoneyCheck stroke={1.5} size={16} className={classes.icon} />
              <Text fz="xs" c="dimmed">
                {userData.status.charAt(0).toUpperCase() + userData.status.slice(1) + " Subcriber"}
              </Text>
            </Group>
          </div>
        </Group>
      </Container>
  );
}