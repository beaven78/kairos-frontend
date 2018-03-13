import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from "./api.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fizzBuzz: string;
  valForm: FormGroup;

  constructor(private fb: FormBuilder,
              private api: ApiService) {

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

    for (const c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {

      this.callBackendFizzBuzz(value['fizzBuzzInput']);
    }
  }

  /**
   * Dev Notes: This will allow for a mocking of the implementation for
   * unit testing and better separation of concerns. In a production environment swagger api could be used.
   */
  callBackendFizzBuzz(fizzBuzzVal: number) {

    this.api.backendFizzBuzz(fizzBuzzVal).subscribe(data => {
      this.fizzBuzz = data['response'];
    })
  }
}
