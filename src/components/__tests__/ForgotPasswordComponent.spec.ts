import { nextTick } from 'vue'
import { type VueWrapper, mount } from '@vue/test-utils'
import { expect, describe, it, vi, beforeEach } from 'vitest'
import { useRouter } from 'vue-router'

import ForgotPasswordComponent from '@/views/ForgotPassword.vue'
import EmailInput from '@/components/EmailInput.vue'
import ButtonSign from '@/components/ButtonSign.vue'

describe('To validate a forgotten password', () => {
  let wrapper: VueWrapper;

  const router = useRouter();

  beforeEach(() => {
    vi.mock('vue-i18n')
    vi.mock('vue-router')
    router.push = vi.fn();
    vi.mocked(useRouter).mockImplementationOnce(() => router);
    wrapper = mount(ForgotPasswordComponent);
  })

  it('Check if input email and button exist', () => {
    expect(wrapper.findComponent(EmailInput).exists()).toBe(true)
    expect(wrapper.findComponent(ButtonSign).exists()).toBe(true)
    expect(wrapper.findComponent(ButtonSign).props('buttonTitle')).toBe('btn_reset_link')
  })

  it('validates the form and shows errors for required email', async () => {
    await wrapper.findComponent(ButtonSign).trigger('click')
    await nextTick()
    expect(wrapper.find("[data-test='errors']").text()).toBe('errors.required_email')
  })

  it('validates the form and shows errors for invalid email', async () => {
    await wrapper.findComponent(EmailInput).find('input').setValue('test@example')
    await wrapper.findComponent(ButtonSign).trigger('click')

    await nextTick()
    expect(wrapper.find("[data-test='errors']").text()).toBe('errors.invalid_email')
  })

  it.only('submits the form with valid inputs and navigates to log in page', async () => {
    await wrapper.findComponent(EmailInput).find('input').setValue('samarebe@gmail.com')
    await wrapper.findComponent(ButtonSign).trigger('click')
    await nextTick()
    expect(router.push).toHaveBeenCalledWith({ path: '/' })
  })
})
