var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const dompurify_1 = __importDefault(require("dompurify"));
const isNumeric_1 = __importDefault(require("validator/es/lib/isNumeric"));
const isBoolean_1 = __importDefault(require("validator/es/lib/isBoolean"));
const constants_1 = require("./constants");
exports.utils = {
    sanitize(value) {
        return dompurify_1.default.sanitize(value);
    },
    trimSpaces(arg) {
        return arg.trim();
    },
    removeAllSpaces(arg) {
        return arg.replace(/\s/g, '');
    },
    errorHandler(statusCode, message, errors) {
        return {
            errors,
            message,
            status: 'error',
            statusCode,
        };
    },
    checkHeaders(headers) {
        const projectID = (headers === null || headers === void 0 ? void 0 : headers.projectID) ? exports.utils.sanitize(exports.utils.trimSpaces(headers === null || headers === void 0 ? void 0 : headers.projectID)) : '';
        const secretKey = (headers === null || headers === void 0 ? void 0 : headers.secretKey) ? exports.utils.sanitize(exports.utils.trimSpaces(headers === null || headers === void 0 ? void 0 : headers.secretKey)) : '';
        if (!projectID && !secretKey) {
            const msg = 'project credentials are missing';
            return exports.utils.errorHandler(403, msg, msg);
        }
        return null;
    },
    objectCleaner(obj) {
        let errors = null;
        const entries = Object.entries(obj);
        const keys = {};
        entries === null || entries === void 0 ? void 0 : entries.forEach((entry) => {
            const key = exports.utils.sanitize(exports.utils.trimSpaces(entry[0])) || '';
            const value = exports.utils.sanitize(exports.utils.trimSpaces(String(entry[1]))) || '';
            if (key.length < 2) {
                errors = 'where clause can not be empty';
            }
            keys[key] = value;
        });
        return [keys, errors];
    },
    createFormat(table, columns) {
        const errors = {};
        const tableName = exports.utils.sanitize(exports.utils.trimSpaces(table).toLowerCase()) || '';
        const createData = {
            table: tableName,
            columns: [],
        };
        if ((tableName === null || tableName === void 0 ? void 0 : tableName.length) < 2) {
            errors.table = constants_1.tableError;
        }
        if (!Array.isArray(columns)) {
            errors.columns = 'columns is missing';
        }
        else {
            for (const column of columns) {
                const columnName = (column === null || column === void 0 ? void 0 : column.name) ? exports.utils.sanitize(exports.utils.trimSpaces(column === null || column === void 0 ? void 0 : column.name).toLowerCase()) : '';
                if ((0, isNumeric_1.default)(column.value.toString())) {
                    column.value = +column.value;
                }
                else {
                    column.value = (column === null || column === void 0 ? void 0 : column.value) ? exports.utils.sanitize(exports.utils.trimSpaces(column === null || column === void 0 ? void 0 : column.value.toString())) : '';
                }
                if (column.type !== 'number' && column.type !== 'string') {
                    errors.type = 'type should be a number or string';
                }
                if ((column === null || column === void 0 ? void 0 : column.isNull) && !(0, isBoolean_1.default)(String(column.isNull))) {
                    errors.isNull = 'isNull should be a boolean';
                }
                if ((column === null || column === void 0 ? void 0 : column.unique) && !(0, isBoolean_1.default)(String(column.unique))) {
                    errors.unique = 'unique should be a boolean';
                }
                if ((columnName === null || columnName === void 0 ? void 0 : columnName.length) < 2) {
                    errors.name = 'name should be at least 2 characters long';
                }
                column.name = columnName;
                createData.columns.push(column);
            }
        }
        if (Object.keys(errors).length) {
            return [createData, exports.utils.errorHandler(400, 'error on create', errors)];
        }
        return [createData, null];
    },
    selectFormat(table, options) {
        var _a;
        const errors = {};
        const tableName = exports.utils.sanitize(exports.utils.trimSpaces(table).toLowerCase()) || '';
        const selectData = {
            table: tableName,
            select: [],
        };
        if ((tableName === null || tableName === void 0 ? void 0 : tableName.length) < 2) {
            errors.table = constants_1.tableError;
        }
        if ((options && typeof options !== 'object') || (options && Array.isArray(options))) {
            errors.options = 'invalid options';
        }
        if (options === null || options === void 0 ? void 0 : options.where) {
            if (typeof (options === null || options === void 0 ? void 0 : options.where) !== 'object' || Array.isArray(options === null || options === void 0 ? void 0 : options.where)) {
                errors.where = 'invalid where parameter';
            }
            else {
                const [keys, err] = (options === null || options === void 0 ? void 0 : options.where) && exports.utils.objectCleaner(options === null || options === void 0 ? void 0 : options.where);
                if (err)
                    errors.where = err;
                selectData.where = keys;
            }
        }
        if ((options === null || options === void 0 ? void 0 : options.select) && !Array.isArray(options === null || options === void 0 ? void 0 : options.select)) {
            errors.select = 'select should be an array';
        }
        else {
            selectData.select =
                ((_a = options === null || options === void 0 ? void 0 : options.select) === null || _a === void 0 ? void 0 : _a.map((column) => {
                    const columnName = exports.utils.sanitize(exports.utils.trimSpaces(column).toLowerCase()) || '';
                    if ((columnName === null || columnName === void 0 ? void 0 : columnName.length) < 2) {
                        errors.select = 'select should be at least 2 characters long';
                    }
                    return columnName;
                })) || [];
        }
        if (Object.keys(errors).length) {
            return [selectData, exports.utils.errorHandler(400, 'error on select', errors)];
        }
        return [selectData, null];
    },
    updateFormat(table, options) {
        const errors = {};
        const tableName = exports.utils.sanitize(exports.utils.trimSpaces(table).toLowerCase()) || '';
        const updateData = {
            table: tableName,
            where: {},
            columns: [],
        };
        if ((tableName === null || tableName === void 0 ? void 0 : tableName.length) < 2) {
            errors.table = constants_1.tableError;
        }
        if (typeof options !== 'object' || Array.isArray(options)) {
            errors.options = 'invalid options';
        }
        if (typeof (options === null || options === void 0 ? void 0 : options.where) !== 'object' || Array.isArray(options === null || options === void 0 ? void 0 : options.where)) {
            errors.where = 'invalid where parameter';
        }
        else {
            const [keys, err] = (options === null || options === void 0 ? void 0 : options.where) && exports.utils.objectCleaner(options === null || options === void 0 ? void 0 : options.where);
            if (err)
                errors.where = err;
            updateData.where = keys;
        }
        if (!Array.isArray(options === null || options === void 0 ? void 0 : options.columns)) {
            errors.columns = 'columns should be an array';
        }
        else {
            for (const column of options === null || options === void 0 ? void 0 : options.columns) {
                const columnName = (column === null || column === void 0 ? void 0 : column.name) ? exports.utils.sanitize(exports.utils.trimSpaces(column === null || column === void 0 ? void 0 : column.name).toLowerCase()) : '';
                if ((0, isNumeric_1.default)(column.value.toString())) {
                    column.value = +column.value;
                }
                else {
                    column.value = (column === null || column === void 0 ? void 0 : column.value) ? exports.utils.sanitize(exports.utils.trimSpaces(column === null || column === void 0 ? void 0 : column.value.toString())) : '';
                }
                if ((columnName === null || columnName === void 0 ? void 0 : columnName.length) < 2) {
                    errors.name = 'name should be at least 2 characters long';
                }
                column.name = columnName;
                updateData.columns.push(column);
            }
        }
        if (Object.keys(errors).length) {
            return [updateData, exports.utils.errorHandler(400, 'error on update', errors)];
        }
        return [updateData, null];
    },
};
