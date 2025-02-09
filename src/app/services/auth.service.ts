import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private afAuth: AngularFireAuth) {}

  login(email: string, senha: string) {
    return signInWithEmailAndPassword(this.auth, email, senha);
  }

  logout() {
    return signOut(this.auth);
  }

   // Login com Google
   loginWithGoogle() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }
}
