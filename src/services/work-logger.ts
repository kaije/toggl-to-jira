import {getTogglProjects, getTogglTimeEntries} from './toggl-service'
import JiraWorkLog from '../model/jira-work-log'
import * as moment from 'moment'
import * as reader from 'readline-sync'
import logWorkInJira from './jira-service'

export default class WorkLogger {

    async run() {
        const projects = await getTogglProjects()
        console.info(`Retrieved ${projects.length} active Toggl projects`)

        const targetDate = reader.question('Enter your target date: (YYYY-MM-DD) ')

        if (moment(targetDate, moment.ISO_8601).isValid()) {
            this.proceed(projects, targetDate)
        } else {
            console.info("Invalid date, process ended.")
        }
    }

    private async proceed(projects: TogglProject[], targetDate: string){
        const entries = await getTogglTimeEntries(targetDate)

            console.info(`Found ${entries.length} Toggl entries for ${moment(targetDate, moment.ISO_8601).format('dddd, MMMM Do YYYY')}`)
            console.info()

            if (entries.length < 1) {
                console.info("Nothing to log, process ended.")
                return;
            }

            this.mapEntriesToProjects(projects, entries)

            this.listEntries(entries)
            console.info()

            console.info("Durations of less than 60 seconds will be rounded up to 1 minute as that is the minimum Jira will accept.")
            console.info()

            const confirmation = reader.question('Would you like to proceed? (Y/N)')

            if (confirmation == "Y") {
                this.logEntriesToJira(this.buildJiraWorkLogs(entries))
            } else {
                console.info("Okay, process ended.")
            }

    }

    private mapEntriesToProjects(projects: TogglProject[], entries: TogglTimeEntry[]): TogglTimeEntry[] {
        return entries.map( entry => {
            entry.jiraIssueKey = projects.find( project => project.id == entry.pid)?.name
            return entry
        })
    }

    private listEntries(entries: TogglTimeEntry[]) {
        for (let entry of entries) {
            console.info(`(${entry.jiraIssueKey ? entry.jiraIssueKey : "None"}) ${entry.description} - ${this.getDuration(entry)}`)
        }
    }

    private buildJiraWorkLogs(entries: TogglTimeEntry[]) : JiraWorkLog[] {
        let workLogs = []
        for (let entry of entries) {
            if (entry.jiraIssueKey) {
                const workLog: JiraWorkLog = {
                    issueKey: entry.jiraIssueKey,
                    timeSpentSeconds: this.ensureMinimumDuration(entry.duration),
                    comment: entry.description,
                    started: moment(entry.start).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                }
                workLogs.push(workLog)
            }
        }
        return workLogs
    }

    private ensureMinimumDuration(durationInSeconds: number): number {
        return durationInSeconds < 60 ? 60 : durationInSeconds
    }

    private async logEntriesToJira(workLogs: JiraWorkLog[]) {
        for (let workLog of workLogs) {
            console.info()
            await logWorkInJira(workLog)
        }
        return
    }

    private getDuration(entry: TogglTimeEntry) {
        const duration = moment.duration(entry.duration, 'seconds')
        return `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`
    }
}