import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import classes from '../styles/landingpage/Login.module.css';
import { TextInput, PasswordInput, Button, Checkbox, Divider, Text, Paper, Group, Anchor, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications'
import BooksLogo from '/Logomark.svg';
import { RiLockPasswordLine } from "react-icons/ri";


const Login = () => {
  //user input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false)
  //location hook
  const location = useLocation();
  // notifications.show({
  //   message: 'just a test',
  //   color: 'green'
  // })
  if(location.state){
    location.state.registerSuccess && notifications.show({
      title:'Registeration successful!',
      message:"User has been registered successfuly.",
      color: 'green'
    })
    location.state.registerSuccess = false
  }
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const handleLogin = (e) => {
    e.preventDefault();
    
    const userFound = users.find(user => user.name === username && user.password === password);
    
    if (userFound) {
      alert(`Welcome back, ${userFound.name}!`);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Paper shadow="md" p="xl" radius="md" withBorder style={{ minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img src={BooksLogo} alt="Books Logo" style={{ width: '200px', height: '200px' }} />
      </div>
      <Paper
        maw={700}
        shadow="md"
        p="xl"
        className={classes.loginContainer} 
      >
        <Title align="center" 
                weight={900} 
                variant="gradient" 
                gradient={{ from: 'green', to: 'lightgreen' }} 
                className={classes.title}
                my="xl">
          Welcome Back
        </Title>

        <form onSubmit={handleLogin}>
          <TextInput
            label="Email"
            styles={{
              input: { height: '50px'}, 
              label: { fontWeight:'900', marginBottom:'10px', fontSize:'1rem'}
            }}

            className={classes.loginContainerLabel}            
            placeholder="Enter your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mt="xl"
            mb="xl"
          />
          <PasswordInput
            label="Password"
            leftSection={<RiLockPasswordLine size={16}/> }
            styles={{
              input: { height: '50px', marginBottom:'10px'}, 
              label: { fontWeight:'900', marginBottom:'10px', fontSize:'1rem'}
            }}
            className={classes.loginContainerLabel}  
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mt="lg"
            mb="lg"
          />
          {error && <Text color="red" mt={20} size="sm">{error}</Text>}
          <Group position="apart" mt="sm">
            <Checkbox label="Remember me" mt="md" color="lightgreen"/>
            <Anchor href="/reset-password" size="sm" styles={{ label: { color: '#FDF5EA' } }} mt="lg">Forgot your password?</Anchor>
          </Group>
          <Button fullWidth 
                  mt="xl" 
                  type="submit" 
                  variant="gradient" 
                  gradient={{ from: 'green', to: 'lightgreen' }}
                  className={classes.btnLogin}
                  >
            Sign in
          </Button>
        </form>
        <Divider my="xl" label="Or" labelPosition="center" />
        <Text align="center" size="sm">
          Do not have an account? <Anchor href="/sign-up">Sign up now</Anchor>
        </Text>
      </Paper>
    </Paper>
  );
};

export default Login;




