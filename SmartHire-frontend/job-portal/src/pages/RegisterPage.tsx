import {
  Box,
  Button,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Radio,
  Stack,
  Text,
  TextInput,
  Title,
  Anchor,
} from '@mantine/core';

import {
  IconArrowLeft,
  IconAt,
  IconLock,
  IconUser,
  IconAiAgents,
  IconBrandGithub,
  IconBrandGoogle,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { useNavigate }
  from 'react-router-dom';

import { useAuth }
  from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';


function RegisterPage() {
  const {
    darkMode,
    toggleTheme,
  } = useTheme();

  const navigate = useNavigate();

  const {
    setUser,
    setUserRole,
  } = useAuth();

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [confirmPassword,
    setConfirmPassword] =
    useState('');

  const [passwordFocused,
    setPasswordFocused] =
    useState(false);

  const [nameFocused,
    setNameFocused] =
    useState(false);

  const [emailFocused,
    setEmailFocused] =
    useState(false);

  const [confirmPasswordFocused,
    setConfirmPasswordFocused] =
    useState(false);

  const [accountType,
    setAccountType] =
    useState('APPLICANT');

  const passwordRules = [

    {
      label: '8+ Characters',

      valid:
        password.length >= 8,
    },

    {
      label: 'Uppercase Letter',

      valid:
        /[A-Z]/.test(password),
    },

    {
      label: 'Lowercase Letter',

      valid:
        /[a-z]/.test(password),
    },

    {
      label: 'At Least One Number',

      valid:
        /[0-9]/.test(password),
    },

    {
      label: 'Special Character',

      valid:
        /[^A-Za-z0-9]/.test(password),
    },
  ];

  const passwordValid =

    passwordRules.every(
      (rule) => rule.valid
    );


  const handleRegister = async () => {

    // PASSWORD MATCH CHECK

    if (
      password !== confirmPassword
    ) {

      alert(
        'Passwords do not match'
      );

      return;
    }

    try {

      const response = await fetch(
        'http://localhost:8080/api/auth/register',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            name,
            email,
            password,
            accountType,
          }),
        }
      );

      // EMAIL EXISTS / VALIDATION

      if (!response.ok) {

        const errorData =
          await response.json();

        console.log(errorData);

        alert(
          Object.values(errorData)[0]
        );

        return;
      }

      // AUTO LOGIN AFTER REGISTER

      const loginResponse =
        await fetch(
          'http://localhost:8080/api/auth/login',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      const loginData =
        await loginResponse.json();

      // STORE USER

      setUserRole(
        loginData.accountType
      );

      setUser({
        name: loginData.name,
        email: loginData.email,
        accountType:
          loginData.accountType,
      });

      // SAVE TOKEN

      localStorage.setItem(
        'token',
        loginData.token
      );

      // GO HOME

      navigate('/');

    }

    catch (error) {

      console.log(error);

      alert('Server Error');
    }
  };


  return (
    <motion.div

      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}

      transition={{
        duration: 0.45,
        ease: 'easeInOut',
      }}

      style={{
        position: 'absolute',
        width: '100%',
      }}
    >
      <Flex
        h="100vh"

        style={{
          backgroundColor:

            darkMode

              ? '#25262b'

              : '#edf6fb',
          overflow: 'hidden',
        }}
      >

        {/* LEFT SECTION */}

        <Flex
          flex={1}

          justify="center"
          align="center"

          style={{
            backgroundColor:

              darkMode

                ? '#2c2e33'

                : '#ffffff',

            borderTopRightRadius: '120px',
            borderBottomRightRadius: '120px',
          }}
        >

          <Stack align="center">

            <Group gap="md">

              <IconAiAgents size={70} color="#10b1cf" />

              <Title
                order={2}

                style={{
                  fontSize: '72px',
                  color: '#10b1cf',
                }}
              >
                SmartHire
              </Title>

            </Group>

            <Text
              size="xl"
              c={
                darkMode

                  ? '#adb5bd'

                  : '#64748b'
              }

              fw={500}
            >
              Smart hiring starts here
            </Text>

          </Stack>

        </Flex>

        {/* RIGHT SECTION */}

        <Flex
          flex={1}

          justify="center"
          align="center"
          style={{
            overflowY: 'auto',
          }}

          px={50}
        >

          <Box w="100%" maw={500}>

            {/* HOME BUTTON */}

            <Box
              pos="absolute"
              top={30}
              left={30}
            >

              <Button
                component={Link}
                to="/"

                variant="subtle"

                leftSection={<IconArrowLeft size={18} />}

                styles={{
                  root: {
                    color: '#10b1cf',
                  },
                }}
              >
                Home
              </Button>

            </Box>

            {/* FORM */}

            <Stack mt={20} gap="sm">

              <Title
                order={2}

                style={{
                  color:

                    darkMode

                      ? '#f8f9fa'

                      : '#1e293b',
                }}
              >
                Create Account
              </Title>

              {/* FULL NAME */}

              <TextInput
                label="Full Name"

                value={name}

                onChange={(e) =>
                  setName(e.target.value)
                }

                onFocus={() =>
                  setNameFocused(true)
                }

                onBlur={() =>
                  setNameFocused(false)
                }

                placeholder="Your name"

                leftSection={
                  <IconUser size={18} />
                }

                size="sm"
                radius="md"

                styles={{
                  label: {
                    color:

                      darkMode

                        ? '#f8f9fa'

                        : '#1e293b',
                    marginBottom: 6,
                  },

                  input: {
                    backgroundColor:

                      darkMode

                        ? '#2c2e33'

                        : '#ffffff',

                    border: nameFocused
                      ? '1px solid #ffffff'
                      : '1px solid #495057',

                    color: 'white',

                    transition: '0.25s',
                  },
                }}
              />

              {/* EMAIL */}

              <TextInput
                label="Email"

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

                onFocus={() =>
                  setEmailFocused(true)
                }

                onBlur={() =>
                  setEmailFocused(false)
                }

                placeholder="Your email"

                leftSection={
                  <IconAt size={18} />
                }

                size="sm"
                radius="md"

                styles={{
                  label: {
                    color:

                      darkMode

                        ? '#f8f9fa'

                        : '#1e293b',
                    marginBottom: 6,
                  },

                  input: {
                    backgroundColor:

                      darkMode

                        ? '#2c2e33'

                        : '#ffffff',

                    border: emailFocused
                      ? '1px solid #ffffff'
                      : '1px solid #495057',

                    color: 'white',

                    transition: '0.25s',
                  },
                }}
              />

              {/* PASSWORD */}

              <PasswordInput
                label="Password"

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
                }

                onFocus={() =>
                  setPasswordFocused(true)
                }

                onBlur={() =>
                  setPasswordFocused(false)
                }

                placeholder="Password"

                leftSection={
                  <IconLock size={18} />
                }

                size="sm"
                radius="md"

                styles={{
                  label: {
                    color:

                      darkMode

                        ? '#f8f9fa'

                        : '#1e293b',
                    marginBottom: 6,
                  },
                  visibilityToggle: {
                    color: '#108aaa',
                  },

                  input: {
                    backgroundColor:

                      darkMode

                        ? '#2c2e33'

                        : '#ffffff',

                    border:

                      password.length > 0

                        ? passwordValid

                          ? '1px solid #ffffff'

                          : '1px solid #fa5252'

                        : passwordFocused

                          ? '1px solid #ffffff'

                          : '1px solid #495057',

                    color: 'white',

                    transition: '0.25s',
                  },
                }}
              />

              {
                passwordFocused && (

                  <Group
                    grow

                    mt={8}

                    gap="xs"
                  >

                    {passwordRules.map((rule) => (

                      <Paper
                        key={rule.label}

                        radius="md"

                        p={8}

                        style={{
                          backgroundColor:
                            '#2c2e33',

                          border:

                            rule.valid

                              ? '1px solid #40c057'

                              : '1px solid #fa5252',
                        }}
                      >

                        <Text
                          ta="center"

                          size="xs"

                          fw={500}

                          c={
                            rule.valid
                              ? '#40c057'
                              : '#fa5252'
                          }
                        >
                          {rule.label}
                        </Text>

                      </Paper>
                    ))}
                  </Group>
                )
              }

              {/* CONFIRM PASSWORD */}

              <PasswordInput
                label="Confirm Password"

                value={confirmPassword}

                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }

                onFocus={() =>
                  setConfirmPasswordFocused(
                    true
                  )
                }

                onBlur={() =>
                  setConfirmPasswordFocused(
                    false
                  )
                }

                placeholder="Confirm password"

                leftSection={
                  <IconLock size={18} />
                }

                size="sm"
                radius="md"

                styles={{
                  label: {
                    color:

                      darkMode

                        ? '#f8f9fa'

                        : '#1e293b',
                    marginBottom: 6,
                  },
                  visibilityToggle: {
                    color: '#108aaa',
                  },

                  input: {
                    backgroundColor:

                      darkMode

                        ? '#2c2e33'

                        : '#ffffff',

                    border:

                      confirmPassword.length > 0

                        ? password ===
                          confirmPassword

                          ? '1px solid #ffffff'

                          : '1px solid #fa5252'

                        : confirmPasswordFocused

                          ? '1px solid #ffffff'

                          : '1px solid #495057',

                    color: 'white',

                    transition: '0.25s',
                  },
                }}
              />

              {
                confirmPassword.length > 0 &&

                password !== confirmPassword && (

                  <Text
                    size="xs"
                    c="#fa5252"
                    mt={4}
                  >
                    Passwords do not match
                  </Text>
                )
              }

              {
                confirmPassword.length > 0 &&

                password === confirmPassword && (

                  <Text
                    size="xs"
                    c="#40c057"
                    mt={4}
                  >
                    Passwords match
                  </Text>
                )
              }

              {/* ROLE */}

              <Box mt={4}>

                <Text
                  fw={500}
                  mb="sm"
                  c={
                    darkMode

                      ? '#f8f9fa'

                      : '#1e293b'
                  }
                >
                  You are?
                </Text>

                <Radio.Group

                  value={accountType}

                  onChange={setAccountType}
                >

                  <Group>

                    <Paper
                      p="sm"
                      radius="md"

                      style={{
                        border: '1px solid #495057',
                        backgroundColor:

                          darkMode

                            ? '#2c2e33'

                            : '#ffffff',
                        cursor: 'pointer',
                        minWidth: '170px',
                        color: '#edfdfe'
                      }}
                    >

                      <Radio
                        value="APPLICANT"
                        label="Applicant"

                        color="cyan"
                      />

                    </Paper>

                    <Paper
                      p="sm"
                      radius="md"

                      style={{
                        border: '1px solid #495057',
                        backgroundColor:

                          darkMode

                            ? '#2c2e33'

                            : '#ffffff',
                        cursor: 'pointer',
                        minWidth: '170px',
                        color: '#edfdfe'
                      }}
                    >

                      <Radio
                        value="EMPLOYER"
                        label="Employer"

                        color="cyan"
                      />

                    </Paper>

                  </Group>

                </Radio.Group>

              </Box>

              {/* BUTTON */}

              <Button
                size="sm"
                radius="md"
                onClick={handleRegister}
                mt="sm"

                styles={{
                  root: {
                    backgroundColor: '#10b1cf',
                  },
                }}
              >
                Sign Up
              </Button>

              {/* OAUTH2 REGISTER */}

              <Group
                grow

                mt="xs"
              >

                {/* GOOGLE */}

                <Button

                  size="sm"

                  radius="md"

                  leftSection={
                    <IconBrandGoogle size={20} />
                  }

                  styles={{
                    root: {

                      backgroundColor:
                        '#25262b',

                      border:
                        '1px solid #10b1cf',

                      color:
                        '#f8f9fa',

                      transition:
                        '0.25s',
                    },
                  }}

                  onMouseEnter={(e) => {

                    e.currentTarget.style.backgroundColor =
                      '#10b1cf';

                    e.currentTarget.style.transform =
                      'translateY(-2px)';
                  }}

                  onMouseLeave={(e) => {

                    e.currentTarget.style.backgroundColor =
                      '#25262b';

                    e.currentTarget.style.transform =
                      'translateY(0px)';
                  }}

                  onClick={() => {

                    window.location.href =

                      `http://localhost:8080/oauth2/authorization/google?role=${accountType}`;
                  }}
                >

                  Google

                </Button>

                {/* GITHUB */}

                <Button

                  size="sm"

                  radius="md"

                  leftSection={
                    <IconBrandGithub size={20} />
                  }

                  styles={{
                    root: {

                      backgroundColor:
                        '#25262b',

                      border:
                        '1px solid #10b1cf',

                      color:
                        '#f8f9fa',

                      transition:
                        '0.25s',
                    },
                  }}

                  onMouseEnter={(e) => {

                    e.currentTarget.style.backgroundColor =
                      '#10b1cf';

                    e.currentTarget.style.transform =
                      'translateY(-2px)';
                  }}

                  onMouseLeave={(e) => {

                    e.currentTarget.style.backgroundColor =
                      '#25262b';

                    e.currentTarget.style.transform =
                      'translateY(0px)';
                  }}

                  onClick={() => {

                    window.location.href =

                      `http://localhost:8080/oauth2/authorization/github?role=${accountType}`;
                  }}
                >

                  GitHub

                </Button>

              </Group>

              {/* LOGIN */}

              <Text
                ta="center"
                c={
                  darkMode

                    ? '#adb5bd'

                    : '#64748b'
                }
              >
                Have an account?{' '}

                <Anchor
                  component={Link}
                  to="/login"

                  c="#10b1cf"

                  underline="never"
                >
                  Login
                </Anchor>

              </Text>

            </Stack>

          </Box>

        </Flex>

      </Flex>
    </motion.div>

  );
}

export default RegisterPage;