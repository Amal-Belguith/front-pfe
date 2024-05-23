import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authenticateservice } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(private authenticateService: authenticateservice) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('accessToken')==null || localStorage.getItem('accessToken')==''){
       req = req.clone({
          setHeaders:{
            'accept': 'application/json',
            'Content-Type':'application/json',
            'Access-Controll-Allow-Origin':'*',
            'Access-Controll-Allow-Headers':'Content-Type',
            'Access-Controll-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS'
            
          },

       });

    }else{

      req = req.clone({
        setHeaders:{
          'accept': 'application/json',
          'Content-Type':'application/json',
          'Access-Controll-Allow-Origin':'*',
          'Access-Controll-Allow-Headers':'Content-Type',
          'Access-Controll-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },

     });

    }
    console.log('Intercepted');
    return next.handle(req);
  }
}

export const AuthenticationInterceptorProvider = {provide:HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true};
