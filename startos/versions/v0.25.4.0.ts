import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_0_25_4_0 = VersionInfo.of({
  version: '0.25.4:0',
  releaseNotes: {
    en_US: 'Update to Warpgate 0.25.4.',
    es_ES: 'Actualización a Warpgate 0.25.4.',
    de_DE: 'Update auf Warpgate 0.25.4.',
    pl_PL: 'Aktualizacja do Warpgate 0.25.4.',
    fr_FR: 'Mise à jour vers Warpgate 0.25.4.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
