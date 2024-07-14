import { VueWrapper, mount } from '@vue/test-utils';
import { expect, describe, it, vi, beforeEach } from 'vitest';
import ButtonComponent from '@/components/ButtonComponent.vue';

describe('ButtonComponent', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    vi.mock('vue-i18n');
    wrapper = mount(ButtonComponent, {
      props: {
        title: 'title',
      },
    });
  });

  it('check if the button exists', () => {
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('displays button text correctly', () => {
    expect(wrapper.text()).toContain('title');
  });

});
