import React, {Fragment, useEffect, useState} from "react";
import { Line } from "react-chartjs-2";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBCardTitle, MDBContainer } from "mdbreact";

const ChartComponent = ({data}) => {
    const [test, setTest] = useState({
        nama: 'iqbal',
        alamat: 'tanggulun'
    })
    const [chart, setChart] = useState({
        dataLine: {
            labels: data.grafik?data.grafik.labels:[],
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
                    data: data.grafik?data.grafik.incomes:[]
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
                    data: data.grafik?data.grafik.outcomes:[]
                },
              
            ]
        }
    })

    useEffect(()=>{
        console.log('data = here = ',data);
    },[])
    return(
        <Fragment>
            <MDBCard style={{  marginTop: "1rem" }}> 
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


// class ChartsPage extends React.Component {
//   state = {
//     dataLine: {
//       labels: ["January", "February", "March", "April", "May", "June", "July"],
//       datasets: [
//         {
//           label: "My First dataset",
//           fill: true,
//           lineTension: 0.3,
//           backgroundColor: "rgba(225, 204,230, .3)",
//           borderColor: "rgb(205, 130, 158)",
//           borderCapStyle: "butt",
//           borderDash: [],
//           borderDashOffset: 0.0,
//           borderJoinStyle: "miter",
//           pointBorderColor: "rgb(205, 130,1 58)",
//           pointBackgroundColor: "rgb(255, 255, 255)",
//           pointBorderWidth: 10,
//           pointHoverRadius: 5,
//           pointHoverBackgroundColor: "rgb(0, 0, 0)",
//           pointHoverBorderColor: "rgba(220, 220, 220,1)",
//           pointHoverBorderWidth: 2,
//           pointRadius: 1,
//           pointHitRadius: 10,
//           data: [65, 59, 80, 81, 56, 55, 40]
//         },
//         {
//           label: "My Second dataset",
//           fill: true,
//           lineTension: 0.3,
//           backgroundColor: "rgba(184, 185, 210, .3)",
//           borderColor: "rgb(35, 26, 136)",
//           borderCapStyle: "butt",
//           borderDash: [],
//           borderDashOffset: 0.0,
//           borderJoinStyle: "miter",
//           pointBorderColor: "rgb(35, 26, 136)",
//           pointBackgroundColor: "rgb(255, 255, 255)",
//           pointBorderWidth: 10,
//           pointHoverRadius: 5,
//           pointHoverBackgroundColor: "rgb(0, 0, 0)",
//           pointHoverBorderColor: "rgba(220, 220, 220, 1)",
//           pointHoverBorderWidth: 2,
//           pointRadius: 1,
//           pointHitRadius: 10,
//           data: [28, 48, 40, 19, 86, 27, 90]
//         }
//       ]
//     }
//   };

//   render() {
//     return (
//       <MDBContainer>
//         <h3 className="mt-5">Line chart</h3>
//         <Line data={this.state.dataLine} options={{ responsive: true }} />
//       </MDBContainer>
//     );
//   }
// }

// export default ChartsPage;