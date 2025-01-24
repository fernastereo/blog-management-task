import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import SearchBar from '../../../src/components/SearchBar.vue'

describe('SearchBar Component', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders input field', () => {
    const wrapper = mount(SearchBar, {
      global: {
        plugins: [createPinia()],
        stubs: {
          ModalPost: true,
        },
      },
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Search Post...')
  })

  it('renders new post modal', () => {
    const wrapper = mount(SearchBar, {
      global: {
        plugins: [createPinia()],
        stubs: {
          ModalPost: true,
        },
      },
    })

    const modalPost = wrapper.findComponent({ name: 'ModalPost' })
    expect(modalPost.exists()).toBe(true)
  })
})
