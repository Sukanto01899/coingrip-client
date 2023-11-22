import { Button, Card, Center, Container, NumberInput, SimpleGrid, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconRepeat } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import SelectBox from '../components/Input/SelectBox';
import { useAuthData } from '../context/AuthContext';
import useExchangeAsset from '../hook/useExchangeAsset';

const Exchange = () => {
    const {state: {assetsData: {assets, loading}, authUser: {balance}}} = useAuthData();
    const [fromAssetAmount, setFormAssetAmount] = useState(0);
    const [toAssetAmount, setToAssetAmount] = useState(0);
    const {exchangeAsset, isLoading} = useExchangeAsset()
    
    const form = useForm({
        initialValues: {
            assetFrom: '',
            assetTo: '',
            amountToPay: 0,
            amountToReceived: '0'
        },

        validate: {
            assetFrom: (val)=> val.length <= 0 ? "Please select a asset" : null,
            assetTo: (val)=> val.length <= 0 ? "Please select a asset" : null,
            amountToPay: (val)=> !val ? "Invalid amount" : null
        }
    })

    // Show user to selected asset amount which he have
    useEffect(()=>{
        const selectedFromUserAssetBalance = balance?.assets?.find(asset => asset.symbol === form.values.assetFrom);
        const selectedToUserAssetBalance = balance?.assets?.find(asset => asset.symbol === form.values.assetTo);
        if(selectedFromUserAssetBalance){
            setFormAssetAmount(selectedFromUserAssetBalance.amount.toFixed(2))
        }
        if(selectedToUserAssetBalance){
            setToAssetAmount(selectedToUserAssetBalance.amount.toFixed(2))
        }
    }, [form.values, balance]);

    // Calculate receivable amount
    const updateReceiveAmount = (payAmount)=>{
        const {assetFrom, assetTo} = form.values;
        // Select From asset
        const fromAssetSelection = assets.find(asset => asset.symbol === assetFrom);
        // Select To asset
        const toAssetSelection = assets.find(asset => asset.symbol === assetTo);
        // Get From Asset usd price
        const fromAssetPrice = parseFloat(fromAssetSelection.usdPrice.toFixed(5));
        // Get To Asset usd price
        const toAssetPrice = parseFloat(toAssetSelection.usdPrice.toFixed(5));
        // Calculate total from asset value in usd (from input value * amount to pay )
        const totalExchangeAmount = fromAssetPrice * parseFloat(payAmount);
        const totalReceived = totalExchangeAmount / parseFloat(toAssetPrice);
        form.setFieldValue('amountToReceived', totalReceived.toFixed(5))
    }

    // if Amount to pay value change then call receive amount calculator function
    const onChangeHandler = (value)=>{
        form.setFieldValue('amountToPay', parseFloat(value));
        updateReceiveAmount(parseFloat(value));
    }

    // Exchange button click handler
    const exchangeHandler = ()=>{
        const {assetFrom, assetTo, amountToPay} = form.values;
        if(assetFrom === assetTo){
            return console.log('You can not exchange same assets')
        }
        exchangeAsset({from: assetFrom, to: assetTo, amount: amountToPay});
    }

    return (
        <Container size='xs' mb={50} px={5}>
            <Center mb={20}><Title>Exchange</Title></Center>
            <form onSubmit={form.onSubmit(exchangeHandler)}>
            <Card radius='md' bg='dark'>
            <Stack>
                <SimpleGrid cols={2}>
                   <SelectBox 
                      value={form.values.assetFrom} 
                      setValue={form.setFieldValue} 
                      assets={assets} 
                      label="From" 
                      valueFor="assetFrom"
                      error={form.errors.assetFrom && form.errors.assetFrom}
                   />
                   <NumberInput 
                     required 
                     disabled={!form.values.assetFrom || !form.values.assetTo}
                     onChange={onChangeHandler} 
                     size='md' 
                     description={fromAssetAmount || "0.00"} 
                     label="You pay" 
                     placeholder="Exchange amount" 
                     allowNegative={false} 
                     error={form.errors.amountToPay && form.errors.amountToPay}
                     />
                </SimpleGrid>

                <Center><IconRepeat color='teal'/></Center>

                <SimpleGrid cols={2}>
                    <SelectBox 
                      value={form.values.assetTo} 
                      setValue={form.setFieldValue} 
                      assets={assets} 
                      label="To" 
                      valueFor="assetTo"
                      error={form.errors.toAsset && form.errors.toAsset}
                      />
                   <NumberInput
                      disabled
                      value={form.values.amountToReceived}
                      required 
                      size='md' 
                      description={toAssetAmount || "0.00"} 
                      label="You receive" 
                      placeholder="Do not enter negative numbers" 
                      allowNegative={false}
                    />
                </SimpleGrid>

                <Card>Exchange rate</Card>

                <Button loading={isLoading} type='submit' fullWidth>Exchange</Button>
            </Stack>
        </Card>
            </form>
        </Container>
    );
};

export default Exchange;