<template>
  <div class=" md:pt-32 overflow-hidden ">
    <div class="md:flex justify-center md:space-x-20 pb-12 ">
      <div
        class="flex min-h-full flex-col justify-center lg:text-left lg:items-start px-6 py-12 lg:px-8 md:shrink-0"
      >
        <h1 class="text-blue-600 font-bold text-5xl md:text-left text-center mt-2">{{ t('signIn_title') }}</h1>
        <h2 class="hidden md:inline-block text-xl font-normal max-w-[400px] text-left break-words">
          {{ t('signIn_subtitle') }}
        </h2>
      </div>
      <div class="px-6">
        <FormPage />
        <div
          class="hidden md:inline-block text-base font-normal mt-10 text-center leading-9 tracking-tight text-gray-700"
        >
          <h3>{{ t('signIn_footer') }}</h3>
        </div>
        <p class="md:hidden text-gray-500 text-lg font-semibold mt-5 text-center justify-center">
          {{ t('meta') }}
        </p>
        <div
          class="md:hidden mb-6 space-x-2 flex text-xs font-light mt-5 text-center justify-center tracking-tight text-gray-500"
        >
          <p>{{ t('about') }}</p>
          <p>{{ t('help') }}</p>
          <p>{{ t('more') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import FormPage from '@/components/FormComponent.vue'

const {t} = useI18n({
  useScope: 'global',
  inheritLocale: true
})
</script>