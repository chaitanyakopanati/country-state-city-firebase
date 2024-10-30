import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const HomeCountryMaterForm = () => {
    const[country,setCountry]=useState("");
    const[values,setValues]=useState([]);

    useEffect(() => {
      const q = query(collection(db, "countries"));
      // console.log("qqqqqqqqqq")
  
      const unsub = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        querySnapshot.forEach((doc) => {
          todosArray.push({ ...doc.data(), id: doc.id });
        });
        // console.log("todosArray::::::::::::", todosArray);
        setValues(todosArray);
      });
      return () => unsub();
  
    }, []);


    const submitHandler = async (e) => {
      e.preventDefault();
      if (country !== "") {
        await addDoc(collection(db, "countries"), {
          text: country,
        });
        setCountry("");
      }
    }
    
    const handleDelete = async (id) => {
      const userDoc = doc(db, "countries", id);
      await deleteDoc(userDoc)
    }

  return (
    <>
    <div>
      <form onSubmit={submitHandler}>
      <label htmlFor="Country" className="form-label">Country Name</label>&nbsp;
      <input type="text" value={country} placeholder="Enter The Country Name" onChange={(e)=>setCountry(e.target.value.trim())}/>&nbsp;
      <button type="submit">Save</button>
      </form>&nbsp;&nbsp;
    </div>
 
     <table className="table table-striped-columns border border-lightdark">
  <thead  className="thead-dark">
    <tr className='bg-white'>
      <th scope="col">ID</th>
      <th scope="col">Country Name</th>
    </tr>
  </thead>
  <tbody>
  {values.map((use,index)=>(
    use.text&&
    <tr key={index}>
     <th scope='col' >{index+1}</th>
     <td >{use.text}</td> 
     <td onClick={()=>handleDelete(use.id)}>Delete</td>
    </tr> ) )}
  </tbody>
</table>
  </>)
}

export default HomeCountryMaterForm
