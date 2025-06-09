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
      <div class="mb-8">
        <button @click="$router.back()"
          class="dragon-button px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2">
          ⬅️ Volver al Explorador
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="text-center py-20">
        <div class="loading-orb mx-auto mb-6"></div>
        <p class="text-orange-600 text-xl font-bold">Explorando planeta...</p>
        <p class="text-gray-600">Obteniendo información detallada...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <div class="text-6xl mb-4">💥</div>
        <div class="text-red-500 text-xl mb-4 font-bold">Error al cargar el planeta</div>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <button @click="refresh" class="dragon-button px-8 py-3 rounded-xl relative z-10">
          🔄 Reintentar
        </button>
      </div>

      <!-- Detalle del Planeta -->
      <div v-else-if="planeta" class="max-w-6xl mx-auto">
        <!-- Header del planeta -->
        <div class="text-center mb-12">
          <h1
            class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 mb-4 animate-pulse">
            🪐 {{ planeta.name }} 🪐
          </h1>
          <div class="inline-flex items-center gap-2">
            <span :class="planeta.isDestroyed ? 'bg-red-500' : 'bg-green-500'"
              class="px-4 py-2 rounded-full text-white font-bold">
              {{ planeta.isDestroyed ? '💥 Planeta Destruido' : '🌍 Planeta Existente' }}
            </span>
          </div>
        </div>

        <!-- Contenido principal -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <!-- Imagen del planeta -->
          <div class="space-y-6">
            <div class="planet-card rounded-xl overflow-hidden shadow-2xl">
              <img :src="planeta.image || '/placeholder-planet.jpg'" :alt="planeta.name"
                class="w-full h-96 object-cover" @error="handleImageError">
            </div>
          </div>

          <!-- Información del planeta -->
          <div class="space-y-6 bg-white rounded-xl shadow-lg p-6">
            <div class="filter-panel rounded-xl p-6">
              <h2 class="text-2xl font-bold text-orange-500 mb-4 flex items-center">
                📊 Información General
              </h2>

              <div class="space-y-4">
                <div class="flex justify-between items-center py-2 border-b border-orange-200">
                  <span class="text-blue-400 font-semibold">🌟 ID del Planeta:</span>
                  <span class="text-gray-700">{{ planeta.id }}</span>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-orange-200">
                  <span class="text-purple-400 font-semibold">💫 Estado:</span>
                  <span :class="planeta.isDestroyed ? 'text-red-500' : 'text-green-500'" class="font-bold">
                    {{ planeta.isDestroyed ? '💥 Destruido' : '🌍 Existente' }}
                  </span>
                </div>

                <div v-if="planeta.characters && planeta.characters.length > 0" class="py-2">
                  <span class="text-orange-500 font-semibold block mb-2">👥 Personajes Conocidos:</span>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="character in planeta.characters.slice(0, 5)" :key="character.id || character.name"
                      class="bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-sm">
                      {{ character.name || character }}
                    </span>
                    <span v-if="planeta.characters.length > 5"
                      class="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-sm">
                      +{{ planeta.characters.length - 5 }} más
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Descripción -->
            <div v-if="planeta.description" class="filter-panel rounded-xl p-6">
              <h2 class="text-2xl font-bold text-orange-500 mb-4 flex items-center">
                📋 Descripción
              </h2>
              <p class="text-gray-600 leading-relaxed text-lg">
                {{ planeta.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Información adicional -->
        <div v-if="planeta.characters && planeta.characters.length > 0" class="filter-panel rounded-xl p-6 bg-white shadow-lg">
          <h2 class="text-2xl font-bold text-orange-500 mb-6 flex items-center">
            🌟 Todos los Personajes de {{ planeta.name }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div v-for="character in planeta.characters" :key="character.id || character.name"
              class="bg-amber-50 shadow-lg hover:bg-orange-100 transition-colors rounded-lg p-4 cursor-pointer transform hover:scale-105"
              @click="viewCharacter(character)">
              <div class="flex items-center gap-3">
                <div
                  class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-lg">
                    {{ (character.name || character).charAt(0) }}
                  </span>
                </div>
                <div>
                  <h3 class="text-gray-800 font-semibold">{{ character.name || character }}</h3>
                  <p v-if="character.race" class="text-gray-600 text-sm">{{ character.race }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Acciones -->
        <div class="text-center mt-12">
          <div class="flex justify-center gap-4">
            <button @click="$router.back()" class="dragon-button px-8 py-3 rounded-xl font-bold">
              🚀 Continuar Explorando
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Composables
const { getPlaneta } = usePlanetas()
const route = useRoute()
const router = useRouter()

// Obtener datos del planeta
const { data: planeta, pending, error, refresh } = await useLazyAsyncData(
  `planeta-${route.params.id}`,
  () => getPlaneta(route.params.id)
)

// Métodos
const handleImageError = (event) => {
  event.target.src = '/placeholder-planet.jpg'
}

const viewCharacter = (character) => {
  if (character.id) {
    // Si tiene ID, navegar a la página del personaje
    navigateTo(`/personaje/${character.id}`)
  }
}

const sharePlanet = async () => {
  if (navigator.share && planeta.value) {
    try {
      await navigator.share({
        title: `Dragon Ball - ${planeta.value.name}`,
        text: `Descubre el planeta ${planeta.value.name} en el universo Dragon Ball`,
        url: window.location.href
      })
    } catch (error) {
      // Fallback: copiar URL al portapapeles
      await navigator.clipboard.writeText(window.location.href)
      useNuxtApp().$toast?.success('URL copiada al portapapeles')
    }
  } else if (planeta.value) {
    // Fallback: copiar URL al portapapeles
    await navigator.clipboard.writeText(window.location.href)
    useNuxtApp().$toast?.success('URL copiada al portapapeles')
  }
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

/* Cards de planetas */
.planet-card {
  border: 2px solid transparent;
  background-clip: padding-box;
}

.planet-card:hover {
  border-color: rgba(255, 107, 53, 0.3);
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