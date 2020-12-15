import React, { Fragment, useState, useContext, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCard, MDBCardBody, MDBBox, MDBBtn, MDBFormInline, MDBIcon } from "mdbreact";
import { LinearProgress } from '@material-ui/core';
import { Context as ProductContext } from '../../services/Context/ProductContext'
import { withRouter } from 'react-router-dom'
import RiwayatProduksiComponent from '../../components/BahanBaku/RiwayatProduksiComponent';
const ListComponent = (props) => {
    const { state, ListProduct, DeleteProduct } = useContext(ProductContext)
    const [search, setSearch] = useState('')

    useEffect(() => {
        ListProduct()
    }, []);

    const handleSearch = () => {
        if (search === '') {
            alert('Ketikan yg ingin dicari!')
        } else {
            return null
        }
    }
    const handleResetSearch = () => {
        setSearch('')
    }


    const handleDelete = (id) => {
        DeleteProduct(id, () => ListProduct())
        // alert(id)
    }

    const handleEditProduct = (id) => {
        props.history.push(`/EditProduct/${id}`)
    }

    const [Goto, setGoto] = useState(false);
    const [tempData, setTempData] = useState([]);
    const handleGoto = (data) => {
        setGoto(true)
        setTempData(data)
    }
    const ItemProduct = ({ id, name, category }) => (
        <Fragment>
            <MDBCard className='mb-2'>
                <MDBCardBody className='p-1'>
                    <MDBRow>
                        <MDBCol lg="8">
                            <MDBTypography tag='h5' className="pt-2 mx-2"> {name} <small>{category}</small></MDBTypography>
                        </MDBCol>
                        <MDBCol lg="4">
                            <MDBRow>
                                <MDBBtn color="info" size="sm" onClick={() => handleEditProduct(id)}><MDBIcon icon="edit" className="ml-1" /> Edit</MDBBtn>
                                <MDBBtn gradient="peach" size="sm" onClick={() => handleGoto(id)}><MDBIcon icon="cogs" className="ml-1" /> Mode Produksi</MDBBtn>
                                <MDBBtn color="danger" size="sm" onClick={() => handleDelete(id)}><MDBIcon icon="minus-circle" className="ml-1" /> Hapus</MDBBtn>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </Fragment>
    )

    return (
        <Fragment>
            {!Goto && <MDBContainer fluid>
                <MDBBox display="flex" justifyContent="end">
                    <MDBCol md="4">
                        <MDBFormInline className="md-form mr-auto mb-2">
                            <input className="form-control mr-sm-2" type="text" placeholder="Cari Transaksi" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <MDBBtn gradient="aqua" rounded size="sm" className="mr-auto" onClick={handleSearch}>
                                Cari
                            </MDBBtn>
                            {search !== '' && (
                                <MDBBtn color="red" rounded size="sm" className="mr-auto" onClick={handleResetSearch}>
                                    Reset
                                </MDBBtn>
                            )}
                        </MDBFormInline>
                    </MDBCol>
                </MDBBox>
                {state.loading && (
                    <LinearProgress />
                )}
                {state.listProduct.map(item => (
                    <ItemProduct key={item.id} name={item.name} category={item.kategori} id={item.id} />
                ))}

            </MDBContainer>
            }
            {Goto && <RiwayatProduksiComponent userId={tempData} />}
        </Fragment>
    );
}

export default withRouter(ListComponent);
