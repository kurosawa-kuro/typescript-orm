// src/services/MicropostService.ts

import { MicropostModel } from '../models/Micropost';

export abstract class MicropostService {
  abstract create(micropost: MicropostModel): Promise<MicropostModel>;
  abstract findAll(): Promise<MicropostModel[]>;
}