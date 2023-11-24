import {
  Anchor,
  Card,
  Group,
  SimpleGrid,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconArrowDown,
  IconCashBanknote,
  IconCoin,
  IconCreditCard,
  IconReceipt,
  IconReceiptRefund,
  IconRepeat,
  IconReport,
  IconSend
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import ReceivedForm from '../../Form/ReceivedForm';
import SendForm from '../../Form/SendForm';
import ModalLayout from '../../ModalLayout/ModalLayout';
import classes from './Services.module.css';
import TestBalanceRequest from './TestBalanceRequest';
  
  const mockdata = [
    { title: 'Exchange', icon: IconRepeat, color: 'blue', path: '/exchange' },
    { title: 'Refunds', icon: IconReceiptRefund, color: 'green', path: 'exchange'  },
    { title: 'Receipts', icon: IconReceipt, color: 'teal' , path: 'exchange' },
    { title: 'Buy', icon: IconCreditCard, color: 'cyan' , path: '/buy'},
    { title: 'Market', icon: IconReport, color: 'pink' , path: '/markets'},
    { title: 'Rewards', icon: IconCoin, color: 'red' , path: '/rewards' },
    { title: 'Referrals', icon: IconCashBanknote, color: 'orange' , path: '/referrals' },
  ];

const Services = () => {
    const theme = useMantineTheme();
    const [sendFormOpened, { open: sendFormOpen, close: sendFormClose }] = useDisclosure(false);
    const [receiveFormOpened, { open: receiveFormOpen, close: receiveFormClose }] = useDisclosure(false);
    const [testBalanceOpened, { open: testBalanceOpen, close: testBalanceClose }] = useDisclosure(false);
    const items = mockdata.map((item) => (
      <Link to={item.path} key={item.title} className={classes.item}>
          <item.icon color={theme.colors[item.color][6]} size="2rem" />
          <Text size="xs" mt={7}>
            {item.title}
          </Text>
      </Link>
        
      ));
    return (
        <Card withBorder radius="md" className={classes.card}>
        <Group justify="space-between">
          <Text className={classes.title}>Services</Text>
          <Anchor onClick={testBalanceOpen} component='button' size="xs" c="dimmed" style={{ lineHeight: 1 }}>
            Get Test Balance
          </Anchor>
        </Group>
        <SimpleGrid cols={3} mt="md">
           <UnstyledButton onClick={sendFormOpen} className={classes.item}>
             <IconSend color={theme.colors['violet'][6]} size="2rem" />
                <Text size="xs" mt={7}>
                Send
             </Text>
            </UnstyledButton>

           <UnstyledButton onClick={receiveFormOpen} className={classes.item}>
             <IconArrowDown color={theme.colors['indigo'][6]} size="2rem" />
                <Text size="xs" mt={7}>
                Receive
             </Text>
            </UnstyledButton>

          {items} 
        </SimpleGrid>

        <ModalLayout opened={sendFormOpened} open={sendFormOpen} close={sendFormClose} title='Send'>
            <SendForm close={sendFormClose} id={'655aa2c7b0b814be1d8fe35c'} />
        </ModalLayout>
        <ModalLayout opened={receiveFormOpened} open={receiveFormOpen} close={receiveFormClose} title='Receive'>
             <ReceivedForm />
        </ModalLayout>
        <ModalLayout opened={testBalanceOpened} open={testBalanceOpen} close={testBalanceClose} title='Request for test balance'>
             <TestBalanceRequest/>
        </ModalLayout>
      </Card>
  
    );
};

export default Services;