import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_0_23_4_0 = VersionInfo.of({
  version: '0.23.4:0',
  releaseNotes: {
    en_US: 'Initial release.',
    es_ES: 'Lanzamiento inicial.',
    de_DE: 'Erstveröffentlichung.',
    pl_PL: 'Pierwsze wydanie.',
    fr_FR: 'Version initiale.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
