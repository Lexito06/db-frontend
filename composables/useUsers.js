export const useApi = () => {
    const config = useRuntimeConfig()

    const apiFetch = async (url, options = {}) => {
        const token = useCookie('auth-token')

        return await $fetch(url, {
            baseURL: config.public.apiBase,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...(token.value && { Authorization: `Bearer ${token.value}` }),
                ...options.headers
            },
            credentials: 'include',
            ...options
        })
    }

    return { apiFetch }
}

/* 
const { apiFetch } = useApi()
const user = await apiFetch('/api/user')
*/