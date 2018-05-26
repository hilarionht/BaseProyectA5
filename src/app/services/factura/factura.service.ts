import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FacturaService {

  _Url:string = 'factura/FacturaA.json';

  constructor( private _http: HttpClient) { 
    
  }
  getFrete()  {
      return this._http.get(this._Url)
          .map((response: any) => {
            console.log(response);
            
            return response.json();
          });
  }
  
  private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json()|| 'Server error');
  }

}
