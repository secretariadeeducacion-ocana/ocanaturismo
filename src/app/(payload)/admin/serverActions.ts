'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'
import { importMap } from './importMap'
import type { SanitizedConfig, ServerFunctionClient } from 'payload'

const configPromise = import('@payload-config').then(
  (m) => m.default,
) as Promise<SanitizedConfig>

export const serverAction: ServerFunctionClient = async (args) =>
  handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
