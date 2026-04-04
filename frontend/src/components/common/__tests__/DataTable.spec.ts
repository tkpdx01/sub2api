import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import DataTable from '../DataTable.vue'
import type { Column } from '../types'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key
  })
}))

const columns: Column[] = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' }
]

const rows = [
  { id: 1, name: 'Alpha', status: 'active' },
  { id: 2, name: 'Beta', status: 'inactive' }
]

function setViewport(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width
  })
  window.dispatchEvent(new Event('resize'))
}

describe('DataTable', () => {
  beforeEach(() => {
    setViewport(1280)
  })

  it('renders only the mobile card layout below the md breakpoint', async () => {
    setViewport(640)

    const wrapper = mount(DataTable, {
      props: {
        columns,
        data: rows
      }
    })

    await nextTick()
    await nextTick()

    expect(wrapper.classes()).toContain('space-y-3')
    expect(wrapper.find('.table-wrapper').exists()).toBe(false)
    expect(wrapper.find('table').exists()).toBe(false)
    expect(wrapper.text()).toContain('Alpha')
  })

  it('switches to the desktop table layout when the viewport grows', async () => {
    setViewport(640)

    const wrapper = mount(DataTable, {
      props: {
        columns,
        data: rows
      }
    })

    await nextTick()
    setViewport(1024)
    await nextTick()
    await nextTick()

    expect(wrapper.classes()).toContain('table-wrapper')
    expect(wrapper.find('.table-wrapper').exists()).toBe(true)
    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.text()).toContain('Beta')
  })
})
