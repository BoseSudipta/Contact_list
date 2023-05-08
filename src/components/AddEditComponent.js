import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';

import initialFields from './config';
import { v4 as uuid } from 'uuid';
 function AddEditComponent(props) {
    
    const [isEditFlag, setEditFlag] = useState(false)
    const [fields,setFields] = useState(
        initialFields
    )
   const  [isError, setError] = useState(false)
    useEffect(()=>{
      if(props.isEditFlag){
        setEditFlag(true)
      }
    },[props.isEditFlag])

 useEffect(()=>{
    if(!!isEditFlag){
        let obj ={
            name : props.filterdField.name,
            phone: props.filterdField.phone,
            email: props.filterdField.email,
            id: !!props.filterdField.id?props.filterdField.id:''
        }
        window.$('#exampleModal').modal('show');
    setEditFlag(false)
       setFields(obj)
    }
 },[ !!isEditFlag])

    //save & update
    const _handleSubmit=()=>{
      //validation logic start
      let error = false
      for(let key in fields){
        if(fields[key] === ""){
          error = true
        }
      }
      if(error){
        setError(error)
        error = false
      }
      //validation logic end
      else{
        if(!props.isEditFlag){
          fields.id = uuid()
        }
        axios.post('https://jsonplaceholder.typicode.com/users',{
          
            fields
        })
    .then((response)=>{
        props.parentCallback(fields);
        _closeModal()
    })
    .catch((error)=>{
        // setError(true)
    })
  }
    }

    const _handleChange=(e)=>{
        if(e.target.name === 'email'){
          setFields({...fields,[e.target.name]:e.target.value})
        }else{
          setFields({...fields,[e.target.name]:e.target.value})
        }
    }
    //close Add/Edit Contact Modal
    const _closeModal=()=>{
      setFields(initialFields)
      setError(false)
      props.closeCallBack(true)
      window.$('#exampleModal').modal('hide');
    }

  return (
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">{!!props.isEditFlag?"Edit Contact":"Add title"}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={_closeModal}></button>
          </div>
          <div class="modal-body">
          <input type="hidden" name="_token" value=""/>
                    <div class="mb-3">
                        <div>
                            <input type="text" class="form-control input-lg" name="name" value={fields.name?fields.name:''} placeholder='Name' onChange={(e)=>_handleChange(e)}  />
                            {!!isError && !fields.name && <p class="text-danger">name required</p>}
                        </div>
                    </div>
                    <div class="mb-3">
                        <div>
                            <input type="email" class="form-control input-lg" name="email" value={fields.email?fields.email:''} placeholder='Email' onChange={(e)=>_handleChange(e)} required/>
                            {!!isError && !fields.email && <p class="text-danger">Email required</p>}
                        </div>
                    </div>
                    <div class="mb-3">
                        <div >
                            <input type="text" class="form-control input-lg" name="phone" value={fields.phone?fields.phone:''} placeholder='Phone' onChange={(e)=>_handleChange(e)}  />
                            {!!isError && !fields.phone && <p class="text-danger">Please Enter Valid Phone Number</p>}
                        </div>
                    </div>
                    
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={_closeModal}>Close</button>
            <button type="button" class="btn btn-primary" onClick={_handleSubmit}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default AddEditComponent
