console.log("msmc_stat.js loaded.  \r\n");
var recCntLabel = "Count: ";


function get2ndLastMonday(d) {
  var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
  var d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1) -7; // adjust when day is sunday

  //return format: 25-Jan-2016
  monday=new Date(d.setDate(diff));
  var curr_date = monday.getDate();
  var curr_month = monday.getMonth();
  var curr_year = monday.getFullYear();
  //return curr_date + "-" + m_names[curr_month] + "-" + curr_year;
  return new Date(curr_year, curr_month, curr_date);
}

function getLastSunday(d) {
  var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
  var d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day ; // adjust when day is sunday
      
  
  //return format: 25-Jan-2016
  monday=new Date(d.setDate(diff));
  var curr_date = monday.getDate();
  var curr_month = monday.getMonth();
  var curr_year = monday.getFullYear();
  //return curr_date + "-" + m_names[curr_month] + "-" + curr_year;
  return new Date(curr_year, curr_month, curr_date);
}



isc.FormLayout.create({
	ID:"msmcStatFormatRadioGp",
	showEdges: false,
	autoDraw: false,
	isGroup: true, groupTitle: "Statistical format",
    items:[{
        name:"statFormat", type:"radioGroup", showTitle:false,vertical:false,width:180,
        valueMap:["Grid"], defaultValue:"Grid"
        //change:"countryList.getField('countryCode').align = value; countryList.markForRedraw()"
    }]
});


isc.DynamicForm.create({
	ID:"msmcStatReportTypeRadioGp",
	isGroup: true, groupTitle: "Type of Report",
    items:[{
        name:"reportType", type:"radioGroup", showTitle:false,vertical:false,width:380,
        valueMap:["Daily","Weekly","Monthly","Annual","Other"], defaultValue:"Daily"
        ,change: function(form, item, value){
        	if (!isNull(value) && (value = value.trim()) != ""){
        		console.log("\"Type of Report\" radio btn changed: " + value);
                var today = new Date();
                var currentYear = today.getFullYear();
                var currentMonth = today.getMonth();
                if (value == "Daily") {
                    //set as today
                	msmcStatDateTypeCriteriaDF.getItem("fromDate").title = "Date";
                    msmcStatDateTypeCriteriaDF.getItem("toDate").hide();
                    msmcStatDateTypeCriteriaDF.setValue("fromDate", today);
                }else if (value == "Weekly") {
                    //
                    var weekStart = get2ndLastMonday(today);
                    var weekEnd = getLastSunday(today);
                    
                    console.log("get2ndLastMonday: " + weekStart);
                    console.log("getLastSunday: " + weekEnd);
                    msmcStatDateTypeCriteriaDF.getItem("fromDate").title = "From";
                    msmcStatDateTypeCriteriaDF.getItem("toDate").show();
                    msmcStatDateTypeCriteriaDF.setValue("fromDate", weekStart);
                    msmcStatDateTypeCriteriaDF.setValue("toDate", weekEnd);
                }else if (value == "Monthly") {
                    //var currentMonth = today.getMonth();
                    var monthStart = new Date(currentYear, currentMonth, 1, 0, 0, 0, 0);
                    var nextMonthStart = new Date(currentYear, currentMonth + 1, 1, 0, 0, 0, 0);
                    var monthEnd = new Date(nextMonthStart - 1);
                    msmcStatDateTypeCriteriaDF.getItem("fromDate").title = "From";
                    msmcStatDateTypeCriteriaDF.getItem("toDate").show();
                    msmcStatDateTypeCriteriaDF.setValue("fromDate", monthStart);
                    msmcStatDateTypeCriteriaDF.setValue("toDate", monthEnd);
                }else if (value == "Annual") {
                    var yearStart = new Date(currentYear, 0, 1, 0, 0, 0, 0);
                    var nextYearStart = new Date(currentYear + 1, 0, 1, 0, 0, 0, 0);
                    var yearEnd = new Date(nextYearStart - 1);
                    msmcStatDateTypeCriteriaDF.getItem("fromDate").title = "From";
                    msmcStatDateTypeCriteriaDF.getItem("toDate").show();
                    msmcStatDateTypeCriteriaDF.setValue("fromDate", yearStart);
                    msmcStatDateTypeCriteriaDF.setValue("toDate", yearEnd);                    
                }else if (value == "Other") {
                	msmcStatDateTypeCriteriaDF.getItem("fromDate").title = "From";
                    msmcStatDateTypeCriteriaDF.getItem("toDate").show();
                }
        	}
        }
    }]
});


isc.DynamicForm.create({
    ID:"msmcStatDateTypeCriteriaDF",
    autoDraw: false,
    width:300,
    numCols: 4,
    colWidths: [50,"*",20,"*"],
    isGroup: true, groupTitle: "Type of Date",
    items: [
        {   name: "dateType", 	title:"", type:"select",
            width:250,
            startRow: true, colSpan: 3,
            valueMap:["All Document Received Date","Application Date","Complete Date"
            //,"Expiry Date"
            ,"Issue Date"], defaultValue:"Complete Date"
        },
        {name: "fromDate", title:"Date", type:"date", width:120, defaultValue: new Date(), useTextField:true, startRow: true},
        {name: "toDate", title:"To", type:"date", width:120, defaultValue: new Date(), useTextField:true, startRow: false, hidden:true}
        
    ]
});


isc.DynamicForm.create({
    ID:"msmcStatShipInfoCriteriaDF",
    autoDraw: false,
    width:600,
    //height:300,
    numCols: 8,
    colWidths: [50,70,70,"*",70,70,5,70],
    //layoutTopMargin: 50,
    //isGroup: true, groupTitle: "",
    saveOnEnter: true,
    submit: function(){
        console.log("submit()");
        msmcStatQueryBtn.click();
    },
    items: [
    	{type:"RowSpacerItem",height:15},
        {   name: "mod", 	title:"MOD", type:"select",
            width:70,
            startRow: true, 
            valueMap:["+MOD","-MOD",""], defaultValue:""
        },
        {name: "ship_jobno_sptype", title:"Type of Ship", 
            width:150, 
            useTextField:true, startRow: false
            //, operator: "equals"
        },
        {name: "grossFrom", title:"Gross", type:"integer", width:70, useTextField:true, startRow: false
        	//, operator: "greaterOrEqual"
		},
        {name: "grossTo", title:"~", type:"integer", width:70, useTextField:true, startRow: false
			//, operator: "lessOrEqual"
		},
        {   name: "ums", 	title:"UMS", type:"select",
            width:70,
            startRow: true, 
            valueMap:["YES","NO",""], defaultValue:""
        },
        {   name: "tradingArea", 	title:"Trading Area", type:"select",
            //width:250,
            startRow: false, 
            valueMap:["WORLDWIDE","RIVER TRADE","COASTAL",""], defaultValue:""
        },
        {name: "enginePowerFrom", title:"Engine Power", type:"integer", width:70, useTextField:true, startRow: false
        	//, operator: "greaterOrEqual"
		},
        {name: "enginePowerTo", title:"~", type:"integer", width:70, useTextField:true, startRow: false
			//, operator: "lessOrEqual"
		}
    ]
});


isc.ListGrid.create({
	ID:"msmcStatSearchResultLG", dataSource : certJobMsmcDS, showFilterEditor:true, filterOnKeypress:false,
    autoDraw: false,
    //width:1040,
    //width:1300,
    overflow:"auto",
	fields: [
            {name: "spname", title: "Name of Ship", width:200},
            {name: "imono", title: "IMO NO.", width:80},
            {name: "distinctNo", title: "Distinct No.", width:80},
            {name: "ship_jobno_sptype", title: "Type of Ship", width:160},
            
            {name: "loa", title: "LOA", width:80},
            
            {name: "pp", title: "PP", width:80},
            {name: "gross", title: "Gross", width:80},
            {name: "enginePower", title: "Engine Power", width:100},
            {name: "issuance", title: "Issuance", width:120},
            {name: "issueOn", title: "Issue Date", width:100},
            {name: "approvedDate", title: "Approved Date", width:100},
            
            
            {name: "nauticalSurveyor", title: "Nautical Surveyor", width:140},
            {name: "engineer", title: "Engineer Surveyor", width:140},
            {name: "senior", title: "Senior Surveyor", width:140},
            {name: "authorizedOfficial", title: "Authorized Official", width:140},
            
            {name: "mod", title: "MOD", width:60},
            {name: "ums", title: "UMS", width:60},
            {name: "sCook", title: "Cook", width:60},
            
            {name: "dClass1", title: "C1", width:60},
            {name: "dClass2", title: "C2", width:60},
            {name: "dClass3", title: "C3", width:60},
            {name: "dAbleseafarer", title: "AS", width:60},
            {name: "dWatchrating", title: "RS", width:60},
            {name: "dOtheratings", title: "OR", width:60},
            
            {name: "eClass1", title: "C1", width:60},
            {name: "eClass2", title: "C2", width:60},
            {name: "eClass3", title: "C3", width:60},
            {name: "eTechofficer", title: "ETO", width:60},
            {name: "eAbleseafarer", title: "AS", width:60},
            {name: "eWatchrating", title: "RS", width:60},
            {name: "eOtheratings", title: "OR", width:60},
            {name: "eTechratings", title: "ETR", width:60},
            
            {name: "editDate", title: "Edit Date", width:120},
            {name: "applicationDate", title: "Application Date", width:120},
            {name: "msmcDocReceivedDate", title: "Doc Received Date", width:120},
            {name: "msmcCompleteDate", title: "Complete Date", width:120},
            
            {name: "year", title: "Year", width:60},
            {name: "fromdate", title: "Fromdate", width:120},
            {name: "todate", title: "Todate", width:120},
            
            {name: "operator", title: "Operator", width:470}
            
            /*
            //{name: "offno", title: "Off. No.", width:80},
            
            {name: "jobno", title: "Job No.", width:150},

            {name: "editStatus", title: "Edit Status", width:80},
            {name: "printStatus", title: "Print Status", width:80},
            {name: "startPerson", title: "Start Person", width:120},
            {name: "beginDate", title: "Start Date", width:80},
            {name: "lastEditPerson", title: "Last Editors", width:120},
            {name: "lastEditDate",  title: "Last Edit Date", width:100}
            */
            
    ],
    filterData: function(){
    	console.log("user entered values in FilterEditor of msmcStatSearchResultLG");
    	searchMsmcStat();
        console.log("user leave values in FilterEditor of msmcStatSearchResultLG");
    },
    rowDoubleClick:function(record, recordNum, fieldNum){
        /*
        if (record['form'] == 'BCC')
        {
            openCrewListDetail_bcc(record);
        }

        if (record['form'] == 'MSMC')
        {
            openMsmcCertRecDetail(record);
        }
        */
    }
    
});


isc.IButton.create({
    ID:"msmcStatQueryBtn",
    title: "Query",
    width:100,
    autoDraw: false,
    layoutAlign:"center",
    click: function(){
    	searchMsmcStat();
    }
});






isc.IExportButton.create({
    ID:"msmcStatExportBtn",
    title: "Export",
    width: 100,
    layoutAlign:"center",
    autoDraw: false,
    listGrid: msmcStatSearchResultLG
});

isc.HLayout.create({
	ID:"msmcStatCriteriaBtnVLayout",
    width: 100,
    //layoutTopMargin:10,
    defaultLayoutAlign: "center",
    showEdges: false,
    autoDraw: false,
    membersMargin:5, 
    members:[msmcStatQueryBtn
    	//, msmcStatExportBtn
    	]
});




isc.HLayout.create({
	ID:"msmcStatRadioGp", 
    //width:680, 
	height:50,
    layoutTopMargin:10, layoutBottomMargin:10,
    padding:10,
    /*top:20,*/
    defaultLayoutAlign: "center",    
    //isGroup: true, groupTitle: "Type of Report",
    showEdges: false,
    membersMargin:5, members:[
    	//msmcStatFormatRadioGp
    	,msmcStatReportTypeRadioGp
    	,isc.LayoutSpacer.create({width:"400"})
    	,msmcStatCriteriaBtnVLayout
    	]
});













isc.HLayout.create({
	ID:"msmcStatSearchCriteriaHLayout",
    //width:950,
	width:"100%",
    height:70,
    //height:500,
  	layoutMargin:5,
  	membersMargin:15,
  	members:[
  	        msmcStatDateTypeCriteriaDF,
            msmcStatShipInfoCriteriaDF,
            //msmcStatCriteriaBtnVLayout
            
            
  	        ]
});






isc.VLayout.create({
	ID:"msmcStatSearchCriteriaOuterVLayout",
    //width:950,
	width:"100%",
    height:180,
    //height:500,
  	layoutMargin:5,
  	//membersMargin:15,
  	overflow:"auto",
  	members:[
			msmcStatRadioGp,
  	        msmcStatSearchCriteriaHLayout,
            //msmcStatCriteriaBtnVLayout
            
            
  	        ]
});


















isc.TitleLabel.create({
	ID:"msmcStatRecCntLabel",
	//width:100,
    height: 5,
    //styleName: "helloWorldText",
    padding: 0,
    //backgroundColor: "#ffffd0",
    align: "left",
    valign: "center",
    autoDraw: false,
    wrap: false,
    showEdges: false,
    showShadow: false,
    //icon: "icons/16/world.png",
    contents: searchResultPreText1 + "0" + searchResultPostText1
});


var msmcStatSummaryBar = isc.HLayout.create({
    height:20,
    members: [
    	msmcStatRecCntLabel	
		, msmcStatExportBtn
    		
    ]
});



//----------------------------------------------------------------------------------------------------------------------------------------------------------

isc.VLayout.create({
	ID: "mainLayoutMsmcStat",
    overflow: "auto",
	members: [
				isc.SectionStack.create({
		            //height:240,
					height: "100%",
		            sections: [
		                //20190715 decided to eliminate advanced search section
		                {title: "Search", expanded: true, resizeable: false, items: [ msmcStatSearchCriteriaOuterVLayout
		                    //,hkcertAllCertSearchSectionLayout
		                ]}
		                
		                //, {title: "Result", expanded: true, items: [ hkcertAllCertSearchResultListLG, msmcTestingLG, hkcertAllCertSearchResultListLGSummary ]}
		                
		                //below are currently used
		                , {title: "Result", expanded: true, items: [ 
		                	//hkcertAllCertSearchResultListLG, hkcertAllCertSearchResultListLGSummary
		                	msmcStatSearchResultLG, msmcStatSummaryBar
		                	]}
		            ]
		        }),
                
		    ]
});




function searchMsmcStat(){
    var criteria = {};
    
    var dateTypePara = msmcStatDateTypeCriteriaDF.getItem("dateType").getValue();
    var fromDatePara = msmcStatDateTypeCriteriaDF.getItem("fromDate").getDisplayValue();
    var toDatePara = msmcStatDateTypeCriteriaDF.getItem("toDate").getDisplayValue();
    
    
    var modPara = msmcStatShipInfoCriteriaDF.getItem("mod").getValue();
    var shipTypePara = msmcStatShipInfoCriteriaDF.getItem("ship_jobno_sptype").getValue();
    var grossFromPara = msmcStatShipInfoCriteriaDF.getItem("grossFrom").getValue();
    var grossToPara = msmcStatShipInfoCriteriaDF.getItem("grossTo").getValue();
    var umsPara = msmcStatShipInfoCriteriaDF.getItem("ums").getValue();
    var tradingAreaPara = msmcStatShipInfoCriteriaDF.getItem("tradingArea").getValue();
    var epFromPara = msmcStatShipInfoCriteriaDF.getItem("enginePowerFrom").getValue();
    var epToPara = msmcStatShipInfoCriteriaDF.getItem("enginePowerTo").getValue();
    
    var criteriaBase = {
        _constructor:"AdvancedCriteria", 
        criteria:[
            
        ], 
        operator:"and"
    };
    criteria = JSON.parse(JSON.stringify(criteriaBase));
    //Object.assign(criteria, criteriaBase);
    
    
    //pending to modify
    /*
    if (!isNull(dateTypePara) && !isNull(fromDatePara) && (fromDatePara = fromDatePara.trim()) != "")
        Object.assign(criteria, {"dateType" : fromDatePara});
    */
    
    
    
    var filterDateField = "";
    if (!isNull(dateTypePara))
        dateTypePara = dateTypePara.trim();
    
    switch(dateTypePara){
        case "All Document Received Date":
            filterDateField = "msmcDocReceivedDate";
            break;
        case "Application Date":
            filterDateField = "applicationDate";
            break;
        case "Complete Date":
            filterDateField = "msmcCompleteDate";
            break;
        case "Expiry Date":
            filterDateField = "completeDate";
            break;
        case "Issue Date":
            filterDateField = "issueOn";
            break;
    }
    var selectedReportType = msmcStatReportTypeRadioGp.getValues();
    if (!isNull(selectedReportType)) {
        if (!isNull(selectedReportType.reportType) && (selectedReportType.reportType = selectedReportType.reportType.trim()) == "Daily"){
            criteria.criteria.push({fieldName:filterDateField, operator:"greaterOrEqual", value:new Date(fromDatePara + " 00:00:00")});
            criteria.criteria.push({fieldName:filterDateField, operator:"lessOrEqual", value:new Date(fromDatePara + " 23:59:59")});
            console.log("Daily:\n" + JSON.stringify(criteria.criteria));
        }else{
            criteria.criteria.push({fieldName:filterDateField, operator:"greaterOrEqual", value:new Date(fromDatePara + " 00:00:00")});
            criteria.criteria.push({fieldName:filterDateField, operator:"lessOrEqual", value:new Date(toDatePara + " 23:59:59")});
            console.log("NOT Daily:\n" + JSON.stringify(criteria.criteria));
        }
    }
    
    
    if (!isNull(modPara) && (modPara = modPara.trim()) != "")
        //Object.assign(criteria, {"mod" : modPara});
        criteria.criteria.push({fieldName:"mod", operator:"equals", value:modPara});
    
    
    
    if (!isNull(shipTypePara) && (shipTypePara = shipTypePara.trim()) != ""){
        //Object.assign(criteria, {"ship_jobno_sptype" : shipTypePara});
        criteria.criteria.push({fieldName:"ship_jobno_sptype", operator:"iContains", value:shipTypePara});
    }
    
    //if (!isNull(grossFromPara) && (grossFromPara = grossFromPara.trim()) != ""){
    if (!isNull(grossFromPara)){
        //Object.assign(criteria, {"grossFrom" : grossFromPara});
        criteria.criteria.push({fieldName:"gross", operator:"greaterOrEqual", value:grossFromPara});
    }
    
    //if (!isNull(grossToPara) && (grossToPara = grossToPara.trim()) != ""){
    if (!isNull(grossToPara)){
        //Object.assign(criteria, {"grossTo" : grossToPara});
        criteria.criteria.push({fieldName:"gross", operator:"lessOrEqual", value:grossToPara});
    }
    
    if (!isNull(umsPara) && (umsPara = umsPara.trim()) != ""){
        //Object.assign(criteria, {"ums" : umsPara});
        criteria.criteria.push({fieldName:"ums", operator:"equals", value:umsPara});
    }
    
    if (!isNull(tradingAreaPara) && (tradingAreaPara = tradingAreaPara.trim()) != ""){
        //Object.assign(criteria, {"tradingArea" : tradingAreaPara});
        criteria.criteria.push({fieldName:"tradingArea", operator:"iContains", value:tradingAreaPara});
    }
    
    //if (!isNull(epFromPara) && (epFromPara = epFromPara.trim()) != ""){
    if (!isNull(epFromPara)){
        //Object.assign(criteria, {"enginePowerFrom" : epFromPara});
        criteria.criteria.push({fieldName:"enginePower", operator:"greaterOrEqual", value:epFromPara});
    }
    
    //if (!isNull(epToPara) && (epToPara = epToPara.trim()) != ""){
    if (!isNull(epToPara)){
        //Object.assign(criteria, {"enginePowerTo" : epToPara});
        criteria.criteria.push({fieldName:"enginePower", operator:"lessOrEqual", value:epToPara});
    }
    
    var criteriaInFilterEditor_msmcStat = {
            _constructor:"AdvancedCriteria", 
            criteria:[
                
            ], 
            operator:"and"
        };
    var criteriaTmp = isc.DataSource.flattenCriteria(msmcStatSearchResultLG.getFilterEditorCriteria());
    //console.log("criteriaInFilterEditor_msmcStat (b4): " + JSON.stringify(msmcStatSearchResultLG.getFilterEditorCriteria()));
     
    if (!isNull(criteriaTmp)) {
        if (!isNull(criteriaTmp.criteria)) {
            //compound criteria
            for (var i = 0; i < criteriaTmp.criteria.length; i++) {
                var item = criteriaTmp.criteria[i];
                if (!isNull(item.fieldName) && !item.fieldName.endsWith("Date") && item.fieldName != "issueOn") {
                    criteriaInFilterEditor_msmcStat.criteria.push(item);
                }
            }
        }
        /*
        else{
            //simple criteria
            for (var property in criteriaTmp) {
                if (criteriaTmp.hasOwnProperty(property)) {
                    //criteriaInFilterEditor_msmcStat.criteria.push(item);
                }
            }
        }
        */
    }
    
    //console.log("criteriaInFilterEditor_msmcStat (after): " + JSON.stringify(criteriaInFilterEditor_msmcStat));
    
    criteria = mergeCriteria(criteriaInFilterEditor_msmcStat, criteria, false);
    
    console.log("criteria for msmc_stat.js: " + JSON.stringify(criteria));
    msmcStatSearchResultLG.getData().useClientFiltering = false;
    console.log("msmcStatSearchResultLG.getData().useClientFiltering: " + msmcStatSearchResultLG.getData().useClientFiltering);
    
    msmcStatSearchResultLG.fetchData(criteria, function(dsResponse, data, dsRequest) {
        var c = searchResultPreText1 + dsResponse.totalRows + searchResultPostText1;
        console.log(new Date() + c);
        msmcStatRecCntLabel.setContents(c);
        console.log("msmcStatSearchResultLG.getTotalRows() after fetchData() (inside callback of fetchData()): " + msmcStatSearchResultLG.getTotalRows());
    });
    
    console.log("msmcStatSearchResultLG.getTotalRows() after fetchData() (outside callback of fetchData()): " + msmcStatSearchResultLG.getTotalRows());
   
}


