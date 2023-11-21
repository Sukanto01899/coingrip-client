import { Container } from '@mantine/core';
import React from 'react';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

const Layout = ({children}) => {
    return (
        <>

             <Navigation/>
            <Container mt={80} size='md'>
              {children}
              <Footer/>
            </Container>
        </>
    );
};

export default Layout;