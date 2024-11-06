import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../../App.vue'
import SinInput from '../SinInput.vue'

describe('App', (): void => {
  it('show valid SIN number dialog', async (): Promise<void> => {
    const appWrapper = mount(App)
    const sinNumberInput = appWrapper
      .findComponent(SinInput)
      .find('input[type=text]')

    await sinNumberInput.setValue('046454286')
    await sinNumberInput.trigger('blur')

    const dialogTexxt = appWrapper.find('.dialog-text')
    expect(dialogTexxt.element.textContent).toBe(' Valid SIN Number... ')
  })

  it('show invalid SIN number dialog', async (): Promise<void> => {
    const appWrapper = mount(App)
    const sinNumberInput = appWrapper
      .findComponent(SinInput)
      .find('input[type=text]')

    await sinNumberInput.setValue('123456789')
    await sinNumberInput.trigger('blur')

    const dialogTexxt = appWrapper.find('.dialog-text')
    expect(dialogTexxt.element.textContent).toBe(' Invalid SIN Number... ')
  })
})
