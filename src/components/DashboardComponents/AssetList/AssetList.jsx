import { Flex, Paper, Text } from '@mantine/core';
import { useAuthData } from '../../../context/AuthContext';
import TableSkeleton from '../../LoadingComponents/TableSkeleton';
import Asset from './Asset';

const AssetList = ({showBalance}) => {
  const {state} = useAuthData();

    const rows = state?.assetsData?.assets?.map((asset, i, allAssets) => (
        <Asset key={i} asset={asset} allAssets={allAssets} showBalance={showBalance}/>
      ));
    return (

   <Paper withBorder radius='md' p='md' mt={20}>
    <Flex justify='space-between' py={10}>
      <Text>Assets</Text>
      <Text>Send / Receive</Text>
    </Flex>
    {state?.assets?.assets?.loading ? <TableSkeleton/> : rows}
   </Paper>
    );
};

export default AssetList;