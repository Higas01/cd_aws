import fastify from 'fastify'
import { faker } from "@faker-js/faker"

const server = fastify()

await server.register(
  async (instance) => {
    instance.get('/health', async () => 'API is Running!')
    instance.get('/users', async () => {
        const users = Array.from({ length: 10 }, () => ({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar()
        }))
        return users
    })
  },
  { prefix: '/api' }
)

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

