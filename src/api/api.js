import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 1000,
});

export default async (searchTerm) => {
    const result = await axiosInstance.get(`search/users?q=${searchTerm}`)
    return result.data
}