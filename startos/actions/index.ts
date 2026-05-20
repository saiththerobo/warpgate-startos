import { sdk } from '../sdk'
import { completeSetup } from './completeSetup'

export const actions = sdk.Actions.of().addAction(completeSetup)
