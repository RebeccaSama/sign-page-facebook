import { VueWrapper, mount } from '@vue/test-utils'
import { expect, describe, it, vi, beforeEach } from 'vitest'
import EmailInput from '@/components/EmailInput.vue'

describe('Email Input', () => {
  let wrapper: VueWrapper;
  beforeEach(() => {
    vi.mock('vue-i18n')
     wrapper = mount(EmailInput)
  })
  it('Should exist', () => {
    expect(wrapper.findComponent(EmailInput).exists()).toBe(true)
  })
  it('renders the input with the correct placeholder', () => {
    expect(wrapper.findComponent(EmailInput))
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('placeholder_email')
  })
})
