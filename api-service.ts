import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, timeout, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { GlobalsService } from './globals.service';

const apiTimeout = 20 * 60 * 1000; // 10 minutes timeout

export interface ApiExtras {
  operation: string;
  result: any;
  showError?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _isLoggedOut = new Subject();

  constructor(
    private http: HttpClient,
    private globalService: GlobalsService,
  ) {}

  public logOutSub() {
    return this._isLoggedOut.asObservable();
  }

  public checkLogin(res) {
    if (res && res.status && res.status === 'logout') {
      this._isLoggedOut.next(true);
      return false;
    }
    return true;
  }

  /**
   * This function sets header and returns
   * @returns HttpHeaders
   */
  private setHeaders(type = 'any'): HttpHeaders {
    let headersConfig = {};
    if (type.toLowerCase() === 'upload' || type.toLowerCase() === 'formdata') {
    } else {
      headersConfig = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      };
    }
    return new HttpHeaders(headersConfig);
  }

  /**
   * This function makes get call to api to given path and search params
   * @param path string
   * @param params SearchParams
   * @param extras {operation: '', result: {}} name of the operation that failed
   *  for error logging and optional value to return as the observable result
   * @returns Observable
   */
  get(
    path: string,
    params = {},
    extras: ApiExtras = {
      operation: '',
      result: {},
      showError: false,
    }
  ): Observable<any> {
    const options = {
      params: params,
      headers: this.setHeaders()
    };

    const targetUrl = `${environment.api_url}${path}`;
    return this.http.get(targetUrl, options).pipe(
      timeout(apiTimeout),
      tap(res => {
        this.checkLogin(res);
        this.checkResponseErrors(res, extras);
      }),
      catchError(this.handleError(extras.operation, extras.result, extras.showError))
    );
  }

  /**
   * This is for local testing of get calls
   * @param path string full api path
   * @param params SearchParams
   * @param extras {operation: '', result: {}} name of the operation that failed
   *  for error logging and optional value to return as the observable result
   * @returns Observable
   */
  getTest(
    path: string,
    params = {},
    extras: ApiExtras = {
      operation: '',
      result: {},
      showError: false,
    }
  ): Observable<any> {
    const options = {
      params: params,
      headers: this.setHeaders()
    };

    const targetUrl = `${path}`;

    return this.http.get(targetUrl, options).pipe(
      catchError(this.handleError(extras.operation, extras.result, extras.showError))
    );
  }

  /**
   * This function makes post call to api to given path and search params
   * @param path string
   * @param params SearchParams
   * @param extras {operation: '', result: {}} name of the operation that failed
   *  for error logging and optional value to return as the observable result
   * @returns Observable
   */
  post(
    path: string,
    params,
    type = 'any',
    extras: ApiExtras = {
      operation: '',
      result: {},
      showError: false,
    }
  ): Observable<any> {
    const targetUrl = `${environment.api_url}${path}`;
    const options = {
      headers: this.setHeaders(type)
    };
    let postParams: any = params;
    if (type.toLowerCase() === 'formdata') {
      postParams = this.convertToFormData(postParams);
    }

    return this.http.post(targetUrl, postParams, options).pipe(
      timeout(apiTimeout),
      tap(res => {
        this.checkLogin(res);
        this.checkResponseErrors(res, extras);
      }),
      catchError(this.handleError(extras.operation, extras.result, extras.showError))
    );
  }

  /**
   * This is for local testing of post calls
   * @param path string
   * @param params SearchParams
   * @param extras {operation: '', result: {}} name of the operation that failed
   *  for error logging and optional value to return as the observable result
   * @returns Observable
   */
  postTest(
    path: string,
    params,
    type = 'any',
    extras: ApiExtras = {
      operation: '',
      result: {},
      showError: false,
    }
  ): Observable<any> {
    const targetUrl = path;
    const options = {
      headers: this.setHeaders(type)
    };
    let postParams: any = params;
    if (type === 'formdata') {
      postParams = new FormData();
      for (const key of Object.keys(params)) {
        postParams.set(key, params[key]);
      }
    }

    return this.http.post(targetUrl, postParams, options).pipe(
      catchError(this.handleError(extras.operation, extras.result, extras.showError))
    );
  }

  upload(
    path: string,
    params,
    type = 'upload',
    extras: ApiExtras = {
      operation: '',
      result: {},
      showError: false,
    }
  ): Observable<any> {
    const targetUrl = `${environment.api_url}${path}`;
    const options = {
      headers: this.setHeaders(type)
    };
    return this.http.post(targetUrl, params, options).pipe(
      timeout(apiTimeout),
      tap(res => {
        this.checkLogin(res);
        this.checkResponseErrors(res, extras);
      }),
      catchError(this.handleError(extras.operation, extras.result, extras.showError))
    );
  }

  postFormData(
    path: string,
    params,
    type = 'formdata',
    extras: ApiExtras = {
      operation: '',
      result: {},
      showError: false,
    }
  ): Observable<any> {
    const targetUrl = `${environment.api_url}${path}`;
    const options = {
      headers: this.setHeaders(type)
    };
    return this.http.post(targetUrl, params, options).pipe(
      timeout(apiTimeout),
      tap(res => {
        this.checkLogin(res);
        this.checkResponseErrors(res, extras);
      }),
      catchError(this.handleError(extras.operation, extras.result, extras.showError))
    );
  }

  /**
   * Converts given object to `FormData`
   * @param obj Object to convert to `FormData`
   */
  convertToFormData(obj: any = {}): FormData {
    const data = new FormData();
    for (const key of Object.keys(obj)) {
      let val = obj[key];
      if (obj[key] !== null && typeof obj[key] === 'object') {
        val = JSON.stringify(val);
      }
      if (val === undefined || val === null) {
        val = '';
      }
      data.append(key, val);
    }
    return data;
  }

  /**
   * Checks api response errors and show toaster on extras.showError is true
   */
  private checkResponseErrors(response: any, extras: ApiExtras) {
    if (extras.showError) {
      if (response && response.status.toLowerCase() === 'error') {
        this.globalService.showError(response.message);
      }
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T, showError = false) {
    return (error: any): Observable<T> => {
      // TODO::Kiran send the error to remote logging infrastructure
      console.error(error); // log to console instead

      if (showError) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.globalService.showError(errorMessage);
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
