//******************************************************************************
//* File 				: common-tiserbo.js									   *
//* Language 			: JavaScript										   *
//* Author				: Michaël Defraene									   *
//* Company				: Tiserbo SPRL										   *
//* Creation Date		: 01/09/2018										   *
//* Description :															   *
//*		File with all common function developped by tiserbo					   *
//******************************************************************************

// Global Variables
var modules = [];														/*!< Array with all modules */
var moduleLoaded = "";													/*!< Module loaded */
var addressLink = "/projects/tiserbo.be/coruscante/index.html?"			/*!< Var who contains the main address link */

//******************************************************************************
//*																			   *
//* PART 0 : URL												   			   *
//*																			   *
//******************************************************************************

/*! @brief Retrieve parameters in the URL
 *  This function split the URL and retrieve the params;
 *  @param[in]	param		The name of the parameters you search
 *  @retval	- NULL if the parameter is not found
 *  		- The value of the parameter
 */
function url_getParam(param) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (pair[0] == param)
			return pair[1];
		else
			return null;
	}
}

/*! @brief Retrieve parameters in the URL
 *  This function split the URL and send all params other params (not module and lang)
 *  @retval	Array with - position %2 == 1 ==> name param
 *  					 position %2 == 0 ==> value param
 */
function url_getAllParams() {
	var j = 0;
	var params = [];
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] != "module" && pair[0] != "lang") {
			params[j] = pair[0];
			params[j+1] = pair[1];
			j = j + 2;
		}
	}
	if (params.length == 0) params = null;
	return params;
}

/*! @brief Set the params in the URL
 *  This function set the URL with the params
 *  @param[in]	module		Module loaded
 *  @param[in]	params		Params you want to add to URL
 */
function url_push(module, params) {
	window.history.pushState(module, 'Tiserbo SPRL', addressLink + module + ((params != null && params != "") ? params : ""));
}

/*! @brief Go back in the history of the URL
 *  This function permit to go back in the history of the URL
 */
function url_pop() {
	window.history.back();
}

/*! @brief Load Module from URL
 *	This function load a Module directly from url typed
 */
function url_load() {
	var mod = "-1";
	var pos = 0;
	var module = url_getParam("module");
	var error = url_getParam("error");
	if (module != null && module != "00000" && error == null) {
		for (var i = 0; i < modules.length; i++)
			if (module == modules[i]["callcode"]) {
				var params = url_getAllParams();
				mod = module;
				pos = i;
				break;
			}
	} else if ((module == "00000" || module == null) && error == null)
		mod = "0";
	if (mod == "-1" && error != null) {
		switch (error) {
		case "403":
			return 403;
			break;
		case "500":
			return 500;
			break;
		default:
			return 404;
			break;
		}
	} else if (mod != "0") {
		var params = url_getAllParams();
		modules_set(modules[pos]["name"], params)
	}
}

//******************************************************************************
//*																			   *
//* PART 1 : Modules											   			   *
//*																			   *
//******************************************************************************
/*! @brief Get Modules from XML
*  This function get the modules list from a XML
* 	@param[in]	moduleXML		The XML var what contains the module list
*	@param[in]	nodeName		The name of the node what contains the module list
*/
function modules_get(moduleXML, nodeName) {
	modules = xml2Array(moduleXML, nodeName);
}

/*! @brief Set Module
 *  This function set the module to state active
 *  @param[in]	modName		The name of the module to activate
 *	@param[in]	param		Parameters for the module
 */
function modules_set(modName, param) {
	var trouve = false
	for (var i = 0; i < modules.length; i++)
		if (modules[i]["name"] == modName) {
			trouve = true;
			break;
		}
	if (trouve) {
		moduleLoaded = modName;
		loadModule(modName, param);
	} else {
		moduleLoaded = "";
		return 404;
	}
}

/*! @brief Unset Module
 *  This function set the module to state inactive
 *  @param[in]	modName		The name of the module to deactivate
 */
function modules_unset(modName, newMod, param) {
	var trouve = false
	for (var i = 0; i < modules.length; i++)
		if (modules[i]["name"] == modName) {
			trouve = true;
			break;
		}
	if (trouve) {
		moduleLoaded = "";
	    $('html').find('script[src="modules/' + modName + '/' + modName + '"]').remove();
	}
	if (newMod != null) {
		if (newMod == "error403")
			return 403;
		else if (newMod == "error404")
			return 404;
		else if (newMod == "error500")
			return 500;
		else
			modules_set(newMod, param);
	} else {
		return 0;
	}
}

/*! @brief Loading module in user
 *  This function load the module in user
 *  @param[in]	fctload		Name of the function to load the module
 *  @param[in]	namejs		Name of the script to load the module
 */
function modules_load(modName, param) {
	var fctLoad = "";
	var namejs = "";
	var codeModule = "";
	for (var i = 0; i < modules.length; i++)
		if(modules[i]["name"] == modName) {
			fctLoad = modules[i].fctload;
			namejs = modules[i]["namejs"];
			codeModule = modules[i]["callcode"];
			break;
		}
	if (fctLoad != "" && namejs != "") {
		$.getScript("modules/" + moduleLoaded + "/" + namejs)
			.done(function(){
				var query = "";
				if (param != null)
					for (var j = 0; j < param.length; j = j + 2)
						query = query + "&" + param[j] + "=" + param[j + 1];
				url_push("module=" + codeModule, query);
				var fct = eval(fctLoad);
				fct(param);
			})
			.fail(function(){
				return 404;
		});
	} else {
		return 404;
	}
}

//******************************************************************************
//*																			   *
//* PART 2 : Cookies											   			   *
//*																			   *
//******************************************************************************
/*! @brief Prepare PHP Session Cookie
*  This function prepare the session cookie with the PHP Session ID
* 	@param[in]	rsp		The response of the RPC (session.php)
*/
function cookie_prepareSession(phpSessionID) {
	if (rsp != "TISERROR") {
		if (rsp != null)
			$.cookie("session", phpSessionID, {
				path	:'/'
			});
		session = getCookie("session");
	}
}

/*! @brief Scratch Session
 *  This function scratch the session cookie
 *  @param[in]	rsp		The response of the RPC (logout.php)
 */
function cookie_scratchSession(code, idle) {
	if (code != "-1" && idle == false) {
		$.cookie("session", null, {
			path 		: '/', 
			expires 	: new Date(1)
		});
	}
}