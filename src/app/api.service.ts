import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

/**
 * Dev Notes: By moving the http backend call to a service we make better use of mocks and
 * mock out a backend response.
 */
@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * Calls backend and returns an observable.
   */
  public backendFizzBuzz(fizzBuzzVal: number)  {
    return this.http.get(environment.backend + fizzBuzzVal);
  }
}
