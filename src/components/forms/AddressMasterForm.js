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


const AddressMasterForm = () => {
    const[pin,setPin]=useState("");
    const[values,setValues]=useState([]);
    const[countryValues,setcountryValues]=useState([]);
    const[stateDataValues,setStateDataValues]=useState([]);
    const[addressData,setAddressData]=useState([]);
    const[statevalues,setStateValues]=useState([]);
    const[cityValues,setCityValues]=useState([]);
    const[pinValues,setPinValues]=useState([]);
    const [countryId, setCountryId] =useState(0)
    const [stateId, setStateId] =useState(0)
    const [cityId, setCityId] =useState(0)

    // console.log("valuesss",values,statevalues,cityValues,pinValues)
    useEffect(() => {
      const q = query(collection(db, "countries"));
      // console.log("qqqqqqqqqq")
  
      const unsub = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        querySnapshot.forEach((doc) => {
          todosArray.push({ ...doc.data(), id: doc.id });
        });
        // console.log("todosArray::::::::::::", todosArray);
        setcountryValues(todosArray);
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
        setStateDataValues(todosArray);
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
        console.log("todosArray::::::::::::", todosArray);
        setValues(todosArray);
      });
      return () => unsub();
  
    }, []);
    useEffect(() => {
      const q = query(collection(db, "address"));
      // console.log("qqqqqqqqqq")
  
      const unsub = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        querySnapshot.forEach((doc) => {
          todosArray.push({ ...doc.data(), id: doc.id });
        });
        // console.log("todosArray::::::::::::", todosArray);
        setAddressData(todosArray);
      });
      return () => unsub();
  
    }, []);


    const submitHandler = async (e) => {
      e.preventDefault();
      if (pin !== "") {
        await addDoc(collection(db, "address"), {
          text:statevalues,country_id:countryId,textState:cityValues,
          state_id:stateId,city_id:cityId,city:pinValues,pincode:pin,
        });
        setPin("");
      }
      else{
        if(pin?.length <= 6){
               alert("pincode should be maintain below 6 digits")
           }
         }
    }
    const handleChangeCountry =(e)=>{
      console.log("0000mmm",e.target.value);
console.log("111bhb",stateDataValues);
const abc = stateDataValues.filter((data)=> data.country_id== e.target.value)
setStateDataValues(abc)
console.log("abc",abc);

        console.log(JSON.stringify(e.target.value))
         var countryDetails =e.target.value;
         console.log(countryDetails)
      
       setCountryId(e.target.value)
       var result = countryValues.filter(country => country.country_id == e.target.value)
       setStateValues(result[0].text)

       console.log(result)
    }
    const handleChangeState =(e)=>{
      // console.log("0000mmm1",e.target.value);
      // console.log("111bhb1",values);
      // const abc = values.filter((data)=> data.id == e.target.value)
      // setValues(abc)
      // console.log("abc1",abc);
        console.log(JSON.stringify(e.target.value))
         var stateDetails =e.target.value;
         console.log(stateDetails)
    
            setStateId(e.target.value)
            var result = stateDataValues.filter(state => state.country_id == e.target.value)
            setCityValues(result[0].textState)
    
            console.log(result)}

            const handleChangeCity =(e)=>{
                console.log(JSON.stringify(e.target.value))
                 var cityDetails =e.target.value;
                 console.log(cityDetails)
            
                 setCityId(e.target.value)
                    var result = values.filter(city => city.id == e.target.value)
                    setPinValues(result[0].city)
            
                    console.log(result)}
       
       const handleDelete = async (id) => {
        const userDoc = doc(db, "address", id);
        await deleteDoc(userDoc)
      }

  return (
    <>
    <div>
      <form onSubmit={submitHandler}>
      <label htmlFor="Country" className="form-label">Select Country</label>
      <select className="form-control text-align:center form-label w-50 form-group col-md-3 mx-auto mb-3  " onChange={handleChangeCountry}>
                   <option type="others" >Select a Country</option>
                   {countryValues?.length>0 && countryValues.map(item =>{
                       return(item.text&&<option   key={item.country_id} value={item.country_id} >
                       {item.text}
                       </option>)
                   })}
               </select>
               <label htmlFor="State" className="form-label">Select State</label>
                    <select className="form-control text-align:center form-label w-50 form-group col-md-3 mx-auto mb-3" onChange={handleChangeState}>
                        <option type="others" >Select a State</option>
                        {stateDataValues?.length>0 && stateDataValues.map(item =>{
                            return(item.textState&&<option key={item.id} value={item.country_id}>
                            {item.textState}
                            </option>)
                        })}
                    </select>
                    <label htmlFor="State" className="form-label">Select City</label>
                    <select className="form-control text-align:center form-label w-50 form-group col-md-3 mx-auto mb-3" onChange={handleChangeCity}>
                        <option type="others" >Select a City</option>
                        {values?.length>0 && values.map(item =>{
                            return(item.city&&<option key={item.id} value={item.id}>
                            {item.city}
                            </option>)
                        })}
                    </select>
      <label htmlFor="PinCode" className="form-label">PinCode</label>&nbsp;
      <input type="number" value={pin} placeholder="Enter The PinCode" onChange={(e)=>setPin(e.target.value.trim())}/>&nbsp;
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
      <th scope="col">PinCode</th>
    </tr>
  </thead>
  <tbody>
  {addressData?.length>0 && addressData.map((use,index)=>(
    use.pincode&&
    <tr key={index}>
     <th scope='col' >{index+1}</th>
     <td> {use.text}</td>
     <td >{use.textState}</td>
     <td >{use.city}</td> 
     <td >{use.pincode}</td>  
     <td onClick={()=>handleDelete(use.id)}>Delete</td>
    </tr> ) )}
  </tbody>
</table>
  </>)
}

export default AddressMasterForm
