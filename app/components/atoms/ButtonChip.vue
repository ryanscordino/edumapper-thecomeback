<template>
  <button :class="[
    'rounded-full px-4 py-2 text-sm transition-colors duration-150',
    selected ? 'bg-white border border-stone-800 text-gray-900' : 'bg-gray-200 text-gray-700'
  ]" @click="emit('toggle')" type="button">
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
import { watch } from 'vue'

type Props = {
  label: string
  selected?: boolean
}

type Emits = {
  toggle: []
}

const props = withDefaults(defineProps<Props>(), {
  selected: false
})

const emit = defineEmits<Emits>()

// Try to inject context from ContainerCategory
const registerValue = inject<(value: string) => void>('registerValue', () => { })
const unregisterValue = inject<(value: string) => void>('unregisterValue', () => { })

// Watch for selected changes and register/unregister
watch(() => props.selected, (isSelected) => {
  if (isSelected) {
    registerValue(props.label)
  } else {
    unregisterValue(props.label)
  }
}, { immediate: true })
</script>
