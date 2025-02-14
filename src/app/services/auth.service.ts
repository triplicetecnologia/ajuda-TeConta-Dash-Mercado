import { Injectable, inject } from '@angular/core';
import { Auth, signOut, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth); // Injeção Standalone
  private userSubject = new BehaviorSubject<User | null>(null); // Mantém o estado do usuário
  user$ = this.userSubject.asObservable(); // Observable para acompanhar o usuário autenticado
  isLoggedIn$ = new BehaviorSubject<boolean>(false); // Observable para acompanhar o login

  constructor() {
    // Observa mudanças na autenticação e atualiza o estado do usuário e login
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
      this.isLoggedIn$.next(!!user); // Atualiza o estado de login
    });
  }

  // Retorna um Observable do usuário autenticado
  getUser(): Observable<User | null> {
    return this.user$;
  }

  // Criar usuário
  async register(email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  }

  // Fazer login
  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  }

  // Fazer logout
  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  // Retorna se o usuário está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
