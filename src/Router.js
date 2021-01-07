import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AccountantRoute from './services/Route/AccountantRoute';
import AdminRoute from './services/Route/AdminRoute';
import PrivateRoute from './services/Route/PrivateRoute';
import Layout from './components/layouts/Layout';
import Signin from './pages/Authentication/Signin';
import Home from './pages/Home/Home';
import Test from './pages/Test';
import TransaksiCabang from './pages/Transaksi/Cabang/TransaksiCabang';
import TransaksiPusat from './pages/Transaksi/Pusat/TransaksiPusat';
import ReviewTransaksiKeluar from './pages/Transaksi/Pengeluaran/ReviewPengeluaran';
import ReviewTransaksi from './pages/Transaksi/ReviewPemasukan';
import GeneratePDF from './pages/GenereatePDF/App';
import JurnalPerHari from './pages/Jurnal/JurnalPerhari';
import BukuBesar from './pages/BukuBesar/BukuBesar';
import LaporanKeuangan from './pages/Jurnal/JurnalLaporanKeuangan';
import MarketingRoute from './services/Route/MarketingRoute';
import TransaksiMasuk from './pages/Transaksi/Pusat/TransaksiMasuk';
import JurnalPerBulan from './pages/Jurnal/JurnalPerBulan';
import TransaksiKeluar from './pages/Transaksi/Pengeluaran/TransaksiKeluar';
import ListTransaksiKeluar from './pages/Transaksi/Pengeluaran/ListTransaksiKeluar';
import NeracaSaldo from './pages/BukuBesar/NeracaSaldo';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/test' exact component={Test} />
                <Route path='/signin' exact component={Signin} />
                <Layout>
                    <PrivateRoute path='/' exact component={Home} />
                    <MarketingRoute path='/transaksi-masuk' exact component={TransaksiMasuk} />
                    <PrivateRoute path='/list-transaksi-pusat' exact component={TransaksiPusat} />
                    <PrivateRoute path='/list-transaksi-cabang' exact component={TransaksiCabang} />
                    <PrivateRoute path='/review-transaksi-keluar/:id' exact component={ReviewTransaksiKeluar} />
                    <PrivateRoute path='/review-transaksi-masuk/:id' exact component={ReviewTransaksi} />
                    <AdminRoute path='/transaksi-keluar' exact component={TransaksiKeluar} />
                    <AccountantRoute path='/list-pengeluaran' exact component={ListTransaksiKeluar} />
                    <AccountantRoute path='/jurnal-perhari/:tanggal' exact component={JurnalPerHari} />
                    <AccountantRoute path='/jurnal-perbulan/' exact component={JurnalPerBulan} />
                    <AccountantRoute path='/buku-besar' exact component={BukuBesar} />
                    <AccountantRoute path='/neraca-saldo' exact component={NeracaSaldo} />
                    <AccountantRoute path='/laporan-keuangan' exact component={LaporanKeuangan} />
                    <PrivateRoute path='/generate-invoice-income' exact component={GeneratePDF} />
                    <AdminRoute path='/list-pengeluaran-admin' exact component={ListTransaksiKeluar} />
                </Layout>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
