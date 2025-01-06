import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Board from '../components/Board'

describe('Board Component', () => {
  const mockBoard = {
    title: 'Test Board',
    cards: [
      { id: 1, text: 'Card 1', likes: 2 },
      { id: 2, text: 'Card 2', likes: 3 }
    ]
  }

  it('renders board title', () => {
    // Arrange
    render(<Board board={mockBoard} />)
    
    // Act
    // No action needed for this test

    // Assert
    expect(screen.getByText('Test Board')).toBeInTheDocument()
  })

  it('sorts cards alphabetically', () => {
    // Arrange
    render(<Board board={mockBoard} />)
    
    // Act
    fireEvent.click(screen.getByText(/sort alphabetically/i))
    
    // Assert
    // Add assertions to check the order of cards
  })

  it('sorts cards by likes', () => {
    // Arrange
    render(<Board board={mockBoard} />)
    
    // Act
    fireEvent.click(screen.getByText(/sort by number of \+1s/i))
    
    // Assert
    // Add assertions to check the order of cards
  })
})