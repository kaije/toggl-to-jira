import JiraWorkLog from './jira-work-log';
import TogglTimeEntry from './toggl-time-entry';

export default interface SentEntry {
  togglTimeEntry: TogglTimeEntry;
  jiraWorkLog: JiraWorkLog;
}
