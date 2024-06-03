/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Page= {
    /**
     * content
     */
    content?: string;
    /**
     * title
     */
    title?: string;
    /**
     * createDate
     */
    createDate?: string;
    /**
     * id
     */
    id?: number;
    /**
     * isDelete
     */
    isDelete?: string;
    /**
     * isInBin
     */
    isInBin?: number;
    /**
     * updateDate
     */
    updateDate?: string;
    /**
     * userId
     */
    userId?: number;
};

export type User = {
    createTime: string,
    gender: number|undefined,
    id: number|undefined,
    isVip: number|undefined,
    updateTime: string,
    userAccount: string,
    userAvatar: string,
    userName: string,
    userPassword: string,
    userRole: string
};

export type UserUpateParams = {
    gender: number|undefined,
    id: number|undefined,
    userAvatar: string,
    userName: string,
};


