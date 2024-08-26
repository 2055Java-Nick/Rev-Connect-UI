import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';
import React from 'react';

describe('Header Component', () => {
  it('renders header content', () => {
    const { getByText } = render(<Header/>);
    expect(getByText('Connections Dashboard')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Profile')).toBeInTheDocument();
    expect(getByText('Messages')).toBeInTheDocument();
  });
});
