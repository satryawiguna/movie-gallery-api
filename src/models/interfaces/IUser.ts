export interface IUser {
     id?: number;
     email: string;
     password: string;
     email_verified?: number;
     status?: number;
     created_at?: Date;
     updated_at?: Date;

     role_id: number;
}
