var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const request_1 = require("../utils/request");
const util_1 = require("../utils/util");
const constants_1 = require("../utils/constants");
const Service = (headers) => {
    const create = (table, columns) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const headersError = util_1.utils.checkHeaders(headers);
            if (headersError)
                return headersError;
            const [createData, createError] = util_1.utils.createFormat(table, columns);
            if (createError)
                return createError;
            const response = yield request_1.request.post(constants_1.constants.create, createData, {
                headers: Object.assign({}, headers),
            });
            return response.data;
        }
        catch (err) {
            if ((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data)
                return (_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.data;
            return util_1.utils.errorHandler(400, 'error on create', err.message);
        }
    });
    const select = (table, options) => __awaiter(this, void 0, void 0, function* () {
        var _c, _d;
        try {
            const headersError = util_1.utils.checkHeaders(headers);
            if (headersError)
                return headersError;
            const [selectData, selectError] = util_1.utils.selectFormat(table, options);
            if (selectError)
                return selectError;
            const response = yield request_1.request.post(constants_1.constants.select, selectData, {
                headers: Object.assign({}, headers),
            });
            return response.data;
        }
        catch (err) {
            if ((_c = err === null || err === void 0 ? void 0 : err.response) === null || _c === void 0 ? void 0 : _c.data)
                return (_d = err === null || err === void 0 ? void 0 : err.response) === null || _d === void 0 ? void 0 : _d.data;
            return util_1.utils.errorHandler(400, 'error on select', err.message);
        }
    });
    const update = (table, options) => __awaiter(this, void 0, void 0, function* () {
        var _e, _f;
        try {
            const headersError = util_1.utils.checkHeaders(headers);
            if (headersError)
                return headersError;
            const [updateData, updateError] = util_1.utils.updateFormat(table, options);
            if (updateError)
                return updateError;
            const response = yield request_1.request.post(constants_1.constants.update, updateData, {
                headers: Object.assign({}, headers),
            });
            return response.data;
        }
        catch (err) {
            if ((_e = err === null || err === void 0 ? void 0 : err.response) === null || _e === void 0 ? void 0 : _e.data)
                return (_f = err === null || err === void 0 ? void 0 : err.response) === null || _f === void 0 ? void 0 : _f.data;
            return util_1.utils.errorHandler(400, 'error on update', err.message);
        }
    });
    return {
        create,
        select,
        update,
    };
};
exports.Service = Service;
