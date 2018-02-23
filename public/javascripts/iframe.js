function setIframeHeight(iframe) {
	if (iframe) {
		var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
		if (iframeWin.document.body) {
			iframe.height = iframeWin.document.documentElement.offsetHeight || iframeWin.document.body.offsetHeight;
		}
	}
	alert(iframeWin.document.documentElement.offsetHeight || iframeWin.document.body.offsetHeight)
};
window.onresize=function(){  
    setIframeHeight(document.getElementById("external-frame")) 
} 
