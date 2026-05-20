import { sdk } from '../sdk'
import { completeSetup } from '../actions/completeSetup'
import { i18n } from '../i18n'

export const initializeService = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return

  await sdk.action.createOwnTask(effects, completeSetup, 'critical', {
    reason: i18n('Create your admin account via the web interface'),
  })
})
