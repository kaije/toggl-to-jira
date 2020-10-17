export default interface JiraWorkLog {
  issueKey: string;
  timeSpentSeconds: number;
  comment: string;
  started: string;
}
