import React, { Fragment, useContext, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCard, MDBCardBody, MDBBox, MDBBtn, MDBFormInline } from "mdbreact";
import {Context as MaterialCategoryContext} from '../../../services/Context/MaterialCategoryContext'
import { LinearProgress } from '@material-ui/core';


const ListComponent = () => {
    const {state, ListMaterialCategory, DeleteMaterialCategory} = useContext(MaterialCategoryContext)

    useEffect(() => {
        ListMaterialCategory()
        return () => {
            
        };
    }, []);

    const handleDelete = (id) => {
        DeleteMaterialCategory(id, () => ListMaterialCategory())
    }

    const ListCategory = ({id, name}) => {
        return(
            <MDBCard className='mb-2'>
                <MDBCardBody className='p-1'>
                    <MDBRow>
                        <MDBCol lg="9">
                            <MDBTypography tag='h5' className="pt-2 mx-2"><b>{name}</b></MDBTypography>
                        </MDBCol>
                        <MDBCol lg="3">
                            <MDBRow>
                                <MDBBtn color="danger" size="sm" onClick={() => handleDelete(id)}>Hapus</MDBBtn>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        )   
    }

    return (
        <Fragment>
            {/* {JSON.stringify(state.listMaterialCategory)} */}
            {state.loading && (
                <LinearProgress />
            )}
            {!state.loading && (
                <Fragment>
                    {state.listMaterialCategory.map(item => (
                        <ListCategory name={item.name} id={item.id} />
                    ))}
                </Fragment>
            )}
        </Fragment>
    )
}

export default ListComponent
