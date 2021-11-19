import { Project, IResponse, CurrentUser } from '../interface/interface';
export interface Auth {
    createWithEmailAndPassword(email: string, password: string): Promise<IResponse>;
    signInWithEmailAndPassword(email: string, password: string): Promise<IResponse>;
    currentSignedInUser(): Promise<CurrentUser>;
    logout(): void;
}
export declare const Auth: (headers: Project) => Auth;
