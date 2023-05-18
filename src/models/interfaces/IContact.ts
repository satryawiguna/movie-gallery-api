export interface IContact {
     id?: number;
     first_name: string;
     last_name: string;
     address?: string;
     country?: string;
     city?: string;
     postcode?: number;
     mobile?: string;
     avatar?: string;
     created_at?: Date;
     updated_at?: Date;

     user_id: number;
}
