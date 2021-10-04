# Toggl-to-Jira

A simple command line utility for converting Toggl time entries into Jira [worklog](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-worklogs/#api-group-issue-worklogs) entries for a specified target date.

There are a lot of similar projects on GitHub, but none were quite what I wanted. So I decided to write my own and get some extra practice with TypeScript. :slightly_smiling_face:

## Prerequisites

* You'll need to [install Node.js](https://nodejs.org/en/). (Last tested with v14.17.6)
* You'll need a [Jira API token](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) and a [Toggl API token](https://github.com/toggl/toggl_api_docs#api-token).

## Usage

To use this utility, you'll need to be using Jira issue keys (e.g. STA-207) as your Toggl project names, and associating each entry you want to log to Jira with a project. Toggl entries without a project will be displayed for review, but will not be sent to Jira.

### Configure your credentials for Toggl and JIRA

Create a file called `.env` in the root of the project containing your private API tokens and your user account details as shown in the example below.

:warning: **Do not commit this file!** Note that it is included in `.gitignore` by default.

```text
# Set your secret API tokens here
TOGGL_API_KEY=1234567890abcdefghijklmnopq
JIRA_API_KEY=0987654321zyxabc1234567890

# Set your personal Jira account details here
JIRA_BASE_URL="https://somewhere.atlassian.net"
JIRA_USER_EMAIL="someone@somewhere.com"

# Set your personal Toggl account details here
TOGGL_WORKSPACE_ID=1234567
```

### Install and run the utility

After cloning a local copy, run the following from the project root:

```bash
npm install
```

then:

```bash
npm run build
```

To start the utility, run:

```bash
npm start
```

Enter a target date in the specified format when prompted.

The script will display a list of Toggl entries found for that date, and then ask if you want to continue.

Enter 'Y' to go ahead and send these entries to Jira, or hit enter to cancel (e.g. if you'd like to clean things up a bit in Toggl before proceeding).

The tool will display a success or failure indicator for each entry sent to Jira.

### Sent entries log

Sent entries are written to a local file (`sent-entries.json`). Provided this file is left intact and complete by the user, the tool can be safely run multiple times for the same date without the risk of duplicate work logs being sent to Jira. It will display a 'skipped' notification on screen if a corresponding entry is found in the sent entries file.

### Minimum duration and rounding

Durations will be rounded to the nearest minute prior to sending, as Jira otherwise ignores the remaining seconds portion.

Any duration of less than 60 seconds (including zero seconds) will be rounded up to meet the Jira minimum of one minute.

## Development

### Testing

This project uses [Jest](https://jestjs.io/) and [ts-jest](https://github.com/kulshekhar/ts-jest).

To execute the tests:

```bash
npm test
```

### Linting

This project uses [ESLint for TypeScript](https://github.com/typescript-eslint/typescript-eslint) and [Prettier](https://prettier.io/) for linting and formatting.

To find and apply fixes:

```bash
npm run lint
```

Or to preview problems/fixes first without applying:

```bash
npm run lint-preview
```

### Built with

* [NodeJS](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [ESLint for TypeScript](https://github.com/typescript-eslint/typescript-eslint)
* [Prettier](https://prettier.io/)
* [Jest](https://jestjs.io/)
* [ts-jest](https://github.com/kulshekhar/ts-jest)
* [Toggl API](https://github.com/toggl/toggl_api_docs)
* [Jira Cloud Platform REST API (version 2)](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/)
