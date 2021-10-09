
function ensureUrlOfInput(id, resetIfEmpty) {
    var element = document.getElementById(id);
    var str = element.value;
    if (str == null || str.length == 0) {
        if (resetIfEmpty == true)
            element.value = "http://";
        return;
    }
    else if (str.startsWith("http://") || str.startsWith("https://"))
        return;
    element.value = "http://" + str;
}

function ensureUrl(str) {
    if (str == null || str == undefined || str.length == 0)
        return null;
    else if (str.startsWith("http://") || str.startsWith("https://"))
        return str;
    return "http://" + str;
}

///////////// BrowserUtility

function getQueryParm(key) {
    //const query = window.location.search.substring(1);
    //const vars = query.split("&");
    //for (let i = 0; i < vars.length; i++) {
    //    const pair = vars[i].split("=");
    //    if (pair[0] == variable) { return pair[1]; }
    //}
    //return (false);

    const url = new URL(window.location.href);
    return url.searchParams.get(key);
}

function getQueryParmOfBool(key) {
    const strValue = getQueryParm(key);
    if (!strValue)
        return false;

    const lower = strValue.toLowerCase();
    return lower === "true" || strValue === "1";
}

function getQueryParmOfInt(keys, redix = 10) {
    let strValue = "";
    for (let i = 0; i < keys.length; i++) {
       strValue = getQueryParm(keys[i]);
       if (strValue && strValue.length > 0){ break; }
    }
    
    if (!strValue || strValue.length === 0)
        return 0;

    const result = Number.parseInt(strValue);
    return result;
}