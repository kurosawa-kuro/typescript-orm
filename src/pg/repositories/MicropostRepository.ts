// src/repositories/MicropostRepository.ts
import { MicropostModel } from '../models/Micropost';

export interface MicropostRepository {
  createTable(): Promise<void>;
  create(micropost: MicropostModel): Promise<MicropostModel | null>;
  findAll(): Promise<MicropostModel[]>;
  update(id: number, title: string): Promise<MicropostModel | null>;
  delete(id: number): Promise<MicropostModel | null>;
}