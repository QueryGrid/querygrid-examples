import { Project, IResponse } from '../interface/interface';
import { ICreate, ICreateFormat } from '../interface/create.interface';
import { ISelect, Key, Select } from '../interface/select.interface';
import { IUpdate, Update } from '../interface/update.interface';
export declare const utils: {
    sanitize(value: string): string;
    trimSpaces(arg: string): string;
    removeAllSpaces(arg: string): string;
    errorHandler(statusCode: number, message: string, errors: unknown): IResponse;
    checkHeaders(headers: Project): IResponse | null;
    objectCleaner(obj: any): [Key, string | null];
    createFormat(table: string, columns: ICreate[]): [ICreateFormat, IResponse | null];
    selectFormat(table: string, options?: Select): [ISelect, IResponse | null];
    updateFormat(table: string, options: Update): [IUpdate, IResponse | null];
};
