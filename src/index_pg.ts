import { Pool } from 'pg';

const pool = new Pool({
  connectionString: "postgresql://postgres:postgres@localhost:5432/web_app_db_integration"
});

async function createTable() {
  const client = await pool.connect();
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

async function createMicropost(title: string, content: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO microposts (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    );
    console.log('Created new post:', result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error('Error creating micropost', err);
  } finally {
    client.release();
  }
}

async function getAllMicroposts() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM microposts');
    console.log('All posts:', result.rows);
    return result.rows;
  } catch (err) {
    console.error('Error getting all microposts', err);
  } finally {
    client.release();
  }
}

async function updateMicropost(id: number, title: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE microposts SET title = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [title, id]
    );
    console.log('Updated post:', result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error('Error updating micropost', err);
  } finally {
    client.release();
  }
}

async function deleteMicropost(id: number) {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM microposts WHERE id = $1 RETURNING *', [id]);
    console.log('Deleted post:', result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error('Error deleting micropost', err);
  } finally {
    client.release();
  }
}

async function main() {
  await createTable();
  
  const newPost = await createMicropost('Hello, pg!', 'This is my first post using pg with TypeScript.');
  await getAllMicroposts();
  
  if (newPost) {
    await updateMicropost(newPost.id, 'Updated Title');
    await deleteMicropost(newPost.id);
  }
  
  await pool.end();
}

main().catch(console.error);