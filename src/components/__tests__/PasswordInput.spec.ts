import { VueWrapper, mount } from '@vue/test-utils';
import { expect, describe, it, vi, beforeEach } from 'vitest';
import PasswordInput from '@/components/PasswordInput.vue';
import { nextTick } from 'vue';

describe('PasswordInput', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(async () => {
    vi.mock('vue-i18n');
    wrapper = mount(PasswordInput); 
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
    await nextTick();

    expect(wrapper.find('input[type="password"]').exists()).toBe(false);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });

  it('should click again to toggle back to hidden', async () => {
    const toggleButton = wrapper.find('#show_hide');
    expect(toggleButton.exists()).toBe(true);

    await toggleButton.trigger('click');
    await nextTick();

    expect(wrapper.find('input[type="password"]').exists()).toBe(false);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);

    await toggleButton.trigger('click');
    await nextTick();

    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('input[type="text"]').exists()).toBe(false);
  });
  describe('error', () => {
    it("when password size is less than 6 ", async () => {
      await wrapper.find('input').setValue('QSr');
      expect(wrapper.find("[data-test='errors']").exists()).toBe(false)
      await wrapper.setProps({
        errorMessages: [{$message: "errors.invalid_password_length"}]
      })
      expect(wrapper.find("[data-test='errors']").exists()).toBe(true)
      expect(wrapper.find("[data-test='errors']").text()).toContain('errors.invalid_password_length')
    });

    it('when the password input is empty', async () => {
      await wrapper.find('input').setValue('');
      expect(wrapper.find("[data-test='errors']").exists()).toBe(false)
      await wrapper.setProps({
        errorMessages: [{$message: "errors.required_password"}]
      })
      expect(wrapper.find("[data-test='errors']").exists()).toBe(true)
      expect(wrapper.find("[data-test='errors']").text()).toContain('errors.required_password')
    })
  });

  it('when password formatting is invalid', async () => {
    await wrapper.find('input').setValue('QSr887');
    expect(wrapper.find("[data-test='errors']").exists()).toBe(false)
    await wrapper.setProps({
      errorMessages: [{$message: "errors.invalid_password"}]
    })
    expect(wrapper.find("[data-test='errors']").exists()).toBe(true)
    expect(wrapper.find("[data-test='errors']").text()).toContain('errors.invalid_password')
  })
});
