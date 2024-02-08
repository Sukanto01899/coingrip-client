import { Table } from '@mantine/core';
import React from 'react';

const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];


const ReferralTable = ({referralsData}) => {
    console.log(referralsData)

    const rows = referralsData?.referrals.map((referral) => (
        <Table.Tr key={referral._id}>
          <Table.Td>{referral.userId}</Table.Td>
          <Table.Td>{referral.isSuccess ? 'Verified' : 'Unverified'}</Table.Td>
        </Table.Tr>
      ));

    return (
         <Table mb={50}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Referred User</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    );
};

export default ReferralTable;