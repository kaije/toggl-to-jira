import * as fetch from 'node-fetch';
import * as moment from 'moment';
import { TOGGL_API_KEY, TOGGL_WORKSPACE_ID } from '../config';
import TogglTimeEntry from '../model/toggl-time-entry';
import TogglProject from '../model/toggl-project';

export default class TogglService {
  private authToken = Buffer.from(`${TOGGL_API_KEY}:api_token`).toString('base64');

  async getTogglProjects(): Promise<TogglProject[]> {
    const url = `https://api.track.toggl.com/api/v8/workspaces/${TOGGL_WORKSPACE_ID}/projects`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Basic ${this.authToken}`,
        },
        referrerPolicy: 'no-referrer',
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getTogglTimeEntries(targetDate: string): Promise<TogglTimeEntry[]> {
    let url = 'https://www.toggl.com/api/v8/time_entries';

    const targetMoment = moment(targetDate, moment.ISO_8601);
    const start = targetMoment.startOf('day').format();
    const end = targetMoment.clone().endOf('day').format();

    url = `${url}?${new URLSearchParams({ start_date: start, end_date: end })}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Basic ${this.authToken}`,
        },
        referrerPolicy: 'no-referrer',
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
}
