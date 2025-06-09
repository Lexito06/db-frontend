// composables/usePlanetas.js
export const usePlanetas = () => {
  const config = useRuntimeConfig()
   
  // URL base de la API de Dragon Ball
  const baseURL = 'http://127.0.0.1:8000/api'
 
  /**
   * Obtener lista de planetas con filtros y paginación
   */
  const getPlanetas = async (filters = {}, page = 1) => {
    try {
      // Construir URL con parámetros
      let url = `${baseURL}/planetas?page=${page}`
           
      // Agregar filtros si existen
      Object.entries(filters).forEach(([key, value]) => {
        // Para isDestroyed, permitir tanto 0 como 1
        if (key === 'isDestroyed' && (value === 0 || value === 1 || value === '0' || value === '1')) {
          url += `&${key}=${encodeURIComponent(value)}`
        }
        // Para otros filtros, verificar que existan y no estén vacíos
        else if (key !== 'isDestroyed' && value && value.toString().trim() !== '') {
          url += `&${key}=${encodeURIComponent(value)}`
        }
      })

      console.log('URL de solicitud:', url) // Para debugging
       
      const response = await $fetch(url)
           
      // Transformar respuesta para que coincida con el formato esperado
      return {
        data: response.data || [], // Los datos de los planetas están en `response.data`
        meta: {
          currentPage: response.current_page || page, // Página actual
          totalPages: response.last_page || Math.ceil((response.total || 0) / (response.per_page || 12)), // Total de páginas
          totalItems: response.total || 0, // Total de elementos
          itemsPerPage: response.per_page || 12 // Elementos por página
        }
      }
    } catch (error) {
      console.error('Error fetching planetas:', error)
      throw error
    }
  }
 
  /**
   * Obtener un planeta específico por ID
   */
  const getPlaneta = async (id) => {
    try {
      const response = await $fetch(`${baseURL}/planetas/${id}`)
      return response
    } catch (error) {
      console.error('Error fetching planeta:', error)
      throw error
    }
  }
 
  /**
   * Crear un nuevo planeta (si la API lo permite)
   */
  const createPlaneta = async (planeta) => {
    try {
      const response = await $fetch(`${baseURL}/planetas`, {
        method: 'POST',
        body: planeta
      })
      return response
    } catch (error) {
      console.error('Error creating planeta:', error)
      throw error
    }
  }
 
  /**
   * Actualizar un planeta existente (si la API lo permite)
   */
  const updatePlaneta = async (id, planeta) => {
    try {
      const response = await $fetch(`${baseURL}/planetas/${id}`, {
        method: 'PUT',
        body: planeta
      })
      return response
    } catch (error) {
      console.error('Error updating planeta:', error)
      throw error
    }
  }
 
  /**
   * Eliminar un planeta (si la API lo permite)
   */
  const deletePlaneta = async (id) => {
    try {
      const response = await $fetch(`${baseURL}/planetas/${id}`, {
        method: 'DELETE'
      })
      return response
    } catch (error) {
      console.error('Error deleting planeta:', error)
      throw error
    }
  }
 
  /**
   * Buscar planetas por nombre
   */
  const searchPlanetas = async (query) => {
    try {
      const response = await $fetch(`${baseURL}/planetas?name=${encodeURIComponent(query)}`)
      return response.items || response || []
    } catch (error) {
      console.error('Error searching planetas:', error)
      throw error
    }
  }
 
  return {
    getPlanetas,
    getPlaneta,
    createPlaneta,
    updatePlaneta,
    deletePlaneta,
    searchPlanetas
  }
}