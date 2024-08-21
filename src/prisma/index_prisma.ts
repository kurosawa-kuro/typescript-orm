// src/index.ts
import { PrismaClient } from '@prisma/client'
import { Micropost } from './models/Micropost'
import { PrismaMicropostRepository } from './repositories/PrismaMicropostRepository'

const prisma = new PrismaClient()
const micropostRepository = new PrismaMicropostRepository(prisma)

async function main() {
  // Create a new Micropost
  const newPostData = new Micropost({
    title: 'Hello, Prisma!',
    content: 'This is my first post using Prisma with TypeScript.',
  })
  const newPost = await micropostRepository.create(newPostData)
  console.log('Created new post:', newPost)
  console.log('Post summary:', newPost.getSummary())

  // Get all Microposts
  const allPosts = await micropostRepository.findAll()
  console.log('All posts:', allPosts)

  // Update a Micropost
  newPost.title = 'Updated Title'
  const updatedPost = await micropostRepository.update(newPost.id, newPost)
  console.log('Updated post:', updatedPost)

  // Delete a Micropost
  const deletedPost = await micropostRepository.delete(newPost.id)
  console.log('Deleted post:', deletedPost)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })