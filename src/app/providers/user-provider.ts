import { Injectable } from "@angular/core";
import { IUser } from "../models/user.model";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { AuthProvider } from "./auth-provider";

@Injectable({
    providedIn: 'root',
})

export class UserProvider {
    constructor(private  angularFireAuth: AngularFireAuth, private authProvider: AuthProvider ) {}

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
        return this.angularFireAuth.currentUser;
    }
    public async  updateDisplayName(newDisplayName:string): Promise<boolean>{
        let successfulEdition = false;
        let user  = await  this.angularFireAuth.currentUser;
        await user.updateProfile( {displayName: newDisplayName})
            .then(() => successfulEdition = true);
        return successfulEdition;
    }
    public async updateEmail (email:string):Promise<boolean>{
        let successfulEdition = false;
        await this.angularFireAuth.currentUser
            .then( async user =>{
                try{
                    await user.updateEmail(email)
                    .then(() => successfulEdition = true);
                }catch(err){
                    console.log(err);
                }
            });
        return successfulEdition;    
    }
}

