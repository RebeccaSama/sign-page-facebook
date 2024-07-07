<template>
  <RouterLink to="/">
    <img
      alt="back"
      src="https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/lfP8xYwPQXE.png"
      class="wbloks_1 m-4 mb-4"
    />
  </RouterLink>
  <div
    class="justify-center w-[90%] max-w-[658px] items-center m-auto rounded-lg md:border px-16 py-12 md:bg-white md:shadow-lg"
  >
    <h1 class="text-black-600 font-semibold text-2xl text-center">{{ t('forgot-password') }}</h1>
    <p class="text-base font-normal my-6 text-center tracking-tight text-gray-700">
      {{ t('forgot-password-text') }}
    </p>
    <form @submit.prevent>
      <div class="mb-5">
        <EmailInput v-model="form.email" />
        <small
          data-test="errors"
          class="error text-red-500"
          v-for="(error, index) of v$.email.$errors"
          :key="index"
        >
          {{ error.$message }}
        </small>
      </div>
      <div class="flex justify-center">
        <ButtonSign
        id="forgot-password-button"
          :button-title="t('btn-reset-link')"
          :onSubmit="submitForm"
          class="rounded-full px-10 !w-auto"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

import EmailInput from '@/components/EmailInput.vue'
import ButtonSign from '@/components/ButtonSign.vue'

const router = useRouter()

const { t } = useI18n({
  useScope: 'global',
  inheritLocale: true
})

const rulesOfValidation = {
  email: {
    required: helpers.withMessage(t('errors.required-email'), required),
    email: helpers.withMessage(t('errors.invalid-email'), email)
  }
}

const form = reactive({
  email: ''
})

const v$ = useVuelidate(rulesOfValidation, form)
const saveCredentials = () => {
  localStorage.setItem(
    'useCredentials',
    JSON.stringify({
      email: 'samarebe@gmail.com',
    }),
  )
}

onMounted(() => {
  saveCredentials()
})

const submitForm = async (): Promise<void> => {
  const isFormValid = !v$.value.$invalid
  v$.value.$touch()
  if (isFormValid) {
    console.log('Form data:', form)
    const credentials = JSON.parse(localStorage.getItem('useCredentials') ?? "{}")
    if (credentials.email) {
      console.log(credentials)
      if (
        form.email === credentials.email 
      ) {
        router.push({ path: '/' })
      } else {
        alert('user not found')
      }
    }else {
    console.log('not data');
    }
  } else {
    console.log('Form is not valid')
  }
}
</script>
