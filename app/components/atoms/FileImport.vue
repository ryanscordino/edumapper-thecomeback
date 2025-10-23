<template>
    <div class="flex flex-col gap-4 pb-40">
        <div class="w-full border rounded-lg p-5 bg-white">
            <div class="flex flex-col gap-3">
                <div class="flex flex-col items-center justify-center gap-3">
                    <input ref="fileInput" type="file" class="hidden" @change="onFileChange" />
                    <button @click="pickFile" type="button"
                        class="px-3 py-8 text-center flex items-center gap-2 transition-all duration-300">
                        <Icon name="material-symbols:document-scanner-sharp" />
                        <span>{{ imported ? 'Fichier importé ! Regarde le résultat en cliquant sur suivant !'
                            : 'Joindre ma fiche avenir pour cette formation' }}</span>
                    </button>
                    <Transition name="fade">
                        <div v-if="fileName && !imported" class="text-sm text-gray-800">{{ fileName }}</div>
                    </Transition>
                </div>

                <Transition name="slide-fade">
                    <div v-if="fileName && !imported" class="flex gap-2 mt-3 justify-center">
                        <button @click="importFile"
                            class="px-3 py-2 rounded bg-stone-950 text-white transition-all hover:scale-105">
                            Importer
                        </button>
                        <button v-if="fileName" @click="clear"
                            class="px-3 py-2 rounded border text-sm transition-all hover:scale-105">Supprimer</button>
                    </div>
                </Transition>
                <canvas ref="confettiCanvas" class="fixed top-0 left-0 w-full h-full pointer-events-none"></canvas>
            </div>
        </div>
        <div class="text-left text-sm flex items-center justify-center gap-1.5 text-gray-600">
            <Icon name="material-symbols:info" /> Transmettre ta fiche Avenir permet d'affiner le résultat de tes
            chances
            d'admission
        </div>
        <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4 flex flex-col gap-2 z-50">
            <Button label="Suivant" :variant="imported ? 'black' : 'muted'" size="w-full" position="default"
                @click="handleNext" />
            <Button label="Je n'ai pas de fiche Avenir pour cette formation" :variant="imported ? 'muted' : 'black'"
                size="w-fit" position="default" @click="handleNoFile" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';

type Emits = {
    next: []
    noFile: []
}

const emit = defineEmits<Emits>()

const fileInput = ref<HTMLInputElement | null>(null)
const fileName = ref('')
const imported = ref(false)
const confettiCanvas = ref<HTMLCanvasElement | null>(null)

const pickFile = () => {
    fileInput.value?.click()
}

const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
        fileName.value = target.files[0].name
        imported.value = false
    }
}

const importFile = () => {
    imported.value = true
    triggerConfetti()
}

const triggerConfetti = () => {
    if (!confettiCanvas.value) return

    const canvas = confettiCanvas.value
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#FF7342', '#B176FF', '#FFD93D', '#6BCF7F', '#4ECDC4']
    const particles: Array<{ x: number; y: number; vx: number; vy: number; color: string; size: number }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
        const randomColorIndex = Math.floor(Math.random() * colors.length)
        const color: string = colors[randomColorIndex] ?? colors[0] ?? '#FF7342'
        particles.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8 - 2,
            color,
            size: Math.random() * 8 + 4
        })
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i]
            if (!p) continue

            p.x += p.vx
            p.y += p.vy
            p.vy += 0.3 // gravity

            ctx.fillStyle = p.color
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fill()

            if (p.y > canvas.height) {
                particles.splice(i, 1)
            }
        }

        if (particles.length > 0) {
            requestAnimationFrame(animate)
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    }

    animate()
}

const clear = () => {
    fileName.value = ''
    imported.value = false
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

const handleNext = () => {
    if (imported.value) {
        emit('next')
    }
}

const handleNoFile = () => {
    emit('noFile')
}
</script>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
    transform: translateY(-10px);
    opacity: 0;
}

.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}

.fade-enter-active {
    transition: all 0.3s ease-out;
}

.fade-leave-active {
    transition: all 0.2s ease-in;
}

.fade-enter-from {
    opacity: 0;
    transform: scale(0.95);
}

.fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>
