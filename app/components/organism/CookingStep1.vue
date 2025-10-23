<template>
    <div class="flex flex-col gap-4">
        <SchoolCard :schoolName="props.schoolName" :schools="props.schools" @schoolChange="handleSchoolChange" />
        <div class="items-start justify-start gap-4 flex flex-col">
            <ContainerCategory title="Classe" @confirmed="handleClassConfirmed">
                <div class="flex flex-col gap-8 h-fit">
                    <div class="flex gap-2 w-fit flex-wrap">
                        <ButtonChip v-for="classLevel in props.classesLevel" :key="classLevel" :label="classLevel"
                            :selected="selectedClass === classLevel" @toggle="handleToggle(classLevel)" />
                    </div>
                    <USeparator />
                    <div class="flex flex-col gap-4">
                        <h3 class="text-left text-sm">Type de bac</h3>
                        <div class="flex gap-2 text-left">
                            <ButtonChip v-for="bacType in props.bacTypes" :key="bacType" :label="bacType"
                                :selected="selectedBac === bacType" @toggle="handleToggleBac(bacType)" />
                        </div>
                    </div>
                </div>
            </ContainerCategory>
            <ContainerCategory title="Spécialités" @confirmed="handleSpecialityConfirmed">
                <div class="flex flex-col gap-8 h-fit">
                    <div class="flex gap-2 w-fit flex-wrap">
                        <ButtonChip v-for="speciality in props.specialities" :key="speciality" :label="speciality"
                            :selected="selectedSpeciality === speciality"
                            @toggle="handleToggleSpeciality(speciality)" />
                    </div>
                </div>
            </ContainerCategory>
        </div>
        <Button @click="handleFinalConfirm" label="Confirmer" :variant="isStepReady ? 'black' : 'muted'" size="w-fit"
            position="bottom" />
    </div>
</template>

<script setup lang="ts">
import ContainerCategory from '../atoms/ContainerCategory.vue';
import SchoolCard from '../atoms/SchoolCard.vue';
import ButtonChip from '../atoms/ButtonChip.vue';
import Button from '../atoms/Button.vue';

type Props = {
    schoolName: string,
    classesLevel: string[],
    bacTypes: string[],
    taskDone: boolean,
    specialities: string[],
    schools: string[],
}

type Emits = {
    stepComplete: [data: { schoolName: string, classLevel: string | null, bacType: string | null, speciality: string | null }],
    schoolChange: [schoolName: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedClass = ref<string | null>(null)
const handleToggle = (classLevel: string) => {
    selectedClass.value = selectedClass.value === classLevel ? null : classLevel
    console.log('Selected class:', selectedClass.value)
}

const selectedBac = ref<string | null>(null)
const handleToggleBac = (bacType: string) => {
    selectedBac.value = selectedBac.value === bacType ? null : bacType
    console.log('Selected bac:', selectedBac.value)
}

const selectedSpeciality = ref<string | null>(null)
const handleToggleSpeciality = (speciality: string) => {
    selectedSpeciality.value = selectedSpeciality.value === speciality ? null : speciality
    console.log('Selected speciality:', selectedSpeciality.value)
}

const classConfirmed = ref(false)
const specialityConfirmed = ref(false)

const handleClassConfirmed = (values: string[]) => {
    classConfirmed.value = true
}

const handleSpecialityConfirmed = (values: string[]) => {
    specialityConfirmed.value = true
}

const isStepReady = computed(() => classConfirmed.value && specialityConfirmed.value)

const stepData = computed(() => ({
    schoolName: props.schoolName,
    classLevel: selectedClass.value,
    bacType: selectedBac.value,
    speciality: selectedSpeciality.value,
}))

const handleFinalConfirm = () => {
    if (isStepReady.value) {
        emit('stepComplete', stepData.value)
    }
}

const handleSchoolEdit = () => {
    // Show dropdown will be handled by SchoolCard
}

const handleSchoolChange = (newSchoolName: string) => {
    emit('schoolChange', newSchoolName)
}
</script>