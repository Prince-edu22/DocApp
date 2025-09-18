import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Card, CardBody, Heading, Stack, Text, Container, Badge, HStack, VStack, Center } from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

export default function MyAppointments() {
  const [list, setList] = useState([])

  useEffect(() => {
    const run = async () => {
      const res = await axios.get('/api/appointments/me')
      setList(res.data)
    }
    run()
  }, [])

  const cancel = async (id) => {
    await axios.post(`/api/appointments/${id}/cancel`)
    setList((prev) => prev.map((a) => a._id === id ? { ...a, status: 'cancelled' } : a))
  }

  const hasItems = Array.isArray(list) && list.length > 0
  return (
    <Box position="relative" overflow="hidden" bgGradient="linear(to-b, white, mint.50)" py={{ base: 8, md: 12 }}>
      <Container maxW="3xl" position="relative">
        <Heading size="lg" mb={4}>My Appointments</Heading>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {hasItems ? (
            <Stack spacing={3}>
              {list.map((a) => (
                <Card key={a._id} _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }} transition="all 0.2s">
                  <CardBody>
                    <HStack justify="space-between" align="center" mb={1}>
                      <HStack>
                        <CalendarIcon color="brand.500" />
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium">{new Date(a.date).toLocaleDateString()} — {a.slot}</Text>
                          <Text fontSize="sm" color="gray.600">with {a.doctor?.name}</Text>
                        </VStack>
                      </HStack>
                      <Badge colorScheme={a.status === 'booked' ? 'green' : a.status === 'cancelled' ? 'red' : 'blue'}>{a.status}</Badge>
                    </HStack>
                    {a.status === 'booked' && <Button mt={2} size="sm" onClick={() => cancel(a._id)} variant="outline">Cancel</Button>}
                  </CardBody>
                </Card>
              ))}
            </Stack>
          ) : (
            <Center py={16}>
              <VStack spacing={3}>
                <CalendarIcon boxSize={8} color="gray.400" />
                <Heading size="md">No appointments yet</Heading>
                <Text color="gray.600">Book your first appointment to see it here.</Text>
                <Button as="a" href="/doctors" bg="accent.500" _hover={{ bg: 'accent.600' }} size="sm">Browse doctors</Button>
              </VStack>
            </Center>
          )}
        </motion.div>
      </Container>
    </Box>
  )
}


