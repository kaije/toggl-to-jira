import * as fetch from 'node-fetch';
import * as emoji from 'node-emoji';
import { JIRA_API_KEY, JIRA_BASE_URL, JIRA_USER_EMAIL } from '../config';
import JiraWorkLog from '../model/jira-work-log';
import { formatDuration } from '../utils/duration-formatter';

export default class JiraService {
  async logWorkInJira(jiraWorkLog: JiraWorkLog): Promise<void> {
    const url = `${JIRA_BASE_URL}/rest/api/2/issue/${jiraWorkLog.issueKey}/worklog`;
    const authToken = Buffer.from(`${JIRA_USER_EMAIL}:${JIRA_API_KEY}`).toString('base64');

    const body = {
      timeSpentSeconds: jiraWorkLog.timeSpentSeconds,
      visibility: {
        type: 'group',
        value: 'jira-developers',
      },
      comment: jiraWorkLog.comment,
      started: jiraWorkLog.started,
    };

    try {
      console.info(
        `Logging ${formatDuration(jiraWorkLog.timeSpentSeconds, false)} to ${jiraWorkLog.issueKey}: ${
          jiraWorkLog.comment
        }`
      );
      console.info(url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Basic ${authToken}`,
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body),
      });

      if (response.status === 201) {
        console.info(`${emoji.get('white_check_mark')} Success!`);
        const newWorkLog = await response.json();
        console.log(`Created worklog with id ${newWorkLog.id}`);
      } else {
        console.error(`${emoji.get('no_entry')} Failed:`);
        console.info(`response.status = ${response.status}`);
        console.info(`response.statusText = ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
