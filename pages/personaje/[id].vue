<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-10 left-10 w-20 h-20 bg-orange-400 rounded-full animate-pulse"></div>
      <div class="absolute top-32 right-20 w-16 h-16 bg-yellow-400 rounded-full animate-bounce"></div>
      <div class="absolute bottom-20 left-32 w-12 h-12 bg-red-400 rounded-full animate-pulse"></div>
      <div class="absolute bottom-40 right-40 w-24 h-24 bg-orange-300 rounded-full animate-bounce"></div>
    </div>
    <div class="container mx-auto px-4 py-8 relative z-10">
      <!-- Botón de regreso -->
      <div class="mb-6">
        <button @click="$router.back()" class="dragon-button flex items-center gap-2 px-6 py-3 rounded-xl font-bold">
          ⬅️ Volver al Explorador
        </button>
      </div>
      <!-- Loading -->
      <div v-if="pending" class="text-center py-12">
        <div class="loading-orb mx-auto mb-6"></div>
        <p class="text-orange-600 text-xl font-bold">Cargando personaje...</p>
      </div>
      <!-- Error -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-500 text-xl mb-4">
          {{ error.data?.message || 'Error al cargar el personaje' }}
        </div>
        <button @click="refresh" class="dragon-button px-8 py-3 rounded-xl font-bold">
          🔄 Reintentar
        </button>
      </div>
      <!-- Contenido del personaje -->
      <div v-else-if="personaje" class="max-w-6xl mx-auto">
        <!-- Header con imagen y datos básicos -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div class="md:flex">
            <!-- Imagen -->
            <div class="md:w-1/2 bg-gray-50 flex items-center justify-center">
              <img :src="personaje.image || '/placeholder-character.jpg'" :alt="personaje.name"
                class="w-full h-96 object-contain" @error="handleImageError">
            </div>
            <!-- Información básica -->
            <div class="md:w-1/2 p-8">
              <div class="flex justify-between items-start mb-4">
                <h1 class="text-4xl font-bold text-orange-500">{{ personaje.name }}</h1>
                <div class="flex gap-2">
                  <button @click="editPersonaje"
                    class="dragon-button px-4 py-2 rounded hover:scale-105 transition-transform">
                    Editar
                  </button>
                  <button @click="confirmDelete"
                    class="dragon-button px-4 py-2 rounded hover:scale-105 transition-transform">
                    Eliminar
                  </button>
                </div>
              </div>
              <!-- Información principal -->
              <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div>
                  <h3 class="font-semibold text-gray-700 mb-3">Información Básica</h3>
                  <div class="space-y-2">
                    <p><span class="font-medium">Raza:</span> {{ personaje.race || 'Desconocida' }}</p>
                    <p><span class="font-medium">Género:</span> {{ personaje.gender || 'Desconocido' }}</p>
                    <p v-if="personaje.affiliation">
                      <span class="font-medium">Afiliación:</span>
                      <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm ml-2">
                        {{ personaje.affiliation }}
                      </span>
                    </p>
                    <p v-if="personaje.originPlanet">
                      <span class="font-medium">Planeta de origen:</span> {{ personaje.originPlanet['name'] }}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-700 mb-3">Poder</h3>
                  <div class="space-y-2">
                    <p><span class="font-medium">Ki:</span>
                      <span class="text-blue-600 font-semibold">{{ personaje.ki || 'N/A' }}</span>
                    </p>
                    <p><span class="font-medium">Ki Máximo:</span>
                      <span class="text-purple-600 font-semibold">{{ personaje.maxKi || 'N/A' }}</span>
                    </p>
                  </div>
                  <!-- Barra de poder visual -->
                  <div v-if="personaje.ki && personaje.maxKi" class="mt-4">
                    <div class="w-full bg-gray-200 rounded-full h-3">
                      <div
                        class="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                        :style="{ width: getPowerPercentage() + '%' }"></div>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">
                      Poder actual: 
                      {{
                        isNaN(getPowerPercentage()) 
                          ? 'desconocido' 
                          : getPowerPercentage().toFixed(1) + '%'
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Descripción -->
        <div v-if="personaje.description" class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Descripción</h2>
          <p class="text-gray-700 leading-relaxed">{{ personaje.description }}</p>
        </div>
        
        <!-- Transformaciones -->
        <div v-if="personaje.transformations && personaje.transformations.length > 0"
          class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Transformaciones</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="(transformation, index) in getTransformationsList()" :key="index"
              class="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-lg border-l-4 border-orange-500 hover:bg-orange-100 transition-colors flex flex-col items-center">
              <h4 class="font-semibold text-gray-800 mb-3">{{ transformation.name }}</h4>
              <div v-if="transformation.image" class="w-full flex justify-center">
                <img :src="transformation.image" 
                     :alt="transformation.name" 
                     class="h-48 w-auto object-contain rounded">
              </div>
            </div>
          </div>
        </div>
        
        <!-- Información adicional -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Técnicas -->
          <div v-if="personaje.techniques && personaje.techniques.length > 0" class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Técnicas</h3>
            <div class="space-y-2">
              <span v-for="(technique, index) in getTechniquesList()" :key="index"
                class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                {{ technique }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <footer class="mt-12 text-center">
          <button @click="$router.back()" class="dragon-button px-8 py-3 rounded-xl font-bold">
            🚀 Volver al Explorador
          </button>
        </footer>
      </div>
    </div>
  </div>
  
  <footer class="bg-gray-800 text-white py-12">
    <div class="container mx-auto px-4 text-center">
        <h3 class="text-2xl font-bold mb-4">Dragon Ball API</h3>
        <p class="text-gray-400 mb-6">
            La base de datos más completa del universo Dragon Ball
        </p>
        <div class="flex justify-center space-x-6">
            <a href="https://github.com/Lexito06" target="_blank" class="text-gray-400 hover:text-white transition-colors">GitHub</a>
            <a href="http://127.0.0.1:8000/api/documentation" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">Documentación</a>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-700">
            <p class="text-gray-500 text-sm">
                © 2024 Dragon Ball API. Todos los derechos reservados.
            </p>
        </div>
    </div>
  </footer>
</template>

<script setup>
// Composables
const route = useRoute()
const router = useRouter()
const { getPersonaje, deletePersonaje } = usePersonajes()

// Estado reactivo
const showDeleteModal = ref(false)
const showEditModal = ref(false)

// Obtener datos del personaje
const { data: personaje, pending, error, refresh } = await useLazyAsyncData(
  `personaje-${route.params.id}`,
  () => getPersonaje(route.params.id),
  {
    key: `personaje-${route.params.id}`
  }
)

// Métodos
const handleImageError = (event) => {
  event.target.src = '/placeholder-character.jpg'
}

const formatNumber = (number) => {
  if (!number) return null
  return parseInt(number).toLocaleString()
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getPowerPercentage = () => {
  if (!personaje.value?.ki || !personaje.value?.maxKi) return 0
  return (parseInt(personaje.value.ki) / parseInt(personaje.value.maxKi)) * 100 
}

const getTransformationsList = () => {
  if (!personaje.value?.transformations) return []
  // Si transformations es un string, lo parseamos
  if (typeof personaje.value.transformations === 'string') {
    try {
      return JSON.parse(personaje.value.transformations)
    } catch (e) {
      // Si no es JSON válido, lo tratamos como una lista separada por comas
      return personaje.value.transformations.split(',').map(t => ({ name: t.trim() }))
    }
  }
  // Si ya es un array, lo devolvemos
  return personaje.value.transformations
}

const getTechniquesList = () => {
  if (!personaje.value?.techniques) return []
  // Si techniques es un string, lo parseamos
  if (typeof personaje.value.techniques === 'string') {
    try {
      const parsed = JSON.parse(personaje.value.techniques)
      return Array.isArray(parsed) ? parsed : [parsed]
    } catch (e) {
      // Si no es JSON válido, lo tratamos como una lista separada por comas
      return personaje.value.techniques.split(',').map(t => t.trim())
    }
  }
  // Si ya es un array, lo devolvemos
  return personaje.value.techniques
}

const editPersonaje = () => {
  showEditModal.value = true
}

const confirmDelete = () => {
  showDeleteModal.value = true
}

const handleDelete = async () => {
  try {
    await deletePersonaje(personaje.value.id)
    showDeleteModal.value = false
    // Mostrar notificación de éxito
    useNuxtApp().$toast?.success('Personaje eliminado correctamente')
    // Redirigir al listado
    await router.push('/')
  } catch (error) {
    console.error('Error al eliminar personaje:', error)
    useNuxtApp().$toast?.error('Error al eliminar el personaje')
    showDeleteModal.value = false
  }
}

const handlePersonajeUpdated = () => {
  showEditModal.value = false
  refresh()
  useNuxtApp().$toast?.success('Personaje actualizado correctamente')
}

// Validar que el ID sea válido
if (!route.params.id) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Personaje no encontrado'
  })
}

// SEO dinámico
watchEffect(() => {
  if (personaje.value) {
    useHead({
      title: `${personaje.value.name} - Dragon Ball Personajes`,
      meta: [
        {
          name: 'description',
          content: `Información detallada sobre ${personaje.value.name}, personaje de Dragon Ball. Raza: ${personaje.value.race || 'Desconocida'}, Ki: ${personaje.value.ki || 'N/A'}`
        },
        { property: 'og:title', content: `${personaje.value.name} - Dragon Ball` },
        { property: 'og:description', content: `Descubre todo sobre ${personaje.value.name}` },
        { property: 'og:image', content: personaje.value.image || '/placeholder-character.jpg' }
      ]
    })
  }
})

// Manejar errores 404
if (process.client && error.value?.statusCode === 404) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Personaje no encontrado'
  })
}
</script>

<style scoped>
/* Animaciones personalizadas */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Botón principal estilo Dragon Ball */
.dragon-button {
  background: linear-gradient(45deg, #ff6b35, #f7931e, #ffd700);
  background-size: 200% 200%;
  border: none;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 15px rgba(255, 107, 53, 0.4);
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.dragon-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease;
}

.dragon-button:hover::before {
  width: 300px;
  height: 300px;
}

.dragon-button:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 25px rgba(255, 107, 53, 0.6);
}

/* Loading spinner */
.loading-orb {
  width: 80px;
  height: 80px;
  border: 4px solid #fed7aa;
  border-top: 4px solid #ff6b35;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>