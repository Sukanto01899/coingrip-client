import { Button, Container, Group, Image, Title } from '@mantine/core';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import logo from '../../assets/logo.png';
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
            <Image w={40} h='auto' src={logo}/>
            <Title size='sm'>COINGRIP</Title>
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