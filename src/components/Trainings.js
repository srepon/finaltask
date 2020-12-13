import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Trainings() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }


    const columns = [
        {field: 'date', sortable: true, filter: true, 
        valueFormatter: (params) => moment(params.value).format('MMM Do YYYY, h:mm a')},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {field: 'customer.firstname', sortable: true, filter: true},
        {field: 'customer.lastname', sortable: true, filter: true},
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
        </div>
    )
}

export default Trainings;