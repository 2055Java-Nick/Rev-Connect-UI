import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../components/Header';

describe('Header Component', () => {
  it('renders header content', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Connections Dashboard')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Profile')).toBeInTheDocument();
    expect(getByText('Messages')).toBeInTheDocument();
  });
});
