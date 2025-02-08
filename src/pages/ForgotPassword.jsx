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
import axios from "axios";

export default function ForgotPassword() {
const form = useForm({
initialValues: { email: "" },

validate: {
    email: (value) =>
    /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email format",
},
});

const [submitted, setSubmitted] = useState(false);

const handleSubmit = async () => {
if (form.validate().hasErrors) {
    setSubmitted(false);
} else {
    try {
    const response = await axios.post("/api/auth/sendOTP", {
        email: form.values.email,
    });

    if (response.data.status === "pending") {
        setSubmitted(true);
        console.log("Reset email sent:", response.data);
    } else {
        console.error("Error:", response.data.message);
    }
    } catch (error) {
    console.error("Error sending reset request:", error);
    }
}
};

return (
<Container size={1000} my={50} p={30}>
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
        <Text c="lightgreen" ta="center" mt="md">
            Reset link has been sent to your email!
        </Text>
    )}
    </Paper>
</Container>
);
}
