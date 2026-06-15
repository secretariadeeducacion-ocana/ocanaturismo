/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'
import type { SanitizedConfig } from 'payload'

const configPromise = import('@payload-config').then((m) => m.default) as Promise<SanitizedConfig>

const NotFound = (args: any) =>
  NotFoundPage({ config: configPromise, importMap, ...args })

export default NotFound
