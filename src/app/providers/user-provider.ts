import { Injectable } from "@angular/core";
import { IUser } from "../models/user.model";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root',
})

export class UserProvider {
    constructor(private  angularFireAuth: AngularFireAuth) {}

    //Método que devuelve el objeto Iuser encontrado
    // public async getUserByUID(uid: string):Promise<IUser>{
    //    return ( await this.angularFireStore.collection('users').doc(uid).get().toPromise()).data() as IUser;
    // }

    // public createUserInDB(user:IUser){
    //     this.angularFireStore.collection('users').doc(user.uid).set({
    //         name: user.name,
    //         surname: user.surname,
    //         email: user.email
    //     }).catch(error => {
    //         console.log('Error adding user to firestore: ', error);
    //     })
    // }
    public async getLoggedUser(): Promise<IUser>{
        let user = await this.angularFireAuth.currentUser;
        console.log(user);
        return {
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL} as IUser
    }
}
