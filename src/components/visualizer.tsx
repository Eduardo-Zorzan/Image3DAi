"use client";

import { permanentRedirect } from "next/navigation";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComboBox } from "./comboBox";
import $ from "jquery";

export const Visualizer = () => {

    const redirectToVisualizer = () => {
        const select : HTMLSelectElement = $("#drlFiles select")[0] as HTMLSelectElement;

        if (select && select.selectedOptions.length > 0) {name
            const optionSelected = select.selectedOptions[0];
            permanentRedirect(`/3D?fileName=${optionSelected.value}`);
        }
    }


    return (
        <div className="w-full flex gap-2 items-center">
            <ComboBox />
            <a 
                className="w-xs inline-flex justify-center items-center p-1 border border-transparent text-sm font-medium 
                rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={redirectToVisualizer}>
                    <FontAwesomeIcon icon={faCube} />
                <p className="ml-2 text-center">Open Ambient</p>
            </a>
        </div>
    );
}