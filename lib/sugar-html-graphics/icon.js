define(function () {
    var icon = {};

    icon.load = function (iconInfo, callback) {
        var source;
        var dataHeader = "data:image/svg+xml,";

        if ("uri" in iconInfo) {
            source = iconInfo.uri;
        }
        else if ("name" in iconInfo) {
            source = "lib/sugar-html-graphics/icons/" + iconInfo.name + ".svg";
        }

        var fillColor = iconInfo.fillColor;
        var strokeColor = iconInfo.strokeColor;

        // If source is already a data uri, read it instead of doing
        // the XMLHttpRequest
        if (source.substring(0, 4) == 'data') {
            var iconData = source.slice(dataHeader.length);
            iconData = unescape(iconData);
            var re;

            if (fillColor) {
                re = /(<!ENTITY fill_color ")(.*)(">)/;
                iconData = iconData.replace(re, "$1" + fillColor + "$3");
            }

            if (strokeColor) {
                re = /(<!ENTITY stroke_color ")(.*)(">)/;
                iconData = iconData.replace(re, "$1" + strokeColor + "$3");
            }

            callback(dataHeader + escape(iconData));
            return;
        }

        var client = new XMLHttpRequest();

        client.onload = function () {
            var iconData = this.responseText;
            var re;

            if (fillColor) {
                re = /(<!ENTITY fill_color ")(.*)(">)/;
                iconData = iconData.replace(re, "$1" + fillColor + "$3");
            }

            if (strokeColor) {
                re = /(<!ENTITY stroke_color ")(.*)(">)/;
                iconData = iconData.replace(re, "$1" + strokeColor + "$3");
            }

            callback(dataHeader + escape(iconData));
        };

        client.onreadystatechange = function () {
            if(this.readyState == this.DONE) {
                console.log(this.status + " - " + this.statusText);
            }
        };

        client.open("GET", source);
        client.send();
    };

    function getBackgroundURL(elem) {
        var style = elem.currentStyle || window.getComputedStyle(elem, '');
        // Remove prefix 'url(' and suffix ')' before return
        return style.backgroundImage.slice(4, -1);
    }

    function setBackgroundURL(elem, url) {
        elem.style.backgroundImage = "url('" + url + "')";
    }

    icon.colorize = function (elem, colors, callback) {
        var iconInfo = {
            "uri": getBackgroundURL(elem),
            "strokeColor": colors[0],
            "fillColor": colors[1]
        };

        icon.load(iconInfo, function (url) {
            setBackgroundURL(elem, url);
            if (callback) {
                callback();
            }
        });

    };

    return icon;
});
