"use client";

import { useEffect } from "react";
import { createDrlFiles } from '@/helpers/createDropdown';

export const ComboBox = () => {

    useEffect(() => {
        createDrlFiles();
    })

    return (
        <>
            <div id="drlFiles" className="rounded w-full items-center flex bg-gray-200">
                <select className="w-full p-1"></select>
            </div>
        </>
    );
}