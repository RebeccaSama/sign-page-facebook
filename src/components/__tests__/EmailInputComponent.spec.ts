import { mount } from '@vue/test-utils'
import { expect, describe, it, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'

import ButtonSign from '@/components/ButtonSign.vue'
import EmailInputComponent from '@/components/EmailInput.vue'

describe('EmailInputComponent', () => {
  beforeEach(() => {
    vi.mock('vue-i18n')
  })
  it('renders the input with the correct placeholder', () => {
    const wrapper = mount(EmailInputComponent, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('placeholder-email')
  })

  it('validates the form and shows errors for invalid inputs', async () => {
    const wrapper = mount(EmailInputComponent)

    await wrapper.findComponent(EmailInputComponent).find('input').setValue('test@example')
    await wrapper.findComponent(ButtonSign).trigger('click')


    await nextTick()
    expect(wrapper.find("[data-test='errors']").text()).toBe('errors.invalid-email')
  })

  it('updates the model and emits update:modelValue on input', async () => {
    const wrapper = mount(EmailInputComponent, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.setValue('test@example.com')

    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test@example.com'])
  })
})
