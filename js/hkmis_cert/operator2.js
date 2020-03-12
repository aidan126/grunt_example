
console.log("operator page loaded.  \r\n");


/*
isc.HLayout.create({
	ID: "mainLayoutHkcertCodeList",
	members: []
});
*/

isc.TitleLabel.create({
	ID:"hkcertCodeList", contents: "<p></p>"
		,autoDraw: false
});


isc.HLayout.create({
	ID: "mainLayoutABC",
	members: [ hkcertCodeList]
});




initialOperatorWindow("Operating Company");


/*
if (codeListTreeClicked > 0){
	initialOperatorWindow("Operating Company");
}


codeListTreeClicked = codeListTreeClicked + 1;
*/



