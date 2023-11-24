import { Grid, Menu, Paper } from '@mantine/core';
import { IconBrandAuth0, IconMail, IconPassword, IconSettings, IconShield, IconUser } from '@tabler/icons-react';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserDisplay from '../components/Setting/UserDisplay';
import classes from './CSS/Setting.module.css';

const linkStyle = {
    textDecoration: "none",
  };

const settingOptions = [
    {
        title: 'Profile',
        path: 'profile',
        icon: <IconUser size="1rem" stroke={1.5} />
    },
    {
        title: 'Account',
        path: 'account',
        icon: <IconSettings size="1rem" stroke={1.5} />
    },
    {
        title: 'Email',
        path: 'email',
        icon: <IconMail size="1rem" stroke={1.5} />
    },
    {
        title: 'Password',
        path: 'password',
        icon: <IconPassword size="1rem" stroke={1.5} />
    },
    {
        title: 'Authentication',
        path: 'authentication',
        icon: <IconBrandAuth0 size="1rem" stroke={1.5} />
    },
    {
        title: 'ID Verification',
        path: 'id-verification',
        icon: <IconShield size="1rem" stroke={1.5} />
    },
]

const Setting = () => {
    return (
        <Paper mih="100vh">
            <UserDisplay/>
           <Grid columns={12}>
            <Grid.Col span={{base: 12, sm: 4}}>
              <Menu>
              {settingOptions.map(option => <Link style={linkStyle} to={option.path}  key={option.title}><Menu.Item className={classes.menu} leftSection={option.icon} >{option.title}</Menu.Item></Link>)}
              </Menu>
            </Grid.Col>
            <Grid.Col span={{base: 12, sm: 8}}>
                <Outlet/>
            </Grid.Col>
           </Grid>
        </Paper>
    );
};

export default Setting;