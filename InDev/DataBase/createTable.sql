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

INSERT INTO sys_module (name, descr, callcode, fctload, namejs, flagactive, flagmaintenant, flagdelete) VALUES ('accueil', 'Module présentation produit et entreprise', '00000', 'accueil_load', 'accueil.js', true, true, false, false);
INSERT INTO sys_module (name, descr, callcode, fctload, namejs, flagactive, flagmaintenant, flagdelete) VALUES ('user', 'Module de gestion des utilisateurs', '00001', 'user_load', 'user.js', true, true, false, false);

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
 	CONSTRAINT	"FK-USR_UserGroup-IDUser"				FOREIGN KEY		(iduser)						REFERENCES usr_user(id),
 	CONSTRAINT	"FK-USR_UserGroup-IDGroup"				FOREIGN KEY		(idgroup)						REFERENCES usr_group(id)
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
 	CONSTRAINT	"FK-USR_GroupRight-IDGroup"				FOREIGN KEY		(idgroup)						REFERENCES usr_group(id),
 	CONSTRAINT	"FK-USR_GroupRight-IDRight"				FOREIGN KEY		(idright)						REFERENCES usr_right(id)
);

CREATE TABLE usr_userright
(	iduser				INT				NOT NULL,
 	idright				INT				NOT NULL,
 	flaginsert			BOOLEAN			NOT NULL,
 	flagupdate			BOOLEAN			NOT NULL,
 	flagdelete			BOOLEAN			NOT NULL,
 	CONSTRAINT	"PK-USR_UserRight-IDU_IDR"				PRIMARY KEY		(iduser, idright),
 	CONSTRAINT	"FK-USR_UserRight-IDUser"				FOREIGN KEY		(iduser)						REFERENCES usr_user(id),
 	CONSTRAINT	"FK-USR_UserRight-IDRight"				FOREIGN KEY		(idright)						REFERENCES usr_right(id)
);