import { Button, Center, PinInput, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { useMutation } from 'react-query';
import { disableAuthFn } from '../../api/baseApi';
import toast from '../Toast/Toast';

const DisabledAuthenticationForm = ({close}) => {
    const form = useForm({
        initialValues: {
            pin: ''
        },
        validate: {
            pin: (val)=> val.length < 6 ? 'Invalid code' : null
        }
    })

    const {mutate: disableAuth, isLoading} = useMutation(disableAuthFn, {
        onSuccess: (data)=>{
            if(!data.isDisabled) return;
            close()
            toast.success({title: 'Successful', message: "Successfully disabled" })
        },
        onError: (err)=>{
            toast.error({title:  err?.response?.data?.message || err.message , message: 'Please try again'})
        }
    })
    return (
            <form onSubmit={form.onSubmit(()=> disableAuth({code: form.values.pin}))}>
                <Stack>
                  <Center><Text size='lg'>Enter authentication code</Text></Center>
                  <Center>
                  <PinInput 
                    onChange={(e)=> form.setFieldValue("pin",e)} 
                    length={6}
                    error={form.errors.pin && form.errors.pin}
                    />
                  </Center>
                   <Button loading={isLoading} type='submit' color='red'>Disable</Button>
               </Stack>
            </form>
    );
};

export default DisabledAuthenticationForm;