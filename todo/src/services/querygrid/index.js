Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./services/auth");
const service_1 = require("./services/service");
const QueryGrid = (project) => {
    return {
        auth: (0, auth_1.Auth)(project),
        service: (0, service_1.Service)(project),
    };
};
exports.default = QueryGrid;
