// src/repositories/MicropostRepository.ts
import { Micropost } from '../models/Micropost'

export interface MicropostRepository {
  create(micropost: Micropost): Promise<Micropost>
  findAll(): Promise<Micropost[]>
  update(id: number, micropost: Partial<Micropost>): Promise<Micropost>
  delete(id: number): Promise<Micropost>
}