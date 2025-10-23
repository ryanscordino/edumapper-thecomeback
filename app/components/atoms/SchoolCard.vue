<template>
  <div
    class="w-full border rounded-xl p-5 gap-6 bg-linear-to-r from-[#FF7342] to-[#B176FF] text-white relative overflow-visible">
    <div class="flex flex-col gap-4 lg:flex-row justify-between items-start transition-all">
      <div class="flex flex-col gap-2">
        <h2 class="text-2xl text-left font-semibold">{{ props.schoolName }}</h2>
        <div class="flex gap-4 items-baseline">
          <p class="">
            <Icon name="ph:map-pin-bold" /> Lille
          </p>
          <p class="">
            <Icon name="streamline:shopping-building-real-home-tower-building-house-estate" /> Lycée public
          </p>
        </div>
      </div>
      <button @click="onEdit"
        class="text-stone-950 w-fit h-fit py-2 px-4 text-sm rounded-full bg-white hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-blue-300">
        Modifier
      </button>
    </div>
    <Transition name="popover">
      <div v-if="isEditing" id="school-popover" tabindex="-1"
        class="absolute right-0 mt-2 w-80 bg-white border rounded shadow z-[100]">
        <div class="p-3">
          <div class="text-sm font-medium mb-2 text-gray-900">Choisir un lycée</div>
          <div class="max-h-64 overflow-auto">
            <button v-for="school in props.schools" :key="school" @click="() => selectAndReload(school)"
              class="w-full text-left px-2 py-2 hover:bg-gray-100 text-gray-900 rounded transition-colors">
              {{ school }}
            </button>
          </div>
          <div class="mt-3 text-right">
            <button @click="() => (isEditing = false)"
              class="px-3 py-1 rounded bg-gray-200 text-gray-900">Fermer</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
type Props = {
  schoolName: string
  location?: string
  schoolType?: string
  showEdit?: boolean
  schools: string[]
}

type Emits = {
  edit: []
  schoolChange: [schoolName: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isEditing = ref(false)

const onEdit = () => {
  isEditing.value = true
  emit('edit')
}

const selectAndReload = (school: string) => {
  emit('schoolChange', school)
  isEditing.value = false
}
</script>

<style scoped>
.popover-enter-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.popover-leave-active {
  transition: all 0.2s ease;
}

.popover-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.popover-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
