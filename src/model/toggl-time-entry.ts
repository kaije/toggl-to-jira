export default interface TogglTimeEntry {
  id: number;
  pid: number;
  start: string;
  stop: string;
  duration: number;
  description: string;
  jiraIssueKey?: string;
}
