
import * as React from 'react';
import {useState} from 'react'
import { DataGrid, GridColDef, GridValueGetterParams, GridSelectionModel } from '@mui/x-data-grid';
import { server_calls } from '../../api'; 
import { useGetData } from '../../custom-hooks';
import { Button,Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle } from '@material-ui/core'; 
  import { HeroForm } from '../../components/HeroForm';  

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'comics', headerName: 'Comics', width: 130 },
    { field: 'powers', headerName: 'Powers', width: 130 },
   
    { field: 'date', headerName: 'Date', width: 130 },
   
  ];

  interface gridData{
    data:{
      id?:string;
    }
  }

  

  export const DataTable =  () => {
  
    let { heroData, getData } = useGetData(); 
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])
  
    let handleOpen = () => {
      setOpen(true)
    }
  
    let handleClose = () => {
      setOpen(false)
    }
  
    let deleteData = () => {
      server_calls.delete(`${gridData[0]}`)
      getData()
    }
  
    console.log(gridData) // a list of id's from checked rows
  
      return (
          <div style={{ height: 400, width: '100%' }}>
            <h2>Heroes In Inventory</h2>
            <DataGrid 
                          rows={heroData} 
                          columns={columns} 
                          pageSize={5} 
                          checkboxSelection 
                          onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel);}}
                          {...heroData}  
                      />
  
          <Button onClick={handleOpen}>Update</Button>
          <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
  
            {/*Dialog Pop Up begin */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update A Hero</DialogTitle>
            <DialogContent>
              <DialogContentText>Hero id: {gridData[0]}</DialogContentText>
                <HeroForm id={`${gridData[0]}`}/>
            </DialogContent>
            <DialogActions>
              <Button onClick = {handleClose} color="primary">Cancel</Button>
              <Button onClick={handleClose} color = "primary">Done</Button> 
            </DialogActions>
          </Dialog>
          </div>
        );
  }