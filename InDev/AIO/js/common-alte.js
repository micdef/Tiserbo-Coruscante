//******************************************************************************
//* File 				: common-alte.js									   *
//* Language 			: JavaScript										   *
//* Author				: Michaël Defraene									   *
//* Company				: Tiserbo SPRL										   *
//* Creation Date		: 01/09/2018										   *
//* Description :															   *
//*		File with all common function for adminLTE							   *
//******************************************************************************

//******************************************************************************
//*																			   *
//* PART 0 : Elements											   			   *
//*																			   *
//******************************************************************************
/*! @brief Generate Input ALTE Element
*  Function who generate an HTML element of INPUT type, with all necessary for AdminLTE
*  @param[in]	type		The type of the input
*  @param[in]	id			The id of the element
*  @param[in]	text		The label text
*  @param[in]	placeholder	The default text in the element
*  @param[in]	el			The array with all countries (used only for phone field)
*  @param[in]	sizeLabel	The size of the label (in columns)
*  @param[in]	sizeControl The size of the control (in columns)
*  @retval The DIV generated
*/
function alte_generateINPUT(type, id, text, placeholder, el, sizeLabel, offsetLabel, sizeControl, offsetControl, disable) {
	var generalDIV = generateDIV("form-group");
	var generalLABEL = generateLABEL(id, "col-sm-" + sizeLabel + (offsetLabel > 0 ? " col-sm-offset-" + offsetLabel : "") + " control-label", text);
	generalLABEL.css({'display': 'inline-block'});
	generalLABEL.css({'vertical-align' : 'middle'});
	if (type != "tel") {
		var inputDIV = generateDIV("col-sm-" + sizeControl + (offsetControl > 0 ? " col-sm-offset-" + offsetControl : ""));
		var input = generateINPUT(type, "form-control", id, placeholder, null, null, null);
		if (disable) input.disable = disable;
		inputDIV.append(input);
		generalDIV.append(generalLABEL);
		generalDIV.append(inputDIV);
	} else {
		var tel = placeholder.split(" ");
		var selectDIV = generateDIV("col-sm-4");
		var select = generateSELECT("form-control", id + "_select");
		for (var i = 0; i < el.length; i++) {
			var option = generateOPTION(null, el[i]["code"] + " - " + el[i]["intercode"], el[i]["code"]);
			if (tel[0] == el[i]["intercode"]) option.prop("selected", true);
			select.append(option);
		}
		var inputDIV = generateDIV("col-sm-5");
		var input = generateINPUT(type, "form-control", id, tel[1], null, null, null);
		inputDIV.append(input);
		selectDIV.append(select);
		generalDIV.append(generalLABEL);
		generalDIV.append(selectDIV);
		generalDIV.append(inputDIV);
	}
	return generalDIV;
}

/*! @brief Generate Radio ALTE Element
*  Function who generate an HTML element of RADIO type, with all necessary for AdminLTE
*  @param[in]	id			The id of the element
*  @param[in]	text		The label text
*  @param[in]	groupName	The name of the group where the radio buttons are stocked
*  @param[in]	radLabels	The array with labels of the radio buttons
*  @param[in]	radValues	The array with values of the radio buttons
*  @param[in]	radIDs		The array with ID of the radio buttons
*  @param[in]	radChecked	The array who said if the radio button is checked or not
*  @retval The DIV generated
*  All the 4 arrays (@radLabels, @radValues, @radIDs, @radChecked) must be have exactly the same size
*/
function alte_generateRADIO(id, text, groupName, radLabels, radValues, radIDs, radChecked, sizeLabel, sizeOffsetLabel, sizeRadio, sizeOffsetRadio, disable) {
	var generalDIV = generateDIV("form-group");
	var generalLABEL = generateLABEL(id, "col-sm-" + sizeLabel + (sizeOffsetLabel > 0 ? " col-sm-offset-" + sizeOffsetLabel : "") + " control-label", text);
	generalLABEL.css({'display' : 'inline-block'});
	generalLABEL.css({'vertical-align' : 'middle'});
	generalDIV.append(generalLABEL);
	for (var i = 0; i < radIDs.length; i++) {
		if (i == 0)
			var radio = generateDIV("col-sm-" + sizeRadio + (sizeOffsetRadio > 0 ? " col-sm-offset-" + sizeOffsetRadio : "") + " radio");
		else
			var radio = generateDIV("col-sm-" + sizeRadio + (sizeOffsetRadio > 0 ? " col-sm-offset-" + (sizeOffsetRadio + sizeLabel + sizeOffsetLabel) : "") + " radio");
		if (disable) radio.disable = disable;
		var label = generateLABEL(null, null, radLabels[i]);
		var input = generateINPUT("radio", null, radIDs[i], null, radValues[i], null, null);
		if (disable) input.disable = disable;
		if (radChecked[i] == 1) input.prop("checked", "true");
		input.attr("name", groupName);
		var fc = label.children(":first");
		input.insertBefore(fc);
		radio.append(label);
		generalDIV.append(radio);
	}
	return generalDIV;
}

/*! @brief Generate CheckBox ALTE Element
*  Function who generate an HTML element of CHECKBOX type, with all necessary for AdminLTE
*  @param[in]	id			The id of the element
*  @param[in]	text		The label text
*  @param[in]	checked		Element is checked or not
*  @retval The DIV generated
*/
function alte_generateCHECKBOX(id, text, checked, onChange) {
	var generalDIV = generateDIV("form-group");
	var placementDIV = generateDIV("col-sm-offset-3 col-sm-9");
	var check = generateDIV("checkbox");
	var checkLabel = generateLABEL(null, null, text);
	var checkInput = generateINPUT("checkbox", null, id, null, null, null, null);
	if (onChange != null) checkInput.click = onChange;
	if (checked) checkInput.prop("checked", true);
	var fc = checkLabel.children(":first");
	checkInput.insertBefore(fc);
	check.append(checkLabel);
	placementDIV.append(check);
	generalDIV.append(placementDIV);
	return generalDIV;
}

function alte_generateSWITCH(id, text, checked, onClick, sizeLabel, sizeOffsetLabel, sizeSwitch, sizeOffsetSwitch, disable) {
	var generalDIV = generateDIV("form-group");
	var generalLABEL = generateLABEL(id, "col-sm-" + sizeLabel + (sizeOffsetLabel > 0 ? " col-sm-offset-" + sizeOffsetLabel : "") + " control-label", text);
	generalLABEL.setAttribute("style", "display:inline-block; vertical-align:middle");
	generalDIV.append(generalLABEL);
	var inputSwitch = generateDIV("col-sm-" + sizeSwitch + (sizeOffsetSwitch > 0 ? " col-sm-offset-" + sizeOffsetSwitch : "") + " radio");
	var imgSwitch = generateIMG("modules/adminpanel/img/" + (checked ? "checked.png" : "unchecked.png"), null, null);
	imgSwitch.css({'width' : '40px'});
	imgSwitch.css({'heigth' : '40px'});
	if (!disable) var linkSwitch = generateA("nifty-btn", null, null, imgSwitch, onClick);
	if (disable) inputSwitch.append(imgSwitch);
	if (!disable) inputSwitch.append(linkSwitch);
	generalDIV.append(inputSwitch);
	return generalDIV;
}

/*! @brief Generate ComboBox ALTE Element
*  Function who generate an HTML element of COMBOBOX type, with all necessary for AdminLTE
*  @param[in]	id			The id of the element
*  @param[in]	text		The label text
*  @param[in]	el			Array with all the options in the combobox
*  @retval The DIV generated
*/
function alte_generateCOMBOBOX(id, text, el, sizeLabel, sizeOffsetLabel, sizeControl, sizeOffsetControl, disable) {
		var generalDIV = generateDIV("form-group");
		var placementDIV = generateDIV("col-sm-" + sizeLabel + (sizeOffsetLabel > 0 ? " col-sm-offset-" + sizeOffsetLabel : ""));
		var label = generateLABEL(id, "col-sm-" + sizeControl + (sizeOffsetControl > 0 ? " col-sm-offset-" + sizeOffsetControl : "") + " control-label", text);
		label.css({'display' : 'inline-block'});
		label.css({'vertical-align' : 'middle'});
		var select = generateSELECT("form-control", id);
		if (disable) select.disable = disable
		for (var i = 0; i < el.length; i++) {
			var option = generateOPTION(null, el[i]);
			select.append(option);
		}
		placementDIV.append(select);
		generalDIV.append(label);
		generalDIV.append(placementDIV);
		return generalDIV;
}

//******************************************************************************
//*																			   *
//* PART 1 : Boxes												   			   *
//*																			   *
//******************************************************************************
/*! @brief Generate ALTE Element - Horizontal Box
*  Function who generate an ALTE element of Box type in Horizontal orientation
*  @param[in]	title			The title of the box
*  @param[in]	bodyControls1	Array with all the controls of the 1st part of the body
*  @param[in]	formControls	Array with all the controls of the form
*  @param[in]	bodyControls2	Array with all the controls of the 2nd part of the body
*  @param[in]	footerControls	Array with all the controls of the footer
*  @retval The DIV generated
*/
function alte_generateBOX_horizontal(title, bodyControls1, formControls, bodyControls2, footerControls, table, bodyLabels, bodyControls) {
	
	// DIV
	var generalDIV = generateDIV("box box-danger");
	
	// Header
	var header = generateDIV("box-header with-border");
	header.append(generateH(3, "box-title", title));
	
	// Body
	var body = generateDIV("box-body");
	if (!table) {
		if (bodyControls1 != null)
			for (var i = 0; i < bodyControls1.length; i++)
				body.append(bodyControls1[i]);
		if (formControls != null) {
			var form = generateFORM("form-horizontal");
			for (var i = 0; i < formControls.length; i++)
				form.append(formControls[i]);
			body.append(form);
		}
		if (bodyControls2 != null)
			for (var i = 0; i < bodyControls2.length; i++)
				body.append(bodyControls2[i]);
	} else {
		var tableDIV = generateDIV("table-responsive");
		var table = generateTABLE("table no-margin");
		for (var i = 0; i < bodyControls.length; i++) {
			var tr = generateTR(null);
			var td = generateTD("col-sm-6", bodyLabels[i]);
			td.attr("valign", "middle");
			td.css({'padding-top' : '5px'});
			td.css({'padding-bottom' : '5px'});
			var td2 = generateTD("col-sm-6", null);
			td2.append(bodyControls[i]);
			td2.attr("valign", "middle");
			td2.css({'padding-top' : '5px'});
			td2.css({'padding-bottom' : '5px'});
			tr.append(td);
			tr.append(td2);
			table.append(tr);
		}
		tableDIV.append(table);
		body.append(tableDIV);
	}
	
	// Footer
	var footer = generateDIV("box-footer");
	if (footerControls != null)
		for (var i = 0; i < footerControls.length; i++) 
			footer.append(footerControls[i]);
	
	// Mise en place de la DIV
	generalDIV.append(header);
	generalDIV.append(body);
	generalDIV.append(footer);
	
	// Retour de la fonction
	return generalDIV;
		
}

/*! @brief Generate ALTE Element - List Box
*  Function who generate an ALTE element of Box type for lists
*  @param[in]	title			The title of the box
*  @param[in]	tools			Show tools or not
*  @param[in]	el				Array with all elements for the HTML table
*  @param[in]	elTitles		Array with all headers for the HTML table
*  @param[in]	footerControls	Array with all the controls of the footer
*  @param[in]	fullsize		The box take all the width of the page or not
*  @param[in]	show			The box is showned or not
*  @retval The DIV generated
*/
function alte_generateBOX_list(title, tools, el, elTitles, footerControls, fullsize, show) {
	
	// DIV FULL SIZE
	if (fullsize) var boxDIV = generateDIV("col-md-12");
	
	// DIV
	var generalDIV = generateDIV("box box-danger");
	
	// Header
	var header = generateDIV("box-header with-border");
	header.append(generateH(3, "box-title", title));
	if (tools) {
		var toolsDIV = generateDIV("box-tools pull-right");
		var toolsCollapse = generateBUTTON("btn btn-box-tool", "button", null, null);
		toolsCollapse.attr("data-widget", "collapse")
		if (show) 
			var toolsCollapseI = generateI("fa fa-minus", null);
		else 
			var toolsCollapseI = generateI("fa fa-plus", null);
		toolsCollapse.append(toolsCollapseI);
		toolsDIV.append(toolsCollapse);
		header.append(toolsDIV);
	}
	
	// Table
	var tableDIV = generateDIV("table-responsive");
	var table = generateTABLE("table no-margin");
	var thead = generateTHEAD(null);
	var theadRow = generateTR(null);
	for (var i = 0; i < elTitles.length; i++) {
		th = generateTH(null, elTitles[i]);
		theadRow.append(th);
	}
	var tbody = generateTBODY(null);
	for (var i = 0; i < el.length; i++) {
		tbodyRow = generateTR(null);
		for (var j = 0; j < elTitles.length; j++) {
			if (typeof(el[i][j]) != "object") {
				td = generateTD(null, el[i][j]);
				td.attr("valign", "middle");
			} else {
				td = generateTD(null, null);
				td.append(el[i][j]);
				td.attr("valign", "middle");
			}
			tbodyRow.append(td);
		}
		tbody.append(tbodyRow);
	}
	thead.append(theadRow);
	table.append(thead);
	table.append(tbody);
	tableDIV.append(table);
	
	// Body
	var body = generateDIV("box-body");
	if (show)
		body.css({'display' : 'block'});
	else
		body.css({'display' : 'none'});
	body.append(tableDIV);
	
	// Footer
	var footer = generateDIV("box-footer clearfix");
	if (show) 
		footer.css({'display' : 'block'});
	else
		footer.css({'display' : 'none'});
	if (footerControls != null)
		for (var i = 0; i < footerControls.length; i++)
			if (i == 0)
				footer.append(footerControls[i]);
			else {
				var ctrl = footerControls[i];
				ctrl.css({'margin-top' : '1%'});
				ctrl.css({'text-align' : 'center'});
				footer.append(ctrl);
			}
	
	// Mise en place de la DIV
	generalDIV.append(header);// Mise en place de la DIV
	generalDIV.append(header);
	generalDIV.append(body);
	generalDIV.append(footer);
	generalDIV.append(body);
	generalDIV.append(footer);
	
	// Retour de la fonction
	if (fullsize) {
		boxDIV.append(generalDIV);
		return boxDIV;
	} else {
		return generalDIV;
	}
}

/*! @brief Generate ALTE Element - Address Box
*  Function who generate an ALTE element of Box type for addresses
*  @param[in]	title			The title of the box
*  @param[in]	addr			Array with all the address informations
*  @param[in]	fullcolor		The header a plain color or just top line
*  @retval The DIV generated
*/
function alte_generateBOX_address(title, addr, fullcolor) {
	
	// Division générale
	var generalDIV = generateDIV("col-sm-3");
	var boxDIV = generateDIV("box box-primary" + (fullcolor ? " box-solid" : ""));
	
	// Header
	var header = generateDIV("box-header with-border");
	header.append(generateH(3, "box-title", title));
	var toolsDIV = generateDIV("box-tools pull-right");
	var btnDel = generateBUTTON("btn btn-box-tool", "button", null, onClick);
	btnDel.attr("id", "btn_addr_" + title + "_del");
	btnDel.attr("data-widget", "remove");
	var btnDelI = generateI("fa fa-times", null);
	btnDel.append(btnDelI);
	toolsDIV.append(btnDel);
	header.append(toolsDIV);
	
	// Body
	var body = generateDIV("box-body");
	var countryName = generateP(null, addr["countryName"]);
	if (addr["countryCode"] != "ZZZ"){
		var countryFlag = generateIMG("tiserbo/img" + flag[(flag.indexOf(addr["countryCode"]) + 2)], null, null);
		var fc = countryName.children(":first");
		countryFlag.insertBefore(fc);
	}
	body.append(countryName);
	body.append(generateP(null, addr["state"]));
	body.append(generateP(null, addr["zipcode"]));
	body.append(generateP(null, addr["city"]));
	body.append(generateP(null, addr["street"]));
	body.append(generateP(null, addr["number"]));
	body.append(generateP(null, addr["box"]));
	
	// Regroupement
	boxDIV.append(header);
	boxDIV.append(body);
	generalDIV.append(boxDIV);
	
	// Retour de la fonction
	return generalDIV;
	
}

function alte_generateBOX_fullColor(size, leftLine, colorTitle, colorBox, type, titleImg, titleText, text, tabFont, tabEl) {
	
	// Division générale
	var generalDIV = generateDIV("col-md-" + size);
	
	// Title
	var titText = generateH(1, "headline text-" + colorTitle, titleText);
	if (titleImg != null) {
		var titImg = generateIMG("&nbsp&nbsp" + titleImg, null, null);
		titImg.css({'width' : '64px'});
		titImg.css({'height' : '64px'});
		var fc = titText.children(":first");
		titImg.insertBefore(fc);
	}
	var titBR = document.createElement('br');
	
	// Body
	var bodyDIV = generateDIV((leftLine ? "callout callout-" : "alert alert-") + (colorBox == "green" ? "success" : (colorBox == "yellow" ? "warning" : (colorBox == "blue" ? "info" : "danger"))));
	var bodyH4 = generateH(4, null, titleText);
	var bodyI = generateI("fa fa-" + type);
	var fc2 = bodyH4.children(":first");
	bodyI.insertBefore(fc2);
	var bodyP = generateP(null, text);
	var bodyTable = generateTABLE(null);
	for (var i = 0; i < tabEl.length; i++) {
		var tr = generateTR(null);
		if (tabFont != null) {
			var td1 = generateTD(null, null);
			td1.css({'padding-right' : '5px'});
			var i1 = generateI("fa fa-" + tabFont[i]);
			td1.append(i1);
			tr.append(td1);
		}
		var td2 = generateTD(null, null);
		switch (tabEl[i]["type"]) {
		case "tel":
			var a = generateA(null, null, "callto:" + tabEl[i]["value"].replace(/ /g,""), tabEl[i]["text"], null);
			td2.append(a);
			break;
		case "mail":
			var a = generateA(null, null, "mailto:" + tabEl[i]["value"], tabEl[i]["text"], null);
			td2.append(a);
			break;
		case "http":
			var a = generateA(null, null, "http://" + tabEl[i]["value"], tabEl[i]["text"], null);
			td2.append(a);
			break;
		case "https":
			var a = generateA(null, null, "https://" + tabEl[i]["value"], tabEl[i]["text"], null);
			td2.append(a);
			break;
		default:
			td2 = generateTD(null, tabEl[i]["text"]);
			break;
		}
		tr.append(td2);
		bodyTable.append(tr);
	}
	bodyDIV.append(bodyH4);
	bodyDIV.append(bodyP);
	bodyDIV.append(bodyTable);
	
	// Regroupement
	generalDIV.append(titText);
	generalDIV.append(titBR);
	generalDIV.append(bodyDIV);
	
	// Retour de la fonction
	return generalDIV;
	
}

//******************************************************************************
//*																			   *
//* PART 2 : Specials											   			   *
//*																			   *
//******************************************************************************

/*! @brief Generate ALTE Page Header
* 	Function who generate the AdminLTE section for the Header of the page
* 	@param[in]	section		Which section we are in
* 	@param[in]	subSection	Which subSection in we are in
* 	@param[in]	el			Array who contains each part of the navigation
* 	@param[in]	elOC		Array who containe each OnClick function for each element
* 	@retval The generated SECTION
*/
function generateALTE_MainHeader(section, subSection, el, elOC) {
	
	// Section
	var generalSECTION = generateSECTION("content-header");
	
	// Title
	var title = generateH(1, null, section);
	var titleSMALL = generateSMALL(null, subSection);
	title.append(titleSMALL);
	
	// Links
	var links = generateOL("breadcrumb");
	for (var i = 0; i < el.length - 1; i++) {
		linksLI = generateLI(null, null)
		linksA = generateA(null, null, null, el[i], elOC[i]);
		if (i == 0) {
			linksALI = generateLI("fa fa-dashboard", null);
			var fc = linksA.children(":first");
			linksALI.insertBefore(fc);
		}
		linksLI.append(linksA);
		links.append(linksLI);
	}
	linksSubLI = generateLI("active", el[el.length - 1]);
	links.append(linksSubLI);
	
	// Regroupement de la section
	generalSECTION.append(title);
	generalSECTION.append(links);
	
	// Retour de la fonction
	return generalSECTION;
}

//******************************************************************************
//*																			   *
//* PART 3 : NavBarTop (NBT)									   			   *
//*																			   *
//******************************************************************************
/*! @brief Generate DropDown ALTE Element
*  Function who generate an HTML element of DropDown type, with all necessary for AdminLTE
*  @param[in]	type		Type of the dropdown
*  @param[in]	el			Array with all elements
*  @param[in]	elSender	Array with all sender (Only used for messages)
*  @param[in]	elTime		Array with all send time (Only used for messages)
*  @param[in]	elCat		Array with all categories (Only used for notifications)
*  @param[in]	elTimeLeft	Array with all time left (Only used for notifications)
*  @param[in]	elPCT		Array with all percentages (Only used for tasks)
*  @param[in]	trad		Array with all translation elements
*  @retval The LI generated
*/
function alteNBT_generateDROPDOWN(type, el, elSender, elTime, elCat, elTimeLeft, elPCT, elOC, trad) {
	
	// Génération du tableau des icones
	var tabIco = {"messages" : "fa fa-envelope-o",
				  "notifications" : "fa fa-bell-o",
				  "tasks" : "fa fa-flag-o",
				  "cart" : "fa fa-shopping-cart",
				  "languages" : "fa fa-globe",
				  "adminpanel" : "fa fa-gear"};
	
	// Génération du tableau des types
	var tabTypes = { "messages" : "dropdown messages-menu",
					 "notifications" : "dropdown notifications-menu",
					 "tasks" : "dropdown tasks-menu",
					 "cart" : "dropdown notifications-menu",
					 "languages" : "dropdown notifications-menu",
					 "adminpanel" : "dropdown notification-menu"};
	
	// LI 
	var generalLI = generateLI(tabTypes[type]);
	
	// Icone
	var icon = generateA("dropdown-toggle", "dropdown", "#", null, null);
	var iconI = generateI(tabIco[type], null);
	if (type != "languages") var iconSPAN = generateSPAN((el.length > 0 ? "label label-warning" : "label label-success"), el.length);
	icon.append(iconI);
	if (type != "languages") icon.append(iconSPAN);
	
	// Menu UL
	var menuUL = generateUL("dropdown-menu");
	
	// Menu Header
	if (type != "languages")
		var menuHeader = generateLI("header", (el.length > 0 ? trad["alte_nbt_" + type + "_count1"] + el.length + trad["alte_nbt_" + type + "_count2"] : 
								trad["alte_nbt_" + type + "_noitem"]));
	else
		var menuHeader = generateLI("header");
	
	// Menu Body
	var menuBody = generateLI(null, null);
	var menuBodyUL = generateUL("menu");
	if (el.length > 0) {
		for (var i = 0; i < el.length; i++) {
			var item = generateLI(null, null);
			var itemA = generateA(null, null, null, null, elOC[i]);
			switch (type) {
			case "messages":
				var itemH4 = generateH(4, null, elSender[i]);
				var itemSMALL = generateSMALL(null, elTime[i]);
				var itemI = generateI("fa fa-clock-o");
				var itemP = generateP(null, el[i]);
				itemSMALL.insertBefore(itemI, itemSMALL.firstChild);
				itemH4.append(itemSMALL);
				itemA.append(itemH4);
				itemA.append(itemP);
				break;
				
			case "notifications":
				var itemI = generateI(elCat[i] + " text-" + elTimeLeft[i]);
				itemA.innerHTML = el[i];
				itemA.insertBefore(itemI, itemA.firstChild);
				break;
				
			case "tasks":
				var itemH3 = generateH(3, null, el[i]);
				var itemSMALL = generateSMALL("pull-right", elpct[i] + "%");
				var itemDIV1 = generateDIV("progress xs");
				var itemDIV2 = generateDIV("progress-bar progress-bar-yellow");
				var itemSPAN = generateSPAN("sr-only", elpct[i] + "% " + trad["alte_nbt_" + type + "_status"]);
				itemDIV2.setAttribute("style", "width: 80%");
				itemDIV2.setAttribute("role", "progressbar");
				itemDIV2.setAttribute("aria-valuenow", elpct[i]);
				itemDIV2.setAttribute("aria-valuemin", "0");
				itemDIV2.setAttribute("aria-valuemax", "100");
				itemDIV2.append(itemSPAN);
				itemDIV1.append(itemDIV1);
				itemH3.append(itemSMALL);
				itemA.append(itemH3);
				itemA.append(itemDIV1);
				break;
				
			case "cart":
				var itemI = generateI(elCat[i] + " text-black");
				itemA.innerHTML = el[i];
				itemA.insertBefore(itemI, itemA.firstChild)
				break;
				
			case "languages":
				var itemIMG = generateIMG("tiserbo/img/" + el[i] + ".png", "img-circle", "Language French");
				itemIMG.setAttribute("style", "width:20px;height:20px;");
				itemA.innerHTML = trad[el[i]];
				itemA.insertBefore(itemIMG, itemA.firstChild);
				break;
			}
			item.append(itemA);
			menuBodyUL.append(item);
		}
		menuBody.append(menuBodyUL);
	}
	
	// Menu Footer
	if (type != "languages") {
		var menuFooter = generateLI("footer", null);
		var menuFooterA = generateA(null, null, "#", trad["alte_nbt_" + type + "_footer"], null);
		menuFooter.append(menuFooterA);
	} else
		var menuFooter = generateLI("footer", null);
	
	// Regroupement du menu
	menuUL.append(menuHeader);
	menuUL.append(menuBody);
	menuUL.append(menuFooter);
	
	// Regroupement LI
	generalLI.append(icon);
	generalLI.append(menuUL);
	
	// Retour de la fonction
	return generalLI;
	
}

//******************************************************************************
//*																			   *
//* PART 4 : SideBarLeft (SBL)									   			   *
//*																			   *
//******************************************************************************
/*! @brief Generate Treeview ALTE Element
*  Function who generate an HTML element of Treeview type, with all necessary for AdminLTE
*  @param[in]	el			Array with all elements
*  @param[in]	subEl		Array with all sub elements
*  @param[in]	elOC		Array with all function for each element when we click on it
*  @param[in]	elSubOC		Array with all function for each sub ealement when we click on it
*  @param[in]	elID		Array with all ID of each element
*  @retval The UL generated
*/
function alteSBL_generateTREEVIEW(el, subEl, elOC, elSubOC, elID) {
	
	// UL
	var generalUL = generateUL("sidebar-menu");
	
	// Title
	var title = generateLI("header", el[el.indexOf("title") + 1]);
	generalUL.append(title);
	
	// Catalog
	for (var i = 4; i < el.length; i = i + 4) {
		var item = generateLI("treeview", null);
		item.attr("id", elID[i/4]);
		var itemA = generateA(null, null, null, null, elOC[i/4]);
		var itemI = generateI("fa " + el[i+2], null);
		var itemSPAN1 = generateSPAN(null, el[i+1]);
		var itemSPAN2 = generateSPAN("pull-right-container");
		if (subEl.indexOf(el[i]) != -1) {
			var itemUL = generateUL("treeview-menu");
			var itemSPAN2I = generateI("fa fa-angle-left pull-right");
			itemSPAN2.append(itemSPAN2I);
			for (var j = 0; j < subEl.length; j = j + 5)
				if (subEl[j] == el[i]) {
					var subItemLI = generateLI(null, null);
					var subItemA = generateA(null, null, null, subEl[j + 2], elSubOC[j/5]);
					var subItemI = generateI("fa " + subEl[j + 3], null)
					var fc = subItemA.children(":first");
					subItemI.insertBefore(fc);
					subItemLI.append(subItemA);
					itemUL.append(subItemLI);
				}
		}
		itemA.append(itemI);
		itemA.append(itemSPAN1);
		itemA.append(itemSPAN2);
		item.append(itemA);
		if (subEl.indexOf(el[i]) != -1) item.append(itemUL);
		generalUL.append(item);
	}
	
	// Retour de la fonction
	return generalUL;
}