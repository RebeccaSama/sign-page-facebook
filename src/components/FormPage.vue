<template>
  <div class="hidden">
    <pre>
    {{ JSON.stringify(form, null, 2) }}
  </pre
    >
  </div>
  <div class="p-5 min-w-92 justify-center rounded-lg md:mt-12 shrink-0 md:bg-white md:shadow-lg">
    <div class="md:text-center justify-center md:font-semibold md:text-xl mb-5 hidden">
      {{ t('form-title') }}
    </div>
    <form @submit.prevent="submitForm">
      <div class="items-center mx-auto">
        <div class="mb-5">
          <EmailInput v-model.trim="form.email" />
          <small data-test='errors' class="error text-red-500" v-for="error of v$.email.$errors" :key="error.$uid">
            {{ error.$message }}
          </small>
        </div>
        <div class="mb-5 flex flex-col">
          <PasswordInput v-model.trim="form.password" />
          <small class="error text-red-500" v-for="error of v$.password.$errors" :key="error.$uid">
            {{ error.$message }}
          </small>
        </div>
        <ButtonSign  id="loginButton" :button-title="t('btn-login')" :onSubmit="submitForm" class="mb-5" />
        <div class="text-center">
          <RouterLink
            to="/forgot-password"
            id="forgot-password"
            class="mb-2 text-center text-sm font-medium text-blue-500 hover:text-blue-600"
            >{{ t('forgot-password') }}?</RouterLink
          >
        </div>
        <div class="flex justify-center item-center px-4">
          <div class="my-10 md:my-5 border-t-2 border-gray-400 flex-grow"></div>
          <p class="my-7 md:my-2 mx-4 text-gray-600">{{ t('or') }}</p>
          <div class="my-10 md:my-5 border-t-2 border-gray-400 flex-grow"></div>
        </div>

        <div class="justify-center">
          <ButtonSign
          id="createAccountButton"
            :button-title="t('btn-create-new-account')"
            :onSubmit="createAccount"
            class="px-4 mt-2 w-48 justify-center bg-green-500 hover:bg-green-600"
          />
        </div>
      </div>
    </form>
  
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, minLength, email, helpers } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'
import EmailInput from '@/components/EmailInput.vue'
import PasswordInput from './PasswordInput.vue'
import ButtonSign from './ButtonSign.vue'
import router from '../router/index'

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
  password: {
    required: helpers.withMessage(t('errors.required-password'), required),
    minLength: helpers.withMessage(t('errors.invalid-password-length'), minLength(6)),
    containsPasswordRequirement: helpers.withMessage(t('errors.invalid-password'), isPasswordValid)
  }
}

const form = reactive({
  email: '',
  password: ''
})

const v$ = useVuelidate(rulesOfValidation, form)
const saveCredentials = () => {
  localStorage.setItem(
    'useCredentials',
    JSON.stringify({
      email: 'samarebe@gmail.com',
      password: 'AZaz@1'
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
        form.email === credentials.email &&
        form.password === credentials.password
      ) {
        router.push({ path: '/home' })
      } else {
        console.log('user not found')
      }
    }else {
    console.log('not data');
    }
  } else {
    console.log('Form is not valid')
  }
}

const createAccount = () => {
  console.log('creating account')
}
</script>
