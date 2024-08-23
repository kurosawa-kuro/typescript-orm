// src/models/Micropost.ts

export interface Micropost {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export class MicropostModel implements Micropost {
    constructor(
      public id: number = 0,
      public title: string = '',
      public content: string = '',
      public createdAt: Date = new Date(),
      public updatedAt: Date = new Date()
    ) {}
  
    static fromPrisma(data: any): MicropostModel {
      return new MicropostModel(
        data.id,
        data.title,
        data.content,
        data.createdAt,
        data.updatedAt
      );
    }
  
    static fromPg(data: any): MicropostModel {
      return new MicropostModel(
        data.id,
        data.title,
        data.content,
        data.created_at,
        data.updated_at
      );
    }
  
    toPrismaCreate(): any {
      return {
        title: this.title,
        content: this.content,
      };
    }
  
    toPgCreate(): any {
      return {
        title: this.title,
        content: this.content,
      };
    }
  }