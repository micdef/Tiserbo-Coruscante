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
var modules = [];						/*!< Array with all modules */

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