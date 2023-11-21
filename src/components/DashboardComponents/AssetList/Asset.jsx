import { Avatar, Button, Flex, Group, Text } from '@mantine/core';
import { useDisclosure, useHover } from '@mantine/hooks';
import { useAuthData } from '../../../context/AuthContext';
import ReceivedForm from '../../Form/ReceivedForm';
import SendForm from '../../Form/SendForm';
import ModalLayout from '../../ModalLayout/ModalLayout';

const Asset = ({asset, showBalance, allAssets}) => {
    const {name, logo, usdPrice, _id} = asset;
    const {state} = useAuthData();
    const balance = state?.authUser?.balance?.assets?.find(ast => ast.assetId === _id);
    const { hovered, ref } = useHover();
    const [sendFormOpened, { open: sendFormOpen, close: sendFormClose }] = useDisclosure(false);
    const [receiveFormOpened, { open: receiveFormOpen, close: receiveFormClose }] = useDisclosure(false);

    return (
        <>
        <Flex ref={ref} py={10} justify='space-between' key={name} align='center'>
            <Group gap="sm">
              <Avatar size={40} src={logo} radius={40} />
              <div>
                  <Text fz="sm" fw={500}> {name}</Text>
                <Group>
                  <Text>{showBalance ? (balance?.amount.toFixed(2) || '0.00') : "*****"}</Text>
                  <Text fz="xs" c='dimmed'>
                   ${ balance?.amount ? (usdPrice * balance?.amount).toFixed(5) : '0.00'}
                  </Text>
                </Group>
              </div>
            </Group>
          
            <Flex>
            <Button onClick={sendFormOpen} size='xs'>Send</Button>
            <Button onClick={receiveFormOpen} size='xs' ml='sm'>Receive</Button>
            </Flex>
        </Flex>

        <ModalLayout opened={sendFormOpened} open={sendFormOpen} close={sendFormClose} title='Send'>
             <SendForm id={_id} allAssets={allAssets}/>
        </ModalLayout>
        <ModalLayout opened={receiveFormOpened} open={receiveFormOpen} close={receiveFormClose} title='Receive'>
             <ReceivedForm userId={state?.authUser?._id} asset={asset}/>
        </ModalLayout>
        </>
    );
};

export default Asset;