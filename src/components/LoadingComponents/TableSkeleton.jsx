import { Skeleton, Stack } from '@mantine/core';
import React from 'react';

const TableSkeleton = () => {
    return (
        <Stack>
             <Skeleton height={50} radius="xs" />
             <Skeleton height={50} radius="xs" />
             <Skeleton height={50} radius="xs" />
             <Skeleton height={50} radius="xs" />
             <Skeleton height={50} radius="xs" />
        </Stack>
    );
};

export default TableSkeleton;