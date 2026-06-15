/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'
import type { SanitizedConfig } from 'payload'

const configPromise = import('@payload-config').then((m) => m.default) as Promise<SanitizedConfig>

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = (args: any) =>
  generatePageMetadata({ config: configPromise, ...args })

const Page = (args: Args) =>
  RootPage({ config: configPromise, importMap, ...args })

export default Page
