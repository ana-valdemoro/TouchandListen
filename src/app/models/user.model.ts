export interface IUser {
    uid?: string;
    name?: string;
    surname?: string;
    email: string;
    displayName?:string;
    password?: string;
    photoUrl?: string;
}