var session;
var mainPage;
var sideBarLeft;
var navBarTop;

function init() {
	mainPage = $("#tis_wrapper");
	sideBarLeft = $("#tis_sidebarleft");
	navBarTop = $("#tis_navbartop");
	if (!isSetCookie("session"))
		callXHR("GET", "http://127.0.0.1:8080/projects/tiserbo.be/coruscante/php/modules/base/session.php", null, "text", cookie_prepareSession, null);
	else
		cookie_prepareSession(null);
}

function uninit() {
	
}

window.onpopstate = url_pop;
window.onunload = uninit;
window.onload = init;