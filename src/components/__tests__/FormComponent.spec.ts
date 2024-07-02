import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { expect, describe, it } from 'vitest'
import EmailInput from '@/components/EmailInput.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import ButtonSign from '@/components/ButtonSign.vue'
import FormPageComponent from '@/views/FormPage.vue'


describe('FormComponent', () => {
  it('renders the form with the correct sub-components and placeholders', () => {
    const wrapper = mount(FormPageComponent)
    
    expect(wrapper.findComponent(EmailInput).exists()).toBe(true)
    expect(wrapper.findComponent(PasswordInput).exists()).toBe(true)
    expect(wrapper.findComponent(ButtonSign).exists()).toBe(true)
    
    const emailInput = wrapper.find('input[name="email"]')
    expect(emailInput.attributes('placeholder')).toBe('placeholder-email')
    
    const passwordInput = wrapper.find('input[name="password"]')
    expect(passwordInput.attributes('placeholder')).toBe('Enter your password')
  })

  it('validates the form and shows errors for invalid inputs', async () => {
    const wrapper = mount(FormPage)

    await wrapper.find('form').trigger('submit.prevent')

    await nextTick()
    expect(wrapper.text()).toContain('Email is required')
    expect(wrapper.text()).toContain('Password is required')
  })

  it('submits the form with valid inputs and emits events', async () => {
    const wrapper = mount(FormPage)

    await wrapper.findComponent(EmailInput).find('input').setValue('test@example.com')
    await wrapper.findComponent(PasswordInput).find('input').setValue('ValidPass123!')
    await wrapper.find('form').trigger('submit.prevent')

    await nextTick()
    expect(wrapper.text()).not.toContain('Email is required')
    expect(wrapper.text()).not.toContain('Password is required')
  
  })
})
