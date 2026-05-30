import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import {
  AnimatePresence,
} from 'framer-motion';

import Header from './components/Header';

import Footer from './components/Footer';

import HomePage from './pages/HomePage';

import LoginPage from './pages/LoginPage';

import RegisterPage from './pages/RegisterPage';

import AboutPage from './pages/AboutPage';

import ApplicantProfile from './pages/profiles/ApplicantProfile';

import EmployerProfile from './pages/profiles/EmployerProfile';

import AdminProfile from './pages/profiles/AdminProfile';

import OAuthSuccess from './pages/OAuthSuccess';

import PostJobsPage from './pages/PostJobsPage';

import FindJobsPage from './pages/FindJobsPage';

import ApplyJobPage from './pages/ApplyJobPage';

import JobHistoryPage from './pages/JobHistoryPage';

import PostedJobsPage from './pages/PostedJobsPage';

import FindTalentPage from './pages/FindTalentPage';

import {
  useTheme,
} from './context/ThemeContext';

function App() {

  const location =
    useLocation();

  const { darkMode } =
    useTheme();

  return (

    <div

      style={{

        minHeight: '100vh',

        backgroundColor:

          darkMode

            ? '#25262b'

            : '#edf6fb',

        color:

          darkMode

            ? '#f8f9fa'

            : '#1e293b',

        transition:
          '0.25s',
      }}
    >

      <AnimatePresence mode="sync">

        <Routes
          location={location}
          key={location.pathname}
        >

          {/* HOME */}

          <Route
            path="/"

            element={
              <>
                <Header />
                <HomePage />
              </>
            }
          />

          {/* ABOUT */}

          <Route
            path="/about-us"

            element={
              <>
                <Header />
                <AboutPage />
                <Footer />
              </>
            }
          />

          {/* APPLICANT */}

          <Route
            path="/applicant"

            element={
              <>
                <ApplicantProfile />
                <Footer />
              </>
            }
          />

          {/* EMPLOYER */}

          <Route
            path="/employer"

            element={
              <>
                <EmployerProfile />
                <Footer />
              </>
            }
          />

          {/* ADMIN */}

          <Route
            path="/admin"

            element={
              <>
                <AdminProfile />
                <Footer />
              </>
            }
          />

          {/* LOGIN */}

          <Route
            path="/login"

            element={
              <LoginPage />
            }
          />

          {/* REGISTER */}

          <Route
            path="/register"

            element={
              <RegisterPage />
            }
          />

          {/* OAUTH */}

          <Route
            path="/oauth-success"

            element={
              <OAuthSuccess />
            }
          />

          {/* PostJobs */}
          <Route
            path="/post-jobs"
            element={
              <>
                <PostJobsPage />
                <Footer />
              </>
            }
          />

          {/* PostedJobs */}
          <Route
            path="/posted-jobs"
            element={
              <>
                <PostedJobsPage />
                <Footer />
              </>
            }
          />

          {/* FindJobs */}
          <Route
            path="/find-jobs"
            element={
              <>
                <FindJobsPage />
                <Footer />
              </>
            }
          />

          {/* ApplyJob */}
          <Route
            path="/apply-job/:jobId"
            element={
              <>
                <ApplyJobPage />
                <Footer />
              </>
            }
          />


          {/* JobHistory */}
          <Route
            path="/job-history"
            element={
              <>
                <JobHistoryPage />
                <Footer />
              </>
            }
          />

          {/* FindTalent */}
          <Route
            path="/find-talent"
            element={
              <>
                <FindTalentPage />
                <Footer />
              </>
            }
          />


        </Routes>

      </AnimatePresence>

    </div>
  );
}

export default App;