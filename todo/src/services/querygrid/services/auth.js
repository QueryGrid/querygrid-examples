var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const isEmail_1 = __importDefault(require("validator/es/lib/isEmail"));
const util_1 = require("../utils/util");
const request_1 = require("../utils/request");
const constants_1 = require("../utils/constants");
const storage_1 = __importDefault(require("../utils/storage"));
const Auth = (headers) => {
    const createWithEmailAndPassword = (email, password) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const errMsg = 'error on create with email and password';
        try {
            const headersError = util_1.utils.checkHeaders(headers);
            if (headersError)
                return headersError;
            if (!(0, isEmail_1.default)(email)) {
                return util_1.utils.errorHandler(400, errMsg, {
                    email: 'invalid email address',
                });
            }
            const data = { email, password };
            const response = yield request_1.request.post(constants_1.constants.createWithEmail, data, {
                headers: Object.assign({}, headers),
            });
            yield storage_1.default.set((_a = response.data) === null || _a === void 0 ? void 0 : _a.data);
            return response.data;
        }
        catch (err) {
            if ((_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.data)
                return (_c = err === null || err === void 0 ? void 0 : err.response) === null || _c === void 0 ? void 0 : _c.data;
            return util_1.utils.errorHandler(400, errMsg, err.message);
        }
    });
    const signInWithEmailAndPassword = (email, password) => __awaiter(this, void 0, void 0, function* () {
        var _d, _e, _f;
        const errMsg = 'error on sign in with email and password';
        try {
            const headersError = util_1.utils.checkHeaders(headers);
            if (headersError)
                return headersError;
            if (!(0, isEmail_1.default)(email)) {
                return util_1.utils.errorHandler(400, errMsg, {
                    email: 'invalid email address',
                });
            }
            const data = { email, password };
            const response = yield request_1.request.post(constants_1.constants.signInWithEmail, data, {
                headers: Object.assign({}, headers),
            });
            yield storage_1.default.set((_d = response.data) === null || _d === void 0 ? void 0 : _d.data);
            return response.data;
        }
        catch (err) {
            if ((_e = err === null || err === void 0 ? void 0 : err.response) === null || _e === void 0 ? void 0 : _e.data)
                return (_f = err === null || err === void 0 ? void 0 : err.response) === null || _f === void 0 ? void 0 : _f.data;
            return util_1.utils.errorHandler(400, errMsg, err.message);
        }
    });
    const currentSignedInUser = () => __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (yield storage_1.default.get());
                resolve({ userID: user === null || user === void 0 ? void 0 : user.userID });
            }
            catch (err) {
                reject(null);
            }
        }));
    });
    const logout = () => {
        storage_1.default.delete();
    };
    return {
        createWithEmailAndPassword,
        signInWithEmailAndPassword,
        currentSignedInUser,
        logout,
    };
};
exports.Auth = Auth;
