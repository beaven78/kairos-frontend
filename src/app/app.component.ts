import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from "../environments/environment";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fizzBuzz: string;
  valForm: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient) {

    // Model Driven validation
    this.valForm = fb.group({
      'fizzBuzzInput': [null, Validators.required]
    });
  }

  /**
   * Submitting form to process Fizz Buzz input.
   *
   * Dev Notes: added basic Angular validation to prevent empty field.
   * Dev Notes: retrieving url from environment file as this will change depending on deployment.
   */
  submitForm($ev, value: any) {

    $ev.preventDefault();
    for (const c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {

      this.callBackendFizzBuzz(value['fizzBuzzInput']);
    }
  }

  /**
   * Dev Notes: This method could be moved to a service layer, this would allow for a mocking of implementation for
   * unit testing and better seperation of concerns. In production environment swagger api could be used.
   */
  callBackendFizzBuzz(fizzBuzzVal: number) {
    this.http.get(environment.backend + fizzBuzzVal).subscribe(data => {
      this.fizzBuzz = data['response'];
    })
  }
}
