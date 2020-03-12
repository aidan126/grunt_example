var apmSectionTitle = 	
	isc.Label.create({
		width: "75%",
		width: "75%",
		height: 20,
		//padding: 5,
		align: "left",
		valign: "top",
		wrap: false,
		contents: "<p><b><font size=2px>FSQC Parameter</font></b></p>"
	});


var paramForm = 
	isc.DynamicForm.create({
		width: "100%",
		height: 80, 
		numCols: 4,	
		colWidths: ["15%", "35%", "15%", "35%"],
//		cellBorder:1,
		refresh: function(){
			systemParamDS.fetchData({}, function (dsResponse, data, dsRequest){
				paramForm.setData(data);
			})
		},
		fields: [
			{name: "title1", type:"staticText", title: "<b>Prefix</b>", endRow: true, titleColSpan:2, titleAlign: "left"},
			{name: "callSignPrefix", title: "Call Sign", type: "text", length:4}, 
			{name: "officialNoPrefix", title: "Official No", type: "text", length:4}, 
			{name: "invoiceAuditNoPre", title: "Audit Control No", type: "text", endRow: true, length:2},
			{name: "line0", editorType :"CanvasItem", colSpan:4, width:1, height: 1, showTitle:false, endRow:true, getElementHTML : function (value) {return "<hr>";}},
			{name: "title2", type:"staticText", title: "<b>Available Period in Month</b>", endRow: true, titleColSpan:2, titleAlign: "left"},
			{name: "provPeriod", title: "Provisional Registration", type: "text"},
			{name: "atfPeriod", title: "Annual Tonnage Fee", type: "text"}, 
			{name: "spResvPeriod", title: "Reservation Period", type: "text", endRow: true},
			{name: "line0", editorType :"CanvasItem", colSpan:4, width:1, height: 1, showTitle:false, endRow:true, getElementHTML : function (value) {return "<hr>";}},
			{name: "title3", type:"staticText", title: "<b>Bring-Up in day</b>", endRow: true, titleColSpan:2, titleAlign: "left"},
			{name: "resvExpBuDay", title: "Name Reservation Expiry", type: "text"}, 
			{name: "provExpBuDay", title: "Provisional Expiry", type: "text"}, 
			{name: "demiseExpBuDay", title: "Demise Charter Expiry", type: "text"}, 
			{name: "atfBuDay", title: "Annual Tonnage Fee Due", type: "text", endRow: true},
			{name: "line0", editorType :"CanvasItem", colSpan:4, width:1, height: 1, showTitle:false, endRow:true, getElementHTML : function (value) {return "<hr>";}},
			{name: "title4", type:"staticText", title: "<b>Sequence No For</b>", endRow: true, titleColSpan:2, titleAlign: "left"},
			{name: "offNoSerNum", title: "Official No", type: "text"}, 
			{name: "auditSerNum", title: "Audit Control No", type: "text"}, 
			{name: "applSerNum", title: "Application No", type: "text", endRow: true},
			{name: "line0", editorType :"CanvasItem", colSpan:4, width:1, height: 1, showTitle:false, endRow:true, getElementHTML : function (value) {return "<hr>";}},
			{name: "title5", type:"staticText", title: "<b>Tonnage Reference</b>", endRow: true, titleColSpan:2, titleAlign: "left"},
			{name: "regFeeTonRef", title: "Gross/Net Ton for Registration Fee", type: "text", length:1}, 
			{name: "morFeeTonRef", title: "Gross/Net Ton for Mortgage Fee", type: "text", length:1}, 
			{name: "atfTonRef", title: "Gross/Net Ton for ATF", type: "text", length:1, endRow: true},
			{name: "line0", editorType :"CanvasItem", colSpan:4, width:1, height: 1, showTitle:false, endRow:true, getElementHTML : function (value) {return "<hr>";}},
			{name: "title6", type:"staticText", title: "<b>Other Parameters</b>", endRow: true, titleColSpan:2, titleAlign: "left"},
			{name: "lastAuditCtrlNo", title: "Last Audit Control No", type: "text"}, 
			{name: "outInvPeriod", title: "O/S Demand Note Items Alert Days", type: "text"}, 
			{name: "auditWaiveAge", title: "Audit Inspection Waive Age in Year", type: "text", endRow: true}
		]
	});

var apmSectionContent = 
	isc.SectionStack.create({
		visibilityMode: "multiple",
		width: "100%",
		height: "100%", // percentage have problem??
		animateSections: true,
		membersMargin: 10,
		layoutMargin: 10,
		layoutStartMargin: 10, // layoutRightMargin , layoutLeftMargin ... etc
		overflow : "auto", 
		sections: [
			{ title: "Setting", expanded: true, resizeable: false, 
			  items: [ paramForm] // resizeable = false, is to prevent searchFormToolBar distorted.
			}
		]
});	


var saveBtn = 
	isc.ISaveButton.create({
		click: function (){
			if (paramForm.validate()){
				var values = paramForm.getValues();
				systemParamDS.updateData(values, function (dsResponse, data, dsRequest){
					if (dsResponse.status == 0) {
						isc.say(saveSuccessfulMessage);
						paramForm.refresh();
					}
				});
			}
		}
	});
	

var resetBtn = 
	isc.IResetButton.create({
		click: function(){
			paramForm.reset();
		}
	});

var apmFormButtonHLayout = 
	isc.ButtonsHLayout.create({
		members: [ saveBtn, resetBtn ]   
	});	
	
systemParamDS.fetchData({}, function (dsResponse, data, dsRequest){
	paramForm.setData(data);
})
	
var contentLayout = 
	isc.VLayout.create({ 
	width: "100%", 
	height: "100%", 
	padding: 10, 
    members: [ apmSectionTitle, apmSectionContent, apmFormButtonHLayout ]


});

isc.HLayout.create({
	width: "100%",
	height: "100%", 
	members: [ contentLayout ]
});
