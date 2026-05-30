import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Stack,
  Text,
} from '@mantine/core';

import {
  Link,
} from 'react-router-dom';

import {
  IconAiAgents,
  IconBrandGithub,
  IconBrandLinkedin,
} from '@tabler/icons-react';

import './Footer.css';
import {
  useTheme,
} from '../context/ThemeContext';
import {
  useAuth,
} from '../context/AuthContext';

function Footer() {
  const { darkMode } = useTheme();
  const { userRole } = useAuth();

  const findJobsLink =
    userRole === 'EMPLOYER'
      ? '/posted-jobs'
      : '/find-jobs';

  const applicationsLink =
    userRole === 'EMPLOYER'
      ? '/posted-jobs'
      : '/job-history';

  const aboutLink = '/about-us';

  return (

    <Box
      py={40}

      style={{
        backgroundColor:

          darkMode

            ? '#25262b'

            : '#edf6fb',
        borderTop: '1px solid #343a40',
      }}
    >

      <Container size="xl">

        <Flex
          justify="space-between"
          align="flex-start"
          gap={60}
          wrap="wrap"
        >

          {/* BRAND */}

          <Box
            style={{
              flex: 1,
              minWidth: 260,
              maxWidth: 320,
            }}
          >

            <Stack gap="md">

              <Group gap="sm">

                <IconAiAgents
                  color="#10b1cf"
                  size={32}
                />

                <Text
                  fw={700}
                  size="xl"
                  c="#10b1cf"
                >
                  SmartHire AI
                </Text>

              </Group>

              <Text
                c={
                  darkMode
                    ? '#adb5bd'
                    : '#64748b'
                }

                style={{
                  lineHeight: 1.8,
                  fontSize: '16px',
                }}
              >
                Smart hiring platform connecting
                job seekers, recruiters, and employers
                through modern hiring workflows.
              </Text>

            </Stack>

          </Box>

          {/* PRODUCT */}

          <Box
            style={{
              minWidth: 160,
            }}
          >

            <Stack gap={14}>

              <Text
                fw={700}
                c="#10b1cf"
                size="lg"
              >
                Product
              </Text>

              <Text
                component={Link}
                to={findJobsLink}
                className="footer-link"
              >
                Find Jobs
              </Text>

              <Text className="footer-link">
                Companies
              </Text>

              <Text
                component={Link}
                to={applicationsLink}
                className="footer-link"
              >
                Applications
              </Text>

            </Stack>

          </Box>

          {/* COMPANY */}

          <Box
            style={{
              minWidth: 160,
            }}
          >

            <Stack gap={14}>

              <Text
                fw={700}
                c="#10b1cf"
                size="lg"
              >
                Company
              </Text>

              <Text
                component={Link}
                to={aboutLink}
                className="footer-link"
              >
                About Us
              </Text>

              <Text className="footer-link">
                Contact
              </Text>

              <Text className="footer-link">
                Privacy Policy
              </Text>

            </Stack>

          </Box>

          {/* SUPPORT */}

          <Box
            style={{
              minWidth: 160,
            }}
          >

            <Stack gap={14}>

              <Text
                fw={700}
                c="#10b1cf"
                size="lg"
              >
                Support
              </Text>

              <Text className="footer-link">
                Help Center
              </Text>

              <Text className="footer-link">
                Feedback
              </Text>

              <Text className="footer-link">
                FAQs
              </Text>

            </Stack>

          </Box>

        </Flex>

        {/* BOTTOM */}

        <Flex
          justify="center"
          align="center"
          wrap="wrap"

          mt={40}
          pt={20}

          style={{
            borderTop: '1px solid #343a40',
          }}
        >
          <Stack align='center'>
            <Text c={
              darkMode

                ? '#adb5bd'

                : '#64748b'
            }
              style={{ fontStyle: 'italic' }}
            >

              Engineered by{' '}

              <span
                style={{
                  color: '#108aaa',
                  fontSize: '17px',
                  fontWeight: 500,
                  fontStyle: 'italic',
                }}
              >
                Sheetal Kumar Beri
              </span>

            </Text>

            <Group>

              <Button
                component="a"
                href="https://github.com/skberi88"
                target="_blank"

                variant="subtle"
              >

                <IconBrandGithub
                  color="#108aaa"
                  size={32}
                />

              </Button>

              <Button
                component="a"

                href="https://www.linkedin.com/in/sheetal-kumar-beri-677b57284/"

                target="_blank"

                variant="subtle"
              >

                <IconBrandLinkedin
                  color="#108aaa"
                  size={32}
                />

              </Button>

            </Group>
          </Stack>

        </Flex>

      </Container>

    </Box>
  );
}

export default Footer;