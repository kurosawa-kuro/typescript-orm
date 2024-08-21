// src/models/Micropost.ts

export interface Micropost {
    id: number;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
  }
  
  export class MicropostModel implements Micropost {
    id: number;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
  
    constructor(data: Partial<Micropost>) {
      this.id = data.id || 0;
      this.title = data.title || '';
      this.content = data.content || '';
      this.created_at = data.created_at || new Date();
      this.updated_at = data.updated_at || new Date();
    }
  
    static fromDatabaseResult(row: any): MicropostModel {
      return new MicropostModel({
        id: row.id,
        title: row.title,
        content: row.content,
        created_at: row.created_at,
        updated_at: row.updated_at
      });
    }
  
    toDatabase(): Omit<Micropost, 'id' | 'created_at' | 'updated_at'> {
      return {
        title: this.title,
        content: this.content
      };
    }
  }