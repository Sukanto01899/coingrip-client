import { ActionIcon, Card, CopyButton, Flex, Image, Stack, Text, Tooltip, rem } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import QRCode from 'qrcode';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { getDemoBalance } from '../../api/baseApi';
import { useAuthData } from '../../context/AuthContext';
import toast from '../Toast/Toast';

const ReceivedForm = ({ asset}) => {
  const [qrCode, setQrcode] = useState('');
  const {state} = useAuthData()
  const {mutate: getDemoAsset, isLoading} = useMutation((data)=> getDemoBalance(data), {
    onSuccess: (data)=>{
      toast.success({title: "Successful", message: "You got some demo balance"})
    },
    onError: (err)=>{
      toast.error({title: "Request Fail", message: "Please try again later."})
    }
  })

  useEffect(()=>{
    QRCode.toDataURL(state.authUser._id)
    .then(setQrcode)
  }, [])

    return (
        <Stack>
            <Card withBorder>
                <Image src={qrCode}></Image>
            </Card>
            <Card withBorder>
            <Flex justify='space-between' align='center'px={10}>
                <Text>{state.authUser._id}</Text>
                <CopyButton value={state.authUser._id} timeout={2000}>
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
            </Flex>
            </Card>
        </Stack>
    );
};

export default ReceivedForm;