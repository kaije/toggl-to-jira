import * as dotenv from 'dotenv';

dotenv.config();

export const TOGGL_API_KEY = process.env.TOGGL_API_KEY;
export const JIRA_API_KEY = process.env.JIRA_API_KEY;

export const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
export const JIRA_USER_EMAIL = process.env.JIRA_USER_EMAIL;

export const TOGGL_WORKSPACE_ID = process.env.TOGGL_WORKSPACE_ID;
