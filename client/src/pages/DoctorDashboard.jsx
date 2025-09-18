import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Card, CardBody, FormControl, FormLabel, Heading, Input, Stack, Text, Textarea } from '@chakra-ui/react'

export default function DoctorDashboard() {
  const [profile, setProfile] = useState(null)
  const [specialty, setSpecialty] = useState('')
  const [bio, setBio] = useState('')
  const [clinicName, setClinicName] = useState('')
  const [location, setLocation] = useState('')
  const [fee, setFee] = useState('')
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const run = async () => {
      try {
        const p = await axios.get('/api/doctors/me')
        setProfile(p.data)
        if (p.data) {
          setSpecialty(p.data.specialty || '')
          setBio(p.data.bio || '')
          setClinicName(p.data.clinicName || '')
          setLocation(p.data.location || '')
          setFee(typeof p.data.fee === 'number' ? String(p.data.fee) : '')
        }
      } catch {}
      try {
        const a = await axios.get('/api/appointments/doctor/me')
        setAppointments(a.data)
      } catch {}
    }
    run()
  }, [])

  const save = async (e) => {
    e.preventDefault()
    const numericFee = fee === '' ? 0 : Number(fee)
    const res = await axios.post('/api/doctors/me', { specialty, bio, clinicName, location, fee: numericFee })
    setProfile(res.data)
  }

  return (
    <Box>
      <Heading size="lg" mb={4}>Doctor Dashboard</Heading>
      <Card mb={6}>
        <CardBody>
          <form onSubmit={save}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Specialty</FormLabel>
                <Input value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Clinic Name</FormLabel>
                <Input value={clinicName} onChange={(e) => setClinicName(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Fee</FormLabel>
                <Input type="number" value={fee} onChange={(e) => setFee(e.target.value)} placeholder="e.g. 500" />
              </FormControl>
              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
              </FormControl>
              <Button type="submit" colorScheme="blue">Save Profile</Button>
            </Stack>
          </form>
        </CardBody>
      </Card>

      <Heading size="md" mb={3}>Upcoming Appointments</Heading>
      <Stack spacing={3}>
        {appointments.map((a) => (
          <Card key={a._id}>
            <CardBody>
              <Text>{new Date(a.date).toLocaleString()} — {a.slot} — with {a.patient?.name}</Text>
            </CardBody>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}


