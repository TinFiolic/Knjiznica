export class User {
    password : string;
    username : string;
    permission : number;

    constructor(password: string, username: string, permission: number){
        this.password = password;
        this.username = username;
        this.permission = permission;
    }
}