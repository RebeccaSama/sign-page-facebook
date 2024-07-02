<template>
  <RouterLink to="/">
    <img
      alt=""
      src="https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/lfP8xYwPQXE.png"
      class="wbloks_1 m-4 mb-4"
  /></RouterLink>

  <div
    class="justify-center w-[90%] max-w-[658px] items-center m-auto rounded-lg md:border px-16 py-12 md:bg-white md:shadow-lg"
  >
    <h1 class="text-black-600 font-semibold text-2xl text-center">{{ t('forgot-password') }}</h1>
    <p class="text-base font-normal my-6 text-center tracking-tight text-gray-700">
      {{ t('forgot-password-text') }}
    </p>
    <div class="mb-5">
          <EmailInput v-model="form.email" />
        <small data-test="errors" class="error text-red-500 " v-for="(error, index) of v$.email.$errors" :key="index">
           {{error.$message}}
        </small>
        </div>
    <div class="flex justify-center">
      <ButtonSign
        :button-title="t('btn-reset-link')"
        :onSubmit="submitForm"
        class="rounded-full px-10 !w-auto"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import EmailInput from '@/components/EmailInput.vue'
import ButtonSign from '../components/ButtonSign.vue'
import { useI18n } from 'vue-i18n'
import { required, email, helpers } from '@vuelidate/validators'
import router from '@/router'

const { t } = useI18n({
  useScope: 'global',
  inheritLocale: true
})
const isPasswordValid = (value: string) =>
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value)
const rulesOfValidation = {
  email: {
    required: helpers.withMessage(t('errors.required-email'), required),
    email: helpers.withMessage(t('errors.invalid-email'), email)
  },
}

const form = reactive({
  email: ''
})

const v$ = useVuelidate(rulesOfValidation, form)

const submitForm = () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    console.log('Form data:', form)
    router.push({ path: '/' })
  }
}
</script>
