import { useState } from 'react';
import { PasswordInput, Container, Button, Group, Text, Paper, Title, PinInput } from '@mantine/core';
import classes from "../styles/general/ResetPassword.module.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/config';

const ResetPassword = () => {
const navigate = useNavigate();
const [formValues, setFormValues] = useState({
newPassword: '',
confirmNewPassword: '',
otp: ''
});
const [errors, setErrors] = useState({});
const [successMessage, setSuccessMessage] = useState('');

const validate = () => {
const newErrors = {};
if (formValues.newPassword.length < 8) {
    newErrors.newPassword = 'Password must be at least 8 characters long';
}
else if (!/[A-Z]/.test(formValues.newPassword)) {
    newErrors.newPassword = 'Password must contain at least one uppercase letter';
}
else if (!/[a-z]/.test(formValues.newPassword)) {
    newErrors.newPassword = 'Password must contain at least one lowercase letter';
}
else if (!/\d/.test(formValues.newPassword)) {
    newErrors.newPassword = 'Password must contain at least one digit';
}
else if (!/[@$!%*?&]/.test(formValues.newPassword)) {
    newErrors.newPassword = 'Password must contain at least one special character (@$!%*?&)';
}
if (formValues.newPassword !== formValues.confirmNewPassword) {
    newErrors.confirmNewPassword = 'Passwords do not match';
}
setErrors(newErrors);
return Object.keys(newErrors).length === 0;
};

const handleSubmit = (event) => {
event.preventDefault();
if (validate()) {
    axiosInstance.post('/api/auth/reset-password', {
    password: formValues.newPassword,
    })
    .then((response) => {
    console.log(response);
    setSuccessMessage('✅ Password has been reset successfully!');
    setTimeout(() => navigate('/login'), 3000);
    })
    .catch((error) => {
        console.log(error);
        setErrors({ apiError: 'Failed to reset password. Try again later.' });
    });
}
};

return (
<Container size={1000} my={30} p={30}>
    <Title align="center" weight={900} variant="gradient" gradient={{ from: 'green', to: 'lightgreen' }} className={classes.title} my="xl">
    Reset Your Password
    </Title>
    <Paper maw={700} shadow="md" p="xl" my={30} className={classes.container}>
    <form method='POST' onSubmit={handleSubmit}>
        <Text size="md" weight={900} mt="lg" mb="sm" className={classes.resetContainerLabel}>OTP <span style={{ color: 'red' }}>*</span></Text>
        <PinInput 
            label="OTP"
            length={4}
            type="number"
            inputType="tel" 
            inputMode="numeric" 
            value={formValues.otp}
            onChange={(value) => setFormValues({ ...formValues, otp: value })}
            error={errors.otp}
            required
        />
        <PasswordInput
        label="New Password"
        leftSection={<RiLockPasswordLine size={16}/> }
        placeholder="Enter your new password"
        styles={{ input: { height: '50px' }, label: { fontWeight:'900', marginBottom:'10px', fontSize:'1rem'} }}
        className={classes.resetContainerLabel}
        mt="lg"
        mb="lg"
        required
        value={formValues.newPassword}
        onChange={(e) => setFormValues({ ...formValues, newPassword: e.target.value })}
        error={errors.newPassword}
        />
        <PasswordInput
        label="Confirm New Password"
        leftSection={<RiLockPasswordLine size={16}/> }
        placeholder="Confirm your new password"
        styles={{ input: { height: '50px' }, label: { fontWeight:'900', marginBottom:'10px', fontSize:'1rem'} }}
        className={classes.resetContainerLabel}
        mt="lg"
        mb="lg"
        required
        value={formValues.confirmNewPassword}
        onChange={(e) => setFormValues({ ...formValues, confirmNewPassword: e.target.value })}
        error={errors.confirmNewPassword}
        />
        <Group position="center" mt="md">
        <Button type="submit" fullWidth mt="md" mb='lg' variant="gradient" gradient={{ from: 'green', to: 'lightgreen' }} className={classes.btnLogin}>
            Reset Password
        </Button>
        </Group>
        {successMessage && <Text color="lightgreen" size="sm" mt="sm" align="center">{successMessage}</Text>}
        {errors.apiError && <Text color="red" size="sm" mt="sm" align="center">{errors.apiError}</Text>}
    </form>
    </Paper>
</Container>
);
};

export default ResetPassword;
