<template>
  <button
  id="Button"
    class="py-2.5 px-4 w-full justify-center rounded-md bg-blue-600 text-base font-sans font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
    >
    {{ title }}
  </button>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

</script>
