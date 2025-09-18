import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, Card, CardBody, Grid, GridItem, Heading, HStack, Input, Stack, Text, Avatar, Badge, InputGroup, InputLeftElement, Divider } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export default function Doctors() {
  const [q, setQ] = useState('')
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        const res = await axios.get('/api/doctors', { params: q ? { q } : {} })
        setList(res.data)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [q])

  return (
    <Box>
      <HStack mb={4} align="center">
        <Heading size="md" flexShrink={0}>Find Doctors</Heading>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input placeholder="Search by name, specialty, clinic or city" value={q} onChange={(e) => setQ(e.target.value)} />
        </InputGroup>
      </HStack>
      {loading ? <Text>Loading...</Text> : (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
          {list.map((d) => {
            const doctorId = (d.user && d.user._id) ? d.user._id : d.user
            const name = d.user?.name || 'Doctor'
            const specialty = d.specialty || 'General'
            const clinic = d.clinicName || 'Clinic'
            const location = d.location || '—'
            const fee = typeof d.fee === 'number' ? d.fee : null
            return (
              <GridItem key={d._id}>
                <Card _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }} transition="all 0.2s">
                  <CardBody>
                    <HStack align="flex-start" spacing={4}>
                      <Avatar name={name} size="lg" />
                      <Box flex="1">
                        <HStack justify="space-between" align="baseline">
                          <Heading size="md">{name}</Heading>
                          {fee !== null && (
                            <Badge colorScheme="green" borderRadius="md">{fee === 0 ? 'Free' : `₹${fee}`}</Badge>
                          )}
                        </HStack>
                        <HStack mt={1} spacing={2} wrap="wrap">
                          <Badge colorScheme="blue">{specialty}</Badge>
                          {clinic && <Badge variant="subtle" colorScheme="purple">{clinic}</Badge>}
                        </HStack>
                        <Text mt={2} color="gray.600">{location}</Text>
                        <Divider my={3} />
                        <HStack>
                          <Button as={Link} to={`/book/${doctorId}`} size="sm" bg="accent.500" _hover={{ bg: 'accent.600' }}>
                            Book appointment
                          </Button>
                          <Button as={Link} to={`/doctors`} size="sm" variant="outline">
                            View details
                          </Button>
                        </HStack>
                      </Box>
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
            )
          })}
        </Grid>
      )}
    </Box>
  )
}


