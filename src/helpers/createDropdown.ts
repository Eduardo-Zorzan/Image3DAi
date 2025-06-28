import $ from 'jquery'

export const createDrlFiles = async() => {
    const response = await fetch("/api/files", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    const data = await response.json()
    console.log(data, "sadjhsdhsdj")
    if(data && data.files && data.files ) {
        const select : HTMLElement = $("#drlFiles select")[0];
        select.innerHTML = "";
        data.files.forEach((file: string) => {
            const newOption : HTMLOptionElement = document.createElement("option")
            newOption.value, newOption.text = file
            
            select.appendChild(newOption);
        });
    }       
    
}