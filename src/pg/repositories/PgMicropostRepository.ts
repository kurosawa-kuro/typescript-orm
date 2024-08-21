// src/repositories/PgMicropostRepository.ts
import { Pool } from 'pg';
import { MicropostModel } from '../models/Micropost';
import { MicropostRepository } from './MicropostRepository';

export class PgMicropostRepository implements MicropostRepository {
  constructor(private pool: Pool) {}

  async createTable(): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS microposts (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Table created or already exists');
    } catch (err) {
      console.error('Error creating table', err);
    } finally {
      client.release();
    }
  }

  async create(micropost: MicropostModel): Promise<MicropostModel | null> {
    const client = await this.pool.connect();
    try {
      const { title, content } = micropost.toDatabase();
      const result = await client.query(
        'INSERT INTO microposts (title, content) VALUES ($1, $2) RETURNING *',
        [title, content]
      );
      const newPost = MicropostModel.fromDatabaseResult(result.rows[0]);
      console.log('Created new post:', newPost);
      return newPost;
    } catch (err) {
      console.error('Error creating micropost', err);
      return null;
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<MicropostModel[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM microposts');
      const posts = result.rows.map(row => MicropostModel.fromDatabaseResult(row));
      console.log('All posts:', posts);
      return posts;
    } catch (err) {
      console.error('Error getting all microposts', err);
      return [];
    } finally {
      client.release();
    }
  }

  async update(id: number, title: string): Promise<MicropostModel | null> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'UPDATE microposts SET title = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        [title, id]
      );
      const updatedPost = MicropostModel.fromDatabaseResult(result.rows[0]);
      console.log('Updated post:', updatedPost);
      return updatedPost;
    } catch (err) {
      console.error('Error updating micropost', err);
      return null;
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<MicropostModel | null> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('DELETE FROM microposts WHERE id = $1 RETURNING *', [id]);
      const deletedPost = MicropostModel.fromDatabaseResult(result.rows[0]);
      console.log('Deleted post:', deletedPost);
      return deletedPost;
    } catch (err) {
      console.error('Error deleting micropost', err);
      return null;
    } finally {
      client.release();
    }
  }
}