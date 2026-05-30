import {
    ActionIcon,
    Avatar,
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
    ScrollArea,
    Stack,
    Text,
    TextInput,
    Title,
} from '@mantine/core';

import {
    IconBookmark,
    IconBriefcase,
    IconMapPin,
    IconMessageCircle,
    IconSearch,
    IconStarFilled,
    IconUser,
    IconCertificate,
    IconBriefcase2,
    IconBuilding,
    IconBuildingBridge,
    IconBuildingBridge2,
    IconBuildingSkyscraper,
    IconSparkles,
    IconSparklesFilled,
} from '@tabler/icons-react';

import { useEffect, useState } from 'react';

import Header from '../components/Header';

import { useTheme } from '../context/ThemeContext';

function FindTalentPage() {

    const { darkMode } = useTheme();

    const [talents, setTalents] =
        useState<any[]>([]);

    const [selectedTalent, setSelectedTalent] =
        useState<any>(null);

    const [opened, setOpened] =
        useState(false);

    const [detailOpened, setDetailOpened] =
        useState(false);

    const [detailTalent, setDetailTalent] =
        useState<any>(null);

    const [search, setSearch] =
        useState('');

    const [location, setLocation] =
        useState('');

    const [experienceRange,
        setExperienceRange] =
        useState<[number, number]>([0, 15]);

    const [skills, setSkills] =
        useState<string[]>([]);

    const [experiences, setExperiences] =
        useState<any[]>([]);

    const [certifications, setCertifications] =
        useState<any[]>([]);

    useEffect(() => {

        fetchTalents();

    }, []);


    const fetchTalents = async () => {

        try {

            const response = await fetch(
                'http://localhost:8080/api/profile/all',
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (!response.ok) {

                console.log(
                    'Failed:',
                    response.status
                );

                return;
            }

            const data = await response.json();

            setTalents(data);

        }

        catch (error) {

            console.log(error);
        }
    };

    const openProfile =
        async (applicant: any) => {

            setSelectedTalent(applicant);

            setOpened(true);

            try {

                const expResponse =
                    await fetch(
                        `http://localhost:8080/api/profile/${applicant.id}/experience`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    );

                const certResponse =
                    await fetch(
                        `http://localhost:8080/api/profile/${applicant.id}/certifications`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    );

                const expData =
                    await expResponse.json();

                const certData =
                    await certResponse.json();

                setExperiences(expData);

                setCertifications(certData);

            }

            catch (error) {

                console.log(error);
            }
        };

    const filteredTalents =
        talents.filter((talent) => {

            const matchesSearch =

                talent.fullName
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

                ||

                talent.jobTitle
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesLocation =

                location === ''

                ||

                talent.location
                    ?.toLowerCase()
                    .includes(location.toLowerCase());

            const matchesExperience =

                talent.experienceYears >=
                experienceRange[0]

                &&

                talent.experienceYears <=
                experienceRange[1];

            const matchesSkills =

                skills.length === 0

                ||

                skills.every((skill) =>

                    talent.skills?.includes(skill)
                );

            return (

                matchesSearch

                &&

                matchesLocation

                &&

                matchesExperience

                &&

                matchesSkills
            );
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

            <Flex
                align="flex-start"

                gap={0}

                style={{
                    minHeight: 'calc(100vh - 82px)',
                }}
            >

                {/* SIDEBAR */}

                <Box
                    w={300}

                    style={{

                        position: 'sticky',

                        top: 82,

                        borderRight:

                            darkMode
                                ? '1px solid #34363c'
                                : '1px solid #dee2e6',

                        backgroundColor:

                            darkMode
                                ? '#202123'
                                : '#ffffff',

                        padding: '22px 20px',

                        height: 'calc(100vh - 82px)',

                        overflow: 'hidden',
                    }}
                >

                    <Stack gap={20}>

                        <Title
                            order={2}

                            c={
                                darkMode
                                    ? '#f8f9fa'
                                    : '#1e293b'
                            }
                        >
                            Find Talent
                        </Title>

                        {/* SEARCH */}

                        <TextInput
                            placeholder="Search applicants"

                            value={search}

                            onChange={(e) =>
                                setSearch(e.target.value)
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
                                setLocation(e.target.value)
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
                                },

                                section: {
                                    color: '#10b1cf',
                                },
                            }}
                        />

                        {/* EXPERIENCE */}

                        <Box>

                            <Text
                                fw={700}

                                mb={8}

                                size="14px"

                                c="#f8f9fa"
                            >
                                Experience
                            </Text>

                            <RangeSlider
                                min={0}

                                max={15}

                                step={1}

                                value={experienceRange}

                                onChange={
                                    setExperienceRange
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
                                    {experienceRange[0]} yrs
                                </Text>

                                <Text
                                    size="sm"

                                    c="#ced4da"
                                >
                                    {experienceRange[1]} yrs
                                </Text>

                            </Flex>

                        </Box>

                        {/* SKILLS */}

                        <MultiSelect
                            label="Skills"

                            value={skills}

                            onChange={setSkills}

                            placeholder="Select skills"

                            data={[
                                'Java',
                                'Spring Boot',
                                'React',
                                'MySQL',
                                'REST API',
                                'Docker',
                                'AWS',
                            ]}

                            styles={{

                                label: {

                                    color: '#f8f9fa',

                                    marginBottom: 8,
                                },

                                input: {

                                    backgroundColor:
                                        '#2a2b2f',

                                    border:
                                        '1px solid #3d4046',

                                    color:
                                        '#f8f9fa',

                                    borderRadius: 14,
                                },

                                dropdown: {

                                    backgroundColor:
                                        '#2a2b2f',

                                    border:
                                        '1px solid #3d4046',
                                },

                                option: {

                                    color: '#f8f9fa',

                                    backgroundColor:
                                        '#2a2b2f',
                                },
                            }}

                            comboboxProps={{
                                withinPortal: false,
                            }}
                        />

                    </Stack>

                </Box>

                {/* TALENT GRID */}

                <Box
                    style={{
                        flex: 1,
                        padding: 30,
                    }}
                >

                    <Grid>

                        {
                            filteredTalents.map((talent) => (

                                <Grid.Col
                                    key={talent.id}

                                    span={{
                                        base: 12,
                                        sm: 6,
                                        lg: 4,
                                    }}
                                >

                                    <Card
                                        radius="28px"

                                        p={24}

                                        style={{

                                            background:
                                                darkMode
                                                    ? 'linear-gradient(180deg,#2d2f35,#2a2c32)'
                                                    : '#ffffff',

                                            border:

                                                darkMode
                                                    ? '1px solid rgba(255,255,255,0.06)'
                                                    : '1px solid #dee2e6',

                                            minHeight: 420,
                                            paddingBottom: 20,

                                            display: 'flex',

                                            flexDirection: 'column',

                                            justifyContent: 'space-between',

                                            transition: 'all 0.28s ease',

                                            overflow: 'hidden',

                                            position: 'relative',

                                            boxShadow:
                                                darkMode
                                                    ? '0 10px 30px rgba(0,0,0,0.22)'
                                                    : '0 8px 24px rgba(0,0,0,0.06)',
                                        }}

                                        onMouseEnter={(e) => {

                                            e.currentTarget.style.transform =
                                                'translateY(-8px)';

                                            e.currentTarget.style.border =
                                                '1px solid rgba(16,177,207,0.35)';

                                            e.currentTarget.style.boxShadow =
                                                '0 18px 40px rgba(0,0,0,0.32)';
                                        }}

                                        onMouseLeave={(e) => {

                                            e.currentTarget.style.transform =
                                                'translateY(0px)';

                                            e.currentTarget.style.border =

                                                darkMode
                                                    ? '1px solid rgba(255,255,255,0.06)'
                                                    : '1px solid #dee2e6';

                                            e.currentTarget.style.boxShadow =

                                                darkMode
                                                    ? '0 10px 30px rgba(0,0,0,0.22)'
                                                    : '0 8px 24px rgba(0,0,0,0.06)';
                                        }}
                                    >

                                        {/* TOP SECTION */}

                                        <Box>

                                            <Flex
                                                justify="space-between"
                                                align="flex-start"
                                            >

                                                <Group
                                                    align="flex-start"
                                                    gap={16}
                                                >

                                                    {/* AVATAR */}

                                                    <Avatar
                                                        size={68}

                                                        radius="24px"

                                                        style={{

                                                            background:
                                                                'linear-gradient(135deg,#dffcff,#b7edf5)',

                                                            color: '#046b80',

                                                            fontWeight: 800,

                                                            fontSize: 30,

                                                            boxShadow:
                                                                '0 8px 18px rgba(0,0,0,0.16)',
                                                        }}
                                                    >
                                                        {
                                                            talent.fullName
                                                                ?.charAt(0)
                                                        }
                                                    </Avatar>

                                                    {/* DETAILS */}

                                                    <Box>

                                                        <Text
                                                            fw={800}

                                                            size="25px"

                                                            c={
                                                                darkMode
                                                                    ? '#f8f9fa'
                                                                    : '#1e293b'
                                                            }

                                                            style={{
                                                                lineHeight: 1.1,
                                                            }}
                                                        >
                                                            {talent.fullName}
                                                        </Text>

                                                        {/* JOB TITLE */}

                                                        <Group
                                                            gap={6}
                                                            mt={8}
                                                        >

                                                            <IconBriefcase
                                                                size={15}
                                                                color="#10b1cf"
                                                            />

                                                            <Text
                                                                size="16px"

                                                                fw={600}

                                                                c="#10b1cf"
                                                            >
                                                                {talent.jobTitle}
                                                            </Text>

                                                        </Group>

                                                        {/* COMPANY */}

                                                        <Text
                                                            mt={4}

                                                            size="14px"

                                                            c="#9ca3af"
                                                        >
                                                            {talent.company}
                                                        </Text>

                                                        <Group mt={8} gap={6}>

                                                            <IconSparkles
                                                                size={14}
                                                                color="#facc15"
                                                            />

                                                            <Text
                                                                size="12px"
                                                                fw={600}
                                                                c="#facc15"
                                                            >
                                                                Top Talent
                                                            </Text>

                                                        </Group>

                                                    </Box>

                                                </Group>

                                                {/* SAVE */}

                                                <ActionIcon
                                                    radius="xl"

                                                    variant="subtle"

                                                    color="cyan"

                                                    size="lg"
                                                >

                                                    <IconBookmark
                                                        size={22}
                                                        stroke={1.8}
                                                    />

                                                </ActionIcon>

                                            </Flex>

                                            {/* EXPERIENCE + LOCATION */}

                                            <Group
                                                mt={22}

                                                gap={10}
                                            >

                                                <Badge
                                                    radius="xl"

                                                    size="lg"

                                                    leftSection={
                                                        <IconBriefcase
                                                            size={12}
                                                        />
                                                    }

                                                    styles={{

                                                        root: {

                                                            background:
                                                                'linear-gradient(135deg,#10b1cf,#0ea5c6)',

                                                            color: 'white',

                                                            border: 'none',

                                                            paddingInline: 14,

                                                            height: 34,
                                                        },
                                                    }}
                                                >
                                                    {talent.experienceYears}
                                                    {' YEARS'}
                                                </Badge>

                                                <Badge
                                                    radius="xl"

                                                    size="lg"

                                                    leftSection={
                                                        <IconMapPin
                                                            size={12}
                                                        />
                                                    }

                                                    styles={{

                                                        root: {

                                                            background:
                                                                'linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))',

                                                            backdropFilter:
                                                                'blur(10px)',

                                                            border:
                                                                '1px solid rgba(255,255,255,0.08)',

                                                            color:
                                                                darkMode
                                                                    ? '#dffcff'
                                                                    : '#1e293b',

                                                            paddingInline: 14,

                                                            height: 34,
                                                        },
                                                    }}
                                                >
                                                    {talent.location}
                                                </Badge>

                                            </Group>

                                            {/* ABOUT */}

                                            <Box mt={24}>

                                                <Text
                                                    size="15px"

                                                    c={
                                                        darkMode
                                                            ? '#d1d5db'
                                                            : '#475569'
                                                    }

                                                    style={{
                                                        lineHeight: 1.85,

                                                        minHeight: 74,

                                                        display: '-webkit-box',

                                                        WebkitLineClamp: 3,

                                                        WebkitBoxOrient: 'vertical',

                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {talent.about}
                                                </Text>

                                                {
                                                    talent.about?.length > 120 && (

                                                        <Text
                                                            mt={10}

                                                            fw={700}

                                                            size="14px"

                                                            c="#10b1cf"

                                                            style={{
                                                                cursor: 'pointer',

                                                                width: 'fit-content',
                                                            }}

                                                            onClick={() => {

                                                                setDetailTalent(talent);

                                                                setDetailOpened(true);
                                                            }}
                                                        >
                                                            See more
                                                        </Text>
                                                    )
                                                }

                                            </Box>

                                            {/* SKILLS */}

                                            <Box mt={22}>

                                                <Group gap={10}>

                                                    {
                                                        talent.skills
                                                            ?.slice(0, 3)
                                                            .map((skill: string) => (

                                                                <Badge
                                                                    key={skill}

                                                                    radius="xl"

                                                                    variant="transparent"

                                                                    styles={{

                                                                        root: {

                                                                            background:
                                                                                'rgba(255,255,255,0.07)',

                                                                            backdropFilter:
                                                                                'blur(10px)',

                                                                            border:
                                                                                '1px solid rgba(255,255,255,0.08)',

                                                                            color: '#dffcff',

                                                                            paddingInline: 14,

                                                                            height: 34,
                                                                        },

                                                                        label: {

                                                                            fontWeight: 700,
                                                                        },
                                                                    }}
                                                                >
                                                                    {skill}
                                                                </Badge>
                                                            ))
                                                    }

                                                    {
                                                        talent.skills?.length > 3 && (

                                                            <Badge
                                                                radius="xl"

                                                                color="cyan"

                                                                variant="light"

                                                                style={{
                                                                    cursor: 'pointer',
                                                                }}

                                                                onClick={() => {

                                                                    setDetailTalent(talent);

                                                                    setDetailOpened(true);
                                                                }}
                                                            >
                                                                +{talent.skills.length - 3} more
                                                            </Badge>
                                                        )
                                                    }

                                                </Group>

                                            </Box>

                                        </Box>

                                        {/* BOTTOM */}

                                        <Box mt={28}>

                                            <Divider
                                                mb={20}

                                                color={
                                                    darkMode
                                                        ? '#45474d'
                                                        : '#dee2e6'
                                                }
                                            />

                                            <Group grow>

                                                {/* PROFILE */}

                                                <Button
                                                    radius="xl"

                                                    variant="light"

                                                    color="cyan"

                                                    size="md"

                                                    leftSection={
                                                        <IconUser size={18} />
                                                    }

                                                    styles={{

                                                        root: {

                                                            height: 46,

                                                            fontWeight: 700,

                                                            background:
                                                                'rgba(255,255,255,0.08)',

                                                            border:
                                                                '1px solid rgba(255,255,255,0.08)',

                                                            color: '#dffcff',
                                                        },
                                                    }}

                                                    onClick={() =>
                                                        openProfile(talent)
                                                    }
                                                >
                                                    Profile
                                                </Button>

                                                {/* MESSAGE */}

                                                <Button
                                                    radius="xl"

                                                    size="md"

                                                    leftSection={
                                                        <IconMessageCircle
                                                            size={18}
                                                        />
                                                    }

                                                    styles={{

                                                        root: {

                                                            height: 46,

                                                            background:
                                                                'linear-gradient(135deg,#13c6e8,#0ea5c6)',

                                                            fontWeight: 700,

                                                            border: 'none',
                                                        },
                                                    }}
                                                >
                                                    Message
                                                </Button>

                                            </Group>

                                        </Box>

                                    </Card>

                                </Grid.Col>
                            ))
                        }

                    </Grid>

                </Box>

            </Flex>

            {/* PROFILE DRAWER */}

            <Drawer
                opened={opened}

                onClose={() =>
                    setOpened(false)
                }

                position="right"

                size="40%"

                padding="lg"

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

                        fontSize: '28px',

                        fontWeight: 700,
                    },
                }}
            >

                {
                    selectedTalent && (

                        <ScrollArea h="90vh">

                            <Stack gap={30}>

                                {/* HERO */}

                                <Paper
                                    p={22}
                                    radius="28px"
                                    style={{
                                        background:
                                            'linear-gradient(135deg,#2c2e33,#25262b)',

                                        border:
                                            '1px solid #343a40',
                                    }}
                                >

                                    <Group align="flex-start">

                                        <Avatar
                                            size={82}
                                            radius="xl"
                                            color="cyan"
                                        >
                                            {
                                                selectedTalent?.fullName?.charAt(0)
                                            }
                                        </Avatar>

                                        <Box>

                                            <Title
                                                order={1}
                                                c="#f8f9fa"
                                                style={{
                                                    fontSize: '34px',
                                                }}
                                            >
                                                {selectedTalent?.fullName}
                                            </Title>

                                            <Group mt={10} gap={8}>

                                                <IconBriefcase
                                                    size={18}
                                                    color="#10b1cf"
                                                />

                                                <Text
                                                    fw={600}
                                                    size="lg"
                                                    c="#10b1cf"
                                                >
                                                    {selectedTalent?.jobTitle}
                                                </Text>

                                            </Group>

                                            <Group mt={6} gap={6}>

                                                <IconMapPin
                                                    size={16}
                                                    color="#868e96"
                                                />

                                                <Text c="#adb5bd">
                                                    {selectedTalent?.location}
                                                </Text>

                                            </Group>

                                            <Group mt={18}>

                                                <Badge
                                                    size="lg"
                                                    radius="xl"



                                                    styles={{

                                                        root: {

                                                            background:
                                                                'linear-gradient(135deg,#10b1cf,#0ea5c6)',

                                                            color: 'white',

                                                            border: 'none',
                                                        },
                                                    }}
                                                >
                                                    {
                                                        selectedTalent?.experienceYears
                                                    } YEARS EXP
                                                </Badge>

                                                <Badge
                                                    size="lg"
                                                    radius="xl"

                                                    leftSection={
                                                        <IconBuildingSkyscraper
                                                            size={12}
                                                        />
                                                    }

                                                    styles={{

                                                        root: {

                                                            background:
                                                                'rgba(255,255,255,0.06)',

                                                            border:
                                                                '1px solid rgba(255,255,255,0.1)',

                                                            color: '#f1f3f5',
                                                        },
                                                    }}
                                                >
                                                    {
                                                        selectedTalent?.company
                                                    }
                                                </Badge>

                                            </Group>

                                        </Box>

                                    </Group>

                                </Paper>

                                {/* ABOUT */}

                                <Box>

                                    <Group mb={14}>

                                        <IconUser
                                            size={24}
                                            color="#10b1cf"
                                        />

                                        <Text
                                            fw={700}
                                            size="xl"
                                            c="#10b1cf"
                                        >
                                            About
                                        </Text>

                                    </Group>

                                    <Text
                                        c="#ced4da"
                                        style={{
                                            lineHeight: 1.9,
                                        }}
                                    >
                                        {selectedTalent?.about}
                                    </Text>

                                </Box>

                                <Divider color="#343a40" />

                                {/* SKILLS */}

                                <Box>

                                    <Group mb={18}>

                                        <IconSparklesFilled
                                            size={24}
                                            color="#10b1cf"
                                        />

                                        <Text
                                            fw={700}
                                            size="xl"
                                            c="#10b1cf"
                                        >
                                            Skills
                                        </Text>

                                    </Group>

                                    <Group
                                        mt={18}
                                        gap={10}
                                    >
                                        {
                                            selectedTalent?.skills?.map(
                                                (skill: string) => (

                                                    <Badge
                                                        key={skill}

                                                        radius="xl"

                                                        size="lg"

                                                        variant="transparent"

                                                        leftSection={
                                                            <IconStarFilled
                                                                size={10}
                                                            />
                                                        }

                                                        styles={{

                                                            root: {

                                                                background:
                                                                    'rgba(255,255,255,0.08)',

                                                                backdropFilter:
                                                                    'blur(12px)',

                                                                WebkitBackdropFilter:
                                                                    'blur(12px)',

                                                                border:
                                                                    '1px solid rgba(255,255,255,0.12)',

                                                                color: '#dffcff',

                                                                paddingInline: 16,

                                                                height: 36,

                                                                boxShadow:
                                                                    '0 4px 14px rgba(0,0,0,0.18)',
                                                            },

                                                            label: {

                                                                fontWeight: 700,

                                                                letterSpacing: 0.4,
                                                            },
                                                        }}
                                                    >
                                                        {skill}
                                                    </Badge>
                                                )
                                            )
                                        }
                                    </Group>

                                </Box>

                                <Divider color="#343a40" />

                                {/* EXPERIENCE */}

                                <Box>

                                    <Group mb={20}>

                                        <IconBriefcase2
                                            size={26}
                                            color="#10b1cf"
                                        />

                                        <Text
                                            fw={700}
                                            size="xl"
                                            c="#10b1cf"
                                        >
                                            Experience
                                        </Text>

                                    </Group>

                                    <Stack gap={18}>

                                        {
                                            experiences.map((exp) => (

                                                <Paper
                                                    key={exp.id}
                                                    p={22}
                                                    radius="22px"
                                                    style={{
                                                        backgroundColor:
                                                            '#2c2e33',

                                                        border:
                                                            '1px solid #343a40',
                                                    }}
                                                >

                                                    <Group
                                                        justify="space-between"
                                                        mb={10}
                                                    >

                                                        <Box>

                                                            <Text
                                                                fw={700}
                                                                size="lg"
                                                                c="#f8f9fa"
                                                            >
                                                                {exp.jobTitle}
                                                            </Text>

                                                            <Text c="#10b1cf">
                                                                {exp.company}
                                                            </Text>

                                                        </Box>

                                                        <Badge
                                                            radius="xl"
                                                            color="gray"
                                                        >
                                                            {exp.startDate}
                                                            {' - '}
                                                            {exp.endDate}
                                                        </Badge>

                                                    </Group>

                                                    <Text
                                                        c="#ced4da"
                                                        style={{
                                                            lineHeight: 1.8,
                                                        }}
                                                    >
                                                        {exp.description}
                                                    </Text>

                                                </Paper>
                                            ))
                                        }

                                    </Stack>

                                </Box>

                                <Divider color="#343a40" />

                                {/* CERTIFICATIONS */}

                                <Box>

                                    <Group mb={20}>

                                        <IconCertificate
                                            size={26}
                                            color="#10b1cf"
                                        />

                                        <Text
                                            fw={700}
                                            size="xl"
                                            c="#10b1cf"
                                        >
                                            Certifications
                                        </Text>

                                    </Group>

                                    <Stack gap={16}>

                                        {
                                            certifications.map((cert) => (

                                                <Paper
                                                    key={cert.id}
                                                    p={20}
                                                    radius="20px"
                                                    style={{
                                                        backgroundColor:
                                                            '#2c2e33',

                                                        border:
                                                            '1px solid #343a40',
                                                    }}
                                                >

                                                    <Group justify="space-between">

                                                        <Box>

                                                            <Text
                                                                fw={700}
                                                                size="md"
                                                                c="#f8f9fa"
                                                            >
                                                                {cert.title}
                                                            </Text>

                                                            <Text
                                                                fw={700}
                                                                size="sm"
                                                                c="#1fb8d3"
                                                            >
                                                                {cert.company}
                                                            </Text>

                                                            <Text
                                                                mt={4}
                                                                c="#10b1cf"
                                                            >
                                                                {cert.issuedBy}
                                                            </Text>

                                                        </Box>

                                                        <Badge
                                                            radius="xl"
                                                            color="cyan"
                                                        >
                                                            {cert.issueDate}
                                                        </Badge>

                                                    </Group>

                                                </Paper>
                                            ))
                                        }

                                    </Stack>

                                </Box>

                                {/* ACTION BUTTON */}

                                <Button
                                    size="lg"
                                    radius="xl"
                                    color="cyan"
                                    fullWidth
                                    leftSection={
                                        <IconMessageCircle size={20} />
                                    }
                                >
                                    Message {selectedTalent.fullName}
                                </Button>

                            </Stack>

                        </ScrollArea>
                    )
                }

            </Drawer>

            <Drawer opened={detailOpened} onClose={() => setDetailOpened(false)} position="right" size="32%" padding="xl" styles={{ content: { backgroundColor: darkMode ? '#25262b' : '#ffffff', }, header: { backgroundColor: darkMode ? '#25262b' : '#ffffff', }, title: { color: darkMode ? '#f8f9fa' : '#1e293b', fontWeight: 700, fontSize: '26px', }, }} title="Talent Details" > {detailTalent && (<Stack gap={28}> {/* ABOUT */} <Box> <Group mb={14}> <IconUser size={22} color="#10b1cf" /> <Text fw={700} size="xl" c="#10b1cf" > About </Text> </Group> <Text c="#ced4da" style={{ lineHeight: 1.9, }} > {detailTalent.about} </Text> </Box> <Divider color="#343a40" /> {/* SKILLS */} <Box> <Group mb={18}> <IconSparklesFilled size={22} color="#10b1cf" /> <Text fw={700} size="xl" c="#10b1cf" > Skills </Text> </Group> <Group gap={12}> {detailTalent.skills?.map((skill: string) => (<Badge key={skill} radius="xl" size="lg" variant="transparent" styles={{ root: { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)', color: '#dffcff', paddingInline: 16, height: 38, }, label: { fontWeight: 700, }, }} > {skill} </Badge>))} </Group> </Box> </Stack>)} </Drawer>

        </Box>

    );

}

export default FindTalentPage;