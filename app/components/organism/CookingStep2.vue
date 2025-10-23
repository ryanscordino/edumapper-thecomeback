<template>
    <div class="flex flex-col gap-4">
        <SchoolCard :schoolName="props.schoolName" :schools="props.schools" @schoolChange="handleSchoolChange" />
    </div>
</template>

<script setup lang="ts">
import SchoolCard from '../atoms/SchoolCard.vue';

type Props = {
    schoolName: string,
    taskDone: boolean,
    schools: string[],
}

const props = defineProps<Props>()

const handleSchoolChange = (newSchoolName: string) => {
    console.log('School changed:', newSchoolName)
}
</script>