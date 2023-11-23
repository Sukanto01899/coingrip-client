import { Flex, Paper, Text } from '@mantine/core';
import { useAuthData } from '../../../context/AuthContext';
import TableSkeleton from '../../LoadingComponents/TableSkeleton';
import Asset from './Asset';

const AssetList = ({showBalance}) => {
  const {state} = useAuthData();

    const rows = state?.assetsData?.assets?.map((asset, i) => (
        <Asset key={i} asset={asset}  showBalance={showBalance}/>
      ));
    return (

   <Paper withBorder radius='md' p='md' mt={20}>
    <Text fz="xl" fw={700}>Your Portfolio</Text>
    <Flex justify='space-between' py={10}>
      <Text>Assets</Text>
      <Text>Send / Receive</Text>
    </Flex>
    {state?.assets?.assets?.loading ? <TableSkeleton/> : rows}
   </Paper>
    );
};

export default AssetList;