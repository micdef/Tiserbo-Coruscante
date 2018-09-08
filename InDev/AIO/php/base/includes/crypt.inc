<?php

	// Inclusion des fichiers nécessaires
	include_once "file.inc";

	// Clé de cryptage
	global $cryptKey;
	$cryptKey = 'k01T1s3rB0snkCuPZgsXbE';

	// Cryptage Lourd (Retourne un SHA512)
	function crypt_heavy($s) {
		global $cryptKey;
		try {
			return hash("sha512", hash("sha256", $cryptKey) . hash("sha256", $s));
		} catch (Exception $ex) {
			throw $ex;
		}
	}

	// Cryptage Légér (Retourne un SHA256)
	function crypt_light($s) {
		global $cryptKey;
		try {
			return hash("sha256", hash("sha512", $cryptKey) . hash("sha512", $s));
		} catch (Exception $ex) {
			throw $ex;
		}
	}

	

?>