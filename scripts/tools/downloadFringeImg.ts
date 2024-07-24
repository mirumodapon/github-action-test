import dotenv from 'dotenv'
import { join } from 'node:path'
import { mkdir, writeFile } from 'node:fs/promises'
import { getSheetRows, getLoadedSpreadsheetDocument } from '../pre-build/utils'
import axios from 'axios'

dotenv.config({ path: join(process.cwd(), '.env') })
dotenv.config({ path: join(process.cwd(), '.env.local') })

async function downloadImage (url: string, path:string) {
  if (url.startsWith('https://drive.google.com/file/d/')) {
    url = `https://drive.google.com/uc?export=download&id=${url.split('/')[5]}`
  }

  try {
    const { data } = await axios.get<Buffer>(url, { responseType: 'arraybuffer' })
    await writeFile(path, data)
  } catch (err) {
  }
}

export default async function main () {
  const doc = await getLoadedSpreadsheetDocument()
  const fringe = await getSheetRows(doc, 'fringe')
  const dirPath = join(process.cwd(), 'public', 'images', 'fringe')
  await mkdir(dirPath, { recursive: true })

  const images = fringe.filter(r => r.logo).map(r => {
    return downloadImage(r.logo, join(dirPath, `${r.id}.png`))
  })

  return await Promise.all(images)
}
