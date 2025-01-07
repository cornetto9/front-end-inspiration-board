import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from '../components/Card';

describe('Card Component', () => {
  const mockCard = {
    id: 1,
    message: 'Test Message',
    likesCount: 5,
  };

  const mockDelete = vi.fn();
  const mockLike = vi.fn();

  it('renders card message', () => {
    // Arrange
    render(<Card card={mockCard} onDelete={mockDelete} onLike={mockLike} />);
    
    // Act
    // No action needed for this test

    // Assert
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('calls onDelete when delete button clicked', () => {
    // Arrange
    render(<Card card={mockCard} onDelete={mockDelete} onLike={mockLike} />);
    
    // Act
    fireEvent.click(screen.getByText('Delete'));
    
    // Assert
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it('calls onLike when like button clicked', () => {
    // Arrange
    render(<Card card={mockCard} onDelete={mockDelete} onLike={mockLike} />);
    
    // Act
    const likeButton = screen.getByRole('button', { name: /5/i });
    fireEvent.click(likeButton);
    
    // Assert
    expect(mockLike).toHaveBeenCalledWith(1);
  });
});