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
        $kas_debit = Journal::where('account_id', 1)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $kas_kredit = Journal::where('account_id', 1)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $kas = $kas_debit - $kas_kredit;
        $rekening_debit = Journal::where('account_id', 10)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $rekening_credit = Journal::where('account_id', 10)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $rekening = $rekening_debit - $rekening_credit;
        $piutang_usaha_debit = Journal::where('account_id', 4)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $piutang_usaha_credit = Journal::where('account_id', 4)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $piutang_usaha = $piutang_usaha_debit - $piutang_usaha_credit;

        $p_komputer_elektronik = Outcome::where('type', getJenisOperasional(10))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $p_mesin_pabrik = Outcome::where('type', getJenisOperasional(15))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $p_furnitur = Outcome::where('type', getJenisOperasional(8))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $p_kendaraan = Outcome::where('type', getJenisOperasional(9))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $p_gedung = Outcome::where('type', getJenisOperasional(16))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $akumulasi = Outcome::where('type', 'LIKE', 'Akumulasi')->where('date', 'LIKE', $year.'-%')->sum('ammount');

        
        $total_activa_lancar =  $kas + $rekening + $piutang_usaha;
        $activa_lancar = array(
            "Kas" => $kas,
            "Rekening" => $rekening,
            // "Rekap Bahan Baku" => null,
            "Piutang Usaha" => $piutang_usaha,
            "Total Aktiva Lancar" => $total_activa_lancar
        );

        $total_activa_tetap = $p_komputer_elektronik + $p_mesin_pabrik + $p_furnitur + $p_kendaraan + $p_gedung + $akumulasi;
        $activa_tetap = array(
            "Aset Komputer & Elektronik" => $p_komputer_elektronik,
            "Aset Mesin Usaha" => $p_mesin_pabrik,
            "Aset Furnitur" => $p_furnitur,
            "Aset Kendaraan" => $p_kendaraan,
            "Aset Gedung" => $p_gedung,
            "Akumulasi Penyusutan" => $akumulasi,
            "Total Aktiva Tetap" => $total_activa_tetap
        );
        
        $activa = array(
            "Aktiva Lancar" => $activa_lancar,
            "Aktiva Tetap" => $activa_tetap,
            "Total" => $total_activa_lancar + $total_activa_tetap
        );
    
        $utang_bank_debit = Journal::where('account_id', 13)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $utang_bank_credit = Journal::where('account_id', 13)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $utang_bank = $utang_bank_debit - $utang_bank_credit;
        $utang_usaha_debit = Journal::where('account_id', 8)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $utang_usaha_credit = Journal::where('account_id', 8)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $utang_usaha = $utang_usaha_debit - $utang_usaha_credit;
        $modal_debit = Journal::where('account_id', 11)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $modal_credit = Journal::where('account_id', 11)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $modal = $modal_debit - $modal_credit;
        $laba_ditahan_debit = Journal::where('account_id', 12)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $laba_ditahan_credit = Journal::where('account_id', 12)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $laba_ditahan = $laba_ditahan_debit - $laba_ditahan_credit;

        $passiva = array(
            "Utang Lancar" => array(
                "Utang Usaha" => $utang_usaha,
            ),
            "Utang Bank" => array(
                "Utang Bank" => $utang_bank,
            ),
            "Total Utang" => $utang_usaha + $utang_bank,
            "Modal" => array(
                "Modal" => $modal,
                "Laba Ditahan" => $laba_ditahan,
            ),
            "Total Modal" => $modal + $laba_ditahan,
            "Total Passiva " => $utang_usaha + $utang_bank + $modal + $laba_ditahan
        );

        $pemasukan = Income::where('date', 'LIKE', $year.'-%')->sum('ammount');
        $tenaga_kerja_tidak_langsung = Outcome::where('type', getJenisLogistik(2))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $overhead = Outcome::where(function($q) {
            $q->orWhere('type', getJenisLogistik(3))
            ->orWhere('type', getJenisLogistik(4))
            ->orWhere('type', getJenisLogistik(5))
            ->orWhere('type', getJenisLogistik(7))
            ->orWhere('type', getJenisLogistik(8))
            ->orWhere('type', getJenisLogistik(10))
            ->orWhere('type', getJenisLogistik(11))
            ->orWhere('type', getJenisLogistik(12));
        })->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $biaya_angkut_pembelian = Outcome::where('type', getJenisLogistik(6))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $penjualan = array(
            "Penjualan" => $pemasukan
        );
        $total_harga_pokok = ($tenaga_kerja_tidak_langsung + $overhead + $biaya_angkut_pembelian);
        $harga_pokok = array(
            "Tenaga Kerja Tidak Langsung" => $tenaga_kerja_tidak_langsung,
            "Biaya Overhead Pabrik" => $overhead,
            "Biaya Angkut Pembelian" => $biaya_angkut_pembelian,
        );

        $beban_gaji = Outcome::where('type', getJenisOperasional(8))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_air_dll = Outcome::where('type', getJenisOperasional(0))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        // $beban_pengadaan_gedung = Outcome::where('type', getJenisOperasional(15))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_bunga_bank = Outcome::where('type', getJenisOperasional(19))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_asuransi = Outcome::where('type', getJenisOperasional(3))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_sewa_gedung = Outcome::where('type', getJenisOperasional(1))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_pemasaran_iklan = Outcome::where('type', getJenisOperasional(11))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_perawatan_kendaraan = Outcome::where('type', getJenisOperasional(10))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_perawatan_gedung = Outcome::where('type', getJenisOperasional(9))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $total_biaya_operasional = $beban_gaji + $beban_air_dll + $beban_bunga_bank + $beban_asuransi + $beban_sewa_gedung + $beban_pemasaran_iklan + $beban_perawatan_kendaraan + $beban_perawatan_gedung;
        $biaya_operasional = array(
            "Beban Gaji" => $beban_gaji,
            "Beban Air, Listrik, Telfon, Internet" => $beban_air_dll,
            // "Beban Pengadaan Gedung" => $beban_pengadaan_gedung,
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
        $biaya_lain_lain = Outcome::where('type', getJenisOperasional(20))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_administrasi_bank_debit = Journal::where('account_id', 15)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_administrasi_bank_credit = Journal::where('account_id', 15)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $beban_administrasi_bank = $beban_administrasi_bank_debit - $beban_administrasi_bank_credit;
        $beban_lain = array(
            "Beban Administrasi Bank" => $beban_administrasi_bank,
            "Beban Lain-Lain" => $biaya_lain_lain,
        );  
        $total_beban_lain = $beban_administrasi_bank + $biaya_lain_lain;
        $total_beban = $total_beban_lain +   $total_biaya_operasional;
        $laba_kotor = $pemasukan + $total_harga_pokok;
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
            "Laba Sebelum Pajak" => $laba_sebelum_pajak,
            "Pajak" => $pajak,
            "Laba Bersih" => $laba_sebelum_pajak - $pajak
        );
        $laporan = array(
            "Neraca Activa" => $activa,
            "Neraca Passiva" => $passiva,
            "Laba Rugi" => $pendapatan
        );
        $compact = array(
            "year" => $year,
            "laporan" => $laporan
        );
        return view('laporan', $compact);
    }

    public function laporan_keuangan_pdf($year) 
    {
        $kas_debit = Journal::where('account_id', 1)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $kas_kredit = Journal::where('account_id', 1)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $kas = $kas_debit - $kas_kredit;
        $rekening_debit = Journal::where('account_id', 10)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $rekening_credit = Journal::where('account_id', 10)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $rekening = $rekening_debit - $rekening_credit;
        $piutang_usaha_debit = Journal::where('account_id', 4)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $piutang_usaha_credit = Journal::where('account_id', 4)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $piutang_usaha = $piutang_usaha_debit - $piutang_usaha_credit;

        $p_komputer_elektronik = Outcome::where('type', getJenisOperasional(10))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $p_mesin_pabrik = Outcome::where('type', getJenisOperasional(15))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $p_furnitur = Outcome::where('type', getJenisOperasional(8))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $p_kendaraan = Outcome::where('type', getJenisOperasional(9))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $p_gedung = Outcome::where('type', getJenisOperasional(16))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $akumulasi = Outcome::where('type', 'LIKE', 'Akumulasi')->where('date', 'LIKE', $year.'-%')->sum('ammount');

        $total_activa_lancar =  $kas + $rekening + $piutang_usaha;
        $activa_lancar = array(
            "Kas" => $kas,
            "Rekening" => $rekening,
            // "Rekap Bahan Baku" => null,
            "Piutang Usaha" => $piutang_usaha,
            "Total Aktiva Lancar" => $total_activa_lancar
        );

        $total_activa_tetap = $p_komputer_elektronik + $p_mesin_pabrik + $p_furnitur + $p_kendaraan + $p_gedung + $akumulasi;
        $activa_tetap = array(
            "Aset Komputer & Elektronik" => $p_komputer_elektronik,
            "Aset Mesin Usaha" => $p_mesin_pabrik,
            "Aset Furnitur" => $p_furnitur,
            "Aset Kendaraan" => $p_kendaraan,
            "Aset Gedung" => $p_gedung,
            "Akumulasi Penyusutan" => $akumulasi,
            "Total Aktiva Tetap" => $total_activa_tetap
        );
        
        $activa = array(
            "Aktiva Lancar" => $activa_lancar,
            "Aktiva Tetap" => $activa_tetap,
            "Total Aktiva" => $total_activa_lancar + $total_activa_tetap
        );

        $utang_bank_debit = Journal::where('account_id', 13)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $utang_bank_credit = Journal::where('account_id', 13)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $utang_bank = $utang_bank_debit - $utang_bank_credit;
        $utang_usaha_debit = Journal::where('account_id', 8)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $utang_usaha_credit = Journal::where('account_id', 8)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $utang_usaha = $utang_usaha_debit - $utang_usaha_credit;
        $modal_debit = Journal::where('account_id', 11)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $modal_credit = Journal::where('account_id', 11)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $modal = $modal_debit - $modal_credit;
        $laba_ditahan_debit = Journal::where('account_id', 12)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $laba_ditahan_credit = Journal::where('account_id', 12)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $laba_ditahan = $laba_ditahan_debit - $laba_ditahan_credit;

        $passiva = array(
            "Utang Lancar" => array(
                "Utang Usaha" => $utang_usaha,
            ),
            "Utang Bank" => array(
                "Utang Bank" => $utang_bank,
            ),
            "Total Utang" => $utang_usaha + $utang_bank,
            "Modal" => array(
                "Modal" => $modal,
                "Laba Ditahan" => $laba_ditahan,
            ),
            "Total Modal" => $modal + $laba_ditahan,
            "Total Passiva " => $utang_usaha + $utang_bank + $modal + $laba_ditahan
        );

        $pemasukan = Income::where('date', 'LIKE', $year.'-%')->sum('ammount');
        $tenaga_kerja_tidak_langsung = Outcome::where('type', getJenisLogistik(2))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $overhead = Outcome::where(function($q) {
            $q->orWhere('type', getJenisLogistik(3))
            ->orWhere('type', getJenisLogistik(4))
            ->orWhere('type', getJenisLogistik(5))
            ->orWhere('type', getJenisLogistik(7))
            ->orWhere('type', getJenisLogistik(8))
            ->orWhere('type', getJenisLogistik(10))
            ->orWhere('type', getJenisLogistik(11))
            ->orWhere('type', getJenisLogistik(12));
        })->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $biaya_angkut_pembelian = Outcome::where('type', getJenisLogistik(6))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $penjualan = array(
            "Penjualan" => $pemasukan
        );
        $total_harga_pokok = ($tenaga_kerja_tidak_langsung + $overhead + $biaya_angkut_pembelian);
        $harga_pokok = array(
            "Tenaga Kerja Tidak Langsung" => $tenaga_kerja_tidak_langsung,
            "Biaya Overhead Pabrik" => $overhead,
            "Biaya Angkut Pembelian" => $biaya_angkut_pembelian,
        );

        $beban_gaji = Outcome::where('type', getJenisOperasional(8))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_air_dll = Outcome::where('type', getJenisOperasional(0))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        // $beban_pengadaan_gedung = Outcome::where('type', getJenisOperasional(15))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_bunga_bank = Outcome::where('type', getJenisOperasional(19))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_asuransi = Outcome::where('type', getJenisOperasional(3))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_sewa_gedung = Outcome::where('type', getJenisOperasional(1))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_pemasaran_iklan = Outcome::where('type', getJenisOperasional(11))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_perawatan_kendaraan = Outcome::where('type', getJenisOperasional(10))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_perawatan_gedung = Outcome::where('type', getJenisOperasional(9))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $total_biaya_operasional = $beban_gaji + $beban_air_dll + $beban_bunga_bank + $beban_asuransi + $beban_sewa_gedung + $beban_pemasaran_iklan + $beban_perawatan_kendaraan + $beban_perawatan_gedung;
        $biaya_operasional = array(
            "Beban Gaji" => $beban_gaji,
            "Beban Air, Listrik, Telfon, Internet" => $beban_air_dll,
            // "Beban Pengadaan Gedung" => $beban_pengadaan_gedung,
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
        $biaya_lain_lain = Outcome::where('type', getJenisOperasional(20))->where('date', 'LIKE', $year.'-%')->sum('ammount');
        $beban_administrasi_bank_debit = Journal::where('account_id', 15)->where('date', 'LIKE', $year.'-%')->sum('debit');
        $beban_administrasi_bank_credit = Journal::where('account_id', 15)->where('date', 'LIKE', $year.'-%')->sum('credit');
        $beban_administrasi_bank = $beban_administrasi_bank_debit - $beban_administrasi_bank_credit;
        $beban_lain = array(
            "Beban Administrasi Bank" => $beban_administrasi_bank,
            "Beban Lain-Lain" => $biaya_lain_lain,
        );  
        $total_beban_lain = $beban_administrasi_bank + $biaya_lain_lain;
        $total_beban = $total_beban_lain +   $total_biaya_operasional;
        $laba_kotor = $pemasukan + $total_harga_pokok;
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
            "Laba Sebelum Pajak" => $laba_sebelum_pajak,
            "Pajak" => $pajak,
            "Laba Bersih" => $laba_sebelum_pajak - $pajak
        );
        $laporan = array(
            "Neraca Activa" => $activa,
            "Neraca Passiva" => $passiva,
            "Laba Rugi" => $pendapatan
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
