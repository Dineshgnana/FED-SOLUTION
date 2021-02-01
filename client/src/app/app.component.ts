import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  fieldsData: Array<any> = [
    { name: 'Advances', value: 'advances' },
    { name: 'Alerts', value: 'alerts' },
    { name: 'Other communications', value: 'others' },
  ];

  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      org: [''],
      euResident: ['', Validators.required],
      fieldName: this.formBuilder.array([], Validators.required),
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onCheckboxChange(e) {
    e.preventDefault();
    e.stopPropagation();
    const checkArray: FormArray = this.registerForm.get(
      'fieldName'
    ) as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onReset() {
    this.registerForm.reset();
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    let apiUrl = 'http://localhost:3000/api/email-signup';

    const params = new HttpParams({
      fromObject: this.registerForm.value,
    });

    const options = { headers: this.headers };

    this.http.post(apiUrl, params.toString(), options).subscribe((res: any) => {
      alert(res?.message);
      this.onReset();
    });
  }
}
