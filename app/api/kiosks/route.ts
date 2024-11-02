import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'kiosks.json')

export async function GET() {
  const fileContents = await fs.readFile(dataFilePath, 'utf8')
  return NextResponse.json(JSON.parse(fileContents))
} 