"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regValidation = (options) => {
    var _a, _b;
    if (options.username.length <= 3) {
        return;
        [
            {
                field: 'Username',
                message: 'username must be longer than 3 characters.'
            }
        ];
    }
    if (!((_a = options.email) === null || _a === void 0 ? void 0 : _a.includes("@"))) {
        return [
            {
                field: 'email',
                message: 'email format is invalid.'
            }
        ];
    }
    if (!((_b = options.username) === null || _b === void 0 ? void 0 : _b.includes("@"))) {
        return [
            {
                field: 'username',
                message: 'username cannot contain an "@".'
            }
        ];
    }
    if (options.password.length <= 6) {
        return [
            {
                field: 'Password',
                message: 'password must be longer than 6 characters.'
            }
        ];
    }
    return [];
};
exports.default = regValidation;
//# sourceMappingURL=regValidation.js.map