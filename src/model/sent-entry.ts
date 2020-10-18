import TogglTimeEntry from './toggl-time-entry';

export default interface SentEntry {
  jiraWorkLogId: number;
  togglTimeEntry: TogglTimeEntry;
}
