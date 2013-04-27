var Countdown = function ($, undefined) {
    'use strict';

    var appName = "Countdown",
        interval,
        initialMinutes = 5,
        initialSeconds = 0,
        dfd = $.Deferred();

    var vars = {
        isInitialized: false,
        minutes: initialMinutes,
        seconds: initialSeconds
    };

    function Init(settings) {

        if (vars.isInitialized) {
            throw {
                name: "Multiple init exception",
                message: "By default, initializing multiple times is not allowed."
            };
        }

        vars.isInitialized = true;
        vars = $.extend({}, vars, settings);

        initialMinutes = vars.minutes;
        initialSeconds = vars.seconds;

        _Start();
        return;
    }

    function _Start() {
        interval = setInterval(function () {
            if (vars.seconds === 0) {
                if (vars.minutes === 0) {
                    dfd.resolve();
                    clearInterval(interval);
                    return;
                } else {
                    vars.minutes--;
                    vars.seconds = 60;
                }
            }
            vars.seconds--;

            dfd.notify({
                minutes: vars.minutes,
                seconds: vars.seconds
            });
        }, 1000);
    }

    function Reset() {
        vars.minutes = initialMinutes;
        vars.seconds = initialSeconds;
    }

    return {
        init: Init,
        promise: dfd.promise(),
        done: dfd.promise().done,
        progress: dfd.promise().progress,
        tick: dfd.promise().progress,
        reset: Reset
    };
};

Countdown.create = function () {
    var newApp = Countdown(jQuery); // Pass in dependancies();
    return newApp;
};
