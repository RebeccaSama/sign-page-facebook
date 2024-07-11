import { VueWrapper, mount } from '@vue/test-utils';
import { expect, describe, it, vi, beforeEach } from 'vitest';
import PasswordInput from '@/components/PasswordInput.vue';

describe('PasswordInputComponent', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(async () => {
    vi.mock('vue-i18n');
    wrapper = mount(PasswordInput);
    await wrapper.vm.$nextTick(); 
  });

  it('renders the input with the correct placeholder', () => {
    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe('placeholder_password');
  });

  it('should initially show the password input as type "password"', () => {
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('input[type="text"]').exists()).toBe(false);
  });

  it('should show the password when clicking on the toggle button', async () => {
    const toggleButton = wrapper.find('#show_hide');
    expect(toggleButton.exists()).toBe(true);

    await toggleButton.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('input[type="password"]').exists()).toBe(false);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });

  it('should click again to toggle back to hidden', async () => {
    const toggleButton = wrapper.find('#show_hide');
    expect(toggleButton.exists()).toBe(true);

    await toggleButton.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('input[type="password"]').exists()).toBe(false);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);

    await toggleButton.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('input[type="text"]').exists()).toBe(false);
  });
});
