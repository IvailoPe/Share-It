import { UserTotalDataInterface } from "./user-interface"

export interface friendSignalInterface{
    navigate:string,
    id:string
}

export interface chatModel{
    message: string,
    messageOwner: string,
    content?:string,
    date?: string,
    _id?: string
}

export interface notificationModel{
    friendRequests: UserTotalDataInterface[],
    liked: {
        postId:string,
        personId:UserTotalDataInterface,
        notification?:string,
        _id:string
    }[],
    comments: {
        postId:string,
        personId:UserTotalDataInterface,
        notification?:string,
        _id:string
    }[]
}

export interface notificationSubModel{
    postId:string,
    personId:UserTotalDataInterface,
    notification?:string
    _id:string
}