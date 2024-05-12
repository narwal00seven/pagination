import React from "react";
export default function Structure({id,name,email,role}){
    return(
        <>
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
        </tr>
        </>
    )
}