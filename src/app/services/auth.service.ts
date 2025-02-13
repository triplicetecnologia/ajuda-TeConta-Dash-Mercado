import { Injectable, inject } from '@angular/core';
import { Auth, signOut, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth); // Injeção Standalone
  private userSubject = new BehaviorSubject<User | null>(null); // Mantém o estado do usuário

  constructor() {
    // Observa mudanças na autenticação e atualiza o estado do usuário
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  // Retorna um Observable do usuário autenticado
  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  // Criar usuário
  async register(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Fazer login
  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.userSubject.next(userCredential.user); // Atualiza o estado do usuário
      return userCredential.user;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  // Fazer logout
  async logout(): Promise<void> {
    await signOut(this.auth);
    this.userSubject.next(null); // Atualiza o estado após logout
  }
}
