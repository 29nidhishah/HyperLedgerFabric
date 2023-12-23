/**
 * @desc [Donor Smartcontract to read and update donor details in legder]
 */
/*
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

let Donor = require('./Donor.js');
const crypto = require('crypto');
const PrimaryContract = require('./primary-contract.js');
const { Context } = require('fabric-contract-api');

class DonorContract extends PrimaryContract {

    //Read donor details based on donorId
    async readDonor(ctx, donorId) {
        return await super.readDonor(ctx, donorId);
    }

    //This function is to update donor's limited details. This function should be called by donor.
    async updateDonorPersonalDetails(ctx, args) {
        args = JSON.parse(args);
        let isDataChanged = false;
        let donorId = args.donorId;
        let newPhoneNumber = args.phoneNumber;
        let newEmergPhoneNumber = args.emergPhoneNumber;
        let newAddress = args.address;
        
        const donor = await this.readDonor(ctx, donorId)

        if (newPhoneNumber !== null && newPhoneNumber !== '' && donor.phoneNumber !== newPhoneNumber) {
            donor.phoneNumber = newPhoneNumber;
            isDataChanged = true;
        }

        if (newEmergPhoneNumber !== null && newEmergPhoneNumber !== '' && donor.emergPhoneNumber !== newEmergPhoneNumber) {
            donor.emergPhoneNumber = newEmergPhoneNumber;
            isDataChanged = true;
        }

        if (newAddress !== null && newAddress !== '' && donor.address !== newAddress) {
            donor.address = newAddress;
            isDataChanged = true;
        }

        if (isDataChanged === false) 
        return;

        const buffer = Buffer.from(JSON.stringify(donor));
        await ctx.stub.putState(donorId, buffer);
    }

    //This function is to update donor's password. This function should be called by donor.
    async updateDonorPassword(ctx, args) {
        args = JSON.parse(args);
        let donorId = args.donorId;
        let newPassword = args.newPassword;

        if (newPassword === null || newPassword === '') {
            throw new Error(`Empty or null values should not be passed for newPassword parameter`);
        }

        const donor = await this.readDonor(ctx, donorId);
        donor.password = crypto.createHash('sha256').update(newPassword).digest('hex');
        if(donor.pwdTemp){
            donor.pwdTemp = false;
        }
        const buffer = Buffer.from(JSON.stringify(donor));
        await ctx.stub.putState(donorId, buffer);
    }

    //Returns the donor's password
    async getDonorPassword(ctx, donorId) {
        let donor = await this.readDonor(ctx, donorId);
        donor = ({
            password: donor.password,
            pwdTemp: donor.pwdTemp})
        return donor;
    }

    //Retrieves donor's donation history based on donorId
    async getDonorHistory(ctx, donorId) {
        let resultsIterator = await ctx.stub.getHistoryForKey(donorId);
        let asset = await this.getAllDonorResults(resultsIterator);

        return this.fetchLimitedFields(asset);
    }

    fetchLimitedFields = (asset) => {
        for (let i = 0; i < asset.length; i++) {
            const obj = asset[i];
            asset[i] = {
                donationHistory: obj.Record.donationHistory
            };
        }
        return asset;
    };s
}
module.exports = DonorContract;
