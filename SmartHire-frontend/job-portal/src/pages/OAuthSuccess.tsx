import {
  useEffect,
} from 'react';

import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import {
  Loader,
  Center,
  Stack,
  Text,
} from '@mantine/core';

import {
  useAuth,
} from '../context/AuthContext';

function OAuthSuccess() {

  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const {
    setUser,
    setUserRole,
  } = useAuth();

  useEffect(() => {

    const token =
      searchParams.get('token');

    const name =
      searchParams.get('name');

    const email =
      searchParams.get('email');

    const role =
      searchParams.get('role');

    // NO TOKEN

    if (!token) {

      navigate('/login');

      return;
    }

    // SAVE TOKEN

    localStorage.setItem(
      'token',
      token
    );


    const userRole =
      (
        role as
        | 'APPLICANT'
        | 'EMPLOYER'
        | 'ADMIN'
      ) || 'APPLICANT';

    // SAVE USER

    localStorage.setItem(
      'user',
      JSON.stringify({
        name,
        email,
        accountType: role,
      })
    );
    
    setUser({
      name: name || '',
      email: email || '',
      accountType: userRole,
    });

    // SAVE ROLE

    setUserRole(userRole);

    // REDIRECT HOME

    setTimeout(() => {

      navigate('/');

    }, 1500);

  }, []);

  return (

    <Center
      h="100vh"

      bg="#1a1b1e"
    >

      <Stack
        align="center"
      >

        <Loader
          color="#10b1cf"
          size="lg"
        />

        <Text
          c="#f8f9fa"

          size="lg"

          fw={600}
        >
          Signing you in...
        </Text>

      </Stack>

    </Center>
  );
}

export default OAuthSuccess;