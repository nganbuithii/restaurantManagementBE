"use strict";
exports.__esModule = true;
exports.firebaseAdminProvider = void 0;
var admin = require("firebase-admin");
exports.firebaseAdminProvider = {
    provide: 'FIREBASE_ADMIN',
    useFactory: function () {
        var _a;
        var defaultApp = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.PROJECT_ID,
                clientEmail: process.env.CLIENT_EMAIL,
                privateKey: (_a = process.env.PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, '\n')
            })
        });
        return { defaultApp: defaultApp };
    }
};
