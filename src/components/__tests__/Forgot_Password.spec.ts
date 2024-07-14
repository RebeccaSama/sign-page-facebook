import { nextTick } from 'vue'
import { type VueWrapper, mount } from '@vue/test-utils'
import { expect, describe, it, vi, beforeEach } from 'vitest'
import { useRouter } from 'vue-router'

import ForgotPassword from '@/views/ForgotPassword.vue'
import EmailInput from '@/components/EmailInput.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

describe('To validate a forgotten password', () => {
  let wrapper: VueWrapper;

  const router = useRouter();

  beforeEach(() => {
    vi.mock('vue-i18n')
    vi.mock('vue-router')
    router.push = vi.fn();
    vi.mocked(useRouter).mockImplementationOnce(() => router);
    wrapper = mount(ForgotPassword);
  })

  it('Email and button should exist', () => {
    expect(wrapper.findComponent(EmailInput).exists()).toBe(true)
    expect(wrapper.findComponent(ButtonComponent).exists()).toBe(true)
    expect(wrapper.findComponent(ButtonComponent).props('buttonTitle')).toBe('btn_reset_link')
  })

  it('validates the form and shows errors for required email', async () => {
    await wrapper.findComponent(ButtonComponent).trigger('click')
    await nextTick()
    expect(wrapper.find("[data-test='errors']").text()).toBe('errors.required_email')
  })

  it('validates the form and shows errors for invalid email', async () => {
    await wrapper.findComponent(EmailInput).find('input').setValue('test@example')
    await wrapper.findComponent(ButtonComponent).trigger('click')

    await nextTick()
    expect(wrapper.find("[data-test='errors']").text()).toBe('errors.invalid_email')
  })

  it.only('submits the form with valid inputs and navigates to log in page', async () => {
    await wrapper.findComponent(EmailInput).find('input').setValue('samarebe@gmail.com')
    await wrapper.findComponent(ButtonComponent).trigger('click')
    await nextTick()
    expect(router.push).toHaveBeenCalledWith({ path: '/' })
  })
})
