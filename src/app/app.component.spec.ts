import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`empty form should be falsy`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.valForm.valid).toBeFalsy();
  }));

  it(`submitting a valid form`, async(() => {
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

  /**
   * Dev Notes: By moving the http backend call to a service we could make better use of mocks and
   * mock out a backend response.
   */

});
