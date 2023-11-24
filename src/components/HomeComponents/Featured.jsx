import { Button, Grid, SimpleGrid, Text, ThemeIcon, Title, rem } from '@mantine/core';
import { IconCircleDotted, IconFileCode, IconFlame, IconReceiptOff } from '@tabler/icons-react';
import classes from './CSS/Featured.module.css';

const features = [
    {
      icon: IconReceiptOff,
      title: 'Free and open source',
      description: 'All packages are published under MIT license, you can use Mantine in any project',
    },
    {
      icon: IconFileCode,
      title: 'TypeScript based',
      description: 'Build type safe applications, all components and hooks export types',
    },
    {
      icon: IconCircleDotted,
      title: 'No annoying focus ring',
      description:
        'With new :focus-visible selector focus ring will appear only when user navigates with keyboard',
    },
    {
      icon: IconFlame,
      title: 'Flexible',
      description:
        'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
    },
  ];

const Featured = () => {
    const items = features.map((feature) => (
        <div key={feature.title}>
          <ThemeIcon
            size={44}
            radius="md"
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
          >
            <feature.icon style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
          </ThemeIcon>
          <Text fz="lg" mt="sm" fw={500}>
            {feature.title}
          </Text>
          <Text c="dimmed" fz="sm">
            {feature.description}
          </Text>
        </div>
      ));
    
      return (
        <div className={classes.wrapper}>
          <Grid gutter={80}>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Title className={classes.title} order={2}>
                Earn up to $10 worth of crypto
              </Title>
              <Text c="dimmed">
              Discover how specific cryptocurrencies work — and get a bit of each crypto to try out for yourself.
              </Text>
    
              <Button
                variant="gradient"
                gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
                size="lg"
                radius="md"
                mt="xl"
              >
                Start Earning
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
                {items}
              </SimpleGrid>
            </Grid.Col>
          </Grid>
        </div>
      );
};

export default Featured;