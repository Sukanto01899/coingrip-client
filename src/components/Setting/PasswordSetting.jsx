import { Button, Divider, Paper, PasswordInput, Stack, Title } from '@mantine/core';
import React from 'react';

const PasswordSetting = () => {
    return (
    <Paper p='md'>
        <Title size='md'>Password setting</Title>
       <Divider my={20}/>
       <form>
       <Stack>
       <PasswordInput
      label="Current password"
      placeholder="Input placeholder"
    />
      <PasswordInput
      label="New password"
      placeholder="Input placeholder"
    />
      <PasswordInput
      label="Confirm password"
      placeholder="Input placeholder"
    />
      <Button type='submit'>Change password</Button>
       </Stack>
       </form>
   </Paper>
    );
};

export default PasswordSetting;