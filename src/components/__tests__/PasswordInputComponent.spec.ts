import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { expect, describe, it, vi, beforeEach } from 'vitest'
import PasswordInput from '@/components/PasswordInput.vue'



describe('PasswordInputComponent', () => {
  beforeEach(() => {
    vi.mock('vue-i18n')
  })
  it('renders the input with the correct placeholder', () => {
    const wrapper = mount(PasswordInput, {
  
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('placeholder-password')
  })

  it('updates the model and emits update:modelValue on input', async () => {
    const wrapper = mount(PasswordInput, {
     
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.setValue('mysecurepassword')

    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['mysecurepassword'])
  })
})
