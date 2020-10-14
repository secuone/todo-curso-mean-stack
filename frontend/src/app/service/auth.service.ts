import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signUpURL = "http://localhost:3004/api/user";
  private loginURL = "http://localhost:3004/api/auth";

  constructor(private http: HttpClient, private router: Router) { }

  signUpUser(user){
    // después de post ponemos lo que devuelve la api
    return this.http.post<any>(this.signUpURL, user);
  }

  loginUser(user){
    return this.http.post<any>(this.loginURL, user);
  }

  isLogged(){
    // !! devuelve true si existe token o false si no existe
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
