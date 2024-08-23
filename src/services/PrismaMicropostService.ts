
// src/services/PrismaMicropostService.ts

import { PrismaClient } from '@prisma/client';
import { MicropostModel } from '../models/Micropost';
import { MicropostService } from './MicropostService';

export class PrismaMicropostService extends MicropostService {
  constructor(private prisma: PrismaClient) {
    super();
  }

  async create(micropost: MicropostModel): Promise<MicropostModel> {
    const created = await this.prisma.micropost.create({
      data: micropost.toPrismaCreate(),
    });
    return MicropostModel.fromPrisma(created);
  }

  async findAll(): Promise<MicropostModel[]> {
    const posts = await this.prisma.micropost.findMany();
    return posts.map(MicropostModel.fromPrisma);
  }
}