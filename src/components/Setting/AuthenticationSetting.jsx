import { Button, Divider, Group, Paper, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import baseApi from '../../api/baseApi';
import { useAuthData } from '../../context/AuthContext';
import ActiveAuthForm from '../Form/ActiveAuthForm';
import ModalLayout from '../ModalLayout/ModalLayout';

const AuthenticationSetting = () => {
    const [otpUrl, setOtpUrl] = useState('');
    const [base32, setBase32] = useState('');
    const [authFormOpened, { open, close}] = useDisclosure(false);
    const {authUser} = useAuthData();

    const generateAuthData = ()=>{
        baseApi.post('/user/otp/generate')
        .then(res => {
            const {otpauth_url, base32} = res?.data?.authData;
            setOtpUrl(otpauth_url);
            setBase32(base32);
            open()
        })
        .catch(err => console.log(err))
    }
    
    return (
    <Paper p='md'>
        <Title size='md'>Authentication setting</Title>
        <Divider my={20}/>
       <Group align='center' mb={10}>
       {authUser?.auth?.otp_enabled ? <Text>2FA Enabled<IconCheck color='green'/></Text> : <Text>2FA Disabled <IconX color='red'/></Text>}
       </Group>

        {authUser?.auth?.otp_enabled ? <Button>Disable</Button> : <Button onClick={generateAuthData}>Set up authentication</Button>}
        <ModalLayout opened={authFormOpened} close={close} title='Authentication set up'><ActiveAuthForm close={close} otpUrl={otpUrl} base32={base32}/></ModalLayout>
   </Paper>
    );
};

export default AuthenticationSetting;