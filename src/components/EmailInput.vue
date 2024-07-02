<template>
  <div class="form-group">
    <input
      id="email"
      name="email"
      type="email"
      autocomplete="email"
      required
      class="block w-full rounded-md py-2.5 px-4 text-gray-800 form-control shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 xs:text-xs xs:leading-6"
      :placeholder="t('placeholder-email')"
      v-model="model"
    />
    <span></span>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  useScope: 'global',
  inheritLocale: true
})

const email = ref('')

defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const model = defineModel()
const emit = defineEmits(['update:modelValue'])

// Mise à jour du modèle de la valeur du composant parent
watch(email, (newEmail) => {
  emit('update:modelValue', newEmail)
})
</script>
