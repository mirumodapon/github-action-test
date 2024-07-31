import { faker } from '@faker-js/faker'
import { join } from 'node:path'
import dotenv from 'dotenv'
import { saveJSON, getSheetRows } from './utils'

import type { GoogleSpreadsheet } from 'google-spreadsheet'

export function createFakeData () {
  const generate = () => ({
    id: faker.datatype.uuid().slice(0, 7).toUpperCase(),
    title: {
      'zh-TW': faker.lorem.words(5),
      en: faker.lorem.words(5)
    },
    description: {
      'zh-TW': faker.lorem.paragraph(50),
      en: faker.lorem.paragraph(50)
    },
    link: faker.internet.domainName(),
    contact: faker.name.fullName(),
    email: faker.internet.email(),
    logo: faker.internet.domainName()
  })

  const fringes = Array.from({ length: 10 }).map(() => generate())

  return { fringes }
}

export function transformData (fringe) {
  return {
    fringes: fringe.map(x => ({
      id: x.id,
      title: {
        en: x['title:en'],
        'zh-TW': x['title:zh-TW']
      },
      description: {
        en: x['description:en'],
        'zh-TW': x['description:zh-TW']
      },
      contact: x.contact,
      email: x.contact_email,
      logo: `/2024/images/fringe/${x.id}.png`
    }))
  }
}

export default async function generateFringe (doc: GoogleSpreadsheet | null, fake = false) {
  dotenv.config({ path: join(process.cwd(), '.env') })
  dotenv.config({ path: join(process.cwd(), '.env.local') })

  let fringe: unknown

  if (fake) {
    fringe = createFakeData()
  } else if (doc) {
    fringe = transformData(await getSheetRows(doc, 'fringe'))
  }

  saveJSON('fringe', fringe)
}
