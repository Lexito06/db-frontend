// composables/usePersonajes.js
export const usePersonajes = () => {
  const { apiFetch } = useApi()

  // Obtener personajes con filtros y paginación
  const getPersonajes = async (filters = {}, page = 1) => {
    try {
      const params = new URLSearchParams()

      // Agregar página
      params.append('page', page)

      // Agregar filtros si existen
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          if (Array.isArray(value)) {
            // Para arrays como originPlanet y transformations
            value.forEach(item => params.append(`${key}[]`, item))
          } else {
            params.append(key, value)
          }
        }
      })

      const queryString = params.toString()
      const url = queryString ? `/personajes?${queryString}` : '/personajes'

      const response = await apiFetch(url)

      return {
        data: response.data || [], // Los datos de los planetas están en `response.data`
        meta: {
          currentPage: response.current_page || page, // Página actual
          totalPages: response.last_page || Math.ceil((response.total || 0) / (response.per_page || 10)), // Total de páginas
          totalItems: response.total || 0, // Total de elementos
          itemsPerPage: response.per_page || 10 // Elementos por página
        }
      }
    } catch (error) {
      throw error
    }
  }

  // Obtener un personaje específico
  const getPersonaje = async (id) => {
    try {
      return await apiFetch(`/personajes/${id}`)
    } catch (error) {
      throw error
    }
  }

  // Crear un nuevo personaje
  const createPersonaje = async (personajeData) => {
    try {
      return await apiFetch('/personajes', {
        method: 'POST',
        body: personajeData
      })
    } catch (error) {
      throw error
    }
  }

  // Actualizar un personaje existente
  const updatePersonaje = async (id, personajeData) => {
    try {
      return await apiFetch(`/personajes/${id}`, {
        method: 'PUT',
        body: personajeData
      })
    } catch (error) {
      throw error
    }
  }

  // Eliminar un personaje
  const deletePersonaje = async (id) => {
    try {
      return await apiFetch(`/personajes/${id}`, {
        method: 'DELETE'
      })
    } catch (error) {
      throw error
    }
  }

  // Búsqueda avanzada con múltiples filtros
  const searchPersonajes = async (searchFilters) => {
    try {
      return await getPersonajes(searchFilters, 1)
    } catch (error) {
      throw error
    }
  }

  return {
    getPersonajes,
    getPersonaje,
    createPersonaje,
    updatePersonaje,
    deletePersonaje,
    searchPersonajes
  }
}