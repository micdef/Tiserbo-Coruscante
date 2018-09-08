<?php

	// Include PHP Classes

	// Include PHP Includes
	chdir('..');
	chdir('includes');
	include_once('db.inc');
	include_once('crypt.inc');
	include_once('file.inc');
	include_once('text.inc');

	class user() {
		
		//********************************************************************************
		//*																				 *
		//* PART 1 : Class Members														 *
		//*																				 *
		//********************************************************************************
		private $idDB;
		private $email;
		private $password;
		private $dateIN;
		private $timeIN;
		private $flagActive;
		private $flagDelete;
		private $fName;
		private $lName;
		private $gender;
		private $tel;
		private $err;
		
		//********************************************************************************
		//*																				 *
		//* PART 2 : Static Members														 *
		//*																				 *
		//********************************************************************************
		private $table;
		private $table_info;
				
		//********************************************************************************
		//*																				 *
		//* PART 3 : Class Constructors													 *
		//*																				 *
		//********************************************************************************
		// Default constructor (all to null)
		public function __construct() {
			$this->idDB = 0;
			$this->email = null;
			$this->password = null;
			$this->dateIN = null;
			$this->timeIN = null;
			$this->flagActive = null;
			$this->flagDelete = null;
			$this->fName = null;
			$this->lName = null;
			$this->gender = null;
			$this->tel = null;
			$this->table = "usr_user";
			$this->table_info = "usr_info";
			$this->err = null;
		}
		
		/*! @brief By parameters' Constructor
		 *  Function who construct the object using the parameters
		 *	@param[in]	$email			User's email (must be unique)
		 *	@param[in]	$pwd			User's password
		 *	@param[in]	$dateIN			User's inscription date
		 *	@param[in]	$timeIN			User's inscription time
		 *	@param[in]	$factive		Flag to determine if the user is active or not
		 *	@param[in] 	$fdelete		Flag to determine if the user is deleted or not
		 *	@param[in]	$fname			User's first name (Can be optional)
		 *	@param[in]	$lname			User's last name (Can be optional)
		 *	@param[in]	$gender			User's gender (Can be optional)
		 *	@param[in] 	$tel			User's telephone number
		 */
		public function newParam($email, $pwd, $dateIN, $timeIN, $factive, $fdelete, $fname, $lname, $gender, $tel) {
			$this->idDB = 0;
			$this->email = $email;
			$this->password = crypt_heavy($pwd);
			$this->dateIN = $dateIN;
			$this->timeIN = $timeIN;
			$this->flagActive = $factive;
			$this->flagDelete = $fdelete;
			$this->fName = $fname;
			$this->lName = $lname;
			$this->gender = $gender;
			$this->tel = $tel;
			$this->err = null;
		}
		
		/*! @brief By Database's Constructor
		 *  Function who construct the object using de the database
		 * 	@param[in]	$email			User's email
		 * 	@param[in]	$id				User's database ID
		 */
		public function newDB($email, $id) {
			try {
				if ($id == 0)
					$sql = "SELECT a.*, b.fname, b.lname, b.gender, b.tel FROM " . $this->table . " AS a LEFT JOIN " . $this->table_info . " AS b on A.id = B.iduser WHERE a.email = '" . $email . "'";
				else
					$sql = "SELECT a.*, b.fname, b.lname, b.gender, b.tel FROM " . $this->table . " AS a LEFT JOIN " . $this->table_info . " AS b on A.id = B.iduser WHERE a.id = " . $id;
				$el = db_getElem($sq, "system@tiserbo.be");
				if ($el != null) {
					$this->idDB = $el["id"];
					$this->email = $el["email"];
					$this->password = $el["password"];
					$this->dateIN = $el["datein"];
					$this->timeIN = $el["timein"];
					$this->flagActive = $el["flagactive"];
					$this->flagDelete = $el["flagdelete"];
					$this->fName = $el["fname"];
					$this->lName = $el["lname"];
					$this->gender = $el["gender"];
					$this->tel = $el["tel"];
					$this->err = null;
				} else
					throw new Exception("The element you search is not present in the DB");
			} catch (Exception $ex) {
				$this->idDB = -1;
				$this->email = null;
				$this->password = null;
				$this->dateIN = null;
				$this->timeIN = null;
				$this->flagActive = null;
				$this->flagDelete = null;
				$this->fName = null;
				$this->lName = null;
				$this->gender = null;
				$this->tel = null;
				$this->err = $ex->getMessage();
				file_writeError("system@tiserbo.be --- " . date("H:i:s") . " --- " . $ex->getMessage());
			}
		}
		
		//********************************************************************************
		//*																				 *
		//* PART 4 : GETTERS															 *
		//*																				 *
		//********************************************************************************
		public function getDataBaseID() { return $this->idDB; }
		public function getEmail() { return $this->email; }
		public function getDateIn() { return $this->dateIN; }
		public function getTimeIn() { return $this->timeIN; }
		public function isActive() { return $this->flagActive; }
		public function isDeleted() { return $this->flagDelete; }
		public function getFirstName() { return $this->fName; }
		public function getLastName() { return $this->lName; }
		public function getGender() { return $this->gender; }
		public function getTelephoneNumber() { return $this->tel; }
		public function getError() { return $this->err; }
		
		//********************************************************************************
		//*																				 *
		//* PART 5 : SETTERS															 *
		//*																				 *
		//********************************************************************************
		public function setEmail($email) {}
		public function setDateIN($datein) { $this->dateIN = $datein; }
		public function setTimeIN($timein) { $this->timeIN = $timein; }
		private function setActive($factive) { $this->flagActive = $factive; }
		private function setDelete($fdelete) { $this->flagDelete = $fdelete; }
		public function setFirstName($fname) { $this->fName = $fname; }
		public function setLastName($lname) { $this->lName = $lname; }
		public function setGender($gender) { $this->gender = $gender; }
		public function setTelephoneNumber($tel) { $this->tel = $tel; }
		
		//********************************************************************************
		//*																				 *
		//* PART 6 : Private functions													 *
		//*																				 *
		//********************************************************************************
		private function checkMail($mail) {
			$sql = "SELECT * FROM " . $this->table . " WHERE email = '" . $mail . "'";
			return !isElemExists($sql, $_SESSION["email"]);
		}
		
		private function eraseError() {
			$this->err = null;
		}
		
		//********************************************************************************
		//*																				 *
		//* PART 7 : DB Functions														 *
		//*																				 *
		//********************************************************************************
		private function dbInsert() {
			try {
				if ($this->checkMail($this->email)) {
					$sql = "INSERT INTO " . $this->table . " (email, password, datein, timein, flagactive, flagdelete) ";
					$sql .= "VALUES ('" . $this->email . "', '" . $this->password . "', '" . date('Y-m-d', strtotime($this->datein));
					$sql .= "', '" . date('H:i:s', strtotime($this->timein)) . "', " . ($this->flagActive == true ? "true" : "false");
					$sql .= ", " . ($this->flagDelete == true ? "true)" : "false)");
					db_execSQL($sql, $_SESSION["email"]);
					$sql = "SELECT id FROM " . $this->table . " WHERE email = '" . $this->email . "'";
					$this->idDB = db_getValue($sql, $_SESSION["email"]);
					$val = 0;
					if (!($this->fname == null && $this->lname == null && $this->gender == null && $this->tel == null))
						$val = dbInsertInfo();
					if ($val == 0)
						$this->err = null;
				} else
					throw new Exception("Email already existing in the DB");
			} catch (Exception $ex) {
				$this->idDB = -1;
				$this->err = $ex->getMessage();
				file_writeError("sql@tiserbo.be --- " . date("H:i:s") . " --- " . $ex->getMessage());
			}
		}
		
		private function dbInsertInfo() {
			try {
				$sql = "INSERT INTO " . $this->table_info . " (iduser, fname, lname, gender, tel) ";
				$sql .= "VALUES (" . $this->idDB . ", '" . ($this->fName == null ? "''" , text_text2SQL($this->fName)) . "', '";
				$sql .= ($this->lName == null ? "''" , text_text2SQL($this->lName)) . "', '" . ($this->gender == null ? "''" , text_text2SQL($this->gender));
				$sql .= "', '" . ($this->tel == null ? "'')" , text_text2SQL($this->tel) . ")");
				db_execSQL($sql, $_SESSION["email"]);
				$this->err = null;
				return 0;
			} catch (Exception $ex) {
				$this->idDB = -1;
				$this->err = $ex->getMessage();
				file_writeError("sql@tiserbo.be --- " . date("H:i:s") . " --- " . $ex->getMessage());
				return -1;
			}
		}
		
		private function dbUpdate() {
			try {
				$sql = "SELECT email FROM " . $this->table . " WHERE id = " . $this->idDB;
				$oldMail = db_getValue($sql, $_SESSION["email"]);
				$sql = "UPDATE " . $this->table " SET ";
				if ($oldMail != $this->email)
					if ($this->checkMail())
						$sql .= "email = '" . $this->email . "', ";
					else
						throw new Exception("Email already existing in the DB");
				else {
					$sql .= "password = '" . $this->password . "', ";
					$sql .= "flagactive = " . ($this->flagActive == true ? "true" : "false") . ", ";
					$sql .= "flagdelete = " . ($this->flagDelete == true ? "true" : "false") . " ";
					$sql .= "WHERE id = " . $this->idDB;
					db_execSQL($sql, $_SESSION["email"]);
					$this->err = null;
				}
			} catch (Exception $ex) {
				$this->idDB = -1;
				$this->err = $ex->getMessage();
				file_writeError("sql@tiserbo.be --- " . date("H:i:s") . " --- " . $ex->getMessage());
				return -1;
			}
		}
		
		private function dbUpdateInfo() {
			try {
				if (!($this->fName == null && $this->lName == null && $this->gender == null $ $this->tel == null)) {
					$sql = "UPDATE " . $this->table_info . " SET ";
					
				} 
				
			} catch (Exception $ex) {
				$this->idDB = -1;
				$this->err = $ex->getMessage();
				file_writeError("sql@tiserbo.be --- " . date("H:i:s") . " --- " . $ex->getMessage());
				return -1;
			}
		}
		
		//********************************************************************************
		//*																				 *
		//* PART 8 : Public functions													 *
		//*																				 *
		//********************************************************************************
		
		
		//********************************************************************************
		//*																				 *
		//* PART 9 : Static functions													 *
		//*																				 *
		//********************************************************************************
		
		//********************************************************************************
		//*																				 *
		//* PART 10 : Override functions												 *
		//*																				 *
		//********************************************************************************
		
	}

?>