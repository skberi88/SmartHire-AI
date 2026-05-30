import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Card,
    Divider,
    Drawer,
    Flex,
    Grid,
    Group,
    MultiSelect,
    Paper,
    RangeSlider,
    Stack,
    Text,
    TextInput,
    Title,
} from '@mantine/core';

import {
    IconBookmark,
    IconBriefcase,
    IconBuilding,
    IconClock,
    IconMapPin,
    IconSearch,
} from '@tabler/icons-react';

import { useEffect, useState } from 'react';

import Header from '../components/Header';

import { useTheme } from '../context/ThemeContext';

import { useNavigate } from 'react-router-dom';

function FindJobsPage() {
    const { darkMode } = useTheme();

    const [jobs, setJobs] = useState<any[]>([]);

    const [selectedJob, setSelectedJob] = useState<any>(null);

    const [opened, setOpened] = useState(false);

    const [search, setSearch] = useState('');

    const [location, setLocation] = useState('');

    const [salaryRange, setSalaryRange] = useState<[number, number]>([300000, 5000000,]);

    const [experienceLevels, setExperienceLevels] = useState<string[]>([]);

    const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);

    const [workModes, setWorkModes] = useState<string[]>([]);

    useEffect(() => { fetchJobs(); }, []);

    const navigate = useNavigate();

    const fetchJobs =
        async () => {
            try {
                const response = await fetch(
                    'http://localhost:8080/api/jobs', {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem('token')}`,
                    },
                }
                );

                const data =
                    await response.json();

                setJobs(data);

            }

            catch (error) {

                console.log(error);
            }
        };

    const [detailModalOpened, setDetailModalOpened] = useState(false);

    const [expandedJob, setExpandedJob] = useState<any>(null);

    const filteredJobs =
        jobs.filter((job) => {

            const matchesSearch =

                job.title
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                job.company
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesLocation =

                location === ''

                ||

                job.location
                    ?.toLowerCase()
                    .includes(
                        location.toLowerCase()
                    );

            const matchesSalary =

                job.maxSalary >= salaryRange[0]

                &&

                job.minSalary <= salaryRange[1];

            const matchesExperience =

                experienceLevels.length === 0

                ||

                experienceLevels.includes(
                    job.experienceLevel
                );

            const matchesEmployment =

                employmentTypes.length === 0

                ||

                employmentTypes.includes(
                    job.employmentType
                );

            const matchesWorkMode =

                workModes.length === 0

                ||

                workModes.includes(
                    job.workMode
                );

            return (

                matchesSearch

                &&

                matchesLocation

                &&

                matchesSalary

                &&

                matchesExperience

                &&

                matchesEmployment

                &&

                matchesWorkMode

            );
        });

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

            <Box
                style={{
                    display: 'flex',

                    minHeight: 'calc(100vh - 82px)',
                }}
            >

                <Flex
                    align="flex-start"

                    gap={0}

                    style={{
                        width: '100%',
                    }}
                >

                    {/* FILTER SIDEBAR */}

                    <Box
                        w={300}

                        style={{

                            position: 'sticky',

                            top: 82,

                            height: 'fit-content',

                            minHeight: 'unset',

                            borderRight:

                                darkMode
                                    ? '1px solid #34363c'
                                    : '1px solid #dee2e6',

                            backgroundColor:

                                darkMode
                                    ? '#202123'
                                    : '#ffffff',

                            padding: '22px 20px',

                            overflow: 'hidden',

                            flexShrink: 0,
                        }}
                    >

                        <Stack gap={18}>

                            <Title
                                order={2}

                                c={
                                    darkMode
                                        ? '#f8f9fa'
                                        : '#1e293b'
                                }
                            >
                                Filters
                            </Title>

                            {/* SEARCH */}

                            <TextInput
                                placeholder="Search jobs by title"

                                value={search}

                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }

                                leftSection={
                                    <IconSearch size={18} />
                                }

                                styles={{

                                    input: {

                                        height: 46,

                                        borderRadius: 14,

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

                            {/* LOCATION */}

                            <TextInput
                                placeholder="Location"

                                value={location}

                                onChange={(e) =>
                                    setLocation(
                                        e.target.value
                                    )
                                }

                                leftSection={
                                    <IconMapPin size={18} />
                                }

                                styles={{

                                    input: {

                                        height: 46,

                                        borderRadius: 14,

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

                            {/* SALARY */}

                            <Box>

                                <Text
                                    fw={700}

                                    mb={8}

                                    size="15px"

                                    c="#f8f9fa"
                                >
                                    Salary Range
                                </Text>

                                <RangeSlider
                                    min={300000}

                                    max={5000000}

                                    step={100000}

                                    value={salaryRange}

                                    onChange={
                                        setSalaryRange
                                    }

                                    color="cyan"
                                />

                                <Flex
                                    justify="space-between"

                                    mt={8}
                                >

                                    <Text
                                        size="sm"

                                        c="#ced4da"
                                    >
                                        ₹{salaryRange[0]}
                                    </Text>

                                    <Text
                                        size="sm"

                                        c="#ced4da"
                                    >
                                        ₹{salaryRange[1]}
                                    </Text>

                                </Flex>

                            </Box>

                            {/* EXPERIENCE */}

                            <MultiSelect
                                label="Experience"

                                value={experienceLevels}

                                onChange={
                                    setExperienceLevels
                                }

                                placeholder="Select experience"

                                data={[
                                    'FRESHER',
                                    'JUNIOR',
                                    'MID_LEVEL',
                                    'SENIOR',
                                ]}

                                styles={{

                                    label: {

                                        color: '#f8f9fa',

                                        marginBottom: 8,

                                        fontWeight: 600,
                                    },

                                    input: {

                                        backgroundColor:
                                            '#2a2b2f',

                                        border:
                                            '1px solid #3d4046',

                                        color:
                                            '#f8f9fa',

                                        borderRadius: 14,

                                        minHeight: 46,
                                    },

                                    dropdown: {

                                        backgroundColor:
                                            '#2a2b2f',

                                        border:
                                            '1px solid #3d4046',
                                    },

                                    option: {

                                        color: '#f8f9fa',

                                        backgroundColor: '#2a2b2f',
                                    },

                                }}

                                comboboxProps={{
                                    withinPortal: false,
                                }}
                            />

                            {/* EMPLOYMENT */}

                            <MultiSelect
                                label="Employment"

                                value={employmentTypes}

                                onChange={
                                    setEmploymentTypes
                                }

                                placeholder="Select employment"

                                data={[
                                    'FULL_TIME',
                                    'PART_TIME',
                                    'INTERNSHIP',
                                    'CONTRACT',
                                ]}

                                styles={{

                                    label: {

                                        color: '#f8f9fa',

                                        marginBottom: 8,

                                        fontWeight: 600,
                                    },

                                    input: {

                                        backgroundColor:
                                            '#2a2b2f',

                                        border:
                                            '1px solid #3d4046',

                                        color:
                                            '#f8f9fa',

                                        borderRadius: 14,

                                        minHeight: 46,
                                    },

                                    dropdown: {

                                        backgroundColor:
                                            '#2a2b2f',

                                        border:
                                            '1px solid #3d4046',
                                    },

                                    option: {

                                        color: '#f8f9fa',

                                        backgroundColor: '#2a2b2f',
                                    },

                                }}

                                comboboxProps={{
                                    withinPortal: false,
                                }}
                            />

                            {/* WORK MODE */}

                            <MultiSelect
                                label="Work Mode"

                                value={workModes}

                                onChange={
                                    setWorkModes
                                }

                                placeholder="Select work mode"

                                data={[
                                    'REMOTE',
                                    'HYBRID',
                                    'ONSITE',
                                ]}

                                styles={{

                                    label: {

                                        color: '#f8f9fa',

                                        marginBottom: 8,

                                        fontWeight: 600,
                                    },

                                    input: {

                                        backgroundColor:
                                            '#2a2b2f',

                                        border:
                                            '1px solid #3d4046',

                                        color:
                                            '#f8f9fa',

                                        borderRadius: 14,

                                        minHeight: 46,
                                    },

                                    dropdown: {

                                        backgroundColor:
                                            '#2a2b2f',

                                        border:
                                            '1px solid #3d4046',
                                    },

                                    option: {

                                        color: '#f8f9fa',

                                        backgroundColor: '#2a2b2f',
                                    },

                                }}

                                comboboxProps={{
                                    withinPortal: false,
                                }}
                            />

                        </Stack>

                    </Box>

                    {/* JOBS */}

                    <Box
                        style={{

                            flex: 1,

                            padding: 30,

                            minWidth: 0,
                        }}
                    >

                        <Grid>

                            {

                                filteredJobs.map((job) => (

                                    <Grid.Col
                                        key={job.id}

                                        span={{
                                            base: 12,
                                            sm: 6,
                                            lg: 4,
                                        }}
                                    >

                                        <Card

                                            radius="26px"

                                            p={22}

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

                                                backgroundColor:

                                                    darkMode
                                                        ? '#2f3136'
                                                        : '#ffffff',

                                                border:

                                                    darkMode
                                                        ? '1px solid #3b3d44'
                                                        : '1px solid #dee2e6',

                                                transition: '0.25s ease',

                                                cursor: 'pointer',

                                                minHeight: 385,

                                                display: 'flex',

                                                flexDirection: 'column',

                                                justifyContent: 'space-between',

                                                overflow: 'hidden',
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
                                                                size={30}
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
                                                                fw={750}

                                                                size="22px"

                                                                c={
                                                                    darkMode
                                                                        ? '#f8f9fa'
                                                                        : '#1e293b'
                                                                }

                                                                style={{
                                                                    lineHeight: 1.15,
                                                                }}
                                                            >
                                                                {job.title}
                                                            </Text>

                                                            <Text
                                                                mt={6}

                                                                size="15px"

                                                                c="#adb5bd"
                                                            >
                                                                {job.company}
                                                                • {job.noOfApplicants || 0} Applicants
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
                                                        {
                                                            job.experienceLevel
                                                                ?.replace('_', ' ')
                                                        }
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
                                                        {
                                                            job.employmentType
                                                                ?.replace('_', ' ')
                                                        }
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
                                                        {job.location}
                                                    </Badge>

                                                </Group>

                                                {/* DESCRIPTION */}

                                                <Box mt={22}>

                                                    <Text
                                                        size="14px"

                                                        c={
                                                            darkMode
                                                                ? '#d1d5db'
                                                                : '#475569'
                                                        }

                                                        style={{
                                                            lineHeight: 1.75,
                                                        }}
                                                    >

                                                        {
                                                            job.description?.length > 120

                                                                ? `${job.description.slice(0, 120)}... `

                                                                : `${job.description} `
                                                        }

                                                        <Text
                                                            component="span"

                                                            fw={700}

                                                            c="#10b1cf"

                                                            style={{
                                                                cursor: 'pointer',
                                                            }}

                                                            onClick={() => {

                                                                setExpandedJob(job);

                                                                setDetailModalOpened(true);
                                                            }}
                                                        >
                                                            see more
                                                        </Text>

                                                    </Text>

                                                </Box>

                                                {/* REQUIREMENTS */}

                                                <Box mt={18}>

                                                    <Text
                                                        size="14px"

                                                        fw={700}

                                                        mb={8}

                                                        c="#10b1cf"
                                                    >
                                                        Requirements
                                                    </Text>

                                                    <Text
                                                        size="14px"

                                                        c={
                                                            darkMode
                                                                ? '#9ca3af'
                                                                : '#64748b'
                                                        }

                                                        style={{
                                                            lineHeight: 1.7,
                                                        }}
                                                    >

                                                        {
                                                            job.requirements?.length > 110

                                                                ? `${job.requirements.slice(0, 110)}... `

                                                                : `${job.requirements} `
                                                        }

                                                        <Text
                                                            component="span"

                                                            fw={700}

                                                            c="#10b1cf"

                                                            style={{
                                                                cursor: 'pointer',
                                                            }}

                                                            onClick={() => {

                                                                setExpandedJob(job);

                                                                setDetailModalOpened(true);
                                                            }}
                                                        >
                                                            see more
                                                        </Text>

                                                    </Text>

                                                </Box>

                                            </Box>

                                            {/* BOTTOM */}

                                            <Box mt={18} pt={14}>

                                                <Divider
                                                    mb={14}

                                                    color={
                                                        darkMode
                                                            ? '#45474d'
                                                            : '#dee2e6'
                                                    }
                                                />

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
                                                                    job.minSalary / 100000
                                                                ).toFixed(0)
                                                            }

                                                            L - ₹

                                                            {
                                                                (
                                                                    job.maxSalary / 100000
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
                                                                {formatAppliedDate(job.postedAt)}
                                                            </Text>

                                                        </Group>

                                                    </Box>

                                                    {/* BUTTON */}

                                                    <Button
                                                        radius="xl"

                                                        size="md"

                                                        style={{

                                                            background:
                                                                'linear-gradient(135deg, #103c46, #0f4c5a)',

                                                            color: '#10b1cf',

                                                            fontWeight: 700,

                                                            minWidth: 118,

                                                            height: 44,

                                                            border:
                                                                '1px solid rgba(16,177,207,0.18)',

                                                            transition: '0.2s ease',
                                                        }}

                                                        onMouseEnter={(e) => {

                                                            e.currentTarget.style.transform =
                                                                'scale(1.04)';
                                                        }}

                                                        onMouseLeave={(e) => {

                                                            e.currentTarget.style.transform =
                                                                'scale(1)';
                                                        }}

                                                        onClick={() => {

                                                            setSelectedJob(job);

                                                            setOpened(true);
                                                        }}
                                                    >
                                                        View Job
                                                    </Button>

                                                </Flex>

                                            </Box>

                                        </Card>
                                    </Grid.Col>
                                ))
                            }

                        </Grid>

                    </Box>

                </Flex>

            </Box>

            {/* JOB DETAIL DRAWER */}

            <Drawer
                opened={detailModalOpened}

                onClose={() =>
                    setDetailModalOpened(false)
                }

                position="right"

                size="40%"

                padding="xl"

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

                        borderBottom:
                            '1px solid #343a40',
                    },

                    body: {
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

                        fontSize: '26px',

                        fontWeight: 700,
                    },
                }}

                title={expandedJob?.title}
            >

                {
                    expandedJob && (

                        <Stack gap={24}>

                            <Box>

                                <Text
                                    fw={700}

                                    size="lg"

                                    mb={10}

                                    c="#10b1cf"
                                >
                                    Job Description
                                </Text>

                                <Text
                                    c={
                                        darkMode
                                            ? '#ced4da'
                                            : '#475569'
                                    }

                                    style={{
                                        lineHeight: 1.9,
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    {expandedJob.description}
                                </Text>

                            </Box>

                            <Divider color="#343a40" />

                            <Box>

                                <Text
                                    fw={700}

                                    size="lg"

                                    mb={10}

                                    c="#10b1cf"
                                >
                                    Requirements
                                </Text>

                                <Text
                                    c={
                                        darkMode
                                            ? '#ced4da'
                                            : '#475569'
                                    }

                                    style={{
                                        lineHeight: 1.9,
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    {expandedJob.requirements}
                                </Text>

                            </Box>

                        </Stack>
                    )
                }

            </Drawer>

            <Drawer
                opened={opened}

                onClose={() =>
                    setOpened(false)
                }

                position="right"

                size="42%"

                padding="xl"

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

                        borderBottom:

                            darkMode
                                ? '1px solid #343a40'
                                : '1px solid #dee2e6',
                    },

                    body: {

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

                        fontSize: '28px',

                        fontWeight: 700,
                    },

                    close: {

                        color:

                            darkMode
                                ? '#f8f9fa'
                                : '#1e293b',
                    },
                }}

                title={
                    selectedJob?.title
                }
            >

                {
                    selectedJob && (

                        <Stack gap={28}>

                            {/* TOP */}

                            <Flex
                                justify="space-between"
                                align="flex-start"
                            >

                                <Box>

                                    {/* <Text
                                        size="28px"

                                        fw={700}

                                        c={
                                            darkMode
                                                ? '#f8f9fa'
                                                : '#1e293b'
                                        }
                                    >
                                        {selectedJob.title}
                                    </Text> */}

                                    <Text
                                        mt={4}

                                        size="lg"

                                        fw={500}

                                        c="#10b1cf"
                                    >
                                        {selectedJob.company}
                                    </Text>

                                    <Group
                                        mt={14}
                                        gap={18}
                                    >

                                        <Group gap={6}>

                                            <IconMapPin
                                                size={16}
                                                color="#adb5bd"
                                            />

                                            <Text
                                                size="sm"

                                                c="#adb5bd"
                                            >
                                                {selectedJob.location}
                                            </Text>

                                        </Group>

                                        <Group gap={6}>

                                            <IconBriefcase
                                                size={16}
                                                color="#adb5bd"
                                            />

                                            <Text
                                                size="sm"

                                                c="#adb5bd"
                                            >
                                                {
                                                    selectedJob
                                                        .employmentType
                                                }
                                            </Text>

                                        </Group>

                                    </Group>

                                </Box>

                                <ActionIcon
                                    variant="light"

                                    color="cyan"

                                    radius="xl"

                                    size="lg"
                                >

                                    <IconBookmark
                                        size={22}
                                    />

                                </ActionIcon>

                            </Flex>

                            {/* SALARY */}

                            <Paper
                                p={20}

                                radius="xl"

                                style={{

                                    backgroundColor:

                                        darkMode
                                            ? '#2c2e33'
                                            : '#f8f9fa',
                                }}
                            >

                                <Text
                                    size="sm"

                                    c="#adb5bd"
                                >
                                    Salary Range
                                </Text>

                                <Text
                                    mt={4}

                                    fw={700}

                                    size="32px"

                                    c={
                                        darkMode
                                            ? '#f8f9fa'
                                            : '#1e293b'
                                    }
                                >
                                    ₹{selectedJob.minSalary}
                                    {' - '}
                                    ₹{selectedJob.maxSalary}
                                </Text>

                            </Paper>

                            {/* SKILLS */}

                            <Box>

                                <Text
                                    fw={700}

                                    mb={12}

                                    c={
                                        darkMode
                                            ? '#f8f9fa'
                                            : '#1e293b'
                                    }
                                >
                                    Skills Required
                                </Text>

                                <Group>

                                    {
                                        selectedJob.skillsRequired
                                            ?.map((skill: string) => (

                                                <Badge
                                                    key={skill}

                                                    radius="xl"

                                                    size="lg"

                                                    color="cyan"

                                                    variant="light"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))
                                    }

                                </Group>

                            </Box>

                            <Divider color="#343a40" />

                            {/* DESCRIPTION */}

                            <Box>

                                <Title
                                    style={{
                                        fontSize: '28px',
                                    }}

                                    mb={12}

                                    c={
                                        darkMode
                                            ? '#f8f9fa'
                                            : '#1e293b'
                                    }
                                >
                                    Job Description
                                </Title>

                                <Text
                                    style={{
                                        whiteSpace:
                                            'pre-wrap',

                                        lineHeight: 1.8,
                                    }}

                                    c={
                                        darkMode
                                            ? '#ced4da'
                                            : '#475569'
                                    }
                                >
                                    {
                                        selectedJob.description
                                    }
                                </Text>

                            </Box>

                            <Divider color="#343a40" />

                            {/* REQUIREMENTS */}

                            <Box>

                                <Title
                                    order={3}

                                    mb={12}

                                    c={
                                        darkMode
                                            ? '#f8f9fa'
                                            : '#1e293b'
                                    }
                                >
                                    Requirements
                                </Title>

                                <Text
                                    style={{
                                        whiteSpace:
                                            'pre-wrap',

                                        lineHeight: 1.8,
                                    }}

                                    c={
                                        darkMode
                                            ? '#ced4da'
                                            : '#475569'
                                    }
                                >
                                    {
                                        selectedJob.requirements
                                    }
                                </Text>

                            </Box>

                            <Divider color="#343a40" />

                            {/* COMPANY */}

                            <Paper
                                p={24}

                                radius="xl"

                                style={{

                                    backgroundColor:

                                        darkMode
                                            ? '#2c2e33'
                                            : '#f8f9fa',
                                }}
                            >

                                <Group
                                    justify="space-between"
                                >

                                    <Box>

                                        <Text
                                            fw={700}

                                            size="xl"

                                            c={
                                                darkMode
                                                    ? '#f8f9fa'
                                                    : '#1e293b'
                                            }
                                        >
                                            {selectedJob.company}
                                        </Text>

                                        <Text
                                            mt={8}

                                            c="#adb5bd"
                                        >
                                            Hiring through SmartHire AI
                                        </Text>

                                    </Box>

                                    <Button
                                        radius="xl"

                                        style={{
                                            backgroundColor:
                                                '#10b1cf',
                                        }}
                                    >
                                        Company Page
                                    </Button>

                                </Group>

                            </Paper>

                            <Button
                                size="lg"

                                radius="xl"

                                fullWidth

                                component="a"

                                href={`/apply-job/${selectedJob?.id}`}

                                style={{
                                    backgroundColor:
                                        '#10b1cf',
                                }}
                            >
                                Apply Now
                            </Button>

                        </Stack>
                    )
                }

            </Drawer>

        </Box>
    );
}

export default FindJobsPage;