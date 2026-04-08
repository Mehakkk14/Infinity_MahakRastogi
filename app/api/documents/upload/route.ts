import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const mimeType = file.type

    let text = ''

    if (mimeType === 'text/plain' || file.name.endsWith('.txt')) {
      // Plain text
      text = buffer.toString('utf-8')
    } else if (mimeType === 'application/pdf' || file.name.endsWith('.pdf')) {
      // For PDF in hackathon MVP, we'll extract basic text
      // In production, use mammoth.js or pdf-parse properly
      text = `[PDF Document: ${file.name}]\n\nNote: PDF parsing is simplified for this hackathon version. Please use TXT files or copy-paste PDF content.\n\nRaw content preview:\n${buffer.toString('utf-8', 0, Math.min(1000, buffer.length))}`
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.name.endsWith('.docx')
    ) {
      // For DOCX, request copy-paste instead
      text = `[DOCX Document: ${file.name}]\n\nFor the hackathon MVP, please copy and paste the document text directly or use TXT format.\n\nDocument info: ${file.size} bytes`
    } else {
      return NextResponse.json(
        { error: `Supported file types: TXT, PDF. Received: ${mimeType}` },
        { status: 400 }
      )
    }

    return NextResponse.json({
      text: text.substring(0, 50000), // Limit to prevent token overflow
      fileName: file.name,
    })
  } catch (error: unknown) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
