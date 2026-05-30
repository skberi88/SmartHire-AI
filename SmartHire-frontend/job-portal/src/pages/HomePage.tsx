// // import React from 'react';

// // const HomePage: React.FC = () => {
// //   return (
// //     <main style={{ padding: '2rem', textAlign: 'center' }}>
// //       <section>
// //         <h1>Welcome to SmartHire</h1>
// //         <p>Your default home page is ready.</p>
// //       </section>
// //     </main>
// //   );
// // };

// // export default HomePage;

// import {
//   Button,
//   Container,
//   Group,
//   Stack,
//   Text,
//   Title,
// } from '@mantine/core';

// function HomePage() {
//   return (
//     <Container size="lg" py={80}>

//       <Stack align="center" gap="lg">

//         {/* Heading */}
//         <Title
//           order={1}
//           ta="center"
//           style={{
//             fontSize: '48px',
//             lineHeight: 1.2,
//           }}
//         >
//           Find Your Dream Job with{' '}
//           <span style={{ color: '#228be6' }}>
//             SmartHire AI
//           </span>
//         </Title>

//         {/* Subtitle */}
//         <Text
//           size="lg"
//           c="dimmed"
//           ta="center"
//           maw={700}
//         >
//           AI-powered job portal connecting job seekers,
//           employers, and recruiters through smart matching,
//           application tracking, and modern hiring workflows.
//         </Text>

//         {/* Buttons */}
//         <Group mt="md">
//           <Button size="md" radius="md">
//             Find Jobs
//           </Button>

//           <Button
//             size="md"
//             radius="md"
//             variant="light"
//           >
//             Post a Job
//           </Button>
//         </Group>

//       </Stack>

//     </Container>
//   );
// }

// export default HomePage;

import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';

import {
  IconSearch,
  IconCode,
  IconPalette,
  IconDeviceLaptop,
  IconArticle,
  IconKeyboard,
  IconHeadset,
  IconChartBar,
  IconHomeDollar,
  IconUsersGroup,
  IconSpeakerphone,
  IconStarFilled,
  IconMail,
} from '@tabler/icons-react';

import './HomePage.css';

import heroImage from '../assets/hero.png';
import workImage from '../assets/work.png';

import netflixLogo from '../assets/company-logos/netflix.png';
import metaLogo from '../assets/company-logos/meta.png';
import microsoftLogo from '../assets/company-logos/microsoft.png';
import pinterestLogo from '../assets/company-logos/pinterest.png';
import spotifyLogo from '../assets/company-logos/spotify.png';
import mysqlLogo from '../assets/company-logos/mysql.png';
import walmartLogo from '../assets/company-logos/walmart.png';
import googleLogo from '../assets/company-logos/google.png';
import oracleLogo from '../assets/company-logos/oracle.png';
import tcsLogo from '../assets/company-logos/tcs.png';
import visaLogo from '../assets/company-logos/visa.png';

import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

const companies = [
  netflixLogo,
  metaLogo,
  microsoftLogo,
  pinterestLogo,
  spotifyLogo,
  mysqlLogo,
  walmartLogo,
  googleLogo,
  oracleLogo,
  tcsLogo,
  visaLogo,
];

const categories = [
  {
    icon: <IconCode size={30} />,
    title: 'Web Developer',
    description: 'Build and maintain websites for clients',
    jobs: '2k+ new jobs posted',
  },

  {
    icon: <IconPalette size={30} />,
    title: 'Arts & Design',
    description: 'Create visual content for branding and media',
    jobs: '500+ new jobs posted',
  },

  {
    icon: <IconDeviceLaptop size={30} />,
    title: 'UI-UX Designer',
    description: 'Design user interfaces and enhance user experience',
    jobs: '800+ new jobs posted',
  },

  {
    icon: <IconArticle size={30} />,
    title: 'Content Writing',
    description: 'Write and edit content for various platforms',
    jobs: '1.5k+ new jobs posted',
  },

  {
    icon: <IconKeyboard size={30} />,
    title: 'Data Entry',
    description: 'Input data into systems accurately and efficiently',
    jobs: '1k+ new jobs posted',
  },

  {
    icon: <IconHeadset size={30} />,
    title: 'Customer Support',
    description: 'Assist customers with inquiries and issues',
    jobs: '1.2k+ new jobs posted',
  },

  {
    icon: <IconChartBar size={30} />,
    title: 'Sales',
    description: 'Sell products and services to customers',
    jobs: '900+ new jobs posted',
  },

  {
    icon: <IconHomeDollar size={30} />,
    title: 'Finance',
    description: 'Manage financial records and transactions',
    jobs: '700+ new jobs posted',
  },

  {
    icon: <IconUsersGroup size={30} />,
    title: 'Human Resource',
    description: 'Recruit, manage, and support company employees',
    jobs: '600+ new jobs posted',
  },

  {
    icon: <IconSpeakerphone size={30} />,
    title: 'Digital Marketing',
    description: 'Promote brands online with marketing strategies',
    jobs: '1k+ new jobs posted',
  },
];

const testimonials = [
  {
    name: 'Shivam Patel',
    review:
      'This platform made job searching easy and efficient. Highly recommended for job seekers.',
  },

  {
    name: 'Abhishek Kullu',
    review:
      'Found my dream role within a week. The application process was smooth and intuitive.',
  },

  {
    name: 'Swapnil Pandey',
    review:
      'Excellent user experience and smart hiring workflow. Very professional platform. Recommended for easy job search',
  },

  {
    name: 'Pavan Barnana',
    review:
      'A modern job portal with clean UI, easy access and excellent opportunities across industries.',
  },
];

function HomePage() {
  const {
    darkMode,
  } = useTheme();
  return (
    <Box
      style={{
        
        backgroundColor:

          darkMode

            ? '#25262b'

            : '#edf6fb',
        minHeight: '100vh',
        color:

          darkMode

            ? '#f8f9fa'

            : '#1e293b',
        overflow: 'hidden',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      {/* HERO SECTION */}

      <Container size='xl' py={{ base: 60, md: 90 }}>
        <Grid align="center">
          {/* LEFT */}

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack maw={1400} mx="auto">
              <Title
                order={1}
                style={{
                  fontSize: 'clamp(42px, 7vw, 70px)',
                  lineHeight: 1.1,
                  fontWeight: 700,
                }}
              >
                Build Your Future With AI-Powered
                <br />
                <span style={{ color: '#10b1cf' }}>
                  Smarter Hiring
                </span>
              </Title>

              <Text
                c={
                  darkMode

                    ? '#adb5bd'

                    : '#64748b'
                }
                maw={600}
                style={{
                  fontSize: 'clamp(16px, 2vw, 22px)',
                  lineHeight: 1.7,
                }}
              >
                Discover opportunities, connect with top companies
                and accelerate your career using{' '}
                <span
                  style={{
                    color: '#10b1cf',
                    fontStyle: 'italic',
                  }}
                >
                  AI-powered
                </span>{' '}
                hiring workflows.
              </Text>

              {/* SEARCH */}

              <Group
                mt="md"
                grow
                wrap="wrap"
              >
                <TextInput
                  placeholder="Job Title"
                  size="lg"
                  radius="md"

                  styles={{
                    input: {
                      backgroundColor: '#343a40',
                      border: '1px solid #495057',
                      color: 'white',
                    },
                  }}
                />

                <TextInput
                  placeholder="Job Type"
                  size="lg"
                  radius="md"

                  styles={{
                    input: {
                      backgroundColor: '#343a40',
                      border: '1px solid #495057',
                      color: 'white',
                    },
                  }}
                />

                <Button
                  size="lg"
                  radius="md"

                  styles={{
                    root: {
                      backgroundColor: '#10b1cf',
                    },
                  }}
                >
                  <IconSearch size={22} />
                </Button>
              </Group>
            </Stack>
          </Grid.Col>

          {/* RIGHT */}

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Flex justify="center">
              <Image
                src={heroImage}
                w="100%"
                maw={550}
              />
            </Flex>
          </Grid.Col>
        </Grid>
      </Container>

      {/* COMPANIES */}

      <Container fluid py={40}>
        <Stack align="center" gap="xl">
          <Title
            order={2}
            ta="center"
            style={{
              fontSize: 'clamp(32px, 5vw, 50px)',
              fontWeight: 600,
            }}
          >
            Trusted By{' '}
            <span style={{ color: '#10b1cf' }}>
              1000+
            </span>{' '}
            Companies
          </Title>

          <div className="marquee">
            <div className="marquee-content">
              {[...companies, ...companies].map((logo, index) => (
                <Image
                  key={index}
                  src={logo}
                  h={70}
                  w="auto"
                  fit="contain"
                  className="company-logo"
                />
              ))}
            </div>
          </div>
        </Stack>
      </Container>

      {/* CATEGORY SECTION */}

      <Container fluid py={100}>
        <Stack align="center" gap="md">
          <Title
            order={2}
            ta="center"
            style={{
              fontSize: 'clamp(32px, 5vw, 45px)',
              fontWeight: 600,
            }}
          >
            Explore{' '}
            <span style={{ color: '#10b1cf' }}>
              Career
            </span>{' '}
            Categories
          </Title>

          <Text
            c={
              darkMode

                ? '#adb5bd'

                : '#64748b'
            }
            ta="center"
            maw={700}
            style={{
              fontSize: '18px',
              lineHeight: 1.7,
            }}
          >
            Explore roles from technology to design and
            discover careers tailored to your professional goals.
          </Text>
        </Stack>

        <div className="category-marquee">
          <div className="category-track">
            {[...categories, ...categories].map((category, index) => (
              <Card
                key={index}
                className="category-card"
                padding="xl"
                radius="lg"
              >
                <Stack align="center">
                  <ThemeIcon
                    size={75}
                    radius="xl"
                    className="category-icon"
                  >
                    {category.icon}
                  </ThemeIcon>

                  <Text
                    fw={700}
                    size="xl"
                    className="category-title"
                  >
                    {category.title}
                  </Text>

                  <Text
                    className="category-description"
                    ta="center"
                  >
                    {category.description}
                  </Text>

                  <Text className="category-jobs">
                    {category.jobs}
                  </Text>
                </Stack>
              </Card>
            ))}
          </div>
        </div>
      </Container>

      {/* HOW IT WORKS */}

      <Container fluid py={100}>
        <Stack align="center" gap="md">
          <Title
            order={2}
            ta="center"
            style={{
              fontSize: 'clamp(32px, 5vw, 45px)',
              fontWeight: 600,
            }}
          >
            How SmartHire{' '}
            <span style={{ color: '#10b1cf' }}>
              Simplifies Hiring
            </span>
          </Title>

          <Text
            ta="center"
            c={
              darkMode

                ? '#adb5bd'

                : '#64748b'
            }
            maw={700}
            style={{
              fontSize: '18px',
              lineHeight: 1.7,
            }}
          >
            Streamline your job search, connect with companies,
            and manage applications through one intelligent platform.
          </Text>
        </Stack>

        <Grid align="center" mt={70}>
          {/* LEFT IMAGE */}

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Flex justify="center">
              <Image
                src={workImage}
                w="100%"
                maw={520}
              />
            </Flex>
          </Grid.Col>

          {/* RIGHT CONTENT */}

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={40}>
              {[
                {
                  number: 1,
                  title: 'Create Your Professional Profile',
                  desc:
                    'Showcase your skills, experience, and achievements to stand out to recruiters and employers.',
                },

                {
                  number: 2,
                  title: 'Explore Relevant Opportunities',
                  desc:
                    'Discover jobs tailored to your interests, career goals, and professional expertise.',
                },

                {
                  number: 3,
                  title: 'Apply And Track Applications',
                  desc:
                    'Submit applications seamlessly and stay updated throughout your hiring journey.',
                },
              ].map((item) => (
                <Group
                  key={item.number}
                  align="flex-start"
                  wrap="nowrap"
                >
                  <ThemeIcon
                    size={65}
                    radius="xl"

                    styles={{
                      root: {
                        backgroundColor:
                          'rgba(16, 177, 207, 0.12)',
                        color: '#10b1cf',
                      },
                    }}
                  >
                    {item.number}
                  </ThemeIcon>

                  <Box>
                    <Text
                      fw={700}
                      c={
                        darkMode

                          ? '#f8f9fa'

                          : '#1e293b'
                      }
                      style={{
                        fontSize: '24px',
                      }}
                    >
                      {item.title}
                    </Text>

                    <Text
                      c={
                        darkMode

                          ? '#adb5bd'

                          : '#64748b'
                      }
                      mt={6}
                      style={{
                        fontSize: '17px',
                        lineHeight: 1.7,
                      }}
                    >
                      {item.desc}
                    </Text>
                  </Box>
                </Group>
              ))}
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      {/* TESTIMONIALS */}

      <Container fluid py={100}>
        <Stack align="center" gap="md">
          <Title
            order={2}
            ta="center"
            style={{
              fontSize: 'clamp(32px, 5vw, 42px)',
              fontWeight: 600,
            }}
          >
            What{' '}
            <span style={{ color: '#10b1cf' }}>
              Users
            </span>{' '}
            Say About Us?
          </Title>

          <Text
            c={
              darkMode

                ? '#adb5bd'

                : '#64748b'
            }
            ta="center"
            maw={700}
            style={{
              fontSize: '18px',
              lineHeight: 1.7,
            }}
          >
            Thousands of professionals trust SmartHire
            to simplify their job search and hiring journey.
          </Text>
        </Stack>

        {/* CARDS */}

        <Grid mt={50}>
          {testimonials.map((item) => (
            <Grid.Col
              key={item.name}
              span={{ base: 12, sm: 6, lg: 3 }}
            >
              <Card
                className="testimonial-card"
                padding="lg"
                radius="lg"
              >
                <Stack gap="sm">
                  <Group>
                    <ThemeIcon
                      size={55}
                      radius="xl"

                      styles={{
                        root: {
                          backgroundColor:
                            'rgba(16, 177, 207, 0.12)',
                          color: '#10b1cf',
                        },
                      }}
                    >
                      {item.name.charAt(0)}
                    </ThemeIcon>

                    <Box>
                      <Text
                        fw={700}
                        size="lg"
                        c={
                          darkMode

                            ? '#f8f9fa'

                            : '#1e293b'
                        }
                      >
                        {item.name}
                      </Text>

                      <Group gap={4}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <IconStarFilled
                            key={star}
                            size={16}
                            color="#10b1cf"
                          />
                        ))}
                      </Group>
                    </Box>
                  </Group>

                  <Text
                    c={
                      darkMode

                        ? '#adb5bd'

                        : '#64748b'
                    }
                    style={{
                      lineHeight: 1.7,
                    }}
                  >
                    {item.review}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* NEWSLETTER */}

        <Box
          mt={100}
          p={{ base: 25, md: 40 }}

          style={{
            backgroundColor:

              darkMode

                ? '#2c2e33'

                : '#ffffff',
            borderRadius: '24px',
            border: '1px solid rgba(16, 177, 207, 0.15)',
          }}
        >
          <Grid align="center">
            {/* LEFT */}

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title
                order={2}
                ta={{ base: 'center', md: 'left' }}
              >
                Never Want To Miss Any{' '}
                <span style={{ color: '#10b1cf' }}>
                  Job Updates?
                </span>
              </Title>
            </Grid.Col>

            {/* RIGHT */}

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Group grow wrap="wrap">
                <TextInput
                  placeholder="Enter your email"

                  leftSection={
                    <IconMail size={18} />
                  }

                  size="lg"
                  radius="md"

                  styles={{
                    input: {
                      backgroundColor: '#343a40',
                      border: '1px solid #495057',
                      color: 'white',
                    },
                  }}
                />

                <Button
                  size="lg"
                  radius="md"

                  styles={{
                    root: {
                      backgroundColor: '#10b1cf',
                    },
                  }}
                >
                  Subscribe
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Box>
      </Container>

      {/* FOOTER */}

      <Footer />
    </Box>
  );
}

export default HomePage;