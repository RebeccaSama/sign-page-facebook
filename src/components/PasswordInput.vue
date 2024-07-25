<template>
  <div class="relative">
    <input
      id="password"
      name="password"
      :type="passwordVisible ? 'text' : 'password'"
      autocomplete="current-password"
      required
      class="block w-full rounded-md py-2.5 px-4 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 xs:text-xs xs:leading-6"
      :placeholder="t('placeholder_password')"
      v-model="model"
    />
    <span 
    id="show_hide" 
    @click="togglePasswordVisibility" 
    class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
      <IconPasswordOn v-if="passwordVisible" class="w-5 h-5 text-gray-500" />
      <IconPasswordOff v-else class="w-5 h-5 text-gray-500" />
    </span>
    <small 
    v-if="errorMessages?.length" data-test='errors' 
    class="text-red-500 border-red-600" 
    v-for="error of errorMessages" :key="error.$uid"
    >
    {{ error.$message }}
    </small>
  </div>
</template>

<script lang="ts" setup>
import { ref, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'

import IconPasswordOn from '@/components/icons/IconPasswordOn.vue'
import IconPasswordOff from '@/components/icons/IconPasswordOff.vue'
import type { ErrorObject } from '@vuelidate/core';

const { t } = useI18n({
  useScope: 'global',
  inheritLocale: true
})
const passwordVisible = ref<boolean>(false)
const model = defineModel<string>()

const togglePasswordVisibility = ():void => {
  passwordVisible.value = !passwordVisible.value
}
defineProps({
  errorMessages: {
    type: Object as PropType<ErrorObject[]>,
    default: [] as PropType<ErrorObject[]>,
  }
})
</script>

