import { Center, Group, Paper, RingProgress, SimpleGrid, Text } from '@mantine/core';
import { IconPoint, IconUserCheck, IconUserPlus } from '@tabler/icons-react';

// const icons = {
//   up: IconArrowUpRight,
//   down: IconArrowDownRight,
// };

const ReferralState = ({referralsData, loading}) => {
  console.log(referralsData)
  const data = [
    { label: 'Total Points', stats: referralsData?.point, icon: IconPoint, color: 'teal' },
    { label: 'Total Referrals', stats: referralsData?.referrals?.length, icon: IconUserPlus, color: 'blue' },
    {
      label: 'Successful Referrals',
      stats: referralsData?.referrals.filter(ref => ref.isSuccess === true).length,
      icon: IconUserCheck,
      color: 'green',
    },
  ];


    const stats = data.map((stat) => {
        const Icon = stat.icon
        return (
          <Paper withBorder radius="md" p="xs" key={stat.label}>
            <Group>
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[{ value: 100, color: stat.color }]}
                label={
                  <Center>
                    <Icon/>
                  </Center>
                }
              />
    
              <div>
                <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                  {stat.label}
                </Text>
                <Text fw={700} size="xl">
                  {stat.stats}
                </Text>
              </div>
            </Group>
          </Paper>
        );
      });
    
      return <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>;
};

export default ReferralState;