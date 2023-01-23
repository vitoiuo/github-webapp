function later(data) {
    return new Promise(function(resolve) {
        setTimeout(() => {
            resolve(data)
        }, 1000);
    });
}

export const getGithubUser = async (searchTerm) => {
    const result = {
       items: [
        { login: 'tonylampkins' }
       ]
    }
    return later(result)
}

export const getUserRepos = async (user) => {
    const results =  [
        { name: 'tonylampkinsrepo', owrner:'tonylampkins' },
        { name: 'viujs', owner: 'tonylampkins' }
    ]
    return later(results)
}