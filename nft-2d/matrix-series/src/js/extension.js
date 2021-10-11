String.prototype.startsWith = function (str) {
    var t = this; return t.indexOf(str) == 0;
};

String.prototype.endsWith = function (str) {
    var t = this; return t.substring(t.length - str.length, t.length) == str;
};

String.prototype.contains = function (t) { return this.indexOf(t) >= 0 ? true : false; };