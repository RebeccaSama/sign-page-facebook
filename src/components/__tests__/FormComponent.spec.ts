import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { expect, describe, it, vi, beforeEach } from 'vitest'

import FormPage from '@/components/FormPage.vue'
import ButtonSign from '@/components/ButtonSign.vue'
import EmailInput from '@/components/EmailInput.vue'
import PasswordInput from '@/components/PasswordInput.vue'


describe('FormComponent', () => {
  beforeEach(() => {
    vi.mock("vue-i18n")
  })

  it('renders the form with the correct sub-components and placeholders', () => {
    const wrapper = mount(FormPage)
    expect(wrapper.findComponent(EmailInput).exists()).toBe(true)
    expect(wrapper.findComponent(PasswordInput).exists()).toBe(true)
    expect(wrapper.findComponent(ButtonSign).exists()).toBe(true)
    
    const emailInput = wrapper.find('input[name="email"]')
    expect(emailInput.attributes('placeholder')).toBe('placeholder-email')
    
    const passwordInput = wrapper.find('input[name="password"]')
    expect(passwordInput.attributes('placeholder')).toBe('placeholder-password')
  })

  it('validates the form and shows errors for invalid inputs', async () => {
    const wrapper = mount(FormPage)
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()
    expect(wrapper.find("[data-test='errors']").text()).toBe('errors.required-email')
  })

  it('submits the form with valid inputs and emits events', async () => {
    const wrapper = mount(FormPage)
    await wrapper.findComponent(EmailInput).find('input').setValue('test@example.com')
    await wrapper.findComponent(PasswordInput).find('input').setValue('ValidPass123!')
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()
    expect(wrapper.find("[data-test='errors']").exists()).toBe(false);
  })
})
