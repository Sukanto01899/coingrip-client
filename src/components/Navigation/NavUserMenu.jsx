import { Avatar, Group, Menu, Tabs, Text, UnstyledButton, rem, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconDashboard, IconLogout, IconSettings, IconTrash } from '@tabler/icons-react';
import cx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../../hook/useLogout';
import classes from './CSS/Navigation.module.css';

// const user = {
//     name: 'Jane Spoonfighter',
//     email: 'janspoon@fighter.dev',
//     image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
//   };

const linkStyle = {
  textDecoration: 'none'
}
  
  const tabs = [
    'Home',
    'Orders',
    'Education',
    'Community',
    'Forums'
  ];

const NavUserMenu = ({user}) => {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [logout] = useLogout();

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));
 
    return (
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                  <Group gap={7}>
                    <Avatar src={user.photoURL} alt={user.displayName} radius="xl" size={20} />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {user.displayName}
                    </Text>
                    <IconChevronDown style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>

              <Link style={linkStyle} to='/dashboard'>
                <Menu.Item
                  leftSection={
                    <IconDashboard style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                  }
                >
                  Dashboard
                </Menu.Item>
                </Link>
  
                <Menu.Label>Settings</Menu.Label>
                <Link style={linkStyle} to='/dashboard/setting'>
                <Menu.Item
                  leftSection={
                    <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                  }
                >
                  Account settings
                </Menu.Item>
                </Link>
                <Menu.Item onClick={logout}
                  leftSection={
                    <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                  }
                >
                  Logout
                </Menu.Item>
  
                <Menu.Divider />
  
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  color="red"
                  leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                >
                  Delete account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
    );
};

export default NavUserMenu;