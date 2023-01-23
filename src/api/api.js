import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 1000,
});

const fetchAllPages = async (url) => {
    let results = [] 
    let page = 1
    let hasResult = true
    while (hasResult) {
        const response = await axiosInstance.get(`${url}?page=${page}`)
        if (response.data.length) {
            results = [...results, ...response.data]
            page++
        }
        else {
            hasResult = false
        }
    }
    return results
}

export const getGithubUser = async (searchTerm) => {
    const response = await axiosInstance.get(`search/users?q=${searchTerm}`)
    return response.data
}

export const getUserRepos = async (user) => {
    const response = await fetchAllPages(`users/${user}/repos`)
    return response
}

export const getRepoFiles = async (user, repo, file = '') => {
    const response = await axiosInstance.get(`repos/${user}/${repo}/contents/${file}`)
    return response.data
}
