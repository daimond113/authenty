export function login(loginOptions: {
    MongoDB_URL: string;
    username: string;
    password: string;
    mongooseConnectionOptions: any;
    CollectionName: string;
}): Promise<boolean>;
export function register(loginOptions: {
    MongoDB_URL: string;
    username: string;
    password: string;
    mongooseConnectionOptions: any;
    CollectionName: string;
}): Promise<boolean>;
