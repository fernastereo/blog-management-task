import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ResultsPaginator from '../../../src/components/ResultsPaginator.vue'

describe('ResultsPaginator Component', () => {
  it('renders page numbers correctly', () => {
    const wrapper = mount(ResultsPaginator, {
      props: {
        currentPage: 2,
        totalPages: 5,
      },
    })

    const pageText = wrapper.text()
    expect(pageText).toContain('Showing page 2 of 5')
  })

  it('disables prev button on first page', () => {
    const wrapper = mount(ResultsPaginator, {
      props: {
        currentPage: 1,
        totalPages: 5,
      },
    })

    const prevButton = wrapper.findAll('button')[0]
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('disables next button on last page', () => {
    const wrapper = mount(ResultsPaginator, {
      props: {
        currentPage: 5,
        totalPages: 5,
      },
    })

    const nextButton = wrapper.findAll('button')[1]
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('emits prevPage event when prev button clicked', async () => {
    const wrapper = mount(ResultsPaginator, {
      props: {
        currentPage: 2,
        totalPages: 5,
      },
    })

    const prevButton = wrapper.findAll('button')[0]
    await prevButton.trigger('click')

    expect(wrapper.emitted('prevPage')).toBeTruthy()
  })

  it('emits nextPage event when next button clicked', async () => {
    const wrapper = mount(ResultsPaginator, {
      props: {
        currentPage: 2,
        totalPages: 5,
      },
    })

    const nextButton = wrapper.findAll('button')[1]
    await nextButton.trigger('click')

    expect(wrapper.emitted('nextPage')).toBeTruthy()
  })
})
