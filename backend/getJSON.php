<?php
/**
 * Created by PhpStorm.
 * User: fausto
 * Date: 07/11/2018
 * Time: 09:50
 */

//PARAMETRI PER POST DA IONIC, GLI ACCESS CONTROL HEADERS VENGONO RICEVUTI DOPO LA REQUEST OPTIONS
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}


//PRENDI JSON PREFERENZE DAL CLIENT
$req = json_decode(file_get_contents('php://input'), true);

$option = $req['option'];

http_response_code(200);
if ($option == "JSON") {
    echo json_encode(['result' => 'pippo']);
} else if ($option == "DOCENTE") {

    $materie = [
        'II anno triennale' => 'Ingegneria del Software e laboratorio',
        'III anno triennale' => 'Programmazione web e mobile',
        'I anno magistrale' => 'Gestione Progetti Software'];

    $docente = [
        'nome' => 'Fausto',
        'cognome' => 'Fasano',
        'materie' => $materie];

    echo json_encode($docente);
} else {
    echo "pippo";
}
