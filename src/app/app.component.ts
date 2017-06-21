import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormService } from './app.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  public submitted = false;
  public form: FormGroup;
  public options: any;

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.formService.get().subscribe( ( data) => {
      this.options = data;
    });

    this.form = this.fb.group({
      first_name: ['', [Validators.required], []],
      last_name: ['', [Validators.required], []],
      email: ['', [Validators.required, this.emailValidate], []],
      service_type: ['', [Validators.required], []],
      description: ['', [], []],
      accept: ['', [Validators.required], []],
    });
  }

  public emailValidate= (c: FormControl) => {
        if (c.value === '') {
            return null;
        } else {
            const EMAIL_REGEX = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
            return EMAIL_REGEX.test(c.value) ? null : {
                invalidEmail: true
            };
        }
    }

  public onSubmit({ value, valid }: { value: any, valid: boolean }) {

    if (this.submitted === false && valid === true) {
      const request = {
        assistance_request: {
          contact: {
            first_name: value.first_name,
            last_name: value.last_name,
            email: value.email
          },
        },
        service_type:  value.service_type,
        description: value.description
      };

      this.formService.post(request).subscribe( (res) => {
      }, (err) => {
        console.log(err);
      });


    } else {
      this.submitted = true;
    }

  }
}
