import {
  Anchor,
  Card,
  Group,
  SimpleGrid,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import {
  IconBuildingBank,
  IconCashBanknote,
  IconCoin,
  IconCreditCard,
  IconReceipt,
  IconReceiptRefund,
  IconReceiptTax,
  IconRepeat,
  IconReport,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './Services.module.css';
  
  const mockdata = [
    { title: 'Credit cards', icon: IconCreditCard, color: 'violet', path: "/add-cards" },
    { title: 'Banks transfer', icon: IconBuildingBank, color: 'indigo', path: "/add-cards"  },
    { title: 'Exchange', icon: IconRepeat, color: 'blue', path: "exchange"  },
    { title: 'Refunds', icon: IconReceiptRefund, color: 'green', path: "/add-cards"  },
    { title: 'Receipts', icon: IconReceipt, color: 'teal' , path: "/add-cards" },
    { title: 'Taxes', icon: IconReceiptTax, color: 'cyan' , path: "/add-cards" },
    { title: 'Reports', icon: IconReport, color: 'pink' , path: "/add-cards" },
    { title: 'Rewards', icon: IconCoin, color: 'red' , path: "/add-cards" },
    { title: 'Referrals', icon: IconCashBanknote, color: 'orange' , path: "/add-cards" },
  ];

const Services = () => {
    const theme = useMantineTheme();
    const items = mockdata.map((item) => (
      <UnstyledButton key={item.title} className={classes.item}>
        <Link to={item.path} className={classes.link}>
          <item.icon color={theme.colors[item.color][6]} size="2rem" />
          <Text size="xs" mt={7}>
            {item.title}
          </Text>
          </Link>
        </UnstyledButton>
        
      ));
    return (
        <Card withBorder radius="md" className={classes.card}>
        <Group justify="space-between">
          <Text className={classes.title}>Services</Text>
          <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
            + 21 other services
          </Anchor>
        </Group>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>
      </Card>
  
    );
};

export default Services;