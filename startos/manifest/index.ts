import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'warpgate',
  title: 'Warpgate',
  license: 'Apache-2.0',
  packageRepo: 'https://github.com/saiththerobo/warpgate-startos',
  upstreamRepo: 'https://github.com/warp-tech/warpgate',
  marketingUrl: 'https://warpgate.null.page/',
  donationUrl: null,
  docsUrls: ['https://warpgate.null.page/'],
  description: { short, long },
  volumes: ['main'],
  images: {
    warpgate: {
      source: { dockerTag: 'ghcr.io/warp-tech/warpgate:0.23.4' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
