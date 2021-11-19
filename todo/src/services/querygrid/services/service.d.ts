import { IResponse, Project } from '../interface/interface';
import { ICreate } from '../interface/create.interface';
import { Select } from '../interface/select.interface';
import { Update } from '../interface/update.interface';
export interface Service {
    create(table: string, data: ICreate[]): Promise<IResponse>;
    select(table: string, options?: Select): Promise<IResponse>;
    update(table: string, options: Update): Promise<IResponse>;
}
export declare const Service: (headers: Project) => Service;
