import { Button, Card, Center, Container, NumberInput, SimpleGrid, Stack, Title } from '@mantine/core';
import { IconRepeat } from '@tabler/icons-react';
import React from 'react';
import SelectBox from '../components/Input/SelectBox';

const Exchange = () => {
    return (
        <Container size='xs' mb={50}>
            <Title>Exchange</Title>
            <Card radius='md' bg='dark'>
            <Stack>
                <SimpleGrid cols={2}>
                   <SelectBox label="From"/>
                   <NumberInput size='md' description="0.00" label="You pay" placeholder="Do not enter negative numbers" allowNegative={false}/>
                </SimpleGrid>

                <Center><IconRepeat color='teal'/></Center>

                <SimpleGrid cols={2}>
                <SelectBox label="To"/>
                  <NumberInput size='md' description="0.00" label="You receive" placeholder="Do not enter negative numbers" allowNegative={false}/>
                </SimpleGrid>

                <Card>Exchange rate</Card>

                <Button fullWidth>Exchange</Button>
            </Stack>
        </Card>
        </Container>
    );
};

export default Exchange;