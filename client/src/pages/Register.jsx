import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Box, Button, Card, CardBody, FormControl, FormLabel, Heading, Input, Select, Stack, Text, Container, HStack, Divider } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('patient')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register({ name, email, password, role })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const MotionBox = motion(Box)
  return (
    <Box position="relative" overflow="hidden" minH="calc(100vh - 64px)" bgGradient="linear(to-b, white, mint.50)" py={{ base: 8, md: 16 }}>
      <MotionBox
        position="absolute"
        top="-70px"
        right="-70px"
        w="280px"
        h="280px"
        bgGradient="radial(accent.200, transparent 70%)"
        borderRadius="full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <MotionBox
        position="absolute"
        bottom="-90px"
        left="-90px"
        w="340px"
        h="340px"
        bgGradient="radial(brand.200, transparent 70%)"
        borderRadius="full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <Container maxW="lg" position="relative">
        <Stack spacing={6} align="center" mb={4}>
          <Heading size="xl" textAlign="center" color="brand.700">Create account</Heading>
          <Text color="gray.600" textAlign="center">Join DocApp and start booking in minutes</Text>
        </Stack>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Select value={role} onChange={(e) => setRole(e.target.value)}>
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                    </Select>
                  </FormControl>
                  {error && <Text color="red.500">{error}</Text>}
                  <Button type="submit" isLoading={loading} bg="accent.500" _hover={{ bg: 'accent.600' }}>
                    Sign up
                  </Button>
                </Stack>
              </form>
              <HStack my={6}>
                <Divider />
                <Text fontSize="sm" color="gray.500">or</Text>
                <Divider />
              </HStack>
              <Stack spacing={2} align="center">
                <Text fontSize="sm" color="gray.600">Already have an account?</Text>
                <Button as="a" href="/login" variant="outline" size="sm" borderColor="accent.500" color="accent.600" _hover={{ bg: 'accent.50' }}>
                  Sign in
                </Button>
              </Stack>
            </CardBody>
          </Card>
        </motion.div>
      </Container>
    </Box>
  )
}


