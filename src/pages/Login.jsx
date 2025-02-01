import { useState } from 'react';
import classes from '../styles/landingpage/Login.module.css';
import { TextInput, PasswordInput, Button, Checkbox, Divider, Text, Paper, Group, Anchor, Title } from '@mantine/core';
import BooksLogo from '/Logomark.svg';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
            label="Username"
            styles={{
              input: { height: '50px'}, 
              label: { fontWeight:'900', marginBottom:'10px', fontSize:'1rem'}
            }}
            className={classes.loginContainerLabel}            
            placeholder="Enter a Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            mt="xl"
            mb="xl"
          />
          <PasswordInput
            label="Password"
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
            <Checkbox label="Remember me" mt="md"/>
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



