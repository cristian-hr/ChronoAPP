import { render, screen } from '@testing-library/react';
import Chrono from '../src/Chrono';

test('renders learn react link', () => {
  render(<Chrono />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});