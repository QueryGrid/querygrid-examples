declare const storage: {
    set(data: unknown): Promise<unknown>;
    get(): Promise<unknown>;
    delete(): void;
};
export default storage;
