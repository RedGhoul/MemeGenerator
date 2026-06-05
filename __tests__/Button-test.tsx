/**
 * Component tests for the Button component.
 *
 * @format
 */
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native'
import Button from '@/Components/Button/Button'

describe('Button', () => {
  it('renders its title', () => {
    render(<Button title="Create Meme" onPress={() => {}} />)
    expect(screen.getByText('Create Meme')).toBeTruthy()
  })

  it('calls onPress when tapped', () => {
    const onPress = jest.fn()
    render(<Button title="Tap" onPress={onPress} />)

    fireEvent.press(screen.getByText('Tap'))

    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('does not call onPress while disabled', () => {
    const onPress = jest.fn()
    render(<Button title="Nope" onPress={onPress} disabled />)

    fireEvent.press(screen.getByRole('button'))

    expect(onPress).not.toHaveBeenCalled()
  })

  it('shows a loading indicator instead of the title when loading', () => {
    render(<Button title="Loading" onPress={() => {}} loading />)
    expect(screen.queryByText('Loading')).toBeNull()
  })
})
