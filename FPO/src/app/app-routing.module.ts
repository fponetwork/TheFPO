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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { LivestockComponent } from './Livestock/Livestock.component';
import { FarmerAssetComponent } from './FarmerAsset/FarmerAsset.component';
import { LandComponent } from './Land/Land.component';
import { SampleAssetComponent } from './SampleAsset/SampleAsset.component';

import { FarmerComponent } from './Farmer/Farmer.component';
import { FPOMemberComponent } from './FPOMember/FPOMember.component';
import { FPOComponent } from './FPO/FPO.component';
import { SampleParticipantComponent } from './SampleParticipant/SampleParticipant.component';

import { SampleTransactionComponent } from './SampleTransaction/SampleTransaction.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Livestock', component: LivestockComponent },
  { path: 'FarmerAsset', component: FarmerAssetComponent },
  { path: 'Land', component: LandComponent },
  { path: 'SampleAsset', component: SampleAssetComponent },
  { path: 'Farmer', component: FarmerComponent },
  { path: 'FPOMember', component: FPOMemberComponent },
  { path: 'FPO', component: FPOComponent },
  { path: 'SampleParticipant', component: SampleParticipantComponent },
  { path: 'SampleTransaction', component: SampleTransactionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
