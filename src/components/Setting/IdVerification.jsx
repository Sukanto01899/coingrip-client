import { Badge, Button, Card, Divider, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { useQuery } from 'react-query';
import { getKycFn } from '../../api/baseApi';
import { useAuthData } from '../../context/AuthContext';
import KycForm from '../Form/KycForm';
import ModalLayout from '../ModalLayout/ModalLayout';

const IdVerification = () => {
    const {state: {authUser: {auth, _id}}} = useAuthData();
    const [kycFormOpened, { open: kycFormOpen, close: kycFormClose }] = useDisclosure(false);

     // Kyc data
     const {data: kycData} = useQuery({
        queryKey: ['kyc', _id],
        queryFn: ()=> getKycFn({id: _id})
    });

    console.log(kycData)

    const ShowKycData = <Stack>
                          <Text>First name: {kycData?.firstname}</Text>
                          <Text>Last name: {kycData?.lastname}</Text>
                          <Text>Country: {kycData?.country}</Text>
                          <Text>NID number: {kycData?.nid_number}</Text>
                          <Group><Text>Status:</Text> <Badge>{kycData?.status}</Badge></Group>
                        </Stack>

    return (
        <Paper p='md'>
             <Title size='md'>ID verification</Title>
              <Divider my={20}/>
              <Card>
                <Group justify='space-between' align='start'>
                    <Stack>
                      <Text>Complete KYC</Text>
                      <Text size='xs'>Increase your 24-hour withdrawal limit to 30 BTC</Text>
                    </Stack>

                    {auth?.kyc_verified ?  <Button disabled={auth?.kyc_verified} onClick={kycFormOpen}>Verified</Button> : <Button disabled={auth?.kyc_verified} onClick={kycFormOpen}>{kycData?.status || 'Verify'}</Button>}
                </Group>
                <Divider my={20}/>
            
                 {kycData && ShowKycData}
              </Card>

              <ModalLayout opened={kycFormOpened} open={kycFormOpen} close={kycFormClose} title='KYC'>
                <KycForm/>
              </ModalLayout>
        </Paper>
    );
};

export default IdVerification;