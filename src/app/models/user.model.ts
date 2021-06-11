import { Observable } from "rxjs";

export interface IUser {
    uid?: string;
    email: string;
    displayName?:string;
    password?: string;
    photoURL?: any;
    photObservable?: Observable<any>;
}