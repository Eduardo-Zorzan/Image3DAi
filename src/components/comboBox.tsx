"use client";

import { useEffect } from "react";
import { createDrlFiles } from '@/helpers/createDropdown';

export const ComboBox = () => {

    useEffect(() => {
        createDrlFiles();
    })

    return (
        <div>
            <div id="drlFiles" className="bg-white w-md rounded">
                <select className="w-md text-black"></select>
            </div>
        </div>
    );
}