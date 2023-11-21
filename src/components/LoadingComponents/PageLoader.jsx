import { Loader, Stack, Text } from '@mantine/core';
import React from 'react';

const PageLoader = () => {
    return (
        <>
            <Stack h='100vh' justify='center' align='center'>
              <Loader color="blue" size={100}/>
              <Text>Loading...</Text>
            </Stack>
        </>
    );
};

export default PageLoader;