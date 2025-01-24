import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PostComments from '../../../src/components/PostComments.vue'

describe('PostComments Component', () => {
  const mockComments = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      body: 'Great post!',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      body: 'Very informative article',
    },
  ]

  it('renders correct number of comments', () => {
    const wrapper = mount(PostComments, {
      props: { comments: mockComments },
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })

    const commentItems = wrapper.findAll('.divide-y .py-6')
    expect(commentItems.length).toBe(2)
  })

  it('displays correct comment details', () => {
    const wrapper = mount(PostComments, {
      props: { comments: mockComments },
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })

    const firstComment = wrapper.findAll('.divide-y .py-6')[0]
    expect(firstComment.text()).toContain('John Doe')
    expect(firstComment.text()).toContain('john@example.com')
    expect(firstComment.text()).toContain('Great post!')
  })
})
