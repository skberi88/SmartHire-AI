import {
  Anchor,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import {
  IconArrowLeft,
  IconAt,
  IconLock,
  IconAiAgents,
  IconBrandGoogle,
  IconBrandGithub,
} from '@tabler/icons-react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';



function LoginPage() {

  const {
    darkMode,
  } = useTheme();

  const { setUserRole, setUser, setIsDemo } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] =
    useState('');

  const [emailFocused,
    setEmailFocused] =
    useState(false);

  const [password, setPassword] =
    useState('');

  const [passwordFocused,
    setPasswordFocused] =
    useState(false);

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



  const handleLogin = async () => {

    try {

      const response = await fetch(
        'http://localhost:8080/api/auth/login',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {

        alert('Invalid Credentials');

        return;
      }

      const data = await response.json();

      console.log(data);

      /*
        Example backend response:
        {
          token: "...",
          accountType: "APPLICANT"
        }
      */
      // fixing hard refresh
      localStorage.setItem(
        'token',
        data.token
      );

      localStorage.setItem(
        'user',
        JSON.stringify({
          name: data.name,
          email: data.email,
          accountType: data.accountType,
        })
      );

      setUserRole(data.accountType);

      setUser({
        name: data.name,
        email: data.email,
        accountType: data.accountType,
      });
      setIsDemo(false);

      // APPLICANT

      if (data.accountType === 'APPLICANT') {

        navigate('/');
      }

      // EMPLOYER

      else if (data.accountType === 'EMPLOYER') {

        navigate('/');
      }

      // ADMIN

      else if (data.accountType === 'ADMIN') {

        navigate('/');
      }

    }

    catch (error) {

      console.log(error);

      alert('Server Error');
    }

  };
  return (
    <motion.div

      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}

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

          px={55}
        >

          <Box w="100%" maw={500}>

            {/* BACK BUTTON */}

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

            <Stack mt={25} gap="sm">

              <Title
                order={2}

                style={{
                  color:

                    darkMode

                      ? '#f8f9fa'

                      : '#1e293b',
                }}
              >
                Login
              </Title>

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

                leftSection={<IconAt size={18} />}

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

                leftSection={<IconLock size={18} />}

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

              {/* LOGIN BUTTON */}

              <Button
                size="sm"
                radius="md"

                mt="sm"

                onClick={handleLogin}

                styles={{
                  root: {
                    backgroundColor: '#10b1cf',
                  },
                }}
              >
                Login
              </Button>
              {/* Oauth2 LOGIN */}
              <Group
                grow
                mt="xs"
              >

                {/* GOOGLE */}

                <Button

                  size="sm"

                  radius="md"

                  leftSection={
                    <IconBrandGoogle size={18} />
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
                      'http://localhost:8080/oauth2/authorization/google';
                  }}
                >

                  Google

                </Button>

                {/* GITHUB */}

                <Button

                  size="sm"

                  radius="md"

                  leftSection={
                    <IconBrandGithub size={18} />
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
                      'http://localhost:8080/oauth2/authorization/github';
                  }}
                >

                  GitHub

                </Button>

              </Group>

              {/* DEMO LOGIN */}

              <Divider
                my="xs"

                label="Quick Demo Login"

                labelPosition="center"

                styles={{
                  label: {
                    color: '#adb5bd',
                  },
                }}
              />

              <Group justify="center">

                <Button
                  onClick={() => {

                    setUserRole('APPLICANT');

                    setIsDemo(true);

                    // setUser({
                    //   name: 'Sheetal',
                    //   email: 'demo@smarthire.ai',
                    //   accountType: 'APPLICANT',
                    // });

                    navigate('/');
                  }}

                  size="compact-sm"
                  radius="md"
                  variant="light"

                  styles={{
                    root: {
                      backgroundColor: 'rgba(16, 177, 207, 0.12)',
                      color: '#10b1cf',
                    },
                  }}
                >
                  Applicant
                </Button>

                <Button
                  onClick={() => {

                    setUserRole('EMPLOYER');

                    setIsDemo(true);

                    // setUser({
                    //   name: 'Rahul Mehta',
                    //   email: 'employer@smarthire.ai',
                    //   accountType: 'EMPLOYER',
                    // });

                    navigate('/');
                  }}
                  size="compact-sm"
                  radius="md"
                  variant="light"

                  styles={{
                    root: {
                      backgroundColor: 'rgba(16, 177, 207, 0.12)',
                      color: '#10b1cf',
                    },
                  }}
                >
                  Employer
                </Button>

                <Button
                  onClick={() => {

                    setUserRole('ADMIN');

                    setIsDemo(true);

                    // setUser({
                    //   name: 'SK Beri',
                    //   email: 'admin@smarthire.ai',
                    //   accountType: 'ADMIN',
                    // });

                    navigate('/');
                  }}
                  size="compact-sm"
                  radius="md"
                  variant="light"

                  styles={{
                    root: {
                      backgroundColor: 'rgba(16, 177, 207, 0.12)',
                      color: '#10b1cf',
                    },
                  }}
                >
                  Admin
                </Button>

              </Group>

              {/* LINKS */}

              <Text
                ta="center"
                c={
                  darkMode

                    ? '#adb5bd'

                    : '#64748b'
                }
                mt={4}
              >
                Don&apos;t have an account?{' '}

                <Anchor
                  component={Link}
                  to="/register"

                  c="#10b1cf"

                  underline="never"
                >
                  Sign Up
                </Anchor>

              </Text>

              <Anchor
                ta="center"

                href="#"

                c="#10b1cf"

                underline="never"
              >
                Forgot Password?
              </Anchor>

            </Stack>

          </Box>

        </Flex>

        {/* RIGHT SECTION */}

        <Flex
          flex={1}

          justify="center"
          align="center"

          style={{
            backgroundColor:

              darkMode

                ? '#2c2e33'

                : '#ffffff',

            borderTopLeftRadius: '120px',
            borderBottomLeftRadius: '120px',
          }}
        >

          <Stack align="center">

            <Group gap="md">

              <IconAiAgents size={70} color="#10b1cf" />

              <Title
                order={2}

                style={{
                  fontSize: '60px',
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
              style={{ fontSize: '20px' }}
            >
              Connecting talent with opportunity
            </Text>

          </Stack>

        </Flex>

      </Flex>
    </motion.div>

  );
}

export default LoginPage;