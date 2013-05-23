define(function (require) {
    var activity = require("sugar-html-activity/activity");
    var icon = require("sugar-html-graphics/icon");
    var xocolor = require("activity/xocolor");

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();

        // Colorize the activity icon.
        var activityButton = document.getElementById("activity-button");
        var iconCurrent = document.getElementById("icon-current");
        activity.getXOColor(function (colors) {
            icon.colorize(activityButton, colors);
            icon.colorize(iconCurrent, colors);
        });

        // Make the activity stop with the stop button.
        var stopButton = document.getElementById("stop-button");
        stopButton.onclick = function () {
            activity.close();
        };

        var colorButtons = document.querySelectorAll("#color-icons button");
        console.log(colorButtons);
        for (i = 0; i < colorButtons.length; i++) {
            button = colorButtons[i];
            var randomColors = xocolor.colors[Math.floor(Math.random() *
                xocolor.colors.length)];
            icon.colorize(button, randomColors);
        }

    });

});
