export interface Lobby {
    id:string,
    usuarios: Array<{name:string, id:string}>;
    full:boolean;
}