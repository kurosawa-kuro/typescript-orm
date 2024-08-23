// src/index.ts

import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { MicropostModel } from './models/Micropost';
import { MicropostService } from './services/MicropostService';
import { PrismaMicropostService } from './services/PrismaMicropostService';
import { PgMicropostService } from './services/PgMicropostService';

// Factory function to create the appropriate service
function createMicropostService(type: 'prisma' | 'pg' = 'prisma'): MicropostService {
  if (type === 'prisma') {
    const prisma = new PrismaClient();
    return new PrismaMicropostService(prisma);
  } else {
    const pool = new Pool({
      connectionString: "postgresql://postgres:postgres@localhost:5432/web_app_db_integration"
    });
    return new PgMicropostService(pool);
  }
}

async function main() {
  // Create the service (default is Prisma)
  const micropostService = createMicropostService();

  // Create a new Micropost
  const newPostData = new MicropostModel(0, 'Hello, World!', 'This is my first post.');
  const newPost = await micropostService.create(newPostData);
  console.log('Created new post:', newPost);

  // Get all Microposts
  const allPosts = await micropostService.findAll();
  console.log('All posts:', allPosts);
}

main().catch(console.error);