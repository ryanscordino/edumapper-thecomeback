<template>
  <button
    :class="[
      'rounded-full px-4 py-2 text-sm transition-colors duration-150',
      selected ? 'bg-white border border-stone-800 text-gray-900' : 'bg-gray-200 text-gray-700'
    ]"
    @click="emit('toggle')"
    type="button"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
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
</script>
