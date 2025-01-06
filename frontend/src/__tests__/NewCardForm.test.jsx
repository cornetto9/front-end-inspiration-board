import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import NewCardForm from '../components/NewCardForm'

describe('NewCardForm Component', () => {
  const mockSubmit = vi.fn()

  it('renders form elements', () => {
    // Arrange
    render(<NewCardForm onCardSubmit={mockSubmit} />)
    
    // Act
    // No action needed for this test

    // Assert
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByText(/submit/i)).toBeInTheDocument()
  })

  it('validates empty message', () => {
    // Arrange
    render(<NewCardForm onCardSubmit={mockSubmit} />)
    
    // Act
    fireEvent.click(screen.getByText(/submit/i))
    
    // Assert
    expect(screen.getByText(/message is required/i)).toBeInTheDocument()
  })

//   it('validates message length', () => {
//     // Arrange
//     render(<NewCardForm onCardSubmit={mockSubmit} />)
//     fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'a'.repeat(41) } })
    
//     // Act
//     fireEvent.click(screen.getByText(/submit/i))
    
//     // Assert
//     expect(screen.getByText(/message cannot be more than 40 characters/i)).toBeInTheDocument()
//   })

  it('calls onCardSubmit with correct data', () => {
    // Arrange
    render(<NewCardForm onCardSubmit={mockSubmit} />)
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'New Message' } })
    
    // Act
    fireEvent.click(screen.getByText(/submit/i))
    
    // Assert
    expect(mockSubmit).toHaveBeenCalledWith({ message: 'New Message', likes_count: 1 })
  })
})