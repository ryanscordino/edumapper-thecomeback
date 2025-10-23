<script lang="ts" setup>
import Header from './components/atoms/Hearder.vue';
import CookingStep1 from './components/organism/CookingStep1.vue';
import CookingStep2 from './components/organism/CookingStep2.vue';

const { data: school } = await useFetch('/api/school');
const schoolName = ref(school.value?.data[0] || '');

const { data: classes } = await useFetch('/api/classe');
const { data: bacTypes } = await useFetch('/api/bac');
const { data: specialities } = await useFetch('/api/specialities');

const stepData = ref<{
  schoolName: string,
  classLevel: string | null,
  bacType: string | null,
  speciality: string | null
} | null>(null)

const showStep1 = ref(true)
const showStep2 = ref(false)

const handleStepComplete = (data: { schoolName: string, classLevel: string | null, bacType: string | null, speciality: string | null }) => {
  stepData.value = data
  console.log('Step data collected:', stepData.value)
  showStep1.value = false
  showStep2.value = true
}

const handleSchoolEdit = () => {
  // This will be handled by SchoolCard with a dropdown
}

const handleSchoolChange = (newSchoolName: string) => {
  schoolName.value = newSchoolName
}
</script>

<template>
  <UApp>
    <div>
      <Header />
      <main class="max-w-3xl mx-auto px-4 text-center">
        <CookingStep1 v-if="showStep1 && schoolName" :schoolName="schoolName" :classesLevel="classes?.data || []"
          :bacTypes="bacTypes?.data || []" :specialities="specialities?.data || []" :taskDone="false"
          :schools="school?.data || []" @stepComplete="handleStepComplete" @schoolChange="handleSchoolChange" />
        <div v-else-if="!schoolName">
          <p>Nous rencontrons un problème</p>
          <p>Veuillez réessayer plus tard</p>
        </div>
        <CookingStep2 v-if="showStep2" />
      </main>
    </div>
  </UApp>
</template>
