import { useState } from "react";
import classes from "../styles/general/ResetPassword.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { useForm } from "@mantine/form";
import {
Anchor,
Box,
Button,
Center,
Container,
Group,
Paper,
Text,
TextInput,
Title,
} from "@mantine/core";

export function ForgotPassword() {
const form = useForm({
initialValues: { email: "" },

validate: {
    email: (value) =>
    /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email format",
},
});

const [submitted, setSubmitted] = useState(false);

const handleSubmit = () => {
if (form.validate().hasErrors) {
    setSubmitted(false);
} else {
    setSubmitted(true);
    console.log("Valid email submitted:", form.values.email);
    // API request here for password reset
}
};

return (
<Container size={1000} my={30} p={30}>
    <Title className={classes.title} ta="center">
    Forgot your password?
    </Title>
    <Text c="#90EE90" fz="lg" ta="center" mt="20px">
    Enter your email to get a reset link
    </Text>
    <Paper
    className={classes.container}
    withBorder
    shadow="md"
    p={30}
    radius="md"
    mt="xl"
    >

    <TextInput
        label="Your email"
        placeholder="Enter your email"
        required
        styles={{
        input: { height: "50px" },
        label: {
            fontWeight: "900",
            marginBottom: "15px",
            fontSize: "1rem",
        },
        }}
        mt="lg"
        mb="xl"
        className={classes.resetContainerLabel}
        {...form.getInputProps("email")}
    />

    <Group justify="space-between" mt="xl" mb="md" className={classes.controls}>
        <Anchor href="/login" c="dimmed" size="sm" className={classes.control}>
        <Center inline>
            <FaArrowLeft />
            <Box c="green" ml={5}>Back to the login page</Box>
        </Center>
        </Anchor>

        <Button
        className={classes.btnReset}
        variant="gradient"
        gradient={{ from: "green", to: "lightgreen" }}
        onClick={handleSubmit}
        >
        Reset password
        </Button>
    </Group>

    {submitted && (
        <Text  ta="center" mt="md">
        ✅ Reset link has been sent to your email!
        </Text>
    )}
    </Paper>
</Container>
);
}
