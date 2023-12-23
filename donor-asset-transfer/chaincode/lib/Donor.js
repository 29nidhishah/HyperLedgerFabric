/**
 * @desc [The base donor class]
 */
/*
 * SPDX-License-Identifier: Apache-2.0
 */

const crypto = require('crypto');

class Donor {

    constructor(donorId, aadhar, firstName, lastName, password, dob, phoneNumber, emergPhoneNumber, address, bloodGroup,
        ailments, donationStatus = '-', donationHistory = {}, creditCard=0)
    {
        this.aadhar=aadhar;
        this.donorId = donorId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = crypto.createHash('sha256').update(password).digest('hex');
        this.dob = dob;
        this.phoneNumber = phoneNumber;
        this.emergPhoneNumber = emergPhoneNumber;
        this.address = address;
        this.bloodGroup = bloodGroup;
        this.ailments = ailments;
        this.donationStatus = donationStatus;
        this.donationHistory=donationHistory;
        this.creditCard=creditCard;
        this.pwdTemp = true;
        return this;
    }
}
module.exports = Donor
