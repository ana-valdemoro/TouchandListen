export interface ISong {
    _id?: string;
    name: string;
    artists: string[];
    duration: string;
    year?: string;
    genre?:string;
    album?:string;
    photoURL?: string;
}