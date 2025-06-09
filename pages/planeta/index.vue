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
                    ⬅️ Volver
                </button>
            </div>
            <!-- Header -->
            <div class="text-center mb-12">
                <h1
                    class="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 mb-4 animate-pulse">
                    DRAGON BALL
                </h1>
                <h2 class="text-3xl font-bold text-gray-800 mb-2">Explorador de Planetas</h2>
                <p class="text-gray-600 text-lg">Descubre los mundos del universo Dragon Ball</p>
            </div>

            <!-- Panel de Filtros -->
            <div class="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-orange-100">
                <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    🌍 Filtros de Búsqueda
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <input v-model="filters.name" type="text" placeholder="🔍 Buscar planeta..."
                        class="p-3 border-2 border-orange-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all">
                    <select v-model="filters.isDestroyed"
                        class="p-3 border-2 border-orange-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all">
                        <option value="">💫 Estado del planeta</option>
                        <option value="false">🌍 Existente</option>
                        <option value="true">💥 Destruido</option>
                    </select>
                    <div class="flex gap-2">
                        <button @click="applyFilters" class="dragon-button px-6 py-3 rounded-xl flex-1">
                            🚀 Explorar
                        </button>
                        <button @click="clearFilters"
                            class="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 transform hover:scale-105">
                            🔄 Reset
                        </button>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="pending" class="text-center py-20">
                <div class="loading-orb mx-auto mb-6"></div>
                <p class="text-orange-600 text-xl font-bold">Explorando el universo...</p>
                <p class="text-gray-600">Buscando planetas lejanos...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-20">
                <div class="text-6xl mb-4">💥</div>
                <div class="text-red-500 text-xl mb-4 font-bold">Error en la exploración</div>
                <p class="text-gray-600 mb-6">{{ error }}</p>
                <button @click="refresh" class="dragon-button px-8 py-3 rounded-xl">
                    🔄 Reintentar Exploración
                </button>
            </div>

            <!-- Planetas Grid -->
            <div v-else-if="planetas.length > 0"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                <div v-for="planeta in planetas" :key="planeta.id"
                    class="planet-card group relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                    <!-- Hover Effect Overlay -->
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                    </div>

                    <div class="relative">
                        <img :src="planeta.image || '/placeholder-planet.jpg'" :alt="planeta.name"
                            class="w-full h-48 object-cover" @error="handleImageError">
                        <div class="absolute top-2 right-2">
                            <span
                                :class="planeta.isDestroyed == true || planeta.isDestroyed == 1 ? 'bg-red-500' : 'bg-green-500'"
                                class="px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                                {{ planeta.isDestroyed == true || planeta.isDestroyed == 1 ? '💥 Destruido' :
                                    '🌍 Existente' }}
                            </span>
                        </div>
                    </div>

                    <div class="relative p-6">
                        <h3 class="text-xl font-bold text-gray-800 mb-3 flex items-center">
                            🪐 {{ planeta.name }}
                        </h3>

                        <div class="space-y-2 mb-4">
                            <p class="text-gray-600 text-sm">
                                <span class="text-orange-500 font-semibold">🌟 ID:</span> {{ planeta.id }}
                            </p>
                            <p v-if="planeta.description" class="text-gray-600 text-sm">
                                <span class="text-red-500 font-semibold">📋 Descripción:</span>
                                {{ planeta.description.length > 100 ? planeta.description.substring(0, 100) + '...' :
                                    planeta.description }}
                            </p>
                        </div>

                        <div class="flex gap-2">
                            <button @click="viewPlaneta(planeta.id)"
                                class="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                👁️ Explorar
                            </button>
                        </div>
                    </div>

                    <!-- Bottom gradient line -->
                    <div
                        class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300">
                    </div>
                </div>
            </div>

            <!-- No results -->
            <div v-else-if="!pending" class="text-center py-20">
                <div class="text-6xl mb-4">🔍</div>
                <h3 class="text-2xl font-bold text-gray-800 mb-4">No se encontraron planetas</h3>
                <p class="text-gray-600 mb-6">Intenta ajustar los filtros de búsqueda</p>
                <button @click="clearFilters" class="dragon-button px-8 py-3 rounded-xl">
                    🔄 Limpiar Filtros
                </button>
            </div>

            <!-- Paginación -->
            <div v-if="pagination && pagination.totalPages > 1 && !pending"
                class="flex justify-center items-center space-x-4 mt-12">
                <button @click="goToPage(pagination.currentPage - 1)" :disabled="pagination.currentPage <= 1"
                    class="pagination-btn px-6 py-3 rounded-xl font-semibold">
                    ⬅️ Anterior
                </button>

                <div class="flex space-x-2">
                    <button v-for="page in getVisiblePages()" :key="page" @click="goToPage(page)"
                        :class="page === pagination.currentPage ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl' : 'pagination-btn'"
                        class="px-4 py-3 rounded-xl font-semibold min-w-12 transition-all duration-300 transform hover:scale-105">
                        {{ page }}
                    </button>
                </div>

                <button @click="goToPage(pagination.currentPage + 1)"
                    :disabled="pagination.currentPage >= pagination.totalPages"
                    class="pagination-btn px-6 py-3 rounded-xl font-semibold">
                    Siguiente ➡️
                </button>
            </div>
        </div>

        <!-- Footer -->
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
    </div>
</template>

<script setup>
// Composables
const { getPlanetas } = usePlanetas()

// Estado reactivo
const filters = ref({
    name: '',
    isDestroyed: ''
})

const currentPage = ref(1)
const activeFilters = ref({})

// Datos de planetas usando useLazyAsyncData
const { data: planetasData, pending, error, refresh } = await useLazyAsyncData(
    'planetas',
    () => getPlanetas(activeFilters.value, currentPage.value),
    {
        watch: [currentPage, activeFilters],
        default: () => ({ data: [], meta: {} })
    }
)

const planetas = computed(() => planetasData.value?.data || [])
const pagination = computed(() => planetasData.value?.meta || null)

// Métodos
// En tu script setup de la página, reemplaza la función applyFilters con esta:
const applyFilters = () => {
    const cleanFilters = {};
    Object.entries(filters.value).forEach(([key, value]) => {
        if (key === 'isDestroyed') {
            // Para isDestroyed, solo agregar si hay un valor seleccionado
            if (value === 'true' || value === 'false') {
                cleanFilters[key] = value === 'true' ? 1 : 0;
            }
        } else if (value && value.toString().trim() !== '') {
            // Para otros filtros, verificar que existan y no estén vacíos
            cleanFilters[key] = value.toString().trim();
        }
    });
    
    console.log('Filtros aplicados:', cleanFilters); // Para debugging
    activeFilters.value = cleanFilters;
    currentPage.value = 1;
};

const clearFilters = () => {
    Object.keys(filters.value).forEach(key => {
        filters.value[key] = ''
    })
    activeFilters.value = {}
    currentPage.value = 1
}

const goToPage = (page) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
        currentPage.value = page
    }
}

const getVisiblePages = () => {
    if (!pagination.value) return []

    const current = pagination.value.currentPage
    const total = pagination.value.totalPages
    const pages = []

    let start = Math.max(1, current - 2)
    let end = Math.min(total, start + 4)

    if (end - start < 4) {
        start = Math.max(1, end - 4)
    }

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return pages
}

const viewPlaneta = (id) => {
    navigateTo(`/planeta/${id}`)
}

const handleImageError = (event) => {
    event.target.src = '/placeholder-planet.jpg'
}

// SEO
useHead({
    title: 'Dragon Ball Planetas - Explorador Galáctico',
    meta: [
        { name: 'description', content: 'Explora los planetas del universo Dragon Ball con filtros avanzados y paginación' }
    ]
})
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

/* Botones de paginación */
.pagination-btn {
    background: white;
    border: 2px solid #ff6b35;
    color: #ff6b35;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(255, 107, 53, 0.2);
}

.pagination-btn:hover:not(:disabled) {
    background: linear-gradient(45deg, #ff6b35, #f7931e);
    color: white;
    transform: scale(1.05);
    box-shadow: 0 8px 15px rgba(255, 107, 53, 0.4);
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

/* Efectos de hover personalizados */
.group:hover .group-hover\:animate-bounce {
    animation: bounce 1s infinite;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .text-6xl.md\:text-8xl {
        font-size: 3rem;
    }
}
</style>