import { VueWrapper, mount } from '@vue/test-utils'
import { expect, describe, it, vi, beforeEach } from 'vitest'
import EmailInputComponent from '@/components/EmailInput.vue'

describe('EmailInputComponent', () => {
  let wrapper: VueWrapper;
  beforeEach(() => {
    vi.mock('vue-i18n')
     wrapper = mount(EmailInputComponent)
  })
  it('renders the form with the correct sub-components and placeholders', () => {
    expect(wrapper.findComponent(EmailInputComponent).exists()).toBe(true)
  })
  it('renders the input with the correct placeholder', () => {
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('placeholder_email')
  })
})
