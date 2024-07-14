<template>
    <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <div class="flex justify-between items-center border-b pb-3">
          <slot name="header">
            <h3 class="text-lg font-semibold">{{ title }}</h3>
          </slot>
          <button class="text-red-600 hover:text-gray-900" @click="closeModal">x</button>
        </div>
        <div class="mt-4">
          <slot></slot>
        </div>
        <div class="mt-4 flex justify-end">
          <slot name="footer">
            <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="closeModal">{{t('btn_close')}}</button>
          </slot>
        </div>
      </div>
    </div>
</template>
  
<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  import { useI18n } from 'vue-i18n';
  
  const { t } = useI18n({
  useScope: 'global',
  inheritLocale: true
});

  const props = defineProps({
    title: {
      type: String,
      default: 'Modal Title'
    },
    isOpen: {
      type: Boolean,
      required: true
    }
  });
  
  const emit = defineEmits(['update:isOpen']);
  
  const closeModal = ():void => {
    emit('update:isOpen', false);
  };
</script>
 
  