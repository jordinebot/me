#!/bin/bash
php -r 'date_default_timezone_set("Europe/Madrid"); echo date("r T\n", filemtime("./dist/index.html"));'
