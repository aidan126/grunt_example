/***************************************************************************************************************
* Qualified Name	 	/webui/src/main/webapp/js/hkmis_cert/bccclc_statistic.js
* @author 				Neo Pak
* @since				2019-07-24
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-23				Neo Pak				Initial Implementation
* 00000		2019-07-25				Neo Pak				Update
* 
****************************************************************************************************************/

bccclc_statistic(certJobBccclcDS, ["id"], ['paged'] );

var criteriaForBccclcStat = {
        _constructor:"AdvancedCriteria", 
        criteria:[], 
        operator:"and"
    };
var paramsForBccclcStat = {};

function bccclc_statistic(dataSource, idFields, dataFetchModeValue)
{
	if(dataFetchModeValue==undefined){
		dataFetchModeValue = 'basic';
	}
	
	function get2ndLastMonday(d) 
	{ 
	  var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	  var d = new Date(d);
	  var day = d.getDay(),
	      diff = d.getDate() - day + (day == 0 ? -6:1) -7; // adjust when day is sunday

	  monday=new Date(d.setDate(diff));
	  var curr_date = monday.getDate();
	  var curr_month = monday.getMonth();
	  var curr_year = monday.getFullYear();
	  return new Date(curr_year, curr_month, curr_date);
	}

	function getLastSunday(d) 
	{
	  var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	  var d = new Date(d);
	  var day = d.getDay(),
	      diff = d.getDate() - day ; // adjust when day is sunday
	      
	      console.log(day);
	      console.log(diff);
	 
	  monday=new Date(d.setDate(diff));
	  var curr_date = monday.getDate();
	  var curr_month = monday.getMonth();
	  var curr_year = monday.getFullYear();
	  return new Date(curr_year, curr_month, curr_date);
	}
	
	
	function createCriteriaForBccclcStat(){
		criteriaForBccclcStat = {
		        _constructor:"AdvancedCriteria", 
		        criteria:[], 
		        operator:"and"
		    };
		
		var dateTypePara = bccSelectDate.getItem("dateType").getValue();
        var startDateQuery = bccSelectDate.getItem("startDateQuery").getDisplayValue();
        var endDateQuery = bccSelectDate.getItem("endDateQuery").getDisplayValue();
        
        var certType = bccClcForm.getValue("certType");
        var insurer_name1 = bccStatisticQueryForm.getValue("insurer_name1");
        
        
        var filterDateField = "";
        if (!isNull(dateTypePara))
            dateTypePara = dateTypePara.trim();
        
        switch(dateTypePara) {
            case "All Document Received Date":
                filterDateField = "doc_received_date";
                break;
            case "Application Date":
                filterDateField = "application_date";
                break;
            case "Complete Date":
                //filterDateField = "bccclc_complete_date";
                filterDateField = "completeDate";
                break;
            case "Expiry Date":
                filterDateField = "expiry_date";
                break;
            case "Issue Date":
                filterDateField = "issue_on";
                break;
        }
        
        paramsForBccclcStat = {"filterDateField": filterDateField};
        var selectedReportType = typeOfReportForm.getValues();
        
        if (!isNull(selectedReportType)) {
        	
        	if (!isNull(startDateQuery) && isDate(getAbsoluteDate(startDateQuery))) {
        		criteriaForBccclcStat.criteria.push({fieldName:filterDateField, operator:"greaterOrEqual", value:new Date(startDateQuery + " 00:00:00")});
	        	Object.assign(paramsForBccclcStat, {"filterDateFieldFrom": new Date(startDateQuery + " 00:00:00")});
        	}
        	
            if (!isNull(selectedReportType.reportType)) {
                if ((selectedReportType.reportType = selectedReportType.reportType.trim()) == "Daily"){
                    
                    if (!isNull(startDateQuery) && isDate(getAbsoluteDate(startDateQuery))) {
                        //criteriaForBccclcStat.criteria.push({fieldName:filterDateField, operator:"lessOrEqual", value:new Date(startDateQuery + " 23:59:59")});
                        //Object.assign(paramsForBccclcStat, {"filterDateFieldTo": new Date(startDateQuery + " 23:59:59")});
                        
                        var endDateTmp = new Date(startDateQuery + " 00:00:00");
                        var endDateTmpForHeading = new Date(endDateTmp.getTime());
                        Object.assign(paramsForBccclcStat, {"filterDateFieldToHeading": endDateTmpForHeading});
                        
                        endDateTmp.setDate(endDateTmp.getDate() + 1);
                        criteriaForBccclcStat.criteria.push({fieldName:filterDateField, operator:"lessOrEqual", value: endDateTmp});
                        Object.assign(paramsForBccclcStat, {"filterDateFieldTo": endDateTmp});
                    }
                }else{
                    
                    if (!isNull(endDateQuery) && isDate(getAbsoluteDate(endDateQuery))) {
                        //criteriaForBccclcStat.criteria.push({fieldName:filterDateField, operator:"lessOrEqual", value:new Date(endDateQuery + " 23:59:59")});
                        //Object.assign(paramsForBccclcStat, {"filterDateFieldTo": new Date(endDateQuery + " 23:59:59")});
                        
                        var endDateTmp = new Date(endDateQuery + " 00:00:00");
                        var endDateTmpForHeading = new Date(endDateTmp.getTime());
                        Object.assign(paramsForBccclcStat, {"filterDateFieldToHeading": endDateTmpForHeading});
                        
                        endDateTmp.setDate(endDateTmp.getDate() + 1);
                        criteriaForBccclcStat.criteria.push({fieldName:filterDateField, operator:"lessOrEqual", value: endDateTmp});
                        Object.assign(paramsForBccclcStat, {"filterDateFieldTo": endDateTmp});
                    }
                }
                
                
                var reportTypePara = "";
                /*
                if (selectedReportType.reportType == "Other")
                    reportTypePara = "";
                else reportTypePara = selectedReportType.reportType;
                */
                reportTypePara = selectedReportType.reportType;
                Object.assign(paramsForBccclcStat, {"selectedReportType": reportTypePara});
                
            }
        }
        
        if (!isNull(certType) && (certType = certType.trim()) != "") {
        	criteriaForBccclcStat.criteria.push({fieldName:"cert_type", operator:"equals", value:certType});
        	Object.assign(paramsForBccclcStat, {"cert_type": certType});
        }
        
        //if (!isNull(insurer_name1) && (insurer_name1 = insurer_name1.trim()) != "") {
    	if (!isNull(insurer_name1)) {
    		insurer_name1 = insurer_name1.trim();
        }else
        	insurer_name1 = "";
    	
    	criteriaForBccclcStat.criteria.push({fieldName:"insurer_name1", operator:"iContains", value:insurer_name1});
    	Object.assign(paramsForBccclcStat, {"insurer_name1": insurer_name1});
        
		var criteriaInFilterEditor_bccclcStat = {
	             _constructor:"AdvancedCriteria", 
	             criteria:[
	                 
	             ], 
	             operator:"and"
	         };
		var criteriaTmp = isc.DataSource.flattenCriteria(bccclcStatisticTableForm.getFilterEditorCriteria());
		
		if (!isNull(criteriaTmp) && !isNull(criteriaTmp.criteria)) {
			for (var i = 0; i < criteriaTmp.criteria.length; i++) {
		     	var item = criteriaTmp.criteria[i];
					if (!isNull(item.fieldName) && !item.fieldName.endsWith("Date") && item.fieldName != "issueOn") {
						criteriaInFilterEditor_bccclcStat.criteria.push(item);
		     	}
		     }
		}
		
		//criteriaForBccclcStat = mergeCriteria(criteriaInFilterEditor_bccclcStat, criteriaForBccclcStat, true);
		
	}
	
	

	var resultCountMsg = isc.TitleLabel.create({
		contents: "<p> Count: <b> 0 </b> </p>"
	});

	isc.DynamicForm.create({
		ID:"typeOfReportForm",
		isGroup: true, groupTitle: "Type of Report", width:360, height: 60,
	    items:
	    [
		    {
		        name:"reportType", type:"radioGroup", showTitle:false,vertical:false,width:90, height: 150,
		        valueMap:["Daily","Weekly","Monthly", "Annual","Other"], defaultValue:"Daily"
		        ,change: function(form, item, value){
		        	if (!isNull(value) && (value = value.trim()) != ""){
		        		console.log("\"Type of Report\" radio btn changed: " + value);
		                var today = new Date();
		                var currentYear = today.getFullYear();
		                var currentMonth = today.getMonth();
		                if (value == "Daily") {
		                    //set as today
		                    bccSelectDate.getItem("endDateQuery").hide();
		                    bccSelectDate.setValue("startDateQuery", today);
		                    
		                    
		                }else if (value == "Weekly") {
		                    //
		                    var weekStart = get2ndLastMonday(today);
		                    var weekEnd = getLastSunday(today);
		                    
		                    console.log("get2ndLastMonday: " + weekStart);
		                    console.log("getLastSunday: " + weekEnd);
		                    bccSelectDate.getItem("endDateQuery").show();
		                    bccSelectDate.setValue("startDateQuery", weekStart);
		                    bccSelectDate.setValue("endDateQuery", weekEnd);
		                    
		                }else if (value == "Monthly") {
		                    
		                    //var currentMonth = today.getMonth();
		                    var monthStart = new Date(currentYear, currentMonth, 1, 0, 0, 0, 0);
		                    var nextMonthStart = new Date(currentYear, currentMonth + 1, 1, 0, 0, 0, 0);
		                    var monthEnd = new Date(nextMonthStart - 1);
		                    bccSelectDate.getItem("endDateQuery").show();
		                    bccSelectDate.setValue("startDateQuery", monthStart);
		                    bccSelectDate.setValue("endDateQuery", monthEnd);

		                }else if (value == "Annual") {
		                    var yearStart = new Date(currentYear, 0, 1, 0, 0, 0, 0);
		                    var nextYearStart = new Date(currentYear + 1, 0, 1, 0, 0, 0, 0);
		                    var yearEnd = new Date(nextYearStart - 1);
		                    bccSelectDate.getItem("endDateQuery").show();
		                    bccSelectDate.setValue("startDateQuery", yearStart);
		                    bccSelectDate.setValue("endDateQuery", yearEnd); 
		                    
		                }else if (value == "Other") {
		                    bccSelectDate.getItem("endDateQuery").show();
		                }
		        	}
		        }
		    }
	    ]
	});

	isc.DynamicForm.create({
		ID:"bccClcForm",
		isGroup: true, groupTitle: "Form", width:130, height: 60,
	    items:
	    [
		    {
		        name: "certType", type:"radioGroup", showTitle:false,vertical:false,width:90, height: 150,
		        valueMap:["BCC","CLC"], defaultValue:"BCC"
		    }
	    ]
	});

	isc.DynamicForm.create({
	    ID:"bccSelectDate",
	    autoDraw: false,
	    width: 300,
	    height: 80,
	    numCols: 4,
	    colWidths: [50,"*",20,"*"],
	    isGroup: true, groupTitle: "Type of Date",
	    saveOnEnter: true,
	    submit: function(){
	        console.log("submit()");
	        bccStatisticSearchFormToolBar.getButton("searchBtn").click();
	    },

	    items: 
	    [
	        {   name: "dateType", 	title:"", type:"select",
	            width:250,
	            startRow: true, colSpan: 3,
	            valueMap:
	            [
		        	"All Document Received Date",
		        	"Application Date",
		        	"Complete Date",
		        	"Expiry Date",
		        	"Issue Date"
		        ], defaultValue:"Complete Date"
	        },
	        {name: "startDateQuery", title:"Date", type:"date", width:125, defaultValue: new Date(), useTextField:true, startRow: true},
	        {name: "endDateQuery", title:"To", type:"date", width:125, defaultValue: new Date(), useTextField:true, startRow: false, hidden:true}
	        
	    ]
	});


	isc.SearchForm.create({
		ID:"bccStatisticQueryForm",
		width: 200, height: 80,
		isGroup: true, groupTitle: "Name of Company",
		dataSource : dataSource, 
		numCols: 4,
		saveOnEnter: true,
		submit:function(){
			bccStatisticSearchFormToolBar.getButton('searchBtn').click();
		},
		fields: 
		[
			{name: "insurer_name1", title: "", width:200},

			{name: "refno", title: "Ref. No.", width:0, hidden:true},
			{name: "spname", title: "Reg Name", width:0, hidden:true},
			{name: "imono", title: "IMO NO.", width:0, hidden:true},
			{name: "expiry_date", 	title:"Exprity Date", width:0, hidden:true},
			{name: "issue_on", 	title:"Issue Date", width:0, hidden:true},
			//{name: "bccclc_complete_date", 	title:"Complete Date", width:0, hidden:true},
			{name: "completeDate", 	title:"Complete Date", width:0, hidden:true},
					
			{name: "submit_person", title: "Done By", width:0, hidden:true},
			{name: "authorized_official", title: "Print width signature", width:0, hidden:true},
			{name: "start_date", 	title:"start_date", width:0, hidden:true},
			{name: "valid_date", 	title:"valid_date", width:0, hidden:true},
			{name: "doc_received_date", 	title:"doc_received_date", width:0, hidden:true},
			{name: "application_date", 	title:"application_date", width:0, hidden:true},
		], 
	});

	isc.ButtonToolbar.create({
		ID:"bccStatisticSearchFormToolBar",
		width: 150,
		height: 40,
		layoutTopMargin: 10,
		buttons: 
		[
			{ name:"searchBtn", title:"Query", autoFit: true, disabled: false,
			  	click: function()
			    {
			  		
			  		
			  		/*
			        var criteria = {};
			        
			        var dateTypePara = bccSelectDate.getItem("dateType").getValue();
			        var startDateQuery = bccSelectDate.getItem("startDateQuery").getDisplayValue();
			        var endDateQuery = bccSelectDate.getItem("endDateQuery").getDisplayValue();
			        
			        var certType = bccClcForm.getValue("certType");
			        var insurer_name1 = bccStatisticQueryForm.getValue("insurer_name1");

			        criteria = {
			            _constructor:"AdvancedCriteria", 
			            criteria:[], 
			            operator:"and"
			        };
			          
			        
			        var filterDateField = "";
			        if (!isNull(dateTypePara))
			            dateTypePara = dateTypePara.trim();
			        
			        switch(dateTypePara)
			        {
			            case "All Document Received Date":
			                filterDateField = "doc_received_date";
			                break;
			            case "Application Date":
			                filterDateField = "application_date";
			                break;
			            case "Complete Date":
			                //filterDateField = "bccclc_complete_date";
			                filterDateField = "completeDate";
			                break;
			            case "Expiry Date":
			                filterDateField = "expiry_date";
			                break;
			            case "Issue Date":
			                filterDateField = "issue_on";
			                break;
			        }

			        var selectedReportType = typeOfReportForm.getValues();
			        
			        if (!isNull(selectedReportType)) {
			            if (!isNull(selectedReportType.reportType) && (selectedReportType.reportType = selectedReportType.reportType.trim()) == "Daily"){
			                criteria.criteria.push({fieldName:filterDateField, operator:"greaterOrEqual", value: new Date(startDateQuery + " 00:00:00")});
			                criteria.criteria.push({fieldName:filterDateField, operator:"lessOrEqual", value:new Date(startDateQuery + " 23:59:59")});
			                //console.log("Daily:\n" + JSON.stringify(criteria.criteria));
			            }else{
			                criteria.criteria.push({fieldName:filterDateField, operator:"greaterOrEqual", value:new Date(startDateQuery + " 00:00:00")});
			                criteria.criteria.push({fieldName:filterDateField, operator:"lessOrEqual", value:new Date(endDateQuery + " 23:59:59")});
			                //console.log("NOT Daily:\n" + JSON.stringify(criteria.criteria));
			            }
			        }

			        if (!isNull(certType) && (certType = certType.trim()) != ""){
			            criteria.criteria.push({fieldName:"cert_type", operator:"equals", value:certType});
			        }
			        
			        if (!isNull(insurer_name1) && (insurer_name1 = insurer_name1.trim()) != ""){
			            criteria.criteria.push({fieldName:"insurer_name1", operator:"iContains", value:insurer_name1});
			        }
			        */
			        
			        
			  		createCriteriaForBccclcStat();
			        // bccclcStatisticTableForm.setData([]);
			        
			  		//criteriaForBccclcStat
			  		//paramsForBccclcStat
			        bccclcStatisticTableForm.fetchData(paramsForBccclcStat, function(dsResponse, data, dsRequest) {
			            var c = "<p>  Count: <b> "+ dsResponse.totalRows +" </b> </p>";
			            console.log(new Date() + c);
			            resultCountMsg.setContents(c);
			            
			        }, {"operationId":"BCCCLC_Stat"});
			        resultCountMsg.setContents("<p>  Count: <b> "+ bccclcStatisticTableForm.getTotalRows() +" </b> </p>");
			    }
			},
			
			{ name:"printBtn", title:"Print", autoFit: true, disabled: false, 
				click: function(){
					
					/*
					var dateTypePara = bccSelectDate.getItem("dateType").getValue();
			        var startDateQuery = bccSelectDate.getItem("startDateQuery").getDisplayValue();
			        var endDateQuery = bccSelectDate.getItem("endDateQuery").getDisplayValue();
			        
			        var certType = bccClcForm.getValue("certType");
			        var insurer_name1 = bccStatisticQueryForm.getValue("insurer_name1");
			        
			        
			        var filterDateField = "";
			        if (!isNull(dateTypePara))
			            dateTypePara = dateTypePara.trim();
			        
			        switch(dateTypePara)
			        {
			            case "All Document Received Date":
			                filterDateField = "doc_received_date";
			                break;
			            case "Application Date":
			                filterDateField = "application_date";
			                break;
			            case "Complete Date":
			                //filterDateField = "bccclc_complete_date";
			                filterDateField = "completeDate";
			                break;
			            case "Expiry Date":
			                filterDateField = "expiry_date";
			                break;
			            case "Issue Date":
			                filterDateField = "issue_on";
			                break;
			        }

			        var params = {"filterDateField": filterDateField};
			        
			        
			        if (!isNull(startDateQuery) && isDate(getAbsoluteDate(startDateQuery)))
			        	Object.assign(params, {"filterDateFieldFrom": new Date(startDateQuery + " 00:00:00")});
			        
			        if (!isNull(certType) && (certType = certType.trim()) != "")
			        	Object.assign(params, {"cert_type": certType});
			        
			        if (!isNull(insurer_name1) && (insurer_name1 = insurer_name1.trim()) != "")
			        	Object.assign(params, {"insurer_name1": insurer_name1});
			        
			        
			        var selectedReportType = typeOfReportForm.getValues();
			        
			        if (!isNull(selectedReportType)) {
			            if (!isNull(selectedReportType.reportType) && (selectedReportType.reportType = selectedReportType.reportType.trim()) == "Daily"){
			                
			            	if (!isNull(startDateQuery) && isDate(getAbsoluteDate(startDateQuery)))
					        	Object.assign(params, {"filterDateFieldTo": new Date(startDateQuery + " 23:59:59")});
			            	
			            }else{
			            	if (!isNull(endDateQuery) && isDate(getAbsoluteDate(endDateQuery)))
					        	Object.assign(params, {"filterDateFieldTo": new Date(endDateQuery + " 23:59:59")});
			            	
			            }
			        }
			        */
			        
					createCriteriaForBccclcStat();
					ReportViewWindow.displayReport(["RPT_BCCCLC_Stat", paramsForBccclcStat]);
				}
			}
		],
	});

	isc.ListGrid.create({
		ID:"bccclcStatisticTableForm",
		dataSource: dataSource,
		autoFetchData: false,
		height:"100%",
		dataFetchMode:dataFetchModeValue,
		showFilterEditor:true, 
	    filterOnKeypress:false,
	    autoDraw: false,
	    overflow:"auto",
	    filterData: function(){
	    	
	    },
		fields: 
		[
			{name: "cert_type", title: "cert_type", width:120},
			{name: "jobno", title: "jobno", width:120},

			{name: "refno", title: "Ref. No.", width:120},
			{name: "spname", title: "Reg Name", width:200},
			{name: "imono", title: "IMO NO.", width:100},
			{name: "expiry_date", 	title:"Exprity Date", width:100},
			{name: "issue_on", 	title:"Issue Date", width:100},
			//{name: "bccclc_complete_date", 	title:"Complete Date", width:100},
			{name: "completeDate", 	title:"Complete Date", width:100},
			
			
			{name: "insurer_name1", title: "Insurer Company Name", width:200},
			{name: "submit_person", title: "Done By", width:120},
			{name: "authorized_official", title: "Print width signature", width:120},
		],
	});
	bccclcStatisticTableForm.getData().useClientFiltering = false;
	bccclcStatisticTableForm.getData().dropCacheOnUpdate = true;

	var exportBccStatButton = isc.HLayout.create({
	  	// layoutTopMargin: 0,
		// layoutLeftMargin: -20,
		height:"5%",
		members: 
		[
			resultCountMsg,
			isc.IExportButton.create({
				title: "Export",
				width: 90,
				height: 30,
				listGrid: bccclcStatisticTableForm
			})
		]
	});

	isc.HLayout.create({
		ID:"searchSectionLayout1",
	  	layoutMargin:10,
	  	height:90,
	  	width:"100%",
	  	membersMargin:20,
	  	members:
	  	[
	  		typeOfReportForm,
	  		bccClcForm,
	  		bccStatisticSearchFormToolBar
	  	]
	});

	isc.HLayout.create({
		ID:"searchSectionLayout2",
	  	layoutMargin:10,
	  	height:90,
	  	width:"100%",
	  	membersMargin:20,
	  	layoutTopMargin: -10,
	  	members:
	  	[
	  		bccSelectDate,
  	        bccStatisticQueryForm
	  	]
	});
	
	var mainLayout = isc.HLayout.create
	({
		members: 
		[
			isc.VLayout.create
			({
			    members: 
			    [
					isc.SectionStack.create({
					height: "100%",
						sections: 
						[
							{title: "Search", expanded: true, resizeable: false, items: 
								[ 
									searchSectionLayout1, 
									searchSectionLayout2 
								]
							},
							{title: "Result", expanded: true, items: 
								[ 
									bccclcStatisticTableForm,
									exportBccStatButton
								]
							}
						]
					})
				]
			})
		]
	});
	
	return isc.VLayout.create({
		members : [mainLayout]
	});
}

