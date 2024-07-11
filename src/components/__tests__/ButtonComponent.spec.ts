import { VueWrapper, mount } from '@vue/test-utils';
import { expect, describe, it, vi, beforeEach } from 'vitest';
import ButtonSign from '@/components/ButtonSign.vue';

describe('ButtonSignComponent', () => {
  let wrapper: VueWrapper;
  let onSubmit: any; 

  beforeEach(() => {
    vi.mock('vue-i18n');
    onSubmit = vi.fn(); 
    wrapper = mount(ButtonSign, {
      props: {
        buttonTitle: 'Submit',
        onSubmit,
      },
    });
  });

  it('check if the button exists', () => {
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('displays button text correctly', () => {
    expect(wrapper.text()).toContain('Submit');
  });

});
