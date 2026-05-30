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
  Modal,
  Checkbox,
  SimpleGrid,
  Paper,
} from '@mantine/core';

import {
  IconMapPin,
  IconBriefcase,
  IconEdit,
  IconPlus,
  IconCheck,
  IconX,
  IconTrash,
  IconUser,
  IconStarsFilled,
  IconStars,
  IconSparklesFilled,
  IconLink,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBuildings,
  IconBriefcaseOff,
  IconBriefcase2,
  icons,
  IconCertificate,
  IconCode,
  IconFileText,
  IconBuildingSkyscraper,
  IconBuildingBank,
  IconSchool,
  IconSubtitlesEdit,
} from '@tabler/icons-react';

import { motion } from 'framer-motion';

import Header from '../../components/Header';

// import googleCloudLogo from '../../assets/logos/googleCloud.png';
import microsoftLogo from '../../assets/logos/microsoft.png';
import amazonLogo from '../../assets/logos/amazon.png';
import metaLogo from '../../assets/logos/meta.png';
import adminAvatar from '../../assets/admin.png';
import coverImage from '../../assets/cover.png';
import { useAuth } from '../../context/AuthContext';
import {
  useEffect,
  useState,
} from 'react';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';

function AdminProfile() {

  const {
    darkMode,
  } = useTheme();

  const { user, isDemo } = useAuth();

  const [editingAbout,
    setEditingAbout] =
    useState(false);

  const [about,
    setAbout] =
    useState(

      isDemo

        ? `Platform administrator managing SmartHire AI operations, overseeing recruitment workflows, employer verification, applicant management, platform analytics, and secure hiring experiences.`

        : ''
    );

  const [skills, setSkills] =
    useState<any[]>(

      isDemo

        ? [

          {
            id: 1,
            name: 'Administration',
          },

          {
            id: 2,
            name: 'Management',
          },

          {
            id: 3,
            name: 'Analytics',
          },

          {
            id: 4,
            name: 'Operations',
          },

          {
            id: 5,
            name: 'Support',
          },

          {
            id: 6,
            name: 'Security',
          },
          {
            id: 7,
            name: 'Moderation',
          }
        ]

        : []);

  const [skillInput,
    setSkillInput] =
    useState('');

  const [editingExperienceId,
    setEditingExperienceId] =
    useState<number | null>(null);

  const [
    editingCertificationId,
    setEditingCertificationId,
  ] = useState<number | null>(null);

  const [editingProfile,
    setEditingProfile] =
    useState(false);

  const [editingSkills,
    setEditingSkills] =
    useState(false);

  const [editingLinks,
    setEditingLinks] =
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

  const [phone,
    setPhone] =
    useState('');

  const [githubUrl,
    setGithubUrl] =
    useState('');

  const [linkedinUrl,
    setLinkedinUrl] =
    useState('');

  const [resumeUrl,
    setResumeUrl] =
    useState('');

  const [experiences,
    setExperiences] =
    useState<any[]>(

      isDemo

        ? [

          {
            id: 1,

            jobTitle:
              'Senior Talent Acquisition Manager',

            company:
              'Netflix',

            location:
              'Los Angeles, California',

            description:
              'Led end-to-end recruitment for engineering, product, and design teams across North America. Developed strategic hiring pipelines, improved candidate experience, and partnered with leadership to scale high-performing teams.',

            startDate:
              'March 2022',

            endDate:
              'Present',

            currentlyWorking:
              true,
          },

          {
            id: 2,

            jobTitle:
              'HR Business Partner',

            company:
              'Google',

            location:
              'California',

            description:
              'Collaborated with department heads on workforce planning, employee engagement, performance management, and talent development initiatives. Supported organizational growth through data-driven HR strategies.',

            startDate:
              'June 2019',

            endDate:
              'Feb 2022',

            currentlyWorking:
              false,
          },
        ]

        : []
    );

  const [certifications,
    setCertifications] =
    useState<any[]>(

      isDemo

        ? [

          {
            id: 1,

            title:
              'SHRM Certified Professional (SHRM-CP)',

            company:
              'SHRM',

            issueDate:
              'Apr 2023',

            certificateId:
              'SHRM-CP-2023-45821',
          },

          {
            id: 2,

            title:
              'LinkedIn Certified Professional Recruiter',

            company:
              'LinkedIn Learning',

            issueDate:
              'Jan 2022',

            certificateId:
              'LNKD-RCRT-78456',
          },
          {
            id: 3,

            title: 'Talent Acquisition Specialist Certification',

            company: 'HRCI',

            issueDate: 'Aug 2021',

            certId: 'TAS-HRCI-33218',
          },
        ]

        : []
    );

  const [openedExperience,
    setOpenedExperience] =
    useState(false);

  const [openedCertification,
    setOpenedCertification] =
    useState(false);

  /* EXPERIENCE FORM */

  const [expJobTitle,
    setExpJobTitle] =
    useState('');

  const [expCompany,
    setExpCompany] =
    useState('');

  const [expLocation,
    setExpLocation] =
    useState('');

  const [expDescription,
    setExpDescription] =
    useState('');

  const [expStartDate,
    setExpStartDate] =
    useState('');

  const [expEndDate,
    setExpEndDate] =
    useState('');

  const [currentlyWorking,
    setCurrentlyWorking] =
    useState(false);

  /* CERTIFICATION FORM */

  const [certTitle,
    setCertTitle] =
    useState('');

  const [certCompany,
    setCertCompany] =
    useState('');

  const [certIssueDate,
    setCertIssueDate] =
    useState('');

  const [certId,
    setCertId] =
    useState('');

  const getCompanyInitials = (
    companyName: string
  ) => {

    if (!companyName) return 'S';

    return companyName
      .split(' ')
      .map((word) =>
        word[0]
      )
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const fetchProfile = async () => {

    try {

      const token =
        localStorage.getItem('token');

      if (!token) {

        console.log('No token found');

        return;
      }

      const response = await fetch(

        'http://localhost:8080/api/profile',

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {

        console.log(
          'Failed to fetch profile'
        );

        return;
      }

      const data =
        await response.json();

      console.log(
        'PROFILE DATA:',
        data
      );

      setAbout(
        data.bio || ''
      );

      setLocation(
        data.location || ''
      );

      setPhone(
        data.phone || ''
      );

      setGithubUrl(
        data.githubUrl || ''
      );

      setLinkedinUrl(
        data.linkedinUrl || ''
      );

      setResumeUrl(
        data.resumeUrl || ''
      );

      setJobTitle(
        data.jobTitle || ''
      );

      setCompany(
        data.company || ''
      );

      setExperience(
        data.experience || ''
      );

      fetchSkills();

      fetchExperiences();

      fetchCertifications();

    }

    catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    if (isDemo) return;

    fetchProfile();

  }, []);


  const saveProfile = async () => {

    try {

      const token =
        localStorage.getItem('token');

      const response = await fetch(

        'http://localhost:8080/api/profile',

        {
          method: 'PUT',

          headers: {

            'Content-Type':
              'application/json',

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({

            bio: about,

            location,

            phone,

            githubUrl,

            linkedinUrl,

            resumeUrl,

            jobTitle,

            company,

            experience,

          }),
        }
      );

      if (!response.ok) {

        alert(
          'Failed to save profile'
        );

        return;
      }

      const updatedData =
        await response.json();

      console.log(
        'UPDATED:',
        updatedData
      );

      alert(
        'Profile updated successfully'
      );

    }

    catch (error) {

      console.log(error);

      alert('Server Error');
    }
  };

  const fetchSkills = async () => {

    try {

      const token =
        localStorage.getItem('token');

      const response = await fetch(

        'http://localhost:8080/api/profile/skills',

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) return;

      const data =
        await response.json();

      setSkills(data);

    }

    catch (error) {

      console.log(error);
    }
  };

  const addSkill = async () => {

    if (!skillInput.trim()) return;

    try {

      const token =
        localStorage.getItem('token');

      const response = await fetch(

        'http://localhost:8080/api/profile/skills',

        {
          method: 'POST',

          headers: {

            'Content-Type':
              'application/json',

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({

            name: skillInput,
          }),
        }
      );

      if (response.ok) {

        setSkillInput('');

        fetchSkills();
      }

    }

    catch (error) {

      console.log(error);
    }
  };

  const deleteSkill = async (
    skillId: number
  ) => {

    try {

      const token =
        localStorage.getItem('token');

      const response = await fetch(

        `http://localhost:8080/api/profile/skills/${skillId}`,

        {
          method: 'DELETE',

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {

        fetchSkills();
      }

    }

    catch (error) {

      console.log(error);
    }
  };

  const fetchExperiences = async () => {

    try {

      const token =
        localStorage.getItem('token');

      const response = await fetch(

        'http://localhost:8080/api/profile/experience',

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      setExperiences(data);

    } catch (error) {

      console.log(error);
    }
  };

  const addExperience = async () => {

    try {

      const expData = {

        jobTitle: expJobTitle,

        company: expCompany,

        location: expLocation,

        description: expDescription,

        startDate: expStartDate,

        endDate: currentlyWorking
          ? 'Now'
          : expEndDate,

        currentlyWorking,
      };

      if (editingExperienceId) {

        await axios.put(

          `http://localhost:8080/api/profile/experience/${editingExperienceId}`,

          expData,

          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

      } else {

        await axios.post(

          'http://localhost:8080/api/profile/experience',

          expData,

          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
      }

      fetchExperiences();

      setOpenedExperience(false);

      setEditingExperienceId(null);

      setExpJobTitle('');

      setExpCompany('');

      setExpLocation('');

      setExpDescription('');

      setExpStartDate('');

      setExpEndDate('');

      setCurrentlyWorking(false);

    } catch (error) {

      console.log(error);
    }
  };

  const deleteExperience = async (
    id: number
  ) => {

    try {

      await axios.delete(

        `http://localhost:8080/api/profile/experience/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      fetchExperiences();

    }

    catch (error) {

      console.log(error);
    }
  };

  const fetchCertifications = async () => {

    try {

      const token =
        localStorage.getItem('token');

      const response = await fetch(

        'http://localhost:8080/api/profile/certifications',

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      setCertifications(data);

    } catch (error) {

      console.log(error);
    }
  };

  const addCertification = async () => {

    try {

      const certData = {

        title: certTitle,

        company: certCompany,

        issueDate: certIssueDate,

        certId: certId,
      };

      if (editingCertificationId) {

        await axios.put(

          `http://localhost:8080/api/profile/certifications/${editingCertificationId}`,

          certData,

          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

      } else {

        await axios.post(

          'http://localhost:8080/api/profile/certifications',

          certData,

          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
      }

      fetchCertifications();

      setOpenedCertification(false);

      setEditingCertificationId(null);

      setCertTitle('');

      setCertCompany('');

      setCertIssueDate('');

      setCertId('');

    } catch (error) {

      console.log(error);
    }
  };

  const deleteCertification = async (
    id: number
  ) => {

    try {

      await axios.delete(

        `http://localhost:8080/api/profile/certifications/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      fetchCertifications();

    }

    catch (error) {

      console.log(error);
    }
  };


  const getCompanyLogo = (
    companyName: string
  ) => {

    switch (
    companyName?.toLowerCase()
    ) {

      // case 'googleCloud':
      //   return googleCloudLogo;

      case 'microsoft':
        return microsoftLogo;

      case 'amazon':
        return amazonLogo;

      case 'meta':
        return metaLogo;

      default:
        return null;
    }
  };

  const sectionCardStyle = {

    background:
      darkMode
        ? 'rgba(43,45,49,0.92)'
        : 'rgba(255,255,255,0.94)',

    backdropFilter: 'blur(16px)',

    border:
      darkMode
        ? '1px solid rgba(255,255,255,0.05)'
        : '1px solid rgba(15,23,42,0.06)',

    borderRadius: '28px',

    padding: '32px',

    boxShadow:
      darkMode
        ? '0 10px 35px rgba(0,0,0,0.22)'
        : '0 10px 35px rgba(15,23,42,0.06)',
  };

  return (
    <>

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

          <Container size="xl" py={34}>

            <Flex
              align="flex-start"
              gap={28}
            >

              {/* TABLE OF CONTENTS */}

              <Box
                visibleFrom="md"
                style={{

                  width: 250,

                  position: 'sticky',

                  top: 100,

                  alignSelf: 'flex-start',
                }}
              >

                <Paper
                  p={24}

                  radius="24px"

                  style={{

                    background:
                      darkMode
                        ? 'rgba(43,45,49,0.88)'
                        : 'rgba(255,255,255,0.92)',

                    backdropFilter: 'blur(16px)',

                    border:
                      darkMode
                        ? '1px solid rgba(255,255,255,0.06)'
                        : '1px solid rgba(15,23,42,0.06)',

                    boxShadow:
                      darkMode
                        ? '0 10px 30px rgba(0,0,0,0.24)'
                        : '0 10px 30px rgba(15,23,42,0.06)',
                  }}
                >

                  <Text
                    fw={800}

                    size="18px"

                    mb={22}

                    c={
                      darkMode
                        ? '#f8f9fa'
                        : '#0f172a'
                    }
                  >
                    Profile Sections
                  </Text>

                  <Stack gap={12}>

                    {
                      [
                        {
                          label: 'Profile',
                          id: 'profile',
                          icon: <IconUser size={18} />,
                        },

                        {
                          label: 'Links',
                          id: 'links',
                          icon: <IconLink size={18} />,
                        },

                        {
                          label: 'About',
                          id: 'about',
                          icon: <IconFileText size={18} />,
                        },

                        {
                          label: 'Skills',
                          id: 'skills',
                          icon: <IconCode size={18} />,
                        },

                        {
                          label: 'Experience',
                          id: 'experience',
                          icon: <IconBriefcase size={18} />,
                        },

                        {
                          label: 'Certifications',
                          id: 'certifications',
                          icon: <IconCertificate size={18} />,
                        },
                      ].map((item) => (

                        <Button
                          key={item.id}

                          variant="subtle"

                          justify="flex-start"

                          radius="xl"

                          color="#10b1cf"

                          styles={{
                            root: {
                              height: 44,
                            },

                            label: {
                              fontWeight: 700,
                              fontSize: '14px',
                            },
                          }}

                          onClick={() => {

                            document
                              .getElementById(item.id)
                              ?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                              });
                          }}
                        >
                          <Group gap={10}>
                            {item.icon}

                            <Text
                              fw={600}
                              size="15px"
                            >
                              {item.label}
                            </Text>
                          </Group>
                        </Button>
                      ))
                    }

                  </Stack>

                </Paper>

              </Box>

              {/* MAIN CONTENT */}

              <Box style={{ flex: 1 }}>

                {/* HERO SECTION */}

                <Box id="profile">

                  {/* COVER */}

                  <Box
                    style={{
                      borderRadius: '32px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >

                    <Image
                      src={coverImage}
                      h={300}
                    />

                    <Box
                      style={{

                        position: 'absolute',

                        inset: 0,

                        background:
                          'linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.48))',
                      }}
                    />

                  </Box>

                  {/* PROFILE CARD */}

                  <Paper
                    radius="32px"

                    p={34}

                    mt={-90}

                    mx={28}

                    style={{

                      position: 'relative',

                      zIndex: 5,

                      background:
                        darkMode
                          ? 'rgba(43,45,49,0.94)'
                          : 'rgba(255,255,255,0.96)',

                      backdropFilter: 'blur(16px)',

                      border:
                        darkMode
                          ? '1px solid rgba(255,255,255,0.05)'
                          : '1px solid rgba(15,23,42,0.06)',

                      boxShadow:
                        darkMode
                          ? '0 12px 40px rgba(0,0,0,0.28)'
                          : '0 12px 40px rgba(15,23,42,0.08)',
                    }}
                  >

                    <Flex
                      justify="space-between"
                      align="flex-start"
                      wrap="wrap"
                      gap={30}
                    >

                      {/* LEFT */}

                      <Group
                        align="flex-start"
                        gap={26}
                      >

                        <Avatar
                          size={165}
                          radius={999}

                          style={{

                            border:
                              '5px solid rgba(16,177,207,0.22)',

                            background:
                              'linear-gradient(135deg, #cfaf10, #d7e90e)',

                            boxShadow:
                              '0 10px 35px rgba(207, 204, 16, 0.18)',
                          }}
                        >

                          <Image
                            src={adminAvatar}
                            fit="contain"
                            w="150%"
                            h="150%"
                          />

                        </Avatar>

                        <Box>

                          <Group gap={14}>

                            <Title
                              order={1}

                              style={{
                                fontSize: '40px',
                                letterSpacing: '-1.5px',
                              }}

                              c={
                                darkMode
                                  ? '#f8f9fa'
                                  : '#0f172a'
                              }
                            >
                              {
                                isDemo

                                  ? 'Smarthire'

                                  : `${user?.name}`
                              }
                            </Title>

                            <Badge
                              radius="xl"

                              size="lg"

                              color="#ff0000"

                              variant="light"
                            >
                              Admin
                            </Badge>

                          </Group>

                          {
                            editingProfile ? (

                              <Stack gap={14} mt={14}>

                                <TextInput
                                  value={jobTitle}
                                  onChange={(e) =>
                                    setJobTitle(e.target.value)
                                  }

                                  placeholder="Title"

                                  styles={{
                                    input: {

                                      backgroundColor:
                                        darkMode
                                          ? '#2c2e33'
                                          : '#ffffff',

                                      border:
                                        '1px solid rgba(16,177,207,0.18)',

                                      color:
                                        darkMode
                                          ? '#f8f9fa'
                                          : '#1e293b',

                                      borderRadius: 14,

                                      height: 46,

                                      fontSize: '16px',

                                      fontWeight: 600,
                                    },
                                  }}
                                />

                                <TextInput
                                  value={company}
                                  onChange={(e) =>
                                    setCompany(e.target.value)
                                  }

                                  placeholder="Company"

                                  styles={{
                                    input: {

                                      backgroundColor:
                                        darkMode
                                          ? '#2c2e33'
                                          : '#ffffff',

                                      border:
                                        '1px solid rgba(16,177,207,0.18)',

                                      color:
                                        darkMode
                                          ? '#f8f9fa'
                                          : '#1e293b',

                                      borderRadius: 14,

                                      height: 46,
                                    },
                                  }}
                                />

                                <Group grow>

                                  <TextInput
                                    value={location}
                                    onChange={(e) =>
                                      setLocation(e.target.value)
                                    }

                                    placeholder="Location"

                                    styles={{
                                      input: {

                                        backgroundColor:
                                          darkMode
                                            ? '#2c2e33'
                                            : '#ffffff',

                                        border:
                                          '1px solid rgba(16,177,207,0.18)',

                                        color:
                                          darkMode
                                            ? '#f8f9fa'
                                            : '#1e293b',

                                        borderRadius: 14,

                                        height: 46,
                                      },
                                    }}
                                  />

                                  <TextInput
                                    value={experience}
                                    onChange={(e) =>
                                      setExperience(e.target.value)
                                    }

                                    placeholder="Experience"

                                    styles={{
                                      input: {

                                        backgroundColor:
                                          darkMode
                                            ? '#2c2e33'
                                            : '#ffffff',

                                        border:
                                          '1px solid rgba(16,177,207,0.18)',

                                        color:
                                          darkMode
                                            ? '#f8f9fa'
                                            : '#1e293b',

                                        borderRadius: 14,

                                        height: 46,
                                      },
                                    }}
                                  />

                                </Group>

                              </Stack>

                            ) : (

                              <>

                                <Text
                                  mt={10}
                                  fw={700}
                                  size="22px"
                                  c="#cfaf10"
                                >
                                  {jobTitle || 'Enter Your Title'}
                                </Text>

                                <Text
                                  mt={4}
                                  size="16px"
                                  c="#94a3b8"
                                >
                                  {company || 'Enter Company Name'}
                                </Text>

                                <Group mt={24} gap={24}>

                                  <Group gap={8}>

                                    <IconMapPin
                                      size={18}
                                      color="#00b490"
                                    />

                                    <Text c="#94a3b8">
                                      {location || 'Enter Location'}
                                    </Text>

                                  </Group>

                                  <Group gap={8}>

                                    <IconBriefcase
                                      size={18}
                                      color="#00b490"
                                    />

                                    <Text c="#94a3b8">
                                      {experience || 'Experience in years'}
                                    </Text>

                                  </Group>

                                </Group>

                              </>
                            )
                          }
                        </Box>

                      </Group>

                      {/* RIGHT */}

                      <Group>

                        {
                          editingProfile && (

                            <ActionIcon
                              size="xl"
                              radius="xl"
                              variant="light"
                              color="#20cf10"

                              onClick={async () => {

                                await saveProfile();

                                setEditingProfile(false);
                              }}
                            >
                              <IconCheck size={24} />
                            </ActionIcon>
                          )
                        }

                        <Button
                          radius="xl"

                          variant="light"

                          size="md"

                          color={
                            editingProfile
                              ? '#ff2121'
                              : '#10b1cf'
                          }

                          leftSection={
                            editingProfile

                              ? <IconX size={18} />

                              : <IconEdit size={18} />
                          }

                          onClick={async () => {

                            // CANCEL EDITING

                            if (editingProfile) {

                              await fetchProfile();

                              setEditingProfile(false);

                              return;
                            }

                            // START EDITING

                            setEditingProfile(true);
                          }}
                        >

                          {
                            editingProfile
                              ? 'Cancel'
                              : 'Edit Profile'
                          }

                        </Button>

                      </Group>

                    </Flex>

                  </Paper>

                </Box>

                {/* LINKS */}

                <Paper
                  id="links"
                  style={sectionCardStyle}
                  mt={32}
                >

                  <Flex justify="space-between" align="center" mb={28}>

                    <Box>
                      <Group gap={14}>

                        <Box
                          style={{
                            width: 54,
                            height: 54,
                            borderRadius: '16px',
                            background:
                              'linear-gradient(135deg, rgba(16,177,207,0.18), rgba(16,177,207,0.08))',

                            border:
                              '1px solid rgba(16,177,207,0.18)',

                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >

                          <IconLink
                            size={28}
                            color="#10b1cf"
                          />

                        </Box>

                        <Title
                          order={2}
                          c={
                            darkMode
                              ? '#f8f9fa'
                              : '#0f172a'
                          }
                        >
                          Professional Links
                        </Title>
                      </Group>

                    </Box>

                    <Button
                      radius="xl"
                      variant='light'
                      color={
                        editingLinks
                          ? '#20cf10'
                          : '#10b1cf'
                      }
                      leftSection={
                        editingLinks
                          ? <IconCheck size={18} />
                          : <IconEdit size={18} />
                      }
                      onClick={async () => {

                        if (editingLinks) {

                          await saveProfile();
                        }

                        setEditingLinks(!editingLinks);
                      }}
                    >
                      {
                        editingLinks
                          ? 'Done'
                          : 'Edit Links'
                      }
                    </Button>

                  </Flex>

                  <SimpleGrid cols={{ base: 1, md: 2 }} spacing={20}>

                    <Paper
                      p={20}
                      radius="20px"
                      bg={darkMode ? '#2c2e33' : '#f8fafc'}
                    >

                      <Group gap={10} mb={10}>
                        <Box>
                          <IconBrandGithub
                            size={20}
                            color="#f8fafc"
                          />
                        </Box>
                        <Text fw={700} >
                          GitHub
                        </Text>
                      </Group>

                      {
                        editingLinks ? (

                          <TextInput
                            value={githubUrl}
                            onChange={(e) =>
                              setGithubUrl(e.target.value)
                            }
                            styles={{

                              input: {

                                backgroundColor:
                                  darkMode
                                    ? '#2c2e33'
                                    : '#ffffff',

                                border:
                                  '1px solid rgba(16,177,207,0.18)',

                                color:
                                  darkMode
                                    ? '#f8f9fa'
                                    : '#1e293b',

                                borderRadius: 14,

                                height: 44,

                                fontSize: '14px',
                              },

                              section: {
                                color: '#10b1cf',
                              },
                            }}
                          />

                        ) : (

                          <Text c="#10b1cf">
                            {
                              githubUrl ||
                              'Not Added'
                            }
                          </Text>
                        )
                      }

                    </Paper>

                    <Paper
                      p={20}
                      radius="20px"
                      bg={darkMode ? '#2c2e33' : '#f8fafc'}
                    >

                      <Group gap={10} mb={10}>
                        <Box>
                          <IconBrandLinkedin
                            size={20}
                            color="#f8fafc"
                          />
                        </Box>
                        <Text fw={700} >
                          LinkedIn
                        </Text>
                      </Group>

                      {
                        editingLinks ? (

                          <TextInput
                            value={linkedinUrl}
                            onChange={(e) =>
                              setLinkedinUrl(e.target.value)
                            }
                            styles={{

                              input: {

                                backgroundColor:
                                  darkMode
                                    ? '#2c2e33'
                                    : '#ffffff',

                                border:
                                  '1px solid rgba(16,177,207,0.18)',

                                color:
                                  darkMode
                                    ? '#f8f9fa'
                                    : '#1e293b',

                                borderRadius: 14,

                                height: 44,

                                fontSize: '14px',
                              },

                              section: {
                                color: '#10b1cf',
                              },
                            }}
                          />

                        ) : (

                          <Text c="#10b1cf">
                            {
                              linkedinUrl ||
                              'Not Added'
                            }
                          </Text>
                        )
                      }

                    </Paper>

                  </SimpleGrid>

                </Paper>

                {/* ABOUT */}

                <Paper
                  id="about"
                  style={sectionCardStyle}
                  mt={28}
                >

                  <Flex
                    justify="space-between"
                    align="flex-start"
                    mb={24}
                  >

                    <Group gap={14}>

                      <Box
                        style={{
                          width: 54,
                          height: 54,
                          borderRadius: '16px',
                          background:
                            'linear-gradient(135deg, rgba(16,177,207,0.18), rgba(16,177,207,0.08))',

                          border:
                            '1px solid rgba(16,177,207,0.18)',

                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >

                        <IconFileText
                          size={28}
                          color="#10b1cf"
                        />

                      </Box>

                      <Box>

                        <Title
                          order={2}
                          c={
                            darkMode
                              ? '#f8f9fa'
                              : '#1e293b'
                          }
                        >
                          About Me
                        </Title>

                        <Text
                          mt={4}
                          size="sm"
                          c="#94a3b8"
                        >
                          Introduce yourself professionally
                        </Text>

                      </Box>

                    </Group>

                    <Button
                      radius="xl"
                      variant="light"
                      color={
                        editingAbout
                          ? '#20cf10'
                          : '#10b1cf'
                      }

                      size="sm"

                      onClick={() => {

                        if (editingAbout) {
                          saveProfile();
                        }

                        setEditingAbout(
                          !editingAbout
                        );
                      }}
                    >

                      {
                        editingAbout

                          ? <IconCheck size={20} />

                          : <IconEdit size={20} />
                      } Edit About

                    </Button>

                  </Flex>

                  {

                    editingAbout ? (

                      <Textarea
                        value={about}

                        onChange={(e) =>
                          setAbout(e.target.value)
                        }

                        minRows={6}

                        placeholder="Admin about..."

                        styles={{

                          input: {

                            backgroundColor:

                              darkMode
                                ? '#2c2e33'
                                : '#ffffff',

                            border:
                              '1px solid rgba(16,177,207,0.12)',

                            color:

                              darkMode
                                ? '#f8f9fa'
                                : '#1e293b',

                            borderRadius: 20,

                            padding: 18,

                            lineHeight: 1.8,

                            fontSize: '15px',
                          },
                        }}
                      />

                    ) : (

                      <Paper
                        radius="24px"

                        p={28}

                        style={{

                          background:
                            darkMode
                              ? 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))'
                              : '#f8fafc',

                          border:
                            darkMode
                              ? '1px solid rgba(255,255,255,0.05)'
                              : '1px solid #e2e8f0',
                        }}
                      >

                        <Text
                          c={
                            darkMode
                              ? '#d1d5db'
                              : '#475569'
                          }

                          size="15px"

                          style={{
                            lineHeight: 2,
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {
                            about ||

                            'Add a professional summary to showcase your background, expertise, and career goals.'
                          }
                        </Text>

                      </Paper>
                    )
                  }

                </Paper>

                {/* SKILLS */}

                <Paper
                  id="skills"
                  style={sectionCardStyle}
                  mt={28}
                >

                  <Flex justify="space-between" align="center" mb={24}>
                    <Group gap={14}>

                      <Box
                        style={{
                          width: 54,
                          height: 54,
                          borderRadius: '16px',
                          background:
                            'linear-gradient(135deg, rgba(16,177,207,0.18), rgba(16,177,207,0.08))',

                          border:
                            '1px solid rgba(16,177,207,0.18)',

                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >

                        <IconSparklesFilled
                          size={28}
                          color="#10b1cf"
                        />

                      </Box>

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
                    </Group>

                    <Button
                      radius="xl"
                      variant='light'
                      color={
                        editingSkills
                          ? '#20cf10'
                          : '#10b1cf'
                      }
                      leftSection={
                        editingSkills
                          ? <IconCheck size={18} />
                          : <IconEdit size={18} />
                      }
                      onClick={() =>
                        setEditingSkills(!editingSkills)
                      }
                    >
                      {
                        editingSkills
                          ? 'Done'
                          : 'Edit Skills'
                      }
                    </Button>

                  </Flex>

                  <Group gap={12}>

                    {
                      skills.map((skill) => (

                        <Badge
                          key={skill.id}
                          radius="xl"
                          size="lg"

                          style={{
                            background:
                              'rgba(16,177,207,0.10)',

                            color: '#9ee7f5',

                            border:
                              '1px solid rgba(16,177,207,0.18)',

                            backdropFilter: 'blur(10px)',

                            paddingInline: 16,

                            height: 36,

                            fontWeight: 700,
                          }}

                          rightSection={
                            editingSkills && (
                              <ActionIcon
                                size="xs"
                                color="red"
                                variant="transparent"
                                onClick={() =>
                                  deleteSkill(skill.id)
                                }
                              >
                                <IconTrash size={12} />
                              </ActionIcon>
                            )
                          }
                        >
                          {skill.name}
                        </Badge>
                      ))
                    }

                  </Group>

                  {
                    editingSkills && (

                      <Group mt={24}>

                        <TextInput
                          placeholder="Add Skill"
                          value={skillInput}
                          onChange={(e) =>
                            setSkillInput(
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
                                '1px solid rgba(16,177,207,0.18)',

                              color:
                                darkMode
                                  ? '#f8f9fa'
                                  : '#1e293b',

                              borderRadius: 14,

                              height: 44,

                              fontSize: '14px',
                            },

                            section: {
                              color: '#10b1cf',
                            },
                          }}
                        />

                        <Button
                          radius="xl"
                          color="cyan"
                          leftSection={
                            <IconPlus size={18} />
                          }
                          onClick={addSkill}
                        >
                          Add
                        </Button>

                      </Group>
                    )
                  }

                </Paper>

                {/* EXPERIENCE */}

                <Paper
                  id="experience"
                  style={sectionCardStyle}
                  mt={28}
                >

                  <Flex justify="space-between" align="center" mb={28}>
                    <Group gap={14}>

                      <Box
                        style={{
                          width: 54,
                          height: 54,
                          borderRadius: '16px',
                          background:
                            'linear-gradient(135deg, rgba(16,177,207,0.18), rgba(16,177,207,0.08))',

                          border:
                            '1px solid rgba(16,177,207,0.18)',

                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >

                        <IconBriefcase
                          size={28}
                          color="#10b1cf"
                        />

                      </Box>

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
                    </Group>

                    <Button
                      radius="xl"
                      variant='light'
                      color="#10b1cf"
                      leftSection={
                        <IconPlus size={18} />
                      }
                      onClick={() =>
                        setOpenedExperience(true)
                      }
                    >
                      Add Experience
                    </Button>

                  </Flex>

                  <Stack gap={22}>

                    {
                      experiences.map((exp) => (

                        <Paper
                          key={exp.id}
                          p={24}
                          radius="24px"
                          bg={darkMode ? '#2c2e33' : '#f8fafc'}
                        >

                          <Flex justify="space-between">

                            <Box>

                              <Title order={4}>
                                {exp.jobTitle}
                              </Title>

                              <Group gap={10} mt={6} >
                                <Box>
                                  <IconBuildingSkyscraper
                                    size={16}
                                    color="#10b1cf"
                                  />
                                </Box>
                                <Text c="#10b1cf">
                                  {exp.company}
                                </Text>
                              </Group>


                              <Group gap={10} mt={4} >
                                <Box>
                                  <IconMapPin
                                    size={16}
                                    color="#becfd2"
                                  />
                                </Box>
                                <Text c="#becfd2">
                                  {exp.location}
                                </Text>
                              </Group>

                              <Text mt={14}>
                                {exp.description}
                              </Text>

                            </Box>

                            <Group
                              gap={10}
                              wrap="nowrap"
                            >

                              <ActionIcon
                                radius="xl"
                                color="#10b6cf"
                                variant="light"

                                onClick={() => {

                                  setEditingExperienceId(exp.id);

                                  setExpJobTitle(exp.jobTitle);

                                  setExpCompany(exp.company);

                                  setExpLocation(exp.location);

                                  setExpDescription(exp.description);

                                  setExpStartDate(exp.startDate);

                                  setExpEndDate(exp.endDate);

                                  setCurrentlyWorking(
                                    exp.currentlyWorking
                                  );

                                  setOpenedExperience(true);
                                }}
                              >
                                <IconEdit size={20} />
                              </ActionIcon>

                              <ActionIcon
                                radius="xl"
                                color="#ff2121"
                                variant="light"

                                onClick={() =>
                                  deleteExperience(exp.id)
                                }
                              >
                                <IconTrash size={20} />
                              </ActionIcon>

                            </Group>

                          </Flex>

                        </Paper>
                      ))
                    }

                  </Stack>

                </Paper>

                {/* CERTIFICATIONS */}

                <Paper
                  id="certifications"
                  style={sectionCardStyle}
                  mt={28}
                >

                  <Flex justify="space-between" align="center" mb={28}>

                    <Group gap={14}>

                      <Box
                        style={{
                          width: 54,
                          height: 54,
                          borderRadius: '16px',
                          background:
                            'linear-gradient(135deg, rgba(16,177,207,0.18), rgba(16,177,207,0.08))',

                          border:
                            '1px solid rgba(16,177,207,0.18)',

                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >

                        <IconCertificate
                          size={28}
                          color="#10b1cf"
                        />

                      </Box>

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
                    </Group>

                    <Button
                      radius="xl"
                      variant='light'
                      color="#10b1cf"
                      leftSection={
                        <IconPlus size={18} />
                      }
                      onClick={() =>
                        setOpenedCertification(true)
                      }
                    >
                      Add Certification
                    </Button>

                  </Flex>

                  <Stack gap={22}>

                    {
                      certifications.map((cert) => (

                        <Paper
                          key={cert.id}
                          p={24}
                          radius="24px"
                          bg={darkMode ? '#2c2e33' : '#f8fafc'}
                        >

                          <Flex justify="space-between">

                            <Box>

                              <Group gap={6} mt={6} >
                                <Box>
                                  <IconSubtitlesEdit
                                    size={20}
                                    color="#ecf5f7"
                                  />
                                </Box>
                                <Title order={3}>
                                  {cert.title}
                                </Title>
                              </Group>

                              <Group gap={6} mt={6} >
                                <Box>
                                  <IconSchool
                                    size={16}
                                    color="#10b1cf"
                                  />
                                </Box>
                                <Text c="#10b1cf">
                                  {cert.company}
                                </Text>
                              </Group>

                              <Text mt={6} c="#94a3b8">
                                Issued: {cert.issueDate}
                              </Text>

                              <Text mt={10}>
                                Credential ID:
                                {' '}
                                {cert.certId}
                              </Text>

                            </Box>

                            <Group>

                              <ActionIcon
                                radius="xl"
                                color="#10b1cf"
                                variant="light"

                                onClick={() => {

                                  setEditingCertificationId(cert.id);

                                  setCertTitle(cert.title);

                                  setCertCompany(cert.company);

                                  setCertIssueDate(cert.issueDate);

                                  setCertId(cert.certId);

                                  setOpenedCertification(true);
                                }}
                              >
                                <IconEdit size={20} />
                              </ActionIcon>

                              <ActionIcon
                                radius="xl"
                                color="#ff2121"
                                variant="light"

                                onClick={() =>
                                  deleteCertification(cert.id)
                                }
                              >
                                <IconTrash size={20} />
                              </ActionIcon>

                            </Group>

                          </Flex>

                        </Paper>
                      ))
                    }

                  </Stack>

                </Paper>

              </Box>

            </Flex>

          </Container>
        </Box>

      </motion.div >


      <Modal
        styles={{
          content: {
            backgroundColor:
              '#25262b',

            color: '#f8f9fa',

            border:
              '1px solid #343a40',
          },

          header: {
            backgroundColor:
              '#25262b',

            color: '#f8f9fa',
          },

          title: {
            color: '#f8f9fa',
            fontWeight: 700,
            fontSize: '24px',
          },

          close: {
            color: '#f8f9fa',
          },
        }}
        opened={openedExperience}

        onClose={() =>
          setOpenedExperience(false)
        }

        title={
          editingExperienceId
            ? 'Edit Experience'
            : 'Add Experience'
        }

        centered
      >

        <Stack>

          <TextInput
            styles={{
              input: {
                backgroundColor:
                  '#2c2e33',

                border:
                  '1px solid #495057',

                color: '#f8f9fa',
              },

              label: {
                color: '#f8f9fa',
              },
            }}
            label="Title"
            value={expJobTitle}
            onChange={(e) =>
              setExpJobTitle(
                e.target.value
              )
            }
          />

          <TextInput
            styles={{
              input: {
                backgroundColor:
                  '#2c2e33',

                border:
                  '1px solid #495057',

                color: '#f8f9fa',
              },

              label: {
                color: '#f8f9fa',
              },
            }}
            label="Company"
            value={expCompany}
            onChange={(e) =>
              setExpCompany(
                e.target.value
              )
            }
          />

          <TextInput
            styles={{
              input: {
                backgroundColor:
                  '#2c2e33',

                border:
                  '1px solid #495057',

                color: '#f8f9fa',
              },

              label: {
                color: '#f8f9fa',
              },
            }}
            label="Location"
            value={expLocation}
            onChange={(e) =>
              setExpLocation(
                e.target.value
              )
            }
          />

          <Textarea
            styles={{
              input: {
                backgroundColor:
                  '#2c2e33',

                border:
                  '1px solid #495057',

                color: '#f8f9fa',
              },

              label: {
                color: '#f8f9fa',
              },
            }}
            label="Description"
            value={expDescription}
            onChange={(e) =>
              setExpDescription(
                e.target.value
              )
            }
          />

          <SimpleGrid cols={2}>

            <TextInput
              styles={{
                input: {
                  backgroundColor:
                    '#2c2e33',

                  border:
                    '1px solid #495057',

                  color: '#f8f9fa',
                },

                label: {
                  color: '#f8f9fa',
                },
              }}
              label="Start Date"
              value={expStartDate}
              onChange={(e) =>
                setExpStartDate(
                  e.target.value
                )
              }
            />

            <TextInput
              styles={{
                input: {
                  backgroundColor:
                    '#2c2e33',

                  border:
                    '1px solid #495057',

                  color: '#f8f9fa',
                },

                label: {
                  color: '#f8f9fa',
                },
              }}
              label="End Date"
              value={expEndDate}
              onChange={(e) =>
                setExpEndDate(
                  e.target.value
                )
              }
            />

          </SimpleGrid>

          <Checkbox

            styles={{
              label: {
                color: '#f8f9fa',
              },
            }}
            label="Currently Working"

            checked={currentlyWorking}

            onChange={(e) =>
              setCurrentlyWorking(
                e.currentTarget.checked
              )
            }
          />

          <Button
            color="cyan"

            radius="md"

            styles={{
              root: {
                fontWeight: 700,
              },
            }}
            onClick={addExperience}
          >
            Save Experience
          </Button>

        </Stack>

      </Modal>

      <Modal
        styles={{
          content: {
            backgroundColor:
              '#25262b',

            color: '#f8f9fa',

            border:
              '1px solid #343a40',
          },

          header: {
            backgroundColor:
              '#25262b',

            color: '#f8f9fa',
          },

          title: {
            color: '#f8f9fa',
            fontWeight: 700,
            fontSize: '24px',
          },

          close: {
            color: '#f8f9fa',
          },
        }}
        opened={openedCertification}

        onClose={() =>
          setOpenedCertification(false)
        }

        title={
          editingCertificationId
            ? 'Edit Certification'
            : 'Add Certification'
        }

        centered
      >

        <Stack>

          <TextInput
            styles={{
              input: {
                backgroundColor:
                  '#2c2e33',

                border:
                  '1px solid #495057',

                color: '#f8f9fa',
              },

              label: {
                color: '#f8f9fa',
              },
            }}
            label="Title"
            value={certTitle}
            onChange={(e) =>
              setCertTitle(
                e.target.value
              )
            }
          />

          <TextInput
            styles={{
              input: {
                backgroundColor:
                  '#2c2e33',

                border:
                  '1px solid #495057',

                color: '#f8f9fa',
              },

              label: {
                color: '#f8f9fa',
              },
            }}
            label="Company"
            value={certCompany}
            onChange={(e) =>
              setCertCompany(
                e.target.value
              )
            }
          />

          <TextInput
            styles={{
              input: {
                backgroundColor:
                  '#2c2e33',

                border:
                  '1px solid #495057',

                color: '#f8f9fa',
              },

              label: {
                color: '#f8f9fa',
              },
            }}
            label="Issue Date"
            value={certIssueDate}
            onChange={(e) =>
              setCertIssueDate(
                e.target.value
              )
            }
          />

          <TextInput
            styles={{
              input: {
                backgroundColor:
                  '#2c2e33',

                border:
                  '1px solid #495057',

                color: '#f8f9fa',
              },

              label: {
                color: '#f8f9fa',
              },
            }}
            label="Certificate ID"
            value={certId}
            onChange={(e) =>
              setCertId(
                e.target.value
              )
            }
          />

          <Button
            color="cyan"

            radius="md"

            styles={{
              root: {
                fontWeight: 700,
              },
            }}
            onClick={addCertification}
          >
            Save Certification
          </Button>

        </Stack>

      </Modal>

    </>
  );
}

export default AdminProfile;