# Toggl-to-Jira Work Logs

A simple tool for converting Toggl time entries into JIRA work log entries for a specified target date.

None of the available tools I found were quite what I wanted, so I decided to write my own as a toy project.

## Prerequisites

### Node.js

You will need to [install Node.js](https://nodejs.org/en/) (at least v12).

### Personal API tokens

You'll need a [Jira API token](https://confluence.atlassian.com/cloud/api-tokens-938839638.html) and a [Toggl API token](https://github.com/toggl/toggl_api_docs#api-token).

### Toggl projects must correspond to Jira issues

To use this script, you must be using Jira issue keys (e.g. STA-207) as your Toggl project names, and associating each entry you want to log to Jira with a project. (Toggl entries without a project will be displayed for review, but will not be sent to Jira.)

![Snip showing Jira issue key used as project for Toggle entry](./docs/images/toggl-jira-issue-key-as-project.jpg)

## Getting started

### Configure credentials for the Toggl and JIRA APIs

Create a file called `.env` in the root of the project containing your private API tokens and your Jira user email:

```text
# Set your API tokens here
TOGGL_API_KEY=1234567890abcdefghijklmnopq
JIRA_API_KEY=0987654321zyxabc1234567890

JIRA_USER_EMAIL="someone@somewhere.com"
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

Enter 'Y' to go ahead and send these entries to Jira, or hit enter to cancel (e.g. if you'd like to do a bit of clean up in Toggl before proceeding).
