import { Box, Center, Divider, Title } from '@mantine/core';
import React from 'react';

const ServiceLayout = ({title, children}) => {
    return (
        <Box mih='100vh'>
            <Center mb={20}><Title >{title}</Title></Center>
            <Divider mb={30}/>
            {children}
        </Box>
    );
};

export default ServiceLayout;