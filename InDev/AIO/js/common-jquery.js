//******************************************************************************
//* File 				: common-jquery.js									   *
//* Language 			: JavaScript										   *
//* Author				: Michaël Defraene									   *
//* Company				: Tiserbo SPRL										   *
//* Creation Date		: 01/09/2018										   *
//* Description :															   *
//*		File with all common function for HTML								   *
//******************************************************************************

//******************************************************************************
//*																			   *
//* PART 0 : HTML Elements										   			   *
//*																			   *
//******************************************************************************

// Global Variables
var ajx;

/*! @brief Get HTML element
 * 	Function who gets an HTML element by its ID
 * 	@param[in]	el 		ID of the element
 *  @retval	The element the system found
 */
function getElem(el) {
	var type = typeof(el);
	if (type == "string")
		return $("#" + el);
	return el;
}

/*! @brief Generate Element A
 *  Function who generate an HTML element of A type
 * 	@param[in]	className	The value of the attribute "class"
 *  @param[in]	dataToggle	The value of the attribute "dataToggle"
 *  @param[in]	hRef		The value of the attribute "href"
 * 	@param[in]	innerHTML	The value who stands between the markups <a></a>
 *  @param[in]	onClick		The function who'll be executed when you press the button
 * 	@retval The generated element
 */
function generateA(className, dataToggle, hRef, innerHTML, onClick) {
	if (typeof(innerHTML) == "object" || innerHTML == null) 
		var Ihtml = "";
	else
		var Ihtml = innerHTML;
	var a = $('<a />',{
		'class'			: className,
		'data-toggle'	: dataToggle,
		href			: hRef,
		html			: Ihtml,
		click			: onClick
	});
	if (typeof(innerHTML) == "object" && innerHTML != null) a.append(innerHTML);
	return a;
}

/*! @brief Generate Element BUTTON
 *  Function who generate an HTML element of BUTTON type
 * 	@param[in]	className	The value of the attribute "class"
 *  @param[in]	type		The value of the attribute "type"
 * 	@param[in]	innerHTML	The value who stands between the markups <button></button>
 *  @param[in]	onClick		The function who'll be executed when you press the button
 * 	@retval The generated element
 */
function generateBUTTON(className, type, text, onClick) {
	var btn = $('<button />',{
		'class'			: className,
		html			: text,
		'type'			: type,
		click			: onClick
		
	});
	return btn;
}

/*! @brief Generate Element BR
 *  Function who generate an HTML element of BR type
 * 	@retval The generated element
 */
function generateBR() {
	var br = $('<br />', {});
	return br;
}

/*! @brief Generate Element DIV
 *  Function who generate an HTML element of DIV type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@retval The generated element
 */
function generateDIV(className, innerHTML, idDIV) {
	if (typeof(innerHTML) == "object" || innerHTML == null) 
		var Ihtml = "";
	else
		var Ihtml = innerHTML;
	var div = $('<div />', {
		'class'			: className,
		id				: idDIV,
		html			: Ihtml
	});
	return div;
}

/*! @brief Generate Element FORM
 *  Function who generate an HTML element of FORM type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@retval The generated element
 */
function generateFORM(className) {
	var form = $('<form />', {
		'class'			: className
	});
	return form;
}

/*! @brief Generate Element H
 *  Function who generate an HTML element of H type
 *  @param[in]	level		Number between 0-7. It's the HTML header level
 * 	@param[in]	className	The value of the attribute "class"
 * 	@param[in]	innerHTML	The value who stands between the markups <h#></h#>
 * 	@retval The generated element
 */
function generateH(level, className, text) {
	var h = $('<h' + level + ' />', {
		'class'			: className,
		html			: text
	});
	return h;
}

/*! @brief Generate Element HR
 *  Function who generate an HTML element of HR type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@retval The generated element
 */
function generateHR(className) {
	var hr = $('<hr />', {
		'class'			: className
	});
	return hr;
}

/*! @brief Generate Element I
 *  Function who generate an HTML element of I type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@param[in]	innerHTML	The value who stands between the markups <i></i>
 * 	@retval The generated element
 */
function generateI(className, innerHTML) {
	if (typeof(innerHTML) == "object" || innerHTML == null) 
		var Ihtml = "";
	else
		var Ihtml = innerHTML;
	var i = $('<i />',{
		'class'			: className,
		html			: Ihtml
	});
	if (typeof(innerHTML) == "object" && innerHTML != null) i.append(innerHTML);
	return i;
}

/*! @brief Generate Element IMG
 *  Function who generate an HTML element of IMG type
 *  @param[in]	src			The path of the image (Mandatory)
 * 	@param[in]	className	The value of the attribute "class"
 * 	@param[in]	alt			The value of the attribute "alt"
 * 	@retval The generated element
 */
function generateIMG(src, className, alt) {
	var img = $('<img />', {
		'class'			: className,
		src				: src,
		alt				: alt
	});
	return img;
}

/*! @brief Generate Element INPUT
 *  Function who generate an HTML element of INPUT type
 *	@param[in]	type		The value of the attribute "type"
 * 	@param[in]	className	The value of the attribute "class"
 *  @param[in]	id			The value of the attribute "id"
 *  @param[in] 	placeHolder	The value of the attribute "placeholder"
 *  @param[in]	value		The value of the attribute "value"
 * 	@param[in]	innerHTML	The value who stands between the markups <input></input>
 * 	@param[in]	onClick		The function who'll be executed when you press the input
 * 	@retval The generated element
 */
function generateINPUT(typeInput, className, idInput, placeHolder, valueInput, text, onClick, disabled) {
	var input = $('<input />', {
		'class'			: className,
		html			: text,
		type			: typeInput,
		id				: idInput,
		'placeholder'	: placeHolder,
		value			: valueInput,
		click			: onClick
	});
	input.prop('disabled', disabled);
	input.css({'width' : '100%'});
	return input;
}

/*! @brief Generate Element LABEL
 *  Function who generate an HTML element of LABEL type
 *  @param[in]	forID		The value of the attribute "for"
 * 	@param[in]	className	The value of the attribute "class"
 * 	@param[in]	innerHTML	The value who stands between the markups <label></label>
 * 	@retval The generated element
 */
function generateLABEL(forID, className, text) {
	var label = $('<label />', {
		'class'			: className,
		html			: text,
		'for'			: forID 
	});
	return label;
}

/*! @brief Generate Element LI
 *  Function who generate an HTML element of LI type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@param[in]	innerHTML	The value who stands between the markups <li></li>
 * 	@retval The generated element
 */
function generateLI(className, innerHTML, id) {
	if (typeof(innerHTML) == "object" || innerHTML == null) 
		var Ihtml = "";
	else
		var Ihtml = innerHTML;
	var li = $('<li />',{
		'class'			: className,
		html			: Ihtml,
		'id'			: id
	});
	if (typeof(innerHTML) == "object" && innerHTML != null) li.append(innerHTML);
	return li;
}

/*! @brief Generate Element OL
 *  Function who generate an HTML element of OL type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@retval The generated element
 */
function generateOL(className) {
	var ol = $('<ol />', {
		'class'			: className
	});
	return ol;
}

/*! @brief Generate Element OPTION
 *  Function who generate an HTML element of OPTION type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@param[in]	innerHTML	The value who stands between the markups <option></option>
 * 	@param[in] 	value		The value of the attribute "value"
 * 	@retval The generated element
 */
function generateOPTION(className, text, valueOption) {
	var option = $('<option />', {
		'class'			: className,
		html			: text,
		value			: valueOption
	});
	option.prop('disabled', disabled);
	return option;
}

/*! @brief Generate Element P
 *  Function who generate an HTML element of P type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@param[in]	innerHTML	The value who stands between the markups <p></p>
 * 	@retval The generated element
 */
function generateP(className, innerHTML) {
	if (typeof(innerHTML) == "object" || innerHTML == null) 
		var Ihtml = "";
	else
		var Ihtml = innerHTML;
	var p = $('<p />', {
		'class'			: className,
		html			: Ihtml
	});
	if (typeof(innerHTML) == "object" && innerHTML != null) p.append(innerHTML);
	return p;
}

/*! @brief Generate Element SCRIPT
 * 	Function who generate an HTML element of SCRIPT type
 * 	@param[in]	src			The emplacement of the script
 *  @param[in]	id			Unique identifier of the element
 *  @param[in]	type		Type of the script
 * 	@retval	The generated element 
 */
function generateSCRIPT(src, id, type) {
	var script = document.createElement('script');
	script.setAttribute("type", type);
	script.setAttribute("src", src);
	script.setAttribute("id", id);
	return script;
}

/*! @brief Generate Element SECTION
 *  Function who generate an HTML element of SECTION type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@retval The generated element
 */
function generateSECTION(className) {
	var section = $('<section />', {
		'class'			: className
	});
	return section;
}

/*! @brief Generate Element SELECT
 *  Function who generate an HTML element of SELECT type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@param[in]	id			The value of the attribute "id"
 * 	@retval The generated element
 */
function generateSELECT(className, idSelect, disabled) {
	var select = $('<select />', {
		'class'			: className,
		id				: idSelect
	});
	select.prop('disabled', disabled);
	return select;
}

/*! @brief Generate Element SMALL
 *  Function who generate an HTML element of SMALL type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@param[in]	innerHTML	The value who stands between the markups <small></small>
 * 	@retval The generated element
 */
function generateSMALL(className, innerHTML) {
	if (typeof(innerHTML) == "object" || innerHTML == null) 
		var Ihtml = "";
	else
		var Ihtml = innerHTML;
	var small = $('<small />', {
		'class'			: className,
		html			: Ihtml
	});
	if (typeof(innerHTML) == "object" && innerHTML != null) small.append(innerHTML);
	return small;
}

/*! @brief Generate Element SPAN
 *  Function who generate an HTML element of SPAN type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@param[in]	innerHTML	The value who stands between the markups <span></span>
 * 	@retval The generated element
 */
function generateSPAN(className, innerHTML) {
	if (typeof(innerHTML) == "object" || innerHTML == null) 
		var Ihtml = "";
	else
		var Ihtml = innerHTML;
	var span = $('<span />', {
		'class'			: className,
		html			: Ihtml
	});
	if (typeof(innerHTML) == "object" && innerHTML != null) span.append(innerHTML);
	return span;
}

function generateSWITCH(imgON, imgOFF, id, checked, disabled, linkOC, className) {
	var img = generateIMG((checked ? imgON : imgOFF), null, null);
	img.css({'width' : '40px'});
	img.css({'height' : '40px' });
	var link = generateA("nifty-btn nifty-pad-no " + className, null, null, img, linkOC);
	link.attr("id", id);
	if (disabled)
		return img;
	else
		return link;
}

/*! @brief Generate Element TABLE
 *  Function who generate an HTML element of TABLE type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@retval The generated element
 */
function generateTABLE(className) {
	var table = $('<table />', {
		'class'			: className
	});
	return table;
}

/*! @brief Generate Element TBODY
 *  Function who generate an HTML element of TBODY type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@retval The generated element
 */
function generateTBODY(className) {
	var tbody = $('<tbody />', {
		'class'			: className
	});
	return tbody;
}

/*! @brief Generate Element TD
 *  Function who generate an HTML element of TD type
 * 	@param[in]	className	The value of the attribute "class"
 *  @param[in]	innerHTML	The value who stands between the markups <td></td>
 * 	@retval The generated element
 */
function generateTD(className, innerHTML) {
	if (typeof(innerHTML) == "object" || innerHTML == null) 
		var Ihtml = "";
	else
		var Ihtml = innerHTML;
	var td = $('<td />', {
		'class'			: className,
		html			: Ihtml
	});
	if (typeof(innerHTML) == "object" && innerHTML != null) td.append(innerHTML);
	return td;
}

/*! @brief Generate Element TH
 *  Function who generate an HTML element of TH type
 * 	@param[in]	className	The value of the attribute "class"
 *  @param[in]	innerHTML	The value who stands between the markups <th></th>
 * 	@retval The generated element
 */
function generateTH(className, text) {
	var th = $('<th />', {
		'class'			: className,
		html			: text
	});
	return th;
}

/*! @brief Generate Element THEAD
 *  Function who generate an HTML element of THEAD type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@retval The generated element
 */
function generateTHEAD(className) {
	var thead = $('<thead />', {
		'class'			: className
	});
	return thead;
}

/*! @brief Generate Element TR
 *  Function who generate an HTML element of TR type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@retval The generated element
 */
function generateTR(className) {
	var tr = $('<tr />', {
		'class'			: className
	});
	return tr;
}

/*! @brief Generate Element UL
 *  Function who generate an HTML element of UL type
 * 	@param[in]	className	The value of the attribute "class"
 * 	@retval The generated element
 */
function generateUL(className) {
	var ul = $('<ul />', {
		'class' : className
	});
	return ul;
}

//******************************************************************************
//*																			   *
//* PART 1 : XHttpRequest										   			   *
//*																			   *
//******************************************************************************
/*! @brief Create XHR
 *  Function who generate an XHtteRequest (XHR) element
 * 	@retval - NULL if the element cannot be generated
 * 			- The element generated
 */
function getXHR() {
	var xhr = null;
	try {
		xhr=new XMLHttpRequest();
	} catch (e) {
		try {
			xhr=new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e) {
			try {
				xhr = new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e) {
				xhr = null;
			}
		}
	}
	return xhr;
}

/*! @brief Call XHR
 *  Function who initiate the call with the XHR and get back its response
 * 	@param[in]	method		The method will be used to call (GET or POST)
 * 	@param[in]	url			The address of the called RPC
 * 	@param[in]	param		The parameters which will be sent during the call
 * 	@param[in]	typersp		The type of the response (xml or text)
 * 	@param[in] 	callback	The function which will be called when the server has give a response
 * 	@retval The response of the rpc
 */
function callXHR(method, url, param, typersp, callback, error) {
	if (method == "POST") {
		ajx = $.ajax({
			type: method,
			url: url,
			data: param,
			dataType: typersp,
			cache: false,
			timeout: 5000,
			async: true,
			success: function(rsp) {
				callback(rsp);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});	
	} else {
		ajx = $.ajax({
			type: method,
			url: url + "?" + param,
			dataType: typersp,
			cache: false,
			timeout: 5000,
			async: true,
			success: function(rsp) {
				callback(rsp);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});	
	}
	
}

//******************************************************************************
//*																			   *
//* PART 2 : Cookies											   			   *
//*																			   *
//******************************************************************************
/*! @brief Get Cookie Value
 *  Function who get the value of cookie
 * 	@param[in]	cname		The name of the cookie
 * 	@retval - Empty string if the cookie isn't found
 * 			- The value of the cookie
 */
function getCookie(cname) {
	return $.cookie(cname);
}

/*! @brief Check if cookie is set
 *  Function who check if the cookie is set
 * 	@param[in]	cname		The name of the cookie
 * 	@retval - True if the cookie is set
 * 			- False if the cookis is not set
 */
function isSetCookie(cname) {
    var val = getCookie(cname);
    if (val != "" && typeof(val) !== 'undefined')
        return true;
    else
        return false;
}

//******************************************************************************
//*																			   *
//* PART 3 : XML												   			   *
//*																			   *
//******************************************************************************
/*! @brief Transform XML file to Array
*  Function who transforms the XML file to an Associative array
*  param[in]	xml			XML file
*  param[in]	nodeName	The name of the node who encapsulate infos nodes
*  retval Associative array
*/
function xml2Array(xml, nodeName) {
	var tab = [];
	var rsp = xml.getElementsByTagName(nodeName);
	for (var i = 0; i < rsp.length; i++) {
		tab[i] = [];
		var nodes = rsp[i].childNodes;
		for (var j = 0; j < nodes.length; j++)
			if (nodes[j].nodeType == 1) {
				var el = nodes[j];
				tab[i][el.nodeName] = (el.firstChild != null ? el.firstChild.nodeValue : "");
			}
	}
	return tab;
}

//******************************************************************************
//*																			   *
//* PART 4 : Text												   			   *
//*																			   *
//******************************************************************************

/*!	@brief Changes Brackets to Diamond
 * 	Function change the brackets elements to diamond elements to have an HTML element
 * 	param[in]	str			The string who contains html elements
 */
function brackets2Diamond(str) {
	var str2 = str.split("[").join("<");
	var text = str2.split("]").join(">");
	return text;
}