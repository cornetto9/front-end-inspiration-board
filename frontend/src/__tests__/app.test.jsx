import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from '../App'

describe('App Component', () => {
  it('renders welcome message', () => {
    // Arrange
    render(<App />)
    
    // Act
    // No action needed for this test

    // Assert
    expect(screen.getByText('Welcome to the Inspiration Board')).toBeInTheDocument()
  })

  it('toggles NewBoardForm visibility', () => {
    // Arrange
    render(<App />)
    
    // Act
    fireEvent.click(screen.getByText(/show new board form/i))
    
    // Assert
    expect(screen.getByText(/add board/i)).toBeInTheDocument()
    
    // Act
    fireEvent.click(screen.getByText(/hide new board form/i))
    
    // Assert
    expect(screen.queryByText(/add board/i)).not.toBeInTheDocument()
  })

  it('renders boards list', () => {
    // Arrange
    const mockBoards = [
      { id: 1, title: 'Board 1', owner: 'Owner 1' },
      { id: 2, title: 'Board 2', owner: 'Owner 2' }
    ]
    render(<App initialBoards={mockBoards} />)
    
    // Act
    // No action needed for this test

    // Assert
    expect(screen.getByText('Board 1 - Owner 1')).toBeInTheDocument()
    expect(screen.getByText('Board 2 - Owner 2')).toBeInTheDocument()
  })
})