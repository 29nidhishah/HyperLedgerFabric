import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { DonorService } from '../../donor/donor.service';
import { DisplayVal, DonorDoctorViewRecord, DonorViewRecord } from '../../donor/donor';

@Component({
  selector: 'app-donor-list-for-doctor',
  templateUrl: './donor-list-for-doctor.component.html',
  styleUrls: ['./donor-list-for-doctor.component.scss']
})
export class DonorListForDoctorComponent implements OnInit {
  public donorRecordsObs$?: Observable<Array<DonorDoctorViewRecord>>;
  public headerNames = [
    new DisplayVal(DonorViewRecord.prototype.donorId, 'Donor Id'),
    new DisplayVal(DonorViewRecord.prototype.firstName, 'First Name'),
    new DisplayVal(DonorViewRecord.prototype.lastName, 'Last Name')
  ];

  constructor(private readonly donorService: DonorService) { }

  ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.donorRecordsObs$ = this.donorService.fetchAllDonors();
  }
}
