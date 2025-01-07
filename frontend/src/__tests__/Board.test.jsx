import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Board from '../components/Board'

describe('Board Component', () => {
    const mockBoards = [
      { id: 1, title: 'Board 1', owner: 'Owner 1' },
      { id: 2, title: 'Board 2', owner: 'Owner 2' }
    ];
  
    const mockHandleClick = vi.fn();
    const mockSetShowNewForm = vi.fn();
  
    it('renders board title', () => {
      // Arrange
      render(<Board boards={mockBoards} handleClick={mockHandleClick} setShowNewForm={mockSetShowNewForm} showNewForm={false} />);
      
      // Act
      // No action needed for this test
  
      // Assert
      expect(screen.getByText('Boards')).toBeInTheDocument();
    });
  
    it('renders boards list', () => {
      // Arrange
      render(<Board boards={mockBoards} handleClick={mockHandleClick} setShowNewForm={mockSetShowNewForm} showNewForm={false} />);
      
      // Act
      // No action needed for this test
  
      // Assert
      expect(screen.getByText('Board 1 - Owner 1')).toBeInTheDocument();
      expect(screen.getByText('Board 2 - Owner 2')).toBeInTheDocument();
    });
  
    it('toggles NewBoardForm visibility', () => {
      // Arrange
      render(<Board boards={mockBoards} handleClick={mockHandleClick} setShowNewForm={mockSetShowNewForm} showNewForm={false} />);
      
      // Act
      fireEvent.click(screen.getByText(/click to show board form/i));
      
      // Assert
      expect(mockSetShowNewForm).toHaveBeenCalledWith(true);
    });
  });