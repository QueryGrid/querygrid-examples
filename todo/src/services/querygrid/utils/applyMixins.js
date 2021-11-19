Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMixins = void 0;
const applyMixins = (derivedCtor, baseCtors) => {
    baseCtors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            const baseCtorName = Object.getOwnPropertyDescriptor(baseCtor.prototype, name);
            baseCtorName && Object.defineProperty(derivedCtor.prototype, name, baseCtorName);
        });
    });
};
exports.applyMixins = applyMixins;