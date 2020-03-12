roView = createTreeGrid();
viewLoader.setView(roView);
roView.getMember(0).setData(
	isc.Tree.create
	(
		{
            ID:"roNavTree",
	        modelType: "children",
	        nameProperty: "categoryName",
	        childrenProperty: "sub",
			root:
			{sub:[
					{
						categoryName:"Particulars of Recognized Organisation"
						, js:"js/ro/codeRO.js"
					}
				]
			}

		}
	)
);

roView.getMember(0).data.openAll();

//hkmisCertTree.selectRecord("Add BCC");
while (roView.getMember(1).getMember(0)) {
	var m = roView.getMember(1).getMember(0);
	m.destroy();
	console.log( "roView.getMember(1): member destroyed@. \r\n" );
}

rojs = isc.ViewLoader.create(
		{
			viewURL:"js/ro/codeRO.js"
			, viewLoaded:function(view)
			{
				//hkcertAllCertSearchToolBar.getButton('searchBtn').click();
			}
		}
);

//rojs.setViewURL("js/mmo/stop_list.js");
roView.getMember(1).addMember(isc.TitleLabel.create({contents: "<p><b><font size=3px>Particulars of Recognized Organisation</font></b></p>"}));
roView.getMember(1).addMember(rojs);



console.log("roView.getMember(0): \r\n"+roView.getMember(0));
console.log("roView.getMember(0).getMember(1): \r\n"+roView.getMember(0).getMember(1));




//isc.say(view.getMember(0));
//

//isc.say(view.getMember(0));

//hkmisCertTree.getMember(0)




