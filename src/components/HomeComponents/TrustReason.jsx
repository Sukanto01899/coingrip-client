import { Container, SimpleGrid, Text, rem } from '@mantine/core';
import { IconCertificate, IconCoin, IconTruck } from '@tabler/icons-react';
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
      icon: IconTruck,
      title: 'Free Worldwide shipping',
      description:
        'As electricity builds up inside its body, it becomes more aggressive. One theory is that the electricity.',
    },
    {
      icon: IconCertificate,
      title: 'Best Quality Product',
      description:
        'Slakoth’s heart beats just once a minute. Whatever happens, it is content to loaf around motionless.',
    },
    {
      icon: IconCoin,
      title: 'Very Affordable Pricing',
      description:
        'Thought to have gone extinct, Relicanth was given a name that is a variation of the name of the person who discovered.',
    },
  ];

function TrustReason() {
    const items = mockdata.map((item) => <Feature {...item} key={item.title} />);
  
    return (
      <Container px={0}>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
          {items}
        </SimpleGrid>
      </Container>
    );
  }

export default TrustReason;