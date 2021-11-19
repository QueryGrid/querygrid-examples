declare type DataType = 'number' | 'string';
declare type ValueType = string | number;
export interface ICreate {
    name: string;
    value: ValueType;
    type: DataType;
    unique?: boolean;
    isNull?: boolean;
}
export interface ICreateFormat {
    table: string;
    columns: ICreate[];
}
export interface ICreateError {
    table?: string;
    name?: string;
    columns?: string;
    type?: string;
    unique?: string;
    isNull?: string;
}
export {};
