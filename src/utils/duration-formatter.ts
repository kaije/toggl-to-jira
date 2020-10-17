import * as moment from 'moment';

export function formatDuration(durationInSeconds: number, includeSeconds = true): string {
  const duration = moment.duration(durationInSeconds, 'seconds');
  let formattedStr = `${duration.hours()}h ${duration.minutes()}m`;
  if (includeSeconds) {
    formattedStr = `${formattedStr} ${duration.seconds()}s`;
  }
  return formattedStr;
}

export function roundSeconds(durationInSeconds: number): number {
  const duration = moment.duration(durationInSeconds, 'seconds');
  const seconds = duration.seconds();
  return durationInSeconds < 60 || seconds > 29 ? durationInSeconds + 60 - seconds : durationInSeconds - seconds;
}
