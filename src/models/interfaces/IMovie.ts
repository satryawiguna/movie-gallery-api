export interface IMovie {
     id?: number;
     title: string;
     description: string;
     release_date: Date;
     runtime: string;
     revenue: number;
     poster: string;
     created_at?: Date;
     updated_at?: Date;
}
