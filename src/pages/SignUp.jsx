import { useEffect, useState } from "react";
import { useDisclosure } from '@mantine/hooks';
import {
  PinInput,
  Modal,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Group,
  Text,
  Paper,
  Title,
  Anchor,
  Avatar,
  FileInput,
  Loader,
} from "@mantine/core";
import classes from "../styles/landingpage/Login.module.css";
//react-router-dom
import { useNavigate } from "react-router-dom";
//logo
import BooksLogo from "/Logomark.svg";
//icons
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
// import PasswordRequirement from '../components/general/PasswordStrength';
//axios
import axiosInstance from "../apis/config";
import { use } from "react";
import { notifications } from "@mantine/notifications";

const SignUp = () => {
  //init useNaviate
  const navigate = useNavigate();
  //init form values state
  const [formValues, setFormValues] = useState({
    username: "dummy1",
    email: "dummy1@gmail.com",
    password: "6482Awed%",
    confirmPassword: "6482Awed%",
    phoneNumber: "01234567898",
    terms: true,
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useDisclosure();
  const [otp, setOtp] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const validate = () => {
    const newErrors = {};
    if (!formValues.username || formValues.username.length < 6) {
      newErrors.username = "Username must be at least 6 characters long";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(formValues.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formValues.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/\d/.test(formValues.password)) {
      newErrors.password = "Password must contain at least one digit";
    } else if (!/[@$!%*?&]/.test(formValues.password)) {
      newErrors.password =
        "Password must contain at least one special character (@$!%*?&)";
    }

    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (formValues.phoneNumber.length !== 11) {
      newErrors.phoneNumber = "Phone number must be 11 digits";
    }
    if (!formValues.terms) {
      newErrors.terms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log("signup validated");
      const sendPackage = {
        name: formValues.username,
        email: formValues.email,
        password: formValues.password,
      }
      console.log(sendPackage);
      const formData = new FormData();
      Object.keys(sendPackage).forEach(key => formData.append(key, sendPackage[key]));
      setLoading(true)
      axiosInstance.post('/api/auth/register', formData)
      .then((response) => {
        setLoading(false);
        console.log(response);
        setUserId(response.data.data.userId);
        //send registration success
        setOtpSent.open();

        notifications.show({
          title: "Check Inbox",
          message: "Please check your email for the OTP.",
          color: "green",
          autoClose: 5000,
        });
      }).catch((error) => {
        setLoading(false)
        console.log(error);
        notifications.show({
          title: "Registration Failed",
          message: "An error occurred while registering. Please try again.",
          color: "red",
          autoClose: 5000,
        });
      }).finally(() => {
        setLoading(false)
      });
    }
  };
  // useEffect(() => {
  //   console.log(userId);
  //   setOtpSent.open();
  // }, [userId]);

  const handleVerifyOTP = () => {
    axiosInstance.post("/api/auth/verify-otp", { _id:userId, otp })
      .then(() => {
        sessionStorage.setItem("justSignedUp", true);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleResendOTP = () => {
    axiosInstance.post("/api/auth/resend-otp", { email: formValues.email })
      .then((res) => {
        console.log(res)
        notifications.show({
          title: "OTP Sent",
          message: "OTP has been sent to your email",
          color: "green",
          autoClose: 5000,
        });
        console.log("OTP sent");
      })
      .catch((err) => {
        console.log(err);
        notifications.show({
          title: "Error",
          message: "An error occurred while sending OTP",
          color: "red",
          autoClose: 5000,
        });
      });
  };

  if (loading) {
    return (
    <div
        style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
        }}
    >
        <Loader type="bars" color="lightgreen" size={200} />
    </div>
    );
}

  return (
    <>
      <Modal
        opened={otpSent}
        onClose={() => setOtpSent.close()}
        title="Verify OTP"
        centered
        closeOnClickOutside={false}
      >
        <Text align="center" size="sm">
          Enter the 4-digit OTP sent to your email
        </Text>
        <Group position="center" mt="md">
          <PinInput length={4} value={otp} onChange={setOtp} error={errors.otp} />
        </Group>
        <Group position="center" mt="md">
          <Button
            fullWidth
            variant="gradient"
            gradient={{ from: "green", to: "lightgreen" }}
            onClick={handleVerifyOTP}
          >
            Verify OTP
          </Button>
          <Button
            fullWidth
            variant="outline"
            color="green"
            onClick={handleResendOTP}
          >
            Resend OTP
          </Button>
        </Group>
      </Modal>
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        withBorder
        style={{ minHeight: "100vh" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src={BooksLogo}
            alt="Books Logo"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
        <Paper maw={700} shadow="md" p="xl" className={classes.loginContainer}>
          <Title
            align="center"
            weight={900}
            variant="gradient"
            gradient={{ from: "green", to: "lightgreen" }}
            className={classes.title}
            my="xl"
          >
            Welcome To Books
          </Title>
          <form method="POST" onSubmit={handleSubmit}>
            <TextInput
              label="Username"
              placeholder="Enter a username"
              leftSection={<CiUser size={16} />}
              styles={{
                input: { height: "50px" },
                label: {
                  fontWeight: "900",
                  marginBottom: "10px",
                  fontSize: "1rem",
                },
              }}
              mt="lg"
              mb="lg"
              required
              className={classes.loginContainerLabel}
              value={formValues.username}
              onChange={(e) =>
                setFormValues({ ...formValues, username: e.target.value })
              }
              error={errors.username}
            />
            <TextInput
              label="Email"
              placeholder="Enter your email"
              leftSection={<AiOutlineMail size={16} />}
              styles={{
                input: { height: "50px" },
                label: {
                  fontWeight: "900",
                  marginBottom: "10px",
                  fontSize: "1rem",
                },
              }}
              className={classes.loginContainerLabel}
              mt="lg"
              mb="lg"
              required
              value={formValues.email}
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
              error={errors.email}
            />
            <TextInput
              label="Phone Number"
              leftSection={<BsTelephone size={16} />}
              placeholder="Enter your phone number"
              styles={{
                input: { height: "50px" },
                label: {
                  fontWeight: "900",
                  marginBottom: "10px",
                  fontSize: "1rem",
                },
              }}
              className={classes.loginContainerLabel}
              mt="lg"
              mb="lg"
              required
              value={formValues.phoneNumber}
              onChange={(e) =>
                setFormValues({ ...formValues, phoneNumber: e.target.value })
              }
              error={errors.phoneNumber}
            />
            <PasswordInput
              label="Password"
              leftSection={<RiLockPasswordLine size={16} />}
              placeholder="Enter your password"
              styles={{
                input: { height: "50px" },
                label: {
                  fontWeight: "900",
                  marginBottom: "10px",
                  fontSize: "1rem",
                },
              }}
              mt="lg"
              mb="lg"
              required
              className={classes.loginContainerLabel}
              value={formValues.password}
              onChange={(e) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
              error={errors.password}
            />
            <PasswordInput
              label="Confirm Password"
              leftSection={<RiLockPasswordLine size={16} />}
              placeholder="Confirm your password"
              styles={{
                input: { height: "50px" },
                label: {
                  fontWeight: "900",
                  marginBottom: "10px",
                  fontSize: "1rem",
                },
              }}
              className={classes.loginContainerLabel}
              mt="lg"
              mb="lg"
              required
              value={formValues.confirmPassword}
              onChange={(e) =>
                setFormValues({ ...formValues, confirmPassword: e.target.value })
              }
              error={errors.confirmPassword}
            />
            <Checkbox
              mt="md"
              label="I agree to the terms & conditions"
              styles={{
                label: {
                  fontWeight: "900",
                  marginBottom: "10px",
                  fontSize: "1rem",
                  color: "lightgreen",
                },
              }}
              color="lightgreen"
              required
              className={classes.loginContainerLabel}
              mb="lg"
              checked={formValues.terms}
              onChange={(e) =>
                setFormValues({ ...formValues, terms: e.target.checked })
              }
              error={errors.terms}
            />
            <Group position="center" mt="md">
              <Button
                type="submit"
                fullWidth
                mt="md"
                mb="lg"
                variant="gradient"
                gradient={{ from: "green", to: "lightgreen" }}
                className={classes.btnLogin}
              >
                Sign Up
              </Button>
            </Group>
            {errors.terms && (
              <Text color="red" size="sm" mt="sm">
                {errors.terms}
              </Text>
            )}
          </form>
          <Text align="center" size="sm">
            Already have an account? <Anchor href="/login">Login</Anchor>
          </Text>
        </Paper>
      </Paper>
    </>
  );
};

export default SignUp;
