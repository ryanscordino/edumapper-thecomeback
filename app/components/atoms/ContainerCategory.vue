<script setup lang="ts">
import Button from './Button.vue';

type Props = {
    title: string,
}

type Emits = {
    confirmed: [values: string[]]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const values = ref<string[]>([]);
const isCategoryActive = ref(false);
const isConfirmed = ref(false);

const toggleCategory = () => {
    isCategoryActive.value = !isCategoryActive.value;
}

const getValues = () => {
    // Values are already collected via provide/inject
    toggleCategory();
    isConfirmed.value = true;
    console.log('Collected values:', values.value)
    emit('confirmed', values.value)
}

// Provide context for child components to register their values
provide('registerValue', (value: string) => {
    if (!values.value.includes(value)) {
        values.value.push(value)
    }
})

provide('unregisterValue', (value: string) => {
    const index = values.value.indexOf(value)
    if (index > -1) {
        values.value.splice(index, 1)
    }
})
</script>

<template>
    <div class="rounded-lg bg-white p-5 w-full h-fit transition-all duration-300 flex flex-col">
        <div class="flex items-start justify-between">
            <h2 class="font-bold">{{ props.title }}</h2>
            <button @click="toggleCategory" class="transition-all duration-300">
                <div class="flex items-center gap-2" v-if="!isCategoryActive">
                    <span>À compléter</span>
                    <Icon name="ic:baseline-keyboard-arrow-down" size="1.5em" />
                </div>
                <Icon v-else name="ic:baseline-keyboard-arrow-up" size="1.5em" />
            </button>
        </div>
        <Transition name="slide-fade">
            <div v-if="isCategoryActive" class="flex flex-col gap-2 py-6">
                <slot />
            </div>
        </Transition>
        <Transition name="slide-fade">
            <Button v-if="isCategoryActive" @click="getValues" label="Confirmer" variant="black" size="w-full"
                position="default" />
        </Transition>
        <Transition name="fade">
            <div v-if="isConfirmed && values.length > 0 && !isCategoryActive" class="text-sm text-left py-2">
                {{ values.join(', ') }}
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s ease-in;
}

.slide-fade-enter-from {
    opacity: 0;
}

.slide-fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
