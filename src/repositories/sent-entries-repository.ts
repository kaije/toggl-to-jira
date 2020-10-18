import SentEntry from '../model/sent-entry';
import * as fs from 'fs';
import TogglTimeEntry from '../model/toggl-time-entry';

export default class SentEntriesRepository {
  async saveSentEntry(sentEntry: SentEntry): Promise<void> {
    const entries = this.getExistingEntries();
    entries.push(sentEntry);
    fs.writeFileSync('./sent-entries.json', JSON.stringify(entries));
  }

  async alreadySent(entry: TogglTimeEntry) {
    const sentEntries = this.getExistingEntries();
    return sentEntries.filter((sentEntry) => sentEntry.togglTimeEntry.id === entry.id).length > 0;
  }

  private getExistingEntries(): SentEntry[] {
    try {
      const existingData = fs.readFileSync('./sent-entries.json');
      return JSON.parse(existingData.toString());
    } catch (err) {
      return [];
    }
  }
}
