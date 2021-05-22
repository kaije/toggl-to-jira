import { formatDuration, roundSeconds } from './duration-formatter';

test('300 seconds is formatted with remaining seconds as 0h 5m 0s', () => {
  expect(formatDuration(300)).toBe('0h 6m 0s');
});

test('300 seconds is formatted without remaining seconds as 0h 5m', () => {
  expect(formatDuration(300, false)).toBe('0h 5m');
});

test('1000 seconds is formatted with remaining seconds as 0h 16m 40s', () => {
  expect(formatDuration(1000)).toBe('0h 16m 40s');
});

test('1000 seconds is formatted without remaining seconds as 0h 16m', () => {
  expect(formatDuration(1000, false)).toBe('0h 16m');
});

test('3600 seconds is formatted with remaining seconds as 1h 0m 0s', () => {
  expect(formatDuration(3600)).toBe('1h 0m 0s');
});

test('3601 seconds is formatted with remaining seconds as 1h 0m 1s', () => {
  expect(formatDuration(3601)).toBe('1h 0m 1s');
});

test('3660 seconds is formatted with remaining seconds as 1h 1m 0s', () => {
  expect(formatDuration(3660)).toBe('1h 1m 0s');
});

test('7665 seconds is formatted with remaining seconds as 2h 7m 45s', () => {
  expect(formatDuration(7665)).toBe('2h 7m 45s');
});

test('7665 seconds is formatted without remaining seconds as 2h 7m', () => {
  expect(formatDuration(7665, false)).toBe('2h 7m');
});

test('0 seconds is rounded up to the minimum of 60', () => {
  expect(roundSeconds(0)).toBe(60);
});

test('A remainder of 29 seconds on a duration less than the minimum (60s) is rounded up', () => {
  expect(roundSeconds(29)).toBe(60);
});

test('A remainder of 29 seconds on a duration greater than the minimum (60s) is rounded down', () => {
  expect(roundSeconds(89)).toBe(60);
});

test('A remainder of less than 29 seconds on a duration greater than the minimum (60s) is rounded down', () => {
  expect(roundSeconds(79)).toBe(60);
});

test('A remainder of 30 seconds is rounded up', () => {
  expect(roundSeconds(90)).toBe(120);
});

test('A remainder of more than 30 seconds is rounded up', () => {
  expect(roundSeconds(115)).toBe(120);
});

test('A duration greater than the minimum with no remaining seconds is unaffected by rounding', () => {
  expect(roundSeconds(120)).toBe(120);
});

test('3569 is rounded down to 3540', () => {
  expect(roundSeconds(3569)).toBe(3540);
});

test('3570 is rounded up to 3600', () => {
  expect(roundSeconds(3570)).toBe(3600);
});

test('3599 is rounded up to 3600', () => {
  expect(roundSeconds(3599)).toBe(3600);
});

test('3601 seconds is rounded down to 3600', () => {
  expect(roundSeconds(3601)).toBe(3600);
});

test('3600 seconds is unaffected by rounding', () => {
  expect(roundSeconds(3600)).toBe(3600);
});
