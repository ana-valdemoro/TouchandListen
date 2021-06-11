import { Injectable } from "@angular/core";
import { IUser } from "../models/user.model";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthProvider } from "./auth-provider";
import { FirestorageService } from "../services/firestorage.service";

@Injectable({
    providedIn: 'root',
})

export class UserProvider {
    constructor(private  angularFireAuth: AngularFireAuth, private authProvider: AuthProvider, private fireStorageService: FirestorageService ) {}

    public async getLoggedUser(): Promise<IUser>{
        let user = await this.angularFireAuth.currentUser
            .then( async user =>{
                return user;
            });
        console.log(user);
        let photoURL = await this.fireStorageService.getProfileImage(user.uid);
        return {photObservable: photoURL,
            displayName: user.displayName,
            email: user.email,
            uid: user.uid, 
        } as IUser;
    }
    public async  updateDisplayName(newDisplayName:string): Promise<boolean>{
        let successfulEdition = false;
        let user  = await  this.angularFireAuth.currentUser;
        await user.updateProfile( {displayName: newDisplayName})
            .then(() => successfulEdition = true);
        return successfulEdition;
    }
    public async updateEmail (email:string){
        // let successfulEdition = false;
        await this.angularFireAuth.currentUser
            .then( async user =>{
                return await user.updateEmail(email)
            });            



            //         .then(() => successfulEdition = true);
            //     }catch(err){
            //         console.log(err);
            //     }
            // });
       // return successfulEdition;    
    }
}

