// src/services/PgMicropostService.ts

import { Pool } from 'pg';
import { MicropostModel } from '../models/Micropost';
import { MicropostService } from './MicropostService';

export class PgMicropostService extends MicropostService {
  constructor(private pool: Pool) {
    super();
  }

  async create(micropost: MicropostModel): Promise<MicropostModel> {
    const client = await this.pool.connect();
    try {
      const { title, content } = micropost.toPgCreate();
      const result = await client.query(
        'INSERT INTO microposts (title, content) VALUES ($1, $2) RETURNING *',
        [title, content]
      );
      return MicropostModel.fromPg(result.rows[0]);
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<MicropostModel[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM microposts');
      return result.rows.map(MicropostModel.fromPg);
    } finally {
      client.release();
    }
  }
}