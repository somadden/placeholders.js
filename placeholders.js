/* 
 * Adds placeholder tag functionality to IE 9 and IE 8
 * Add this file above the </body> tag
 * version 1.1 By Sean Madden 
 */  

(function(){
	
	var placeHolderCssName = 'auto-pholder-css';
	var color = '#a3a3a3';

	var ieVers = (function(){
 		var undef,
			v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');
		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);
		return v > 4 ? v : undef;
 
	}());
		
	if(ieVers > -1 && ieVers < 10){
		addCss();
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
	}
	
	function addCss() {
		var css = '.'+placeHolderCssName+'{color:'+color+' !important;',
		head = document.getElementsByTagName('head')[0],
		style = document.createElement('style');

		style.type = 'text/css';
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
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

})()
