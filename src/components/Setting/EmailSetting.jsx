import { Button, Divider, Paper, PasswordInput, Stack, Text, TextInput, Title, rem } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import React from 'react';

const EmailSetting = () => {
    const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
    return (
    <Paper p='md'>
        <Title size='md'>Email setting</Title>
       <Divider my={20}/>
       <form>
       <Stack>
       <Text>Current email: sdfksandkj@gmail.com</Text>
       <TextInput
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="Your email"
        placeholder="Your email"
      />
      <PasswordInput
      label="Enter password"
      placeholder="Input placeholder"
    />
      <Button type='submit'>Submit</Button>
       </Stack>
       </form>
   </Paper>
    );
};

export default EmailSetting;