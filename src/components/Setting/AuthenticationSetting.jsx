import { Button, Divider, Group, Paper, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';
import { useMutation } from 'react-query';
import { generateAuthDataFn } from '../../api/baseApi';
import { useAuthData } from '../../context/AuthContext';
import ActiveAuthForm from '../Form/ActiveAuthForm';
import DisabledAuthenticationForm from '../Form/DisabledAuthenticationForm';
import ModalLayout from '../ModalLayout/ModalLayout';
import toast from '../Toast/Toast';

const AuthenticationSetting = () => {
    const [authGenerateFormOpened, { open: authGenerateFormOpen, close:  authGenerateFormClose}] = useDisclosure(false);
    const [authDisableFormOpened, { open: authDisableFormOpen, close:  authDisableFormClose}] = useDisclosure(false);
    const {state: {authUser}} = useAuthData();

    const {mutate: generateAuthData, data,  isLoading} = useMutation(()=> generateAuthDataFn(), {
        onSuccess: (data)=>{
            authGenerateFormOpen()
        },
        onError: (err)=>{
            toast.error({title: err.message, message: "Try again later."})
        }
    })

    
    return (
    <Paper p='md'>
        <Title size='md'>Authentication setting</Title>
        <Divider my={20}/>
       <Group align='center' mb={10}>
       {authUser?.auth?.otp_enabled ? <Text>2FA Enabled<IconCheck color='green'/></Text> : <Text>2FA Disabled <IconX color='red'/></Text>}
       </Group>

        {authUser?.auth?.otp_enabled ? <Button color='red' onClick={authDisableFormOpen}>Disable</Button> : <Button loading={isLoading} onClick={generateAuthData}>Set up authentication</Button>}

{/* Authentication active form */}
        <ModalLayout opened={authGenerateFormOpened} close={authGenerateFormClose} title='Authentication set up'>
            <ActiveAuthForm close={authGenerateFormClose} otpUrl={data?.authData?.otpauth_url} base32={data?.authData?.base32}/>
        </ModalLayout>

{/* Authentication disable form */}
        <ModalLayout opened={authDisableFormOpened} close={authDisableFormClose} title='Authentication disable'>
            <DisabledAuthenticationForm close={authDisableFormClose}/>
        </ModalLayout>
   </Paper>
    );
};

export default AuthenticationSetting;