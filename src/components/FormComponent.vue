<template>
    <Modal :title="modalTitle" :isOpen="isModalOpen" @update:isOpen="isModalOpen = false"  class="  text-center text-red-500 bg-red-100">
      <template v-slot:header>
      <h3>{{ modalTitle }}</h3>
    </template>
    <p>{{ modalMessage }}</p>
  </Modal>
  <div class="p-5 min-w-92 justify-center rounded-lg md:mt-12 shrink-0 md:bg-white md:shadow-lg">
    <div class="md:text-center justify-center md:font-semibold md:text-xl mb-5 hidden">
      {{ t('form_title') }}
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
        <ButtonComponent  id="loginButton" :title="t('btn_login')" @click.prevent="submitForm" class="mb-5" />
        <div class="text-center">
          <RouterLink
            to="/forgot-password"
            id="forgot-password-link"
            class="mb-2 text-center text-sm font-medium text-blue-500 hover:text-blue-600"
            >{{ t('forgot_password') }}?</RouterLink
          >
        </div>
        <div class="flex justify-center item-center px-4">
          <div class="my-10 md:my-5 border-t-2 border-gray-400 flex-grow"></div>
          <p class="my-7 md:my-2 mx-4 text-gray-600">{{ t('or') }}</p>
          <div class="my-10 md:my-5 border-t-2 border-gray-400 flex-grow"></div>
        </div>

        <div class="justify-center">
          <ButtonComponent
          id="createAccountButton"
            :title="t('btn_create_new_account')"
            @click.prevent = "createAccount"
            class="px-4 mt-2 w-48 justify-center bg-green-500 hover:bg-green-600"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import useVuelidate from '@vuelidate/core'
import { required, minLength, email, helpers } from '@vuelidate/validators'
import router from '../router/index'

import EmailInput from '@/components/EmailInput.vue'
import PasswordInput from './PasswordInput.vue'
import ButtonComponent from './ButtonComponent.vue'


const { t } = useI18n({
  useScope: 'global',
  inheritLocale: true
})

const isPasswordValid = (value: string) =>
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value)
const rulesOfValidation = {
  email: {
    required: helpers.withMessage(t('errors.required_email'), required),
    email: helpers.withMessage(t('errors.invalid_email'), email)
  },
  password: {
    required: helpers.withMessage(t('errors.required_password'), required),
    minLength: helpers.withMessage(t('errors.invalid_password_length'), minLength(6)),
    containsPasswordRequirement: helpers.withMessage(t('errors.invalid_password'), isPasswordValid)
  }
}

const form = reactive({
  email: '',
  password: ''
})

const v$ = useVuelidate(rulesOfValidation, form)
const saveCredentials = ():void => {
  localStorage.setItem(
    'useCredentials',
    JSON.stringify({
      email: 'samarebe@gmail.com',
      password: 'AZaz@1'
    }),
  )
}

const isModalOpen = ref<boolean>(false);
const modalTitle = ref<string>('');
const modalMessage = ref<string>('');

onMounted(() => {
  saveCredentials()
})

const submitForm = async (): Promise<void> => {
  const isFormValid = !v$.value.$invalid
  v$.value.$touch()
  if (isFormValid) {
    const credentials = JSON.parse(localStorage.getItem('useCredentials') ?? "{}")
    if (credentials.email) {
      if (
        form.email === credentials.email &&
        form.password === credentials.password
      ) {
        router.push({ path: '/home' })
      } else {
        modalTitle.value = t('error');
        modalMessage.value = t('user_not_found');
        isModalOpen.value = true;
      }
    }
  }
}

const createAccount = ():void => {
  router.push({ path: '/' })
}
</script>
