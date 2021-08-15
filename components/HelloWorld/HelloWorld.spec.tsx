import { render, screen } from '@testing-library/react';
import { HelloWorld } from '.';

describe('Hello World', () => {
  it('should render correctly', () => {
    render(<HelloWorld />);
    const myComponent = screen.getByText('Hello World!');
    expect(myComponent).toBeInTheDocument();
  });
});