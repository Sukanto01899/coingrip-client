import { Container, SimpleGrid, Text, Title, rem } from '@mantine/core';
import { IconChecks, IconServer, IconShield } from '@tabler/icons-react';
import classes from './CSS/TrustReason.module.css';

const Feature = ({ icon: Icon, title, description, className, ...others }) => {
    return (
        <div className={classes.feature} {...others}>
          <div className={classes.overlay} />
    
          <div className={classes.content}>
            <Icon style={{ width: rem(38), height: rem(38) }} className={classes.icon} stroke={1.5} />
            <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
              {title}
            </Text>
            <Text c="dimmed" fz="sm">
              {description}
            </Text>
          </div>
        </div>
      );
};

const mockdata = [
    {
      icon: IconServer,
      title: 'Secure storage',
      description:
        'We store the vast majority of the digital assets in secure offline storage.',
    },
    {
      icon: IconShield,
      title: 'Protected assets',
      description:
        'Our risk management measures are designed to protect your assets.',
    },
    {
      icon: IconChecks,
      title: 'Industry best practices',
      description:
        'Coinbase supports a variety of the most popular digital currencies.',
    },
  ];

function TrustReason() {
    const items = mockdata.map((item) => <Feature {...item} key={item.title} />);
  
    return (
      <Container className={classes.wrapper} px={0}>
        <Title className={classes.heading}>The most trusted <br /> cryptocurrency platform</Title>
        <SimpleGrid mt={50} cols={{ base: 1, sm: 3 }} spacing={50}>
          {items}
        </SimpleGrid>
      </Container>
    );
  }

export default TrustReason;