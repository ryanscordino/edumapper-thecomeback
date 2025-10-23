<template>
    <div class="flex flex-col gap-4">
        <!-- First card with school data -->
        <div class="w-full rounded-xl p-5 bg-[#EEE8E4]">
            <div class="flex flex-col gap-2 items-center">
                <div class="flex items-center gap-2 text-gray-600 text-sm">
                    <span>EDHEC Business School</span>
                    <span>|</span>
                    <Icon name="ph:map-pin-bold" />
                    <span>Roubaix</span>
                </div>
                <h2 class="text-2xl font-bold text-gray-900">International BBA</h2>
            </div>
        </div>

        <!-- Probability result card -->
        <div class="w-full rounded-xl p-6 bg-white">
            <div class="flex flex-col items-center gap-6">
                <!-- Lightning circle -->
                <div class="relative w-32 h-32">
                    <!-- Background circle -->
                    <svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        <!-- Background circle -->
                        <circle cx="50" cy="50" r="45" stroke="#E5E7EB" stroke-width="8" fill="none" />
                        <!-- Progress circle (91%) -->
                        <circle cx="50" cy="50" r="45" stroke="url(#gradient)" stroke-width="8" fill="none"
                            stroke-dasharray="283" :stroke-dashoffset="283 - (283 * 0.91)" stroke-linecap="round" />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style="stop-color:#FF7342" />
                                <stop offset="100%" style="stop-color:#B176FF" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <!-- Lightning icon -->
                    <div class="absolute inset-0 flex items-center justify-center">
                        <img src="/light.png" alt="Lightning" class="w-20 h-20" />
                    </div>
                </div>

                <!-- Probability text -->
                <div class="flex items-center gap-2">
                    <span class="text-3xl font-semibold text-gray-900">91%</span>
                    <span class="text-gray-600">·</span>
                    <span class="text-3xl font-semibold text-gray-900">Très élevées</span>
                </div>

                <!-- Reliability rating -->
                <div class="flex items-center gap-2 items-baseline">
                    <span class="text-gray-700">Fiabilité</span>
                    <div class="flex gap-1">
                        <Icon v-for="i in 5" :key="i" name="material-symbols:star"
                            :class="i <= 4 ? 'text-black fill-black' : 'text-gray-300'" class="w-5 h-5" />
                    </div>
                </div>

                <!-- Disclaimer -->
                <p class="text-gray-500 text-center max-w-md">
                    Cette estimation est fournie à titre indicatif et ne garantit en aucun cas la décision d'admission
                    de l'établissement.
                </p>
            </div>
        </div>

        <!-- Button -->
        <Button label="Tester une autre formation" variant="black" size="w-full" position="bottom"
            @click="refreshPage" />
    </div>
</template>

<script setup lang="ts">
import Button from '../atoms/Button.vue';

const refreshPage = () => {
    window.location.reload()
}
</script>