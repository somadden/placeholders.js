/* 
 * Adds placeholder tag functionality to IE 9 or less
 * version 1.0 By Sean Madden 
 * 
 * In the <head> or CSS file add,
 * CSS  : <style>* .auto-pholder-css{color:#a3a3a3 !important;}</style>
 * 
 * Near the bottom of the page add,
 * HTML : <!--[if lte IE 9 ]><script>placeholders();</script><![endif]--> 
 */  

function placeholders(){

	var placeHolderCssName = 'auto-pholder-css';

	for (var i=0; i<document.getElementsByTagName('input').length; i++) {
		var curNode = document.getElementsByTagName('input')[i];
		var type = curNode.getAttribute("type").toLowerCase();
		if(type != "radio" && type != 'checkbox' && type != 'submit'){
			if (curNode.value == "") {
				useHTML5Placeholders(curNode);
				if (curNode.value != "") {
					valueSave(curNode);
				}
			}
		}
	}

	function useHTML5Placeholders(curNode){
		var currField = curNode.outerHTML.toLowerCase();
		if(currField.indexOf('placeholder') > -1 ){
			curNode.value = curNode.getAttribute("placeholder");
		}

	}

	function valueSave(thisInput) {
		if(thisInput.getAttribute("type") != "submit"){
			thisInput.className += " " + placeHolderCssName;
			thisInput.onfocus = clicked;
			thisInput.onblur = unclicked;
			thisInput.tmpVal = thisInput.value;
		}
	}

	function clicked() {
		if(this.value === this.tmpVal) {
			this.value = "";
		}

		var regEx = RegExp("(?:^|\\s)" + placeHolderCssName + "(?!\\S)","g");
		this.className = this.className.replace(regEx,'');

	}

	function unclicked() {
		if(this.value === "") {
			this.value = this.tmpVal;
			this.className += " " + placeHolderCssName;

		}
	}
}