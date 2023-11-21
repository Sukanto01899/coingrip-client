import { Avatar, Group, Text, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import classes from './CSS/UserDisplay.module.css';

const UserDisplay = () => {
  const [user] = useAuthState(auth);
  
    return (
        <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          src={user?.photoURL}
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user.displayName}
          </Text>

          <Text c="dimmed" size="xs">
            {user.email || user?.reloadUserInfo?.screenName}
          </Text>
        </div>

        <IconChevronRight style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
    );
};

export default UserDisplay;