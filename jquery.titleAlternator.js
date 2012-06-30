/*

Author: DATEL Software Solutions
Manages the page title, including swapping the title text.

Notes:

*/
;(function ($) {


    ///<summary>This is the function to call when starting up.</summary>
    $.titleAlternator = function (altTitles, settings) {
        _initNewInstance(); //sets/re-sets all variables for use

        //if this is the first time calling this, use the defaults + any given options
        if (_settings === undefined) {
            _settings = settings = $.extend({}, _defaultSettings, settings);
        }
        else { //use previously set values unless given new options
            _settings = settings = $.extend({}, _settings, settings);
        }
        
        //if blur is required but the screen is focused, just kill it
        if (_settings.requireBlur && _isWindowFocused) {
            return;
        }

        $.titleAlternator.IsRunning = true;
        $.titleAlternator.setAltTitles(altTitles);

        //start up the timers
        _intervalTimerId = setInterval(_setNextTitle, _settings.interval);
        _durationTimerId = setTimeout($.titleAlternator.stop, _settings.duration);
    };

    ///<summary>Stops the title swapping and sets the title back to the baseTitle.</summary>
    $.titleAlternator.stop = function () {
        _clearTimers();
        _lastTitleIndex = -1;

        ///<summary>This is meant to be called by a setTimeout.  Hack to get around an issue in Chrome 
        // where the title wouldn't change when changing browser tabs</summary>
        var _hackyTitleReset = function () {
            document.title = _settings.baseTitle;
        };

        if ($.titleAlternator.IsRunning) {
            $.titleAlternator.IsRunning = false;
            setTimeout(_hackyTitleReset, _msTitleDelay);
        }
    };

    ///<summary>Adds a title to the list of alternate titles.</summary>
    $.titleAlternator.addAltTitle = function (titleToAdd) {
        if (_altTitles === undefined) {
            _altTitles = [];
        }

        _altTitles.push(titleToAdd);
    };


    ///<summary>Detects if altTitles is a string or an array, then sets the _altTitles array appropriately (overwriting the existing list).</summary>
    ///<param name="altTitles">Can be a string or an array of strings.</param>
    $.titleAlternator.setAltTitles = function (altTitles) {
        //if altTitles is an array, just use it.  if not, add the string to the internal array.
        if (isArray(altTitles)) {
            _altTitles = altTitles;
        }
        else {
            _altTitles.push(altTitles.toString());
        }
    };
    
    ///<summary>Sets the "BaseUrl" - the URL that will be displayed when the alrternating is completed.
    /// This is useful if your app changes the title as you perform differenc actions on the same page (like in Gmail).</summary>
    $.titleAlternator.setBaseTitle = function (baseTitle) {
        //if the dev is setting this before ever calling the alternator, set all settings to default
        if (_settings === undefined) {
            _settings = _defaultSettings;
        }
        _settings.baseTitle = baseTitle.toString();

        //if the alternator isn't running, set the title explicitly
        if (!$.titleAlternator.IsRunning) {
            document.title = baseTitle;
        };
    };

    ///REGION - public variables
    $.titleAlternator.IsRunning = false;

    ///REGION - "private" variables
    var _altTitles;
    var _settings;
    var _isWindowFocused = true; //default to true - if the page is loaded it must be focused?
    var _lastTitleIndex = -1;
    var _durationTimerId = -72; //lazy ... dont want to have to check for undefined
    var _intervalTimerId = -72; //lazy ... dont want to have to check for undefined
    var _msTitleDelay = 400;

    var _defaultSettings = {
        duration: 10000,
        interval: 1000,
        stopOnFocus: true,
        requireBlur: true,
        baseTitle: document.title //if the title was set before calling $.titleAlternator()
    };

    ///REGION - "private" methods
    ///<summary>Sets all variables for first time use OR re-sets all variables for any subseaquent calls.</summary>
    var _initNewInstance = function () {
        _altTitles = []; //start with an empty array

        _clearTimers();
    };

    ///<summary>Sets the next title - amirite</summary>
    var _setNextTitle = function () {
        var indexToShow = _lastTitleIndex + 1;

        //are we at the END?
        if (indexToShow >= _altTitles.length) {
            document.title = _settings.baseTitle;
            _lastTitleIndex = -1;
            return;
        }

        //set the next title in the array
        document.title = _altTitles[indexToShow].toString();
        _lastTitleIndex = indexToShow;
    };

    ///<summary>Clears all of the current timers.</summary>
    var _clearTimers = function () {
        clearInterval(_intervalTimerId);
        clearTimeout(_durationTimerId);
        _intervalTimerId = -72;
        _durationTimerId = -72;
    };

    ///REGION - jQuery bindings
    //keeps track if the browser window is focused or not
    $(window).focus(function () {
        _isWindowFocused = true;
        if ($.titleAlternator.IsRunning && _settings.stopOnFocus) {
            $.titleAlternator.stop();
        }
    })
    .blur(function () {
        _isWindowFocused = false;
    });


    var isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }


    

})(jQuery);