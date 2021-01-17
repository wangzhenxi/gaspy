import { getPort } from '../lib'

test('adds 1 + 2 to equal 3', async () => {
  const port = await getPort()
  expect(port).toBeGreaterThanOrEqual(3000)
  expect(port).toBeLessThanOrEqual(2 ** 6)
})
