var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const axios_1 = __importDefault(require("axios"));
exports.request = axios_1.default.create({
    baseURL: 'http://localhost:30421/project',
    headers: {
        'Content-Type': 'application/json',
    },
});
