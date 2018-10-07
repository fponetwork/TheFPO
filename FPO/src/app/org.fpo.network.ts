import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.fpo.network{
   export enum LivestockType {
      COW,
      BUFFALO,
      BULL,
      SHEEP,
      GOAT,
      POULTRY,
   }
   export enum PumpType {
   }
   export enum LandType {
      WET,
      DRY,
      GARDEN,
      FALLOW,
      KITCHEN,
   }
   export enum IrrigationSource {
      BORE,
      OPEN_WELL,
      TANK,
      RAIN_FED,
   }
   export enum FarmerAssetType {
      WEEDER,
      TILLER,
      TRACTOR,
   }
   export class Livestock extends Asset {
      livestockID: string;
      type: LivestockType;
      count: number;
      farmer: Farmer;
   }
   export class FarmerAsset extends Asset {
      farmerAssetID: string;
      type: FarmerAssetType;
      count: number;
      farmer: Farmer;
   }
   export class Land extends Asset {
      landID: string;
      type: LandType;
      IrrigationSource: IrrigationSource;
      pumpType: PumpType;
      acreage: number;
      survey: LandSurvey;
      farmer: Farmer;
   }
   export class BankAccount {
      bankID: string;
      name: string;
      branch: string;
      accountNumber: string;
      ifscCode: string;
   }
   export class LandSurvey {
      zone: string;
      sro: string;
      village: string;
      surveyNumber: string;
   }
   export class FarmerGroup {
      groupName: string;
      address: Address;
   }
   export class Occupation {
      main: string;
      secondary: string;
   }
   export class Income {
      main: string;
      secondary: string;
   }
   export class Address {
      city: string;
      country: string;
      street: string;
      zip: string;
   }
   export abstract class Person extends Participant {
      personID: string;
      name: string;
      age: number;
      address: Address;
      isMarried: boolean;
      phone1: string;
      phone2: string;
      phone3: string;
      photo: string;
      fatherName: string;
      husbandName: string;
   }
   export abstract class Business extends Participant {
      businessID: string;
      name: string;
      address: Address;
   }
   export class Farmer extends Person {
      caste: string;
      religion: string;
      occupation: Occupation;
      income: Income;
      bankAccount: BankAccount;
   }
   export class FPOMember extends Person {
   }
   export class FPO extends Business {
   }
   export class SampleParticipant extends Participant {
      participantId: string;
      firstName: string;
      lastName: string;
   }
   export class SampleAsset extends Asset {
      assetId: string;
      owner: SampleParticipant;
      value: string;
   }
   export class SampleTransaction extends Transaction {
      asset: SampleAsset;
      newValue: string;
   }
   export class SampleEvent extends Event {
      asset: SampleAsset;
      oldValue: string;
      newValue: string;
   }
// }
