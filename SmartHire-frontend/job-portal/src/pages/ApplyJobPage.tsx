import {
    Box,
    Button,
    Container,
    FileInput,
    Group,
    Paper,
    Stack,
    Text,
    TextInput,
    Textarea,
    Title,
    Badge,
    Flex,
    Divider,
} from '@mantine/core';

import {
    IconFileUpload,
    IconPhone,
    IconUser,
    IconMail,
    IconMapPin,
    IconBriefcase,
    IconBuilding,
    IconCurrencyRupee,
    IconArrowLeft,
} from '@tabler/icons-react';

import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import Header from '../components/Header';

import { useTheme } from '../context/ThemeContext';

import { useAuth } from '../context/AuthContext';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

function ApplyJobPage() {

    const { darkMode } =
        useTheme();

    const { user } =
        useAuth();

    const navigate =
        useNavigate();

    const { jobId } =
        useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [job,
        setJob] =
        useState<any>(null);

    const [phone,
        setPhone] =
        useState('');

    const [coverLetter,
        setCoverLetter] =
        useState('');

    const [resume,
        setResume] =
        useState<File | null>(null);

    const [loading,
        setLoading] =
        useState(false);

    useEffect(() => {

        if (user) {

            setName(user.name || '');
            setEmail(user.email || '');
        }

        fetchJob();

    }, [user]);

    const fetchJob =
        async () => {

            try {

                const response =
                    await fetch(

                        `http://localhost:8080/api/jobs/${jobId}`,

                        {
                            headers: {

                                Authorization:
                                    `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    );

                const data =
                    await response.json();

                setJob(data);
            }

            catch (error) {

                console.log(error);
            }
        };

    const handleApply =
        async () => {

            try {

                if (!resume) {

                    alert(
                        'Please upload resume'
                    );

                    return;
                }

                // PHONE VALIDATION

                const digits =
                    phone.replace(/\D/g, '');

                // INDIA => 91 + 10 digits

                if (
                    phone.startsWith('+91')
                    &&
                    digits.length !== 12
                ) {

                    alert(
                        'Indian phone number must contain exactly 10 digits'
                    );

                    return;
                }

                setLoading(true);

                const formData =
                    new FormData();

                formData.append(
                    'name',
                    name
                )

                formData.append(
                    'email',
                    email
                )

                formData.append(
                    'phone',
                    phone
                );

                formData.append(
                    'coverLetter',
                    coverLetter
                );

                formData.append(
                    'resume',
                    resume
                );

                const response =
                    await fetch(

                        `http://localhost:8080/api/applications/${jobId}`,

                        {
                            method: 'POST',

                            headers: {

                                Authorization:
                                    `Bearer ${localStorage.getItem('token')}`,
                            },

                            body: formData,
                        }
                    );

                if (!response.ok) {

                    const errorText =
                        await response.text();

                    alert(errorText);

                    setLoading(false);

                    return;
                }

                alert(
                    'Application submitted successfully'
                );

                navigate('/');

            }

            catch (error) {

                console.log(error);

                alert(
                    'Server Error'
                );
            }

            finally {

                setLoading(false);
            }
        };

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 20,
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
                    size="xl"
                    py={35}

                    style={{
                        maxWidth: '1400px',
                    }}
                >
                    <Group mb={20}>

                        <Button
                            variant="subtle"

                            leftSection={
                                <IconArrowLeft size={18} />
                            }

                            onClick={() =>
                                navigate(-1)
                            }

                            style={{

                                color:
                                    '#10b1cf',

                                paddingLeft: 0,
                            }}
                        >
                            Back To Jobs
                        </Button>

                    </Group>

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
                                    ? '1px solid rgba(255,255,255,0.05)'
                                    : '1px solid #e9ecef',

                            boxShadow:

                                darkMode

                                    ? '0 10px 40px rgba(0,0,0,0.28)'

                                    : '0 10px 30px rgba(0,0,0,0.08)',
                        }}
                    >

                        {/* HEADER */}
                        {/* JOB DETAILS */}

                        {
                            job && (

                                <Paper
                                    p={28}

                                    radius="xl"

                                    mb={35}

                                    style={{

                                        background:

                                            darkMode

                                                ? 'linear-gradient(135deg,#2c2e33,#25262b)'

                                                : 'linear-gradient(135deg,#ffffff,#f8fafc)',

                                        border:

                                            darkMode

                                                ? '1px solid #343a40'

                                                : '1px solid #dee2e6',
                                    }}
                                >

                                    <Stack gap={20}>

                                        {/* TOP */}

                                        <Flex
                                            justify="space-between"
                                            align="flex-start"
                                        >

                                            <Box>

                                                <Title
                                                    order={1}

                                                    style={{
                                                        color:

                                                            darkMode
                                                                ? '#f8f9fa'
                                                                : '#1e293b',

                                                        fontSize: '34px',

                                                        lineHeight: 1.2,
                                                    }}
                                                >
                                                    {job.title}
                                                </Title>

                                                <Group
                                                    mt={10}
                                                    gap={16}
                                                >

                                                    <Group gap={6}>

                                                        <IconBuilding
                                                            size={18}
                                                            color="#10b1cf"
                                                        />

                                                        <Text
                                                            fw={600}

                                                            c={
                                                                darkMode
                                                                    ? '#ced4da'
                                                                    : '#475569'
                                                            }
                                                        >
                                                            {job.company}
                                                        </Text>

                                                    </Group>

                                                    <Group gap={6}>

                                                        <IconMapPin
                                                            size={18}
                                                            color="#10b1cf"
                                                        />

                                                        <Text
                                                            fw={600}

                                                            c={
                                                                darkMode
                                                                    ? '#ced4da'
                                                                    : '#475569'
                                                            }
                                                        >
                                                            {job.location}
                                                        </Text>

                                                    </Group>

                                                </Group>

                                            </Box>

                                            <Paper
                                                px={18}
                                                py={14}

                                                radius="xl"

                                                style={{

                                                    backgroundColor:
                                                        'rgba(16,177,207,0.12)',

                                                    border:
                                                        '1px solid rgba(16,177,207,0.18)',
                                                }}
                                            >

                                                <Group gap={6}>



                                                    <Text
                                                        fw={700}

                                                        c="#10b1cf"
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

                                                </Group>

                                            </Paper>

                                        </Flex>

                                        <Divider color="#343a40" />

                                        {/* TAGS */}

                                        <Group gap={12}>

                                            <Badge
                                                radius="xl"

                                                size="lg"

                                                color="cyan"

                                                variant="light"
                                            >
                                                {
                                                    job.experienceLevel
                                                        ?.replace('_', ' ')
                                                }
                                            </Badge>

                                            <Badge
                                                radius="xl"

                                                size="lg"

                                                color="cyan"

                                                variant="light"
                                            >
                                                {
                                                    job.employmentType
                                                        ?.replace('_', ' ')
                                                }
                                            </Badge>

                                            <Badge
                                                radius="xl"

                                                size="lg"

                                                color="cyan"

                                                variant="light"
                                            >
                                                {
                                                    job.workMode
                                                        ?.replace('_', ' ')
                                                }
                                            </Badge>

                                        </Group>

                                        {/* SKILLS */}

                                        <Box>

                                            <Text
                                                fw={700}

                                                mb={10}

                                                c={
                                                    darkMode
                                                        ? '#f8f9fa'
                                                        : '#1e293b'
                                                }
                                            >
                                                Skills Required
                                            </Text>

                                            <Group gap={10}>

                                                {
                                                    job.skillsRequired
                                                        ?.map((skill: string) => (

                                                            <Badge
                                                                key={skill}

                                                                radius="xl"

                                                                size="lg"

                                                                style={{

                                                                    backgroundColor:
                                                                        'rgba(16,177,207,0.12)',

                                                                    color:
                                                                        '#10b1cf',

                                                                    border:
                                                                        '1px solid rgba(16,177,207,0.18)',
                                                                }}
                                                            >
                                                                {skill}
                                                            </Badge>
                                                        ))
                                                }

                                            </Group>

                                        </Box>

                                    </Stack>

                                </Paper>
                            )
                        }

                        <Stack
                            gap={5}
                            mb={35}
                        >

                            <Title
                                order={1}

                                style={{
                                    color:

                                        darkMode
                                            ? '#f8f9fa'
                                            : '#1e293b',
                                }}
                            >
                                Apply For Job
                            </Title>

                            <Text
                                size="lg"

                                c={
                                    darkMode
                                        ? '#adb5bd'
                                        : '#64748b'
                                }
                            >
                                Submit your application and
                                resume.
                            </Text>

                        </Stack>

                        {/* FORM */}

                        <Stack gap={24}>

                            {/* NAME */}

                            <TextInput
                                label="Full Name"

                                placeholder='Enter Full Name'

                                value={name}

                                onChange={(e) =>
                                    setName(e.target.value)
                                }

                                leftSection={
                                    <IconUser size={18} />
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

                            {/* EMAIL */}

                            <TextInput
                                label="Email"

                                placeholder='Enter Email Address'

                                value={email}

                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }

                                leftSection={
                                    <IconMail size={18} />
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

                            {/* PHONE */}

                            <Box>

                                <Text
                                    fw={600}
                                    mb={6}
                                    size="sm"
                                    c={
                                        darkMode
                                            ? '#f8f9fa'
                                            : '#1e293b'
                                    }
                                >
                                    Contact Number
                                </Text>

                                <Box
                                    style={{

                                        backgroundColor:
                                            darkMode
                                                ? '#25262b'
                                                : '#ffffff',

                                        border:
                                            '1px solid #495057',

                                        borderRadius: 12,

                                        paddingInline: 14,

                                        paddingBlock: 2,
                                    }}
                                >

                                    <PhoneInput
                                        international

                                        defaultCountry="IN"

                                        countryCallingCodeEditable={false}

                                        value={phone}

                                        onChange={(value) => {

                                            if (!value) {

                                                setPhone('');

                                                return;
                                            }

                                            // INDIA LIMIT

                                            if (value.startsWith('+91')) {

                                                const digits =
                                                    value.replace(/\D/g, '');

                                                const limited =
                                                    digits.slice(0, 12);

                                                setPhone('+' + limited);

                                                return;
                                            }

                                            setPhone(value);
                                        }}

                                        placeholder="Enter phone number"

                                        className={
                                            darkMode
                                                ? 'dark-phone-input'
                                                : 'light-phone-input'
                                        }
                                    />

                                </Box>

                            </Box>

                            {/* RESUME */}

                            <FileInput
                                label="Upload Resume"

                                value={resume}

                                onChange={setResume}

                                accept=".pdf,.doc,.docx"

                                placeholder="Upload PDF or Word resume"

                                leftSection={
                                    <IconFileUpload size={18} />
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

                            {/* COVER LETTER */}

                            <Textarea
                                label="Cover Letter"

                                value={coverLetter}

                                onChange={(e) =>
                                    setCoverLetter(
                                        e.target.value
                                    )
                                }

                                minRows={10}

                                placeholder="Write a professional cover letter..."

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

                                        padding: '16px',

                                        lineHeight: 1.8,
                                    },
                                }}
                            />

                            {/* APPLY BUTTON */}

                            <Group justify="flex-end">

                                <Button
                                    size="lg"

                                    radius="xl"

                                    loading={loading}

                                    onClick={handleApply}

                                    style={{
                                        backgroundColor:
                                            '#10b1cf',
                                    }}
                                >
                                    Apply Now
                                </Button>

                            </Group>

                        </Stack>

                    </Paper>

                </Container>

                <style>

                    {`

        .dark-phone-input input {

            background: transparent;

            border: none;

            outline: none;

            color: white;

            width: 100%;

            font-size: 15px;
        }

        .light-phone-input input {

            background: transparent;

            border: none;

            outline: none;

            color: #1e293b;

            width: 100%;

            font-size: 15px;
        }

        .PhoneInputCountrySelect {

            background: transparent;

            border: none;

            color: inherit;

            outline: none;

            cursor: pointer;
        }

        /* DROPDOWN */

        .PhoneInputCountrySelect option {

            background: #25262b;

            color: white;
        }

        .PhoneInputCountrySelect option:hover {

            background: #10b1cf;

            color: white;
        }

        .PhoneInputCountryIcon {

            box-shadow: none;
        }

    `}

                </style>

            </Box>

        </motion.div>
    );
}

export default ApplyJobPage;