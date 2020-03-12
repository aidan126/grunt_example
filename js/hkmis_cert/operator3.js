


/*
isc.Label.create({
    ID:"aLabel",
    height: 30,
    padding: 10,
    align: "center",
    valign: "center",
    wrap: false,
    //icon: "icons/16/approved.png",
    showEdges: true,
    contents: "<i>Approved</i> for release"
});
*/
function hkmis_operator3()
{


hkcertOperatorVLayout = createHkcertCodeListTableInNewWindow(operatorDS,
	[
		{name:"id", title:"Code", type:"integer"},
        {name:"nameEn", title:"Name En"},
        {name:"address", title:"Address", width:100},
        {name:"nameCn", title:"Name Cn"},
        {name:"linkMan", title:"Link Man"},
        {name:"tel", title:"Tel"},
        {name:"phone", title:"Phone"},
        {name:"email", title:"Email"},
        {name:"zipcode", title:"Zipcode"}
	],
	["id"], 'paged');



hkcertOperatorVLayout.getMember("operationToolBar").getMember("addBtn").addProperties({click:function(){
	isc.say("addBtn");
}});
hkcertOperatorVLayout.getMember("operationToolBar").getMember("deleteBtn").addProperties({click:function(){
	isc.say("deleteBtn");
}});
hkcertOperatorVLayout.getMember("operationToolBar").getMember("saveBtn").addProperties({click:function(){
	isc.ask("Are you sure to save records?", function(){
		hkcertOperatorVLayout.getMember(1).saveAllEdits();
		/*
		hkcertOperatorVLayout.getMember(1).saveAllEdits(null,function(){
			isc.say("saveAllEdits method completed.");
		});
		*/
	});

}});
hkcertOperatorVLayout.getMember("operationToolBar").getMember("exportBtn").addProperties({click:function(){
	isc.say("exportBtn");
}});




hkcertOperatorVLayout.addMember(isc.DynamicForm.create({
	ID:"testingDF",
	dataSource: "operatorDS",

	numCols: 8,
	colWidths: ["1", "1", "1", "1", "1", "1", "1", "1"],
	fields: [
	         {name: "nameEn", 	title:"Chinese Name",	startRow: true, colSpan: 8, width: 880}
	         ]
}));
testingDF.fetchData({"id":11});


hkcertOperatorVLayout.addMember(isc.Button.create({
	ID:"SaveMe",
    title: "Save",
    left: 150,
    click : function () {
        isc.ask("Confirm?",
        		function (value) {
        			if (value){
        				testingDF.saveData(
        						function (dsResponse, data, dsRequest) {
	        						  if(dsResponse.status==0){
	        							  isc.say(saveSuccessfulMessage);
//	        						  sfRecFormDetail.setValues(data);
	        							  //enabledSection(true);
	        						  }
	        					  }
        						);
        			}
        });
    }
}));


/*

isc.ButtonToolbar.create({
    ID:"operationToolBar",
    buttons:[
        {name:"addBtn", title:"Add", autoFit: true}
        ,{name:"deleteBtn", title:"Delete", autoFit: true}
        ,{name:"saveBtn", title:"Save", autoFit: true}
        ,{name:"exportBtn", title:"Export", autoFit: true}
    ]
};


isc.ListGrid.create({
    ID: "operatorList",
    width:500, height:224, dataSource : "hkCertDS", alternateRecordStyles:true,
    fields:[
        {name:"operatorCode", title:"Code"},
        {name:"operatorNameEn", title:"Name En"},
        {name:"operatorAddress", title:"Address", type:"date", width:100},
        {name:"operatorNameCn", title:"Name Cn", type:"integer"},
        {name:"operatorLinkMan", title:"Link Man", type:"float"},
        {name:"operatorTel", title:"Tel", type:"float"},
        {name:"operatorPhone", title:"Phone", type:"float"},
        {name:"operatorEmail", title:"Email", type:"float"},
        {name:"operatorZipcode", title:"Zipcode", type:"float"}

    ],
    //data: countryData
});
*/



isc.Window.create({
	//ID:"hkcertOperatorWindow", isModal: true, showModalMask: true, width: 1100, height: 800, title:"",
	ID:"hkcertOperatorWindow", isModal: true, showModalMask: false, width: 1100, height: 800, title:"",

    //layoutMargin:10,
    overflow : "auto",
	items: [
	        //SeafarerDetailWindowContent
            /*
            operatorToolBar,
            operatorList
            */

	        ],
	show:function(){
        /*
		sfRecFormDetail.setData({});
        */

		//sfPhotoCanvas.setData(null);
		this.Super('show', arguments);

        console.log("arguments:  " + arguments);
		//sfFingerprintCanvas.setData(null);

        /*
		sfRecSectionContent.collapseSection([1,2,3,4,5,6,7,8,9,10]);
		*/
	}

});

}

function initialOperatorWindow(windowTitle){
    //isc.say(windowTitle);

	hkmis_operator3();

    hkcertOperatorWindow.setTitle(windowTitle);

    hkcertOperatorWindow.addItem(hkcertOperatorVLayout);
    //hkcertOperatorWindow.addItems(aLabel, hkcertOperatorVLayout);
    //hkcertOperatorWindow.addItems(operationToolBar, operatorList);
    hkcertOperatorWindow.show();
    hkcertOperatorVLayout.getMember(1).fetchData();
}

/*
if (codeListTreeClicked) {
	codeListTreeClicked = false;
	initialOperatorWindow("Operating Company");
}
*/



/*
{name:"operatorCode", title:"Code"},
{name:"operatorNameEn", title:"Name En"},
{name:"operatorAddress", title:"Address", type:"date", width:100},
{name:"operatorNameCn", title:"Name Cn", type:"integer"},
{name:"operatorLinkMan", title:"Link Man", type:"float"},
{name:"operatorTel", title:"Tel", type:"float"},
{name:"operatorPhone", title:"Phone", type:"float"},
{name:"operatorEmail", title:"Email", type:"float"},
{name:"operatorZipcode", title:"Zipcode", type:"float"}
*/











































