export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Warpgate': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,

  // interfaces.ts
  'Web UI': 4,
  'The Warpgate web interface for managing targets, users, and sessions': 5,
  'SSH Gateway': 6,
  'Connect SSH clients through Warpgate to reach your configured targets': 7,

  // actions/completeSetup.ts
  'Complete Setup': 8,
  'Instructions for completing Warpgate initial setup': 9,
  'Setup Instructions': 10,

  // init/initializeService.ts
  'Create your admin account via the web interface': 11,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
