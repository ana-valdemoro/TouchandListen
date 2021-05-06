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
    public async updatePhotoUrl(url: string):Promise<boolean>{
        let successfulEdition = false;
        let user  = await  this.angularFireAuth.currentUser;
        await user.updateProfile( {photoURL: url})
            .then(() => successfulEdition = true);
        return successfulEdition;

    }
}

