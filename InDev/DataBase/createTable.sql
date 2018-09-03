CREATE TABLE sys_country
(	id					SERIAL			NOT NULL,
 	code				VARCHAR(10)		NOT NULL,
 	flag				VARCHAR(4000)	NOT NULL,
 	intercode			VARCHAR(10)		NOT NULL,
 	ue					BOOLEAN			NOT NULL,
 	flagactive			BOOLEAN			NOT NULL,
 	flagdelete			BOOLEAN			NOT NULL,
 	CONSTRAINT 	"PK-SYS_Country-ID"						PRIMARY KEY		(id),
 	CONSTRAINT	"UK-SYS_Country-Code"					UNIQUE			(code),
);

CREATE TABLE sys_zipcode
(	idcountry			INT				NOT NULL,
 	zipcode				VARCHAR(25)		NOT NULL,
 	city				VARCHAR(255)	NOT NULL,
 	flagactive			BOOLEAN			NOT NULL,
 	flagdelete			BOOLEAN			NOT NULL,
 	CONSTRAINT	"PK-SYS_ZipCode-IDC_ZC_City"			PRIMARY KEY		(idcountry, zipcode, city),
 	CONSTRAINT	"FK-SYS_ZipCode-IDCountry"				FOREIGN KEY		(idcountry)						REFERENCES	sys_country(id),
);

CREATE TABLE mod_module
(	id					SERIAL			NOT NULL,
 	name				VARCHAR(50)		NOT NULL,
 	descr				VARCHAR(4000)	NULL,
 	callcode			VARCHAR(5)		NOT NULL,
 	fctload				VARCHAR(4000)	NOT NULL,
 	namejs				VARCHAR(4000)	NOT NULL,
 	loaddefault			BOOLEAN			NOT NULL,
 	flagactive			BOOLEAN			NOT NULL,
 	flagmaintenance		BOOLEAN			NOT NULL,
 	flagdelete			BOOLEAN			NOT NULL,
 	CONSTRAINT	"PK-MOD_Module-ID"						PRIMARY KEY		(id),
	CONSTRAINT 	"UK-MOD_Module-Name"					UNIQUE			(name),
	CONSTRAINT 	"UK-MOD_Module-NameJS"					UNIQUE			(namejs)
);

CREATE TABLE usr_user
(	id					SERIAL			NOT NULL,
 	email				VARCHAR(4000)	NOT NULL,
 	password			VARCHAR(255)	NOT NULL,
 	datein				DATE			NOT NULL,
 	timein				TIME			NOT NULL,
 	flagactive			BOOLEAN			NOT NULL,
 	flagdelete			BOOLEAN			NOT NULL,
 	CONSTRAINT	"PK-USR_User-ID"						PRIMARY KEY		(id),
 	CONSTRAINT 	"FK-USR_User-Email"						UNIQUE			(email)
);

CREATE TABLE usr_info
(	iduser				INT				NOT NULL,
 	fname				VARCHAR(255)	NULL,
 	lname				VARCHAR(255)	NULL,
 	gender				VARCHAR(1)		NULL			CHECK (gender IN ('F', 'M', 'X')),
 	tel					VARCHAR(50)		NULL,
 	CONSTRAINT	"PK-USR_Info-IDUser"					PRIMARY KEY		(iduser),
 	CONSTRAINT	"FK-USR_Info-IDUser"					FOREIGN KEY		(iduser)						REFERENCES	usr_user(id),
);

CREATE TABLE usr_token
(	id					VARCHAR(255)	NOT NULL,
 	iduser				INT				NOT NULL,
 	timevalid			INT				NOT NULL,
 	action				VARCHAR(25)		NOT NULL,
 	param				VARCHAR(4000)	NULL,
 	CONSTRAINT	"PK-USR_Token-ID"						PRIMARY KEY		(id),
 	CONSTRAINT	"FK-USR_Info-IDUser"					FOREIGN KEY		(iduser)						REFERENCES	usr_user(id),
);

CREATE TABLE usr_group
(	id					SERIAL			NOT NULL,
	name				VARCHAR(50)		NOT NULL,
	descr				VARCHAR(4000)	NOT NULL,
	CONSTRAINT	"PK-USR_Group-ID"						PRIMARY KEY		(idgroup),
	CONSTRAINT 	"UK-USR_Group-Name"						UNIQUE			(name)
);

CREATE TABLE usr_usergroup
(	iduser				INT				NOT NULL,
 	idgroup				INT				NOT NULL,
 	CONSTRAINT	"PK-USR_UserGroup-IDU_IDG"				PRIMARY KEY		(iduser, idgroup),
 	CONSTRAINT	"FK-USR_UserGroup-IDUser"				FOREIGN KEY		(iduser)						REFERENCES 	usr_user(id),
 	CONSTRAINT	"FK-USR_UserGroup-IDGroup"				FOREIGN KEY		(idgroup)						REFERENCES 	usr_group(id)
);

CREATE TABLE usr_right
(	id					SERIAL			NOT NULL,
 	namedb				VARCHAR(4000)	NOT NULL,
 	nametable			VARCHAR(4000)	NOT NULL,
 	namecolumn			VARCHAR(4000)	NOT NULL,
 	CONSTRAINT	"PK-USR_Right-ID"						PRIMARY KEY		(id),
 	CONSTRAINT	"UK-USR_Right-DB_TBL_COL"				UNIQUE			(namedb, nametable, namecolumn)
);

CREATE TABLE usr_groupright
(	idgroup				INT				NOT NULL,
 	idright				INT				NOT NULL,
 	flaginsert			BOOLEAN			NOT NULL,
 	flagupdate			BOOLEAN			NOT NULL,
 	flagdelete			BOOLEAN			NOT NULL,
 	CONSTRAINT	"PK-USR_GroupRight-IDG_IDR"				PRIMARY KEY		(idgroup, idright),
 	CONSTRAINT	"FK-USR_GroupRight-IDGroup"				FOREIGN KEY		(idgroup)						REFERENCES 	usr_group(id),
 	CONSTRAINT	"FK-USR_GroupRight-IDRight"				FOREIGN KEY		(idright)						REFERENCES 	usr_right(id)
);

CREATE TABLE usr_userright
(	iduser				INT				NOT NULL,
 	idright				INT				NOT NULL,
 	flaginsert			BOOLEAN			NOT NULL,
 	flagupdate			BOOLEAN			NOT NULL,
 	flagdelete			BOOLEAN			NOT NULL,
 	CONSTRAINT	"PK-USR_UserRight-IDU_IDR"				PRIMARY KEY		(iduser, idright),
 	CONSTRAINT	"FK-USR_UserRight-IDUser"				FOREIGN KEY		(iduser)						REFERENCES 	usr_user(id),
 	CONSTRAINT	"FK-USR_UserRight-IDRight"				FOREIGN KEY		(idright)						REFERENCES 	usr_right(id)
);

CREATE TABLE usr_usernote
(	id					SERIAL			NOT NULL,
 	iduserconcerned		INT				NOT NULL,
 	iduserwriter		INT				NOT NULL,
 	datein				DATE			NOT NULL,
 	timein				DATE			NOT NULL,
 	note				VARCHAR(4000)	NOT NULL,
 	flagdelete			BOOLEAN			NOT NULL,
 	CONSTRAINT	"PK-USR_UserNote-ID"					PRIMARY KEY		(id),
 	CONSTRAINT	"FK-USR_UserNote-IDUC"					FOREIGN KEY		(iduserconcerned)				REFERENCES 	usr_user(id),
 	CONSTRAINT	"FK-USR_UserNote-IDUW"					FOREIGN KEY		(iduserwriter)					REFERENCES 	usr_user(id),
 	CONSTRAINT	"UK-USR_UserNote-IDUC_IDUW_DI_TI"		UNIQUE			(iduserconcerned, iduserwriter, datein, timein)
);

CREATE TABLE tra_lang
(	id					SERIAL			NOT NULL,
 	code				VARCHAR(5)		NOT NULL,
 	flag				VARCHAR(4000)	NOT NULL,
 	flagactive			BOOLEAN			NOT NULL,
 	flagdelete			BOOLEAN			NOT NULL,
 	CONSTRAINT	"PK-TRA_Lang-ID"						PRIMARY KEY		(id),
 	CONSTRAINT	"UK-TRA_Lang-Code"						UNIQUE			(code)
);

CREATE TABLE tra_translation
(	id					SERIAL			NOT NULL,
 	idmodule			INT				NOT NULL,
 	idlang				INT				NOT NULL,
 	namepart			VARCHAR(50)		NOT NULL,
 	namefield			VARCHAR(50)		NOT NULL,
 	text				VARCHAR(4000)	NOT NULL,
 	CONSTRAINT	"PK-TRA_Translation-ID"					PRIMARY KEY		(id),
 	CONSTRAINT	"FK-TRA_Translation-IDLang"				FOREIGN KEY		(idlang)						REFERENCES 	tra_lang(id),
 	CONSTRAINT	"FK-TRA_Translation-IDModule"			FOREIGN KEY		(idmodule)						REFERENCES 	mod_module(id),
 	CONSTRAINT	"UK-TRA_Translation-IDM_IDL_NP_NF"		UNIQUE			(idmodule, idlang, namepart, namefield)
);