import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 1000,
});

export const getGithubUser = async (searchTerm) => {
    const result = await axiosInstance.get(`search/users?q=${searchTerm}`)
    return result.data
}

export const getUserRepos = async (user, page) => {
    if(! page) {
        page = 1
    }
    const result =  await axiosInstance.get(`users/${user}/repos?page=${page}`)
    return result.data
}
