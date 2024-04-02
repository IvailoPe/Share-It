import { UserTotalDataInterface } from "./user-interface"

export interface postInterface{
    title:string,
    body:string,
    totalLikes:number,
    createdAt:Date,
    comments:[],
    likes:[string],
    owner: UserTotalDataInterface,
    _id: string,
    __v: number,
    isOwner?: boolean,
}

export interface commentInterface {
    body:string,
    likes:[string],
    owner:UserTotalDataInterface,
    _id:string,
}