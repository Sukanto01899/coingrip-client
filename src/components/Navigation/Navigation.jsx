import { Avatar, Button, Container, Group, Title } from '@mantine/core';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import classes from './CSS/Navigation.module.css';
import NavUserMenu from './NavUserMenu';

const Navigation = () => {
    const [user] = useAuthState(auth)
    return (
        <Container size='100%' className={classes.header} px={0}>
            <Container size='md'>
        <Group justify="space-between">
            {/*Right site Logo */}
            <Group>
            <Avatar component='a' href='/' size={28} src='https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'/>
            <Title size='sm'>Money Sender</Title>
            </Group>
             {/* User menu or Login sign up button */}
         {user ? <NavUserMenu user={user}/> : <Group>
            <Link to='/login'><Button size='xs'>Login</Button></Link>
            <Link to='/register'><Button size='xs'>Sign up</Button></Link>
        </Group>}
            </Group>
        </Container>
        </Container>
    );
};

export default Navigation;