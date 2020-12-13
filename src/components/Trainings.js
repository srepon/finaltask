import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Trainings() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getTrainings();
    }, []);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (params) => {
        console.log(params);
	if (window.confirm("Are you sure?")) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + params.value, {
                method: 'DELETE'
            })
            .then(_ => getTrainings())
            .then(_ => handleOpen())
            .catch(err => console.error(err))
        }
    }   

    const columns = [
        {field: 'date', sortable: true, filter: true, 
        valueFormatter: (params) => moment(params.value).format('MMM Do YYYY, h:mm a')},
        {field: 'duration', width: 120, sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {field: 'customer.firstname', sortable: true, filter: true},
        {field: 'customer.lastname', sortable: true, filter: true},
        {
          headerName: '',  
          field: 'id',  
          width: 90,  
          cellRendererFramework: params => 
          <IconButton color="secondary" onClick={() => deleteTraining(params)}>
              <DeleteIcon fontSize="small" />
        </IconButton>  
        }
    ]

    return(
        <div>
            <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
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
               message="Trainings deleted successfully" 
            />
        </div>
    )
}

export default Trainings;