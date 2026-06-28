export interface ClerkUser {
    userId: string;
    email?: string;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
