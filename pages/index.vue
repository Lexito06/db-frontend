<template>
    <div class="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        <!-- Hero Section -->
        <div class="relative overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-10 left-10 w-20 h-20 bg-orange-400 rounded-full animate-pulse"></div>
                <div class="absolute top-32 right-20 w-16 h-16 bg-yellow-400 rounded-full animate-bounce"></div>
                <div class="absolute bottom-20 left-32 w-12 h-12 bg-red-400 rounded-full animate-pulse"></div>
                <div class="absolute bottom-40 right-40 w-24 h-24 bg-orange-300 rounded-full animate-bounce"></div>
            </div>

            <div class="relative container mx-auto px-4 py-16 text-center">
                <!-- Logo/Title -->
                <div class="mb-8">
                    <h1
                        class="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 mb-4 animate-pulse">
                        DRAGON BALL
                    </h1>
                    <p class="text-2xl md:text-3xl text-gray-700 font-semibold">
                        API Universe
                    </p>
                    <p class="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                        Explora el universo de Dragon Ball con información detallada sobre personajes, planetas y mucho
                        más
                    </p>
                </div>
            </div>
        </div>

        <!-- Navigation Cards -->
        <div class="container mx-auto px-4 py-12">
            <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">
                Explora el Universo
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <!-- Personajes Card -->
                <NuxtLink to="/personaje"
                    class="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                    </div>
                    <div class="relative p-8 text-center">
                        <div class="text-6xl mb-6 group-hover:animate-bounce">🥋</div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Personajes</h3>
                        <p class="text-gray-600 mb-6">
                            Descubre todos los guerreros, sus poderes, transformaciones y habilidades únicas
                        </p>
                        <div
                            class="inline-flex items-center text-orange-500 font-semibold group-hover:text-orange-600 transition-colors">
                            Ver Personajes
                            <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </div>
                    </div>
                    <div
                        class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300">
                    </div>
                </NuxtLink>

                <!-- Planetas Card -->
                <NuxtLink to="/planeta"
                    class="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                    </div>
                    <div class="relative p-8 text-center">
                        <div class="text-6xl mb-6 group-hover:animate-bounce">🌌</div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Planetas</h3>
                        <p class="text-gray-600 mb-6">
                            Explora los mundos del universo Dragon Ball, desde la Tierra hasta Namek
                        </p>
                        <div
                            class="inline-flex items-center text-blue-500 font-semibold group-hover:text-blue-600 transition-colors">
                            Ver Planetas
                            <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </div>
                    </div>
                    <div
                        class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300">
                    </div>
                </NuxtLink>

                <!-- API Documentation Card -->
                <a href="http://127.0.0.1:8000/api/documentation" target="_blank" rel="noopener noreferrer"
                    class="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                    </div>
                    <div class="relative p-8 text-center">
                        <div class="text-6xl mb-6 group-hover:animate-bounce">📚</div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">API Docs</h3>
                        <p class="text-gray-600 mb-6">
                            Documentación completa de la API para desarrolladores
                        </p>
                        <div
                            class="inline-flex items-center text-green-500 font-semibold group-hover:text-green-600 transition-colors">
                            Ver Documentación
                            <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </div>
                    </div>
                    <div
                        class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300">
                    </div>
                </a>
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
// SEO
useHead({
    title: 'Dragon Ball API - Universo Completo',
    meta: [
        {
            name: 'description',
            content: 'Explora la base de datos más completa de Dragon Ball. Personajes, planetas, transformaciones y mucho más.'
        },
        { property: 'og:title', content: 'Dragon Ball API - Universo Completo' },
        { property: 'og:description', content: 'La API más completa del universo Dragon Ball' },
        { property: 'og:type', content: 'website' },
        { name: 'keywords', content: 'dragon ball, api, personajes, planetas, goku, vegeta, anime' }
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

/* Efectos de hover personalizados */
.group:hover .group-hover\:animate-bounce {
    animation: bounce 1s infinite;
}

/* Gradiente animado para el título */
@keyframes gradient {
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

.bg-gradient-animate {
    background: linear-gradient(-45deg, #ff6b35, #f7931e, #ffd700, #ff4757);
    background-size: 400% 400%;
    animation: gradient 4s ease infinite;
}
</style>