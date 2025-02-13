const BASE_URL = 'your-api-url'

export const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    return response.json()
  },
  // Add more API methods as needed
} 