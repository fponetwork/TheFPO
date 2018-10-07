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
import { LandService } from './Land.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-land',
  templateUrl: './Land.component.html',
  styleUrls: ['./Land.component.css'],
  providers: [LandService]
})
export class LandComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  landID = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  IrrigationSource = new FormControl('', Validators.required);
  pumpType = new FormControl('', Validators.required);
  acreage = new FormControl('', Validators.required);
  survey = new FormControl('', Validators.required);
  farmer = new FormControl('', Validators.required);

  constructor(public serviceLand: LandService, fb: FormBuilder) {
    this.myForm = fb.group({
      landID: this.landID,
      type: this.type,
      IrrigationSource: this.IrrigationSource,
      pumpType: this.pumpType,
      acreage: this.acreage,
      survey: this.survey,
      farmer: this.farmer
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceLand.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.fpo.network.Land',
      'landID': this.landID.value,
      'type': this.type.value,
      'IrrigationSource': this.IrrigationSource.value,
      'pumpType': this.pumpType.value,
      'acreage': this.acreage.value,
      'survey': this.survey.value,
      'farmer': this.farmer.value
    };

    this.myForm.setValue({
      'landID': null,
      'type': null,
      'IrrigationSource': null,
      'pumpType': null,
      'acreage': null,
      'survey': null,
      'farmer': null
    });

    return this.serviceLand.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'landID': null,
        'type': null,
        'IrrigationSource': null,
        'pumpType': null,
        'acreage': null,
        'survey': null,
        'farmer': null
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


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.fpo.network.Land',
      'type': this.type.value,
      'IrrigationSource': this.IrrigationSource.value,
      'pumpType': this.pumpType.value,
      'acreage': this.acreage.value,
      'survey': this.survey.value,
      'farmer': this.farmer.value
    };

    return this.serviceLand.updateAsset(form.get('landID').value, this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceLand.deleteAsset(this.currentId)
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

    return this.serviceLand.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'landID': null,
        'type': null,
        'IrrigationSource': null,
        'pumpType': null,
        'acreage': null,
        'survey': null,
        'farmer': null
      };

      if (result.landID) {
        formObject.landID = result.landID;
      } else {
        formObject.landID = null;
      }

      if (result.type) {
        formObject.type = result.type;
      } else {
        formObject.type = null;
      }

      if (result.IrrigationSource) {
        formObject.IrrigationSource = result.IrrigationSource;
      } else {
        formObject.IrrigationSource = null;
      }

      if (result.pumpType) {
        formObject.pumpType = result.pumpType;
      } else {
        formObject.pumpType = null;
      }

      if (result.acreage) {
        formObject.acreage = result.acreage;
      } else {
        formObject.acreage = null;
      }

      if (result.survey) {
        formObject.survey = result.survey;
      } else {
        formObject.survey = null;
      }

      if (result.farmer) {
        formObject.farmer = result.farmer;
      } else {
        formObject.farmer = null;
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
      'landID': null,
      'type': null,
      'IrrigationSource': null,
      'pumpType': null,
      'acreage': null,
      'survey': null,
      'farmer': null
      });
  }

}
