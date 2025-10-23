<template>
    <div class="flex flex-col gap-4 overflow-visible">
        <SchoolCard :schoolName="localSchoolName" :schools="props.schools" @schoolChange="handleSchoolChange" />
        <FileImport @next="handleNext" @noFile="handleNoFile" />
    </div>
</template>

<script setup lang="ts">
import SchoolCard from '../atoms/SchoolCard.vue';
import FileImport from '../atoms/FileImport.vue';

type Props = {
    schoolName: string,
    taskDone: boolean,
    schools: string[],
}

type Emits = {
    next: []
    noFile: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localSchoolName = ref(props.schoolName)

watch(() => props.schoolName, (newValue) => {
    localSchoolName.value = newValue
})

const handleSchoolChange = (newSchoolName: string) => {
    localSchoolName.value = newSchoolName
    console.log('School changed:', newSchoolName)
}

const handleNext = () => {
    emit('next')
}

const handleNoFile = () => {
    emit('noFile')
}
</script>
