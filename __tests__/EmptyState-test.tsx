/**
 * Render tests for the EmptyState component.
 *
 * @format
 */
import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { EmptyState } from '@/Components'

describe('EmptyState', () => {
  it('renders the title and message', () => {
    const { getByText } = render(
      <EmptyState title="No favorites yet" message="Tap the heart to save one." />
    )
    expect(getByText('No favorites yet')).toBeTruthy()
    expect(getByText('Tap the heart to save one.')).toBeTruthy()
  })

  it('renders an action button and fires onAction when pressed', () => {
    const onAction = jest.fn()
    const { getByText } = render(
      <EmptyState title="Couldn't load" actionLabel="Retry" onAction={onAction} />
    )
    fireEvent.press(getByText('Retry'))
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('does not render an action button without a label', () => {
    const { queryByText } = render(<EmptyState title="Nothing here" />)
    expect(queryByText('Retry')).toBeNull()
  })
})
