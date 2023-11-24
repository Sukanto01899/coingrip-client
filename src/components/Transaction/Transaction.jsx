import { Anchor, Badge, Group, Table } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useAuthData } from '../../context/AuthContext';

const Transaction = ({transaction}) => {
    const [transactionTime, setTransactionTime] =useState('');
    const {state: {authUser}} = useAuthData();
    const [timeEx, setTimeEx] =useState('');

    useEffect(()=>{
        const msec = Date.now() - new Date(transaction?.createdAt)
        const sec = msec / 1000;
        const min = sec /60;
        const hour = min / 60;
        const day = hour / 24;
        const month = day / 30;
        const year = month / 365;

        if(year >= 1){
            setTransactionTime(year)
            setTimeEx('years')
        }else if(month >= 1){
            setTransactionTime(month)
            setTimeEx('months')
        }else if(day >= 1){
            setTransactionTime(day)
            setTimeEx('days')
        }else if(hour >= 1){
            setTransactionTime(hour)
            setTimeEx('hours')
        }else if(min >= 1){
            setTransactionTime(min);
            setTimeEx('mins')
        }else if(sec >= 1){
            setTransactionTime(sec);
            setTimeEx('secs')
        }

        // Set transaction time
       
    }, [transaction])

    const TransactionBadge = ()=>{
        switch(transaction.transactionType){
            case 'exchange':
                return <Badge color="blue">Exchange</Badge>;
            case 'transfer':
               return transaction?.from?.uuid === authUser?._id ? <Badge color="yellow">Send</Badge> : <Badge color="green">Received</Badge>
            case 'deposit':
                return <Badge>Deposit</Badge>
            default:
                return <Badge>Withdraw</Badge>
        }
    }


    return (
        <Table.Tr>
            <Table.Td>
              <Group>
              <Anchor component="button" fz="sm">
                {transaction?.from?.name}
              </Anchor>
              <IconArrowRight/>
              </Group>
            </Table.Td>
            <Table.Td>
                <Anchor component="button" fz="sm">
                {transaction?.to?.name}
                </Anchor>
            </Table.Td>
            <Table.Td>
                {parseInt(transactionTime) +" "+ timeEx} ago
            </Table.Td>
            <Table.Td>{transaction?.amount}</Table.Td>
            <Table.Td>{transaction?.asset}</Table.Td>
            <Table.Td>
                  <TransactionBadge/>
            </Table.Td>
          </Table.Tr>
    );
};

export default Transaction;