import { mount } from '@vue/test-utils'
import { vi, expect, describe, it } from 'vitest'
import ButtonSign from '@/components/ButtonSign.vue'

describe('ButtonComponent', () => {
  it('affiche le texte du bouton correctement', () => {
    const buttonTitle = 'Submit'
    const wrapper = mount(ButtonSign, {
      props: {
        buttonTitle,
        onSubmit: vi.fn()
      }
    })
    expect(wrapper.text()).toContain(buttonTitle)
  })

  it('appelle la fonction onSubmit lorsque le bouton est cliqué', async () => {
    const onSubmit = vi.fn()
    const wrapper = mount(ButtonSign, {
      props: {
        buttonTitle: 'Submit',
        onSubmit
      }
    })
    await wrapper.find('button').trigger('click')
    expect(onSubmit).toHaveBeenCalled()
  })

  it('émet l\'événement "submitted" lorsque le bouton est cliqué', async () => {
    const wrapper = mount(ButtonSign, {
      props: {
        buttonTitle: 'Submit',
        onSubmit: vi.fn()
      }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('submitted')
  })
})
