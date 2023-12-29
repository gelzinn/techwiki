import { render } from '@testing-library/react';
import { describe, expect, test, vitest } from 'vitest';

import { SkewedInfiniteCarousel } from '@/components/carousel';

describe('SkewedInfiniteCarousel', () => {
  test('should render correctly', () => {
    const { container } = render(<SkewedInfiniteCarousel />);

    expect(container).toMatchSnapshot();
  });

  test('should render correctly with shadow', () => {
    const { container } = render(<SkewedInfiniteCarousel shadow />);

    expect(container).toMatchSnapshot();
  });

  test('should render correctly with content', () => {
    const { container } = render(
      <SkewedInfiniteCarousel content={['test', 'test2']} />,
    );

    expect(container).toMatchSnapshot();
  });

  test('should render correctly with content and shadow', () => {
    const { container } = render(
      <SkewedInfiniteCarousel shadow content={['test', 'test2']} />,
    );

    expect(container).toMatchSnapshot();
  });
});
