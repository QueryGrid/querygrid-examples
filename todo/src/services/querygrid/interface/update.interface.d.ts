export interface Key {
    [key: string]: string;
}
export interface IColumn {
    name: string;
    value: string | number;
}
export interface IUpdate {
    table: string;
    where: Key;
    columns: IColumn[];
}
export interface Update {
    where?: Key;
    columns?: IColumn[];
}
export interface IUpdateError {
    table?: string;
    name?: string;
    columns?: string;
    options?: string;
    where?: string;
}
