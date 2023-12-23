export interface Timestamp {
  nanos: number;
  seconds: ISeconds;
}

export interface ISeconds {
  high: number;
  low: number;
  unsigned: boolean;
}

export interface DonorRecord {
  donorId: string;
  firstName: string;
  lastName: string;
  address: string;
  age: number;
  emergPhoneNumber: string;
  phoneNumber: string;
  bloodGroup: string;
  allergies: boolean;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  followUp: string;
  docType: string;
  changedBy: string;
  Timestamp: Timestamp;
}

/*export interface ResRecord {
  Key: string;
  Record: DonorRecord;
}*/

export class DonorViewRecord {
  donorId = '';
  firstName = '';
  lastName = '';
  address = '';
  age = 0;
  emergPhoneNumber = '';
  phoneNumber = '';
  bloodGroup = '';
  allergies = false;
  symptoms = '';
  diagnosis = '';
  treatment = '';
  followUp = '';
  docType = '';
  changedBy = '';
  Timestamp = '';

  constructor(readonly donorRecord: DonorRecord) {
    this.donorId = donorRecord.donorId;
    this.firstName = donorRecord.firstName;
    this.lastName = donorRecord.lastName;
    this.address = donorRecord.address;
    this.age = donorRecord.age;
    this.emergPhoneNumber = donorRecord.emergPhoneNumber;
    this.phoneNumber = donorRecord.phoneNumber;
    this.bloodGroup = donorRecord.bloodGroup;
    this.allergies = donorRecord.allergies;
    this.symptoms = donorRecord.symptoms;
    this.diagnosis = donorRecord.diagnosis;
    this.treatment = donorRecord.treatment;
    this.followUp = donorRecord.followUp;
    this.docType = donorRecord.docType;
    this.changedBy = donorRecord.changedBy;
    this.Timestamp = donorRecord.Timestamp ? new Date(donorRecord.Timestamp.seconds.low * 1000).toDateString() : '';
  }
}

export class DonorAdminViewRecord {
  donorId = '';
  firstName = '';
  lastName = '';
  docType = '';
  emergPhoneNumber = '';
  phoneNumber = '';

  constructor(readonly donorRecord: DonorRecord) {
    this.donorId = donorRecord.donorId;
    this.firstName = donorRecord.firstName;
    this.lastName = donorRecord.lastName;
    this.docType = donorRecord.docType;
    this.emergPhoneNumber = donorRecord.emergPhoneNumber;
    this.phoneNumber = donorRecord.phoneNumber;
  }
}

export class DonorDoctorViewRecord {
  donorId = '';
  firstName = '';
  lastName = '';
  bloodGroup = '';
  allergies = false;
  symptoms = '';
  diagnosis = '';
  treatment = '';
  followUp = '';

  constructor(readonly donorRecord: DonorRecord) {
    this.donorId = donorRecord.donorId;
    this.firstName = donorRecord.firstName;
    this.lastName = donorRecord.lastName;
    this.bloodGroup = donorRecord.bloodGroup;
    this.allergies = donorRecord.allergies;
    this.symptoms = donorRecord.symptoms;
    this.diagnosis = donorRecord.diagnosis;
    this.treatment = donorRecord.treatment;
    this.followUp = donorRecord.followUp;
  }
}

export class DisplayVal {
  keyName: string | number | boolean;
  displayName: string;

  constructor(key: string | number | boolean, value: string) {
    this.keyName = key;
    this.displayName = value;
  }
}
