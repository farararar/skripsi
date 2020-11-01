import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import AccountantRoute from './services/Route/AccountantRoute';
import AdminRoute from './services/Route/AdminRoute';
import PrivateRoute from './services/Route/PrivateRoute';
import Layout from './components/layouts/Layout';
import Signin from './pages/Authentication/Signin';
import Home from './pages/Home/Home';
import Test from './pages/Test';
import TransaksiCabang from './pages/Transaksi/Cabang/TransaksiCabang';
import TransaksiPusat from './pages/Transaksi/Pusat/TransaksiPusat';
import ReviewTransaksi from './pages/Transaksi/ReviewTransaksi';
import JurnalPerHari from './pages/Jurnal/JurnalPerhari';
import BukuBesar from './pages/BukuBesar/BukuBesar';
import MarketingRoute from './services/Route/MarketingRoute';
import TransaksiMasuk from './pages/Transaksi/Pusat/TransaksiMasuk';
import JurnalPerBulan from './pages/Jurnal/JurnalPerBulan';
import TransaksiKeluar from './pages/Transaksi/Pengeluaran/TransaksiKeluar';
import ListTransaksiKeluar from './pages/Transaksi/Pengeluaran/ListTransaksiKeluar';
import AddProduct from './pages/Product/AddProduct';
import ListProduct from './pages/Product/ListProduct';
import StockOpname from './pages/Product/StokOpname';
import ProccessProduct from './pages/Product/ProccessProduct';
import AddBahanBaku from './pages/BahanBaku/AddBahanBaku';
import KategoriBahanBaku from './pages/BahanBaku/KategoriBahanBaku';
import ListBahanBaku from './pages/BahanBaku/ListBahanBaku';
import EditProduct from './pages/Product/EditProduct';


const Router = () => {
    return (
        <BrowserRouter>
                <Switch>
                    <Route path='/test' exact component={Test} />
                    <Route path='/signin' exact component={Signin} />
                    <Layout>
                        <PrivateRoute path='/' exact component={Home} />
                        <MarketingRoute path='/transaksi-masuk' exact component={TransaksiMasuk}/>
                        <PrivateRoute path='/list-transaksi-pusat' exact component={TransaksiPusat} />
                        <PrivateRoute path='/list-transaksi-cabang' exact component={TransaksiCabang} />
                        <PrivateRoute path='/review-transaksi/:id' exact component={ReviewTransaksi} />
                        <AdminRoute path='/transaksi-keluar' exact component={TransaksiKeluar} />
                        <AccountantRoute path='/list-pengeluaran' exact component={ListTransaksiKeluar} />
                        <AccountantRoute path='/jurnal-perhari/:tanggal' exact component={JurnalPerHari} />
                        <AccountantRoute path='/jurnal-perbulan/' exact component={JurnalPerBulan} /> 
                        <AccountantRoute path='/buku-besar' exact component={BukuBesar} />
                        <AdminRoute path='/AddProduct' exact component={AddProduct} />
                        <AdminRoute path='/EditProduct/:id' exact component={EditProduct} />
                        <AdminRoute path='/ProductList' exact component={ListProduct} />
                        <AdminRoute path='/StockOpname' exact component={StockOpname} />
                        <AdminRoute path='/ProductInProccess' exact component={ProccessProduct} />
                        <AdminRoute path='/AddRawMaterial' exact component={AddBahanBaku} />
                        <AdminRoute path='/RawMaterialCategories' exact component={KategoriBahanBaku} />
                        <AdminRoute path='/RawMaterialList' exact component={ListBahanBaku} />
                    </Layout>
                </Switch>
        </BrowserRouter>
    );
}

export default Router;
