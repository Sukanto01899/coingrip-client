import { Avatar, Button, Group, Menu, Text } from '@mantine/core';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { getDemoBalance } from '../../../api/baseApi';
import { useAuthData } from '../../../context/AuthContext';
import toast from '../../Toast/Toast';

const TestBalanceRequest = () => {
    const {state: {assetsData}} = useAuthData();
    const queryClient = useQueryClient()

    const {mutate: getTestBalance, isLoading} = useMutation((data)=>getDemoBalance(data), {
        onSuccess: (data)=>{
            toast.success({title: "Request success", message: "You got some test balance"});
            return Promise.resolve(queryClient.invalidateQueries(["balance"]))
        },
        onError: (err)=> {
            toast.error({title: err?.response?.data?.message || err.message, message: "Please try again later"})
        }
    })

    const assetLayout = assetsData.assets.map(asset => (
        <Menu.Item component='li' key={asset._id} mb={5}>
            <Group justify='space-between'>
              <Group>
                <Avatar size='sm' src={asset.logo}/>
                <Text>{asset.name} ({asset.symbol})</Text>
              </Group>
                <Button loading={isLoading} onClick={()=>getTestBalance(asset._id)} size='xs'>Request</Button>
            </Group>
        </Menu.Item>
    ))

    return (
        <Menu>
            {assetLayout}
        </Menu>
    );
};

export default TestBalanceRequest;