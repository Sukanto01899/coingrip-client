import { Stack } from '@mantine/core';
import React from 'react';
import { useQuery } from 'react-query';
import { getReferralsFn } from '../api/baseApi';
import ServiceLayout from '../components/Layout/ServiceLayout';
import ReferralBanner from '../components/Referral/ReferralBanner';
import ReferralState from '../components/Referral/ReferralState';
import ReferralTable from '../components/Referral/ReferralTable';

const Referral = () => {
    const {data: referralsData, isLoading} = useQuery({
        queryKey: ['referrals'],
        queryFn: getReferralsFn
    })
    return (
        <ServiceLayout title="Referral">
            <Stack gap={30}>
            <ReferralBanner/>
            <ReferralState referralsData={referralsData} loading={isLoading}/>
            <ReferralTable referralsData={referralsData}/>
            </Stack>
        </ServiceLayout>
    );
};

export default Referral;