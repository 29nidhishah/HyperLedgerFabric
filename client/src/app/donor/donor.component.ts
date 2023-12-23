import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { DonorService } from './donor.service';
import { DonorViewRecord } from './donor';
import { AuthService } from '../core/auth/auth.service';
import { RoleEnum } from '../utils';


@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.scss']
})
export class DonorComponent implements OnInit, OnDestroy {
  public donorID: any;
  public donorRecordObs?: Observable<DonorViewRecord>;
  private sub?: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly donorService: DonorService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params
      .subscribe((params: Params) => {
        this.donorID = params.donorId;
        this.refresh();
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public refresh(): void {
    this.donorRecordObs = this.donorService.getDonorByKey(this.donorID);
  }

  public isDonor(): boolean {
    return this.authService.getRole() === RoleEnum.DONOR;
  }

  public isDoctor(): boolean {
    return this.authService.getRole() === RoleEnum.DOCTOR;
  }
}
