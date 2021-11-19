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
const Storage = () => {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            reject(`Your browser doesn't support IndexedDB`);
            return;
        }
        const request = indexedDB.open('QueryGrid', 1);
        request.onerror = (event) => {
            reject(`Database error: ${event.target}`);
        };
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onupgradeneeded = () => {
            const db = request.result;
            db.createObjectStore('User');
        };
    });
};
const storage = {
    set(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield Storage();
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const txn = db.transaction('User', 'readwrite');
                const store = txn.objectStore('User');
                const query = store.put(data, 1);
                query.onerror = function () {
                    reject(query.error.message);
                };
                txn.oncomplete = function () {
                    db.close();
                };
                query.onsuccess = function () {
                    resolve('success');
                };
            }));
        });
    },
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield Storage();
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const txn = db.transaction('User', 'readonly');
                const store = txn.objectStore('User');
                const query = store.get(1);
                query.onerror = function () {
                    reject(query.error.message);
                };
                txn.oncomplete = function () {
                    db.close();
                };
                query.onsuccess = function () {
                    if (!query.result) {
                        reject('user not found');
                    }
                    else {
                        resolve(query.result);
                    }
                };
            }));
        });
    },
    delete() {
        Storage().then((db) => {
            const txn = db.transaction('User', 'readonly');
            const store = txn.objectStore('User');
            store.delete(1);
            txn.oncomplete = function () {
                db.close();
            };
        });
    },
};
exports.default = storage;
