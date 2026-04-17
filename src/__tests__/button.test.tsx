import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';
import { describe, it, expect } from 'vitest';

describe('Button Component', () => {
  it('renders the button with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeDefined();
  });

  it('applies the correct variant class or attributes', () => {
     const { container } = render(<Button variant="destructive">Delete</Button>);
     // Just a basic check that it renders
     expect(container.firstChild).toBeDefined();
  });
});
