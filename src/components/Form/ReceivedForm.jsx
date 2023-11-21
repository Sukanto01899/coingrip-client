import { ActionIcon, Button, Card, CopyButton, Flex, Image, Stack, Text, Tooltip, rem } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import QRCode from 'qrcode';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { getDemoBalance } from '../../api/baseApi';
import toast from '../Toast/Toast';

const ReceivedForm = ({ userId, asset}) => {
  const [qrCode, setQrcode] = useState('');
  const {mutate: getDemoAsset, isLoading} = useMutation((data)=> getDemoBalance(data), {
    onSuccess: (data)=>{
      toast.success({title: "Successful", message: "You got some demo balance"})
    },
    onError: (err)=>{
      toast.error({title: "Request Fail", message: "Please try again later."})
    }
  })

  useEffect(()=>{
    QRCode.toDataURL(asset?._id)
    .then(setQrcode)
  }, [])

    return (
        <Stack>
            <Card withBorder>
                <Image src={qrCode}></Image>
            </Card>
            <Card withBorder>
            <Flex justify='space-between' align='center'px={10}>
                <Text>{userId}</Text>
                <Button loading={isLoading} onClick={()=> getDemoAsset(asset._id)} size='xs'>Get Test Money</Button>
                <CopyButton value={userId} timeout={2000}>
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