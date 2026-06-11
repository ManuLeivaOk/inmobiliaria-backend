"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOpaqueToken = generateOpaqueToken;
exports.hashToken = hashToken;
exports.safeCompare = safeCompare;
const crypto_1 = require("crypto");
function generateOpaqueToken(bytes = 32) {
    return (0, crypto_1.randomBytes)(bytes).toString('base64url');
}
function hashToken(token) {
    return (0, crypto_1.createHash)('sha256').update(token).digest('hex');
}
function safeCompare(a, b) {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
        return false;
    }
    return (0, crypto_1.timingSafeEqual)(bufA, bufB);
}
//# sourceMappingURL=crypto.util.js.map