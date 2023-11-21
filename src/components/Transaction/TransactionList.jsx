import { Paper, Table, Text } from '@mantine/core';
import { useQuery } from 'react-query';
import { getTransactionsFn } from '../../api/baseApi';
import TableSkeleton from '../LoadingComponents/TableSkeleton';
import Transaction from "./Transaction";

const TransactionList = () => {

  const {data: transactions, isLoading, error, refetch} = useQuery({
    queryKey: ['transactions'], 
    queryFn: getTransactionsFn,
    staleTime: 10000
  })

  console.log(transactions)
     
    return (
          <Paper withBorder radius='md' p='md' mt='lg'>
            <Text fw={900}>Your Latest Transaction</Text>

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
            {transactions?.map((transaction, i) => <Transaction key={i} transaction={transaction}/>)}
          </Table.Tbody>
           </Table>
          </Table.ScrollContainer>}
            {transactions?.length <= 0  ?  <Text>You don't have any transaction!</Text> : null}
          </Paper>
    );
};

export default TransactionList;