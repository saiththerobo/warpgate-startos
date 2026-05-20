import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const completeSetup = sdk.Action.withoutInput(
  'complete-setup',

  async ({ effects }) => ({
    name: i18n('Complete Setup'),
    description: i18n('Instructions for completing Warpgate initial setup'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'hidden',
  }),

  async ({ effects }) => ({
    version: '1' as const,
    title: 'Complete Warpgate Setup',
    message:
      'Open the Warpgate web interface. You will be automatically redirected to the first-time setup page where you can create your admin username and password. Once complete, dismiss this task.',
    result: {
      type: 'single' as const,
      name: i18n('Setup Instructions'),
      description: null,
      value:
        'Click "Open" above to visit the web interface, then follow the setup wizard to create your admin account.',
      masked: false,
      copyable: false,
      qr: false,
    },
  }),
)
