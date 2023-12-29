import { render } from '@testing-library/react';
import { vi, afterEach, describe, expect, test, vitest } from 'vitest';

import { Flag } from './index';

import { mock_data } from './mock-data';

const countryCode = 'us';

const mock_fetch = vitest.fn(async () => ({
  json: () => Promise.resolve({}),
}));

const mockResponse = (status: number) => {
  switch (status) {
    case 200:
      vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mock_data),
        } as Response);
      });
      break;
    case 404:
      mock_fetch.mockResolvedValueOnce({
        json: () => Promise.resolve({}),
      });
      break;
    default:
      mock_fetch.mockRejectedValueOnce({});
  }
};

describe('Flag', () => {
  afterEach(() => {
    mock_fetch.mockClear();
  });

  test('should render null if no country code is passed', () => {
    mockResponse(404);

    const { container } = render(<Flag countryCode="" />);
    const flag = container.querySelector('i');

    expect(flag).toBeNull();
  });

  test('should not render if no source is available', () => {
    mockResponse(404);

    const { container } = render(<Flag countryCode="xx" />);
    const flag = container.querySelector('i');

    expect(flag).toBeNull();
  });

  test('should render correctly', () => {
    mockResponse(200);

    const { container } = render(<Flag countryCode={countryCode} />);
    const flag = container.querySelector('i');

    expect(flag).toBeDefined();
  });

  test('should render correctly with size', () => {
    mockResponse(200);

    const { container } = render(<Flag countryCode={countryCode} size={100} />);
    const flag = container.querySelector('i');

    if (!flag) return;

    const computed_style = window.getComputedStyle(flag);

    expect(flag).toBeDefined();
    expect(computed_style.width).toBe('100px');
  });

  test('should render correctly with id', () => {
    mockResponse(200);

    const { container } = render(<Flag countryCode={countryCode} />);
    const flag = container.querySelector('i');

    if (!flag) return;

    expect(flag.id).toBe(`flag-${countryCode}`);
  });
});
