
function getQueryParam(pname){
	let value = location.search.match(new RegExp("[\?\&]" + pname + "=([^\&]*)(\&?)","i"));
	return value ? value[1] : value;

}

export Url = {
	QueryParam : getQueryParam;
}