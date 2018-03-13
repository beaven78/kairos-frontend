import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ApiService} from "./api.service";
import createSpyObj = jasmine.createSpyObj;
import {Observable} from "rxjs";


/**
 * Dev Notes: Example of mocked service returning a json file. Mocking out the backend call.
 * This is an alternative to using a spy (which I used in the unit test).
 */
class mockApiService {

  constructor(private http: HttpClient) { }

  backendFizzBuzz(fizzBuzzVal: number)  {
    return this.http.get('/assets/backend.json');
  }
}


describe('AppComponent', () => {
  beforeEach(async(() => {

    // Dev Notes: Adding spy for calling backendFizzBuzz method.
    let apiServiceSpy = createSpyObj('ApiService', ['backendFizzBuzz']);
    apiServiceSpy.backendFizzBuzz.and.returnValue(Observable.of({"response" : "FizzBuzz"}));

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [{provide: ApiService, useValue: apiServiceSpy}]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should empty form should be falsy`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.valForm.valid).toBeFalsy();
  }));

  it(`should submitting a valid form be truthy`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.valForm.controls['fizzBuzzInput'].setValue("3");
    expect(app.valForm.valid).toBeTruthy();
  }));

  it('should render Enter number in a h2 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Enter a number to Fizz Buzz');
  }));

  it(`should callBackendFizzBuzz return FizzBuzz`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.callBackendFizzBuzz(15);
    expect(app.fizzBuzz).toEqual('FizzBuzz');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Your value is FizzBuzz');
  }));

});
