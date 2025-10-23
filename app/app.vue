<script lang="ts" setup>
import Header from './components/atoms/Hearder.vue';
import CookingStep1 from './components/organism/CookingStep1.vue';
import CookingStep2 from './components/organism/CookingStep2.vue';
import CookingStep3 from './components/organism/CookingStep3.vue';

const { data: school, pending: schoolPending } = await useFetch('/api/school');
const { data: classes } = await useFetch('/api/classe');
const { data: bacTypes } = await useFetch('/api/bac');
const { data: specialities } = await useFetch('/api/specialities');

const schools = school.value?.data || []

// Random school selection - truly random on each reload
const schoolName = ref(schools.length > 0 ? (schools[0] || '') : '')
const isRandomSchoolSet = ref(false)

// Set random school only on client side to avoid hydration mismatch
onMounted(() => {
  if (schools.length > 0) {
    const randomSchool = schools[Math.floor(Math.random() * schools.length)]
    if (randomSchool) {
      schoolName.value = randomSchool
      isRandomSchoolSet.value = true
    }
  }
})

const stepData = ref<{
  schoolName: string,
  classLevel: string | null,
  bacType: string | null,
  speciality: string | null
} | null>(null)

const showStep1 = ref(true)
const showStep2 = ref(false)
const showStep3 = ref(false)

const handleStepComplete = (data: { schoolName: string, classLevel: string | null, bacType: string | null, speciality: string | null }) => {
  stepData.value = data
  console.log('Step data collected:', stepData.value)
  showStep1.value = false
  showStep2.value = true
}

const handleStep2Next = () => {
  showStep2.value = false
  showStep3.value = true
}

const handleStep2NoFile = () => {
  showStep2.value = false
  showStep3.value = true
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
    <div class="min-h-screen">
      <Header />
      <main class="max-w-3xl mx-auto px-4 text-center">
        <Transition name="fade" mode="out-in">
          <div v-if="schoolPending || !isRandomSchoolSet" key="loading" class="flex items-center justify-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
          <CookingStep1 v-else-if="showStep1 && schoolName" key="step1" :schoolName="schoolName"
            :classesLevel="classes?.data || []" :bacTypes="bacTypes?.data || []"
            :specialities="specialities?.data || []" :taskDone="false" :schools="school?.data || []"
            @stepComplete="handleStepComplete" @schoolChange="handleSchoolChange" />
          <div v-else-if="!schoolName" key="error">
            <p>Nous rencontrons un problème</p>
            <p>Veuillez réessayer plus tard</p>
          </div>
        </Transition>
        <Transition name="slide" mode="out-in">
          <CookingStep2 v-if="showStep2" key="step2" :schoolName="stepData?.schoolName || ''" :taskDone="false"
            :schools="school?.data || []" @next="handleStep2Next" @noFile="handleStep2NoFile" />
        </Transition>
        <Transition name="slide" mode="out-in">
          <CookingStep3 v-if="showStep3" key="step3" />
        </Transition>
      </main>
    </div>
  </UApp>
</template>

<style scoped>
.slide-enter-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
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
