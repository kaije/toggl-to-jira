export default interface JiraWorkLog {
  id?: number;
  issueKey: string;
  timeSpentSeconds: number;
  comment: string;
  started: string;
}
