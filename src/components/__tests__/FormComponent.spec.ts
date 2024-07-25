import { VueWrapper, mount } from '@vue/test-utils';
import { expect, describe, it, vi, beforeEach } from 'vitest';
import { useRouter } from 'vue-router';
import { afterEach } from 'node:test';

import FormComponent from '@/components/FormComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import EmailInput from '@/components/EmailInput.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import ModalComponent from '@/components/ModalComponent.vue';

  const router = useRouter();
  describe('To submit the form', () => {
    let wrapper: VueWrapper;
      localStorage.setItem(
        'useCredentials',
        JSON.stringify({
          email: 'samarebe@gmail.com',
          password: 'AZaz@1'
        })
      )

    beforeEach(() => {
      vi.mock('vue-i18n');
      vi.mock('vue-router')
    router.push = vi.fn();
    vi.mocked(useRouter).mockImplementationOnce(() => router);
           wrapper = mount(FormComponent, {
            global: {
              components: { EmailInput, PasswordInput, ModalComponent }
            }
          });
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });
  
  it('should exist', () => {
    expect(wrapper.findComponent(FormComponent).exists()).toBe(true)
  })

  it('should render the awated Modal component with correct props', async () => {
    await wrapper.findComponent(EmailInput).find('input').setValue('samar@gmail.com');
    await wrapper.findComponent(PasswordInput).find('input').setValue('AOaz@1');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.find("[data-test='modal-wrapper']").exists()).toBe(true);
  });

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

  it('should render the awated buttons components with correct props', () => {
    const buttons =wrapper.findAllComponents(ButtonComponent)
    expect(buttons.length).toBe(2);
    buttons.forEach((button,index) => {
      expect(button.props('title')).toBe(buttonTitles[index]);
    });
  });
  it('submits the form with valid inputs', async () => {
    await wrapper.findComponent(EmailInput).find('input').setValue('samarebe@gmail.com');
    await wrapper.findComponent(PasswordInput).find('input').setValue('AZaz@1');
    await wrapper.find('#loginButton').trigger('click');
    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith("/home");
  });

  describe("Submition should fail", () => {
    it('when the email and password field are empty', async () => {      
      await wrapper.find('#loginButton').trigger('click');
      
      const emailErrors = wrapper.findComponent(EmailInput).find("[data-test='errors']");
      const passwordErrors = wrapper.findComponent(PasswordInput).find("[data-test='errors']");
  
      expect(emailErrors.text()).toContain('errors.required_email');
      expect(passwordErrors.text()).toContain('errors.required_password');
    });
  
   it("when the email and password entered have not yet been saved", async () => {
      await wrapper.findComponent(EmailInput).find('input').setValue('sama@gmail.com');
      await wrapper.findComponent(PasswordInput).find('input').setValue('AZrt@1');  
      await wrapper.find('#loginButton').trigger('click');
      
      const modal = wrapper.find("[data-test='modal-wrapper']");
      expect(modal.exists()).toBe(true);
      expect(modal.text()).toContain('user_not_found')
    });
  
    it("when the entered email exists and the entered password does not match", async () => {
      await wrapper.findComponent(EmailInput).find('input').setValue('samarebe@gmail.com');
      await wrapper.findComponent(PasswordInput).find('input').setValue('QSqs1@');
      await wrapper.find('#loginButton').trigger('click');
      const modal = wrapper.find("[data-test='modal-wrapper']");
      expect(modal.exists()).toBe(true); 
      expect(modal.text()).toContain('user_not_found') 
    });
  
    it("when the entered email does not exist and the password is correct", async () => {
      await wrapper.findComponent(EmailInput).find('input').setValue('sama@gmail.com');
      await wrapper.findComponent(PasswordInput).find('input').setValue('AZaz@1');
      await wrapper.find('#loginButton').trigger('click');
      const modal = wrapper.find("[data-test='modal-wrapper']");
      expect(modal.exists()).toBe(true);
      expect(modal.text()).toContain('user_not_found')
    });
  
    it("when the email or password entered does not respect the defined format ", async () => {
      await wrapper.findComponent(EmailInput).find('input').setValue('wrong@email');
      await wrapper.findComponent(PasswordInput).find('input').setValue('QSrrrr');
      await wrapper.find('#loginButton').trigger('click');

      const emailErrors = wrapper.findComponent({ name: 'EmailInput' }).find("[data-test='errors']");
      const passwordErrors = wrapper.findComponent({ name: 'PasswordInput' }).find("[data-test='errors']");
  
      expect(emailErrors.text()).toContain('errors.invalid_email');
      expect(passwordErrors.text()).toContain('errors.invalid_password');
    });

    
  });

  const buttonTitles = ['btn_login','btn_create_new_account']

});
