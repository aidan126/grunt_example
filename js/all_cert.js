console.log("entered all_cert.js.");

var newTitle = "New";
var searchResultPreText1 = "<p> Total no. of search item: ";
var searchResultPreText2 = "<p> Count: ";
var searchResultPostText1 = " </p>";
var MaxExportRecordRange = 4000;
//var msmcCalledFrHistoryOfWork = false;



//function getLoggedInUserData(callback){
//	console.log("enter getLoggedInUserData()");
//	userDS.fetchData({"id": loginData.userId}, function (dsResponse, data, dsRequest) {
//		if (!isNull(data) && data.length > 0)
//			currentUser = data[0];
//		console.log("cert_dept_id in userDS: " + currentUser.cert_dept_id);
//		if (!isNull(currentUser.cert_dept_id)) {
//			userCertDeptDS.fetchData({"cert_dept_id": currentUser.cert_dept_id}, function (dsResponse, data, dsRequest) {
//				if (!isNull(data) && data.length > 0)
//					current_cert_dept = data[0];
//				console.log("cert_dept_id in userCertDeptDS: " + current_cert_dept.cert_dept_code);
//				if (!isNull(callback)){
//					callback();
//				}
//			});
//		}
//
//	});
//	
//	console.log("leave getLoggedInUserData()");
//}
//
//getLoggedInUserData(null);



function getCriteriaForToolBarGp(){
	var criteriaForToolBarGp;
}

function arrayContainsArray (superset, subset) {
  if (0 === subset.length) {
    return false;
  }
  /*
  return subset.every(function (value) {
	  console.log(value + "\n" + (superset.indexOf(value) >= 0) + "\n\n");
    return (superset.indexOf(value) >= 0);
  });
  */
  return subset.some(function (v) {
      return superset.indexOf(v) >= 0;
  });
  
  
  
}

function getAdvancedCriteria(criteriaPara){
    var advancedCriteria = {
        _constructor:"AdvancedCriteria", 
        criteria:[], 
        operator:"and"
    };
    for (var key in criteriaPara) {
        if (criteriaPara.hasOwnProperty(key)) {
            //console.log(key + " -> " + criteriaPara[key]);
            if (!isNull(criteriaPara[key])){
            	//if (criteriaPara[key].hasOwnProperty("criteria")){
            	if (key == "compoundCriteria"){
            		//compound criteria for > 1 field at the same time
            		//it is an array
            		console.log("compound criteria: " + JSON.stringify(criteriaPara[key]));
            		
            		criteriaPara[key].forEach(function (item, index) {
            			advancedCriteria.criteria.push(item);
            		});
            		
            		//advancedCriteria.criteria.push(criteriaPara[key]);
            	}else{
            		//simple criteria for 1 field
	                if (criteriaPara[key].constructor == Array){
	                    /*
	                    var adCrit = {
	                        criteria:[], 
	                        operator:"inSet"
	                    };
	                    
	                    console.log("Array in criteriaPara[key]: " + JSON.stringify(criteriaPara[key]));
	                    
	                    criteriaPara[key].forEach(function(element) {
	                        console.log("criteriaPara[key] element: " + element);
	                        //var selectedCert = element.substring(0, element.indexOf("CertCheckbox")).toUpperCase();
	                        //criteria_gp.form.push(element);
	                        adCrit.criteria.push({fieldName: key, value: element, operator: "iEquals"});
	                    });
	                    advancedCriteria.criteria.push(adCrit);
	                    */
	                    advancedCriteria.criteria.push({fieldName: key, value: criteriaPara[key], operator: "inSet"});
	                }else{
	                    advancedCriteria.criteria.push({fieldName: key, value: criteriaPara[key], operator: "equals"});
	                }
            	}
            }
        }
    }
    
    return advancedCriteria;
}




/*
var currentUser = {};
var current_cert_dept = "";

userDS.fetchData({"id": loginData.userId}, function (dsResponse, data, dsRequest) {
	if (!isNull(data) && data.length > 0)
		currentUser = data[0];
	console.log("cert_dept_id in userDS: " + currentUser.cert_dept_id);
	if (!isNull(currentUser.cert_dept_id)) {
		userCertDeptDS.fetchData({"cert_dept_id": currentUser.cert_dept_id}, function (dsResponse, data, dsRequest) {
			if (!isNull(data) && data.length > 0)
				current_cert_dept = data[0];
			console.log("cert_dept_id in userCertDeptDS: " + current_cert_dept.cert_dept_code);
		});
	}

});
*/





isc.ButtonToolbar.create({
	ID:"hkcertAllCertSearchToolBar",align: "left",
	width:150,
    autoDraw:false,
	buttons: [
        {   name: "clearBtn", title: "Clear", autoFit: true, disabled: false,
            click : function () {
                //hkcertAllCertSearch2.setValue('searchTarget', '');
                //pending
                //hkcertAllCertSearchJobScopeRadioGp.getItem("jobSearchScope").setValue("My Job");
                hkcertAllCertSearchJobScopeRadioGp.clearValues();

                /*
                //as per JL's request to change the UI
                hkcertAllCertSearchCertTypeGp.getItem("allCertCheckbox").setValue("unverified");
                hkcertAllCertSearchCertTypeGp.getItem("bccCertCheckbox").setValue("unverified");
                hkcertAllCertSearchCertTypeGp.getItem("clcCertCheckbox").setValue("unverified");
                hkcertAllCertSearchCertTypeGp.getItem("msmcCertCheckbox").setValue("unverified");
                hkcertAllCertSearchCertTypeGp.getItem("dmlciCertCheckbox").setValue("unverified");
                */
                //as per JL's request to change the UI
                hkcertAllCertSearchDeptCodeGp.clearValues();
                hkcertAllCertSearchDeptCodeGp.setDisabled(true);
                
                //hkcertAllCertSearchCertTypeGp.setValue("certTypeDropDown", null);
                hkcertAllCertSearchCertTypeGp.clearValues();


                /*
                hkcertAllCertSearchCertStatusGp.getItem("processStatusCheckbox").setValue("unverified");
                hkcertAllCertSearchCertStatusGp.getItem("completeStatusCheckbox").setValue("unverified");
                hkcertAllCertSearchCertStatusGp.getItem("cancelStatusCheckbox").setValue("unverified");
                */
                hkcertAllCertSearchCertStatusGp.clearValues();
                
                
                //hkcertAllCertSearch2.getItem("searchTarget").setValue("");
                hkcertAllCertSearch2.getItem("editStatus").setValue("");
                hkcertAllCertSearch2.getItem("printStatus").setValue("");
                hkcertAllCertSearch2.getItem("startPerson").setValue("");
                hkcertAllCertSearch2.getItem("beginDate").setValue("");
                hkcertAllCertSearch2.getItem("lastEditPerson").setValue("");
                hkcertAllCertSearch2.getItem("lastEditDate").setValue("");
                
                
                /*
                hkcertAllCertSearchMainCriteria.getItem("jobno").setValue("");
                hkcertAllCertSearchMainCriteria.getItem("refno").setValue("");
                hkcertAllCertSearchMainCriteria.getItem("spname").setValue("");
                hkcertAllCertSearchMainCriteria.getItem("imono").setValue("");
                hkcertAllCertSearchMainCriteria.getItem("distinctNo").setValue("");
                */
                hkcertAllCertSearchMainCriteria.clearValues();
                
                hkcertAllCertSearchResultListLG.setFilterEditorCriteria();
                hkcertAllCertSearchResultListLG.clearCriteria();
                searchCertJobs();
            }
        },
        {   name:"searchBtn", title:"Find Job", autoFit: true, disabled: false,
            click : function () {
            	console.log("1st line of click function of \"Find Job\"");
            	searchCertJobs();
            	console.log("last line of click function of \"Find Job\"");
            }
        }
	    /*
	    ,
	    {   name: "newRecBtn", title: "Advanced Query", autoFit: true, disabled: false, onControl:"",
            click : function () {
                //openMsmcCertRecDetail(null);
                //isc.say("Advanced Query");
                initialOperatorWindow("Operating Company");
            }
	    }
	    */
    ]
});

isc.FormLayout.create({
	ID:"hkcertAllCertSearchJobScopeRadioGp",
    width:180,
    height:24,
    autoDraw:false,
    margin:7,
    saveOnEnter: true,
    submit: function(){
		console.log("submit()");
		searchCertJobs();
	},
    items:[{
        name:"jobSearchScope", type:"radioGroup", showTitle:false, vertical:false, width:180,
        valueMap:["My Job","My Dept","Other Dept"], defaultValue:"My Job",
        saveOnEnter: true,
        change: function(form, item, value, oldValue){
        	if (isNull(value))
        		return;
        	if (value == "Other Dept"){
        		hkcertAllCertSearchDeptCodeGp.setDisabled(false);
        	}else{
        		hkcertAllCertSearchDeptCodeGp.clearValues();
        		hkcertAllCertSearchDeptCodeGp.setDisabled(true);
        	}
        }
    }]
});




/*
isc.FormLayout.create({
	ID:"hkcertAllCertSearchCertTypeGp",
    items:[{
        name:"alignment", type:"radioGroup", showTitle:false,vertical:false,width:180,
        valueMap:["All","BCC","CLC","MSMC","DMLC-I"], defaultValue:"All",
        change:"countryList.getField('countryCode').align = value; countryList.markForRedraw()"
    }]
});
*/


/*
isc.DynamicForm.create({
	ID:"hkcertAllCertSearchCertTypeGp",
    autoDraw: false,
    //left:20,
    numCols:2,
    width:90,
    items: [
        {
            name: "allCertCheckbox",
            editorType: "CheckboxItem",
            title: "All",
            width: 50,
            startRow: true,
            valueMap: {
                "verified": true,
                "unverified": false
            }
        },
        {
            name: "bccCertCheckbox",
            editorType: "CheckboxItem",
            title: "BCC",
            width: 50,
            startRow: true,
            valueMap: {
                "verified": true,
                "unverified": false
            }
        },
        {
            name: "clcCertCheckbox",
            editorType: "CheckboxItem",
            title: "CLC",
            width: 50,
            startRow: true,
            valueMap: {
                "verified": true,
                "unverified": false
            }
        },
        {
            name: "msmcCertCheckbox",
            editorType: "CheckboxItem",
            title: "MSMC",
            width: 50,
            startRow: true,
            valueMap: {
                "verified": true,
                "unverified": false
            }
        },
        {
            name: "dmlciCertCheckbox",
            editorType: "CheckboxItem",
            title: "DMLC-I",
            width: 50,
            startRow: true,
            valueMap: {
                "verified": true,
                "unverified": false
            }
        }
    ]
});
*/


/*
 ======change log 00001 =================== by dicky lee 20190725 ==
var certTypeList = [ {certType : "BCC"}, {certType : "CLC"}, {certType : "MSMC"}, {certType : "DMLC-I"} ];

*/

var certTypeList = [ {certType : "BCC"}, {certType : "CLC"}, {certType : "MSMC"}, {certType : "MLC"} ];
/* ==== end of change 00001    =====*/

//var certTypeListDS =
isc.DataSource.create({
    ID: "certTypeListDS",
    fields:[
        {name:"certType", title:"Cert Type"}       
    ],
    clientOnly: true,
    testData: certTypeList
});


isc.DynamicForm.create({
	ID:"hkcertAllCertSearchDeptCodeGp",
    autoDraw: false,
    //left:20,
    //width:90,
    height:24,
    margin:10,
    //numCols:2,
    disabled: true,
    saveOnEnter: true,
    submit: function(){
		console.log("submit()");
		searchCertJobs();
	},
    items: [
        {
            name: "deptCodeDropDown",
            title: "Dept Code:",
            type: "select",
            optionDataSource: "userCertDeptDS",
            valueField: "cert_dept_code",
            displayField: "cert_dept_code",
            pickListWidth: 220,
            pickListFields: [{ name: "cert_dept_name", title:"Dept" }, { name: "cert_dept_code", hidden:true } ],
            multiple: true,
            //showTitle: false,
            startRow: true,
           
        }
        
    ]
});


isc.DynamicForm.create({
	ID:"hkcertAllCertSearchCertTypeGp",
    autoDraw: false,
    //left:20,
    //width:90,
    height:24,
    //margin:10,
    //numCols:2,
    saveOnEnter: true,
    submit: function(){
		console.log("submit()");
		searchCertJobs();
	},
    items: [
        {
            name: "certTypeDropDown",
            title: "Cert Type:",
            type: "select",
            optionDataSource: "certTypeListDS",
            valueField: "certType",
            displayField: "certType",
            pickListFields: [{ name: "certType" }, { name: "certType", hidden:true } ],
            multiple: true,
            //showTitle: false,
            startRow: true,
            /*
            valueMap: {
                "All" : "All",
                "BCC" : "BCC",
                "CLC" : "CLC",
                "MSMC" : "MSMC",
                "DMLC-I" : "DMLC-I"
            }
            */
        }
        
    ]
});


isc.HLayout.create({
	ID:"hkcertAllCertSearchR1HLayout", 
    //width:680, 
	height:50,
    //layoutTopMargin:10, 
    //layoutBottomMargin:10,
    //padding:10,
    /*top:20,*/
    defaultLayoutAlign: "center",    
    //isGroup: true, groupTitle: "Type of Report",
    showEdges: false,
    autoDraw:false,
    membersMargin:5, members:[hkcertAllCertSearchJobScopeRadioGp, hkcertAllCertSearchDeptCodeGp, hkcertAllCertSearchCertTypeGp, 
    	isc.LayoutSpacer.create({width:"10"}),
    	hkcertAllCertSearchToolBar]
});














isc.DynamicForm.create({
	ID:"hkcertAllCertSearchCertStatusGp",
    //autoDraw: false,
    numCols:2,
    //width:180,
    //height:70,
    saveOnEnter: true,
    submit: function(){
		console.log("submit()");
		searchCertJobs();
	},
    items: [
        {
            name: "processStatusCheckbox",
            editorType: "CheckboxItem",
            title: "Process",
            width: 50,
            startRow: true,
            saveOnEnter: true,
            defaultValue: "verified",
            valueMap: {
                "verified": true,
                "unverified": false
            }
        },
        {
            name: "completeStatusCheckbox",
            editorType: "CheckboxItem",
            title: "Complete",
            width: 50,
            startRow: true,
            saveOnEnter: true,
            defaultValue: "unverified",
            valueMap: {
                "verified": true,
                "unverified": false
            }
        },
        {
            name: "cancelStatusCheckbox",
            editorType: "CheckboxItem",
            title: "Cancel",
            width: 50,
            startRow: true,
            saveOnEnter: true,
            defaultValue: "unverified",
            valueMap: {
                "verified": true,
                "unverified": false
            }
        }
        
        
    ]
});

isc.SearchForm.create({
	ID: "hkcertAllCertSearchMainCriteria",
    //dataSource : "seafarerDS",
    dataSource : "hkmisCertDS",
    width:400,
    numCols: 6,
    colWidths: [40, "*", 20, "*", 20, "*"],
    autoDraw:false,
    //defaultLayoutAlign: "bottom",
    saveOnEnter: true,
    submit: function(){
		console.log("submit()");
		searchCertJobs();
	},
    fields: [
    	{type:"RowSpacerItem"},
        {name: "jobno", title: "Job No.", type: "text", width:"*"},
        {name: "refno", title: "Ref No.", type: "text", width:"*"},
        {name: "spname", title: "Name of Ship", type: "text", width:"*"},
        {name: "imono", title: "IMO No.", type: "text", width:"*"},
        {name: "distinctNo", title: "Off.No.(Distinct No.)", type: "text", width:"*"},
        {name: "editStatus", title: "Edit Status", type: "text", hidden:true},

        //,{name: "form", title: "Form", type: "text", width:"*"}   
    ]
});

/*
isc.HLayout.create({
	ID:"hkcertAllCertSearchMainCriteriaGp",
    //width:950,
	width:200,
    height:15,
  	//layoutMargin:5,
  	membersMargin:5,
    autoDraw:false,
  	members:[
  	        //hkcertAllCertSearchJobScopeRadioGp, 
  	        hkcertAllCertSearchCertTypeGp, hkcertAllCertSearchCertStatusGp
  	         ]
});
*/

isc.HLayout.create({
	ID:"hkcertAllCertSearchMainCriteriaHLayout",
    //width:950,
	//width:"100%",
	
	
    //width:765,
	//width:400,
    height:15,
  	//layoutMargin:5,
  	membersMargin:5,
    autoDraw:false,
  	members:[
  	        //hkcertAllCertSearchCertTypeGp, 
            //hkcertAllCertSearchMainCriteria,hkcertAllCertSearchCertStatusGp
  			hkcertAllCertSearchMainCriteria
            ,hkcertAllCertSearchCertStatusGp
            ]
});


isc.VLayout.create({
	//ID:"hkcertAllCertSearchMainCriteriaLayout",
	ID:"hkcertAllCertSearchMainCriteriaVLayout",
  	//width:950,
  	//width:1080,
  	//below is previously used width value
	//width:765,
  	//height:160,
  	membersMargin:5,
  	//layoutMargin:10,
  	layoutBottomMargin:10,
    autoDraw:false,
  	members:[
  		hkcertAllCertSearchR1HLayout, hkcertAllCertSearchMainCriteriaHLayout
    ]
});

isc.HLayout.create({
	ID:"hkcertAllCertSearchMainCriteriaLayout",
    //width:950,
	//width:"100%",
    //height:15,
  	//layoutMargin:5,
  	membersMargin:5,
    autoDraw:false,
    overflow:"auto",
  	members:[
  	        hkcertAllCertSearchMainCriteriaVLayout
            //, hkcertAllCertSearchMainCriteria
            //,hkcertAllCertSearchCertStatusGp
  	         ]
});







//----------------------------------------------------------------------------------------------------------------------------------------------------------



isc.SearchForm.create({
	ID:"hkcertAllCertSearch2",
  //dataSource : "seafarerDS",
  dataSource : "hkmisCertDS",
  numCols: 6,
  autoDraw: false,
	saveOnEnter:true,
	submit:function(){
		hkcertAllCertSearchToolBar.getButton('searchBtn').click();
	},
	fields: [
				//{ name: "surname", title: "test", type: "options"},
	         
             //{ name: "searchTarget", title: "DemoField", type: "text"},

	         {name: "editStatus", title: "Edit Status", type: "text"},
	         {name: "printStatus", title: "Print Status", type: "text"},
	         {name: "startPerson", title: "Start Person", type: "text"},
	         {name: "beginDate", title: "Start Date", type: "text"},
	         {name: "lastEditPerson", title: "Last Editors", type: "text"},
	         {name: "lastEditDate", title: "Last Edit Date", type: "text"}


            ]
});



isc.HLayout.create({
	ID:"hkcertAllCertSearchSectionLayout",
  	layoutMargin:10,
  	height:90,
  	//width:950,
  	width:"100%",
  	overflow:"auto",
  	autoDraw: false,
  	membersMargin:20,
  	members:[
  	         hkcertAllCertSearch2
  	         ]
});


//----------------------------------------------------------------------------------------------------------------------------------------------------------




isc.ListGrid.create({
	ID:"hkcertAllCertSearchResultListLG", dataSource : hkmisCertDS, showFilterEditor:true, filterOnKeypress:false,
	//dataFetchMode: "basic",
	
	useClientFiltering: false,
	dropCacheOnUpdate: true,
	filterLocalData: false,
	
    height:"*",
    autoDraw:false,
    overflow:"auto",
	fields: [
        {name: "refno", title: "Ref No.", width:120, canSort: false},
        {name: "form", title: "Form", width:60},
        {name: "ver", title: "Ver", width:40},
        {name: "spname", title: "Name of Ship", width:200},
        {name: "imono", title: "IMO NO.", width:80},
        //{name: "offno", title: "Off. No.", width:80},
        {name: "distinctNo", title: "Off. No.", width:80},
        {name: "jobno", title: "Job No.", width:150},
        {name: "ship_jobno_sptype", title: "Type of Ship", width:160},
        
        {name: "status", title: "Status", width:100},
        
        {name: "editStatus", title: "Edit Status", width:100},
        {name: "printStatus", title: "Print Status", width:100},
        {name: "cert_dept_code", title: "Department", width:110},
        {name: "startPerson", title: "Start Person", width:120},
        {name: "beginDate", title: "Start Date", width:140},
        
        {name: "completeDate", title: "Complete Date", width:140},
        
        {name: "lastEditPerson", title: "Last Editors", width:120},
        {name: "lastEditDate",  title: "Last Edit Date", width:140}
        
    ],
    filterData: function(){
    	console.log("user entered values in FilterEditor of hkcertAllCertSearchResultListLG");
    	searchCertJobs();
        console.log("user leave values in FilterEditor of hkcertAllCertSearchResultListLG");
    },
    rowDoubleClick:function(record, recordNum, fieldNum){
        if (record['form'] == 'BCC' || record['form'] == 'CLC'){
            addBccclcCert(record, ['0']);
        }
        if (record['form'] == 'MSMC'){
            openMsmcCertRecDetail(record);
        }
        // ======= change log 00001 by dicky 20190725==================
        if (record['form'] == 'MLC'){
            openDmlcCertRecDetail(record);
        }
        // ======end of change =============
    }
});



if (!isNull(hkcertAllCertSearchResultListLG.getData())){
	hkcertAllCertSearchResultListLG.getData().useClientFiltering = false;
	hkcertAllCertSearchResultListLG.getData().dropCacheOnUpdate = true;
}




isc.TitleLabel.create({
	ID:"hkcertAllCertSearchResultListLGSummary", contents: searchResultPreText1 + "0" + searchResultPostText1
    ,autoDraw:false
});





isc.ListGrid.create({
	ID:"msmcTestingLG", dataSource : "bccclcDS", showFilterEditor:true, filterOnKeypress:true,
    autoDraw:false,
	fields: [
	         {name: "jobno", title: "jobno", width:80},
			 {name: "certType", title: "certType", width:80},
			 {name: "shipId", title: "shipId", width:80},
			 {name: "refno", title: "refno", width:100}



			 /*
			 ,
			 {name: "imoNo", title: "IMO NO.", width:80},
			 {name: "offNo", title: "Off. No.", width:80},
			 {name: "jobNo", title: "Job No.", width:80},
			 {name: "spType", title: "Type of Ship", width:100},
			 {name: "editStatus", title: "Edit Status", width:80},
			 {name: "printStatus", title: "Print Status", width:80},
			 {name: "startPerson", title: "Start Person", width:80},
			 {name: "beginDate", title: "Start Date", width:80},
			 {name: "lastEditPerson", title: "Last Editors", width:80},
			 {name: "lastEditDate",  title: "Last Edit Date", width:100}
			 */


	         ],
	         rowDoubleClick:function(record, recordNum, fieldNum){

	        	 /*
	        	 if (record['form'] == 'BCC')
	        	 {
	        		openCrewListDetail(record);
	        	 }

	        	 if (record['form'] == 'MSMC')
	        	 {
	        		 openMsmcCertRecDetail(record);
	        	 }
	        	 */

	         }

});

//----------------------------------------------------------------------------------------------------------------------------------------------------------


var tmpResultSetForTooLongExcelExport = [];

//fetching records group by group for exporting to Excel
isc.ListGrid.create({
	ID:"hiddenLGForExportExcel", dataSource : hkmisCertDS, showFilterEditor:true, filterOnKeypress:false,
	//dataFetchMode: "basic",
	autoFetchData:false,
	
	useClientFiltering: false,
	dropCacheOnUpdate: true,
	filterLocalData: false,
	
	
    height:"*",
    autoDraw:false,
    overflow:"auto",
	fields: hkcertAllCertSearchResultListLG.getFields()
	,dataArrived: function(startRow, endRow) {
		
		console.log("------------------ dataArrived event in hiddenLGForExportExcel ------------------------------");
		console.log("this.data[" + "startRow" + "]: " + JSON.stringify(this.data.localData[startRow]));
		
		
		var tmpExportFields = hkcertAllCertSearchResultListLG.getFields().map(a => a.name);
		
		for (var i = startRow; i < endRow; i++) {
			if (isNull(this.data.localData[i])) {
				continue;
			}
			//console.log("this.data.localData[" + i + "]: \n" + JSON.stringify(this.data.localData[i]));
			var currentRec = this.data.localData[i];
			var tmpRec = {};
			for (var property in currentRec) {
	    		if (currentRec.hasOwnProperty(property)) {
	                if (tmpExportFields.includes(property)){
	                	/*
	                	//debug
	                	if (i == startRow)
	                		console.log(JSON.stringify({property: currentRec[property]}));
                		*/
	                	
	                	var tmpCurrField = {};
	                	tmpCurrField[property] = currentRec[property];
	                	Object.assign(tmpRec, tmpCurrField);
	                }
	    		}
	    	}
			//console.log("new rec to append:\n" + JSON.stringify(tmpRec));
			hiddenLGForExportExcel_2.addData(tmpRec);
		}
		
		
	}
});


//for storing fetched records for exporting to Excel
isc.ListGrid.create({
	ID:"hiddenLGForExportExcel_2", dataSource : hkmisCertDS, showFilterEditor:true, filterOnKeypress:false,
	//dataFetchMode: "basic",
	
	//----------------------------------
	autoFetchData:false,
	saveLocally: true,
	//----------------------------------
	
	useClientFiltering: false,
	dropCacheOnUpdate: true,
	filterLocalData: false,
	
    height:"*",
    autoDraw:false,
    overflow:"auto",
	fields: hkcertAllCertSearchResultListLG.getFields()
});





var LGSummaryBar = isc.HLayout.create({
    height:20,
    membersMargin:5,
    members: [
    	hkcertAllCertSearchResultListLGSummary
    	
    	,isc.Label.create({
            width:100,
            //height: 20,
            //styleName: "helloWorldText",
            padding: 0,
            //backgroundColor: "#ffffd0",
            layoutTopMargin: 5,
            align: "left",
            valign: "center",
            autoDraw: false,
            wrap: false,
            showEdges: false,
            showShadow: false,
            //icon: "icons/16/world.png",
            contents: "Export searched record range (Max: 4000)"
        })
    	
    	,isc.ControlledDynamicForm.create({
            ID: "allCertExportRecRange",
//            dataSource: "certJobMsmcDS",
//            valuesManager:valueMan,
            //autoFocus: true,
            numCols: 4,
    		//onControl: "MSMC_WRITE",
            width:200,
            //colWidths: [190, "*"],
            colWidths: [50, "*",30,"*"],
            //align:"right",
            autoDraw: false,
            items:[
                {
                    type: "text",
                    name: "startRow",
                    title: "From:",
                    width: 60,
                    //selectOnFocus: true,
                    wrapTitle: false,
                    textAlign:"center",
                    //valueMap:["+MOD", "-MOD"]
                    defaultValue: "1"
                },
                {
                    type: "text",
                    name: "endRow",
                    title: "To:",
                    width: 60,
                    //selectOnFocus: true,
                    wrapTitle: false,
                    textAlign:"center",
                    //valueMap:["+MOD", "-MOD"]
                    defaultValue: MaxExportRecordRange
                }
            ]
        })
    	
    	
		, isc.IExportButton.create({
			title: "Export",
			width: 120,
			listGrid: hkcertAllCertSearchResultListLG,
			exportFields: hkcertAllCertSearchResultListLG.getFields().map(a => a.name),
			mode:"refetchToExportForTooManySQLPara",
			criteriaCallback: function(){
				//todo
				var critArr = createCriteria();
				var criteria2 = critArr[1];
				
				//this.criteria = {Com_cd: !isNull(CompMgmtListGrid.getSelectedRecord()) ? CompMgmtListGrid.getSelectedRecord().Com_cd : ""};
				this.criteria = criteria2;
				this.fetchDataArguments = {"operationId":"FIND_ALL_CERTS", data: criteria2};
			}
			
			,click: function(){
				var tmpDataPageSize = 1000;
				var noOfTimesFetch = 0;
				var listGridTotalRows = 0;
				var listGridRetrievedRows = 0;
				var resulted_listGrid = {};
				var resultedRecordSet = [];
				
				var critArr = createCriteria();
				var criteria2 = critArr[1];
				this.criteria = criteria2;
				var fetchDataArguments = {"operationId":"FIND_ALL_CERTS", data: criteria2};
				
				var startRowNum = -1;
				var endRowNum = -1;
                var noOfRecToFetch = -1;
				var targetStartRow = parseInt(allCertExportRecRange.getValue("startRow"));
				var targetEndRow = parseInt(allCertExportRecRange.getValue("endRow"));
                
                
                var certJobBaseLGRecCount = hkcertAllCertSearchResultListLG.getTotalRows();
				
				console.log("start of work for exporting to Excel");
				
				if (isNull(targetStartRow) || !isc.isA.Number(targetStartRow) || targetStartRow <= 0 
//						|| targetStartRow > certJobBaseLGRecCount 
						|| isNull(targetEndRow) || !isc.isA.Number(targetEndRow) || targetEndRow <= 0 
//						|| targetEndRow > certJobBaseLGRecCount 
						|| (targetEndRow - targetStartRow + 1 <= 0)) {
					isc.say("Please input valid record range.<br/>(eg: 1-4000, 1001-5000, etc)");
					return;
				}
				
				if (targetEndRow - targetStartRow + 1 > MaxExportRecordRange) {
					isc.say("The maximum of export record range is " + MaxExportRecordRange);
					return;
				}
                
				noOfRecToFetch = targetEndRow - targetStartRow + 1;
                startRowNum = targetStartRow - 1;
                if (noOfRecToFetch < tmpDataPageSize)
                    endRowNum = targetEndRow;
                else    endRowNum = startRowNum + tmpDataPageSize;
				
				
				
				
				tmpResultSetForTooLongExcelExport = [];
				hiddenLGForExportExcel.dataPageSize = 1000;
				//hiddenLGForExportExcel.dataPageSize = 75;
				hiddenLGForExportExcel.invalidateCache();
				hiddenLGForExportExcel.setData([]);
				hiddenLGForExportExcel_2.setData([]);
				Object.assign(fetchDataArguments, {startRow: startRowNum, endRow: endRowNum, sortBy: hkcertAllCertSearchResultListLG.getSort()});
				
				
				console.log("------------- start to run special xls export locally ------------------");
				listGrid_fetchData(criteria2, fetchDataArguments);
				
				function listGrid_fetchData(criteria, fetchDataArguments) {
					hiddenLGForExportExcel.dataPageSize = 1000;
					//hiddenLGForExportExcel.dataPageSize = 75;
					hiddenLGForExportExcel.setData([]);
					
					hiddenLGForExportExcel.fetchData(criteria, function (dsResponse, data, dsRequest) {
						noOfTimesFetch++;
						console.log("-------------------------------\n" + "noOfTimesFetch: " + noOfTimesFetch);
						
						if (dsResponse.status != 0) {
				            console.log("dsResponse.status != 0");
				            return;
				        }
						if (noOfTimesFetch == 1) {
							listGridTotalRows = dsResponse.totalRows;
							
						}
						
						//collect fetched records
						if (!isNull(data) && data.length > 0 && !isNull(data[0])) {
							listGridRetrievedRows += data.length;
							
							resultedRecordSet = resultedRecordSet.concat(data);
							//resulted_listGrid.setData([]);
							//resulted_listGrid.setData(data);
							
							//console.log("resulted_listGrid:\n" + JSON.stringify(resultedRecordSet));
							console.log("no of retrieved rec until current round: " + JSON.stringify(resultedRecordSet.length));
						}
						
						//determine whether continue to fetch or export
//						if (listGridRetrievedRows < noOfRecToFetch) {
						if (!isNull(data) && data.length >= tmpDataPageSize) {
							//fetching not yet finished
							startRowNum += tmpDataPageSize;
							
							
							if (noOfRecToFetch - listGridRetrievedRows >= tmpDataPageSize) {
								endRowNum += tmpDataPageSize;
							}else{
								endRowNum = targetEndRow;
							}
							
							//endRowNum += tmpDataPageSize;
							
							console.log("Next round para:" + JSON.stringify({startRow: startRowNum, endRow: endRowNum}));
							Object.assign(fetchDataArguments, {startRow: startRowNum, endRow: endRowNum});
							
							listGrid_fetchData(criteria, fetchDataArguments);
						}else{
							//fetching finished
							console.log("\n" + "no of retrieved rec finally: " + JSON.stringify(resultedRecordSet.length));
							
							//hiddenLGForExportExcel.setData(resultedRecordSet);
							
							hiddenLGForExportExcel_2.exportClientData();
							
							//listGrid.exportClientData({ignoreTimeout:true, "endRow":-1, exportAs:"xls"});
							//listGrid.exportClientData(resultedRecordSet, {ignoreTimeout:true, "endRow":-1, exportAs:"xls", exportFilename:fileName, exportFields:exportFieldsTmp, exportHeaderless:exportHeaderlessTmp});
							
							//hkcertAllCertSearchResultListLG.dataPageSize = 75;
						}
						
						
					}, fetchDataArguments);
				}
				
				///---------------------------------------------------------------------------------------------------------------------------------------------------------------
				
			}
			
		})
    		
    ]
});  
isc.VLayout.create({
    ID: "mainLayoutMsmc",
    membersMargin: 10,
    members: [
        //isc.TitleLabel.create({ID:"sectionTitle", contents: "<p><b><font size=3px>BCC. CLC and MSMC Certificate Issuing System</font></b></p>"}),
        
        isc.SectionStack.create({
            height:220,
            sections: [
                //20190715 decided to eliminate advanced search section
                {title: "Search", expanded: true, resizeable: false, items: [ hkcertAllCertSearchMainCriteriaLayout
                    //,hkcertAllCertSearchSectionLayout
                ]}
                
                //, {title: "Result", expanded: true, items: [ hkcertAllCertSearchResultListLG, msmcTestingLG, hkcertAllCertSearchResultListLGSummary ]}
                
                //below are currently used
                //, {title: "Result", expanded: true, items: [ hkcertAllCertSearchResultListLG, hkcertAllCertSearchResultListLGSummary ]}
                
                ,
            ]
        }),
        hkcertAllCertSearchResultListLG
        //, hkcertAllCertSearchResultListLGSummary
        , LGSummaryBar
    ]
});

//hkcertAllCertSearchToolBar.getButton('searchBtn').click();

function selectProcessCheckbox(){
    hkcertAllCertSearchCertStatusGp.getItem("processStatusCheckbox").setValue("verified");
    hkcertAllCertSearchCertStatusGp.getItem("completeStatusCheckbox").setValue("unverified");
    hkcertAllCertSearchCertStatusGp.getItem("cancelStatusCheckbox").setValue("unverified");
}

function selectCompleteCancelCheckbox(){
    console.log("selectCompleteCancelCheckbox() start");
    hkcertAllCertSearchCertStatusGp.getItem("processStatusCheckbox").setValue("unverified");
    hkcertAllCertSearchCertStatusGp.getItem("completeStatusCheckbox").setValue("verified");
    hkcertAllCertSearchCertStatusGp.getItem("cancelStatusCheckbox").setValue("verified");
    console.log("selectCompleteCancelCheckbox() end");
}

function selectSupervisorSeacrhMode(){
    console.log("Supervisor:");
    hkcertAllCertSearchJobScopeRadioGp.getItem('jobSearchScope').setValue("My Dept");
    
    hkcertAllCertSearchCertTypeGp.getItem('certTypeDropDown').setValue(['BCC','CLC']);
    
    hkcertAllCertSearchMainCriteria.setValue('editStatus', '2');
    
    hkcertAllCertSearchCertStatusGp.getItem("processStatusCheckbox").setValue("verified");
    hkcertAllCertSearchCertStatusGp.getItem("completeStatusCheckbox").setValue("unverified");
    hkcertAllCertSearchCertStatusGp.getItem("cancelStatusCheckbox").setValue("unverified");
}



function clearFilterEditorField(listGridObj, clearFieldName){
	if (isNull(listGridObj) || isNull(listGridObj.filterEditor) || isNull(clearFieldName))
		return;
	
	clearFieldName = clearFieldName.trim();
	if (clearFieldName == "")
		return;
	
	var tmpFilterEditorCriteria = listGridObj.getFilterEditorCriteria();
	
	if (!isNull(tmpFilterEditorCriteria) && !isNull(tmpFilterEditorCriteria[clearFieldName])){
		delete tmpFilterEditorCriteria[clearFieldName];
		listGridObj.setFilterEditorCriteria(tmpFilterEditorCriteria);
	}
}

function searchCertJobs(){
	
	getLoggedInUserData(findJobs);
}


function createCriteria(){

    var criteria = hkcertAllCertSearch2.getValuesAsCriteria(false);
    var criteria2 = {};
    
    //added for filtering
    var criteria_gp = {};
    var selectedJobScope = hkcertAllCertSearchJobScopeRadioGp.getItem("jobSearchScope").getValue();
    var checkedDeptCodeArr = hkcertAllCertSearchDeptCodeGp.getValue("deptCodeDropDown");
    
    if (!isNull(selectedJobScope) && (selectedJobScope = selectedJobScope.trim()) != "") {
        //criteria_gp.startPerson = /* current login user */;
    	
    	if (selectedJobScope == "My Job"){
    		//Object.assign(criteria, {"StartOrEditPerson": loginData.userId});
    		var myJobCriteria = 
    		{operator:"or", criteria:[
	                {fieldName: "startPerson", operator: "iEquals", value: loginData.userId},
	                {fieldName: "lastEditPerson", operator: "iEquals", value: loginData.userId}
	            ]  
    		};
    		//Object.assign(criteria, myJobCriteria);
    		criteria.compoundCriteria = [];
    		criteria.compoundCriteria.push(myJobCriteria);
    		
    		Object.assign(criteria2, {"startPerson_Mine": loginData.userId});
    		//Object.assign(criteria2, {"startPerson": loginData.userId});
    		//Object.assign(criteria2, {"lastEditPerson": loginData.userId});
    		
    		
    		/*
    		var deptCodeList = Object.keys(hkcertAllCertSearchDeptCodeGp.getItem("deptCodeDropDown").getValueMap());
    		Object.assign(criteria, {"cert_dept_code": deptCodeList});
        	Object.assign(criteria2, {"cert_dept_code": deptCodeList});
        	*/    		
    	}else if (selectedJobScope == "My Dept"){
    		//this field is added newly, "blue house" will never search on this field but new one needs
        	Object.assign(criteria, {"cert_dept_code": current_cert_dept.cert_dept_code});
        	Object.assign(criteria2, {"cert_dept_code": current_cert_dept.cert_dept_code});
        	
    	}else if (selectedJobScope == "Other Dept"){
    	    if (!isNull(checkedDeptCodeArr)){
    	    	if (arrayContainsArray(checkedDeptCodeArr, Object.keys(hkcertAllCertSearchDeptCodeGp.getItem("deptCodeDropDown").getValueMap()))){
    	    		console.log("Selected Dept Code:" + JSON.stringify(checkedDeptCodeArr));
    	    		if (checkedDeptCodeArr.length > 1) {
    	    			criteria_gp.form = checkedDeptCodeArr;
    	                Object.assign(criteria2, {"cert_dept_code": checkedDeptCodeArr});
    	                
    	            }else if (checkedDeptCodeArr.length == 1) {
    	                criteria_gp.form = checkedDeptCodeArr[0].trim();
    	                Object.assign(criteria2, {"cert_dept_code": checkedDeptCodeArr[0].trim()});
    	    		}
    	    	}
    	    }
    	}
    	
    }


    //hkcertAllCertSearchCertTypeGp
    //---------------------------------------------------------------------------------------------------------------------------------

    /*
    //as per JL's request to change the UI
    if (hkcertAllCertSearchCertTypeGp.values != null) {
        var CertTypeGpObj = hkcertAllCertSearchCertTypeGp.values;
        var checkedArr = [];
        Object.keys(CertTypeGpObj).forEach(key => {
            if (CertTypeGpObj[key] == "verified") {
                console.log("key: " + key);
                console.log("value: " + CertTypeGpObj[key]);
                console.log("title: " + hkcertAllCertSearchCertTypeGp.getItem(key).title);
                checkedArr.push(hkcertAllCertSearchCertTypeGp.getItem(key).title);
                //checkedArr.push(key);
            }
        });
        if (!checkedArr.includes("All")) {
            criteria_gp.form =  [];
            checkedArr.forEach(function(element) {
                console.log("checkedArr element: " + element);
                //var selectedCert = element.substring(0, element.indexOf("CertCheckbox")).toUpperCase();
                criteria_gp.form.push(element);
            });
        }
    }
    */


    var checkedArr = hkcertAllCertSearchCertTypeGp.getValue("certTypeDropDown");

    if (!isNull(checkedArr)){
        // ============ change log 00001 =============
        //if (arrayContainsArray(checkedArr, ["BCC","CLC","MSMC","DMLC-I"])){
        if (arrayContainsArray(checkedArr, Object.keys(hkcertAllCertSearchCertTypeGp.getItem("certTypeDropDown").getValueMap()))){
        /*   ==== end of change ======= */
            console.log("Selected Cert Type:" + JSON.stringify(checkedArr));
            
                
                /*
                var selectedCertTypeArray = [];
                checkedArr.forEach(function(element) {
                        console.log("checkedArr element: " + element);
                        //var selectedCert = element.substring(0, element.indexOf("CertCheckbox")).toUpperCase();
                        //criteria_gp.form.push(element);
                        selectedCertTypeArray.push(element);
                });
                */
            if (checkedArr.length > 1) {
                
                // var criteriaCertType = {
                    // _constructor:"AdvancedCriteria",
                    // //operator:"and",
                    // criteria:[
                        // {   fieldName:"form", operator:"inSet", value:selectedCertTypeArray },
                        // /*
                        // {   operator:"and",
                            // criteria:[
                                // { fieldName:"completeDate", operator:"lessOrEqual", value:numberCompleteCertQueryform.getValue('criteria_end_date') },
                                // //{ fieldName:"completeDate", operator:"greaterOrEqual", value:numberCompleteCertQueryform.getValue('criteria_start_date') }
                                // // { fieldName:"reports", operator:"notNull" }
                            // ]
                        // },
                        // */
                    // ]
                // };
                
                //Object.assign(criteria.certType, criteriaCertType);
                //criteria.certType = criteriaCertType;
                
                //criteria_gp.form =  [];
                criteria_gp.form = checkedArr;
                Object.assign(criteria2, {"form": checkedArr});
                
            }else if (checkedArr.length == 1) {
                criteria_gp.form = checkedArr[0].trim();
                Object.assign(criteria2, {"form": checkedArr[0].trim()});
            }
        }
    }

    
    
    


    //hkcertAllCertSearchCertStatusGp
    //---------------------------------------------------------------------------------------------------------------------------------
    if (hkcertAllCertSearchCertStatusGp.values != null) {
        var CertTypeGpObj = hkcertAllCertSearchCertStatusGp.values;
        var checkedArr = [];
        Object.keys(CertTypeGpObj).forEach(key => {
            if (CertTypeGpObj[key] == "verified") {
                console.log("key: " + key);
                console.log("value: " + CertTypeGpObj[key]);
                console.log("title: " + hkcertAllCertSearchCertStatusGp.getItem(key).title);
                checkedArr.push(hkcertAllCertSearchCertStatusGp.getItem(key).title);
                //checkedArr.push(key);
            }
        });
        
        //if (!checkedArr.includes("All")) {
        if (arrayContainsArray(checkedArr, ["Process","Complete","Cancel"])){
            console.log("Selected Status:" + JSON.stringify(checkedArr));
            
            
            /*
            criteria_gp.status =  [];
            checkedArr.forEach(function(element) {
                console.log("checkedArr element: " + element);
                //var selectedCert = element.substring(0, element.indexOf("CertCheckbox")).toUpperCase();
                criteria_gp.status.push(element);
            });
            */
            if (checkedArr.length > 1) {
                criteria_gp.status = checkedArr;
                Object.assign(criteria2, {"status": checkedArr});
            }else if (checkedArr.length == 1) {
                criteria_gp.status = checkedArr[0].trim();
                Object.assign(criteria2, {"status": checkedArr[0].trim()});
            }
            
        }
    }
    //---------------------------------------------------------------------------------------------------------------------------------

    Object.assign(criteria, criteria_gp);



    var criteria_main = hkcertAllCertSearchMainCriteria.getValuesAsCriteria(false);
    Object.assign(criteria, criteria_main);
    Object.assign(criteria2, criteria_main);

    //Object.assign(criteria, {"status" : "Process"});
    
    
    criteria = getAdvancedCriteria(criteria);
    
    //set criteria using another way
    var criteriaInFilterEditor = hkcertAllCertSearchResultListLG.getFilterEditorCriteria();
    //setCriteriaForSQL(criteriaInFilterEditor, criteria2);
    
    var sortFields = hkcertAllCertSearchResultListLG.getSort();
    console.log("SortField: " + JSON.stringify(sortFields));
    
    console.log("criteria for all_cert.js (before): " + JSON.stringify(criteria));
    console.log("criteria2 for all_cert.js (before): " + JSON.stringify(criteria2));
    
    criteria2 = mergeCriteria(criteriaInFilterEditor, criteria2, true);
    //isc.DataSource.combineCriteria(criteria2, criteriaInFilterEditor);
        
    //delete criteria due to previous selection of radio btn
    if (!isNull(selectedJobScope)){
    	if (selectedJobScope == "My Job"){
    		if (!isNull(criteria2.cert_dept_code))
    			delete criteria2.cert_dept_code;
    	}else if (selectedJobScope == "My Dept" || selectedJobScope == "Other Dept"){
    		if (!isNull(criteria2.startPerson_Mine))
    			delete criteria2.startPerson_Mine;
    	}
    	
    	if (selectedJobScope == "Other Dept" && isNull(checkedDeptCodeArr)){
    		console.log("selection of Other Dept: " + checkedDeptCodeArr);
    		if (!isNull(criteria2.cert_dept_code))
    			delete criteria2.cert_dept_code;
    	}
    }
    
    console.log("criteria for all_cert.js: " + JSON.stringify(criteria));
    console.log("criteria2 for all_cert.js: " + JSON.stringify(criteria2));

	return [criteria, criteria2];
}






function findJobs(){
	console.log("enter findJobs()");
    // sfRecWindow.show();
    hkcertAllCertSearchResultListLG.setData([]);
    
    var criteriaArr = createCriteria();
    var criteria2 = {};
    
    //if criteriaArr is not null and have 2 elements
    if (!isNull(criteriaArr) && criteriaArr.length == 2 && !isNull(criteriaArr[1]))
    	criteria2 = criteriaArr[1];
    
    hkcertAllCertSearchResultListLG.fetchData(criteria2
    , function(dsResponse, data, dsRequest) {
        var c = searchResultPreText1 + dsResponse.totalRows + searchResultPostText1;
        hkcertAllCertSearchResultListLGSummary.setContents(c);
        //hkcertAllCertSearchResultListLG.clearCriteria();
    }
    ,{"operationId":"FIND_ALL_CERTS", data: criteria2});
    //sortBy: sortFields

    console.log("leave findJobs()");
}


function copyCritObj(criteriaTmp, criteriaObj){
    var targetFieldName = "";
    var targetFieldValue = "";
    var targetOperator = "";
    var hasField = false;
    
    if (isNull(criteriaTmp))
        return;
    if (isNull(criteriaTmp["fieldName"])){
        //simple criteria
    	//{"printStatus": "ABC", "spName": "DEF"}
        targetFieldName = Object.keys(criteriaTmp)[0];
        targetFieldValue = criteriaTmp[targetFieldName];
    }else{
        //advanced criteria
    	//{"fieldName":"lastEditPerson","operator":"iEquals","value":"SYSTEM"}
    	//{"fieldName": "printStatus", "operator": "iContains", "value": "ABC"}
        targetFieldName = criteriaTmp.fieldName;
        targetFieldValue = criteriaTmp.value;
        targetOperator = criteriaTmp.operator;
    }
    
    if (isNull(criteriaObj.criteria) && isNull(criteriaObj["_constructor"])){
    	//simple criteria
    	//{"cert_dept_code":["HK","LN","SG","SH","Super"],"form":["BCC","CLC","MSMC","MLC"],"status":"Process","jobno":"a","refno":"b","spname":"c"}
    	for (var property in criteriaObj) {
    		if (criteriaObj.hasOwnProperty(property)) {
                if (property === targetFieldName){
                    hasField = true;
                    break;
                }
    		}
    	}
        
        if (!hasField){
            //criteriaObj[targetFieldName] = targetFieldValue;
            criteriaObj[targetFieldName] = getAbsoluteDate(targetFieldValue);
        }
    }else{
    	//advanced criteria
    	
    	//for msmc_stat.js, the criteriaObj is advanced criteria and only contains 1 level of "criteria" property
    	//and the "criteria" property is array of obj
    	// [{"fieldName": "msmcCompleteDate", "operator": "greaterOrEqual", "value": "2018-12-31T16:00:00.000Z"}, ...]
    	
    	//******************************************
    	//so below only cater this situation
    	//******************************************
    	if (!isNull(criteriaObj.criteria)){
            for (var i = 0; i < criteriaObj.criteria.length; i++) {
                var item = criteriaObj.criteria[i];
                //criteriaObj.criteria.forEach(function (item, index) {
                    if (!isNull(item) && !isNull(item.fieldName) && !isNull(item.operator) && !isNull(targetFieldName) && !isNull(targetOperator)) {
                        if (item.fieldName == targetFieldName && item.operator == targetOperator) {
                            hasField = true;
                            break;
                        }
                        
                    }
                //});
            }
            
            if (!hasField){
                criteriaObj.criteria.push({"fieldName": targetFieldName, "operator": targetOperator, "value": getAbsoluteDate(targetFieldValue)});
            }
    	}
    }
	
    
	
}




function loopThruCriteria(criteriaTmp, criteriaObj, searchBySQL){
	//Assumption: criteriaTmp is advanced criteria
	criteriaTmp.forEach(function (item, index) {
		if (isNull(item.criteria)){
			//there is no further "criteria" property inside
			//{"fieldName":"lastEditPerson","operator":"iEquals","value":"SYSTEM"}
			//{"fieldName": "printStatus", "operator": "iContains", "value": "ABC"}
            
			//if the search is by custom SQL, then need to append "From"/"To" for DateRange criteria
            if (searchBySQL && !isNull(item.fieldName) && !isNull(item.operator) && !isNull(item.value) && isDate(getAbsoluteDate(item.value))){
                if (item.operator == "greaterOrEqual")
                    item.fieldName += "From";
                else if (item.operator == "lessOrEqual")
                    item.fieldName += "To";;
            }
            copyCritObj(item, criteriaObj);
		}else{
			//compound criteria, there are "criteria" property inside "criteria" property
            //criteria: [...]
			loopThruCriteria(item.criteria, criteriaObj, searchBySQL);
		}
	});
}


function mergeCriteria(criteriaTmp, criteriaObj, searchBySQL){
	if (isNull(searchBySQL))
		searchBySQL = true;
	
	//Assumption: criteriaTmp, criteriaObj are both simple criteria
	if (isNull(criteriaTmp))
		return criteriaObj;
	if (isNull(criteriaTmp.criteria) && isNull(criteriaTmp["_constructor"])){
		//simple criteria
        //{"startPerson":"SYSTEM","lastEditPerson":"SYSTEM","cert_dept_code":"HK","status":"Process","jobno":"123","refno":"0"}
		
		//loop thru and pass {a:b,}
        //copyCritObj(criteriaTmp, criteriaObj);
        
        for (var property in criteriaTmp) {
            if (criteriaTmp.hasOwnProperty(property)) {
                var tmpobj = {};
                tmpobj[property] = criteriaTmp[property];
                copyCritObj(tmpobj, criteriaObj);
            }
        }
        
        
        
	}else{
		//advanced criteria
		loopThruCriteria(criteriaTmp.criteria, criteriaObj, searchBySQL);
	}
	
	
	return criteriaObj;
}



//criteriaTmp = controlLGObj.getCriteria();
/*
 * ver 1
function setCriteriaForSQL(criteriaTmp, criteriaObj){
	//var criteriaTmp = controlLGObj.getCriteria();
	if (isNull(criteriaTmp) || isNull(criteriaTmp.criteria))
		return criteriaObj;
	var criteriaArr = criteriaTmp.criteria;
	if (criteriaArr.length > 0){
		criteriaArr.forEach(function (item, index) {
			  console.log(item, index);
			  if (!isNull(item.fieldName) && !isNull(item.value)) {
				  //{item.fieldName: item.value}
				  var key = item.fieldName;
				  var value = item.value;
				  if (true){
					  //if there is no criteria with same field name
					  Object.assign(criteriaObj, {key: value});
				  }else{
					  //there is collision
					  //criteria in upper DynamicForm wins
				  }
			  }else{
				  setCriteriaForSQL(item, criteriaObj)
			  }
		});
	}
	return criteriaObj;
}
*/
/*
 * ver 2
function setCriteriaForSQL(criteriaTmp, criteriaObj){
	//var criteriaTmp = controlLGObj.getCriteria();
	if (isNull(criteriaTmp) || isNull(criteriaTmp.criteria))
		return criteriaObj;
	var criteriaArr = criteriaTmp.criteria;
	if (criteriaArr.length > 0){
		criteriaArr.forEach(function (item, index) {
			  console.log(item, index);
			  if (!isNull(item.fieldName) && !isNull(item.value)) {
				  //{item.fieldName: item.value}
				  var key = item.fieldName;
				  var value = item.value;
				  Object.assign(criteriaObj, {key: value});	
			  }else{
				  setCriteriaForSQL(item, criteriaObj)
			  }
		});
	}
	return criteriaObj;
}
*/

function isDate(value){
	if (typeof value == "string")
		return !isNaN(new Date(value));
    return isc.isA.Date(value) || isc.DateUtil.isRelativeDate(value);
}
function getAbsoluteDate(value){
    return isc.DateUtil.isRelativeDate(value) ? isc.DateUtil.getAbsoluteDate(value) : value;
}

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;    
}





if (!isNull(msmcCalledFrHistoryOfWork)){
	if (msmcCalledFrHistoryOfWork) {
	    selectCompleteCancelCheckbox();
	    msmcCalledFrHistoryOfWork = false;
	}
}
/*
else{
    selectProcessCheckbox();
}
*/

if (!isNull(supervisorSeacrhMode)){
	if (supervisorSeacrhMode) {
		selectSupervisorSeacrhMode();
	    supervisorSeacrhMode = false;
	}
}
	




console.log("leave all_cert.js");





