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

const StateMasterForm = () => {
    const[state,setState]=useState("");
    const[values,setValues]=useState([]);
    const[stateData,setStateData]=useState([]);
    const[statevalues,setStateValues]=useState([]);
    const [countryId, setCountryId] =useState(0)

    console.log("valuesss",values,statevalues)
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

    console.log("valuesss1",stateData,values,statevalues)
    useEffect(() => {
      const q = query(collection(db, "states"));
      // console.log("qqqqqqqqqq")
  
      const unsub = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        querySnapshot.forEach((doc) => {
          todosArray.push({ ...doc.data(), id: doc.id });
        });
        // console.log("todosArray::::::::::::", todosArray);
        setStateData(todosArray);
      });
      return () => unsub();
  
    }, []);


    const submitHandler1 = async (e) => {
      e.preventDefault();
      if (state !== "") {
        await addDoc(collection(db, "states"), {
            text:statevalues,textState: state,country_id:countryId,
        });
        setState("");
      }
    }
    const handleChangeCountry =(e)=>{
        console.log(JSON.stringify(e.target.value))
         var countryDetails =e.target.value;
         console.log(countryDetails)
      
       setCountryId(e.target.value)
       var result = values.filter(country => country.id == e.target.value)
       setStateValues(result[0].text)

       console.log(result)}

       const handleDelete = async (id) => {
        const userDoc = doc(db, "states", id);
        await deleteDoc(userDoc)
      }

  return (
    <>
    <div>
      <form onSubmit={submitHandler1}>
      <label htmlFor="Country" className="form-label">Select Country</label>
      <select className="form-control text-align:center form-label w-50 form-group col-md-3 mx-auto mb-3  " onChange={handleChangeCountry}>
                   <option type="others" >Select a Country</option>
                   {values?.length>0 && values.map(item =>{
                       return( item.text&&<option   key={item.id} value={item.id} >
                       {item.text}
                       </option>)
                   })}
               </select>
      <label htmlFor="state" className="form-label">State Name</label>&nbsp;
      <input type="text" value={state} placeholder="Enter The State Name" onChange={(e)=>setState(e.target.value.trim())}/>&nbsp;
      <button type="submit">Save</button>
      </form>&nbsp;&nbsp;
    </div>
 
     <table className="table table-striped-columns border border-lightdark">
  <thead  className="thead-dark">
    <tr className='bg-white'>
      <th scope="col">ID</th>
      <th scope="col">Country Name</th>
      <th scope="col">State Name</th>
    </tr>
  </thead>
  <tbody>
  {stateData?.length>0 &&stateData.map((use,index)=>(
    use.textState&&
    <tr key={index}>
     <th scope='col' >{index+1}</th>
     <td> {use.text}</td>
     <td >{use.textState}</td> 
     <td onClick={()=>handleDelete(use.id)}>Delete</td>
    </tr> ) )}
  </tbody>
</table>
  </>)
}

export default StateMasterForm
