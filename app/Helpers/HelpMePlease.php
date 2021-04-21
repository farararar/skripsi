<?php

if ( !function_exists('createResponse') )
{
    function createResponse($success, $status_code, $message, $data=null, $additional_data=null)
    {
        $response = array(
            "success" => $success,
            "status_code" => $status_code,
            "message" => $message
        );   
        if($data !== null) {
            $response += array(
                "data" => $data,
            );
        }
        if($additional_data !== null) {
            $response += array(
                "additional_data" => $additional_data,
            );
        }

        return $response;
	}
}

if (!function_exists('tanggalIndonesia'))
{
    function tanggalIndonesia($date, $format = 'Y-m-d')
    {
        $d = DateTime::createFromFormat($format, $date);
        if(!($d && $d->format($format) === $date)) {
            return $date;
        }
        
        $tahun = date('Y', strtotime($date));
        $bulan_angka = date('m', strtotime($date));
        $hari = date('j', strtotime($date));

        switch ($bulan_angka) {
            case '01':
                $bulan = 'Januari'; break;
            case '01':
                $bulan = 'Januari'; break;
            case '02':
                $bulan = 'Februari'; break;
            case '03':
                $bulan = 'Maret'; break;
            case '04':
                $bulan = 'April'; break;
            case '05':
                $bulan = 'Mei'; break;
            case '06':
                $bulan = 'Juni'; break;
            case '07':
                $bulan = 'Juli'; break;
            case '08':
                $bulan = 'Agustus'; break;
            case '09':
                $bulan = 'September'; break;
            case '10':
                $bulan = 'Oktober'; break;
            case '11':
                $bulan = 'November'; break;
            case '12':
                $bulan = 'Desember'; break;
            default:
                return "error parsing date"; break;
        }

        $tanggal = $hari." ".$bulan." ".$tahun;

        return $tanggal;
    }
}

if (!function_exists('createNotification'))
{
    function createNotification()
    {
        //under construction
    }
}

if (!function_exists('urlGenerator')) {
    /**
     * @return \Laravel\Lumen\Routing\UrlGenerator
     */
    function urlGenerator() {
        return new \Laravel\Lumen\Routing\UrlGenerator(app());
    }
}

if (!function_exists('asset')) {
    /**
     * @param $path
     * @param bool $secured
     *
     * @return string
     */
    function asset($path, $secured = false) {
        return urlGenerator()->asset($path, $secured);
    }
}

if(!function_exists('getJenisLogistik'))
{
    function getJenisLogistik($index = null)
    {
        $data = array("Pembelian bahan baku langsung", //0
            "Pembeliaan bahan baku pembantu", //1
            "Gaji tenaga kerja tidak langsung", //2
            "Reparasi & pemeliharaan mesin pabrik", //3
            "Reparasi & pemeliharaan gedung pabrik", //4
            "Reparasi & pemeliharaan kendaraan", //5
            "Biaya angkut pembelian bahan baku", //6
            "Tagihan listrik pabrik", //7
            "Tagihan air pabrik", //8
            "Biaya administrasi pabrik", //9
            "Pajak bumi & bangunan", //10
            "Penyusutan mesin dan peralatan pabrik", //11
            "Biaya BOP lain-lain", //12
        );
    
        if($index !== null) {
            return $data[$index];
        }
        return $data;
    }
}

if(!function_exists('getJenisOperasional'))
{
    function getJenisOperasional($index = null)
    {
        $data = array("Tagihan listrik", //0
            "Tagihan air", //1
            "Tagihan tefon", //2
            "Tagihan internet", //3
            "Sewa gedung", //4
            "Sewa pabrik", //5
            "Biaya asuransi", //6
            "Alat tulis kantor", //7
            "Pengadaan furniture", //8
            "Pengadaan kendaraan", //9
            "Pengadaan elektronik", //10
            "Gaji pegawai perusahaan", //11
            "Pemeliharaan gedung", //12
            "Pemeliharaan kendaraan", //13
            "Iklan dan pemasaran", //14
            "Pengadaan mesin pabrik", //15
            "Pengadaan gedung kantor/pabrik", //16
            "Akumulasi penyusutan mesin", //17
            "Akumulasi penyusutan gedung", //18
            "Akumulasi penyusutan kendaraan", //19
            "Biaya Lain-Lain", //20
        );
        if($index !== null) {
            return $data[$index];
        }
        return $data;
    }
}