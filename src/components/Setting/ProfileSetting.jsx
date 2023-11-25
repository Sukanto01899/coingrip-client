import { Avatar, Button, Divider, Fieldset, FileButton, Group, Paper, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const ProfileSetting = () => {
    const [user] = useAuthState(auth)
    const [files, setFiles] = useState([]);
    const form = useForm({
        initialValues: {
            name: '',
            twitter: '',
            github: '',
            linkedin: ''
        },
        validate: {
            twitter: (val) => !val.includes('twitter.com') ? 'Invalid' : null,
            github: (val) => !val.includes('github.com') ? 'Invalid' : null,
            linkedin: (val) => !val.includes('linkedin.com') ? 'Invalid' : null
        }
    })

    return (
        <Paper p='md'>
            <Title size='md'>Profile setting</Title>
            <Divider my={20}/>
            <form>
            <Stack>
                
               <Group>
                  <Avatar src={user.photoURL} size='xl'/>
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
                 <TextInput label="Twitter" placeholder="Your twitter profile link" />
                 <TextInput label="Github" placeholder="Your github profile link" mt="md" />
                 <TextInput label="Linkedin" placeholder="Your linkedin profile link" mt="md" />
               </Fieldset>


                <Button type='submit'>Submit</Button>
            </Stack>
            </form>
        </Paper>
    );
};

export default ProfileSetting;