<template>
  <RouterLink to="/" class="absolute inset-y-0 flex p-6 cursor-pointer">
    <IconArrowBack />
  </RouterLink>
  <div class="w-[90%] max-w-[658px] items-center m-auto mt-32 rounded-lg md:border px-16 py-12 md:bg-white md:shadow-lg">
    <h1 class="text-black-600 font-semibold text-2xl text-center">{{ t('forgot_password_title') }}</h1>
    <p class="text-base font-normal my-6 text-center tracking-tight text-gray-700">
      {{ t('forgot_password_subtitle') }}
    </p>
    <form @submit.prevent="submitForm">
      <div class="mb-5">
        <EmailInput v-model="form.email" />
        <small data-test="errors" class="error text-red-500" v-for="(error, index) in v$.email.$errors" :key="index">
          {{ error.$message }}
        </small>
      </div>
      <div class="flex justify-center">
        <ButtonSign
          id="forgot-password-button"
          :button-title="t('btn_reset_link')"
          @click.prevent="submitForm"
          class="rounded-full px-10 !w-auto"
        />
      </div>
    </form>
  </div>

  <Modal :title="modalTitle" :isOpen="isModalOpen" @update:isOpen="isModalOpen = false">
    <template v-slot:header>
      <h3>{{ modalTitle }}</h3>
    </template>
    <p>{{ modalMessage }}</p>
  </Modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

import EmailInput from '@/components/EmailInput.vue';
import ButtonSign from '@/components/ButtonSign.vue';
import IconArrowBack from '@/components/icons/IconArrowBack.vue';
import Modal from '@/components/Modal.vue';

const router = useRouter();

const { t } = useI18n({
  useScope: 'global',
  inheritLocale: true
});

const rulesOfValidation = {
  email: {
    required: helpers.withMessage(t('errors.required_email'), required),
    email: helpers.withMessage(t('errors.invalid_email'), email)
  }
};

const form = reactive({
  email: ''
});

const v$ = useVuelidate(rulesOfValidation, form);

const saveCredentials = () => {
  localStorage.setItem(
    'useCredentials',
    JSON.stringify({
      email: 'samarebe@gmail.com',
    })
  );
};

const isModalOpen = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');

onMounted(() => {
  saveCredentials();
});

const submitForm = async (): Promise<void> => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    const credentials = JSON.parse(localStorage.getItem('useCredentials') ?? '{}');
    if (credentials.email && form.email === credentials.email) {
      router.push({ path: '/' });
    } else {
      modalTitle.value = t('error');
      modalMessage.value = t('email_not_found');
      isModalOpen.value = true;
    }
  }
};
</script>
