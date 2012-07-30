# jQuery.titleAlternator
A jQuery extension used to flash multiple titles (alternating) in a browser.
##### Note / Credit
I got the original idea from Jonathan Heyman - then just augmented a bit: http://heyman.info/2010/sep/30/jquery-title-alert/

## Usage
$.titleAlternator(string[] || string, { options });

## Available Options
- _duration_ (number)(default 10000): The number of MS the alternating should last for.
- _interval_ (number)(default 1000): The number of MS to show a title before alternating to the next.
- _quitWhenFocused_ (bool)(default true): Should the alternating automatically stop when the browser window is focused?
- _onlyStartIfBlurred_ (bool)(default true): Should the alternating only start if the browser window is not focused?
- _baseTitle_ (string)(default document.title): The title that the browser should revert to once the alternating has stopped.


## Example Usage
##### _Basic - string with No Options_
$.titleAlternator("Some Alternate Title");

##### _Basic - string[] with No Options_
$.titleAlternator(["Some Alternate Title", "Another Alternate Title", "A Third Alternate Title"]);

##### _Using Options_
$.titleAlternator(["Some Alternate Title", "Another One"], { duration: 20000, interval: 700, quitWhenFocused: fase, onlyStartIfBlurred: false, baseTitle: "Title to show after alternating is over"});

## Other Available Properties/Functions
- _$.titleAlternator.stop()_ - stops the alternating and sets the document.title to baseTitle.
- _$.titleAlternator.setBaseTitle(newBaseTitle)_ - sets the baseTitle.  This is useful on single page ajax pages where you might want to change the base title while the title is currently alternating, but not stop the alternating.
- _$.titleAlternator.setAltTitles(newBaseTitle || newBaseTitles[])_ - sets the title list to alternate through.  This is useful if you want to set a new list of titles while alternating is taking place, but you don't want to stop the alternating.

## Notes
You can call $.titlAlternator() as many times as you like - each new call will overwrite the previous call.
_Example_:
If _$.titleAlternator("Some alt Title", { duration: 50000 })_ is called, then 20 MS later _$.titleAlternator("A Better alt Title", { duration: 1000 })_ is called, the second call (with a 1 second duration) will overwrite the first function (with a 50 second duration).
