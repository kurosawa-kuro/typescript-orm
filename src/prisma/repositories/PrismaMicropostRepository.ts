// src/repositories/PrismaMicropostRepository.ts
import { PrismaClient } from '@prisma/client'
import { Micropost } from '../models/Micropost'
import { MicropostRepository } from './MicropostRepository'

export class PrismaMicropostRepository implements MicropostRepository {
  constructor(private prisma: PrismaClient) {}

  async create(micropost: Micropost): Promise<Micropost> {
    const created = await this.prisma.micropost.create({
      data: micropost.toPrismaCreate(),
    })
    return Micropost.fromPrisma(created)
  }

  async findAll(): Promise<Micropost[]> {
    const posts = await this.prisma.micropost.findMany()
    return posts.map(Micropost.fromPrisma)
  }

  async update(id: number, micropost: Partial<Micropost>): Promise<Micropost> {
    const updated = await this.prisma.micropost.update({
      where: { id },
      data: micropost,
    })
    return Micropost.fromPrisma(updated)
  }

  async delete(id: number): Promise<Micropost> {
    const deleted = await this.prisma.micropost.delete({
      where: { id },
    })
    return Micropost.fromPrisma(deleted)
  }
}