import { writeFile } from 'node:fs/promises'

import { i18n } from './i18n'
import { sdk } from './sdk'
import { webPort, sshPort } from './utils'

function warpgateConfig(): string {
  return `sso_providers: []
recordings:
  enable: false
  path: /data/recordings
external_host: null
database_url: sqlite:/data/db
ssh:
  enable: true
  listen: '0.0.0.0:${sshPort}'
  external_port: null
  external_host: null
  keys: /data/ssh-keys
  host_key_verification: prompt
  inactivity_timeout: 5m
  keepalive_interval: null
http:
  listen: '0.0.0.0:${webPort}'
  external_port: null
  external_host: null
  certificate: /data/tls.certificate.pem
  key: /data/tls.key.pem
  trust_x_forwarded_headers: true
  session_max_age: 30m
  cookie_max_age: 1day
  sni_certificates: []
kubernetes:
  enable: false
  listen: '0.0.0.0:8443'
  external_port: null
  external_host: null
  certificate: /data/tls.certificate.pem
  key: /data/tls.key.pem
  session_max_age: 30m
mysql:
  enable: false
  listen: '0.0.0.0:33306'
  external_port: null
  external_host: null
  certificate: /data/tls.certificate.pem
  key: /data/tls.key.pem
postgres:
  enable: false
  listen: '0.0.0.0:55432'
  external_port: null
  external_host: null
  certificate: /data/tls.certificate.pem
  key: /data/tls.key.pem
log:
  retention: 7days
  audit_retention: 11months 30days 3h 50m 24s
  send_to: null
  format: text
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

  return sdk.Daemons.of(effects)
    .addOneshot('chown-data', {
      subcontainer: warpgateSub,
      exec: {
        command: ['chown', '-R', 'warpgate:warpgate', '/data'],
        user: 'root',
      },
      requires: [],
    })
    .addDaemon('primary', {
      subcontainer: warpgateSub,
      exec: {
        command: sdk.useEntrypoint(['--skip-securing-files', 'run']),
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, webPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
      },
      requires: ['chown-data'],
    })
})
