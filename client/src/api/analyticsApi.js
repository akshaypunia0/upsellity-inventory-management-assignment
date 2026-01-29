import axios from "axios";

const API_BASE_URL = 'http://localhost:4000/api/analytics';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
    'Content-Type': 'application/json',
  },
})


const analytics = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        throw error;
    }
}

export { analytics };