import { HttpRequest , HttpHandler , HttpInterceptor , HttpEvent , HttpHeaders} from '@angular/common/http';
import {Observable } from 'rxjs';
import { NbTokenService } from '@nebular/auth';
import {Injectable} from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private tokenService: NbTokenService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       this.tokenService.get().subscribe((token) => {
          if (token.isValid()) {
               let tokenValue = token.getValue();
               req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + tokenValue) });
          }
       });
        req = req.clone({ headers: req.headers.append('Accept', 'application/json').append('Content-Type', 'application/json') });
        return next.handle(req);
    }
}