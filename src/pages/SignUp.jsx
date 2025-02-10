import { useState } from "react";
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
  const { otpSent, setOtpSent} = useDisclosure();
  const [otp, setOtp] = useState("");

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
      formData.append('avatar', formValues.avatar);

      axiosInstance.post('/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log(response);
        //send registration success for a toast at the landing page
        setOtpSent(true);
      }).catch((error) => {
        console.log(error)
      })
        }
  };

  const handleVerifyOTP = () => {
    axiosInstance.post("/api/auth/verify-otp", { email: formValues.email, otp })
      .then(() => {
        sessionStorage.setItem("justSignedUp", true);
        navigate("/login");
      })
      .catch(() => {
        setErrors({ otp: "Invalid OTP. Please try again." });
      });
  };

  return (
    <>
      <Modal
        opened={otpSent}
        onClose={() => setOtpSent(false)}
        title="Verify OTP"
        centered
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
            Welcome To GOODREADS
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


// import { useState } from "react";
// import {
//   TextInput,
//   PasswordInput,
//   Checkbox,
//   Button,
//   Group,
//   Text,
//   Paper,
//   Title,
//   Anchor,
//   PinInput,
// } from "@mantine/core";
// import classes from "../styles/landingpage/Login.module.css";
// import { useNavigate } from "react-router-dom";
// import BooksLogo from "/Logomark.svg";
// import { AiOutlineMail } from "react-icons/ai";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { CiUser } from "react-icons/ci";
// import { BsTelephone } from "react-icons/bs";
// import axiosInstance from "../apis/config";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [formValues, setFormValues] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phoneNumber: "",
//     terms: false,
//   });
  
//   const [errors, setErrors] = useState({});
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");

//   const validate = () => {
//     const newErrors = {};
//     if (!formValues.username || formValues.username.length < 6) {
//       newErrors.username = "Username must be at least 6 characters long";
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
//       newErrors.email = "Invalid email address";
//     }
//     if (formValues.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters long";
//     }
//     if (formValues.password !== formValues.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
//     if (formValues.phoneNumber.length !== 11) {
//       newErrors.phoneNumber = "Phone number must be 11 digits";
//     }
//     if (!formValues.terms) {
//       newErrors.terms = "You must agree to the terms";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSignUp = (event) => {
//     event.preventDefault();
//     if (validate()) {
//       axiosInstance.post("/api/auth/register", {
//         name: formValues.username,
//         email: formValues.email,
//         password: formValues.password,
//       })
//       .then(() => {
//         setOtpSent(true);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     }
//   };

//   const handleVerifyOTP = () => {
//     axiosInstance.post("/api/auth/verify-otp", { email: formValues.email, otp })
//       .then(() => {
//         sessionStorage.setItem("justSignedUp", true);
//         navigate("/login");
//       })
//       .catch(() => {
//         setErrors({ otp: "Invalid OTP. Please try again." });
//       });
//   };

//   return (
//     <Paper shadow="md" p="xl" radius="md" withBorder style={{ minHeight: "100vh" }}>
//       <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
//         <img src={BooksLogo} alt="Books Logo" style={{ width: "200px", height: "200px" }} />
//       </div>
//       <Paper maw={700} shadow="md" p="xl" className={classes.loginContainer}>
//         <Title align="center" weight={900} variant="gradient" gradient={{ from: "green", to: "lightgreen" }} my="xl">
//           Welcome To GOODREADS
//         </Title>
//         {!otpSent ? (
//           <form onSubmit={handleSignUp}>
//             <TextInput label="Username" placeholder="Enter a username" leftSection={<CiUser size={16} />} required value={formValues.username} onChange={(e) => setFormValues({ ...formValues, username: e.target.value })} error={errors.username} />
//             <TextInput label="Email" placeholder="Enter your email" leftSection={<AiOutlineMail size={16} />} required value={formValues.email} onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} error={errors.email} />
//             <TextInput label="Phone Number" leftSection={<BsTelephone size={16} />} placeholder="Enter your phone number" required value={formValues.phoneNumber} onChange={(e) => setFormValues({ ...formValues, phoneNumber: e.target.value })} error={errors.phoneNumber} />
//             <PasswordInput label="Password" leftSection={<RiLockPasswordLine size={16} />} placeholder="Enter your password" required value={formValues.password} onChange={(e) => setFormValues({ ...formValues, password: e.target.value })} error={errors.password} />
//             <PasswordInput label="Confirm Password" leftSection={<RiLockPasswordLine size={16} />} placeholder="Confirm your password" required value={formValues.confirmPassword} onChange={(e) => setFormValues({ ...formValues, confirmPassword: e.target.value })} error={errors.confirmPassword} />
//             <Checkbox mt="md" label="I agree to the terms & conditions" required checked={formValues.terms} onChange={(e) => setFormValues({ ...formValues, terms: e.target.checked })} error={errors.terms} />
//             <Group position="center" mt="md">
//               <Button type="submit" fullWidth variant="gradient" gradient={{ from: "green", to: "lightgreen" }}>Sign Up</Button>
//             </Group>
//           </form>
//         ) : (
//           <div>
//             <Text align="center" size="sm">Enter the 4-digit OTP sent to your email</Text>
//             <PinInput length={4} value={otp} onChange={setOtp} error={errors.otp} />
//             <Group position="center" mt="md">
//               <Button fullWidth variant="gradient" gradient={{ from: "green", to: "lightgreen" }} onClick={handleVerifyOTP}>Verify OTP</Button>
//             </Group>
//           </div>
//         )}
//         <Text align="center" size="sm">Already have an account? <Anchor href="/login">Login</Anchor></Text>
//       </Paper>
//     </Paper>
//   );
// };

export default SignUp;
