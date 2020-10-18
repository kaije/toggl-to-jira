import SentEntry from '../model/sent-entry';
import * as fs from 'fs';

export default class SentEntriesRepository {
  async saveSentEntry(sentEntry: SentEntry): Promise<void> {
    const entries = this.getExistingEntries();
    entries.push(sentEntry);
    fs.writeFileSync('./sent-entries.json', JSON.stringify(entries));
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
