import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    MultiSelect,
    NumberInput,
    Paper,
    Select,
    Stack,
    Text,
    Textarea,
    TextInput,
    Title,
} from '@mantine/core';

import {
    IconBriefcase,
    IconMapPin,
    IconCurrencyRupee,
    IconDeviceLaptop,
} from '@tabler/icons-react';

import { motion } from 'framer-motion';

import { useState } from 'react';

import Header from '../components/Header';

import { useTheme } from '../context/ThemeContext';

import { useEditor } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';

function PostJobsPage() {

    const { darkMode } =
        useTheme();

    const [title, setTitle] =
        useState('');

    const [company, setCompany] =
        useState('');

    const [location, setLocation] =
        useState('');

    const [minSalary,
        setMinSalary] =
        useState<string | number>('');

    const [maxSalary,
        setMaxSalary] =
        useState<string | number>('');

    const [experienceLevel,
        setExperienceLevel] =
        useState<string | null>(null);

    const [employmentType,
        setEmploymentType] =
        useState<string | null>(null);

    const [workMode,
        setWorkMode] =
        useState<string | null>(null);

    const [description,
        setDescription] =
        useState('');

    const [requirements,
        setRequirements] =
        useState('');

    const [skillsRequired,
        setSkillsRequired] =
        useState<string[]>([]);

    const [loading,
        setLoading] =
        useState(false);

    const editor = useEditor({

        extensions: [
            StarterKit,
        ],

        content: `
    
    <h2>About The Job</h2>

    <p>
      Write description here...
    </p>

    <h2>Responsibilities</h2>

    <ul>
      <li>
        Add responsibilities here...
      </li>
    </ul>

    <h2>Qualifications and Skill Sets</h2>

    <ul>
      <li>
        Add required qualification and skill set here...
      </li>
    </ul>
  `,

        onUpdate: ({ editor }) => {

            setDescription(
                editor.getHTML()
            );
        },
    });

    const handlePostJob =
        async () => {

            try {

                setLoading(true);

                const response =
                    await fetch(

                        'http://localhost:8080/api/jobs',

                        {
                            method: 'POST',

                            headers: {

                                'Content-Type':
                                    'application/json',

                                Authorization:
                                    `Bearer ${localStorage.getItem('token')}`,
                            },

                            body: JSON.stringify({

                                title,

                                company,

                                location,

                                minSalary,

                                maxSalary,

                                experienceLevel,

                                employmentType,

                                workMode,

                                description,

                                requirements,

                                skillsRequired,
                            }),
                        }
                    );

                if (!response.ok) {

                    alert(
                        'Failed to post job'
                    );

                    setLoading(false);

                    return;
                }

                await response.json();

                alert(
                    'Job posted successfully'
                );

                setTitle('');
                setCompany('');
                setLocation('');
                setMinSalary('');
                setMaxSalary('');
                setExperienceLevel(null);
                setEmploymentType(null);
                setWorkMode(null);
                setDescription('');
                setRequirements('');
                setSkillsRequired([]);

                setLoading(false);

            }

            catch (error) {

                console.log(error);

                alert('Server Error');

                setLoading(false);
            }
        };

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
                duration: 0.45,
            }}
        >

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

                <Container
                    size="lg"
                    py={45}
                >

                    <Paper
                        radius="xl"
                        p={40}

                        style={{

                            backgroundColor:

                                darkMode
                                    ? '#2c2e33'
                                    : '#ffffff',

                            border:

                                darkMode
                                    ? '1px solid #343a40'
                                    : '1px solid #dee2e6',
                        }}
                    >

                        {/* TITLE */}

                        <Stack gap={5} mb={35}>

                            <Title
                                order={1}

                                style={{
                                    color:

                                        darkMode
                                            ? '#f8f9fa'
                                            : '#1e293b',
                                }}
                            >
                                Post a Job
                            </Title>

                            <Text
                                c={
                                    darkMode
                                        ? '#adb5bd'
                                        : '#64748b'
                                }

                                size="lg"
                            >
                                Create a new opportunity and
                                find the right talent.
                            </Text>

                        </Stack>

                        {/* FORM */}

                        <Stack gap={25}>

                            {/* BASIC DETAILS */}

                            <Grid>

                                <Grid.Col span={6}>

                                    <TextInput
                                        label="Job Title"

                                        value={title}

                                        onChange={(e) =>
                                            setTitle(
                                                e.target.value
                                            )
                                        }

                                        placeholder="Enter Job Title"

                                        leftSection={
                                            <IconBriefcase size={18} />
                                        }

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
                                                        ? '#25262b'
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

                                </Grid.Col>

                                <Grid.Col span={6}>

                                    <TextInput
                                        label="Company"

                                        value={company}

                                        onChange={(e) =>
                                            setCompany(
                                                e.target.value
                                            )
                                        }

                                        placeholder="Enter Company Name"

                                        leftSection={
                                            <IconBriefcase size={18} />
                                        }

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
                                                        ? '#25262b'
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

                                </Grid.Col>

                            </Grid>

                            {/* LOCATION + SALARY */}

                            <Grid>

                                <Grid.Col span={4}>

                                    <TextInput
                                        label="Location"

                                        value={location}

                                        onChange={(e) =>
                                            setLocation(
                                                e.target.value
                                            )
                                        }

                                        placeholder="Enter Job Location"

                                        leftSection={
                                            <IconMapPin size={18} />
                                        }

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
                                                        ? '#25262b'
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

                                </Grid.Col>

                                <Grid.Col span={4}>

                                    <NumberInput
                                        label="Min Salary"

                                        value={minSalary}

                                        onChange={(value) =>
                                            setMinSalary(value)
                                        }

                                        placeholder="Enter Min-Salary"

                                        leftSection={
                                            <IconCurrencyRupee size={18} />
                                        }

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
                                                        ? '#25262b'
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

                                </Grid.Col>

                                <Grid.Col span={4}>

                                    <NumberInput
                                        label="Max Salary"

                                        value={maxSalary}

                                        onChange={(value) =>
                                            setMaxSalary(value)
                                        }

                                        placeholder="Enter Max-Salary"

                                        leftSection={
                                            <IconCurrencyRupee size={18} />
                                        }

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
                                                        ? '#25262b'
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

                                </Grid.Col>

                            </Grid>

                            {/* ENUMS */}

                            <Grid>

                                <Grid.Col span={4}>

                                    <Select
                                        label="Experience Level"

                                        value={experienceLevel}

                                        placeholder='Select Experience Level'

                                        onChange={
                                            setExperienceLevel
                                        }

                                        data={[
                                            'INTERN',
                                            'FRESHER',
                                            'JUNIOR',
                                            'MID_LEVEL',
                                            'SENIOR',
                                        ]}

                                        comboboxProps={{
                                            shadow: 'md',
                                        }}

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
                                                        ? '#25262b'
                                                        : '#ffffff',

                                                border:
                                                    '1px solid #495057',

                                                color:

                                                    darkMode
                                                        ? '#ffffff'
                                                        : '#1e293b',
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
                                                        ? '#f8f9fa'
                                                        : '#1e293b',

                                                '&[data-combobox-selected]': {

                                                    backgroundColor:
                                                        '#10b1cf',

                                                    color: '#ffffff',
                                                },

                                                '&[data-combobox-active]': {

                                                    backgroundColor:

                                                        darkMode
                                                            ? '#343a40'
                                                            : '#edf6fb',
                                                },
                                            },
                                        }}
                                    />

                                </Grid.Col>

                                <Grid.Col span={4}>

                                    <Select
                                        label="Employment Type"

                                        value={employmentType}

                                        placeholder='Select Employment Type'

                                        onChange={
                                            setEmploymentType
                                        }

                                        data={[
                                            'FULL_TIME',
                                            'PART_TIME',
                                            'INTERNSHIP',
                                            'CONTRACT',
                                        ]}

                                        comboboxProps={{
                                            shadow: 'md',
                                        }}

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
                                                        ? '#25262b'
                                                        : '#ffffff',

                                                border:
                                                    '1px solid #495057',

                                                color:

                                                    darkMode
                                                        ? '#ffffff'
                                                        : '#1e293b',
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
                                                        ? '#f8f9fa'
                                                        : '#1e293b',
                                            },
                                        }}
                                    />

                                </Grid.Col>

                                <Grid.Col span={4}>

                                    <Select
                                        label="Work Mode"

                                        value={workMode}

                                        placeholder='Select Work Mode'

                                        onChange={
                                            setWorkMode
                                        }

                                        data={[
                                            'REMOTE',
                                            'HYBRID',
                                            'ONSITE',
                                        ]}
                                        comboboxProps={{
                                            shadow: 'md',
                                        }}

                                        leftSection={
                                            <IconDeviceLaptop size={18} />
                                        }

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
                                                        ? '#25262b'
                                                        : '#ffffff',

                                                border:
                                                    '1px solid #495057',

                                                color:

                                                    darkMode
                                                        ? '#ffffff'
                                                        : '#1e293b',
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
                                                        ? '#f8f9fa'
                                                        : '#1e293b',
                                            },
                                        }}
                                    />

                                </Grid.Col>

                            </Grid>

                            {/* SKILLS */}

                            <MultiSelect
                                label="Skills Required"

                                value={skillsRequired}

                                onChange={setSkillsRequired}

                                searchable

                                data={[
                                    'Java',
                                    'Spring Boot',
                                    'Hibernate',
                                    'JPA',
                                    'REST API',
                                    'Microservices',
                                    'JWT',
                                    'OAuth2',
                                    'React',
                                    'Next.js',
                                    'TypeScript',
                                    'JavaScript',
                                    'Node.js',
                                    'Express.js',
                                    'HTML',
                                    'CSS',
                                    'Tailwind CSS',
                                    'Bootstrap',
                                    'Redux',
                                    'Vue.js',
                                    'Angular',
                                    'MySQL',
                                    'PostgreSQL',
                                    'MongoDB',
                                    'Redis',
                                    'Firebase',
                                    'AWS',
                                    'Azure',
                                    'Google Cloud',
                                    'Docker',
                                    'Kubernetes',
                                    'Jenkins',
                                    'CI/CD',
                                    'Git',
                                    'GitHub',
                                    'Linux',
                                    'Python',
                                    'Django',
                                    'Flask',
                                    'C++',
                                    'C',
                                    'Data Structures',
                                    'Algorithms',
                                    'System Design',
                                    'Machine Learning',
                                    'Artificial Intelligence',
                                    'TensorFlow',
                                    'PyTorch',
                                    'Figma',
                                    'UI/UX Design',
                                    'Adobe XD',
                                    'Manual Testing',
                                    'Selenium',
                                    'Postman',
                                    'API Testing',
                                    'JUnit',
                                    'Mockito',
                                    'Agile',
                                    'Scrum',
                                    'Communication',
                                    'Problem Solving',
                                    'Leadership',
                                ]}

                                placeholder="Select skills"

                                styles={{
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
                                                ? '#f8f9fa'
                                                : '#1e293b',

                                        '&[data-combobox-selected]': {

                                            backgroundColor:
                                                '#10b1cf',

                                            color: '#ffffff',
                                        },

                                        '&[data-combobox-active]': {

                                            backgroundColor:

                                                darkMode
                                                    ? '#343a40'
                                                    : '#edf6fb',
                                        },
                                    },
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
                                                ? '#25262b'
                                                : '#ffffff',

                                        border:
                                            '1px solid #495057',

                                        color:

                                            darkMode
                                                ? '#ffffff'
                                                : '#1e293b',
                                    },

                                    pill: {
                                        backgroundColor:
                                            'rgba(16,177,207,0.12)',

                                        color:
                                            '#10b1cf',
                                    },
                                }}
                            />

                            {/* DESCRIPTION */}
                            <Textarea
                                label="Job Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                minRows={6}
                                placeholder="Describe the role..."
                                styles={{
                                    label: { color: darkMode ? '#f8f9fa' : '#1e293b', marginBottom: 6, },
                                    input: {
                                        backgroundColor: darkMode ? '#25262b' : '#ffffff',
                                        border: '1px solid #495057', color: darkMode ? '#ffffff' : '#1e293b',
                                    },
                                }} />

                            {/* REQUIREMENTS */}

                            <Textarea
                                label="Requirements"

                                value={requirements}

                                onChange={(e) =>
                                    setRequirements(
                                        e.target.value
                                    )
                                }

                                minRows={5}

                                placeholder="Required qualifications..."

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
                                                ? '#25262b'
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

                            {/* BUTTON */}

                            <Flex justify="flex-end">

                                <Button
                                    size="md"
                                    radius="md"

                                    loading={loading}

                                    onClick={handlePostJob}

                                    styles={{
                                        root: {
                                            backgroundColor:
                                                '#10b1cf',

                                            paddingInline: 30,
                                        },
                                    }}
                                >
                                    Post Job
                                </Button>

                            </Flex>

                        </Stack>

                    </Paper>

                </Container>

            </Box>

        </motion.div>
    );
}

export default PostJobsPage;