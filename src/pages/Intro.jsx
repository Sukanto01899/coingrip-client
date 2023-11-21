import { Button, Container, Group, Stack } from '@mantine/core';
import { IconLogin, IconUser } from '@tabler/icons-react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import IntroSlider from '../components/Slider/IntroSlider';
import { ToastContext } from '../context/ToastContext';

const Intro = () => {
    const navigate = useNavigate();
    const {viewToast} = useContext(ToastContext);
    
    return (
        <Container size='md' h='100vh' py='md'>
            <Stack h='100%' justify='space-between' align='center'>
                <IntroSlider/>
            <Group grow w='100%'>
                <Button onClick={()=> viewToast('Testing', true)} leftSection={<IconLogin/>}>Login</Button>
                <Button onClick={()=> navigate('/register')} leftSection={<IconUser/>}>Create Account</Button>
            </Group>
            </Stack>
        </Container>
    );
};

export default Intro;