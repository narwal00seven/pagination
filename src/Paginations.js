// import React, { useEffect, useState } from "react";
// import Structure from "./Structure";

// export default function Pagination(){
//     const [data,setData] = useState([])
//     let url="https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
//     let fetchupi = async(url) =>{
//         let comedata= await fetch(url);
//         let responecome = await comedata.json();
//         setData(responecome);
//     }
//     useEffect(()=>{
//         fetchupi(url);
//     },[url])
//     return(
//         <>
//         <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//             {data.map((e)=>(
//                  (<Structure id={e.id} name = {e.name} email={e.email} role={e.role} />)
//             ))}
//         </tbody>
//         </table>
//         </>
//     )
// }


import React, { useState, useEffect } from 'react';

export default function Pagination() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setCount(Math.ceil(jsonData.length / pageSize));
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, [pageSize]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < count) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.slice((page - 1) * pageSize, page * pageSize).map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled="">Previous</button>
        <span>{page}</span>
        <button onClick={handleNextPage} disabled={page === count}>Next</button>
      </div>
    </div>
  );
}