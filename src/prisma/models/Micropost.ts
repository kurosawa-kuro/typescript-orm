// src/models/Micropost.ts
import { Micropost as PrismaMicropost } from '@prisma/client'

export class Micropost implements PrismaMicropost {
  id: number
  title: string
  content: string
  createdAt: Date
  updatedAt: Date

  constructor(data: Partial<PrismaMicropost>) {
    this.id = data.id || 0
    this.title = data.title || ''
    this.content = data.content || ''
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
  }

  static fromPrisma(data: PrismaMicropost): Micropost {
    return new Micropost(data)
  }

  toPrismaCreate(): Omit<PrismaMicropost, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      title: this.title,
      content: this.content,
    }
  }

  toPrismaUpdate(): Partial<Omit<PrismaMicropost, 'id' | 'createdAt' | 'updatedAt'>> {
    return {
      title: this.title,
      content: this.content,
    }
  }

  // カスタムメソッドを追加できます
  getSummary(): string {
    return `${this.title} (Created: ${this.createdAt.toLocaleDateString()})`
  }
}