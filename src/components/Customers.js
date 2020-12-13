import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';


function Customers() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getCustomers();
    }, []);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
        .then(response => getCustomers())
        .catch(err => console.error(err))
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                "date": moment(training.date).toISOString(),
                "activity": training.activity,
                "duration": training.duration,
                "customer": training.customer
            })
        })
        .then(response => getCustomers())
        .catch(err => console.error(err))
    }

    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(response => getCustomers())
        .catch(err => console.error(err))
    }

    const deleteCustomer = (params) => {
        if (window.confirm("Are you sure?")) {
            fetch(params.value[0].href, {
                method: 'DELETE'
            })
            .then(_ => getCustomers())
            .then(_ => handleOpen())
            .catch(err => console.error(err))
        }
    }   

    const columns = [
        {
            headerName: '',  
            field: 'links',  
            width: 70,  
            cellRendererFramework: params => 
            <IconButton color="secondary" onClick={() => deleteCustomer(params)}>
                <DeleteIcon fontSize="small" />
          </IconButton>  
          },
          {
            headerName: '',  
            field: 'links',  
            width: 70,  
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params} />
          },
          {
            headerName: '',  
            field: 'links',  
            width: 150,  
            cellRendererFramework: params => <AddTraining addTraining={addTraining} params={params} />
          },
        {headerName: 'First name', field: 'firstname', sortable: true, filter: true},
        {headerName: 'Last name', field: 'lastname', sortable: true, filter: true},
        {headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true},
        {headerName: 'Postal code',field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true}
    ]

    return(
        <div>
            <AddCustomer addCustomer={addCustomer} />

            <div className="ag-theme-material" style={{ height: 700, width: '90%', margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination="true"
                    paginationPageSize="10"
                >
                    
                </AgGridReact>
            </div>
            <Snackbar
               open={open}
               onClose={handleClose}
               autoHideDuration={2500}
               message="Customer deleted successfully" 
            />
        </div>
    )
}

export default Customers;
