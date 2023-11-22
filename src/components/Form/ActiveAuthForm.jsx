import { ActionIcon, Button, Card, CopyButton, Group, Image, PinInput, Stack, Text, Tooltip, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import QRCode from 'qrcode';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { verifyOtpFn } from '../../api/baseApi';
import toast from '../Toast/Toast';

const ActiveAuthForm = ({otpUrl, base32, close}) => {
    const [qrCode, setQrCode] = useState('');
    const form = useForm({
        initialValues: {
            code: ''
        },
        validate: {
            code: (val)=> (val.length < 6 ? 'Code is a 6 car' : null)
        }
    });

    // OTP verification mutation function from useQuery
    const {mutate: otpVerifyHandler, isLoading} = useMutation((data)=> verifyOtpFn(data), {
        onSuccess: (data)=>{
            close();
            toast.success({title: "Successful", message: "Successfully verified"})
        },
        onError: (err)=>{
            toast.error({title: err.message, message: "Try again later."})
        }
    })

    useEffect(()=>{
        QRCode.toDataURL(otpUrl)
        .then(url => setQrCode(url))
        .catch(err => console.log('otp', err))
    }, [otpUrl])


    return (
            <form onSubmit={form.onSubmit(()=> otpVerifyHandler({code: form.values.code}))}>
            <Stack align='center'>
            <Card>
                <Image src={qrCode}/>
            </Card>
            <Card>
               <Group>
               <Text size='sm'>{base32}</Text>
                <CopyButton value={base32} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
            {copied ? (
              <IconCheck style={{ width: rem(20) }} />
            ) : (
              <IconCopy style={{ width: rem(20) }} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
               </Group>
            </Card>
            <Text>Enter authenticator code</Text>
            <PinInput
            onChange={(value) => form.setFieldValue('code', value)}
            error={form.errors.code && 'error'}
            size="md" length={6}/>
            <Button loading={isLoading} type='submit'>Verify</Button>
            </Stack>
            </form>
    );
};

export default ActiveAuthForm;