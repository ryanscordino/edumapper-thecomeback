<script setup lang="ts">
type Props = {
    label: string,
    variant: 'black' | 'muted',
    size: 'w-fit' | 'w-full',
    position: 'bottom' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
    position: 'default'
})

</script>

<template>
    <button :class="[
        'px-6 py-4 rounded-full z-50 h-fit transition-colors',
        props.variant === 'black' ? 'bg-black text-white' : 'bg-white text-gray-400 border border-gray-200',
        props.position === 'bottom' ? 'fixed bottom-8 left-1/2 transform -translate-x-1/2 w-fit' : 'w-full',
        props.size === 'w-fit' && props.position !== 'bottom' ? 'w-fit mx-auto' : ''
    ]">
        <span>{{ props.label }}</span>
    </button>
</template>