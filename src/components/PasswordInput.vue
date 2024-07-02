<template>
  <div class="form-group">
    <input
      id="password"
      name="password"
      type="password"
      autocomplete="current-password"
      required
      class="block w-full rounded-md py-2.5 px-4 text-gray-800 form-control shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 xs:text-xs xs:leading-6"
      :placeholder="t('placeholder-password')"
      v-model="password"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  useScope: 'global',
  inheritLocale: true
})

const password = ref('')

defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const model = defineModel()
const emit = defineEmits(['update:modelValue'])

watch(password, (newPassword) => {
  emit('update:modelValue', newPassword)
})
</script>
