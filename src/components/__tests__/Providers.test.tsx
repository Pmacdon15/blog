import { render, screen } from '@testing-library/react';
import Providers from '../Providers';

describe('Providers', () => {
  it('renders children correctly', () => {
    const testContent = 'Test Child Content';
    render(
      <Providers>
        <div>{testContent}</div>
      </Providers>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    const { container } = render(
      <Providers>
        <div>Test</div>
      </Providers>
    );

    // Just verify that the component renders without crashing
    expect(container.firstChild).toBeTruthy();
  });
}); 