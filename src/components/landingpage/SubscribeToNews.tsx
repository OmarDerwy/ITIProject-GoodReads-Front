import React from 'react';
import { Button, Image, Text, TextInput, Title, Input, Container, Box } from '@mantine/core';
import image from '../../assets/newsLetter.svg';
import classes from '../../styles/landingpage/EmailBanner.module.css';
import { useState } from 'react';


export function EmailBanner() {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(event.currentTarget.value));
  };

  const handleSubscribe = () => {
    if (isValidEmail) {
      // Handle subscription logic here (e.g., API call)
      console.log('Subscribing with email:', email);
      // Optionally clear the input after successful subscription
      setEmail('');
    } else {
        console.log("Email is not valid")
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Never miss any updates...</Title>
        <Text fw={900} fz="lg" mb={5}>
          Subscribe to our newsletter!
        </Text>
        <Text fz="sm" c="dimmed">
          You will never miss important product updates, latest news and community QA sessions. Our
          newsletter is once a week, every Sunday.
        </Text>

        <div className={classes.controls}>
          <TextInput
            placeholder="Your email"
            value={email}
            onChange={handleEmailChange}
            error={!isValidEmail && email !== '' ? "Invalid email format" : null}
            classNames={{ input: classes.input, root: classes.inputWrapper }}
          />
          <Button 
            className={`${classes.control} ${classes.btnSubscribe}`} 
            onClick={handleSubscribe} 
            mt="sm" 
            variant="gradient" 
            gradient={{ from: 'green', to: 'lightgreen' }}
            >
            Subscribe
          </Button>
        </div>
      </div>
      <Image src={image} className={classes.image} />
    </div>
  );
}