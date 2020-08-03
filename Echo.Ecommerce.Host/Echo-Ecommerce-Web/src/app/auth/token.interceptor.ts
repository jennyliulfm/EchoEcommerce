import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthGuard } from './auth.guard';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    constructor(public auth: AuthGuard) {}
     
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        request = request.clone({
            setHeaders: {
            Authorization: `Bearer ${this.auth.getToken()}`
            }
        });
        
        return next.handle(request);
    }
}