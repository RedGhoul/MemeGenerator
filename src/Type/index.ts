export interface MemeTemplate {
  id: string
  name: string
  lines: number
  overlays: number
  styles: string[]
  blank: string
  example: {
    text: string[]
    url: string
  }
  source: string | null
  keywords: string[]
  _self: string
}

export interface Font {
  id: string
  alias: string | null
  filename: string
  _self: string
}
