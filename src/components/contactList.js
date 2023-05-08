import React from 'react';
import axios from 'axios';
import { useEffect,useMemo,useState} from 'react';
import DataTable,{ createTheme} from 'react-data-table-component';
import FilterComponent from "./FilterComponent.js";
import { Link } from "react-router-dom";
import AddEditComponent from './AddEditComponent.js';
function ContactList() {
    //table columns for data table 
    const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
          },
        {
          name: 'Phone',
          selector: 'phone',
          sortable: true,
        },
        {
          name: 'Email',
          selector: 'email',
          sortable: true,
        },{
            cell: (rowData) => (
                <Link to="#" onClick={(e)=>handleButtonClick(rowData)}><span class="material-symbols-outlined" >edit</span>
            </Link>)
        ,
        button: true,
            ignoreRowClick: true,
            allowOverflow: true
        },
        {
            cell: (rowData) => (
                <Link to="#" onClick={(e)=>handleDeleteClick(rowData.id)}><span class="material-symbols-outlined" >delete</span>
            </Link>)
        ,
        button: true,
            ignoreRowClick: true,
            allowOverflow: true
        },
      ];
    const [fields,setFields] = useState([])
    const [filterdField, setFilterField] = useState({})
    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [isEditFlag,setEditFlag] = useState(false)
    const [isUpdateField, setUpdateField] = useState(false)
    const _filteredItems =()=>{ 
        return fields.filter( item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	);
    }
    useEffect(()=>{
        //to create theme in datatable
        createTheme('dark', {
            text: {
                primary: '#268bd2',
                secondary: '#2aa198',
              },
            background: {
              default: '#002b36',
            },
            divider: {
                default: '#073642',
              },
              action: {
                button: 'rgba(0,0,0,.54)',
                hover: 'rgba(0,0,0,.08)',
                disabled: 'rgba(0,0,0,.12)',
              }
          });
          
          
        getContactList()
    },[])
    useEffect(()=>{
        if(!!isUpdateField){
            _filteredItems();
            setUpdateField(false)
        }
    },[isUpdateField])

    // customize the react style
    const customStyles = {
        rows: {
            style: {
                minHeight: '50px', // override the row height

            },
        },
        headCells: {
            style: {
                paddingLeft: '20px', // override the cell padding for head cells
                paddingRight: '2px',
                paddingTop:'20px',
               
            },
        },
        cells: {
            style: {
                paddingLeft: '20px', // override the cell padding for data cells
                paddingRight: '2px',
                color: "white",
                
            },
        },
        columns:{
            style:{
                border: '2px'
            }
        }
    };
 //get api endpoint fot contacts
const getContactList =()=>{
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response)=>{
        setFields(response.data)
    })
    .catch((error)=>{
       window.alert('Error')
    })
}
// to delete contact 
const handleDeleteClick =(id)=>{
    let filterdData = fields.filter((item)=>item.id !== id)
    setFields(filterdData)
  
}
//function for edit functionality
const handleButtonClick = (data) => {
    let id = data.id;
    let filterdData = fields.filter((item)=>item.id === id)
    setEditFlag(true)
    setFilterField(filterdData[0])
};
//save or update for contact
const handleCallback = (val) =>{
    let tempFields = fields
    if(!!isEditFlag){
        fields.forEach((element,key)=>{
            if(element.id === val.id){
                element['name'] = val.name
                element['email'] = val.email
                element['phone'] = val.phone
            }
        })
        tempFields = fields
    }else{
        tempFields.push(val)
    }
    setUpdateField(true)
    setFields(tempFields)
}
//to close add contact modal 
const _closeModal =()=>{
    setFilterField({})
    setEditFlag(false)
}
//for filter functionality 
const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        addFlag={true}
      />
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <React.Fragment>
    <div class="container-lg ">
    <div class="page-header">
            <h2>Contact List</h2>
    </div>
        <DataTable
            columns={columns}
            data={_filteredItems()}
            pagination
            theme="dark"
            highlightOnHover
            customStyles={customStyles}
            subHeader
            subHeaderComponent={subHeaderComponent}
        />
        <AddEditComponent
            isEditFlag={isEditFlag}
            parentCallback={handleCallback}
            filterdField={filterdField}
            closeCallBack={_closeModal}
        />
    </div>
    </React.Fragment>
  )
}

export default ContactList