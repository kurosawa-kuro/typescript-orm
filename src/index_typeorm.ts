// src/index.ts
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Micropost } from "../entity/Micropost"

const AppDataSource = new DataSource({
    type: "postgres",
    url: "postgresql://postgres:postgres@localhost:5432/web_app_db_integration",
    synchronize: true,
    logging: false,
    entities: [Micropost],
    migrations: [],
    subscribers: [],
})

async function main() {
    try {
        await AppDataSource.initialize()
        console.log("Data Source has been initialized!")

        const micropostRepository = AppDataSource.getRepository(Micropost)

        // Create a new Micropost
        const newPost = micropostRepository.create({
            title: "Hello, TypeORM!",
            content: "This is my first post using TypeORM with TypeScript.",
        })
        await micropostRepository.save(newPost)
        console.log("Created new post:", newPost)

        // Get all Microposts
        const allPosts = await micropostRepository.find()
        console.log("All posts:", allPosts)

        // Update a Micropost
        newPost.title = "Updated Title"
        const updatedPost = await micropostRepository.save(newPost)
        console.log("Updated post:", updatedPost)

        // Delete a Micropost
        await micropostRepository.remove(newPost)
        console.log("Deleted post")

    } catch (error) {
        console.error("Error during Data Source initialization", error)
    } finally {
        await AppDataSource.destroy()
    }
}

main()