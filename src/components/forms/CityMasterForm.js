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

const CityMasterForm = () => {
    const[city,setCity]=useState("");
    const[values,setValues]=useState([]);
    const[values1,setValues1]=useState([]);
    const[cityData,setCityData]=useState([]);
    const[statevalues,setStateValues]=useState([]);
    const[cityValues,setCityValues]=useState([]);
    const [countryId, setCountryId] =useState(0)
    const [stateId, setStateId] =useState(0)

    // console.log("valuesss",values,statevalues,cityValues)
    useEffect(() => {
      const q = query(collection(db, "countries"));
      // console.log("qqqqqqqqqq")
  
      const unsub = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        querySnapshot.forEach((doc) => {
          todosArray.push({ ...doc.data(), id: doc.id });
        });
        // console.log("todosArray::::::::::::", todosArray);
        setValues1(todosArray);
      });
      return () => unsub();
  
    }, []);

    useEffect(() => {
      const q = query(collection(db, "states"));
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

    useEffect(() => {
      const q = query(collection(db, "cities"));
      // console.log("qqqqqqqqqq")
  
      const unsub = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        querySnapshot.forEach((doc) => {
          todosArray.push({ ...doc.data(), id: doc.id });
        });
        // console.log("todosArray::::::::::::", todosArray);
        setCityData(todosArray);
      });
      return () => unsub();
  
    }, []);


    const submitHandler = async (e) => {
      e.preventDefault();
      if (city !== "") {
        await addDoc(collection(db, "cities"), {
          text:statevalues,city:city,country_id:countryId,textState:cityValues,state_id:stateId,
        });
        setCity("");
        
      }
    }
    const handleChangeCountry =(e)=>{
console.log("0000mmm",e.target.value);
let value=e.target.value
console.log("111bhb",values);
const abc = values.filter((data)=> data.country_id== e.target.value)
setValues(abc)
console.log("abc",abc);

        console.log(JSON.stringify(e.target.value))
        // var result = values.filter(state => state.id == e.target.value)
         var countryDetails =e.target.value;
         console.log(countryDetails)
       setCountryId(e.target.value)
       console.log("111111",values);
       var result = values.filter(country => country.country_id == e.target.value)
        setStateValues(result[0].text)

      //  var result = values.filter(state => state.textcountry == e.target.value)
      //  console.log("111");
      //  console.log("object",result)

       console.log("resultssss",result)
       setValues(result)
    }
    const handleChangeState =(e)=>{
      console.log("0000mmm1",e.target.value);
console.log("111bhb1",values);
const abc = values.filter((data)=> data.country_id == e.target.value)
setValues(abc)
console.log("abc",abc);
        console.log(JSON.stringify(e.target.value))
         var stateDetails =e.target.value;
         console.log(stateDetails)
    
            setStateId(e.target.value)
            var result = values.filter(state => state.country_id== e.target.value)
            console.log("object",result)
            // setValues(result)
            setCityValues(result[0].textState)
    
            console.log(result)}
       
       const handleDelete = async (id) => {
        const userDoc = doc(db, "cities", id);
        await deleteDoc(userDoc)
      }

  return (
    <>
    <div>
      <form onSubmit={submitHandler}>
      <label htmlFor="Country" className="form-label">Select Country</label>
      <select className="form-control text-align:center form-label w-50 form-group col-md-3 mx-auto mb-3  " onChange={handleChangeCountry}>
                   <option type="others" >Select a Country</option>
                   {values1?.length>0 && values1.map(item =>{
                       return(item.text&&<option   key={item.id} value={item.id} >
                       {item.text}
                       </option>)
                   })}
               </select>
               <label htmlFor="State" className="form-label">Select State</label>
                    <select className="form-control text-align:center form-label w-50 form-group col-md-3 mx-auto mb-3" onChange={handleChangeState}>
                        <option type="others" >Select a State</option>
                        {values?.length>0 && values.map(item =>{
                            return(item.textState&&<option key={item.country_id} value={item.country_id}>
                            {item.textState}
                            </option>)
                        })}
                    </select>
      <label htmlFor="city" className="form-label">City Name</label>&nbsp;
      <input type="text" value={city} placeholder="Enter The City Name" onChange={(e)=>setCity(e.target.value.trim())}/>&nbsp;
      <button type="submit">Save</button>
      </form>&nbsp;&nbsp;
    </div>
 
     <table className="table table-striped-columns border border-lightdark">
  <thead  className="thead-dark">
    <tr className='bg-white'>
      <th scope="col">ID</th>
      <th scope="col">Country Name</th>
      <th scope="col">State Name</th>
      <th scope="col">City Name</th>
    </tr>
  </thead>
  <tbody>
  {cityData?.length>0 && cityData.map((use,index)=>( 
    use.city&&
    <tr key={index}>
     <th scope='col' >{index+1}</th>
     <td> {use.text}</td>
     <td >{use.textState}</td>
     <td >{use.city}</td>  
     <td onClick={()=>handleDelete(use.id)}>Delete</td>
    </tr> ) )}
  </tbody>
</table>
  </>)
}

export default CityMasterForm
