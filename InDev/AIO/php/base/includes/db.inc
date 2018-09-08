<?php

	// Inclusion des fichiers nécessaires
	include_once "file.inc";

	// Paramètres de connexion à la DB
	global $strConn;
	$strConn = "pgsql:host=localhost;port=5432;dbname=tis-maindb;user=postgres;password=sonic";

	// Exécution d'une commande SQL
	function db_execSQL($sql, $email) {
		global $strConn;
		try {
			$dbh = new PDO($strConn);
			$stm = $dbh->prepare($sql);
			if (!$stm->execute()) {
				throw new Exception($email . " - " . $stm->errorInfo()[0] . " - " . $stm->errorInfo()[1] . " - " . $stm->errorInfo()[2]);
			} else {
				file_writeSQL($email . " - " . $sql);
			}
		} catch (Exception $ex) {
			file_writeError($email . " --- " . date("H:i:s") . " --- " . $ex->getMessage());
			throw $ex;
		}
	}

	function db_isElemExists($sql, $email) {
		global $strConn;
		try {
			$dbh = new PDO($strConn);
			$stm = $dbh->prepare($sql);
			if (!$stm->execute()) {
				throw new Exception($email . " - " . $stm->errorInfo()[0] . " - " . $stm->errorInfo()[1] . " - " . $stm->errorInfo()[2]);
			} else {
				if ($stm->rowCount() > 0) {
					return true;
				} else {
					return false;
				}
			}
		} catch (Exception $ex) {
			file_writeError($email . " --- " . date("H:i:s") . " --- " . $ex->getMessage());
			throw $ex;
		}
	}
	
	function db_getNbElem($sql, $email) {
		global $strConn;
		try {
			$dbh = new PDO($strConn);
			$stm = $dbh->prepare($sql);
			if (!$stm->execute()) {
				throw new Exception($email . " - " . $stm->errorInfo()[0] . " - " . $stm->errorInfo()[1] . " - " . $stm->errorInfo()[2]);
			} else {
				return $stm->rowCount();
			}
		} catch (Exception $ex) {
			file_writeError($email . " --- " . date("H:i:s") . " --- " . $ex->getMessage());
			throw $ex;
		}
	}
	
	function db_getElem($sql, $email) {
		global $strConn;
		try {
			$dbh = new PDO($strConn);
			$stm = $dbh->prepare($sql);
			if (!$stm->execute()) {
				throw new Exception($email . " - " . $stm->errorInfo()[0] . " - " . $stm->errorInfo()[1] . " - " . $stm->errorInfo()[2]);
			} else {
				return $stm->fetch();
			}
		} catch (Exception $ex) {
			file_writeError($email . " --- " . date("H:i:s") . " --- " . $ex->getMessage());
			throw $ex;
		}
	}
	
	function db_getListElem($sql, $email) {
		global $strConn;
		try {
			$dbh = new PDO($strConn);
			$stm = $dbh->prepare($sql);
			if (!$stm->execute()) {
				throw new Exception($email . " - " . $stm->errorInfo()[0] . " - " . $stm->errorInfo()[1] . " - " . $stm->errorInfo()[2]);
			} else {
				return $stm;
			}
		} catch (Exception $ex) {
			file_writeError($email . " --- " . date("H:i:s") . " --- " . $ex->getMessage());
			throw $ex;
		}
	}
	
	function db_getValue($sql, $email) {
		global $strConn;
		try {
			$dbh = new PDO($strConn);
			$stm = $dbh->prepare($sql);
			if (!$stm->execute()) {
				throw new Exception($email . " - " . $stm->errorInfo()[0] . " - " . $stm->errorInfo()[1] . " - " . $stm->errorInfo()[2]);
			} else {
				$res = $stm->fetch();
				return $res[0];
			}
		} catch (Exception $ex) {
			file_writeError($email . " --- " . date("H:i:s") . " --- " . $ex->getMessage());
			throw $ex;
		}
	}
?>