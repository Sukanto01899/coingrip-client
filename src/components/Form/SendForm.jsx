import { Anchor, Button, Group, Image, NumberInput, PinInput, Select, Stack, Text, TextInput, Title, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCurrencyDram } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import successImg from '../../assets/success.svg';
import { useAuthData } from '../../context/AuthContext';
import useSendAsset from '../../hook/useSendAsset';

const SendForm = ({id, close}) => {
    const {state: {authUser: account, assetsData, balanceData}} = useAuthData();
    const [assetBalance, setAssetBalance] = useState(0)
    const [fee, setFee] = useState(0)
    const icon = <IconCurrencyDram style={{ width: rem(20), height: rem(20) }} stroke={1.5} />;
    const assetsIdAndNamePair = assetsData.assets.map(ass => {
      return {label: `${ass.name} (${ass.symbol})`, value: ass._id, fee: ass.fee}
    });
    
    const form = useForm({
        initialValues: {
          assetId: id || null,
          to: '',
          amount: '',
          pin: '',
        },

        validate: {
            pin: (val)=> val.length < 6 ? 'Invalid pin': null,
            assetId: (val)=> val.length < 1 ? 'Asset is required' : null,
            amount: (val)=> {
              const err1 = parseFloat(val) <= 0 ? 'Invalid amount' : null;
              const err2 = parseFloat(val) > parseFloat(assetBalance) ? "Your balance is too low." : null;

              return err1 || err2;
            },
            to: (val)=> {
              const err1 = val?.length < 1 ? 'Asset is required' : null;
              let err2;

                 if((val === account?.username) || (val === account?.email) || (val === account?._id)){
                   err2 = 'Invalid receiver address'
                 }else{
                   err2 = null
                  }

              return err1 || err2;
            }
        }
      });

      // Asset balance update
      useEffect(()=>{
        const totalValue = balanceData?.balance?.assets?.find(ass => ass.assetId === form.values.assetId);
        setAssetBalance(totalValue?.amount || 0)
      }, [form.values.assetId])

      // Fee calculation
      useEffect(()=>{
        const neededAsset = assetsData?.assets?.find(asset => asset._id === form.values.assetId);
        const fee_amount = neededAsset?.fee;
        const calculatedFee = (parseFloat(form.values.amount || 0) * fee_amount) / 100;
        setFee(calculatedFee)
      }, [form.values.amount, assetsData?.assets])

      // Send transaction request hook
      const {sendAssetHandler, isLoading, error, transactionData} = useSendAsset();

      // Transaction sender function
      const sendHandler = ()=>{
        sendAssetHandler(form.values);
        form.reset()
      }

      // // Fee calculation function
      // const feeCalculateHandler = (event = '') =>{
      //   const neededAsset = allAssets.find(asset => asset._id === form.values.assetId);
      //   const fee_amount = neededAsset.fee;
      //   if(form.values.amount) {
      //     const fee = (parseFloat(form.values.amount) * fee_amount) / 100;
      //     return fee.toFixed(2)
      //   }
      //   return '0.00'
      // }

      // Click max button to set max
      const setMaxBalance = ()=>{
        if(assetBalance){
          const value = assetBalance - parseFloat(fee);
          form.setFieldValue('amount', value.toString())
        }else{
          form.setFieldValue('amount', '0')
        }
      }

      // If transaction successful then return success element
      if(transactionData?.isSuccess){
        return <>
        <Stack align='center'>
          <Image w={100} h='auto' src={successImg}/>
          <Title>Successful</Title>
          <Button onClick={close}>Close</Button>
        </Stack>
        </>
      }
     
    return (
        <>
        <form onSubmit={form.onSubmit(sendHandler)}>
            <Stack>

       {/* Asset input */}
        <Select
        required
        label="Select asset"
        placeholder="Select Asset"
        data={assetsIdAndNamePair}
        defaultValue={id}
        onChange={(event) => form.setFieldValue('assetId', event)}
        error={form.errors.assetId && form.errors.assetId}
        >
          {/* <option>sfg</option> */}
        </Select>

       {/* To address nput */}
       <TextInput
        leftSectionPointerEvents="none"
        placeholder="User ID, Email or Username"
        required
        // leftSection={icon}
        label="To"
        value={form.values.to}
        onChange={(event) => form.setFieldValue('to', event.target.value)}
        error={form.errors.to && form.errors.to}
      />

      {/* Amount input */}
     <NumberInput
      description={`Balance ${assetBalance ? assetBalance : '0.00'}`}
      required
      label="Amount"
      placeholder="0.00"
      rightSection={icon}
      value={form.values.amount}
      allowNegative={false}
      decimalScale={5}
      onChange={(value) => form.setFieldValue('amount', value)}
      error={form.errors.amount && form.errors.amount}
    />

     {/* Balance Details */}
     <Group justify='space-between' align='center'>
        <Text size='xs'>Fee calculation: {fee.toFixed(5)}</Text>
        <Anchor component="button" fz="sm" onClick={setMaxBalance}>
          Send Max
         </Anchor>
      </Group>


    {/* Pin input */}

    <Stack align='center'>
        <Text>Enter Authentication code</Text>
        <PinInput 
        required
        type={/^[0-9]*$/}
        placeholder=''
        length={6}
        inputMode="numeric"
        onChange={(value) => form.setFieldValue('pin', value)}
        error={form.errors.pin && 'error'}
        />
    </Stack>

    <Button loading={isLoading} type='submit' w='100%'>Send</Button>
    </Stack>
    </form>
        </>
    );
};

export default SendForm;