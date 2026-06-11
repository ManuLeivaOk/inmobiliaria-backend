"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileName = generateFileName;
const crypto_1 = require("crypto");
function generateFileName() {
    return `${Date.now()}-${(0, crypto_1.randomUUID)()}.webp`;
}
//# sourceMappingURL=file-name.util.js.map