import { Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css'

import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Doctors from './pages/Doctors.jsx'
import Book from './pages/Book.jsx'
import MyAppointments from './pages/MyAppointments.jsx'
import DoctorDashboard from './pages/DoctorDashboard.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { Box, Button, Container, Flex, HStack, Heading, Spacer, Stack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

function PrivateRoute({ children, roles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

function Nav() {
  const { user, logout } = useAuth()
  return (
    <Box borderBottom="1px" borderColor="gray.200" bg="white" position="sticky" top="0" zIndex="10">
      <Container maxW="6xl" py={3}>
        <Flex align="center">
          <Heading size="md" color="brand.600">Doc<Text as="span" color="accent.500">App</Text></Heading>
          <HStack spacing={4} ml={6}>
            <Link to="/">Home</Link>
            <Link to="/doctors">Doctors</Link>
            {user?.role === 'patient' && <Link to="/appointments">My Appointments</Link>}
            {user?.role === 'doctor' && <Link to="/doctor">Doctor</Link>}
          </HStack>
          <Spacer />
          <HStack>
            {!user && <Button as={Link} to="/login" size="sm" colorScheme="blue" variant="outline">Login</Button>}
            {!user && <Button as={Link} to="/register" size="sm" colorScheme="blue">Sign up</Button>}
            {user && <Button size="sm" onClick={logout}>Logout</Button>}
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

const MotionBox = motion(Box)

function Home() {
  return (
    <Box bgGradient="linear(to-b, white, mint.50)" borderRadius="lg" mt={6} overflow="hidden">
      <Container maxW="6xl" py={{ base: 10, md: 16 }}>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={8} align="center">
          <Box flex="1">
            <Heading as="h1" size="2xl" lineHeight="1.2" mb={4}>
              Book trusted doctors in minutes
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={6}>
              Search specialists, compare profiles, and secure an appointment that fits your schedule.
            </Text>
            <HStack spacing={3}>
              <Button as={Link} to="/doctors" variant="solid" size="lg" bg="accent.500" _hover={{ bg: 'accent.600' }}>
                Browse doctors
              </Button>
              <Button as={Link} to="/register" size="lg" variant="outline">
                Create account
              </Button>
            </HStack>
          </Box>
          <Box flex="1" display={{ base: 'none', md: 'block' }} position="relative">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              bg="white"
              borderRadius="lg"
              boxShadow="xl"
              p={8}
              minH="260px"
            >
              <Heading size="md" mb={2}>Why DocApp?</Heading>
              <Text color="gray.600">• Verified doctors across specialties</Text>
              <Text color="gray.600">• Simple booking and reminders</Text>
              <Text color="gray.600">• Manage appointments in one place</Text>
            </MotionBox>
            <MotionBox
              position="absolute"
              top="-40px"
              right="-40px"
              w="220px"
              h="220px"
              bgGradient="radial(accent.200, transparent 70%)"
              borderRadius="full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

function App() {
  return (
    <AuthProvider>
      <Nav />
      <Container maxW="6xl" py={6}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route
            path="/book/:doctorId"
            element={
              <PrivateRoute roles={[ 'patient' ]}>
                <Book />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <PrivateRoute roles={[ 'patient' ]}>
                <MyAppointments />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <PrivateRoute roles={[ 'doctor' ]}>
                <DoctorDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </AuthProvider>
  )
}

export default App
