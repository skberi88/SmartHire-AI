import {
  createContext,
  useContext,
  useState,
} from 'react';

type UserRole =
  | 'GUEST'
  | 'APPLICANT'
  | 'EMPLOYER'
  | 'ADMIN';

type UserType = {
  name: string;
  email: string;
  accountType: UserRole;
};

type AuthContextType = {

  userRole: UserRole;

  user: UserType | null;

  isDemo: boolean;

  setIsDemo: (
    value: boolean
  ) => void;

  setUserRole: (
    role: UserRole
  ) => void;

  setUser: (
    user: UserType | null
  ) => void;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const storedUser =
    localStorage.getItem('user');

  const parsedUser =
    storedUser
      ? JSON.parse(storedUser)
      : null;

  const [userRole, setUserRole] =
    useState<UserRole>(
      parsedUser?.accountType || 'GUEST'
    );

  const [user, setUser] =
    useState<UserType | null>(
      parsedUser || null
    );

  const [isDemo, setIsDemo] =
    useState(false);

  return (

    <AuthContext.Provider
      value={{
        userRole,
        setUserRole,
        user,
        setUser,
        isDemo,
        setIsDemo,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
}