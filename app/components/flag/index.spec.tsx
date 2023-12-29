import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Flag } from './index';

const country_code = 'us';

describe('Flag', () => {
  test('should render null if no country code is passed', () => {
    const { container } = render(<Flag countryCode="" />);
    const flag = container.querySelector('i');

    expect(flag).toBeNull();
  });

  test('should not render if no source is available', () => {
    const { container } = render(<Flag countryCode="xx" />);
    const flag = container.querySelector('i');

    expect(flag).toBeNull();
  });

  test('should render correctly', () => {
    const { container } = render(<Flag countryCode={country_code} />);
    const flag = container.querySelector('i');

    expect(flag).toBeDefined();
  });

  test('should render correctly with size', () => {
    const { container } = render(
      <Flag countryCode={country_code} size={100} />,
    );
    const flag = container.querySelector('i');

    if (!flag) return;

    const computed_style = window.getComputedStyle(flag);

    expect(flag).toBeDefined();
    expect(computed_style.width).toBe('100px');
  });
});
