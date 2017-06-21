import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FormService {
    constructor(private http: Http) {

    }
 public get(): Observable<any> {
    return this.http.get('http://localhost:49567/api/service-types')
      .map((res: Response) => {
          const response = res.json();
          return response.data;
        })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public post(data): Observable<any> {
    return this.http.post('https://devapi.equitydatascience.com/login', data)
      .map((res: Response) => {
          const response = res.json();
          return response.data;
        })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
