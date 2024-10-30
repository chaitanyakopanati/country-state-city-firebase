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
import {NavLink,Link} from 'react-router-dom';

const Navbar = () => {
  const [status, setStatus] = useState(false);
  const [status1, setStatus1] = useState(false);
  const [status2, setStatus2] = useState(false);
  const[values,setValues]=useState([]);
  const[stateData,setStateData]=useState([]);
  const[cityData,setCityData]=useState([]);
  
    
    useEffect(() => {
      const q = query(collection(db, "countries"));
      // console.log("qqqqqqqqqq",q)
  
      const unsub = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        querySnapshot.forEach((doc) => {
          todosArray.push({ ...doc.data(), id: doc.id });
        });
        //  console.log("todosArray::::::::::::", todosArray);
        setValues(todosArray);
      });
      return () => unsub();
  
    }, []);
    useEffect(() => {
      const q = query(collection(db, "states"));
      // console.log("qqqqqqqqqq",q)
  
      const unsub = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        querySnapshot.forEach((doc) => {
          todosArray.push({ ...doc.data(), id: doc.id });
        });
        //  console.log("todosArray1::::::::::::", todosArray);
         setStateData(todosArray);
      });
      return () => unsub();
  
    }, []);
    useEffect(() => {
      const q = query(collection(db, "cities"));
      // console.log("qqqqqqqqqq",q)
  
      const unsub = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        querySnapshot.forEach((doc) => {
          todosArray.push({ ...doc.data(), id: doc.id });
        });
        //  console.log("todosArray1::::::::::::", todosArray);
         setCityData(todosArray);
      });
      return () => unsub();
  
    }, []);

    useEffect(()=>{
 for(let i=0;i<values.length;i++){
  // console.log("objectttvaluesssss",values[i])
  if(values[i]?.text||values[i]?.textcountry){
  setStatus(true)
}else{
  setStatus(false)
}
 }
  },[values])
  useEffect(()=>{
    for(let i=0;i<stateData.length;i++){
    //  console.log("objectttvaluesssss",stateData[i])
   if(stateData[i]?.textState  ){
     setStatus1(true)
   }else{
     setStatus1(false)
   }
    }
     },[stateData])
     useEffect(()=>{
      for(let i=0;i<cityData.length;i++){
      //  console.log("objectttvaluesssss",cityData[i])
       if(cityData[i]?.city){
        setStatus2(true)
      }else{
        setStatus2(false)
      }
      }
       },[cityData])

  return (
    
        <nav className="navbar navbar-expand-lg navbar-dark text-white bg-dark">
            <div className='container'>
  <a className="navbar-brand" href="#">
    React Forms User
  </a>
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse " id="navbarSupportedContent" >
    <ul className="navbar-nav mr-auto">
      <NavLink id="RouterNavLink"  to="/homeCountryMaterForm" className="text-white m-2">  Countries-Master </NavLink>
      {status?(<NavLink id="RouterNavLink"  to="/stateMaterForm" className="text-white m-2">  States-Master </NavLink>):""}
      
      {status1?(<NavLink id="RouterNavLink"  to="/cityMasterForm" className="text-white m-2">  Cities-Master </NavLink> ):"" }
      {status2?(<NavLink id="RouterNavLink"  to="/addressMasterForm" className="text-white m-2"> Address-Master </NavLink>):""} 
    </ul>
  </div>
  </div>
</nav> )
}


export default Navbar;