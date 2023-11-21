import { Flex, Paper, Text } from '@mantine/core';
import { useQuery } from 'react-query';
import { getAssetsFn } from '../../../api/baseApi';
import { useAuthData } from '../../../context/AuthContext';
import TableSkeleton from '../../LoadingComponents/TableSkeleton';
import Asset from './Asset';

const AssetList = ({showBalance}) => {
  const {dispatch} = useAuthData();
  const {data: assets, isLoading} = useQuery({
    queryKey: ['assets'], 
    queryFn: getAssetsFn,
    staleTime: 10000,
    select: (data)=> data,
    onSuccess: (data) => {
      dispatch({ type: 'SET_ASSETS', payload: data });
    }
  })

    const rows = assets?.map((asset, i, allAssets) => (
        <Asset key={i} asset={asset} allAssets={allAssets} showBalance={showBalance}/>
      ));
    return (

   <Paper withBorder radius='md' p='md' mt={20}>
    <Flex justify='space-between' py={10}>
      <Text>Assets</Text>
      <Text>Send / Receive</Text>
    </Flex>
    {isLoading ? <TableSkeleton/> : rows}
   </Paper>
    );
};

export default AssetList;