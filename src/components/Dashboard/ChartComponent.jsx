import React, { Fragment, useState } from "react";
import { Line } from "react-chartjs-2";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBCardTitle, MDBContainer } from "mdbreact";

const ChartComponent = () => {
    const [chart, setChart] = useState({
        dataLine: {
            labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Des"],
            datasets: [
                {
                    label: "Penjualan",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(184, 185, 210, .3)",
                    borderColor: "rgb(35, 26, 136)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(35, 26, 136)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [28, 48, 40, 19, 86, 27, 90]
                },
                {
                    label: "Pengeluaran",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(225, 204,230, .3)",
                    borderColor: "rgb(205, 130, 158)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(205, 130,1 58)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40]
                },

            ]
        }
    })


    return (
        <Fragment>
            <MDBCard style={{ marginTop: "1rem" }}>
                <MDBCardHeader color="" tag="h3">
                    Statistik Keuangan Tahun {new Date().getFullYear()}
                </MDBCardHeader>
                <MDBCardBody>
                    <Line data={chart.dataLine} options={{ responsive: true }} />
                </MDBCardBody>
            </MDBCard>
        </Fragment>
    )
}
export default ChartComponent


