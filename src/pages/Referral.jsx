import { Stack } from '@mantine/core';
import React from 'react';
import ServiceLayout from '../components/Layout/ServiceLayout';
import ReferralBanner from '../components/Referral/ReferralBanner';
import ReferralState from '../components/Referral/ReferralState';

const Referral = () => {
    return (
        <ServiceLayout title="Referral">
            <Stack gap={30}>
            <ReferralBanner/>
            <ReferralState/>
            </Stack>
        </ServiceLayout>
    );
};

export default Referral;