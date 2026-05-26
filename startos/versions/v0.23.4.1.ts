import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_0_23_4_1 = VersionInfo.of({
  version: '0.23.4:1',
  releaseNotes: {
    en_US: 'Initial release of Warpgate on StartOS.',
    es_ES: 'Lanzamiento inicial de Warpgate en StartOS.',
    de_DE: 'Erstveröffentlichung von Warpgate auf StartOS.',
    pl_PL: 'Pierwsze wydanie Warpgate na StartOS.',
    fr_FR: 'Première version de Warpgate sur StartOS.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
