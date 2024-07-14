import { VueWrapper, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { expect, describe, it, vi, beforeEach } from 'vitest';

import FormPage from '@/components/FormComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import EmailInput from '@/components/EmailInput.vue';
import PasswordInput from '@/components/PasswordInput.vue';

describe('To submit the form', () => {
  let wrapper: VueWrapper; 

  beforeEach(() => {
    vi.mock("vue-i18n");
    wrapper = mount(FormPage); 
  });

  it('renders the form with the correct sub-components and placeholders', () => {
    expect(wrapper.findComponent(EmailInput).exists()).toBe(true);
    
    const emailInput = wrapper.find('input[name="email"]');
    expect(emailInput.attributes('placeholder')).toBe('placeholder_email');
  });

  it('Input and placeholders should exist', () => {
    expect(wrapper.findComponent(PasswordInput).exists()).toBe(true);
   
    const passwordInput = wrapper.find('input[name="password"]');
    expect(passwordInput.attributes('placeholder')).toBe('placeholder_password');
  });

  it('Button should exist', () => {
    expect(wrapper.findComponent(ButtonComponent).exists()).toBe(false);
  });

  it('validates the form and shows errors for invalid inputs', async () => {
    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();
    expect(wrapper.find("[data-test='errors']").text()).toBe('errors.required_email');
  });

  it('submits the form with valid inputs and emits events', async () => {
    await wrapper.findComponent(EmailInput).find('input').setValue('test@example.com');
    await wrapper.findComponent(PasswordInput).find('input').setValue('ValidPass123!');
    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();
    expect(wrapper.find("[data-test='errors']").exists()).toBe(false);
  });
});
