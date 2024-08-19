import { render } from '@testing-library/react';
import Header from '../components/Header';

describe('Header Component', () => {
  test('renders header content', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Connections Dashboard')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Profile')).toBeInTheDocument();
    expect(getByText('Messages')).toBeInTheDocument();
  });
});
