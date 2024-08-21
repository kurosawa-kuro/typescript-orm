// src/repositories/MicropostRepository.ts
import { Micropost } from "../entity/Micropost"

export interface MicropostRepository {
  create(micropost: Partial<Micropost>): Promise<Micropost>
  save(micropost: Micropost): Promise<Micropost>
  findAll(): Promise<Micropost[]>
  remove(micropost: Micropost): Promise<Micropost>
}