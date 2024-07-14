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

  it('should exist', () => {
    expect(wrapper.findComponent(ForgotPassword).exists()).toBe(true)
  })

  it('should render Email component with correct props', () => {
    expect(wrapper.findComponent(EmailInput).exists()).toBe(true)
  })

  it('should render button component with correct props', () => {
    expect(wrapper.findComponent(ButtonComponent).exists()).toBe(true)
    expect(wrapper.findComponent(ButtonComponent).props('title')).toBe('btn_reset_link')
  })

  it('show errors message after click if email input is empty', async () => {
    await wrapper.findComponent(ButtonComponent).trigger('click')
    await nextTick()
    expect(wrapper.find("[data-test='errors']").text()).toBe('errors.required_email')
  })

  it('show errors message after click if email input is invalid', async () => {
    await wrapper.findComponent(EmailInput).find('input').setValue('test@example')
    await wrapper.findComponent(ButtonComponent).trigger('click')

    await nextTick()
    expect(wrapper.find("[data-test='errors']").text()).toBe('errors.invalid_email')
  })

  it('should succed if all fill are filled correctly', async () => {
    await wrapper.findComponent(EmailInput).find('input').setValue('samarebe@gmail.com')
    await wrapper.findComponent(ButtonComponent).trigger('click')
    await nextTick()
    expect(router.push).toHaveBeenCalledWith({ path: '/' })
  })
})
