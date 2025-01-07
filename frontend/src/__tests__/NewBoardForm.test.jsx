import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NewBoardForm from '../components/NewBoardForm';

describe('NewBoardForm Component', () => {
  const mockAddBoard = vi.fn();
  const mockSetShowNewForm = vi.fn();

  it('renders form elements', () => {
    // Arrange
    render(<NewBoardForm addBoard={mockAddBoard} setShowNewForm={mockSetShowNewForm} showNewForm={false} />);
    
    // Act
    // No action needed for this test

    // Assert
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/owner/i)).toBeInTheDocument();
    expect(screen.getByText(/add board/i)).toBeInTheDocument();
  });

  it('validates empty fields', () => {
    // Arrange
    render(<NewBoardForm addBoard={mockAddBoard} setShowNewForm={mockSetShowNewForm} showNewForm={false} />);
    
    // Act
    fireEvent.click(screen.getByText(/add board/i));
    
    // Assert
    expect(screen.getByText(/both title and owner are required/i)).toBeInTheDocument();
  });

  it('calls addBoard with correct data', () => {
    // Arrange
    render(<NewBoardForm addBoard={mockAddBoard} setShowNewForm={mockSetShowNewForm} showNewForm={false} />);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Board' } });
    fireEvent.change(screen.getByLabelText(/owner/i), { target: { value: 'Owner Name' } });
    
    // Act
    fireEvent.click(screen.getByText(/add board/i));
    
    // Assert
    expect(mockAddBoard).toHaveBeenCalledWith({ title: 'New Board', owner: 'Owner Name' });
  });
});