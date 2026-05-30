import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  ActionIcon,
  Textarea,
  TextInput,
  TagsInput,
} from '@mantine/core';

import {
  IconMapPin,
  IconBriefcase,
  IconEdit,
  IconPlus,
  IconCheck,
  IconX,
} from '@tabler/icons-react';

import { motion } from 'framer-motion';

import Header from '../../components/Header';

import adminAvatar from '../../assets/admin.png';
import coverImage from '../../assets/cover.png';
import logo from '../../assets/logo.png';
import googleCloudLogo from '../../assets/logos/google-cloud.png';
import amazonLogo from '../../assets/logos/amazon.png';
import metaLogo from '../../assets/logos/meta.png';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

function AdminProfile() {

  const {
    darkMode,
    toggleTheme,
  } = useTheme();

  const { user, isDemo } = useAuth();

  const [editingAbout,
    setEditingAbout] =
    useState(false);

  const [about,
    setAbout] =
    useState(

      isDemo

        ? `Platform administrator managing SmartHire AI operations,
            overseeing recruitment workflows, employer verification,
            applicant management, platform analytics,
            and secure hiring experiences.`

        : ''
    );

  const [skills, setSkills] = useState(

    isDemo

      ? [
        'Administration',
        'Management',
        'Analytics',
        'Operations',
        'Support',
        'Security',
        'Moderation',
      ]

      : []
  );

  const [editingProfile,
    setEditingProfile] =
    useState(false);

  const [editingSkills,
    setEditingSkills] =
    useState(false);

  const [editingExperience,
    setEditingExperience] =
    useState(false);

  const [editingCertifications,
    setEditingCertifications] =
    useState(false);

  const [jobTitle,
    setJobTitle] =
    useState(

      isDemo
        ? 'Platform Admin'
        : ''
    );

  const [company,
    setCompany] =
    useState(

      isDemo
        ? 'SmartHire AI'
        : ''
    );

  const [location,
    setLocation] =
    useState(

      isDemo
        ? 'Mumbai, India'
        : ''
    );

  const [experience,
    setExperience] =
    useState(

      isDemo
        ? '10 Years'
        : ''
    );

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 25,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.55,
        ease: 'easeOut',
      }}
    >

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
        }}
      >

        <Header />

        <Container size="xl" py={40}>

          {/* COVER */}

          <Box
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >

            <Image
              src={coverImage}
              h={320}
            />

          </Box>

          {/* PROFILE INFO */}

          <Box
            mt={-140}

            style={{
              position: 'relative',
              zIndex: 10,
            }}
          >

            <Flex
              justify="space-between"
              align="flex-start"
            >

              {/* LEFT SIDE */}

              <Box>

                {/* AVATAR */}

                <Avatar
                  size={220}
                  radius={220}

                  style={{
                    border: '8px solid #25262b',
                    backgroundColor: '#10b1cf',
                    marginLeft: '20px',
                    overflow: 'hidden',
                  }}
                >

                  <Image
                    src={adminAvatar}

                    fit="contain"

                    w="150%"
                    h="150%"

                    style={{
                      transform: 'scale(0.88)',
                    }}
                  />

                </Avatar>

                {/* USER DETAILS */}

                <Box
                  mt={20}
                  ml={18}
                >

                  <Title
                    order={1}

                    style={{
                      fontSize: '42px',
                      fontWeight: 700,
                      lineHeight: 1.15,
                      color:

                        darkMode

                          ? '#f8f9fa'

                          : '#1e293b',
                      letterSpacing: '-1px',
                    }}
                  >
                    {isDemo ? 'SK Beri (Admin)' : `${user?.name} (Admin)`}
                  </Title>

                  <Stack gap={8} mt={14}>

                    <Group gap={10}>

                      <IconBriefcase
                        size={20}
                        color="#adb5bd"
                      />

                      <Text
                        c="#ced4da"

                        style={{
                          fontSize: '20px',
                          fontWeight: 500,
                        }}
                      >
                        {
                          editingProfile ? (

                            <Group grow>

                              <TextInput
                                value={jobTitle}

                                onChange={(e) =>
                                  setJobTitle(
                                    e.target.value
                                  )
                                }

                                placeholder="Job Title"

                                styles={{
                                  input: {
                                    backgroundColor:

                                      darkMode

                                        ? '#2c2e33'

                                        : '#ffffff',
                                    color: 'white',
                                    border: '1px solid #495057',
                                  },
                                }}
                              />

                              <TextInput
                                value={company}

                                onChange={(e) =>
                                  setCompany(
                                    e.target.value
                                  )
                                }

                                placeholder="Company"

                                styles={{
                                  input: {
                                    backgroundColor:

                                      darkMode

                                        ? '#2c2e33'

                                        : '#ffffff',
                                    color: 'white',
                                    border: '1px solid #495057',
                                  },
                                }}
                              />

                            </Group>

                          ) : (

                            `${jobTitle || 'Add your job title'}${company ? ` • ${company}` : ''}`
                          )
                        }
                      </Text>

                    </Group>

                    <Group gap={10}>

                      <IconMapPin
                        size={20}
                        color="#adb5bd"
                      />

                      <Text
                        c={
                          darkMode

                            ? '#adb5bd'

                            : '#64748b'
                        }

                        style={{
                          fontSize: '18px',
                          fontWeight: 500,
                        }}
                      >
                        {
                          editingProfile ? (

                            <TextInput
                              value={location}

                              onChange={(e) =>
                                setLocation(
                                  e.target.value
                                )
                              }

                              placeholder="Location"

                              styles={{
                                input: {
                                  backgroundColor:

                                    darkMode

                                      ? '#2c2e33'

                                      : '#ffffff',
                                  color: 'white',
                                  border: '1px solid #495057',
                                },
                              }}
                            />

                          ) : (

                            location || 'Add your location'
                          )
                        }
                      </Text>

                    </Group>

                    <Group gap={10}>

                      <IconBriefcase
                        size={20}
                        color="#adb5bd"
                      />

                      <Text
                        c={
                          darkMode

                            ? '#adb5bd'

                            : '#64748b'
                        }

                        style={{
                          fontSize: '18px',
                          fontWeight: 500,
                        }}
                      >
                        {
                          editingProfile ? (

                            <TextInput
                              value={experience}

                              onChange={(e) =>
                                setExperience(
                                  e.target.value
                                )
                              }

                              placeholder="Experience"

                              styles={{
                                input: {
                                  backgroundColor:

                                    darkMode

                                      ? '#2c2e33'

                                      : '#ffffff',
                                  color: 'white',
                                  border: '1px solid #495057',
                                },
                              }}
                            />

                          ) : (

                            experience
                              ? `Experience: ${experience}`
                              : 'Add experience'
                          )
                        }
                      </Text>

                    </Group>

                  </Stack>

                </Box>

              </Box>

              {/* EDIT BUTTON */}

              <Group mt={170} mr={10}>

                {
                  editingProfile && (

                    <ActionIcon
                      color="green"
                      variant="subtle"

                      onClick={() =>
                        setEditingProfile(false)
                      }
                    >
                      <IconCheck size={30} />
                    </ActionIcon>
                  )
                }

                <ActionIcon
                  variant="subtle"
                  size="xl"

                  color={
                    editingProfile
                      ? 'red'
                      : '#10b1cf'
                  }

                  onClick={() =>
                    setEditingProfile(
                      !editingProfile
                    )
                  }
                >

                  {
                    editingProfile

                      ? <IconX size={30} />

                      : <IconEdit size={30} />
                  }

                </ActionIcon>

              </Group>

            </Flex>

          </Box>

          {/* ABOUT */}

          <Divider my={40} color="#343a40" />

          <Flex justify="space-between">

            <Box>

              <Title
                order={2}
                c={
                  darkMode

                    ? '#f8f9fa'

                    : '#1e293b'
                }
              >
                About
              </Title>

              <Text
                c={
                  darkMode

                    ? '#adb5bd'

                    : '#64748b'
                }
                mt="lg"
                maw={1200}
                size="lg"
              >
                {
                  editingAbout ? (

                    <Textarea

                      value={about}

                      onChange={(e) =>
                        setAbout(
                          e.target.value
                        )
                      }

                      minRows={5}

                      styles={{
                        input: {
                          backgroundColor:

                            darkMode

                              ? '#2c2e33'

                              : '#ffffff',
                          border: '1px solid #495057',
                          color: 'white',
                        },
                      }}
                    />

                  ) : (

                    <Text
                      c={
                        darkMode

                          ? '#adb5bd'

                          : '#64748b'
                      }
                      mt="lg"
                      maw={1200}
                      size="lg"
                    >
                      {
                        about || 'Add your bio'
                      }
                    </Text>
                  )
                }
              </Text>

            </Box>

            <Group>

              {
                editingAbout && (

                  <ActionIcon
                    color="green"
                    variant="subtle"

                    onClick={() =>
                      setEditingAbout(false)
                    }
                  >
                    <IconCheck size={28} />
                  </ActionIcon>
                )
              }

              <ActionIcon
                variant="subtle"

                color={
                  editingAbout
                    ? 'red'
                    : '#10b1cf'
                }

                onClick={() =>
                  setEditingAbout(
                    !editingAbout
                  )
                }
              >

                {
                  editingAbout

                    ? <IconX size={28} />

                    : <IconEdit size={28} />
                }

              </ActionIcon>

            </Group>


          </Flex>

          {/* SKILLS */}

          <Divider my={40} color="#343a40" />

          <Flex justify="space-between">

            <Box style={{ flex: 1 }}>

              <Title
                order={2}
                c={
                  darkMode

                    ? '#f8f9fa'

                    : '#1e293b'
                }
              >
                Skills
              </Title>

              <Box mt={25}>

                {
                  editingSkills ? (

                    <TagsInput

                      value={skills}

                      onChange={setSkills}

                      placeholder="Add skill"

                      splitChars={[',']}

                      styles={{

                        input: {

                          backgroundColor:

                            darkMode

                              ? '#2c2e33'

                              : '#ffffff',

                          border: '1px solid #495057',

                          color: 'white',

                          minHeight: '54px',
                        },

                        pill: {

                          backgroundColor:
                            'rgba(16, 177, 207, 0.12)',

                          color: '#10b1cf',

                          border:
                            '1px solid rgba(16, 177, 207, 0.2)',
                        },
                      }}
                    />

                  ) : (

                    <Group gap="md">

                      {
                        skills.length > 0 ? (

                          skills.map((skill) => (

                            <Badge
                              key={skill}

                              size="xl"

                              radius="xl"

                              styles={{
                                root: {

                                  backgroundColor:
                                    'rgba(16, 177, 207, 0.12)',

                                  color: '#10b1cf',

                                  border:
                                    '1px solid rgba(16, 177, 207, 0.2)',

                                  paddingInline: '18px',

                                  height: '42px',

                                  fontSize: '18px',
                                },
                              }}
                            >
                              {skill}
                            </Badge>
                          ))

                        ) : (

                          <Text
                            c="#868e96"
                            size="lg"
                          >
                            Add skills
                          </Text>
                        )
                      }

                    </Group>
                  )
                }

              </Box>

            </Box>

            <Group align="flex-start">

              {
                editingSkills && (

                  <ActionIcon
                    color="green"

                    variant="subtle"

                    onClick={() =>
                      setEditingSkills(false)
                    }
                  >
                    <IconCheck size={28} />
                  </ActionIcon>
                )
              }

              <ActionIcon
                variant="subtle"

                color={
                  editingSkills
                    ? 'red'
                    : '#10b1cf'
                }

                onClick={() =>
                  setEditingSkills(
                    !editingSkills
                  )
                }
              >

                {
                  editingSkills

                    ? <IconX size={28} />

                    : <IconEdit size={28} />
                }

              </ActionIcon>

            </Group>

          </Flex>

          {/* EXPERIENCE */}

          <Divider my={40} color="#343a40" />

          <Flex justify="space-between">

            <Title
              order={2}
              c={
                darkMode

                  ? '#f8f9fa'

                  : '#1e293b'
              }
            >
              Experience
            </Title>

            <Group>

              <ActionIcon
                variant="subtle"
                color="#10b1cf"

                styles={{
                  root: {
                    transition: '0.25s',
                  },
                }}

                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    'scale(1.08)';

                  e.currentTarget.style.backgroundColor =
                    'rgba(251,191,36,0.1)';
                }}

                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    'scale(1)';

                  e.currentTarget.style.backgroundColor =
                    'transparent';
                }}
              >

                <IconPlus size={28} />

              </ActionIcon>

              <ActionIcon
                variant="subtle"
                color="#10b1cf"

                styles={{
                  root: {
                    transition: '0.25s',
                  },
                }}

                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    'scale(1.08)';

                  e.currentTarget.style.backgroundColor =
                    'rgba(251,191,36,0.1)';
                }}

                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    'scale(1)';

                  e.currentTarget.style.backgroundColor =
                    'transparent';
                }}
              >

                <IconEdit size={28} />

              </ActionIcon>

            </Group>

          </Flex>

          <Stack mt={30} gap={40}>
            {
              isDemo ? (
                <motion.div
                  whileHover={{
                    x: 8,
                  }}

                  transition={{
                    duration: 0.2,
                  }}
                >

                  <Flex
                    justify="space-between"
                    align="flex-start"
                    gap={40}
                    wrap="wrap"
                  >

                    {/* LEFT SIDE */}

                    <Group
                      align="flex-start"
                      gap={22}

                      style={{
                        flex: 1,
                      }}
                    >

                      {/* LOGO */}

                      <Avatar
                        radius="md"
                        size={68}

                        style={{
                          backgroundColor: '#343a40',
                          padding: '6px',
                        }}
                      >

                        <Image
                          src={logo}

                          fit="contain"

                          w="90%"
                          h="90%"
                        />

                      </Avatar>

                      {/* CONTENT */}

                      <Box maw={900}>

                        <Text
                          fw={700}

                          style={{
                            fontSize: '30px',
                            color:

                              darkMode

                                ? '#f8f9fa'

                                : '#1e293b',
                            lineHeight: 1.2,
                          }}
                        >
                          Platform Admin
                        </Text>

                        <Text
                          c={
                            darkMode

                              ? '#adb5bd'

                              : '#64748b'
                          }

                          style={{
                            fontSize: '20px',
                            fontWeight: 500,
                            marginTop: '4px',
                          }}
                        >
                          SmartHire AI • Mumbai, India
                        </Text>

                        <Text
                          mt={18}
                          c="#ced4da"

                          style={{
                            fontSize: '18px',
                            lineHeight: 1.8,
                            maxWidth: '1000px',
                          }}
                        >
                          Managing SmartHire AI platform operations including
                          recruitment monitoring, employer verification, user
                          management, hiring analytics, platform moderation,
                          and secure talent acquisition workflows.
                        </Text>

                      </Box>

                    </Group>

                    {/* DATE */}

                    <Box
                      style={{
                        minWidth: '100px',
                      }}
                    >

                      <Text
                        c={
                          darkMode

                            ? '#adb5bd'

                            : '#64748b'
                        }

                        ta="right"

                        style={{
                          fontSize: '20px',
                          fontWeight: 500,
                          lineHeight: 1.6,
                        }}
                      >
                        Aug 2022 —
                        Present
                      </Text>

                    </Box>

                  </Flex>

                </motion.div>
              ) : (

                <Text
                  c="#868e96"
                  size="lg"
                >
                  No experience added yet.
                </Text>
              )
            }

          </Stack>

          {/* CERTIFICATIONS */}

          <Divider my={40} color="#343a40" />

          <Flex justify="space-between">

            <Title
              order={2}
              c={
                darkMode

                  ? '#f8f9fa'

                  : '#1e293b'
              }
            >
              Certifications
            </Title>

            <Group>

              <ActionIcon
                variant="subtle"
                color="#10b1cf"
              >

                <IconPlus size={28} />

              </ActionIcon>

              <ActionIcon
                variant="subtle"
                color="#10b1cf"
              >

                <IconEdit size={28} />

              </ActionIcon>

            </Group>

          </Flex>

          <Stack mt={35} gap={35}>

            {
              isDemo ? (

                <>

                  {/* CERTIFICATION 1 */}

                  <motion.div
                    whileHover={{
                      x: 8,
                    }}
                  >

                    <Flex justify="space-between">

                      <Group align="flex-start">

                        <Avatar
                          radius="md"
                          size={58}
                          src={amazonLogo}

                          style={{
                            backgroundColor: '#343a40',
                          }}
                        />

                        <Box>

                          <Text
                            fw={700}
                            size="30px"
                            c={
                              darkMode

                                ? '#f8f9fa'

                                : '#1e293b'
                            }
                          >
                            AWS Certified Cloud Practitioner
                          </Text>

                          <Text
                            c={
                              darkMode

                                ? '#adb5bd'

                                : '#64748b'
                            }
                            size="xl"
                          >
                            Amazon
                          </Text>

                        </Box>

                      </Group>

                      <Box ta="right">

                        <Text
                          c={
                            darkMode

                              ? '#adb5bd'

                              : '#64748b'
                          }
                          size="lg"
                        >
                          Issued Mar 2023
                        </Text>

                        <Text
                          c="#868e96"
                          size="md"
                        >
                          ID: AWS-CP-12345
                        </Text>

                      </Box>

                    </Flex>

                  </motion.div>

                  {/* CERTIFICATION 2 */}

                  <motion.div
                    whileHover={{
                      x: 8,
                    }}
                  >

                    <Flex justify="space-between">

                      <Group align="flex-start">

                        <Avatar
                          radius="md"
                          size={60}
                          src={metaLogo}

                          style={{
                            backgroundColor: '#343a40',
                          }}
                        />

                        <Box>

                          <Text
                            fw={700}
                            size="30px"
                            c={
                              darkMode

                                ? '#f8f9fa'

                                : '#1e293b'
                            }
                          >
                            Meta Front-End Developer Certificate
                          </Text>

                          <Text
                            c={
                              darkMode

                                ? '#adb5bd'

                                : '#64748b'
                            }
                            size="xl"
                          >
                            Meta
                          </Text>

                        </Box>

                      </Group>

                      <Box ta="right">

                        <Text
                          c={
                            darkMode

                              ? '#adb5bd'

                              : '#64748b'
                          }
                          size="lg"
                        >
                          Issued Jan 2022
                        </Text>

                        <Text
                          c="#868e96"
                          size="md"
                        >
                          ID: META-FE-67890
                        </Text>

                      </Box>

                    </Flex>

                  </motion.div>

                </>

              ) : (

                <Text
                  c="#868e96"
                  size="lg"
                >
                  No certifications added yet.
                </Text>

              )
            }

          </Stack>

        </Container>

      </Box>

    </motion.div>
  );
}
import { useTheme } from '../../context/ThemeContext';

export default AdminProfile;