import { VueWrapper, mount } from '@vue/test-utils'
import { expect, describe, it, vi, beforeEach } from 'vitest'
import EmailInput from '@/components/EmailInput.vue'

describe('EmailInput', () => {
  let wrapper: VueWrapper;
  beforeEach(() => {
    vi.mock('vue-i18n')
     wrapper = mount(EmailInput)
  })
  it('should exist', () => {
    expect(wrapper.findComponent(EmailInput).exists()).toBe(true)
  })
  it('renders the input with the correct placeholder', () => {
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('placeholder_email')
  })
})
