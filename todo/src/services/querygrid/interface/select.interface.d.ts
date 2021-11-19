export interface Key {
    [key: string]: string;
}
export interface ISelect {
    table: string;
    where?: Key;
    select?: string[];
}
export interface Select {
    where?: Key;
    select?: string[];
}
export interface ISelectError {
    table?: string;
    select?: string;
    options?: string;
    where?: string;
}
