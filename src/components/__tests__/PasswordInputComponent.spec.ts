import { VueWrapper, mount } from '@vue/test-utils'
import { expect, describe, it, vi, beforeEach } from 'vitest'

import PasswordInput from '@/components/PasswordInput.vue'



describe('PasswordInputComponent', () => {
  let wrapper: VueWrapper;
  beforeEach(() => {
    vi.mock('vue-i18n')
    wrapper = mount(PasswordInput)
  })
  it('renders the input with the correct placeholder', () => {
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('placeholder-password')
  })
})
