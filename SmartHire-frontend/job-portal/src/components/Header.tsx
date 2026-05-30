// // import React from 'react';

// // const Header: React.FC = () => {
// //   return (
// //     <header className="header">
// //       <div className="header__brand">SmartHire</div>
// //       <nav className="header__nav">
// //         <a href="/" className="header__link">Home</a>
// //         <a href="/jobs" className="header__link">Jobs</a>
// //         <a href="/about" className="header__link">About</a>
// //       </nav>
// //       <div className="header__actions">
// //         <button className="header__button">Sign In</button>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;

// import {
//   Group,
//   Button,
//   Container,
//   Text,
// } from '@mantine/core';
// import { IconAiGateway } from '@tabler/icons-react';

// function Header() {
//   return (
//     <header
//       style={{
//         borderBottom: '1px solid #e9ecef',
//         padding: '16px 0',
//         backgroundColor: 'white',
//       }}
//     >
//       <Container size="lg">
//         {/* Main Header Layout */}
//         <Group justify="space-between">
//         {/* Left Section */}
//             <Group gap="xs">


//           {/* Brand */}
//           <IconAiGateway size={32} color="#228be6"/>
//           <Text
//             size="xl"
//             fw={700}
//             c="blue"
//           >
//             SmartHire
//           </Text>
//             </Group>

//           {/* Navigation */}
//           <Group gap="lg">
//             <a href="/" style={linkStyle}>
//               Home
//             </a>

//             {/* <a href="/jobs" style={linkStyle}>
//               Jobs
//             </a> */}

//             <a href="/about" style={linkStyle}>
//               About
//             </a>
//           </Group>

//           {/* Actions */}
//           <Button radius="md">
//             Sign In
//           </Button>

//         </Group>
//       </Container>
//     </header>
//   );
// }

// const linkStyle = {
//   textDecoration: 'none',
//   color: '#495057',
//   fontWeight: 500,
// };

// export default Header;

import adminAvatar from '../assets/admin.png';
import employerAvatar from '../assets/employer.png';
import applicantAvatar from '../assets/applicant.png';
import { Image } from '@mantine/core';
import { Link, Navigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Header.css';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import {
  useTheme,
} from '../context/ThemeContext';


import {
  Group,
  Button,
  Container,
  Text,
  Avatar,
  ActionIcon,
  Menu,
  Switch
} from '@mantine/core';

import {
  IconAiAgents,
  IconBell,
  IconLogout,
  IconUser
} from '@tabler/icons-react';

function Header() {
  const navigate = useNavigate();
  const {
    darkMode,
    toggleTheme,
  } = useTheme();

  /*
    Possible roles:
    GUEST
    APPLICANT
    EMPLOYER
    ADMIN
  */
  // const userRole = 'GUEST'; // Change this to test different roles
  const {
    userRole,
    user,
    isDemo,
    setUserRole,
    setUser,
    setIsDemo,
  } = useAuth();

  // NAVIGATION LINKS
  const navLinks = {
    GUEST: ['Home', 'About Us'],

    APPLICANT: [
      'Find Jobs',
      'Job History',
    ],

    EMPLOYER: [
      'Find Talent',
      'Post Jobs',
      'Posted Jobs',
    ],

    ADMIN: [
      'Find Jobs',
      'Find Talent',
      'Post Jobs',
      'Posted Jobs',
      'Job History',
    ],
  };

  return (
    <header
      style={{
        borderBottom: '1px solid #343a40',
        padding: '16px 0',
        backgroundColor:

          darkMode

            ? '#25262b'

            : '#edf6fb',
      }}
    >
      <Container size="lg">

        <Group justify="space-between">

          {/* LEFT SECTION */}

          <Group
            gap="xs"

            onClick={() => navigate('/')}

            style={{
              cursor: 'pointer',
            }}
          >

            <IconAiAgents
              size={38}
              color="#10b1cf"
            />

            <Text
              style={{
                fontSize: '24px',
              }}

              fw={700}
              c="#10b1cf"
            >
              SmartHire AI
            </Text>

          </Group>

          {/* MIDDLE SECTION */}

          <Group gap="xs">

            {navLinks[userRole].map((link) => {

              const path =
                link === 'Home'
                  ? '/'
                  : '/' + link.toLowerCase().replace(/\s+/g, '-');

              return (

                <NavLink
                  key={link}
                  to={path}

                  className={({ isActive }) =>
                    isActive
                      ? 'nav-link active'
                      : 'nav-link'
                  }

                  end={link === 'Home'}
                >
                  {link}

                </NavLink>

              );
            })}

          </Group>

          {/* RIGHT SECTION */}

          {userRole === 'GUEST' ? (

            <Button
              component={Link}
              to="/login"
              className="login-btn"
              radius="md"
              variant="transparent"
              style={{ fontSize: '18px' }}
            >
              Login / Sign Up
            </Button>

          ) : (

            <Group gap="md">

              {/* Notifications */}
              <ActionIcon
                variant="light"
                size="lg"
                radius="xl"
              >
                <IconBell size={20} />
              </ActionIcon>

              {/* Username */}

              <Text
                fw={500}
                c="#ced4da"
              >
                {user?.name}
              </Text>
              {/* Avatar */}
              <Menu
                shadow="md"
                width={240}
                position="bottom-end"
                offset={12}
              >

                <Menu.Target>

                  <Image
                    src={
                      userRole === 'APPLICANT'
                        ? applicantAvatar

                        : userRole === 'EMPLOYER'
                          ? employerAvatar

                          : adminAvatar
                    }

                    w={40}
                    h={40}
                    radius="md"

                    style={{
                      cursor: 'pointer',
                      backgroundColor: '#343a40',
                      border: '2px solid #10b1cf',
                      objectFit: 'cover',
                    }}
                  />

                </Menu.Target>

                <Menu.Dropdown
                  style={{
                    backgroundColor:

                      darkMode

                        ? '#2c2e33'

                        : '#ffffff',
                    border: '1px solid #495057',
                    color: 'white',
                    hover: {
                      fontColor: '#495057',
                    },
                  }}
                >

                  <Menu.Label
                    style={{
                      color: '#adb5bd',
                    }}
                  >
                    {userRole}
                  </Menu.Label>

                  <Menu.Item

                    leftSection={
                      <IconUser size={18} />
                    }
                    styles={{
                      item: {

                        color: '#adb5bd',

                        transition: 'all 0.2s ease',
                      },

                      itemLabel: {
                        color: '#adb5bd',
                      },

                      itemSection: {
                        color: '#adb5bd',
                      },
                    }}

                    onClick={() => {

                      if (userRole === 'APPLICANT') {

                        navigate(
                          '/applicant'
                        );
                      }

                      else if (userRole === 'EMPLOYER') {

                        navigate(
                          '/employer'
                        );
                      }

                      else if (userRole === 'ADMIN') {

                        navigate(
                          '/admin'
                        );
                      }
                    }}
                    className="menu-item"
                  >
                    Profile
                  </Menu.Item>

                  <Menu.Item
                    leftSection={
                      <IconUser size={18} />
                    }

                    styles={{
                      item: {

                        color: '#adb5bd',

                        transition: 'all 0.2s ease',
                      },

                      itemLabel: {
                        color: '#adb5bd',
                      },

                      itemSection: {
                        color: '#adb5bd',
                      },
                    }}

                    className="menu-item"
                  >
                    Messages
                  </Menu.Item>

                  <Menu.Item
                    leftSection={
                      <IconUser size={18} />
                    }

                    styles={{
                      item: {

                        color: '#adb5bd',

                        transition: 'all 0.2s ease',
                      },

                      itemLabel: {
                        color: '#adb5bd',
                      },

                      itemSection: {
                        color: '#adb5bd',
                      },
                    }}

                    className="menu-item"
                  >
                    Resume
                  </Menu.Item>

                  <Menu.Item
                    leftSection={
                      <IconUser size={18} />
                    }

                    styles={{
                      item: {

                        color: '#adb5bd',

                        transition: 'all 0.2s ease',
                      },

                      itemLabel: {
                        color: '#adb5bd',
                      },

                      itemSection: {
                        color: '#adb5bd',
                      },
                    }}

                    className="menu-item"
                    rightSection={
                      <Switch
                        size="sm"

                        color="cyan"

                        checked={darkMode}

                        onChange={toggleTheme}
                      />
                    }
                  >
                    Dark Mode
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Item

                    color="red"

                    leftSection={
                      <IconLogout size={18} />
                    }

                    onClick={() => {

                      localStorage.removeItem('token');

                      localStorage.removeItem('user');

                      setUserRole('GUEST');

                      setUser(null);

                      setIsDemo(false);

                      navigate('/');
                    }}
                  >
                    Logout
                  </Menu.Item>

                </Menu.Dropdown>

              </Menu>

            </Group>

          )}

        </Group>

      </Container>
    </header>
  );
}

const linkStyle = {
  textDecoration: 'none',
  color: '#495057',
  fontWeight: 500,
};

export default Header;