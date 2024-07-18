// context/DataContext.js
import React, {createContext, useEffect, useState} from 'react';
import {Service} from "@/api";
import {EditorService} from "@/api/services/API";
import {driver} from "driver.js";

// 创建上下文
export const PageContext = createContext();



export const PageDataProvider = ({ children }) => {
    const [pages, setPages] = useState([]);
    const [selectedChange, setSelectedChange] = useState(0);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openKnowledge, setOpenKnowledge] = useState(false);
    // 获取数据的函数
    const getPage = (user)=>{
        // const user_json = window.localStorage.getItem('user');
        // let user = initialUser;
        // if (user_json !== null) {
        //     user = JSON.parse(user_json);
        // }
        if (user == null || user.id == null) {
            return;
        }
        EditorService.getListUsingPost(user).then(r => {
            const newPages = r.data.data.pages;
            setPages(newPages);
        });
    };

    return (
        <PageContext.Provider value={{ pages, getPage, selectedChange, setSelectedChange, openDrawer, setOpenDrawer, openKnowledge, setOpenKnowledge}}>
            {children}
        </PageContext.Provider>
    );
};

export default PageDataProvider;
