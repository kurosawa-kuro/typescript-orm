// src/index.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a new Micropost
  const newPost = await prisma.micropost.create({
    data: {
      title: 'Hello, Prisma!',
      content: 'This is my first post using Prisma with TypeScript.',
    },
  })
  console.log('Created new post:', newPost)

  // Get all Microposts
  const allPosts = await prisma.micropost.findMany()
  console.log('All posts:', allPosts)

  // Update a Micropost
  const updatedPost = await prisma.micropost.update({
    where: { id: newPost.id },
    data: { title: 'Updated Title' },
  })
  console.log('Updated post:', updatedPost)

  // Delete a Micropost
  const deletedPost = await prisma.micropost.delete({
    where: { id: newPost.id },
  })
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