import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

describe('HomePage', () => {
  it('renders the welcome message and description', () => {
    render(<HomePage />);

    expect(screen.getByText('Welcome to the Shopping App')).toBeInTheDocument();
    expect(
      screen.getByText(/Explore our curated selection of products/i)
    ).toBeInTheDocument();
  });

  it('includes the background video element', () => {
    const { container } = render(<HomePage />);
    const videoElement = container.querySelector('video');
    expect(videoElement).toBeInTheDocument();
  });

  it('renders the FakeStore API link', () => {
    render(<HomePage />);
    const link = screen.getByRole('link', { name: /fakestore api/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://fakestoreapi.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders correctly on a small screen (mobile)', () => {
    // Save original window.innerWidth
    const originalInnerWidth = window.innerWidth;

    // Mock innerWidth to mobile size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    // Dispatch resize event to trigger any listeners
    window.dispatchEvent(new Event('resize'));

    render(<HomePage />);

    // Just verify main content still renders
    expect(screen.getByText('Welcome to the Shopping App')).toBeInTheDocument();

    // Restore original innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });
});
