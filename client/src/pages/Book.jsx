import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, Card, CardBody, FormControl, FormLabel, Heading, Input, Select, Stack, Text, Textarea, HStack, Avatar, Badge, Container, Divider } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export default function Book() {
  const { doctorId } = useParams()
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState(null)
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('09:00')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      try {
        const res = await axios.get('/api/doctors', { params: { q: '' } })
        const found = res.data.find((d) => {
          const id = (d.user && d.user._id) ? d.user._id : d.user
          return String(id) === String(doctorId)
        })
        setDoctor(found || null)
      } catch {}
    }
    run()
  }, [doctorId])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await axios.post('/api/appointments', { doctorId, date, slot, notes })
      navigate('/appointments')
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed')
    }
  }

  const MotionBox = motion(Box)
  return (
    <Box position="relative" overflow="hidden" bgGradient="linear(to-b, white, mint.50)" py={{ base: 8, md: 12 }}>
      <Container maxW="3xl" position="relative">
        <Heading size="lg" mb={4}>Book Appointment</Heading>
        {doctor && (
          <Card mb={4}>
            <CardBody>
              <HStack spacing={4} align="flex-start">
                <Avatar name={doctor.user?.name} />
                <Box flex="1">
                  <HStack justify="space-between" align="baseline">
                    <Text fontWeight="bold">{doctor.user?.name}</Text>
                    {typeof doctor.fee === 'number' && (
                      <Badge colorScheme="green" borderRadius="md">{doctor.fee === 0 ? 'Free' : `₹${doctor.fee}`}</Badge>
                    )}
                  </HStack>
                  <HStack mt={1} spacing={2} wrap="wrap">
                    <Badge colorScheme="blue">{doctor.specialty || 'General'}</Badge>
                    {doctor.clinicName && <Badge variant="subtle" colorScheme="purple">{doctor.clinicName}</Badge>}
                  </HStack>
                  {doctor.location && <Text mt={1} color="gray.600">{doctor.location}</Text>}
                </Box>
              </HStack>
            </CardBody>
          </Card>
        )}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardBody>
              <form onSubmit={submit}>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Date</FormLabel>
                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Time</FormLabel>
                    <Select value={slot} onChange={(e) => setSlot(e.target.value)}>
                      {['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Notes</FormLabel>
                    <Textarea placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
                  </FormControl>
                  {error && <Text color="red.500">{error}</Text>}
                  <HStack>
                    <Button type="submit" bg="accent.500" _hover={{ bg: 'accent.600' }}>Confirm booking</Button>
                    <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                  </HStack>
                </Stack>
              </form>
            </CardBody>
          </Card>
        </motion.div>
      </Container>
      <MotionBox
        position="absolute"
        top="-100px"
        right="-80px"
        w="320px"
        h="320px"
        bgGradient="radial(accent.200, transparent 70%)"
        borderRadius="full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
    </Box>
  )
}


