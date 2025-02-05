import { Button, Group, SimpleGrid, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AiOutlineMail} from "react-icons/ai";
import classes from '../../styles/general/GetInTouch.module.css';
import React from 'react';


export function GetInTouchSimple() {
const form = useForm({
initialValues: {
    name: '',
    email: '',
    subject: '',
    message: '',
},
validate: {
    name: (value) => (value.trim().length < 2 ? "Name must be at least 2 characters" : null),
    email: (value) => (!/^\S+@\S+\.\S+$/.test(value) ? "Invalid email format" : null),
    subject: (value) => (value.trim().length === 0 ? "Subject is required" : null),
},
});

return (
<form className={classes.container} onSubmit={form.onSubmit(() => {})}>
    <Title order={2} className={classes.title} ta="center">
        Get in touch
    </Title>

    <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
    <TextInput
        label="Name"
        placeholder="Your name"
        name="name"
        required
        variant="filled"
        className={classes.contactUsFormLabel}
        styles={{
            input: { height: '50px'}, 
            label: { fontWeight:'900', marginBottom:'10px', fontSize:'1rem'}
        }}
        {...form.getInputProps('name')}
    />
    <TextInput
        label="Email"
        leftSection={<AiOutlineMail size={16} />}
        placeholder="Your email"
        name="email"
        mb="xl"
        required
        variant="filled"
        className={classes.contactUsFormLabel}
        styles={{
            input: { height: '50px'}, 
            label: { fontWeight:'900', marginBottom:'10px', fontSize:'1rem'}
        }}
        {...form.getInputProps('email')}
    />
    </SimpleGrid>

    <TextInput
    label="Subject"
    placeholder="Subject"
    mt="md"
    mb="xl"
    
    name="subject"
    variant="filled"
    className={classes.contactUsFormLabel}
    styles={{
        input: { height: '50px'}, 
        label: { fontWeight:'900', marginBottom:'10px', fontSize:'1rem'}
    }}
    {...form.getInputProps('subject')}
    />
    
    <Textarea
    mt="md"
    label="Message"
    placeholder="Your message"
    maxRows={10}
    minRows={5}
    autosize
    
    name="message"
    variant="filled"
    className={classes.contactUsFormLabel}
    styles={{
        input: { height: '200px'}, 
        label: { fontWeight:'900', marginBottom:'10px', fontSize:'1rem'}
    }}
    {...form.getInputProps('message')}
    />

    <Group justify="center" mt="xl">
    <Button variant="gradient" 
            gradient={{ from: 'green', to: 'lightgreen' }} 
            type="submit" 
            size="md" 
            mt="lg"
            mb="md"
            className={classes.btnSubmit}>
        Send message
    </Button>
    </Group>
</form>
);
}
