import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Box, Button, Card, CardBody, FormControl, FormLabel, Heading, Input, Stack, Text, Container, HStack, Divider } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const MotionBox = motion(Box)
  return (
    <Box position="relative" overflow="hidden" minH="calc(100vh - 64px)" bgGradient="linear(to-b, white, mint.50)" py={{ base: 8, md: 16 }}>
      <MotionBox
        position="absolute"
        top="-60px"
        left="-60px"
        w="260px"
        h="260px"
        bgGradient="radial(accent.200, transparent 70%)"
        borderRadius="full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <MotionBox
        position="absolute"
        bottom="-80px"
        right="-80px"
        w="320px"
        h="320px"
        bgGradient="radial(brand.200, transparent 70%)"
        borderRadius="full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <Container maxW="lg" position="relative">
        <Stack spacing={6} align="center" mb={4}>
          <Heading size="xl" textAlign="center" color="brand.700">
            Welcome back
          </Heading>
          <Text color="gray.600" textAlign="center">
            Sign in to manage your appointments and profile
          </Text>
        </Stack>
        {/** Card with subtle entrance animation */}
        {motion && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardBody>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                    </FormControl>
                    {error && <Text color="red.500">{error}</Text>}
                    <Button type="submit" variant="solid" isLoading={loading} size="md" bg="accent.500" _hover={{ bg: 'accent.600' }}>
                      Continue
                    </Button>
                  </Stack>
                </form>
                <HStack my={6}>
                  <Divider />
                  <Text fontSize="sm" color="gray.500">or</Text>
                  <Divider />
                </HStack>
                <Stack spacing={2} align="center">
                  <Text fontSize="sm" color="gray.600">
                    Don’t have an account?
                  </Text>
                  <Button as="a" href="/register" variant="outline" size="sm" borderColor="accent.500" color="accent.600" _hover={{ bg: 'accent.50' }}>
                    Create an account
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </Container>
    </Box>
  )
}


