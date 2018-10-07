/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FPOMemberService } from './FPOMember.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-fpomember',
  templateUrl: './FPOMember.component.html',
  styleUrls: ['./FPOMember.component.css'],
  providers: [FPOMemberService]
})
export class FPOMemberComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  personID = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  isMarried = new FormControl('', Validators.required);
  phone1 = new FormControl('', Validators.required);
  phone2 = new FormControl('', Validators.required);
  phone3 = new FormControl('', Validators.required);
  photo = new FormControl('', Validators.required);
  fatherName = new FormControl('', Validators.required);
  husbandName = new FormControl('', Validators.required);


  constructor(public serviceFPOMember: FPOMemberService, fb: FormBuilder) {
    this.myForm = fb.group({
      personID: this.personID,
      name: this.name,
      age: this.age,
      address: this.address,
      isMarried: this.isMarried,
      phone1: this.phone1,
      phone2: this.phone2,
      phone3: this.phone3,
      photo: this.photo,
      fatherName: this.fatherName,
      husbandName: this.husbandName
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceFPOMember.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.fpo.network.FPOMember',
      'personID': this.personID.value,
      'name': this.name.value,
      'age': this.age.value,
      'address': this.address.value,
      'isMarried': this.isMarried.value,
      'phone1': this.phone1.value,
      'phone2': this.phone2.value,
      'phone3': this.phone3.value,
      'photo': this.photo.value,
      'fatherName': this.fatherName.value,
      'husbandName': this.husbandName.value
    };

    this.myForm.setValue({
      'personID': null,
      'name': null,
      'age': null,
      'address': null,
      'isMarried': null,
      'phone1': null,
      'phone2': null,
      'phone3': null,
      'photo': null,
      'fatherName': null,
      'husbandName': null
    });

    return this.serviceFPOMember.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'personID': null,
        'name': null,
        'age': null,
        'address': null,
        'isMarried': null,
        'phone1': null,
        'phone2': null,
        'phone3': null,
        'photo': null,
        'fatherName': null,
        'husbandName': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.fpo.network.FPOMember',
      'name': this.name.value,
      'age': this.age.value,
      'address': this.address.value,
      'isMarried': this.isMarried.value,
      'phone1': this.phone1.value,
      'phone2': this.phone2.value,
      'phone3': this.phone3.value,
      'photo': this.photo.value,
      'fatherName': this.fatherName.value,
      'husbandName': this.husbandName.value
    };

    return this.serviceFPOMember.updateParticipant(form.get('personID').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceFPOMember.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceFPOMember.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'personID': null,
        'name': null,
        'age': null,
        'address': null,
        'isMarried': null,
        'phone1': null,
        'phone2': null,
        'phone3': null,
        'photo': null,
        'fatherName': null,
        'husbandName': null
      };

      if (result.personID) {
        formObject.personID = result.personID;
      } else {
        formObject.personID = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.age) {
        formObject.age = result.age;
      } else {
        formObject.age = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
      }

      if (result.isMarried) {
        formObject.isMarried = result.isMarried;
      } else {
        formObject.isMarried = null;
      }

      if (result.phone1) {
        formObject.phone1 = result.phone1;
      } else {
        formObject.phone1 = null;
      }

      if (result.phone2) {
        formObject.phone2 = result.phone2;
      } else {
        formObject.phone2 = null;
      }

      if (result.phone3) {
        formObject.phone3 = result.phone3;
      } else {
        formObject.phone3 = null;
      }

      if (result.photo) {
        formObject.photo = result.photo;
      } else {
        formObject.photo = null;
      }

      if (result.fatherName) {
        formObject.fatherName = result.fatherName;
      } else {
        formObject.fatherName = null;
      }

      if (result.husbandName) {
        formObject.husbandName = result.husbandName;
      } else {
        formObject.husbandName = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'personID': null,
      'name': null,
      'age': null,
      'address': null,
      'isMarried': null,
      'phone1': null,
      'phone2': null,
      'phone3': null,
      'photo': null,
      'fatherName': null,
      'husbandName': null
    });
  }
}
