export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie('auth-token')

  const apiFetch = $fetch.create({
    baseURL: 'https://api.tuservidor.com', // Cambia esto por tu URL real
    headers: token.value
      ? { Authorization: `Bearer ${token.value}` }
      : {},
    onRequest({ options }) {
      // Esto se ejecuta antes de cada request
      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`
        }
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        return navigateTo('/login')
      }
    }
  })

  // Inyectamos el cliente como `$apiFetch`
  return {
    provide: {
      apiFetch
    }
  }
})
