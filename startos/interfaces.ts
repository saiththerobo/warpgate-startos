import { i18n } from './i18n'
import { sdk } from './sdk'
import { webPort, sshPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const receipts = []

  const uiMulti = sdk.MultiHost.of(effects, 'ui-multi')
  const uiOrigin = await uiMulti.bindPort(webPort, {
    protocol: 'https',
    preferredExternalPort: webPort,
    addSsl: {
      alpn: null,
      preferredExternalPort: webPort,
      addXForwardedHeaders: true,
    },
  })
  const ui = sdk.createInterface(effects, {
    name: i18n('Web UI'),
    id: 'ui',
    description: i18n('The Warpgate web interface for managing targets, users, and sessions'),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })
  receipts.push(await uiOrigin.export([ui]))

  const sshMulti = sdk.MultiHost.of(effects, 'ssh-multi')
  const sshOrigin = await sshMulti.bindPort(sshPort, {
    protocol: null,
    addSsl: null,
    preferredExternalPort: sshPort,
    secure: { ssl: false },
  })
  const ssh = sdk.createInterface(effects, {
    name: i18n('SSH Gateway'),
    id: 'ssh',
    description: i18n('Connect SSH clients through Warpgate to reach your configured targets'),
    type: 'p2p',
    masked: false,
    schemeOverride: { ssl: 'ssh', noSsl: 'ssh' },
    username: null,
    path: '',
    query: {},
  })
  receipts.push(await sshOrigin.export([ssh]))

  return receipts
})
