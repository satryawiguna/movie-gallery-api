export interface IToken {
     id?: number;
     token: string;
     type: string;
     expires: Date;
     blacklisted: boolean;
     created_at?: Date;
     updated_at?: Date;

     user_id: number;
}
