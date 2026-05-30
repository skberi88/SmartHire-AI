import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  Modal,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Tabs,
  Text,
  Textarea,
  TextInput,
  Title,
  SimpleGrid,
  NumberInput,
  MultiSelect,
  Grid,
} from '@mantine/core';

import {
  IconBriefcase,
  IconBuilding,
  IconCalendar,
  IconCheck,
  IconClock,
  IconMapPin,
  IconUsers,
  IconX,
  IconChecklist,
  IconCode,
  IconFileText,
  IconCurrencyRupee,
  IconBuildingSkyscraper,
  IconLocationPin,
} from '@tabler/icons-react';

import { useEffect, useState } from 'react';

import Header from '../components/Header';

import { useTheme } from '../context/ThemeContext';

function PostedJobsPage() {

  const { darkMode } = useTheme();

  const [jobs, setJobs] = useState<any[]>([]);

  const [selectedJob, setSelectedJob] = useState<any>(null);

  const [applications, setApplications] = useState<any[]>([]);

  const [activeFilter, setActiveFilter] =
    useState('ACTIVE');

  const [activeTab, setActiveTab] =
    useState('overview');

  const [scheduleModalOpened,
    setScheduleModalOpened] =
    useState(false);

  const [selectedApplication,
    setSelectedApplication] =
    useState<any>(null);

  const [interviewDate,
    setInterviewDate] =
    useState('');

  const [editModalOpened, setEditModalOpened] =
    useState(false);

  const [editJobData, setEditJobData] =
    useState<any>(null);

  useEffect(() => {

    fetchEmployerJobs();

  }, []);

  useEffect(() => {

    if (selectedJob) {

      fetchApplicants(selectedJob.id);
    }

  }, [selectedJob]);

  const fetchEmployerJobs =
    async () => {

      try {

        const response =
          await fetch(
            'http://localhost:8080/api/jobs/employer',
            {
              headers: {
                Authorization:
                  `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

        const data =
          await response.json();

        setJobs(data);

        if (data.length > 0) {
          setSelectedJob(data[0]);
        }
      }

      catch (error) {
        console.log(error);
      }
    };

  const fetchApplicants =
    async (jobId: number) => {

      try {

        const response =
          await fetch(
            `http://localhost:8080/api/applications/job/${jobId}`,
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
    };

  const updateStatus =
    async (
      applicationId: number,
      status: string
    ) => {

      try {

        const token =
          localStorage.getItem('token');

        const response =
          await fetch(
            `http://localhost:8080/api/applications/${applicationId}/status?status=${status}`,
            {
              method: 'PUT',

              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        if (!response.ok) {

          console.log(
            'STATUS UPDATE FAILED'
          );

          return;
        }

        setApplications((prev) =>

          prev.map((application) =>

            application.applicationId === applicationId

              ? {
                ...application,
                status,
              }

              : application
          )
        );

        if (
          status === 'SHORTLISTED'
        ) {

          setActiveTab('invited');
        }

        if (
          status === 'HIRED'
        ) {

          setActiveTab('hired');
        }

        if (
          status === 'REJECTED'
        ) {

          setActiveTab('rejected');
        }

        if (
          status === 'APPLIED'
          ||
          status === 'REVIEWING'
        ) {

          setActiveTab('applicants');
        }
      }

      catch (error) {

        console.log(error);
      }

    };

  const withdrawnApplicants =
    applications.filter(
      (application) =>
        application.status === 'WITHDRAWN'
    );


  const closeOrReopenJob =
    async () => {

      try {

        await fetch(
          `http://localhost:8080/api/jobs/${selectedJob.id}/${selectedJob.active ? 'close' : 'reopen'}`,
          {
            method: 'PUT',

            headers: {
              Authorization:
                `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        fetchEmployerJobs();
      }

      catch (error) {
        console.log(error);
      }
    };

  const updateJob =
    async () => {

      try {

        await fetch(
          `http://localhost:8080/api/jobs/${selectedJob.id}`,
          {
            method: 'PUT',

            headers: {
              'Content-Type': 'application/json',

              Authorization:
                `Bearer ${localStorage.getItem('token')}`,
            },

            body: JSON.stringify(editJobData),
          }
        );

        setEditModalOpened(false);

        fetchEmployerJobs();

        const updatedResponse =
          await fetch(
            `http://localhost:8080/api/jobs/${selectedJob.id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

        const updatedJob =
          await updatedResponse.json();

        setSelectedJob(updatedJob);

      }

      catch (error) {

        console.log(error);
      }
    };

  const filteredJobs =
    jobs.filter((job) => {

      if (activeFilter === 'ACTIVE') {
        return job.active === true;
      }

      if (activeFilter === 'CLOSED') {
        return job.active === false;
      }

      return true;
    });

  const shortlistedApplicants =
    applications.filter(
      (application) =>
        application.status === 'SHORTLISTED'
    );

  const hiredApplicants =
    applications.filter(
      (application) =>
        application.status === 'HIRED'
    );

  const rejectedApplicants =
    applications.filter(
      (application) =>
        application.status === 'REJECTED'
    );

  const inputStyles = {

    label: {

      color:
        darkMode
          ? '#f8f9fa'
          : '#1e293b',

      marginBottom: 6,

      fontWeight: 600,
    },

    input: {

      backgroundColor:
        darkMode
          ? '#2c2e33'
          : '#ffffff',

      border:
        '1px solid #495057',

      color:
        darkMode
          ? '#ffffff'
          : '#1e293b',

      borderRadius: 12,
    },

    dropdown: {

      backgroundColor:
        darkMode
          ? '#2c2e33'
          : '#ffffff',

      border:
        '1px solid #495057',
    },

    option: {

      backgroundColor:
        darkMode
          ? '#2c2e33'
          : '#ffffff',

      color:
        darkMode
          ? '#ffffff'
          : '#1e293b',
    },

    pill: {

      backgroundColor:
        'rgba(16,177,207,0.12)',

      color: '#10b1cf',
    },
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

      <Flex
        gap={0}

        style={{
          minHeight: 'calc(100vh - 82px)',
        }}
      >

        {/* SIDEBAR */}

        <Box
          w={320}
          style={{
            borderRight:
              darkMode
                ? '1px solid #343a40'
                : '1px solid #dee2e6',

            backgroundColor:
              darkMode
                ? '#202123'
                : '#ffffff',

            minHeight: 'calc(100vh - 82px)',

            position: 'relative',

            overflow: 'hidden',

            display: 'flex',

            flexDirection: 'column',
          }}
        >

          {/* TOP */}

          <Box
            p={24}
            style={{
              borderBottom:
                darkMode
                  ? '1px solid #343a40'
                  : '1px solid #dee2e6',
            }}
          >

            <Stack gap={22}>

              <Title
                order={2}
                c={
                  darkMode
                    ? '#f8f9fa'
                    : '#1e293b'
                }
              >
                Posted Jobs
              </Title>

              <Group>

                {
                  ['ACTIVE', 'CLOSED', 'ALL']
                    .map((filter) => (

                      <Button
                        key={filter}

                        radius="xl"

                        variant={
                          activeFilter === filter
                            ? 'filled'
                            : 'light'
                        }

                        color="cyan"

                        onClick={() =>
                          setActiveFilter(filter)
                        }

                        style={{
                          fontWeight: 700,
                        }}
                      >
                        {filter}
                      </Button>
                    ))
                }

              </Group>

            </Stack>

          </Box>

          {/* SCROLLABLE JOBS */}

          <ScrollArea
            style={{
              flex: 1,
            }}
            scrollbarSize={6}
          >

            <Stack p={18} gap={16}>

              {
                filteredJobs.map((job) => (

                  <Paper
                    key={job.id}

                    p={20}

                    radius="28px"

                    onClick={() =>
                      setSelectedJob(job)
                    }

                    style={{

                      backgroundColor:

                        selectedJob?.id === job.id

                          ? 'rgba(16,177,207,0.12)'

                          : darkMode
                            ? '#2c2e33'
                            : '#ffffff',

                      border:

                        selectedJob?.id === job.id

                          ? '1px solid #10b1cf'

                          : darkMode
                            ? '1px solid #343a40'
                            : '1px solid #dee2e6',

                      cursor: 'pointer',

                      transition: '0.22s ease',

                      minHeight: 140,
                    }}
                  >

                    <Stack gap={14}>

                      <Flex
                        justify="space-between"
                        align="flex-start"
                      >

                        <Text
                          fw={700}
                          size="lg"
                          c={
                            darkMode
                              ? '#f8f9fa'
                              : '#1e293b'
                          }
                          style={{
                            lineHeight: 1.3,
                            maxWidth: 190,
                          }}
                        >
                          {job.title}
                        </Text>

                        <Badge
                          color={
                            job.active
                              ? 'cyan'
                              : 'red'
                          }

                          radius="xl"

                          size="xs"
                        >
                          {
                            job.active
                              ? 'OPEN'
                              : 'CLOSED'
                          }
                        </Badge>

                      </Flex>

                      <Text
                        c="#adb5bd"
                        size="sm"
                      >
                        {job.company}
                      </Text>

                      <Group gap={6}>

                        <IconUsers
                          size={16}
                          color="#10b1cf"
                        />

                        <Text
                          size="sm"
                          c="#10b1cf"
                        >
                          {job.noOfApplicants}
                          {' Applicants'}
                        </Text>

                      </Group>

                    </Stack>

                  </Paper>
                ))
              }

            </Stack>

          </ScrollArea>

        </Box>

        {/* MAIN CONTENT */}

        <Box
          style={{
            flex: 1,
            padding: 32,
          }}
        >

          {
            selectedJob && (

              <Stack gap={28}>

                {/* TOP HEADER */}

                <Paper
                  p={36}
                  radius="28px"
                  style={{
                    background:
                      darkMode
                        ? 'linear-gradient(135deg, #2c2e33 0%, #26282d 100%)'
                        : '#ffffff',

                    border:
                      darkMode
                        ? '1px solid #343a40'
                        : '1px solid #dee2e6',

                    boxShadow:
                      darkMode
                        ? '0 18px 40px rgba(0,0,0,0.28)'
                        : '0 18px 40px rgba(15,23,42,0.08)',

                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >

                  {/* GLOW */}

                  <Box
                    style={{
                      position: 'absolute',
                      top: -120,
                      right: -120,
                      width: 260,
                      height: 260,
                      borderRadius: '50%',
                      background:
                        'rgba(16,177,207,0.08)',
                      filter: 'blur(30px)',
                    }}
                  />

                  <Flex
                    justify="space-between"
                    align="flex-start"
                    wrap="wrap"
                    gap={28}
                    style={{
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >

                    {/* LEFT */}

                    <Stack gap={24}>

                      {/* TITLE */}

                      <Group align="flex-start" gap={18}>

                        <Box
                          p={16}
                          style={{
                            borderRadius: 22,
                            background:
                              'rgba(16,177,207,0.12)',

                            border:
                              '1px solid rgba(16,177,207,0.25)',
                          }}
                        >

                          <IconBuildingSkyscraper
                            size={42}
                            color="#10b1cf"
                          />

                        </Box>

                        <Box>

                          <Title
                            c={
                              darkMode
                                ? '#ffffff'
                                : '#1e293b'
                            }
                            style={{
                              fontSize: '42px',
                              lineHeight: 1.05,
                              letterSpacing: '-2px',
                              fontWeight: 750,
                            }}
                          >
                            {selectedJob.title}
                          </Title>

                          <Text
                            mt={10}
                            size="lg"
                            c="#adb5bd"
                            fw={500}
                          >
                            {selectedJob.company}
                          </Text>

                        </Box>

                      </Group>

                      {/* META */}

                      <Group gap={26}>

                        <Group gap={8}>

                          <IconBriefcase
                            size={18}
                            color="#10b1cf"
                          />

                          <Text
                            size="sm"
                            fw={600}
                            c="#ced4da"
                          >
                            {selectedJob.employmentType}
                          </Text>

                        </Group>

                        <Group gap={8}>

                          <IconMapPin
                            size={18}
                            color="#10b1cf"
                          />

                          <Text
                            size="sm"
                            fw={600}
                            c="#ced4da"
                          >
                            {selectedJob.location}
                          </Text>

                        </Group>

                        <Group gap={8}>

                          <IconLocationPin
                            size={18}
                            color="#10b1cf"
                          />

                          <Text
                            size="sm"
                            fw={600}
                            c="#ced4da"
                          >
                            {selectedJob.workMode}
                          </Text>

                        </Group>

                        <Group gap={8}>

                          <IconClock
                            size={18}
                            color="#10b1cf"
                          />

                          <Text
                            size="sm"
                            fw={600}
                            c="#ced4da"
                          >
                            {formatAppliedDate(selectedJob.postedAt)}
                          </Text>

                        </Group>

                      </Group>

                    </Stack>

                    {/* RIGHT BUTTONS */}

                    <Group align="flex-start">

                      <Button
                        radius="xl"
                        size="md"
                        variant="light"
                        color="cyan"
                        onClick={() => {

                          setEditJobData(selectedJob);

                          setEditModalOpened(true);
                        }}
                        style={{
                          fontWeight: 700,
                          paddingInline: 22,
                          height: 48,
                        }}
                      >
                        Edit Job
                      </Button>

                      <Button
                        radius="xl"
                        size="md"
                        color={
                          selectedJob.active
                            ? 'red'
                            : 'cyan'
                        }
                        onClick={closeOrReopenJob}
                        style={{
                          fontWeight: 700,
                          paddingInline: 22,
                          height: 48,
                        }}
                      >
                        {
                          selectedJob.active
                            ? 'Close Job'
                            : 'Reopen Job'
                        }
                      </Button>

                    </Group>

                  </Flex>

                </Paper>

                {/* TABS */}

                <Tabs
                  value={activeTab}

                  onChange={(value: any) =>
                    setActiveTab(value)
                  }

                  color="cyan"

                  styles={{

                    tab: {

                      color:
                        darkMode
                          ? '#adb5bd'
                          : '#475569',

                      fontWeight: 600,

                      fontSize: '15px',

                      transition: '0.2s ease',
                    },

                    tabLabel: {
                      fontWeight: 600,
                    },

                    list: {

                      borderBottom:

                        darkMode
                          ? '1px solid #3b3d44'
                          : '1px solid #dee2e6',
                    },
                  }}
                >

                  <Tabs.List>

                    <Tabs.Tab value="overview">
                      Overview
                    </Tabs.Tab>

                    <Tabs.Tab value="applicants">
                      Applicants
                    </Tabs.Tab>

                    <Tabs.Tab value="invited">
                      Invited
                    </Tabs.Tab>

                    <Tabs.Tab value="hired">
                      Hired
                    </Tabs.Tab>

                    <Tabs.Tab value="rejected">
                      Rejected
                    </Tabs.Tab>

                    <Tabs.Tab value="withdrawn">
                      Withdrawn
                    </Tabs.Tab>

                  </Tabs.List>

                  {/* OVERVIEW */}

                  <Tabs.Panel value="overview" pt={28}>

                    <Stack gap={24}>

                      {/* TOP STATS */}

                      <SimpleGrid cols={4} spacing={18}>

                        {/* APPLICANTS */}

                        <Paper
                          p={24}
                          radius="24px"
                          style={{
                            background:
                              darkMode
                                ? 'linear-gradient(180deg,#2c2e33 0%, #26282d 100%)'
                                : '#ffffff',

                            border:
                              darkMode
                                ? '1px solid #343a40'
                                : '1px solid #dee2e6',

                            boxShadow:
                              '0 10px 28px rgba(0,0,0,0.18)',
                          }}
                        >

                          <Stack gap={10}>

                            <Group gap={8}>

                              <IconUsers
                                size={18}
                                color="#10b1cf"
                              />

                              <Text
                                size="sm"
                                c="#adb5bd"
                              >
                                Applicants
                              </Text>

                            </Group>

                            <Title
                              order={2}
                              c={
                                darkMode
                                  ? '#ffffff'
                                  : '#1e293b'
                              }
                            >
                              {selectedJob.noOfApplicants}
                            </Title>

                          </Stack>

                        </Paper>

                        {/* SALARY */}

                        <Paper
                          p={24}
                          radius="24px"
                          style={{
                            background:
                              darkMode
                                ? 'linear-gradient(180deg,#2c2e33 0%, #26282d 100%)'
                                : '#ffffff',

                            border:
                              darkMode
                                ? '1px solid #343a40'
                                : '1px solid #dee2e6',

                            boxShadow:
                              '0 10px 28px rgba(0,0,0,0.18)',
                          }}
                        >

                          <Stack gap={10}>

                            <Group gap={8}>

                              <IconCurrencyRupee
                                size={18}
                                color="#10b1cf"
                              />

                              <Text
                                size="sm"
                                c="#adb5bd"
                              >
                                Salary
                              </Text>

                            </Group>

                            <Title
                              order={3}
                              c={
                                darkMode
                                  ? '#ffffff'
                                  : '#1e293b'
                              }
                              style={{
                                lineHeight: 1.4,
                              }}
                            >
                              ₹{(selectedJob.minSalary / 100000).toFixed()} L -
                              ₹{(selectedJob.maxSalary / 100000).toFixed()} LPA
                            </Title>

                          </Stack>

                        </Paper>

                        {/* EXPERIENCE */}

                        <Paper
                          p={24}
                          radius="24px"
                          style={{
                            background:
                              darkMode
                                ? 'linear-gradient(180deg,#2c2e33 0%, #26282d 100%)'
                                : '#ffffff',

                            border:
                              darkMode
                                ? '1px solid #343a40'
                                : '1px solid #dee2e6',

                            boxShadow:
                              '0 10px 28px rgba(0,0,0,0.18)',
                          }}
                        >

                          <Stack gap={10}>

                            <Group gap={8}>

                              <IconBriefcase
                                size={18}
                                color="#10b1cf"
                              />

                              <Text
                                size="sm"
                                c="#adb5bd"
                              >
                                Experience
                              </Text>

                            </Group>

                            <Title
                              order={2}
                              c={
                                darkMode
                                  ? '#ffffff'
                                  : '#1e293b'
                              }
                            >
                              {selectedJob.experienceLevel}
                            </Title>

                          </Stack>

                        </Paper>

                        {/* WORK MODE */}

                        <Paper
                          p={24}
                          radius="24px"
                          style={{
                            background:
                              darkMode
                                ? 'linear-gradient(180deg,#2c2e33 0%, #26282d 100%)'
                                : '#ffffff',

                            border:
                              darkMode
                                ? '1px solid #343a40'
                                : '1px solid #dee2e6',

                            boxShadow:
                              '0 10px 28px rgba(0,0,0,0.18)',
                          }}
                        >

                          <Stack gap={10}>

                            <Group gap={8}>

                              <IconMapPin
                                size={18}
                                color="#10b1cf"
                              />

                              <Text
                                size="sm"
                                c="#adb5bd"
                              >
                                Work Mode
                              </Text>

                            </Group>

                            <Title
                              order={2}
                              c={
                                darkMode
                                  ? '#ffffff'
                                  : '#1e293b'
                              }
                            >
                              {selectedJob.workMode}
                            </Title>

                          </Stack>

                        </Paper>

                      </SimpleGrid>

                      {/* DESCRIPTION */}

                      <Paper
                        p={32}
                        radius="24px"
                        style={{
                          background:
                            darkMode
                              ? 'linear-gradient(180deg,#2c2e33 0%, #26282d 100%)'
                              : '#ffffff',

                          border:
                            darkMode
                              ? '1px solid #343a40'
                              : '1px solid #dee2e6',

                          boxShadow:
                            '0 10px 28px rgba(0,0,0,0.18)',
                        }}
                      >

                        <Group mb={20}>

                          <IconFileText
                            size={24}
                            color="#10b1cf"
                          />

                          <Title
                            order={2}
                            c={
                              darkMode
                                ? '#ffffff'
                                : '#1e293b'
                            }
                          >
                            Job Description
                          </Title>

                        </Group>

                        <Text
                          c={
                            darkMode
                              ? '#ced4da'
                              : '#475569'
                          }
                          style={{
                            lineHeight: 1.9,
                            fontSize: '15px',
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {selectedJob.description}
                        </Text>

                      </Paper>

                      {/* REQUIREMENTS */}

                      <Paper
                        p={32}
                        radius="24px"
                        style={{
                          background:
                            darkMode
                              ? 'linear-gradient(180deg,#2c2e33 0%, #26282d 100%)'
                              : '#ffffff',

                          border:
                            darkMode
                              ? '1px solid #343a40'
                              : '1px solid #dee2e6',

                          boxShadow:
                            '0 10px 28px rgba(0,0,0,0.18)',
                        }}
                      >

                        <Group mb={20}>

                          <IconChecklist
                            size={24}
                            color="#10b1cf"
                          />

                          <Title
                            order={2}
                            c={
                              darkMode
                                ? '#ffffff'
                                : '#1e293b'
                            }
                          >
                            Requirements
                          </Title>

                        </Group>

                        <Text
                          c={
                            darkMode
                              ? '#ced4da'
                              : '#475569'
                          }
                          style={{
                            lineHeight: 1.9,
                            fontSize: '15px',
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {selectedJob.requirements}
                        </Text>

                      </Paper>

                      {/* SKILLS */}

                      <Paper
                        p={32}
                        radius="24px"
                        style={{
                          background:
                            darkMode
                              ? 'linear-gradient(180deg,#2c2e33 0%, #26282d 100%)'
                              : '#ffffff',

                          border:
                            darkMode
                              ? '1px solid #343a40'
                              : '1px solid #dee2e6',

                          boxShadow:
                            '0 10px 28px rgba(0,0,0,0.18)',
                        }}
                      >

                        <Group mb={20}>

                          <IconCode
                            size={24}
                            color="#10b1cf"
                          />

                          <Title
                            order={2}
                            c={
                              darkMode
                                ? '#ffffff'
                                : '#1e293b'
                            }
                          >
                            Skills Required
                          </Title>

                        </Group>

                        <Group gap={12}>

                          {selectedJob.skillsRequired?.map((skill: string) => (

                            <Badge
                              key={skill}
                              radius="xl"
                              size="lg"
                              variant="light"
                              color="cyan"
                              style={{
                                padding:
                                  '10px 16px',

                                fontWeight: 700,

                                letterSpacing: 0.3,
                              }}
                            >
                              {skill}
                            </Badge>

                          ))}

                        </Group>

                      </Paper>

                    </Stack>

                  </Tabs.Panel>

                  {/* APPLICANTS */}

                  <Tabs.Panel
                    value="applicants"
                    pt={28}
                  >

                    <Stack gap={22}>

                      {
                        applications.filter(
                          (application) =>

                            ['APPLIED', 'REVIEWING']
                              .includes(application.status)
                        )
                          .map((application) => (

                            <Paper
                              key={application.applicationId}
                              p={30}
                              radius="2xl"
                              style={{
                                backgroundColor:
                                  darkMode
                                    ? '#2c2e33'
                                    : '#ffffff',

                                border:
                                  darkMode
                                    ? '1px solid #343a40'
                                    : '1px solid #dee2e6',

                                boxShadow:
                                  '0 8px 30px rgba(0,0,0,0.18)',
                              }}
                            >

                              <Flex
                                justify="space-between"
                                align="flex-start"
                                wrap="wrap"
                                gap={30}
                              >

                                {/* LEFT SIDE */}

                                <Box style={{ flex: 1, minWidth: 320 }}>

                                  {/* TOP PROFILE */}

                                  <Group align="flex-start" mb={22}>

                                    <Avatar
                                      size={72}
                                      radius="xl"
                                      color="cyan"
                                    >
                                      {application.applicantName?.charAt(0)}
                                    </Avatar>

                                    <Box>

                                      <Title
                                        order={3}
                                        c={
                                          darkMode
                                            ? '#f8f9fa'
                                            : '#1e293b'
                                        }
                                        style={{
                                          fontSize: '28px',
                                        }}
                                      >
                                        {application.applicantName}
                                      </Title>

                                      <Text
                                        mt={4}
                                        size="sm"
                                        c="#adb5bd"
                                      >
                                        {application.applicantEmail}
                                      </Text>

                                      <Text
                                        mt={2}
                                        size="sm"
                                        c="#adb5bd"
                                      >
                                        {application.phone}
                                      </Text>

                                    </Box>

                                  </Group>

                                  {/* INFO TAGS */}

                                  <Group mb={22}>

                                    <Badge
                                      radius="xl"
                                      color="blue"
                                      variant="light"
                                    >
                                      Applicant
                                    </Badge>

                                    <Badge
                                      radius="xl"
                                      color="cyan"
                                      variant="light"
                                    >
                                      Resume Uploaded
                                    </Badge>

                                    <Badge
                                      radius="xl"
                                      color="grape"
                                      variant="light"
                                    >
                                      SmartHire AI
                                    </Badge>

                                  </Group>

                                  {/* COVER LETTER */}

                                  <Box
                                    p={18}
                                    style={{
                                      backgroundColor:
                                        darkMode
                                          ? '#25262b'
                                          : '#f8f9fa',

                                      borderRadius: 18,

                                      border:
                                        darkMode
                                          ? '1px solid #343a40'
                                          : '1px solid #dee2e6',
                                    }}
                                  >

                                    <Text
                                      fw={700}
                                      mb={10}
                                      c={
                                        darkMode
                                          ? '#f8f9fa'
                                          : '#1e293b'
                                      }
                                    >
                                      Cover Letter
                                    </Text>

                                    <Text
                                      size="sm"
                                      c={
                                        darkMode
                                          ? '#ced4da'
                                          : '#475569'
                                      }
                                      style={{
                                        lineHeight: 1.8,
                                      }}
                                    >
                                      {application.coverLetter}
                                    </Text>

                                  </Box>

                                  {/* RESUME BUTTON */}

                                  <Group mt={24}>

                                    <Button
                                      radius="xl"

                                      component="a"

                                      href={`http://localhost:8080/${application.resumeUrl}`}

                                      target="_blank"

                                      color="cyan"

                                      variant="light"
                                    >
                                      View Resume
                                    </Button>

                                  </Group>

                                </Box>

                                {/* RIGHT SIDE */}

                                <Stack
                                  align="stretch"
                                  gap={18}
                                  style={{
                                    minWidth: 260,
                                  }}
                                >

                                  {/* STATUS */}

                                  <Box>

                                    <Text
                                      size="sm"
                                      fw={600}
                                      mb={8}
                                      c="#adb5bd"
                                    >
                                      Application Status
                                    </Text>

                                    <Badge
                                      radius="xl"
                                      size="xl"
                                      color={
                                        application.status === 'HIRED'
                                          ? 'green'
                                          : application.status === 'REJECTED'
                                            ? 'red'
                                            : application.status === 'SHORTLISTED'
                                              ? 'cyan'
                                              : 'blue'
                                      }
                                      fullWidth
                                      style={{
                                        padding: '14px 0',
                                        fontSize: '13px',
                                        fontWeight: 700,
                                      }}
                                    >
                                      {application.status}
                                    </Badge>

                                  </Box>

                                  {/* UPDATE STATUS */}

                                  <Select
                                    placeholder="Update Status"

                                    data={[
                                      'APPLIED',
                                      'REVIEWING',
                                      'SHORTLISTED',
                                      'HIRED',
                                      'REJECTED',
                                    ]}

                                    onChange={(value) => {

                                      if (!value) return;

                                      updateStatus(
                                        application.applicationId,
                                        value
                                      );
                                    }}

                                    styles={{

                                      input: {

                                        backgroundColor:
                                          darkMode
                                            ? '#25262b'
                                            : '#ffffff',

                                        border:
                                          '1px solid #495057',

                                        color:
                                          darkMode
                                            ? '#ffffff'
                                            : '#1e293b',

                                        borderRadius: 14,

                                        minHeight: 46,

                                        fontSize: '14px',

                                        fontWeight: 500,

                                        transition: '0.2s ease',
                                      },

                                      dropdown: {

                                        backgroundColor:
                                          darkMode
                                            ? '#2c2e33'
                                            : '#ffffff',

                                        border:
                                          '1px solid #495057',

                                        borderRadius: 14,

                                        overflow: 'hidden',
                                      },

                                      option: {

                                        backgroundColor:
                                          darkMode
                                            ? '#2c2e33'
                                            : '#ffffff',

                                        color:
                                          darkMode
                                            ? '#f8f9fa'
                                            : '#1e293b',

                                        fontSize: '14px',

                                        fontWeight: 500,

                                        padding: '12px 14px',
                                      },

                                      section: {

                                        color:
                                          darkMode
                                            ? '#adb5bd'
                                            : '#64748b',
                                      },
                                    }}
                                  />

                                  {/* INTERVIEW */}

                                  <Button
                                    radius="xl"

                                    color="cyan"

                                    size="md"

                                    leftSection={
                                      <IconCalendar size={18} />
                                    }

                                    onClick={() => {

                                      setSelectedApplication(
                                        application
                                      );

                                      setScheduleModalOpened(
                                        true
                                      );
                                    }}
                                  >
                                    Schedule Interview
                                  </Button>

                                </Stack>

                              </Flex>

                            </Paper>
                          ))
                      }

                    </Stack>

                  </Tabs.Panel>

                  {/* INVITED */}

                  <Tabs.Panel
                    value="invited"
                    pt={28}
                  >

                    <Stack gap={22}>

                      {
                        shortlistedApplicants.map((application) => (

                          <Paper
                            key={application.applicationId}
                            p={28}
                            radius="2xl"
                            style={{
                              background:
                                darkMode
                                  ? 'linear-gradient(180deg, #2c2e33 0%, #26282d 100%)'
                                  : '#ffffff',

                              border:
                                darkMode
                                  ? '1px solid #343a40'
                                  : '1px solid #dee2e6',

                              boxShadow:
                                '0 8px 28px rgba(0,0,0,0.18)',
                            }}
                          >

                            <Flex
                              justify="space-between"
                              align="center"
                              wrap="wrap"
                              gap={24}
                            >

                              {/* LEFT */}

                              <Group align="flex-start">

                                <Avatar
                                  size={64}
                                  radius="xl"
                                  color="cyan"
                                >
                                  {application.applicantName?.charAt(0)}
                                </Avatar>

                                <Box>

                                  <Title
                                    order={3}
                                    style={{
                                      fontSize: '26px',
                                    }}
                                    c={
                                      darkMode
                                        ? '#f8f9fa'
                                        : '#1e293b'
                                    }
                                  >
                                    {application.applicantName}
                                  </Title>

                                  <Text
                                    mt={6}
                                    size="sm"
                                    c="#adb5bd"
                                  >
                                    Interview Scheduled
                                  </Text>

                                  <Group mt={14} gap={10}>

                                    <Badge
                                      radius="xl"
                                      variant="light"
                                      color="cyan"
                                    >
                                      Shortlisted
                                    </Badge>

                                    <Badge
                                      radius="xl"
                                      variant="light"
                                      color="blue"
                                    >
                                      Awaiting Interview
                                    </Badge>

                                  </Group>

                                </Box>

                              </Group>

                              {/* RIGHT */}

                              <Stack
                                gap={14}
                                align="stretch"
                                style={{
                                  minWidth: 260,
                                }}
                              >

                                <Badge
                                  radius="xl"
                                  size="xl"
                                  color="cyan"
                                  fullWidth
                                  style={{
                                    padding: '13px 0',
                                    fontWeight: 700,
                                    fontSize: '13px',
                                  }}
                                >
                                  SHORTLISTED
                                </Badge>

                                <Select
                                  placeholder="Update Status"

                                  data={[
                                    'HIRED',
                                    'REJECTED',
                                    'REVIEWING',
                                  ]}

                                  onChange={(value) => {

                                    if (!value) return;

                                    updateStatus(
                                      application.applicationId,
                                      value
                                    );
                                  }}

                                  styles={{

                                    input: {

                                      backgroundColor:
                                        darkMode
                                          ? '#25262b'
                                          : '#ffffff',

                                      border:
                                        '1px solid #495057',

                                      color:
                                        darkMode
                                          ? '#ffffff'
                                          : '#1e293b',

                                      borderRadius: 14,

                                      minHeight: 46,

                                      fontSize: '14px',

                                      fontWeight: 500,

                                      transition: '0.2s ease',
                                    },

                                    dropdown: {

                                      backgroundColor:
                                        darkMode
                                          ? '#2c2e33'
                                          : '#ffffff',

                                      border:
                                        '1px solid #495057',

                                      borderRadius: 14,

                                      overflow: 'hidden',
                                    },

                                    option: {

                                      backgroundColor:
                                        darkMode
                                          ? '#2c2e33'
                                          : '#ffffff',

                                      color:
                                        darkMode
                                          ? '#f8f9fa'
                                          : '#1e293b',

                                      fontSize: '14px',

                                      fontWeight: 500,

                                      padding: '12px 14px',
                                    },

                                    section: {

                                      color:
                                        darkMode
                                          ? '#adb5bd'
                                          : '#64748b',
                                    },
                                  }}
                                />

                              </Stack>

                            </Flex>

                          </Paper>
                        ))
                      }

                    </Stack>

                  </Tabs.Panel>

                  {/* HIRED */}

                  <Tabs.Panel
                    value="hired"
                    pt={28}
                  >

                    <Stack gap={22}>

                      {
                        hiredApplicants.map((application) => (

                          <Paper
                            key={application.applicationId}
                            p={28}
                            radius="2xl"
                            style={{
                              background:
                                darkMode
                                  ? 'linear-gradient(180deg, #2c2e33 0%, #26282d 100%)'
                                  : '#ffffff',

                              border:
                                '1px solid rgba(64,192,87,0.35)',

                              boxShadow:
                                '0 8px 28px rgba(0,0,0,0.18)',
                            }}
                          >

                            <Flex
                              justify="space-between"
                              align="center"
                              wrap="wrap"
                              gap={24}
                            >

                              <Group align="flex-start">

                                <Avatar
                                  size={64}
                                  radius="xl"
                                  color="green"
                                >
                                  {application.applicantName?.charAt(0)}
                                </Avatar>

                                <Box>

                                  <Title
                                    order={3}
                                    style={{
                                      fontSize: '26px',
                                    }}
                                    c={
                                      darkMode
                                        ? '#f8f9fa'
                                        : '#1e293b'
                                    }
                                  >
                                    {application.applicantName}
                                  </Title>

                                  <Text
                                    mt={6}
                                    size="sm"
                                    c="#adb5bd"
                                  >
                                    Successfully hired
                                  </Text>

                                  <Group mt={14}>

                                    <Badge
                                      radius="xl"
                                      variant="light"
                                      color="green"
                                    >
                                      Employee Joined
                                    </Badge>

                                  </Group>

                                </Box>

                              </Group>

                              <Stack
                                gap={14}
                                style={{
                                  minWidth: 260,
                                }}
                              >

                                <Badge
                                  radius="xl"
                                  size="xl"
                                  color="green"
                                  fullWidth
                                  style={{
                                    padding: '13px 0',
                                    fontWeight: 700,
                                    fontSize: '13px',
                                  }}
                                >
                                  HIRED
                                </Badge>

                                <Select
                                  placeholder="Update Status"

                                  data={[
                                    'SHORTLISTED',
                                    'REJECTED',
                                  ]}

                                  onChange={(value) => {

                                    if (!value) return;

                                    updateStatus(
                                      application.applicationId,
                                      value
                                    );
                                  }}

                                  styles={{

                                    input: {

                                      backgroundColor:
                                        darkMode
                                          ? '#25262b'
                                          : '#ffffff',

                                      border:
                                        '1px solid #495057',

                                      color:
                                        darkMode
                                          ? '#ffffff'
                                          : '#1e293b',

                                      borderRadius: 14,

                                      minHeight: 46,

                                      fontSize: '14px',

                                      fontWeight: 500,

                                      transition: '0.2s ease',
                                    },

                                    dropdown: {

                                      backgroundColor:
                                        darkMode
                                          ? '#2c2e33'
                                          : '#ffffff',

                                      border:
                                        '1px solid #495057',

                                      borderRadius: 14,

                                      overflow: 'hidden',
                                    },

                                    option: {

                                      backgroundColor:
                                        darkMode
                                          ? '#2c2e33'
                                          : '#ffffff',

                                      color:
                                        darkMode
                                          ? '#f8f9fa'
                                          : '#1e293b',

                                      fontSize: '14px',

                                      fontWeight: 500,

                                      padding: '12px 14px',
                                    },

                                    section: {

                                      color:
                                        darkMode
                                          ? '#adb5bd'
                                          : '#64748b',
                                    },
                                  }}
                                />

                              </Stack>

                            </Flex>

                          </Paper>
                        ))
                      }

                    </Stack>

                  </Tabs.Panel>

                  {/* REJECTED */}

                  <Tabs.Panel
                    value="rejected"
                    pt={28}
                  >

                    <Stack gap={22}>

                      {
                        rejectedApplicants
                          .map((application) => (

                            <Paper
                              key={application.applicationId}
                              p={28}
                              radius="2xl"
                              style={{
                                background:
                                  darkMode
                                    ? 'linear-gradient(180deg, #2c2e33 0%, #26282d 100%)'
                                    : '#ffffff',

                                border:
                                  '1px solid rgba(250,82,82,0.35)',

                                boxShadow:
                                  '0 8px 28px rgba(0,0,0,0.18)',
                              }}
                            >

                              <Flex
                                justify="space-between"
                                align="center"
                                wrap="wrap"
                                gap={24}
                              >

                                <Group align="flex-start">

                                  <Avatar
                                    size={64}
                                    radius="xl"
                                    color="red"
                                  >
                                    {application.applicantName?.charAt(0)}
                                  </Avatar>

                                  <Box>

                                    <Title
                                      order={3}
                                      style={{
                                        fontSize: '26px',
                                      }}
                                      c={
                                        darkMode
                                          ? '#f8f9fa'
                                          : '#1e293b'
                                      }
                                    >
                                      {application.applicantName}
                                    </Title>

                                    <Text
                                      mt={6}
                                      size="sm"
                                      c="#adb5bd"
                                    >
                                      Application rejected
                                    </Text>

                                    <Group mt={14}>

                                      <Badge
                                        radius="xl"
                                        variant="light"
                                        color="red"
                                      >
                                        Candidate Rejected
                                      </Badge>

                                    </Group>

                                  </Box>

                                </Group>

                                <Stack
                                  gap={14}
                                  style={{
                                    minWidth: 260,
                                  }}
                                >

                                  <Badge
                                    radius="xl"
                                    size="xl"
                                    color="red"
                                    fullWidth
                                    style={{
                                      padding: '13px 0',
                                      fontWeight: 700,
                                      fontSize: '13px',
                                    }}
                                  >
                                    REJECTED
                                  </Badge>

                                  <Select
                                    placeholder="Update Status"

                                    data={[
                                      'REVIEWING',
                                      'SHORTLISTED',
                                    ]}

                                    onChange={(value) => {

                                      if (!value) return;

                                      updateStatus(
                                        application.applicationId,
                                        value
                                      );
                                    }}

                                    styles={{

                                      input: {

                                        backgroundColor:
                                          darkMode
                                            ? '#25262b'
                                            : '#ffffff',

                                        border:
                                          '1px solid #495057',

                                        color:
                                          darkMode
                                            ? '#ffffff'
                                            : '#1e293b',

                                        borderRadius: 14,

                                        minHeight: 46,

                                        fontSize: '14px',

                                        fontWeight: 500,

                                        transition: '0.2s ease',
                                      },

                                      dropdown: {

                                        backgroundColor:
                                          darkMode
                                            ? '#2c2e33'
                                            : '#ffffff',

                                        border:
                                          '1px solid #495057',

                                        borderRadius: 14,

                                        overflow: 'hidden',
                                      },

                                      option: {

                                        backgroundColor:
                                          darkMode
                                            ? '#2c2e33'
                                            : '#ffffff',

                                        color:
                                          darkMode
                                            ? '#f8f9fa'
                                            : '#1e293b',

                                        fontSize: '14px',

                                        fontWeight: 500,

                                        padding: '12px 14px',
                                      },

                                      section: {

                                        color:
                                          darkMode
                                            ? '#adb5bd'
                                            : '#64748b',
                                      },
                                    }}
                                  />

                                </Stack>

                              </Flex>

                            </Paper>
                          ))
                      }

                    </Stack>

                  </Tabs.Panel>

                  {/* WITHDRAWN */}

                  <Tabs.Panel
                    value="withdrawn"
                    pt={28}
                  >

                    <Stack gap={22}>

                      {
                        withdrawnApplicants.map((application) => (

                          <Paper
                            key={application.applicationId}
                            p={28}
                            radius="2xl"
                            style={{
                              background:
                                darkMode
                                  ? 'linear-gradient(180deg, #2c2e33 0%, #26282d 100%)'
                                  : '#ffffff',

                              border:
                                '1px solid rgba(255,193,7,0.35)',

                              boxShadow:
                                '0 8px 28px rgba(0,0,0,0.18)',
                            }}
                          >

                            <Flex
                              justify="space-between"
                              align="center"
                              wrap="wrap"
                              gap={24}
                            >

                              {/* LEFT */}

                              <Group align="flex-start">

                                <Avatar
                                  size={64}
                                  radius="xl"
                                  color="yellow"
                                >
                                  {application.applicantName?.charAt(0)}
                                </Avatar>

                                <Box>

                                  <Title
                                    order={3}
                                    style={{
                                      fontSize: '26px',
                                    }}
                                    c={
                                      darkMode
                                        ? '#f8f9fa'
                                        : '#1e293b'
                                    }
                                  >
                                    {application.applicantName}
                                  </Title>

                                  <Text
                                    mt={6}
                                    size="sm"
                                    c="#adb5bd"
                                  >
                                    Candidate withdrew application
                                  </Text>

                                  <Group mt={14}>

                                    <Badge
                                      radius="xl"
                                      variant="light"
                                      color="yellow"
                                    >
                                      Withdrawn
                                    </Badge>

                                  </Group>

                                </Box>

                              </Group>

                              {/* RIGHT */}

                              <Stack
                                gap={14}
                                style={{
                                  minWidth: 260,
                                }}
                              >

                                <Badge
                                  radius="xl"
                                  size="xl"
                                  color="yellow"
                                  fullWidth
                                  style={{
                                    padding: '13px 0',
                                    fontWeight: 700,
                                    fontSize: '13px',
                                  }}
                                >
                                  WITHDRAWN
                                </Badge>

                              </Stack>

                            </Flex>

                          </Paper>
                        ))
                      }

                      {
                        withdrawnApplicants.length === 0 && (

                          <Paper
                            p={40}
                            radius="24px"
                            style={{
                              background:
                                darkMode
                                  ? '#2c2e33'
                                  : '#ffffff',

                              border:
                                darkMode
                                  ? '1px solid #343a40'
                                  : '1px solid #dee2e6',
                            }}
                          >

                            <Stack align="center" gap={12}>

                              <IconX
                                size={42}
                                color="#fab005"
                              />

                              <Title
                                order={3}
                                c={
                                  darkMode
                                    ? '#f8f9fa'
                                    : '#1e293b'
                                }
                              >
                                No Withdrawn Applications
                              </Title>

                              <Text c="#adb5bd">
                                Withdrawn candidates will appear here.
                              </Text>

                            </Stack>

                          </Paper>
                        )
                      }

                    </Stack>

                  </Tabs.Panel>

                </Tabs>

              </Stack>
            )
          }

        </Box>

      </Flex>

      {/* SCHEDULE INTERVIEW MODAL */}

      <Modal
        opened={scheduleModalOpened}

        onClose={() =>
          setScheduleModalOpened(false)
        }

        centered

        radius="2xl"

        title="Schedule Interview"

        styles={{

          content: {

            backgroundColor:

              darkMode
                ? '#25262b'
                : '#ffffff',
          },

          header: {

            backgroundColor:

              darkMode
                ? '#25262b'
                : '#ffffff',
          },

          title: {

            color:

              darkMode
                ? '#f8f9fa'
                : '#1e293b',

            fontWeight: 700,
          },
        }}
      >

        <Stack gap={22}>

          <TextInput
            type="datetime-local"

            value={interviewDate}

            onChange={(e) =>
              setInterviewDate(
                e.target.value
              )
            }

            styles={{
              input: {

                backgroundColor:

                  darkMode
                    ? '#2c2e33'
                    : '#ffffff',

                border:
                  '1px solid #495057',

                color:

                  darkMode
                    ? '#ffffff'
                    : '#1e293b',
              },
            }}
          />

          <Button
            radius="xl"

            color="cyan"

            onClick={() => {

              if (selectedApplication) {

                updateStatus(
                  selectedApplication.applicationId,
                  'SHORTLISTED'
                );

                setActiveTab('invited');
              }

              setScheduleModalOpened(false);
            }}
          >
            Schedule Interview
          </Button>

        </Stack>

      </Modal>
      <Modal
        opened={editModalOpened}

        onClose={() =>
          setEditModalOpened(false)
        }

        size="lg"

        centered

        title="Edit Job"

        styles={{

          content: {

            backgroundColor:

              darkMode
                ? '#25262b'
                : '#ffffff',
          },

          header: {

            backgroundColor:

              darkMode
                ? '#25262b'
                : '#ffffff',
          },

          title: {

            color:

              darkMode
                ? '#f8f9fa'
                : '#1e293b',

            fontWeight: 700,
          },
        }}
      >

        {
          editJobData && (

            <Stack gap={18}>

              <Grid>

                <Grid.Col span={6}>

                  <TextInput
                    label="Job Title"

                    value={editJobData.title}

                    onChange={(e) =>

                      setEditJobData({
                        ...editJobData,
                        title: e.target.value,
                      })
                    }

                    styles={inputStyles}
                  />

                </Grid.Col>

                <Grid.Col span={6}>

                  <TextInput
                    label="Company"

                    value={editJobData.company}

                    onChange={(e) =>

                      setEditJobData({
                        ...editJobData,
                        company: e.target.value,
                      })
                    }

                    styles={inputStyles}
                  />

                </Grid.Col>

              </Grid>

              <TextInput
                label="Location"

                value={editJobData.location}

                onChange={(e) =>

                  setEditJobData({
                    ...editJobData,
                    location: e.target.value,
                  })
                }

                styles={inputStyles}
              />

              <Grid>

                <Grid.Col span={6}>

                  <NumberInput
                    label="Minimum Salary"

                    value={editJobData.minSalary}

                    onChange={(value) =>

                      setEditJobData({
                        ...editJobData,
                        minSalary: value,
                      })
                    }

                    styles={inputStyles}
                  />

                </Grid.Col>

                <Grid.Col span={6}>

                  <NumberInput
                    label="Maximum Salary"

                    value={editJobData.maxSalary}

                    onChange={(value) =>

                      setEditJobData({
                        ...editJobData,
                        maxSalary: value,
                      })
                    }

                    styles={inputStyles}
                  />

                </Grid.Col>

              </Grid>

              <Grid>

                <Grid.Col span={4}>

                  <Select
                    label="Experience Level"

                    value={editJobData.experienceLevel}

                    onChange={(value) =>

                      setEditJobData({
                        ...editJobData,
                        experienceLevel: value,
                      })
                    }

                    data={[
                      'FRESHER',
                      'JUNIOR',
                      'MID_LEVEL',
                      'SENIOR',
                    ]}

                    styles={inputStyles}
                  />

                </Grid.Col>

                <Grid.Col span={4}>

                  <Select
                    label="Employment Type"

                    value={editJobData.employmentType}

                    onChange={(value) =>

                      setEditJobData({
                        ...editJobData,
                        employmentType: value,
                      })
                    }

                    data={[
                      'FULL_TIME',
                      'PART_TIME',
                      'INTERNSHIP',
                      'CONTRACT',
                    ]}

                    styles={inputStyles}
                  />

                </Grid.Col>

                <Grid.Col span={4}>

                  <Select
                    label="Work Mode"

                    value={editJobData.workMode}

                    onChange={(value) =>

                      setEditJobData({
                        ...editJobData,
                        workMode: value,
                      })
                    }

                    data={[
                      'REMOTE',
                      'HYBRID',
                      'ONSITE',
                    ]}

                    styles={inputStyles}
                  />

                </Grid.Col>

              </Grid>

              <MultiSelect
                label="Skills Required"

                searchable

                value={editJobData.skillsRequired || []}

                onChange={(value) =>

                  setEditJobData({
                    ...editJobData,
                    skillsRequired: value,
                  })
                }

                data={[
                  'Java',
                  'Spring Boot',
                  'React',
                  'TypeScript',
                  'JavaScript',
                  'Node.js',
                  'Express.js',
                  'MySQL',
                  'MongoDB',
                  'AWS',
                  'Docker',
                  'Kubernetes',
                  'Hibernate',
                  'REST API',
                  'JWT',
                  'Tailwind CSS',
                  'Redux',
                  'Git',
                  'GitHub',
                  'CI/CD',
                ]}

                styles={inputStyles}
              />

              <Textarea
                label="Description"

                minRows={6}

                value={editJobData.description}

                onChange={(e) =>

                  setEditJobData({
                    ...editJobData,
                    description: e.target.value,
                  })
                }

                styles={inputStyles}
              />

              <Textarea
                label="Requirements"

                minRows={5}

                value={editJobData.requirements}

                onChange={(e) =>

                  setEditJobData({
                    ...editJobData,
                    requirements: e.target.value,
                  })
                }

                styles={inputStyles}
              />

              <Button
                radius="xl"

                color="cyan"

                size="md"

                mt={10}

                onClick={updateJob}
              >
                Save Changes
              </Button>

            </Stack>
          )
        }

      </Modal>

    </Box>
  );
}

export default PostedJobsPage;
