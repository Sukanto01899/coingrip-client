import { Avatar, Button, Divider, Fieldset, FileButton, Group, Paper, Stack, Text, TextInput, Title } from '@mantine/core';
import React, { useState } from 'react';

const ProfileSetting = () => {
    const [files, setFiles] = useState([]);
    return (
        <Paper p='md'>
            <Title size='md'>Profile setting</Title>
            <Divider my={20}/>
            <form>
            <Stack>
                
               <Group>
                  <Avatar src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png" size='xl'/>
                  <FileButton onChange={setFiles} accept="image/png,image/jpeg">
                  {(props) => <Button {...props}>Upload image</Button>}
                 </FileButton>
                 <Text>{files?.name && files.name}</Text>
               </Group>
               

               <TextInput
        rightSectionPointerEvents="none"
        label="Your name"
        placeholder="Your name"
      />
               <Fieldset legend="Social accounts">
                 <TextInput label="Twitter" placeholder="Your name" />
                 <TextInput label="Email" placeholder="Email" mt="md" />
                </Fieldset>


                <Button type='submit'>Submit</Button>
            </Stack>
            </form>
        </Paper>
    );
};

export default ProfileSetting;