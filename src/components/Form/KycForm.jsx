import { Button, FileButton, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { submitKycFn } from '../../api/baseApi';
import { useAuthData } from '../../context/AuthContext';
import useUpload from '../../hook/useUpload';
import toast from '../Toast/Toast';

const KycForm = () => {
    const {state: {authUser}} = useAuthData();
    const [file, setFile] = useState(null);

    // Get al countries
    const {data: countries} = useQuery({
        queryKey: ['countries'],
        queryFn:async ()=>{
           const res = await axios('https://restcountries.com/v3.1/region/asia?fields=name');
           return res.data;
        },
        select: (data)=>{
            const mapping = data.map(c => c.name.common);
            return mapping;
        }
    });

   

    // Form data
    const form = useForm({
        initialValues: {
            country: '',
            firstname: '',
            lastname: '',
            nid_number: '',
            birth_date: ''
        },
        validate: {
            country: (val)=> !val ? 'Invalid' : null,
            firstname: (val)=> !val ? 'Invalid' : null,
            lastname: (val)=> !val ? 'Invalid' : null,
            nid_number: (val)=> !val ? 'Invalid' : null,
            birth_date: (val)=> !val ? 'Invalid' : null
        }
    })

    // Submit kyc mutation func
    const {mutate: submitKyc} = useMutation((data)=>submitKycFn(data), {
        onSuccess: (data)=> {
            console.log(data)
        },
        onError: (err)=> {
            console.log(err)
        }
    });

    const {uploadDoc, percent, imageUrl, loading} = useUpload()

    // kyc submit handler
    const submitKycHandler =async ()=>{
        const {country, firstname, lastname, nid_number, birth_date} = form.values;
         if(!imageUrl){
            toast.error({title: 'Please upload file', message: 'It is informant'});
            return
         }
         
         submitKyc({country, firstname, lastname, nid_number, birth_date, nid_image: imageUrl})

    }

    return (
        <>
            <form onSubmit={form.onSubmit(submitKycHandler)}>
            <Stack>
                {/* Select country */}
                <Select
                    required
                    label="Select country"
                    placeholder="Select country"
                    data={countries}
                    onChange={(event) => form.setFieldValue('country', event)}
                    error={form.errors.country && form.errors.country}
                 />
                
                {/* Legel first name */}
                <TextInput
                    leftSectionPointerEvents="none"
                    placeholder="First name"
                    required
                    label="Legal first name"
                    value={form.values.firstname}
                    onChange={(event) => form.setFieldValue('firstname', event.target.value)}
                    error={form.errors.firstname && form.errors.firstname}
                 />

                 {/* Legel last name */}
                 <TextInput
                    leftSectionPointerEvents="none"
                    placeholder="Last name"
                    required
                    label="Legal last name"
                    value={form.values.lastname}
                    onChange={(event) => form.setFieldValue('lastname', event.target.value)}
                    error={form.errors.lastname && form.errors.lastname}
                 />

                 {/* Id number */}
                 <TextInput
                    leftSectionPointerEvents="none"
                    placeholder="NID card number"
                    required
                    label="NID number"
                    value={form.values.nid_number}
                    onChange={(event) => form.setFieldValue('nid_number', event.target.value)}
                    error={form.errors.nidNumber && form.errors.nidNumber}
                 />

                 {/* Birth date input */}
                 <DateInput
                    label="Date of birth" 
                    placeholder='Date of birth'
                    required
                    onChange={(val)=> form.setFieldValue('birth_date', val)}
                 />

                 {/* Image */}
                 <Group justify='space-between'>
                 <FileButton onChange={setFile} accept="image/png,image/jpeg">
                   {(props) => <Button color='gray' {...props}>Select NID photo</Button>}
                 </FileButton>
                 <Button disabled={imageUrl} loading={loading} color='gray' onClick={()=> uploadDoc(file)} size='sm'>{imageUrl ? "Uploaded": 'Upload'}</Button>
                 </Group>

                 {file && <Text>{file.name.length > 20 ? file.name.substring(0, 20) : file.name}</Text>}


               <Button type='submit'>Submit</Button>
            </Stack>
            </form>
        </>
    );
};

export default KycForm;