/* 
 * Adds placeholder tag functionality to IE 9 and IE 8
 * Add this file above the </body> tag
 * version 1.1 By Sean Madden 
 */  

(function(){
	
	var styleTag = 'pholder-css';
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
	
	function addToSubmit(){
		for(i=0; i<forms.length; i++){
			var ieVers = getInternetExplorerVersion();
			if(ieVers > -1 && ieVers < 9) {
				forms[i].reset();
			}
			attachCall(forms[i].onsubmit, clearPlaceHolders)
		}
		function attachCall(formSubmit, newFunction){
			alert(typeof formSubmit);
			if (typeof formSubmit == "function") {
				formSubmit = function() {
					if (formSubmit) {
						formSubmit();
					}
					newFunction();
				}
			}
			else {
				window.onload = newFunction;
			}
		}
	}
	
	function clearPlaceHolders(){
		alert('test');
		return false;
	}

	scanForPlaceHolders();
	document.attachEvent("onreadystatechange", scanForPlaceHolders);
	window.attachEvent("onload", scanForPlaceHolders);
	
	function scanForPlaceHolders(){
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
			var css = '.'+ styleTag +'{color:'+color+' !important;}',
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
				thisInput.className += " " + styleTag;
				thisInput.onfocus = clicked;
				thisInput.onblur = unclicked;
				thisInput.tmpVal = thisInput.value;
			}
		}

		function clicked() {
			if(this.value === this.tmpVal) {
				this.value = "";
			}
			var regEx = RegExp("(?:^|\\s)" + styleTag + "(?!\\S)","g");
			this.className = this.className.replace(regEx,'');
		}

		function unclicked() {
			if(this.value === "") {
				this.value = this.tmpVal;
				this.className += " " + styleTag;
			}
		}
	}
})()
