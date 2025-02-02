import { useState } from 'react';
import { TextInput, PasswordInput, Checkbox, Button, Group, Text, Paper , Title, Anchor} from '@mantine/core';
import BooksLogo from '/Logomark.svg';
import classes from '../styles/landingpage/Login.module.css';
import { AiOutlineMail} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
// import PasswordRequirement from '../components/general/PasswordStrength';


const SignUp = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formValues.username || formValues.username.length < 6) {
      newErrors.username = 'Username must be at least 6 characters long';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (formValues.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formValues.phoneNumber.length !== 11) {
      newErrors.phoneNumber = 'Phone number must be 11 digits';
    }
    if (!formValues.terms) {
      newErrors.terms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log("Success");
    }
  };

  return (
    <Paper shadow="md" p="xl" radius="md" withBorder style={{ minHeight: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img src={BooksLogo} alt="Books Logo" style={{ width: '200px', height: '200px' }} />
        </div>
    <Paper maw={700}
        shadow="md"
        p="xl"
        className={classes.loginContainer} >
    <Title align="center" 
                weight={900} 
                variant="gradient" 
                gradient={{ from: 'green', to: 'lightgreen' }} 
                className={classes.title}
                my="xl">
          Welcome To GOODREADS
        </Title>
      <form method='POST' onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          placeholder="Enter a username"
          leftSection={<CiUser size={16} />}
          styles={{
            input: { height: '50px'}, 
            label: { fontWeight:'900', marginBottom:'10px', fontSize:'1rem'}
          }}
          mt="lg"
          mb="lg"
          required
          
          className={classes.loginContainerLabel}
          value={formValues.username}
          onChange={(e) => setFormValues({ ...formValues, username: e.target.value })}
          error={errors.username}
        />
        <TextInput
          label="Email"
          placeholder="Enter your email"
          leftSection={<AiOutlineMail size={16} />}
          styles={{
            input: { height: '50px'}, 
            label: { fontWeight:'900', marginBottom:'10px', fontSize:'1rem'}
          }}
          className={classes.loginContainerLabel}
          mt="lg"
          mb="lg"
          required
          value={formValues.email}
          onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
          error={errors.email}
        />
        <TextInput
          label="Phone Number"
          leftSection={<BsTelephone size={16} />}
          placeholder="Enter your phone number"
          styles={{
            input: { height: '50px'}, 
            label: { fontWeight:'900', marginBottom:'10px', fontSize:'1rem'}
          }}
          className={classes.loginContainerLabel}
          mt="lg"
          mb="lg"
          required
          value={formValues.phoneNumber}
          onChange={(e) => setFormValues({ ...formValues, phoneNumber: e.target.value })}
          error={errors.phoneNumber}
        />
        <PasswordInput
          label="Password"
          leftSection={<RiLockPasswordLine size={16}/> }
          placeholder="Enter your password"
          styles={{
            input: { height: '50px'}, 
            label: { fontWeight:'900', marginBottom:'10px', fontSize:'1rem'}
          }}
          mt="lg"
          mb="lg"
          required
          className={classes.loginContainerLabel}
          value={formValues.password}
          onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
          error={errors.password}
        />
        <PasswordInput
          label="Confirm Password"
          leftSection={<RiLockPasswordLine size={16}/> }
          placeholder="Confirm your password"
          styles={{
            input: { height: '50px'}, 
            label: { fontWeight:'900', marginBottom:'10px', fontSize:'1rem'}
          }}
          className={classes.loginContainerLabel}
          mt="lg"
          mb="lg"
          required
          value={formValues.confirmPassword}
          onChange={(e) => setFormValues({ ...formValues, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
        />
        <Checkbox
          mt="md"
          label="I agree to the terms & conditions"
          styles={{ 
            label: { fontWeight:'900', marginBottom:'10px', fontSize:'1rem', color:'lightgreen'}
          }}
          color="lightgreen"
          required
          className={classes.loginContainerLabel}
          mb="lg"
          checked={formValues.terms}
          onChange={(e) => setFormValues({ ...formValues, terms: e.target.checked })}
          error={errors.terms}
        />
        <Group position="center" mt="md">
        <Button type="submit"
                fullWidth 
                mt="md"
                mb='lg' 
                variant="gradient" 
                gradient={{ from: 'green', to: 'lightgreen' }}
                className={classes.btnLogin}>
            Sign Up
        </Button>
        </Group>
        {errors.terms && <Text color="red" size="sm" mt="sm">{errors.terms}</Text>}
      </form>
      <Text align="center" size="sm">
          Already have an account? <Anchor href="/login">Login</Anchor>
        </Text>
    </Paper>
    </Paper>
  );
};

export default SignUp;
