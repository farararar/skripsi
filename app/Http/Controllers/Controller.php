<?php

namespace App\Http\Controllers;

use App\Model\Income;
use App\Model\Journal;
use App\Model\Outcome;
use App\Model\StockBahan;
use App\Model\StockOpname;
use Illuminate\Support\Facades\View;
use Laravel\Lumen\Routing\Controller as BaseController;
use Barryvdh\DomPDF\Facade as PDF;

class Controller extends BaseController
{

    public function dashboard()
    {
        $year = date('Y');
        $month = date('m');
        $labels = array();
        $incomes = array();
        $outcomes = array();
        for ($i=0; $i < 6; $i++) { 
            $labels[] = date('F', strtotime($year.'-'.$month.'-01'))." ".$year;
            $incomes[] = Income::where('date', 'LIKE', $year.'-'.$month.'%')->count();
            $outcomes[] = Outcome::where('date', 'LIKE', $year.'-'.$month.'%')->count();
            $month--;
            if($month == 0) {
                $month = 12;
                $year--;
            }
            if(strlen($month) == 1) {
                $month = "0".$month;
            }
        }
        $total_pemasukan = Income::sum('ammount');
        $total_pengeluaran = Outcome::sum('ammount');
        $transaksi_pemasukan = Income::count();
        $transaksi_pengeluaran = Outcome::count();

        $data = array(
            "grafik" => array(
                "labels" => $labels,
                "incomes" => $incomes,
                "outcomes" => $outcomes 
            ),
            "total_pemasukan" => "Rp. ".number_format($total_pemasukan,0,',','.'),
            "total_pengeluaran" => "Rp. ".number_format($total_pengeluaran,0,',','.'),
            "transaksi_pemasukan" => $transaksi_pemasukan,
            "transaksi_pengeluaran" => $transaksi_pengeluaran,
        );
        $response = createResponse(true, 200, "Data berhasil didapatkan", $data);
        return response()->json($response);
    }

    public function laporan_keuangan($year) 
    {
        $pemasukan_debit = Journal::where('account_id', 2)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $pemasukan_kredit = Journal::where('account_id', 2)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $pemasukan =  $pemasukan_kredit - $pemasukan_debit;

        $tenaga_kerja_tidak_langsung_debit =  Journal::where('account_id', 16)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $tenaga_kerja_tidak_langsung_kredit =  Journal::where('account_id', 16)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $tenaga_kerja_tidak_langsung = $tenaga_kerja_tidak_langsung_debit - $tenaga_kerja_tidak_langsung_kredit;
        
        $reparasi_mesin_pabrik_debit =  Journal::where('account_id', 46)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $reparasi_mesin_pabrik_kredit =  Journal::where('account_id', 46)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $reparasi_mesin_pabrik = $reparasi_mesin_pabrik_debit - $reparasi_mesin_pabrik_kredit;

        $reparasi_kendaraan_pabrik_debit =  Journal::where('account_id', 51)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $reparasi_kendaraan_pabrik_kredit =  Journal::where('account_id', 51)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $reparasi_kendaraan_pabrik = $reparasi_kendaraan_pabrik_debit - $reparasi_kendaraan_pabrik_kredit;

        $reparasi_pabrik_debit =  Journal::where('account_id', 50)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $reparasi_pabrik_kredit =  Journal::where('account_id', 50)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $reparasi_pabrik = $reparasi_pabrik_debit - $reparasi_pabrik_kredit;

        $biaya_admin_debit =  Journal::where('account_id', 45)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $biaya_admin_kredit =  Journal::where('account_id', 45)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $biaya_admin = $biaya_admin_debit - $biaya_admin_kredit;

        $beban_listrik_pabrik_debit =  Journal::where('account_id', 48)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $beban_listrik_pabrik_kredit =  Journal::where('account_id', 48)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_listrik_pabrik = $beban_listrik_pabrik_debit - $beban_listrik_pabrik_kredit;

        $beban_air_pabrik_debit =  Journal::where('account_id', 49)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $beban_air_pabrik_kredit =  Journal::where('account_id', 49)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_air_pabrik = $beban_air_pabrik_debit - $beban_air_pabrik_kredit;

        $pbb_debit =  Journal::where('account_id', 47)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $pbb_kredit =  Journal::where('account_id', 47)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $pbb = $pbb_debit - $pbb_kredit;

        $bop_debit =  Journal::where('account_id', 51)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $bop_kredit =  Journal::where('account_id', 51)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $bop = $bop_debit - $bop_kredit;
        
        $overhead = $reparasi_mesin_pabrik + $reparasi_pabrik + $reparasi_kendaraan_pabrik + $biaya_admin + $beban_listrik_pabrik + $beban_air_pabrik + $pbb + $bop; 
        
        $biaya_angkut_pembelian_debit = Journal::where('account_id', 25)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $biaya_angkut_pembelian_kredit = Journal::where('account_id', 25)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $biaya_angkut_pembelian = $biaya_angkut_pembelian_debit -  $biaya_angkut_pembelian_kredit; 

        $biaya_bahan_debit = Journal::where('account_id', 23)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $biaya_bahan_kredit = Journal::where('account_id', 23)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $biaya_bahan = $biaya_bahan_debit -   $biaya_bahan_kredit; 

        $biaya_bahan_pembantu_debit = Journal::where('account_id', 24)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $biaya_bahan_pembantu_kredit = Journal::where('account_id', 24)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $biaya_bahan_pembantu = $biaya_bahan_pembantu_debit - $biaya_bahan_pembantu_kredit; 
        
        $penjualan = array(
            "Penjualan" => $pemasukan
        );

        $total_harga_pokok = ($tenaga_kerja_tidak_langsung + $overhead + $biaya_angkut_pembelian +  $biaya_bahan + $biaya_bahan_pembantu);
        $harga_pokok = array(
            "Bahan Baku Langsung" =>  $biaya_bahan,
            "Bahan Baku Pembantu" =>  $biaya_bahan_pembantu,
            "Tenaga Kerja Tidak Langsung" => $tenaga_kerja_tidak_langsung,
            "Biaya Overhead Pabrik" => $overhead,
            "Biaya Angkut Pembelian" => $biaya_angkut_pembelian,
        );

        $beban_gaji_debit = Journal::where('account_id', 31)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $beban_gaji_kredit = Journal::where('account_id', 31)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_gaji =  $beban_gaji_debit - $beban_gaji_kredit;

        $beban_air_debit = Journal::where('account_id', 35)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_air_kredit = Journal::where('account_id', 35)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_air =  $beban_air_debit -  $beban_air_kredit;

        $beban_listrik_debit = Journal::where('account_id', 34)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_listrik_kredit = Journal::where('account_id', 34)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_listrik =  $beban_listrik_debit -  $beban_listrik_kredit;

        $beban_telfon_debit = Journal::where('account_id', 36)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_telfon_kredit = Journal::where('account_id', 36)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_telfon = $beban_telfon_debit -  $beban_telfon_kredit;

        $beban_internet_debit = Journal::where('account_id', 37)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_internet_kredit = Journal::where('account_id', 37)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_internet = $beban_internet_debit -  $beban_internet_kredit;

        $beban_bunga_bank_debit = Journal::where('account_id', 39)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_bunga_bank_kredit = Journal::where('account_id', 39)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_bunga_bank = $beban_bunga_bank_debit -  $beban_bunga_bank_kredit;

        $beban_asuransi_debit = Journal::where('account_id', 29)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_asuransi_kredit = Journal::where('account_id', 29)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_asuransi = $beban_asuransi_debit - $beban_asuransi_kredit;

        $beban_sewa_gedung_debit = Journal::where('account_id', 26)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_sewa_gedung_kredit = Journal::where('account_id', 26)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_sewa_gedung = $beban_sewa_gedung_debit - $beban_sewa_gedung_kredit;

        $beban_pemasaran_iklan_debit = Journal::where('account_id', 28)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_pemasaran_iklan_kredit = Journal::where('account_id', 28)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_pemasaran_iklan = $beban_pemasaran_iklan_debit - $beban_pemasaran_iklan_kredit;

        $beban_perawatan_kendaraan_debit = Journal::where('account_id', 33)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_perawatan_kendaraan_kredit = Journal::where('account_id', 33)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_perawatan_kendaraan = $beban_perawatan_kendaraan_debit - $beban_perawatan_kendaraan_kredit;

        $beban_perawatan_gedung_debit = Journal::where('account_id', 32)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_perawatan_gedung_kredit = Journal::where('account_id', 32)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_perawatan_gedung = $beban_perawatan_gedung_debit - $beban_perawatan_gedung_kredit;
      
        $total_biaya_operasional = $beban_gaji + $beban_air + $beban_telfon + $beban_listrik + $beban_internet + $beban_bunga_bank + $beban_asuransi + $beban_sewa_gedung + $beban_pemasaran_iklan + $beban_perawatan_kendaraan + $beban_perawatan_gedung;
        $biaya_operasional = array(
            "Beban Gaji" => $beban_gaji,
            "Beban Air" => $beban_air,
            "Beban Listrik" => $beban_listrik, 
            "Beban Telfon" => $beban_telfon,
            "Beban Internet" => $beban_internet,
            "Beban Bunga Bank" => $beban_bunga_bank,
            "Beban Asuransi" => $beban_asuransi,
            "Beban Sewa Gedung" => $beban_sewa_gedung,
            "Beban Pemasaran Iklan" => $beban_pemasaran_iklan,
            "Beban Perawatan Kendaraan" => $beban_perawatan_kendaraan,
            "Beban Perawatan Gedung" => $beban_perawatan_gedung
        );          

        $pend_bunga_bank_debit = Journal::where('account_id', 14)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $pend_bunga_bank_credit = Journal::where('account_id', 14)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $pend_bunga_bank = $pend_bunga_bank_debit - $pend_bunga_bank_credit;
        $pendapatan_lain = array(
            "Pendapatan Bunga Bank" => $pend_bunga_bank,
        );

        $biaya_lain_lain_debit = Journal::where('account_id', 38)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $biaya_lain_lain_kredit = Journal::where('account_id', 38)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $biaya_lain_lain = $biaya_lain_lain_debit - $biaya_lain_lain_kredit;

        $beban_administrasi_bank_debit = Journal::where('account_id', 15)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_administrasi_bank_credit = Journal::where('account_id', 15)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $beban_administrasi_bank = $beban_administrasi_bank_debit - $beban_administrasi_bank_credit;
        
        $beban_lain = array(
            "Beban Administrasi Bank" => $beban_administrasi_bank,
            "Beban Lain-Lain" => $biaya_lain_lain,
        );  
        $total_beban_lain = $beban_administrasi_bank + $biaya_lain_lain;
        $total_beban = $total_beban_lain +   $total_biaya_operasional;
        $laba_kotor = $pemasukan - $total_harga_pokok;
        $laba_sebelum_pajak = (($laba_kotor + $pend_bunga_bank) - $total_beban);
        $pajak = $laba_kotor * 0.1;
        $pendapatan = array(
            "Penjualan" => $penjualan,
            "Harga Pokok Penjualan" => $harga_pokok,
            "Total Harga Pokok Penjualan" => $total_harga_pokok,
            "Laba Kotor" => $laba_kotor,
            "Biaya Operasional" => $biaya_operasional,
            "Total Biaya Operasional" => $total_biaya_operasional,
            "Pendapatan Lain-lain" => $pendapatan_lain,
            "Total Pendapatan Lain-Lain" => $pend_bunga_bank,
            "Beban Lain-Lain" => $beban_lain,
            "Total Beban Lain-Lain" => $total_beban_lain,
            "Total Pendapatan dan Beban Lain-Lain" => $pend_bunga_bank + $total_beban_lain,
            //"Laba Sebelum Pajak" => $laba_sebelum_pajak,
            //"Pajak" => $pajak,
            "Laba " => $laba_sebelum_pajak //- $pajak
        );

        $kas_debit = Journal::where('account_id', 1)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $kas_kredit = Journal::where('account_id', 1)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $kas = $kas_debit - $kas_kredit;
        $rekening_debit = Journal::where('account_id', 10)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $rekening_credit = Journal::where('account_id', 10)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $rekening = $rekening_debit - $rekening_credit;
        $piutang_usaha_debit = Journal::where('account_id', 4)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $piutang_usaha_credit = Journal::where('account_id', 4)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $piutang_usaha = $piutang_usaha_debit - $piutang_usaha_credit;

        $p_komputer_elektronik_debit = Journal::where('account_id', 41)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_komputer_elektronik_kredit = Journal::where('account_id', 41)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_komputer_elektronik = $p_komputer_elektronik_debit - $p_komputer_elektronik_kredit;
        $p_mesin_pabrik_debit = Journal::where('account_id', 19)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_mesin_pabrik_kredit = Journal::where('account_id', 19)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_mesin_pabrik =  $p_mesin_pabrik_debit -  $p_mesin_pabrik_kredit;
        $p_furnitur_debit = Journal::where('account_id', 43)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_furnitur_kredit = Journal::where('account_id', 43)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_furnitur = $p_furnitur_debit - $p_furnitur_kredit;
        $p_kendaraan_debit =  Journal::where('account_id', 21)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_kendaraan_kredit = Journal::where('account_id', 21)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_kendaraan =  $p_kendaraan_debit -  $p_kendaraan_kredit;
        $p_gedung_debit =  Journal::where('account_id', 17)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_gedung_kredit = Journal::where('account_id', 17)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_gedung = $p_gedung_debit - $p_gedung_kredit;
        $p_akumulasi_gedung_debit = Journal::where('account_id', 18)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_akumulasi_gedung_kredit = Journal::where('account_id', 18)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_akumulasi_gedung =  $p_akumulasi_gedung_debit - $p_akumulasi_gedung_kredit;
        $p_akumulasi_kendaraan_debit = Journal::where('account_id', 22)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_akumulasi_kendaraan_kredit = Journal::where('account_id', 22)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_akumulasi_kendaraan =  $p_akumulasi_kendaraan_debit - $p_akumulasi_kendaraan_kredit;
        $p_akumulasi_mesin_debit = Journal::where('account_id', 20)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_akumulasi_mesin_kredit = Journal::where('account_id', 20)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_akumulasi_mesin =  $p_akumulasi_mesin_debit - $p_akumulasi_mesin_kredit;
        $p_akumulasi_elec_debit = Journal::where('account_id', 42)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_akumulasi_elec_kredit = Journal::where('account_id', 42)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_akumulasi_elec =  $p_akumulasi_elec_debit - $p_akumulasi_elec_kredit;
        $p_akumulasi_furniture_debit = Journal::where('account_id', 44)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_akumulasi_furniture_kredit = Journal::where('account_id', 44)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_akumulasi_furniture =  $p_akumulasi_furniture_debit - $p_akumulasi_furniture_kredit;
        $p_akumulasi = $p_akumulasi_gedung + $p_akumulasi_kendaraan + $p_akumulasi_mesin + $p_akumulasi_elec +  $p_akumulasi_furniture;

        $total_activa_lancar =  $kas + $rekening + $piutang_usaha;
        $activa_tetap = $p_komputer_elektronik + $p_mesin_pabrik + $p_furnitur + $p_kendaraan + $p_gedung;

        $activa_lancar = array(
            "Kas" => $kas,
            "Rekening" => $rekening,
            "Piutang Usaha" => $piutang_usaha,
            "Total Aktiva Lancar" => $total_activa_lancar
        );

        $total_activa_tetap = $activa_tetap - $p_akumulasi;
        $activa_tetap = array(
            "Aset Komputer & Elektronik" => $p_komputer_elektronik,
            "Aset Mesin Usaha" => $p_mesin_pabrik,
            "Aset Furnitur" => $p_furnitur,
            "Aset Kendaraan" => $p_kendaraan,
            "Aset Gedung" => $p_gedung,
            "Akumulasi Penyusutan" => $p_akumulasi,
            "Total Aktiva Tetap" => $total_activa_tetap
        );
        
        $activa = array(
            "Aktiva Lancar" => $activa_lancar,
            "Aktiva Tetap" => $activa_tetap,
            "Total" => $total_activa_lancar + $total_activa_tetap
        );
    
        $utang_bank_debit = Journal::where('account_id', 13)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $utang_bank_credit = Journal::where('account_id', 13)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $utang_bank = $utang_bank_credit - $utang_bank_debit;
        $utang_usaha_debit = Journal::where('account_id', 8)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $utang_usaha_credit = Journal::where('account_id', 8)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $utang_usaha = $utang_usaha_credit - $utang_usaha_debit;
        $modal_debit = Journal::where('account_id', 11)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $modal_credit = Journal::where('account_id', 11)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $modal = $modal_credit - $modal_debit;
        $laba_ditahan_debit = Journal::where('account_id', 12)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $laba_ditahan_credit = Journal::where('account_id', 12)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $laba_ditahan = $laba_ditahan_debit - $laba_ditahan_credit;

        $total_utang = $utang_usaha + $utang_bank;
        //$total_modal =  $modal; //+ $laba_ditahan;

        $perubahan_modal = $modal + $laba_sebelum_pajak;

        $total_perubahan_modal = array (
            "Modal" => $modal,
            "Laba" => $laba_sebelum_pajak,
            "Total Perubahan Modal" => $perubahan_modal
        );

        $passiva = array(
            "Utang Lancar" => array(
                "Utang Usaha" => $utang_usaha,
            ),
            "Utang Bank" => array(
                "Utang Bank" => $utang_bank,
            ),
            "Total Utang" => $utang_usaha + $utang_bank,
            "Modal" => array(
            "Modal" =>$perubahan_modal,
            ),
         "Total Modal" =>   $perubahan_modal,
         "Total Passiva " =>   $perubahan_modal + $total_utang
        );

        $laporan = array(
            "Laba Rugi" => $pendapatan,
            "Laporan Perubahan Modal" =>   $total_perubahan_modal,
            "Neraca Activa" => $activa,
            "Neraca Passiva" => $passiva,
        );

        $compact = array(
            "year" => $year,
            "laporan" => $laporan
        );
        return view('laporan', $compact);
    }

    public function laporan_keuangan_pdf($year) 
    {
        $pemasukan_debit = Journal::where('account_id', 2)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $pemasukan_kredit = Journal::where('account_id', 2)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $pemasukan =  $pemasukan_kredit - $pemasukan_debit;

        $tenaga_kerja_tidak_langsung_debit =  Journal::where('account_id', 16)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $tenaga_kerja_tidak_langsung_kredit =  Journal::where('account_id', 16)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $tenaga_kerja_tidak_langsung = $tenaga_kerja_tidak_langsung_debit - $tenaga_kerja_tidak_langsung_kredit;
        
        $reparasi_mesin_pabrik_debit =  Journal::where('account_id', 46)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $reparasi_mesin_pabrik_kredit =  Journal::where('account_id', 46)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $reparasi_mesin_pabrik = $reparasi_mesin_pabrik_debit - $reparasi_mesin_pabrik_kredit;

        $reparasi_kendaraan_pabrik_debit =  Journal::where('account_id', 51)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $reparasi_kendaraan_pabrik_kredit =  Journal::where('account_id', 51)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $reparasi_kendaraan_pabrik = $reparasi_kendaraan_pabrik_debit - $reparasi_kendaraan_pabrik_kredit;

        $reparasi_pabrik_debit =  Journal::where('account_id', 50)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $reparasi_pabrik_kredit =  Journal::where('account_id', 50)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $reparasi_pabrik = $reparasi_pabrik_debit - $reparasi_pabrik_kredit;

        $biaya_admin_debit =  Journal::where('account_id', 45)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $biaya_admin_kredit =  Journal::where('account_id', 45)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $biaya_admin = $biaya_admin_debit - $biaya_admin_kredit;

        $beban_listrik_pabrik_debit =  Journal::where('account_id', 48)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $beban_listrik_pabrik_kredit =  Journal::where('account_id', 48)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_listrik_pabrik = $beban_listrik_pabrik_debit - $beban_listrik_pabrik_kredit;

        $beban_air_pabrik_debit =  Journal::where('account_id', 49)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $beban_air_pabrik_kredit =  Journal::where('account_id', 49)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_air_pabrik = $beban_air_pabrik_debit - $beban_air_pabrik_kredit;

        $pbb_debit =  Journal::where('account_id', 47)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $pbb_kredit =  Journal::where('account_id', 47)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $pbb = $pbb_debit - $pbb_kredit;

        $bop_debit =  Journal::where('account_id', 51)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $bop_kredit =  Journal::where('account_id', 51)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $bop = $bop_debit - $bop_kredit;
        
        $overhead = $reparasi_mesin_pabrik + $reparasi_pabrik + $reparasi_kendaraan_pabrik + $biaya_admin + $beban_listrik_pabrik + $beban_air_pabrik + $pbb + $bop; 
        
        $biaya_angkut_pembelian_debit = Journal::where('account_id', 25)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $biaya_angkut_pembelian_kredit = Journal::where('account_id', 25)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $biaya_angkut_pembelian = $biaya_angkut_pembelian_debit -  $biaya_angkut_pembelian_kredit; 
        
        $biaya_bahan_debit = Journal::where('account_id', 23)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $biaya_bahan_kredit = Journal::where('account_id', 23)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $biaya_bahan = $biaya_bahan_debit -   $biaya_bahan_kredit; 

        $biaya_bahan_pembantu_debit = Journal::where('account_id', 24)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $biaya_bahan_pembantu_kredit = Journal::where('account_id', 24)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $biaya_bahan_pembantu = $biaya_bahan_pembantu_debit - $biaya_bahan_pembantu_kredit; 
        
        $penjualan = array(
            "Penjualan" => $pemasukan
        );

        $total_harga_pokok = ($tenaga_kerja_tidak_langsung + $overhead + $biaya_angkut_pembelian +  $biaya_bahan + $biaya_bahan_pembantu);
        $harga_pokok = array(
            "Bahan Baku Langsung" =>  $biaya_bahan,
            "Bahan Baku Pembantu" =>  $biaya_bahan_pembantu,
            "Tenaga Kerja Tidak Langsung" => $tenaga_kerja_tidak_langsung,
            "Biaya Overhead Pabrik" => $overhead,
            "Biaya Angkut Pembelian" => $biaya_angkut_pembelian,
        );

        $beban_gaji_debit = Journal::where('account_id', 31)->where('date', 'LIKE', $year.'-%')->sum('debit');     
        $beban_gaji_kredit = Journal::where('account_id', 31)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_gaji =  $beban_gaji_debit - $beban_gaji_kredit;

        $beban_air_debit = Journal::where('account_id', 35)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_air_kredit = Journal::where('account_id', 35)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_air =  $beban_air_debit -  $beban_air_kredit;

        $beban_listrik_debit = Journal::where('account_id', 34)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_listrik_kredit = Journal::where('account_id', 34)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_listrik =  $beban_listrik_debit -  $beban_listrik_kredit;

        $beban_telfon_debit = Journal::where('account_id', 36)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_telfon_kredit = Journal::where('account_id', 36)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_telfon = $beban_telfon_debit -  $beban_telfon_kredit;

        $beban_internet_debit = Journal::where('account_id', 37)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_internet_kredit = Journal::where('account_id', 37)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_internet = $beban_internet_debit -  $beban_internet_kredit;

        $beban_bunga_bank_debit = Journal::where('account_id', 39)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_bunga_bank_kredit = Journal::where('account_id', 39)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_bunga_bank = $beban_bunga_bank_debit -  $beban_bunga_bank_kredit;

        $beban_asuransi_debit = Journal::where('account_id', 29)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_asuransi_kredit = Journal::where('account_id', 29)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_asuransi = $beban_asuransi_debit - $beban_asuransi_kredit;

        $beban_sewa_gedung_debit = Journal::where('account_id', 26)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_sewa_gedung_kredit = Journal::where('account_id', 26)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_sewa_gedung = $beban_sewa_gedung_debit - $beban_sewa_gedung_kredit;

        $beban_pemasaran_iklan_debit = Journal::where('account_id', 28)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_pemasaran_iklan_kredit = Journal::where('account_id', 28)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_pemasaran_iklan = $beban_pemasaran_iklan_debit - $beban_pemasaran_iklan_kredit;

        $beban_perawatan_kendaraan_debit = Journal::where('account_id', 33)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_perawatan_kendaraan_kredit = Journal::where('account_id', 33)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_perawatan_kendaraan = $beban_perawatan_kendaraan_debit - $beban_perawatan_kendaraan_kredit;

        $beban_perawatan_gedung_debit = Journal::where('account_id', 32)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_perawatan_gedung_kredit = Journal::where('account_id', 32)->where('date', 'LIKE', $year.'-%')->sum('credit');     
        $beban_perawatan_gedung = $beban_perawatan_gedung_debit - $beban_perawatan_gedung_kredit;
      
        $total_biaya_operasional = $beban_gaji + $beban_air + $beban_telfon + $beban_listrik + $beban_internet + $beban_bunga_bank + $beban_asuransi + $beban_sewa_gedung + $beban_pemasaran_iklan + $beban_perawatan_kendaraan + $beban_perawatan_gedung;
        $biaya_operasional = array(
            "Beban Gaji" => $beban_gaji,
            "Beban Air" => $beban_air,
            "Beban Listrik" => $beban_listrik, 
            "Beban Telfon" => $beban_telfon,
            "Beban Internet" => $beban_internet,
            "Beban Bunga Bank" => $beban_bunga_bank,
            "Beban Asuransi" => $beban_asuransi,
            "Beban Sewa Gedung" => $beban_sewa_gedung,
            "Beban Pemasaran Iklan" => $beban_pemasaran_iklan,
            "Beban Perawatan Kendaraan" => $beban_perawatan_kendaraan,
            "Beban Perawatan Gedung" => $beban_perawatan_gedung
        );          

        $pend_bunga_bank_debit = Journal::where('account_id', 14)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $pend_bunga_bank_credit = Journal::where('account_id', 14)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $pend_bunga_bank = $pend_bunga_bank_debit - $pend_bunga_bank_credit;
        $pendapatan_lain = array(
            "Pendapatan Bunga Bank" => $pend_bunga_bank,
        );

        $biaya_lain_lain_debit = Journal::where('account_id', 38)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $biaya_lain_lain_kredit = Journal::where('account_id', 38)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $biaya_lain_lain = $biaya_lain_lain_debit - $biaya_lain_lain_kredit;

        $beban_administrasi_bank_debit = Journal::where('account_id', 15)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_administrasi_bank_credit = Journal::where('account_id', 15)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $beban_administrasi_bank = $beban_administrasi_bank_debit - $beban_administrasi_bank_credit;
        
        $beban_lain = array(
            "Beban Administrasi Bank" => $beban_administrasi_bank,
            "Beban Lain-Lain" => $biaya_lain_lain,
        );  
        $total_beban_lain = $beban_administrasi_bank + $biaya_lain_lain;
        $total_beban = $total_beban_lain +   $total_biaya_operasional;
        $laba_kotor = $pemasukan - $total_harga_pokok;
        $laba_sebelum_pajak = (($laba_kotor + $pend_bunga_bank) - $total_beban);
        $pajak = $laba_kotor * 0.1;
        $pendapatan = array(
            "Penjualan" => $penjualan,
            "Harga Pokok Penjualan" => $harga_pokok,
            "Total Harga Pokok Penjualan" => $total_harga_pokok,
            "Laba Kotor" => $laba_kotor,
            "Biaya Operasional" => $biaya_operasional,
            "Total Biaya Operasional" => $total_biaya_operasional,
            "Pendapatan Lain-lain" => $pendapatan_lain,
            "Total Pendapatan Lain-Lain" => $pend_bunga_bank,
            "Beban Lain-Lain" => $beban_lain,
            "Total Beban Lain-Lain" => $total_beban_lain,
            "Total Pendapatan dan Beban Lain-Lain" => $pend_bunga_bank + $total_beban_lain,
            //"Laba Sebelum Pajak" => $laba_sebelum_pajak,
            //"Pajak" => $pajak,
            "Laba " => $laba_sebelum_pajak //- $pajak
        );
        
        $kas_debit = Journal::where('account_id', 1)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $kas_kredit = Journal::where('account_id', 1)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $kas = $kas_debit - $kas_kredit;
        $rekening_debit = Journal::where('account_id', 10)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $rekening_credit = Journal::where('account_id', 10)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $rekening = $rekening_debit - $rekening_credit;
        $piutang_usaha_debit = Journal::where('account_id', 4)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $piutang_usaha_credit = Journal::where('account_id', 4)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $piutang_usaha = $piutang_usaha_debit - $piutang_usaha_credit;

        $p_komputer_elektronik_debit = Journal::where('account_id', 41)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_komputer_elektronik_kredit = Journal::where('account_id', 41)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_komputer_elektronik = $p_komputer_elektronik_debit - $p_komputer_elektronik_kredit;
        $p_mesin_pabrik_debit = Journal::where('account_id', 19)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_mesin_pabrik_kredit = Journal::where('account_id', 19)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_mesin_pabrik =  $p_mesin_pabrik_debit -  $p_mesin_pabrik_kredit;
        $p_furnitur_debit = Journal::where('account_id', 43)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_furnitur_kredit = Journal::where('account_id', 43)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_furnitur = $p_furnitur_debit - $p_furnitur_kredit;
        $p_kendaraan_debit =  Journal::where('account_id', 21)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_kendaraan_kredit = Journal::where('account_id', 21)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_kendaraan =  $p_kendaraan_debit -  $p_kendaraan_kredit;
        $p_gedung_debit =  Journal::where('account_id', 17)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_gedung_kredit = Journal::where('account_id', 17)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_gedung = $p_gedung_debit - $p_gedung_kredit;
        $p_akumulasi_gedung_debit = Journal::where('account_id', 18)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_akumulasi_gedung_kredit = Journal::where('account_id', 18)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_akumulasi_gedung =  $p_akumulasi_gedung_debit - $p_akumulasi_gedung_kredit;
        $p_akumulasi_kendaraan_debit = Journal::where('account_id', 22)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_akumulasi_kendaraan_kredit = Journal::where('account_id', 22)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_akumulasi_kendaraan =  $p_akumulasi_kendaraan_debit - $p_akumulasi_kendaraan_kredit;
        $p_akumulasi_mesin_debit = Journal::where('account_id', 20)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_akumulasi_mesin_kredit = Journal::where('account_id', 20)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_akumulasi_mesin =  $p_akumulasi_mesin_debit - $p_akumulasi_mesin_kredit;
        $p_akumulasi_elec_debit = Journal::where('account_id', 42)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_akumulasi_elec_kredit = Journal::where('account_id', 42)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_akumulasi_elec =  $p_akumulasi_elec_debit - $p_akumulasi_elec_kredit;
        $p_akumulasi_furniture_debit = Journal::where('account_id', 44)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $p_akumulasi_furniture_kredit = Journal::where('account_id', 44)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $p_akumulasi_furniture =  $p_akumulasi_furniture_debit - $p_akumulasi_furniture_kredit;
        $p_akumulasi = $p_akumulasi_gedung + $p_akumulasi_kendaraan + $p_akumulasi_mesin + $p_akumulasi_elec +  $p_akumulasi_furniture;

        $total_activa_lancar =  $kas + $rekening + $piutang_usaha;
        $activa_tetap = $p_komputer_elektronik + $p_mesin_pabrik + $p_furnitur + $p_kendaraan + $p_gedung;

        $activa_lancar = array(
            "Kas" => $kas,
            "Rekening" => $rekening,
            "Piutang Usaha" => $piutang_usaha,
            "Total Aktiva Lancar" => $total_activa_lancar
        );

        $total_activa_tetap = $activa_tetap - $p_akumulasi;
        $activa_tetap = array(
            "Aset Komputer & Elektronik" => $p_komputer_elektronik,
            "Aset Mesin Usaha" => $p_mesin_pabrik,
            "Aset Furnitur" => $p_furnitur,
            "Aset Kendaraan" => $p_kendaraan,
            "Aset Gedung" => $p_gedung,
            "Akumulasi Penyusutan" => $p_akumulasi,
            "Total Aktiva Tetap" => $total_activa_tetap
        );
        
        $activa = array(
            "Aktiva Lancar" => $activa_lancar,
            "Aktiva Tetap" => $activa_tetap,
            "Total" => $total_activa_lancar + $total_activa_tetap
        );
    
        $utang_bank_debit = Journal::where('account_id', 13)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $utang_bank_credit = Journal::where('account_id', 13)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $utang_bank = $utang_bank_credit - $utang_bank_debit;
        $utang_usaha_debit = Journal::where('account_id', 8)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $utang_usaha_credit = Journal::where('account_id', 8)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $utang_usaha = $utang_usaha_credit - $utang_usaha_debit;
        $modal_debit = Journal::where('account_id', 11)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $modal_credit = Journal::where('account_id', 11)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $modal = $modal_credit - $modal_debit;
        $laba_ditahan_debit = Journal::where('account_id', 12)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $laba_ditahan_credit = Journal::where('account_id', 12)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $laba_ditahan = $laba_ditahan_debit - $laba_ditahan_credit;

        $total_utang = $utang_usaha + $utang_bank;
        //$total_modal =  $modal; //+ $laba_ditahan;

        $perubahan_modal = $modal + $laba_sebelum_pajak;

        $total_perubahan_modal = array (
            "Modal" => $modal,
            "Laba" => $laba_sebelum_pajak,
            "Total Perubahan Modal" => $perubahan_modal
        );

        $passiva = array(
            "Utang Lancar" => array(
                "Utang Usaha" => $utang_usaha,
            ),
            "Utang Bank" => array(
                "Utang Bank" => $utang_bank,
            ),
            "Total Utang" => $utang_usaha + $utang_bank,
            "Modal" => array(
            "Modal" =>$perubahan_modal,
            ),
            "Total Modal" =>   $perubahan_modal,
            "Total Passiva " =>   $perubahan_modal + $total_utang
        );

        $laporan = array(
            "Laba Rugi" => $pendapatan,
            "Laporan Perubahan Modal" =>   $total_perubahan_modal,
            "Neraca Activa" => $activa,
            "Neraca Passiva" => $passiva,
        );

        $pdf = PDF::loadView('laporan-pdf', compact('year', 'laporan'));
        return $pdf->stream('laporan-keuangan-'.$year.'.pdf', ["Attachment" => false]);
    }

    public function persediaanBahanBaku($year, $type=null)
    {
        $bahan = StockBahan::with('material')->where('date', '<', $year.'-01-01')->where(function($q) use ($type) {
            if($type !== null) {
                $q->whereHas('material', function($q) use ($type) {
                    $q->where('type', $type);
                });
            }
        })->get();
        $harga = 0;
        foreach ($bahan as $stok) {
            if($stok->status == 'Tambah Stock') {
                $harga += $stok->stock * $stok->material->unit_price;
            } else {
                $harga -= $stok->stock * $stok->material->unit_price;
            }
        }
        return $harga;
    }

    public function persediaanProduk($year)
    {
        $opnname = StockOpname::with('product')->where('date', '<', $year.'-01-01')->get();
        $harga = 0;
        foreach ($opnname as $stok) {
            if($stok->status == 'Penjualan' || $stok->status == 'Sisa Dibuang') {
                $harga -= $stok->stock * $stok->product->unit_price;
            } else {
                $harga += $stok->stock * $stok->product->unit_price;
            }
        }
        return $harga;
    }
}
