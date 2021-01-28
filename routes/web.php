<?php

/** @var \Laravel\Lumen\Routing\Router $router */

use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// $router->get('/key', function() {
//     return \Illuminate\Support\Str::random(32);
// });

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('/login', ['as' => 'auth.login', 'uses' => 'UserController@login']);

//Account Start
    $router->get('/account', ['as' => 'account.index', 'uses' => 'AccountController@index']);
    $router->get('/account/{id}', ['as' => 'account.get', 'uses' => 'AccountController@get']);
    $router->post('/account/store', ['as' => 'account.store', 'uses' => 'AccountController@store']);
    $router->put('/account/{id}/update', ['as' => 'account.update', 'uses' => 'AccountController@update']);
    $router->delete('/account/{id}/delete', ['as' => 'account.delete', 'uses' => 'AccountController@delete']);
    $router->get('/account-report', ['as' => 'account.report', 'uses' => 'AccountController@report']);
//Account End

//Outcome Start
    $router->get('/outcome/payment-methods', ['as' => 'outcome.payment-methods', 'uses' => 'OutcomeController@getPaymentMethods']);
    $router->get('/outcome/jenis-operasional', ['as' => 'outcome.jenis-operasional', 'uses' => 'OutcomeController@getJenisOperasional']);
    $router->get('/outcome/jenis-logistik', ['as' => 'outcome.jenis-logistik', 'uses' => 'OutcomeController@getJenisLogistik']);
    $router->get('/outcome', ['as' => 'outcome.index', 'uses' => 'OutcomeController@index']);
    $router->get('/outcome/{id}', ['as' => 'outcome.get', 'uses' => 'OutcomeController@get']);
    $router->post('/outcome/store', ['as' => 'outcome.store', 'uses' => 'OutcomeController@store']);
    $router->put('/outcome/{id}/update', ['as' => 'outcome.update', 'uses' => 'OutcomeController@update']);
    $router->put('/outcome/{id}/review', ['as' => 'outcome.review', 'uses' => 'OutcomeController@review']);
    $router->delete('/outcome/{id}/delete', ['as' => 'outcome.delete', 'uses' => 'OutcomeController@delete']);
//Outcome End

//Income Start
    $router->get('/income/payment-methods', ['as' => 'income.payment-methods', 'uses' => 'IncomeController@getPaymentMethods']);
    $router->get('/income', ['as' => 'income.index', 'uses' => 'IncomeController@index']);
    $router->get('/income/{id}', ['as' => 'income.get', 'uses' => 'IncomeController@get']);
    $router->get('/invoice-income/{id}', ['as' => 'income.invoice', 'uses' => 'IncomeController@invoice']);
    $router->post('/income/store', ['as' => 'income.store', 'uses' => 'IncomeController@store']);
    $router->put('/income/{id}/update', ['as' => 'income.update', 'uses' => 'IncomeController@update']);
    $router->put('/income/{id}/review', ['as' => 'income.review', 'uses' => 'IncomeController@review']);
    $router->put('/income/{id}/validate', ['as' => 'income.validate', 'uses' => 'IncomeController@validOrInvalid']);
    $router->delete('/income/{id}/delete', ['as' => 'income.delete', 'uses' => 'IncomeController@delete']);
//Income End

//Journal Start
    $router->get('/journal/{date}', ['as' => 'journal.daily', 'uses' => 'JournalController@daily']);
    $router->get('/journal/{year}/{month}', ['as' => 'journal.monthly', 'uses' => 'JournalController@monthly']);
    $router->post('/journal/store', ['as' => 'journal.store', 'uses' => 'JournalController@store']);
    $router->put('/journal/{id}/update', ['as' => 'journal.update', 'uses' => 'JournalController@update']);
    $router->delete('/journal/{id}/delete', ['as' => 'journal.delete', 'uses' => 'JournalController@delete']);
    $router->post('/journal/review-daily', ['as' => 'journal.review-daily', 'uses' => 'JournalController@reviewDaily']);
    $router->post('/journal/review-monthly', ['as' => 'journal.review-monthly', 'uses' => 'JournalController@reviewMonthly']);
    $router->post('/journal/posting', ['as' => 'journal.posting', 'uses' => 'JournalController@posting']);
//Journal End

//RawMaterialCategory Start
    $router->get('/raw-category', 'RawMaterialCategoryController@Index');
    $router->post('/raw-category', 'RawMaterialCategoryController@Store');
    $router->delete('/raw-category/{id}', 'RawMaterialCategoryController@Delete');
//RawMaterialCategory End

//RawMaterial Start
    $router->get('/raw-material', 'RawMaterialController@Index');
    $router->get('/raw-material', 'RawMaterialController@Index');
    $router->post('/raw-material', 'RawMaterialController@Store');
    $router->put('/raw-material/{id}', 'RawMaterialController@update');
    $router->delete('/raw-material/{id}', 'RawMaterialController@Delete');
    $router->get('/raw-material/report', 'RawMaterialController@report');

    $router->get('/stock-material', 'RawMaterialController@stockMaterialList');
    $router->post('/stock-material', 'RawMaterialController@stockMaterialStore');
//RawMaterial End

//Product Start
    $router->get('/product', 'ProductController@Index');
    $router->get('/product-category', 'ProductController@listCategory');
    $router->get('/product-unit', 'ProductController@listUnit');
    $router->post('/product', 'ProductController@Store');
    $router->get('/product/{id}', 'ProductController@get');
    $router->put('/product/{id}', 'ProductController@update');
    $router->delete('/product/{id}', 'ProductController@Delete');
//Product End

//Product Process Start
    $router->get('/product-process/{id}/report', 'ProductProcessController@report');
    $router->get('/product-process/{product_id}', 'ProductProcessController@Index');
    $router->post('/product-process', 'ProductProcessController@Start');
    $router->patch('/product-process/{id}', 'ProductProcessController@Stop');
    $router->delete('/product-process/{id}', 'ProductProcessController@Delete');
//Product Process End

//Product Process Start
    $router->get('/stock-opname/{type}/status', 'StockOpnameController@getStockStatus');
    $router->get('/stock-opname', 'StockOpnameController@filter');
    $router->get('/stock-opname', 'StockOpnameController@Index');
    $router->post('/stock-opname', 'StockOpnameController@Store');
    $router->delete('/stock-opname/{id}', 'StockOpnameController@Delete');
//Product Process End

$router->get('/laporan-keuangan/{year}', 'Controller@laporan_keuangan');
$router->get('/laporan-keuangan-pdf/{year}', 'Controller@laporan_keuangan_pdf');
$router->get('/dashboard', 'Controller@dashboard');
$router->get('/buku-besar', 'AccountController@buku_besar');
$router->get('/neraca-saldo', 'AccountController@neraca_saldo');