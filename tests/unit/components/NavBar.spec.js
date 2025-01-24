import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import NavBar from '../../../src/components/NavBar.vue'

// Simple RouterLink mock
const RouterLinkStub = {
  template: '<a><slot /></a>',
  props: ['to', 'exact', 'activeClass'],
}

describe('Navigation Component', () => {
  it('renders component with correct title', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
    expect(wrapper.text()).toContain('Koro Blog')
  })

  it('renders two router links', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
    const routerLinks = wrapper.findAllComponents(RouterLinkStub)
    expect(routerLinks.length).toBe(2)
  })

  it('has correct router link destinations', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
    const routerLinks = wrapper.findAllComponents(RouterLinkStub)

    expect(routerLinks[0].props('to')).toBe('/')
    expect(routerLinks[1].props('to')).toBe('/details')
  })

  it('has correct link text', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
    const routerLinks = wrapper.findAllComponents(RouterLinkStub)

    expect(routerLinks[0].text()).toBe('List View')
    expect(routerLinks[1].text()).toBe('Details View')
  })

  it('configures active classes correctly', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
    const routerLinks = wrapper.findAllComponents(RouterLinkStub)

    expect(routerLinks[0].props('exact')).toBe(true)
    expect(routerLinks[1].props('exact')).toBe(true)
    expect(routerLinks[0].props('activeClass')).toBe('text-green-600')
    expect(routerLinks[1].props('activeClass')).toBe('text-green-600')
  })
})
