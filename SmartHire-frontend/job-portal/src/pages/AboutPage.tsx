import {
  Box,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';

import {
  IconBrain,
  IconUsers,
  IconBriefcase,
  IconRocket,
} from '@tabler/icons-react';

import {
  useTheme,
} from '../context/ThemeContext';

function AboutPage() {
  const { darkMode } = useTheme();

  const features = [

    {
      icon: <IconBrain size={28} />,
      title: 'AI Powered Hiring',

      description:
        'SmartHire uses intelligent matching and streamlined workflows to help recruiters and candidates connect faster.',
    },

    {
      icon: <IconUsers size={28} />,
      title: 'Built For Everyone',

      description:
        'Applicants, employers, and admins all get dedicated experiences designed for their workflows.',
    },

    {
      icon: <IconRocket size={28} />,
      title: 'Modern Experience',

      description:
        'Fast, responsive, and beautifully designed interfaces focused on productivity and usability.',
    },

  ];

  return (

    <Box
      py={90}

      style={{
        backgroundColor:

          darkMode

            ? '#25262b'

            : '#edf6fb',
        minHeight: '100vh',
      }}
    >

      <Container size="xl">

        {/* HERO */}

        <Stack
          align="center"
          mb={80}
        >

          <Text
            fw={700}
            c="#10b1cf"
            tt="uppercase"
          >
            About SmartHire AI
          </Text>

          <Title
            ta="center"

            style={{
              color:

                darkMode

                  ? '#f8f9fa'

                  : '#1e293b',
              fontSize: '54px',
              lineHeight: 1.2,
            }}
          >
            Smarter hiring for the
            <span style={{ color: '#10b1cf' }}>
              {' '}modern workforce
            </span>
          </Title>

          <Text
            ta="center"
            size="lg"
            maw={780}
            c={
              darkMode

                ? '#adb5bd'

                : '#64748b'
            }
          >
            SmartHire AI is a modern recruitment platform
            designed to simplify hiring, streamline job applications,
            and create meaningful connections between companies
            and talented professionals.
          </Text>

        </Stack>

        {/* MAIN SECTION */}

        <Grid align="center">

          {/* LEFT */}

          <Grid.Col span={{ base: 12, md: 6 }}>

            <Card
              p={40}
              radius="xl"

              style={{
                backgroundColor:

                  darkMode

                    ? '#2c2e33'

                    : '#ffffff',
                border: '1px solid rgba(16,177,207,0.15)',
              }}
            >

              <Stack gap="xl">

                <Group>

                  <ThemeIcon
                    size={70}
                    radius="xl"

                    styles={{
                      root: {
                        backgroundColor: 'rgba(16,177,207,0.15)',
                        color: '#10b1cf',
                      },
                    }}
                  >
                    <IconBriefcase size={34} />
                  </ThemeIcon>

                  <Title
                    order={2}

                    style={{
                      color:

                        darkMode

                          ? '#f8f9fa'

                          : '#1e293b',
                    }}
                  >
                    Why SmartHire?
                  </Title>

                </Group>

                <Text
                  c={
                    darkMode

                      ? '#adb5bd'

                      : '#64748b'
                  }
                  size="lg"

                  style={{
                    lineHeight: 1.9,
                  }}
                >
                  Traditional recruitment platforms often feel
                  outdated, cluttered, and inefficient.

                  SmartHire AI focuses on speed, usability,
                  intelligent workflows, and role-based hiring
                  experiences to make recruitment smarter
                  and more transparent.
                </Text>

              </Stack>

            </Card>

          </Grid.Col>

          {/* RIGHT */}

          <Grid.Col span={{ base: 12, md: 6 }}>

            <Stack gap="lg">

              {features.map((feature) => (

                <Card
                  key={feature.title}
                  p="lg"
                  radius="lg"

                  style={{
                    backgroundColor:

                      darkMode

                        ? '#2c2e33'

                        : '#ffffff',
                    border: '1px solid rgba(16,177,207,0.15)',
                    transition: 'all 0.2s ease',
                  }}
                >

                  <Group align="flex-start">

                    <ThemeIcon
                      size={56}
                      radius="xl"

                      styles={{
                        root: {
                          backgroundColor: 'rgba(16,177,207,0.12)',
                          color: '#10b1cf',
                        },
                      }}
                    >
                      {feature.icon}
                    </ThemeIcon>

                    <Box flex={1}>

                      <Text
                        fw={700}
                        size="lg"
                        c={
                          darkMode

                            ? '#f8f9fa'

                            : '#1e293b'
                        }
                      >
                        {feature.title}
                      </Text>

                      <Text
                        mt={6}
                        c={
                          darkMode

                            ? '#adb5bd'

                            : '#64748b'
                        }
                      >
                        {feature.description}
                      </Text>

                    </Box>

                  </Group>

                </Card>

              ))}

            </Stack>

          </Grid.Col>

        </Grid>

      </Container>

    </Box>
  );
}

export default AboutPage;