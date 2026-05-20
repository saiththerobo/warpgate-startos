import { writeFile } from 'node:fs/promises'

import { i18n } from './i18n'
import { sdk } from './sdk'
import { webPort, sshPort } from './utils'

function warpgateConfig(): string {
  return `---
database_url: "sqlite:/data/db"
http:
  listen: "0.0.0.0:${webPort}"
  trust_x_forwarded_headers: true
mysql:
  enable: false
  listen: "0.0.0.0:33306"
ssh:
  listen: "0.0.0.0:${sshPort}"
  keys: "/data/ssh-keys"
  host_key_verification: prompt
recordings:
  enable: false
  path: "/data/recordings"
`
}

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Warpgate'))

  await writeFile(sdk.volumes.main.subpath('warpgate.yaml'), warpgateConfig())

  const mounts = sdk.Mounts.of().mountVolume({
    volumeId: 'main',
    subpath: null,
    mountpoint: '/data',
    readonly: false,
  })

  const warpgateSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'warpgate' },
    mounts,
    'warpgate-sub',
  )

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer: warpgateSub,
    exec: {
      command: ['warpgate', '--config', '/data/warpgate.yaml', 'server'],
    },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, webPort, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
