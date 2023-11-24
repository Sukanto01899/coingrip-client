import { Pagination, Paper, Table, Text } from '@mantine/core';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getTransactionsFn } from '../../api/baseApi';
import TableSkeleton from '../LoadingComponents/TableSkeleton';
import Transaction from "./Transaction";

const TransactionList = () => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(0);
  
  const {data: transactions, isLoading, error, refetch} = useQuery({
    queryKey: ['transactions', page],
    queryFn: ()=>getTransactionsFn({limit, page: page -1}),
    staleTime: 10000,
    onSuccess: (data)=>{
      console.log(data.total)
      setSize(Math.ceil(data.total / limit))
    }
  });

  // console.log(pagination)
     
    return (
          <Paper withBorder radius='md' p='md' mt='lg'>
            <Text fz="xl" fw={700}>Your Latest Transaction</Text>

            {isLoading ? <TableSkeleton/> : 
            <Table.ScrollContainer minWidth={800}>
              <Table verticalSpacing="xs">
                <Table.Thead>
                  <Table.Tr>
                   <Table.Th>From</Table.Th>
                   <Table.Th>To</Table.Th>
                   <Table.Th>Time</Table.Th>
                   <Table.Th>Amount</Table.Th>
                   <Table.Th>Asset</Table.Th>
                   <Table.Th>Status</Table.Th>
                   </Table.Tr>
                </Table.Thead>
          <Table.Tbody>
            {transactions?.transactions?.map((transaction, i) => <Transaction key={i} transaction={transaction}/>)}
          </Table.Tbody>
           </Table>
          </Table.ScrollContainer>}
            {transactions?.total <= 0  ?  <Text>You don't have any transaction!</Text> : null}
            {transactions?.total <= 0 || <Pagination value={page} onChange={setPage} size='sm' total={size} />}
          </Paper>
    );
};

export default TransactionList;