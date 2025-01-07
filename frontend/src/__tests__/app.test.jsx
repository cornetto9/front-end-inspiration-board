import { render, screen, waitFor} from '@testing-library/react';
import { describe, it, expect} from 'vitest';
import App from '../App';

describe('App Component', () => {
  it('renders welcome message', async () => {
    // Arrange
    render(<App />);
    
    // Act
    // Wait for the component to finish loading
    await waitFor(() => expect(screen.getByText('Welcome to the Inspiration Board')).toBeInTheDocument());
  });
});
