export interface Project {
    projectID: string;
    secretKey: string;
}
export interface IResponse {
    errors?: unknown;
    name?: string;
    message: string;
    status: 'success' | 'error';
    statusCode: number;
    data?: unknown;
}
export interface CurrentUser {
    userID: string;
}
