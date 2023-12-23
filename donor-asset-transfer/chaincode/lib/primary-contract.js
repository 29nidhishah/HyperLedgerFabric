/**
 * @desc [Primary Smartcontract to initiate ledger with donor details]
 */
/*
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

const { Contract } = require('fabric-contract-api');
let Donor = require('./Donor.js');
let initDonors = require('./initLedger.json');

class PrimaryContract extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        for (let i = 0; i < initDonors.length; i++) {
            initDonors[i].docType = 'donor';
            await ctx.stub.putState('PID' + i, Buffer.from(JSON.stringify(initDonors[i])));
            console.info('Added <--> ', initDonors[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    //Read donor's details based on donorId
    async readDonor(ctx, donorId) {
        const exists = await this.donorExists(ctx, donorId);
        if (!exists) {
            throw new Error(`The donor ${donorId} does not exist`);
        }
    
        const buffer = await ctx.stub.getState(donorId);
        let asset = JSON.parse(buffer.toString());
        /*asset = ({
            donorId: donorId,
            aadhar: aadhar,
            firstName: asset.firstName,
            lastName: asset.lastName,
            dob: asset.dob,
            phoneNumber: asset.phoneNumber,
            emergPhoneNumber: asset.emergPhoneNumber,
            address: asset.address,
            bloodGroup: asset.bloodGroup,
            ailments: asset.ailments,
            password: asset.password,
            pwdTemp: asset.pwdTemp,
            donationStatus: asset.donationStatus, 
            donationHistory: asset.donationHistory, 
            creditCard: asset.creditCard
        });*/
        return asset;
    }
    
    //Check if a donor exists against a donor id
    async donorExists(ctx, donorId) {
        const buffer = await ctx.stub.getState(donorId);
        return (!!buffer && buffer.length > 0);
    }

    async getAllDonorResults(iterator) {
        let allResults = [];
        while (true) {
            let res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                console.log(res.value.value.toString('utf8'));

                jsonRes.Key = res.value.key;

                try {
                    jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Record = res.value.value.toString('utf8');
                }
                allResults.push(jsonRes);
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return allResults;
            }
        }
    }
}
module.exports = PrimaryContract;
