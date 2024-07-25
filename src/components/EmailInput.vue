<template>
  <div class="form-group">
    <input
      id="email"
      name="email"
      type="email"
      autocomplete="email"
      required
      class="block w-full rounded-md py-2.5 px-4 text-gray-800 form-control shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 xs:text-xs xs:leading-6"
      :placeholder="t('placeholder_email')"
      v-model="model"
    />
    <small data-test='errors'
    v-if="errorMessages?.length"  
    class="text-red-500 border-red-600" 
    v-for="error of errorMessages" :key="error.$uid"
    >
    {{ error.$message }}
    </small>
  </div>
</template>

<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core';
import type { PropType } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  useScope: 'global',
  inheritLocale: true
})
defineProps({
  errorMessages: {
    type: Object as PropType<ErrorObject[]>,
    default: [] as PropType<ErrorObject[]>,
  }
})

const model = defineModel<string>()
</script>
