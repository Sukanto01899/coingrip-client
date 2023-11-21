import { Button, Card, Image, PinInput, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import QRCode from 'qrcode';
import React, { useEffect, useState } from 'react';
import baseApi from '../../api/baseApi';

const ActiveAuthForm = ({otpUrl, base32, close}) => {
    const [qrCode, setQrCode] = useState('');
    const form = useForm({
        initialValues: {
            code: ''
        },
        validate: {
            code: (val)=> (val.length < 6 ? 'Code is a 6 car' : null)
        }
    })

    useEffect(()=>{
        QRCode.toDataURL(otpUrl)
        .then(url => setQrCode(url))
        .catch(err => console.log('otp', err))
    }, [otpUrl])

    const otpVerifyHandler = ()=>{
        baseApi.post('/user/otp/verify', {code: form.values.code})
        .then(res => {
            if(res?.data?.otp_verified){
                close()
            }
        })
        .catch(err => console.log(err))
    }

    return (
            <form onSubmit={form.onSubmit(otpVerifyHandler)}>
            <Stack>
            <Card>
                <Image src={qrCode}/>
            </Card>
            <Card><Text size='sm'>{base32}</Text></Card>
            <PinInput
            onChange={(value) => form.setFieldValue('code', value)}
            error={form.errors.code && 'error'}
            size="md" length={6}/>
            <Button type='submit'>Submit</Button>
            </Stack>
            </form>
    );
};

export default ActiveAuthForm;