import { Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const ModalLayout = ({opened, close, open, children, title}) => {
    const isMobile = useMediaQuery('(max-width: 50em)');
    return (
        <Modal 
        zIndex={2}
        fullScreen={isMobile} 
        transitionProps={{ transition: 'fade', duration: 200 }} 
        opened={opened} 
        onClose={close}
        title={title}
        centered
        >
            {children}
        </Modal>
    );
};

export default ModalLayout;