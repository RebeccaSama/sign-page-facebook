import { nextTick } from 'vue'
import { type VueWrapper, mount } from '@vue/test-utils'
import { expect, describe, it, vi, beforeEach } from 'vitest'
import { useRouter } from 'vue-router'

import ForgotPasswordComponent from '@/views/ForgotPassword.vue'
import EmailInput from '@/components/EmailInput.vue'
import ButtonSign from '@/components/ButtonSign.vue'

describe('ForgotPasswordComponent', () => {
  let wrapper: VueWrapper;

  const router = useRouter();

  beforeEach(() => {
    vi.mock('vue-i18n')
    vi.mock('vue-router')
    router.push = vi.fn();
    vi.mocked(useRouter).mockImplementationOnce(() => router);
    wrapper = mount(ForgotPasswordComponent);
  })

  it.only('renders the form with the correct sub-components and placeholders', () => {
    expect(wrapper.findComponent(EmailInput).exists()).toBe(true)
    expect(wrapper.findComponent(ButtonSign).exists()).toBe(true)
    expect(wrapper.findComponent(ButtonSign).props('buttonTitle')).toBe('btn-reset-link')
  })

  it('validates the form and shows errors for invalid inputs', async () => {
    await wrapper.findComponent(ButtonSign).trigger('click')
    await nextTick()
    expect(wrapper.find("[data-test='errors']").text()).toBe('errors.required-email')
  })

  it('validates the form and shows errors for invalid inputs', async () => {
    await wrapper.findComponent(EmailInput).find('input').setValue('test@example')
    await wrapper.findComponent(ButtonSign).trigger('click')

    await nextTick()
    expect(wrapper.find("[data-test='errors']").text()).toBe('errors.invalid-email')
  })

  it('submits the form with valid inputs and navigates to the home page', async () => {
    await wrapper.findComponent(EmailInput).find('input').setValue('test@example.com')
    await wrapper.findComponent(ButtonSign).trigger('click')
    await nextTick()
    expect(router.push).toHaveBeenCalledWith({ path: '/' })
  })
})
