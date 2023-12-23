/**
 * @desc [Admin Smartcontract to create, read donor details in legder]
 */
/*
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

let Donor = require('./Donor.js');
const PrimaryContract = require('./primary-contract.js');

class AdminContract extends PrimaryContract {
    
    //Create donor in the ledger
    async createDonor(ctx, args) {
        args = JSON.parse(args);

        if (args.password === null || args.password === '') {
            throw new Error(`Empty or null values should not be passed for password parameter`);
        }

        let newDonor = await new Donor(args.newDonorId, args.aadhar, args.firstName, args.lastName, args.password, args.dob,
            args.phoneNumber, args.emergPhoneNumber, args.address, args.bloodGroup,args.ailments);
        
        const exists = await this.donorExists(ctx, newDonor.donorId);
        if (exists) {
            throw new Error(`The donor ${newDonor.donorId} already exists`);
        }

        const buffer = Buffer.from(JSON.stringify(newDonor));
        await ctx.stub.putState(newDonor.donorId, buffer);
    }

    //Read donor's limited details based on donorId
    async readDonor(ctx, donorId) {
        let asset = await super.readDonor(ctx, donorId)

        asset = ({
            donorId: donorId,
            firstName: asset.firstName,
            lastName: asset.lastName,
            phoneNumber: asset.phoneNumber,
            emergPhoneNumber: asset.emergPhoneNumber,
            address: asset.address
        });
        return asset;
    }

    //Retrieves all donors' name and id
    async queryAllDonors(ctx) {
        let resultsIterator = await ctx.stub.getStateByRange('', '');
        let asset = await this.getAllDonorResults(resultsIterator);

        return this.fetchNamesAndId(asset);
    }

    fetchLimitedFields = asset => {
        for (let i = 0; i < asset.length; i++) {
            const obj = asset[i];
            asset[i] = {
                donorId: obj.Key,
                firstName: obj.Record.firstName,
                lastName: obj.Record.lastName,
                phoneNumber: obj.Record.phoneNumber,
                emergPhoneNumber: obj.Record.emergPhoneNumber,
                address: obj.Record.address
            };
        }

        return asset;
    }

    fetchNamesAndId = asset => {
        for (let i = 0; i < asset.length; i++) {
            const obj = asset[i];
            asset[i] = {
                donorId: obj.Key,
                firstName: obj.Record.firstName,
                lastName: obj.Record.lastName,
            };
        }
        return asset;
    }
    
}
module.exports = AdminContract;
