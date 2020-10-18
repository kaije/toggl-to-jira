import SentEntry from './model/sent-entry';
import SentEntriesRepository from './repositories/sent-entries-repository';

const togglTimeEntry = {
  id: 1,
  pid: 12,
  start: 'hello',
  stop: 'there',
  duration: 300,
  description: 'This is a test toggl time entry',
  jiraIssueKey: 'ABC-123',
};

const jiraWorkLog = {
  issueKey: 'ABC-123',
  timeSpentSeconds: 300,
  comment: 'This is a test toggl time entry',
  started: 'hello',
};

const sentEntry: SentEntry = {
  togglTimeEntry: togglTimeEntry,
  jiraWorkLog: jiraWorkLog,
}

const sentEntriesRepo = new SentEntriesRepository();

sentEntriesRepo.saveSentEntry(sentEntry);
