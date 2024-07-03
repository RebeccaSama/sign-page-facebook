import { mount } from '@vue/test-utils'
import { expect, describe, it, vi, beforeEach } from 'vitest'
import EmailInputComponent from '@/components/EmailInput.vue'

describe('EmailInputComponent', () => {
  beforeEach(() => {
    vi.mock('vue-i18n')
  })

  it('renders the input with the correct placeholder', () => {
    const wrapper = mount(EmailInputComponent)

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('placeholder-email')
  })
})
