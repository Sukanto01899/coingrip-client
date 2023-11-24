import { Alert, Anchor, Container } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

const Layout = ({children}) => {
    const [user] = useAuthState(auth);
    const icon = <IconInfoCircle />;
    const emailVerified = user?.providerData[0]?.providerId === 'twitter.com' ? true : user?.emailVerified;
    return (
        <>

             <Navigation/>
            <Container mt={80} size='md'>
            {(user && !emailVerified) && <Alert radius='md' mb={16} title="Please verify you email!" py={5} color='red' icon={icon}>
                <Anchor component="button"  size='xs'>Send verification email</Anchor>
            </Alert>}
              {children}
              <Footer/>
            </Container>
        </>
    );
};

export default Layout;