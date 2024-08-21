// src/index.ts
import { Pool } from 'pg';
import { MicropostModel } from './models/Micropost';
import { PgMicropostRepository } from './repositories/PgMicropostRepository';

const pool = new Pool({
  connectionString: "postgresql://postgres:postgres@localhost:5432/web_app_db_integration"
});

const micropostRepository = new PgMicropostRepository(pool);

async function main() {
  await micropostRepository.createTable();
  
  const newPost = await micropostRepository.create(new MicropostModel({
    title: 'Hello, pg!',
    content: 'This is my first post using pg with TypeScript.'
  }));
  await micropostRepository.findAll();
  
  if (newPost) {
    await micropostRepository.update(newPost.id, 'Updated Title');
    await micropostRepository.delete(newPost.id);
  }
  
  await pool.end();
}

main().catch(console.error);