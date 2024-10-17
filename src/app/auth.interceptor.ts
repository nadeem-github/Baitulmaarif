// src/app/interceptors/auth.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private username = 'BaitulMaarif';
    private password = 'JifYf58uy07d';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const encodedCredentials = btoa(`${this.username}:${this.password}`);

        // Clone the request and add the Authorization header
        const authReq = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`,
            },
        });

        return next.handle(authReq); // Forward the modified request
    }
}
