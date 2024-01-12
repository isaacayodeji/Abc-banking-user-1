import { State } from "./state";

export namespace Payload {
    export class Auth {
        key: keyof State.Auth;
        value: any;
        constructor(key: keyof State.Auth, value: any) {
            this.key = key;
            this.value = value
        }
    }
    
    export class Global{
        key: keyof State.Page
        value: any
        constructor( key: keyof State.Page, value: any){
            this.key = key
            this.value = value
        }
    }
}