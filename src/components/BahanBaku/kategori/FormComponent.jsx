import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBBox } from 'mdbreact';
import {Context as MaterialCategoryContext} from '../../../services/Context/MaterialCategoryContext'

const FormComponent = () => {
    const {state, AddMaterialCategory, ListMaterialCategory} = useContext(MaterialCategoryContext)
    const [value, setValue] = useState('')

    const handleSave = () => {
        let data = {
            name: value
        }
        AddMaterialCategory(data, () => ListMaterialCategory())
    }

    return (
        <div>
            <h4>Informasi Kategori Bahan Baku</h4>
            <hr/>
            {/* {JSON.stringify(value)} */}
            <MDBCard className='mb-2'>
                <MDBCardBody className='p-1'>
                    <MDBRow className='m-3'>
                        <MDBCol lg="7">
                            <TextField fullWidth label="Nama Bahan Baku" variant="outlined" margin="normal" onChange={(e) => setValue(e.target.value)} />
                        </MDBCol>
                        <MDBCol lg="5">
                            <MDBRow className='mt-3 mb-2'>
                                <MDBCol lg="12">
                                    <MDBBox  justifyContent='between'>
                                        <MDBBtn color="dark-green" disabled={state.loading} onClick={handleSave}>
                                            Simpan Bahan Baku
                                        </MDBBtn>
                                    </MDBBox>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default FormComponent;

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 220,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));