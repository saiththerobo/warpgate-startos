import { utils } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'
import { getAdminCredentials } from '../actions/getAdminCredentials'
import { i18n } from '../i18n'
import { webPort, sshPort } from '../utils'

export const initializeService = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return

  const adminPassword = utils.getDefaultString({
    charset: 'a-z,A-Z,0-9',
    len: 22,
  })

  await storeJson.merge(effects, { adminPassword })

  const setupSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'warpgate' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: '/data',
      readonly: false,
    }),
    'warpgate-setup',
  )

  await sdk.Daemons.of(effects)
    .addOneshot('chown-data', {
      subcontainer: setupSub,
      exec: {
        command: ['chown', '-R', 'warpgate:warpgate', '/data'],
        user: 'root',
      },
      requires: [],
    })
    .addOneshot('unattended-setup', {
      subcontainer: setupSub,
      exec: {
        command: sdk.useEntrypoint([
          '--skip-securing-files',
          'unattended-setup',
          '--data-path', '/data',
          '--http-port', String(webPort),
          '--ssh-port', String(sshPort),
          '--admin-password', adminPassword,
        ]),
      },
      requires: ['chown-data'],
    })
    .runUntilSuccess(120_000)

  await sdk.action.createOwnTask(effects, getAdminCredentials, 'critical', {
    reason: i18n('Retrieve your admin credentials'),
  })
})
