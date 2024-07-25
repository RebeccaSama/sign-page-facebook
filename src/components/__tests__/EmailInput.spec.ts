import { VueWrapper, mount } from '@vue/test-utils'
import { expect, describe, it, vi, beforeEach } from 'vitest'
import EmailInput from '@/components/EmailInput.vue'
import { nextTick } from 'node:process';

describe('EmailInput', () => {
  let wrapper: VueWrapper;
  beforeEach(() => {
    vi.mock('vue-i18n')
     wrapper = mount(EmailInput, {
      props: {
        errorMessages: []
      }
    })
  })
  it('should exist', () => {
    expect(wrapper.findComponent(EmailInput).exists()).toBe(true)
  })
  it('renders the input with the correct placeholder', () => {
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('placeholder_email')
  })
 describe.only("Error", () => {
    it('show errors message if email input is empty', async () => {
      expect(wrapper.find("[data-test='errors']").exists()).toBe(false)
      await wrapper.setProps({
        errorMessages: [{$message: "errors.required_email"}]
      })
      expect(wrapper.find("[data-test='errors']").exists()).toBe(true)
      expect(wrapper.find("[data-test='errors']").text()).toContain('errors.required_email')
    });
    it('show errors message if email input is invalid', async () => {
      await wrapper.find('input').setValue('test@example');
      expect(wrapper.find("[data-test='errors']").exists()).toBe(false)
      await wrapper.setProps({
        errorMessages: [{$message: "errors.invalid_email"}]
      })
      expect(wrapper.find("[data-test='errors']").exists()).toBe(true)
      expect(wrapper.find("[data-test='errors']").text()).toContain('errors.invalid_email')
    });
    it('show errors message if email input is too long', async () => {
      await wrapper.find('input').setValue('a'.repeat(101));
      expect(wrapper.find("[data-test='errors']").exists()).toBe(false)
      await wrapper.setProps({
        errorMessages: [{$message: "errors.email_too_long"}]
      })
      expect(wrapper.find("[data-test='errors']").exists()).toBe(true)
      expect(wrapper.find("[data-test='errors']").text()).toContain('errors.email_too_long')
    });
    it('show errors message after click if email input is not in the correct format', async () => {
      expect(wrapper.find("[data-test='errors']").exists()).toBe(false)
      await wrapper.setProps({
        errorMessages: [{$message: "errors.invalid_email"}]
      })
      expect(wrapper.find("[data-test='errors']").exists()).toBe(true)
      expect(wrapper.find("[data-test='errors']").text()).toContain('errors.invalid_email')
    });
    
  })
})
