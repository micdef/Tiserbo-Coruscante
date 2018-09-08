<?php

	// Nom du répertoire de logs des erreurs
	global $fichDir;
	$fichDir = 'C:\\Projects\\Tiserbo\\Coruscante-Log';

	// Création du répertoire
	function file_createRep() {
		global $fichDir;
		if (!file_exists($fichDir))
			mkdir($fichDir, 1777);
		if (!file_exists($fichDir . '\\' . date("H") . '-err.log')) {
			$fich = fopen($fichDir . '\\' . date("H") . '-err.log', 'x');
			fclose($fich);
		}
		if (!file_exists($fichDir . '\\' . date("H") . '-sql.log')) {
			$fich = fopen($fichDir . '\\' . date("H") . '-sql.log', 'x');
			fclose($fich);
		}
	}

	// Ecriture du log SQL
	function file_writeSQL($str) {
		global $fichDir;
		file_createRep();
		$fich = fopen($fichDir . '\\' . date("H") . '-sql.log', 'a+');
		fputs($fich, date("H:i:s ==> "));
		fputs($fich, $str . "\n");
		fclose($fich);
	}

	// Ecriture du log ERREUR
	function file_writeError($str) {
		global $fichDir;
		file_createRep();
		$fich = fopen($fichDir . '\\' . date("H") . '-err.log', 'a+');
		fputs($fich, date("H:i:s ==> "));
		fputs($fich, $str . "\n");
		fclose($fich);
	}

?>