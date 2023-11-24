import { Box, Group, NumberFormatter, Paper, Progress, SimpleGrid, Text, rem } from '@mantine/core';
import { IconArrowUpRight, IconEyeOff } from '@tabler/icons-react';
import { useAuthData } from '../../../context/AuthContext';
import LightAndDarkButton from '../../Button/LightAndDarkButton';
import classes from './BalanceState.module.css';

const data = [
  { label: 'Mobile', count: '204,001', part: 59, color: '#47d6ab' },
  { label: 'Desktop', count: '121,017', part: 35, color: '#03141a' },
  { label: 'Tablet', count: '31,118', part: 6, color: '#4fcdf7' },
];


const BalanceState = ({setShowBalance, showBalance}) => {
    const {state} = useAuthData();
  
    const segments = state?.authUser?.balance?.assets?.map((asset, i) => (
        <Progress.Section value={asset.amount / 100} color='#47d6ab' key={i}>
          {asset.part > 10 && <Progress.Label>{asset.amount / 100}%</Progress.Label>}
        </Progress.Section>
      ));
    
      const descriptions = state?.assetsData?.assets?.map((asset) => (
        <Box key={asset.name} style={{ borderBottomColor: '#47d6ab' }} className={classes.stat}>
          <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
            {asset.name}
          </Text>
    
          <Group justify="space-between" align="flex-end" gap={0}>
            <Text fw={700}>{asset.usdPrice.toFixed(2)}</Text>
            <Text c='#47d6ab' fw={700} size="sm" className={classes.statCount}>
              {80}%
            </Text>
          </Group>
        </Box>
      ));
    
    return (
        <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
          <Group align="flex-end" gap="xs">
            <Text fz="xl" fw={700}>
              {showBalance ?  <NumberFormatter prefix='$' thousandSeparator decimalScale={2} value={state?.balanceData?.balance?.totalValue} /> : '*****' }
            </Text>
            <Text c="teal" className={classes.diff} fz="sm" fw={700}>
              <span>18%</span>
              <IconArrowUpRight size="1rem" style={{ marginBottom: rem(4) }} stroke={1.5} />
            </Text>
          </Group>
          <Group>
          <IconEyeOff onClick={()=> setShowBalance(!showBalance)} size="1.4rem" className={classes.icon} stroke={1.5} />
          <LightAndDarkButton/>
          </Group>
        </Group>
  
        <Text c="dimmed" fz="sm">
          ID: {state?.authUser?._id}
        </Text>
  
        <Progress.Root size={34} classNames={{ label: classes.progressLabel }} mt={40}>
          {segments}
        </Progress.Root>
        <SimpleGrid cols={{ base: 2, xs: 3 }} mt="xl">
          {descriptions}
        </SimpleGrid>
      </Paper>
    );
};

export default BalanceState;