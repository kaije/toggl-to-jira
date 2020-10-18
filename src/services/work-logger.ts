import * as moment from 'moment';
import * as reader from 'readline-sync';
import * as emoji from 'node-emoji';
import TogglProject from '../model/toggl-project';
import TogglTimeEntry from '../model/toggl-time-entry';
import JiraWorkLog from '../model/jira-work-log';
import JiraService from './jira-service';
import TogglService from './toggl-service';
import { formatDuration, roundSeconds } from '../utils/duration-formatter';
import TogglJiraEntryPair from '../model/toggl-jira-entry-pair';
import SentEntriesRepository from '../repositories/sent-entries-repository';
import SentEntry from '../model/sent-entry';

export default class WorkLogger {
  private togglService = new TogglService();
  private sentEntriesRepository = new SentEntriesRepository();

  async run(): Promise<void> {
    const projects = await this.togglService.getTogglProjects();
    console.info(`Retrieved ${projects.length} active Toggl projects`);

    const targetDate = reader.question('Enter your target date: (YYYY-MM-DD) ');

    if (moment(targetDate, moment.ISO_8601).isValid()) {
      this.proceed(projects, targetDate);
    } else {
      console.info('Invalid date, process ended.');
    }
  }

  private async proceed(projects: TogglProject[], targetDate: string) {
    const entries = await this.togglService.getTogglTimeEntries(targetDate);

    console.info(
      `Found ${entries.length} Toggl entries for ${moment(targetDate, moment.ISO_8601).format('dddd, MMMM Do YYYY')}`
    );
    console.info();

    if (entries.length < 1) {
      console.info('Nothing to log, process ended.');
      return;
    }

    this.mapEntriesToProjects(projects, entries);

    this.listEntries(entries);
    console.info();

    console.info(
      'Durations of less than 60 seconds will be rounded up to 1 minute as that is the minimum Jira will accept.'
    );
    console.info();

    const confirmation = reader.question('Would you like to proceed? (Y/N) ');
    console.info();

    if (confirmation == 'Y') {
      this.logEntriesToJira(this.buildJiraWorkLogs(entries));
    } else {
      console.info('Okay, process ended.');
    }
  }

  private mapEntriesToProjects(projects: TogglProject[], entries: TogglTimeEntry[]): TogglTimeEntry[] {
    return entries.map((entry) => {
      entry.jiraIssueKey = projects.find((project) => project.id == entry.pid)?.name;
      return entry;
    });
  }

  private listEntries(entries: TogglTimeEntry[]) {
    for (const entry of entries) {
      console.info(
        `(${entry.jiraIssueKey ? entry.jiraIssueKey : 'None'}) ${entry.description} - ${formatDuration(entry.duration)}`
      );
    }
  }

  private buildJiraWorkLogs(togglTimeEntries: TogglTimeEntry[]): TogglJiraEntryPair[] {
    const togglJiraPairs = [];
    for (const togglTimeEntry of togglTimeEntries) {
      if (this.sentEntriesRepository.alreadySent(togglTimeEntry)) {
        console.info(
          `${emoji.get('warning')}  Skipping - ${formatDuration(togglTimeEntry.duration, false)} already logged to ${
            togglTimeEntry.jiraIssueKey
          }: ${togglTimeEntry.description}`
        );
      } else {
        if (togglTimeEntry.jiraIssueKey) {
          const jiraWorkLog: JiraWorkLog = {
            issueKey: togglTimeEntry.jiraIssueKey,
            timeSpentSeconds: roundSeconds(togglTimeEntry.duration),
            comment: togglTimeEntry.description,
            started: moment(togglTimeEntry.start).format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
          };
          const entry: TogglJiraEntryPair = { togglTimeEntry: togglTimeEntry, jiraWorkLog: jiraWorkLog };
          togglJiraPairs.push(entry);
        }
      }
    }
    return togglJiraPairs;
  }

  private async logEntriesToJira(entries: TogglJiraEntryPair[]) {
    const jiraService = new JiraService();

    for (const entry of entries) {
      console.info();
      const createdWorkLog = await jiraService.logWorkInJira(entry.jiraWorkLog);

      const sentEntry: SentEntry = {
        togglTimeEntry: entry.togglTimeEntry,
        jiraWorkLogId: createdWorkLog.id,
      };

      const sentEntriesRepo = new SentEntriesRepository();
      sentEntriesRepo.saveSentEntry(sentEntry);
    }
    return;
  }
}
