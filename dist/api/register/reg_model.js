"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: String
    },
    mobile: {
        type: String
    },
    profilePic: {
        data: String,
        contentType: String
    },
    password: {
        type: String
    },
    rePassword: {
        type: String
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.model('Register', schema);
