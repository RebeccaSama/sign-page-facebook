import { VueWrapper, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { expect, describe, it, vi, beforeEach } from 'vitest';

import FormComponent from '@/components/FormComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import EmailInput from '@/components/EmailInput.vue';
import PasswordInput from '@/components/PasswordInput.vue';

describe('To submit the form', () => {
  let wrapper: VueWrapper; 

  beforeEach(() => {
    vi.mock("vue-i18n");
    wrapper = mount(FormComponent); 
  });

  it('should exist', () => {
    expect(wrapper.findComponent(FormComponent).exists()).toBe(true)
  })

  it('should render the awated email component with correct props', () => {
    expect(wrapper.findComponent(EmailInput).exists()).toBe(true);
    
    const emailInput = wrapper.find('input[name="email"]');
    expect(emailInput.attributes('placeholder')).toBe('placeholder_email');
  });

  it('should render the awated password component with correct props', () => {
    expect(wrapper.findComponent(PasswordInput).exists()).toBe(true);
   
    const passwordInput = wrapper.find('input[name="password"]');
    expect(passwordInput.attributes('placeholder')).toBe('placeholder_password');
  });

  it('should render the awated button component with correct props', () => {
    expect(wrapper.findComponent(ButtonComponent).exists()).toBe(true);
    expect(wrapper.findComponent(ButtonComponent).props('title')).toBe('btn_login')

  });

  it('show errors message after click if email input is empty', async () => {
    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();
    expect(wrapper.find("[data-test='errors']").text()).toBe('errors.required_email');
  });

  it('submits the form with valid inputs and emits events', async () => {
    await wrapper.findComponent(EmailInput).find('input').setValue('samarebe@gmail.com');
    await wrapper.findComponent(PasswordInput).find('input').setValue('AZaz@1');
    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();
    expect(wrapper.find("[data-test='errors']").exists()).toBe(false);
  });
});
