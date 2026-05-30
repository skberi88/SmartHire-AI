import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
  Drawer,
  Divider,
  Avatar,
} from '@mantine/core';

import {
  IconBookmark,
  IconBriefcase,
  IconBuilding,
  IconSearch,
  IconClock,
  IconEye,
  IconMapPin,
  IconTrash,
  IconMessage2,
  IconChecklist,
  IconFileText,
  IconX,
  IconCurrencyRupee,
  IconDownload,
} from '@tabler/icons-react';

import { color, motion } from 'framer-motion';

import { useEffect, useState } from 'react';

import Header from '../components/Header';

import { useTheme } from '../context/ThemeContext';

function JobHistoryPage() {

  const { darkMode } =
    useTheme();

  const [selectedApplication,
    setSelectedApplication] =
    useState<any>(null);

  const [opened,
    setOpened] =
    useState(false);

  const [applications,
    setApplications] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  const [activeTab,
    setActiveTab] =
    useState('APPLIED');

  const [search,
    setSearch] =
    useState('');

  useEffect(() => {

    fetchApplications();

  }, []);

  const fetchApplications =
    async () => {

      try {

        const response =
          await fetch(

            'http://localhost:8080/api/applications/my',

            {
              headers: {

                Authorization:
                  `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

        const data =
          await response.json();

        setApplications(data);
      }

      catch (error) {

        console.log(error);
      }

      finally {

        setLoading(false);
      }
    };

  const withdrawApplication =
    async (applicationId: number) => {

      try {

        const response =
          await fetch(

            `http://localhost:8080/api/applications/${applicationId}`,

            {
              method: 'DELETE',

              headers: {

                Authorization:
                  `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

        if (!response.ok) {

          alert(
            'Failed to withdraw application'
          );

          return;
        }

        // CHANGE STATUS LOCALLY INSTEAD OF REMOVING

        setApplications(

          applications.map((application) =>

            application.applicationId === applicationId

              ? {
                ...application,
                status: 'WITHDRAWN',
              }

              : application
          )
        );

        alert(
          'Application withdrawn successfully'
        );
      }

      catch (error) {

        console.log(error);
      }
    };

  const reapplyApplication =
    async (applicationId: number) => {

      try {

        const response =
          await fetch(

            `http://localhost:8080/api/applications/${applicationId}/reapply`,

            {
              method: 'PUT',

              headers: {

                Authorization:
                  `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

        if (!response.ok) {

          alert('Failed to reapply');

          return;
        }

        setApplications(

          applications.map((application) =>

            application.applicationId === applicationId

              ? {
                ...application,
                status: 'APPLIED',
              }

              : application
          )
        );

        setActiveTab('APPLIED');

        alert('Application reapplied successfully');
      }

      catch (error) {

        console.log(error);
      }
    };

  const getStatusColor =
    (status: string) => {

      switch (status) {

        case 'APPLIED':
          return 'blue';

        case 'REVIEWING':
          return 'yellow';

        case 'SHORTLISTED':
          return 'cyan';

        case 'HIRED':
          return 'green';

        case 'REJECTED':
          return 'red';

        case 'WITHDRAWN':
          return 'yellow';

        default:
          return 'gray';
      }
    };

  const formatAppliedDate =
    (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).replace(/ /g, ' ').replace(/(\d{2}) (\w{3}), (\d{4})/, '$1 $2, $3');
    };

  const filteredApplications =

    applications.filter((application) => {

      const matchesStatus =

        application.status === activeTab;

      const matchesSearch =

        application.jobTitle
          ?.toLowerCase()
          .includes(search.toLowerCase())

        ||

        application.company
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });

  return (

    <Box
      style={{
        minHeight: '100vh',

        backgroundColor:

          darkMode
            ? '#25262b'
            : '#edf6fb',
      }}
    >

      <Header />

      <Box p={30}>

        <Stack gap={30}>

          {/* HEADER */}

          <Flex
            justify="space-between"
            align="center"
            wrap="wrap"

            gap={20}
          >

            <Box>

              <Title
                order={1}

                style={{

                  color:

                    darkMode
                      ? '#f8f9fa'
                      : '#1e293b',

                  fontSize: '46px',

                  fontWeight: 800,
                }}
              >
                Job History
              </Title>

              <Text
                mt={8}

                size="lg"

                c={
                  darkMode
                    ? '#adb5bd'
                    : '#64748b'
                }
              >
                Track and manage your job applications.
              </Text>

            </Box>

            {/* SEARCH */}

            <TextInput
              placeholder="Search applied jobs"

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }

              leftSection={
                <IconSearch size={18} />
              }

              w={320}

              styles={{

                input: {

                  height: 48,

                  borderRadius: 16,

                  backgroundColor:

                    darkMode
                      ? '#2a2b2f'
                      : '#ffffff',

                  border:
                    '1px solid #3d4046',

                  color:
                    '#f8f9fa',

                  fontSize: '14px',
                },

                section: {
                  color: '#10b1cf',
                },
              }}
            />

          </Flex>

          {/* TABS */}

          <Tabs

            value={activeTab}

            onChange={(value) =>
              setActiveTab(value || 'APPLIED')
            }

            color="cyan"
            style={{
              fontSize: "100px",
              color: '#00d2f7'
            }}
          >

            <Tabs.List>

              <Tabs.Tab value="APPLIED">
                Applied
              </Tabs.Tab>

              <Tabs.Tab value="REVIEWING">
                Reviewing
              </Tabs.Tab>

              <Tabs.Tab value="SHORTLISTED">
                Shortlisted
              </Tabs.Tab>

              <Tabs.Tab value="HIRED">
                Hired
              </Tabs.Tab>

              <Tabs.Tab value="WITHDRAWN">
                Withdrawn
              </Tabs.Tab>

            </Tabs.List>

          </Tabs>

          {/* APPLICATIONS */}

          {
            loading ? (

              <Text c="#adb5bd">
                Loading applications...
              </Text>

            ) : (

              <>
                {
                  filteredApplications.length === 0 && (

                    <Paper
                      p={60}
                      radius="28px"

                      style={{

                        backgroundColor:

                          darkMode
                            ? '#2f3136'
                            : '#ffffff',

                        border:

                          darkMode
                            ? '1px solid #3b3d44'
                            : '1px solid #dee2e6',

                        textAlign: 'center',
                      }}
                    >

                      <Stack align="center" gap={12}>

                        <IconBriefcase
                          size={54}
                          color="#10b1cf"
                        />

                        <Title
                          order={2}

                          c={
                            darkMode
                              ? '#f8f9fa'
                              : '#1e293b'
                          }
                        >
                          Nothing to show
                        </Title>

                        <Text
                          size="lg"

                          c="#868e96"
                        >
                          No applications found in this section yet.
                        </Text>

                      </Stack>

                    </Paper>
                  )
                }

                <Grid>

                  {
                    filteredApplications.map((application) => (

                      <Grid.Col
                        key={
                          application.applicationId
                        }

                        span={{
                          base: 12,
                          sm: 6,
                          lg: 4,
                        }}
                      >

                        <motion.div

                          whileHover={{
                            y: -6,
                          }}
                        >

                          <Card

                            radius="28px"

                            p={23}

                            onMouseEnter={(e) => {

                              e.currentTarget.style.transform =
                                'translateY(-6px)';

                              e.currentTarget.style.border =
                                '1px solid rgba(16,177,207,0.55)';

                              e.currentTarget.style.boxShadow =
                                '0 12px 30px rgba(0,0,0,0.25)';
                            }}

                            onMouseLeave={(e) => {

                              e.currentTarget.style.transform =
                                'translateY(0px)';

                              e.currentTarget.style.border =

                                darkMode
                                  ? '1px solid #3b3d44'
                                  : '1px solid #dee2e6';

                              e.currentTarget.style.boxShadow =
                                'none';
                            }}

                            style={{

                              width: '100%',

                              background:
                                darkMode
                                  ? 'linear-gradient(180deg, #2f3136 0%, #2b2d31 100%)'
                                  : '#ffffff',

                              border:
                                darkMode
                                  ? '1px solid #3b3d44'
                                  : '1px solid #dee2e6',

                              transition: 'all 0.25s ease',

                              cursor: 'pointer',

                              minHeight: 450,

                              display: 'flex',

                              flexDirection: 'column',

                              justifyContent: 'space-between',

                              overflow: 'visible',

                              boxShadow:
                                darkMode
                                  ? '0 10px 25px rgba(0,0,0,0.18)'
                                  : '0 8px 18px rgba(0,0,0,0.06)',
                            }}
                          >

                            {/* TOP */}

                            <Box>

                              <Flex
                                justify="space-between"
                                align="flex-start"
                              >

                                {/* LEFT */}

                                <Group
                                  align="flex-start"
                                  gap={16}
                                >

                                  {/* LOGO */}

                                  <Box
                                    w={62}
                                    h={62}

                                    style={{

                                      borderRadius: 18,

                                      backgroundColor:

                                        darkMode
                                          ? '#383a40'
                                          : '#f1f3f5',

                                      display: 'flex',

                                      alignItems: 'center',

                                      justifyContent: 'center',

                                      flexShrink: 0,
                                    }}
                                  >

                                    <IconBuilding
                                      size={34}
                                      color="#10b1cf"
                                    />

                                  </Box>

                                  {/* TITLE */}

                                  <Box
                                    style={{
                                      flex: 1,
                                    }}
                                  >

                                    <Text
                                      fw={800}

                                      size="23px"

                                      c={
                                        darkMode
                                          ? '#f8f9fa'
                                          : '#1e293b'
                                      }

                                      style={{
                                        lineHeight: 1.15,
                                      }}
                                    >
                                      {application.jobTitle}
                                    </Text>

                                    <Text
                                      mt={6}

                                      size="15px"

                                      c="#adb5bd"
                                    >
                                      {application.company}
                                    </Text>

                                  </Box>

                                </Group>

                                {/* BOOKMARK */}

                                <ActionIcon
                                  radius="xl"

                                  variant="subtle"

                                  color="cyan"

                                  size="lg"
                                >

                                  <IconBookmark
                                    size={24}
                                    stroke={1.8}
                                  />

                                </ActionIcon>

                              </Flex>

                              {/* TAGS */}

                              <Group
                                mt={18}
                                gap={10}
                              >

                                <Badge
                                  radius="md"

                                  size="lg"

                                  color={
                                    getStatusColor(
                                      application.status
                                    )
                                  }
                                >
                                  {application.status}
                                </Badge>

                                <Badge
                                  radius="md"

                                  size="lg"

                                  style={{

                                    backgroundColor:
                                      'rgba(16,177,207,0.12)',

                                    color:
                                      '#10b1cf',

                                    border:
                                      '1px solid rgba(16,177,207,0.18)',

                                    paddingInline: 14,
                                  }}
                                >
                                  {application.location}
                                </Badge>

                              </Group>

                              {/* DESCRIPTION */}

                              <Text
                                mt={24}

                                size="15px"

                                lineClamp={2}

                                c={
                                  darkMode
                                    ? '#d1d5db'
                                    : '#475569'
                                }

                                style={{
                                  lineHeight: 1.7,
                                }}
                              >
                                {
                                  application.description
                                  || 'No description available'
                                }
                              </Text>

                              {/* REQUIREMENTS */}

                              <Box mt={18}>

                                <Text
                                  size="15px"

                                  fw={750}

                                  mb={8}

                                  c="#10b1cf"
                                >
                                  Requirements
                                </Text>

                                <Text
                                  size="14px"

                                  lineClamp={2}

                                  c={
                                    darkMode
                                      ? '#9ca3af'
                                      : '#64748b'
                                  }

                                  style={{
                                    lineHeight: 1.6,
                                  }}
                                >
                                  {
                                    application.requirements
                                    || 'No requirements available'
                                  }
                                </Text>

                              </Box>

                            </Box>

                            {/* BOTTOM */}

                            <Box mt={26}>

                              <Flex
                                justify="space-between"
                                align="center"
                              >

                                {/* SALARY + TIME */}

                                <Box>

                                  <Text
                                    fw={800}

                                    size="20px"

                                    c={
                                      darkMode
                                        ? '#f8f9fa'
                                        : '#1e293b'
                                    }
                                  >
                                    ₹
                                    {
                                      (
                                        application.minSalary / 100000
                                      ).toFixed(0)
                                    }

                                    L - ₹

                                    {
                                      (
                                        application.maxSalary / 100000
                                      ).toFixed(0)
                                    }

                                    LPA
                                  </Text>

                                  <Group
                                    mt={6}
                                    gap={6}
                                  >

                                    <IconClock
                                      size={15}
                                      color="#868e96"
                                    />

                                    <Text
                                      size="13px"

                                      c="#868e96"
                                    >
                                      Applied on{' '}
                                      {formatAppliedDate(application.appliedAt)}
                                    </Text>

                                  </Group>

                                </Box>

                              </Flex>

                              {/* BUTTONS */}

                              <Group
                                grow
                                mt={22}
                                wrap="nowrap"
                              >

                                <Button
                                  radius="xl"

                                  size="md"

                                  leftSection={
                                    <IconEye size={18} />
                                  }

                                  style={{

                                    background:
                                      'linear-gradient(135deg, #0f4c5a 0%, #0ea5c6 100%)',

                                    color: '#ffffff',

                                    fontWeight: 700,

                                    height: 46,

                                    border: 'none',

                                    transition: '0.2s ease',

                                    flex: 1,
                                  }}

                                  onMouseEnter={(e) => {

                                    e.currentTarget.style.transform =
                                      'translateY(-2px)';
                                  }}

                                  onMouseLeave={(e) => {

                                    e.currentTarget.style.transform =
                                      'translateY(0px)';
                                  }}

                                  onClick={() => {

                                    setSelectedApplication(application);

                                    setOpened(true);
                                  }}
                                >
                                  View
                                </Button>

                                {
                                  application.status === 'WITHDRAWN' ? (

                                    <Button
                                      radius="xl"

                                      size="md"

                                      color="cyan"

                                      leftSection={
                                        <IconChecklist size={18} />
                                      }

                                      style={{

                                        fontWeight: 700,

                                        height: 46,

                                        flex: 1,
                                      }}

                                      onClick={() =>
                                        reapplyApplication(
                                          application.applicationId
                                        )
                                      }
                                    >
                                      Reapply
                                    </Button>

                                  ) : (

                                    <Button
                                      radius="xl"

                                      size="md"

                                      leftSection={
                                        <IconTrash size={18} />
                                      }

                                      style={{

                                        background:
                                          'linear-gradient(135deg, #ff5a5a 0%, #ff4343 100%)',

                                        color: '#ffffff',

                                        fontWeight: 700,

                                        height: 46,

                                        border: 'none',

                                        transition: '0.2s ease',

                                        flex: 1,
                                      }}

                                      onMouseEnter={(e) => {

                                        e.currentTarget.style.transform =
                                          'translateY(-2px)';
                                      }}

                                      onMouseLeave={(e) => {

                                        e.currentTarget.style.transform =
                                          'translateY(0px)';
                                      }}

                                      onClick={() =>
                                        withdrawApplication(
                                          application.applicationId
                                        )
                                      }
                                    >
                                      Withdraw
                                    </Button>

                                  )
                                }

                              </Group>

                              <Drawer
                                opened={opened}

                                onClose={() =>
                                  setOpened(false)
                                }

                                position="right"

                                size="42%"

                                padding="xl"

                                withCloseButton={false}

                                styles={{

                                  content: {

                                    backgroundColor:

                                      darkMode
                                        ? '#25262b'
                                        : '#ffffff',

                                    paddingTop: 10,
                                  },

                                  body: {
                                    paddingTop: 24,
                                  },

                                  header: {

                                    backgroundColor:

                                      darkMode
                                        ? '#25262b'
                                        : '#ffffff',

                                    minHeight: 0,

                                    padding: 0,

                                    margin: 0,
                                  },

                                  title: {
                                    display: 'none',
                                  },
                                }}

                              >

                                {
                                  selectedApplication && (

                                    <Stack gap={26}>

                                      {/* JOB HEADER */}

                                      <Flex
                                        justify="space-between"
                                        align="flex-start"
                                      >

                                        <Group align="flex-start" gap={18}>

                                          {/* COMPANY ICON */}

                                          <Avatar
                                            size={58}
                                            radius="xl"
                                            color="cyan"
                                          >
                                            <IconBuilding size={28} />
                                          </Avatar>

                                          <Box>

                                            {/* JOB TITLE */}

                                            <Title
                                              order={2}
                                              c={
                                                darkMode
                                                  ? '#f8f9fa'
                                                  : '#1e293b'
                                              }
                                              style={{
                                                fontSize: '30px',
                                                lineHeight: 1.2,
                                                marginBottom: 4,
                                              }}
                                            >
                                              {selectedApplication?.jobTitle}
                                            </Title>

                                            {/* COMPANY */}

                                            <Text
                                              size="lg"
                                              fw={600}
                                              c="#10b1cf"
                                            >
                                              SmartHire AI
                                            </Text>

                                            {/* META */}

                                            <Group mt={14} gap={12}>

                                              <Badge
                                                radius="xl"
                                                color="cyan"
                                                variant="light"
                                              >
                                                {selectedApplication?.status}
                                              </Badge>

                                              <Badge
                                                radius="xl"
                                                variant="light"
                                                color="gray"
                                              >
                                                {selectedApplication?.location}
                                              </Badge>

                                              <Group gap={5}>

                                                <IconCurrencyRupee
                                                  size={16}
                                                  color="#10b1cf"
                                                />

                                                <Text
                                                  size="sm"
                                                  c="#adb5bd"
                                                >
                                                  ₹
                                                  {
                                                    (
                                                      application.minSalary / 100000
                                                    ).toFixed(0)
                                                  }

                                                  L - ₹

                                                  {
                                                    (
                                                      application.maxSalary / 100000
                                                    ).toFixed(0)
                                                  }

                                                  LPA
                                                </Text>

                                              </Group>

                                            </Group>

                                          </Box>

                                        </Group>

                                        <ActionIcon
                                          variant="subtle"
                                          color="gray"
                                          size="lg"
                                          onClick={() => setOpened(false)}
                                        >
                                          <IconX size={18} color='cyan' />
                                        </ActionIcon>

                                      </Flex>

                                      <Divider color="#343a40" />

                                      {/* DESCRIPTION */}

                                      <Stack gap={10}>

                                        <Group gap={8}>

                                          <IconFileText
                                            size={20}
                                            color="#10b1cf"
                                          />

                                          <Title
                                            order={4}
                                            style={{
                                              fontSize: '20px',
                                            }}
                                          >
                                            Job Description
                                          </Title>

                                        </Group>

                                        <Text
                                          c="#ced4da"
                                          style={{
                                            lineHeight: 1.9,
                                            fontSize: '15px',
                                          }}
                                        >
                                          {selectedApplication?.description}
                                        </Text>

                                      </Stack>

                                      <Divider color="#343a40" />

                                      {/* REQUIREMENTS */}

                                      <Stack gap={10}>

                                        <Group gap={8}>

                                          <IconChecklist
                                            size={20}
                                            color="#10b1cf"
                                          />

                                          <Title
                                            order={4}
                                            style={{
                                              fontSize: '20px',
                                            }}
                                          >
                                            Requirements
                                          </Title>

                                        </Group>

                                        <Text
                                          c="#ced4da"
                                          style={{
                                            lineHeight: 1.9,
                                            fontSize: '15px',
                                          }}
                                        >
                                          {selectedApplication?.requirements}
                                        </Text>

                                      </Stack>

                                      <Divider color="#343a40" />

                                      {/* COVER LETTER */}

                                      <Stack gap={10}>

                                        <Group gap={8}>

                                          <IconMessage2
                                            size={20}
                                            color="#10b1cf"
                                          />

                                          <Title
                                            order={4}
                                            style={{
                                              fontSize: '20px',
                                            }}
                                          >
                                            Cover Letter
                                          </Title>

                                        </Group>

                                        <Paper
                                          p={18}
                                          radius="lg"
                                          style={{
                                            backgroundColor:
                                              darkMode
                                                ? '#2c2e33'
                                                : '#f8fafc',

                                            border:
                                              darkMode
                                                ? '1px solid #3b3d44'
                                                : '1px solid #dee2e6',
                                          }}
                                        >

                                          <Text
                                            c={
                                              darkMode
                                                ? '#f1f3f5'
                                                : '#334155'
                                            }

                                            style={{
                                              lineHeight: 1.9,
                                              fontSize: '15px',
                                            }}
                                          >
                                            {selectedApplication?.coverLetter}
                                          </Text>

                                        </Paper>

                                      </Stack>

                                      <Divider color="#343a40" />

                                      {/* RESUME */}

                                      <Flex
                                        justify="space-between"
                                        align="center"
                                      >

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
                                            Resume
                                          </Text>

                                          <Text
                                            size="sm"
                                            c="#adb5bd"
                                          >
                                            View and download your resume
                                          </Text>

                                        </Box>

                                        <Button
                                          radius="xl"

                                          component="a"

                                          href={`http://localhost:8080/${selectedApplication?.resumeUrl}`}

                                          target="_blank"

                                          color="cyan"

                                          leftSection={
                                            <IconDownload size={18} />
                                          }
                                        >
                                          Resume
                                        </Button>

                                      </Flex>

                                    </Stack>
                                  )
                                }

                              </Drawer>

                            </Box>

                          </Card>

                        </motion.div>

                      </Grid.Col>
                    ))
                  }

                </Grid>
              </>
            )
          }

        </Stack>

      </Box>

    </Box>
  );
}

export default JobHistoryPage;