import React, { Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCard } from "mdbreact";

const Test = () => {
  return (
    <div>
            <MDBTypography tag='h2'><b>Transaksi Pusat</b></MDBTypography>
            <MDBContainer className="mt-3" fluid>
                <MDBRow lg='3' md='6' className='mb-lg-0 mb-4'>
                    <MDBCol color='red'>One of three columns</MDBCol>
                    <MDBCol>One of three columns</MDBCol>
                    <MDBCol>One of three columns</MDBCol>
                    <MDBCol>One of three columns</MDBCol>
                    <MDBCol>One of three columns</MDBCol>
                    <MDBCol>One of three columns</MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol lg='3' md='6' className='mb-lg-0 mb-4'>
                        <MDBCard cascade narrow ecommerce color-block-dark danger-color-dark z-depth-2> 
                            <img src="https://mdbootstrap.com/img/Others/documentation/1.jpg" className="img-fluid" alt="" />
                        </MDBCard>    
                    </MDBCol>
                    <MDBCol lg='3' md='6' className='mb-lg-0 mb-4'>
                        <MDBCard cascade narrow ecommerce>
                            <img src="https://mdbootstrap.com/img/Others/documentation/1.jpg" className="img-fluid" alt="" />
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg='3' md='6' className='mb-lg-0 mb-4'>
                        <MDBCard cascade narrow ecommerce>
                            <img src="https://mdbootstrap.com/img/Others/documentation/1.jpg" className="img-fluid" alt="" />
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg='3' md='6' className='mb-lg-0 mb-4'>
                        <MDBCard cascade narrow ecommerce>
                            <img src="https://mdbootstrap.com/img/Others/documentation/1.jpg" className="img-fluid" alt="" />
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg='3' md='6' className='mb-lg-0 mb-4 mt-4'>
                        <MDBCard cascade narrow ecommerce>
                            <img src="https://mdbootstrap.com/img/Others/documentation/1.jpg" className="img-fluid" alt="" />
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
  );
}

export default Test;