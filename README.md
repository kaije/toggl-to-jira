# Toggl-to-Jira

A simple console tool for converting Toggl time entries into Jira [worklog](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-worklogs/#api-group-issue-worklogs) entries for a specified target date.

None of the available tools I found were quite what I wanted, so I decided to write my own as a toy project.

## Prerequisites

### Node.js

You will need to [install Node.js](https://nodejs.org/en/).

(Script has been tested with v12.19.0).

### Personal API tokens

You'll need a [Jira API token](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) and a [Toggl API token](https://github.com/toggl/toggl_api_docs#api-token).

### Toggl projects must correspond to Jira issues

To use this script, you must be using Jira issue keys (e.g. STA-207) as your Toggl project names, and associating each entry you want to log to Jira with a project. (Toggl entries without a project will be displayed for review, but will not be sent to Jira.)

## Getting started

### Configure credentials for the Toggl and JIRA APIs

Create a file called `.env` in the root of the project containing your private API tokens and your user account details as shown:

```text
# Set your API tokens here
TOGGL_API_KEY=1234567890abcdefghijklmnopq
JIRA_API_KEY=0987654321zyxabc1234567890

# Set your Jira account details here
JIRA_BASE_URL="https://somewhere.atlassian.net"
JIRA_USER_EMAIL="someone@somewhere.com"

# Set your Toggl account details here
TOGGL_WORKSPACE_ID=1234567
```

DO NOT COMMIT THIS FILE. It is included in `.gitignore` by default.

## Running the script

Install:

```bash
npm install
```

Build:

```bash
npm run build
```

To start the script, run the following from the project root:

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

Or preview problems/fixes first without applying:

```bash
npm run lint-preview
```

### Built with

Tools:

* [NodeJS](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [ESLint for TypeScript](https://github.com/typescript-eslint/typescript-eslint)
* [Prettier](https://prettier.io/)
* [Jest](https://jestjs.io/)
* [ts-jest](https://github.com/kulshekhar/ts-jest)

Resources:

* [Toggl API](https://github.com/toggl/toggl_api_docs)
* [Jira Cloud Platform REST API (version 2)](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/)
