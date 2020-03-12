//Exemption Code

isc.Label.create({
    ID: "ExemptionCertReport",
    contents: "",
});

//var sort = 0;
//var reportRecord = [];
var reportContent = "";

function openExemptionCertReport(exemptionJobno){
	return openExemptionJobEdit(exemptionJobno, "Exemption Certificate");
}

function openExemptionLetterReport(exemptionJobno){
	return openExemptionJobEdit(exemptionJobno, "Letter");
}



function openExemptionJobEdit(exemptionJobno, formType){
	console.log("start of ExemptionCertReport page");
    var ecert_rec_valueman = isc.ValuesManager.create({
//    	ID: "ecert_rec_VM",
        dataSource: eCertRecordDS
    });

    ecert_rec_valueman.fetchData({id:exemptionJobno}, function (dsResponse, data, dsRequest){
	    	ExemptionCertReport();
	    	ExemptionCertReportWindow.show();
	    	substituteTags();
    	}
    );
    
    
    var effTilString = "This exemption shall have effect until ";
	var tagValueStringArr = {
    		ValidDate: null,
    };
    function substituteTags()
    {
    	
    	if(isA.Date(ecert_rec_valueman.getValue("valid_date"))){
    		var valid_date = ecert_rec_valueman.getValue("valid_date");
    		var yyyy = valid_date.getFullYear();
    		var mmm = valid_date.getMonthName();
    		var dd = valid_date.getDate();
//    		dd = ("00" + dd).substring(dd.length-2);
    		tagValueStringArr["ValidDate"] = dd + " " + mmm + " " + yyyy;
    		exemptionCertValidDateForm.setContents(effTilString + tagValueStringArr["ValidDate"] );
    	}
    	
    	for(var k in tagValueStringArr)
    	{
    		if(tagValueStringArr[k] == null)
    		{
    			continue;
    		}
    		var tmpStr = "";
    		var tag = "<" + k + ">";
    		if( exemptionCertContentForm.getValue("content_1") )
    		{
    			tmpStr = exemptionCertContentForm.getValue("content_1").replace(tag, tagValueStringArr[k]);
    			exemptionCertContentForm.setValue("content_1",tmpStr);
    		}
    	}
    }
    
    
//    var currentSurveyor = null;
//    isc.DataSource.get("codeExemptionCertIssueDS").fetchData(null, function (dsResponse, data, dsRequest) {
//		if (dsResponse.status != 0) {
//            console.log("dsResponse.status != 0");
//            return;
//        }
//		if (!isNull(data) && data.length > 0 && !isNull(data[0])) {
//			console.log("******codeExemptionCertIssueDS fetchData() has results*******" + JSON.stringify(data[0]));
//			currentSurveyor = data[0];
//			exemptionCertbottomRightForm.setValue("issue_man_type", currentSurveyor.data2);
//		}
//	});
    
    function set_issue_man_type(surveyor) {
    	isc.DataSource.get("codeExemptionCertIssueDS").fetchData({id: loginData.userId}, function (dsResponse, data, dsRequest) {
    		if (dsResponse.status != 0) {
                console.log("dsResponse.status != 0");
                return;
            }
    		if (!isNull(data) && data.length > 0 && !isNull(data[0])) {
    			loginData.currentUser = data[0];
    		}
    	});
    	//exemptionCertbottomRightForm.setValue("");
    }


	function callback(action, return_data){

		headingForECertForm.clearValues();
		exemptionCertContentForm.clearValues();

	    isc.DataSource.get("ecertExemptionsCodeDS").fetchData({id:return_data.ex_code_id},
	    		function (dsResponse, data, dsRequest){
	    			if (!isNull(data) && data.length > 0 && !isNull(data[0]))
	    				headingForECertForm.setValue("subheading",data[0].subheading);
	    		}
	    );
		console.log("IN");

		console.log("***ecertDicContentDS---form_type: " + formType);
	    isc.DataSource.get("ecertDicContentDS").fetchData({id:return_data.cert_content_id, form_type: formType},
	    		function (dsResponse, data, dsRequest){
	    			//reportRecord.push({position:0, content:data[0].content});
	    			//if(data[0].content != null){
	    			//if(!isNull(data[0].content) || data[0].content != null){
	    			//if(data[0].content || !isNull(data[0].content) || data[0].content != null || data[0].content != undefined)
	    	/*
	    	console.log("1");
	    	console.log(data[0].content);
	    	console.log("2");
	    	console.log(!isNull(data[0].content));
	    	console.log("3");
	    	console.log(data[0].content != null);
	    	console.log("4");
	    	console.log(data[0].content != undefined);
	    	console.log("5");
	    	*/
	    			//console.log(data[0].content);
	    			//console.log(data[0].content);

	    			if (!isNull(data[0].content) && data[0].content != null && data[0].content != undefined) {
		    			reportContent = data[0].content + "\n";
						exemptionCertContentForm.setValue("content_1",reportContent);
	    			}

	    			console.log(return_data.cert_conditions_ids.length);

					for (i = 0; i < return_data.cert_conditions_ids.length; i++) {
						
						console.log("***ecertDicItemDS---form_type: " + formType);
		    		    isc.DataSource.get("ecertDicItemDS").fetchData({id:return_data.cert_conditions_ids[i], form_type: formType},
		    		    		function (dsResponse, itemData, dsRequest){
		    		    			//reportRecord.push({position:reportCount, content:itemData[0].content});
		    		    			//reportCount = reportCount + 1;
		    		    			//reportRecord.push(itemData[0]);
		    		    			console.log(itemData[0].content);
		    		    			if (!isNull(itemData) && itemData.length > 0 && !isNull(itemData[0]) && !isNull(itemData[0].content) && itemData[0].content != null){
		    		    				var reportContent = "";
		    		    				if(!isNull(exemptionCertContentForm.getValue("content_1"))){
		    		    					reportContent = exemptionCertContentForm.getValue("content_1");
	    		    					}
				    					reportContent = reportContent + itemData[0].content + "\n";
			    						exemptionCertContentForm.setValue("content_1",reportContent);
			    						substituteTags();
		    		    			}
		    		    		}
		    		    );

					}
	    		}
	    );


	    /*
	    console.log(reportRecord);
	    reportRecord.sortByProperty("Sort", true);

	    for (i = 0; i < reportRecord.length; i++) {
			reportContent = exemptionCertContentForm.getValue("content_1") + reportRecord[i].content + "\n";
			exemptionCertContentForm.setValue("content_1",reportContent);
	    }

	    reportRecord = [];
		*/
/*
	    for (i = 0; i < return_data.conditions_ids.length; i++) {

		    isc.DataSource.get("ecertDicItemDS").fetchData({id:return_data.conditions_ids[i]},
		    		function (dsResponse, data, dsRequest){
		    			reportRecord.push({position:reportCount, content:data[0].content});
		    			reportCount = reportCount + 1;
						//exemptionCertContentForm.setValue("content_1",data[0].content);
		    		}
		    );

	    }

	    for (i = 0; i < reportRecord.length; i++) {

		    for (j = 0; j < reportRecord.length; j++) {

		    	if(reportRecord[j].position == i){
		    		//if(exemptionCertContentForm.getValue("content_1") == undefined){
		    			//reportContent = reportRecord[i].content;
		    			//console.log("aaa");
		    		//}else{
		    			reportContent = exemptionCertContentForm.getValue("content_1") + reportRecord[i].content;
		    		    exemptionCertContentForm.setValue("content_1", reportContent);

		    			console.log("bbb");
		    		//}
		    	}

		    }
	    }
*/
	}

	function showExemptionCertReport(){
		//ReportViewWindow.displayReport(["RPT_Declaration_Reissuance_Cert", {"id" : exemptionCertReportVM.getValue("id")}]);
		//print both original and office copy together
		console.log("jobno: " + exemptionCertReportVM.getValue("jobno") + "; imono: " + exemptionCertReportVM.getValue("imono"));
		console.log("before all");
		var params = exemptionCertReportVM.getValues();
		console.log("***** rec for printing: " + JSON.stringify(params));
//		ReportViewWindow.downloadReport(["RPT_ExemptionCert", {"jobno" : exemptionCertReportVM.getValue("jobno"), "office_copy": true}]);
//		console.log("after copy");
//		ReportViewWindow.downloadReport(["RPT_ExemptionCert", {"jobno" : exemptionCertReportVM.getValue("jobno"), "office_copy": false}]);

		params["office_copy"] =  "OFFICE COPY";
		ReportViewWindow.downloadReport(["RPT_ExemptionCert", params]);
		console.log("after original");

	}

	function ExemptionCertReport(){

		var unsaveFlag = true;

	    var valueMan = isc.ValuesManager.create({
	        ID: "exemptionCertReportVM",
	        dataSource: exemptionJobDS,
	        itemChanged: function(){
	        	unsaveFlag = true;
	        }

	    });

	    //exemptionCertReportVM.setValue("id", exemptionJobId);

		isc.IButton.create({
			  ID: "outputExemptionReportbtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  title: "Output",
			  onControl:"EXEMPT_PRINT||FSQC_ALL",
			  click:function (){
				  //callback(true, exemptionCertReportVM.getValue("id"), exemptionCertReportVM.getValue("form") );
				  console.log("outputExemptionReportbtn clicked");

				  //if(unsaveFlag && ( exemptionCertContentForm.valuesHaveChanged() || headingForECertForm.valuesHaveChanged() || exemptionCertbottomLeftForm.valuesHaveChanged() ) ){
				  //if( ( exemptionCertContentForm.valuesHaveChanged() || headingForECertForm.valuesHaveChanged() || exemptionCertbottomLeftForm.valuesHaveChanged() ) ){
				  if (unsaveFlag && exemptionCertReportVM.valuesHaveChanged())
					  {
					  isc.ask("Are you sure to save and output?", function (value){
						  if (value){
							  exemptionCertReportVM.saveData(
									  function(dsResponse, data, dsRequest) {
			        							unsaveFlag = false;
			        							showExemptionCertReport();

							  		  }

							  );

						  }
					  });

				  }else{
					  showExemptionCertReport();
				  }

			  }
		});
		isc.IButton.create({
			  ID: "saveExemptionReportbtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  onControl:"FSQC_ALL||EXEMPT_WRITE",
			  title: "Save",
			  click:function (){

				  //console.log(exemptionCertReportVM.getValue("jobno"));
				  exemptionCertReportVM.saveData(
						  function(dsResponse, data, dsRequest) {
        						if (dsResponse.status == 0) {
        							isc.say("Successfully Saved");
        							unsaveFlag = false;
        						}
				  		  }

				  );

			  }
		});
		isc.IButton.create({
			  ID: "closeExemptionReportbtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  title: "Close",
			  click:function (){

				  if(unsaveFlag && ( exemptionCertContentForm.valuesHaveChanged() || headingForECertForm.valuesHaveChanged() || exemptionCertbottomLeftForm.valuesHaveChanged() ) ){

					  isc.ask("Edited content(s) is/are not saved. Are you sure to close?", function (value){
						  if (value){
							  ExemptionCertReportWindow.hide();
						  }
					  });

				  }else{
					  ExemptionCertReportWindow.hide();
				  }
			  }
		});
	    isc.HLayout.create({
	    	ID:"topBtnBar",
	    	width:"100%",
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign:"left",
	    	align:"right",
	    	showEdges: false,
	    	membersMargin:5,
	    	members:[outputExemptionReportbtn, saveExemptionReportbtn, closeExemptionReportbtn]
	    });
	    var form_str = exemptionCertReportVM.getValue("form");
	    var exemptTypeStr2 = "";
	    switch(form_str)
	    {
	    case "Letter":
	    	exemptTypeStr2 = " Letter";
	    	break;
	    default:
	    	exemptTypeStr2 = " Certificate";
	    	break;
	    }

	    var exemptType = ecert_rec_valueman.getValue("equipments");
	    var exemptTypeStr = "";
	    switch(exemptType)
	    {
	    case "Equipment":
	    	exemptTypeStr = "Exemption";
	    	break;
	    default:
	    	exemptTypeStr = "Dispensation";
	    	exemptTypeStr2 = "";
	    	break;
	    }

	    isc.TitleLabel.create({
	        ID: "exemptionCertTitleForm",
	        align:"center",
	        //wrap: true,
	        height: 20,
	        contents: "<b><font size=4px>" + exemptTypeStr + exemptTypeStr2 + "<br> Issued by</br>The Government of the Hong Kong Special Administrative Region</br> of the People's Republic of China</br></br>"
	    });
        isc.ControlledDynamicForm.create({
	        ID:"headingForECertForm",
	        dataSource:"exemptionJobDS",
	        onControl:"EXEMPT_WRITE||FSQC_ALL",
		    valuesManager:valueMan,
			width:"100%",
			height:70,
			align:"center",
			autoFetchData: false,
	        titleWidth:"100%",
	        canEdit:true,
	        //autoFocus: true,
	        items:[
	               {
	                   type: "textArea",
	                   name: "subheading",
	                   title: "",
	                   width:"100%",
	                   height:"100%",
	                   selectOnFocus:true,
	                   wrapTitle:false,
	                   showTitle:false,
	                   textAlign:"center",
	               },
	        ],
	        itemChanged:function(){

	        },
	    });

        /*
        isc.ListGrid.create({
            ID: "countryList",
            width:"100%",
            height:110,
            alternateRecordStyles:true,
            data: countryData,
            fields:[
                {name:"countryCode", title:"Flag"},
                {name:"countryName", title:"Country"},
                {name:"capital", title:"Capital"},
                {name:"continent", title:"Continent"},
                {name:"imo", title:"Continent"}

            ],
            headerHeight: 30,
            cellHeight: 53,
            showHeader: false
        });
        */

        isc.Label.create({
        	ID: "shipUpperRow1",
            top: 320, padding: 10,
            width:"28%", height: 58,
            border: "1px solid grey",
            align:"center",
            contents: "Name of Ship",
            count: 0,
            /*
            incrementAndUpdate: function (totalRows, startRow, endRow) {
                this.count++;
                this.setContents("<b>Number of server trips: " + this.count +
                                 "<br/>Total rows in this filter set: " + totalRows +
                                 "<br/>Last range of records returned: " +
                                 startRow + " to " + endRow + "</b>");
            }
            */
        });
        isc.Label.create({
        	ID: "shipUpperRow2",
            top: 320, padding: 10,
            width:"18%", height: 58,
            align:"center",
            border: "1px solid grey",
            contents: "Distinctive No. or letters",
            count: 0,
        });
        isc.Label.create({
        	ID: "shipUpperRow3",
            top: 320, padding: 10,
            width:"18%", height: 58,
            align:"center",
            border: "1px solid grey",
            contents: "Port of Registry",
            count: 0,
        });
        isc.Label.create({
        	ID: "shipUpperRow4",
            top: 320, padding: 10,
            width:"18%", height: 58,
            align:"center",
            border: "1px solid grey",
            contents: "Gross Tonnage",
            count: 0,
        });
        isc.Label.create({
        	ID: "shipUpperRow5",
            top: 320, padding: 10,
            width:"18%", height: 58,
            align:"center",
            border: "1px solid grey",
            contents: "IMO Number",
            count: 0,
        });
	    isc.HLayout.create({
	    	ID:"shipUpperRow",
	    	width:"100%",
	    	//height:300,
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
	    	showEdges: false,
	    	membersMargin:0,
	    	//members:[ecertDicItemForm, ecertDicItemBtnBar]
    		members:[shipUpperRow1, shipUpperRow2, shipUpperRow3, shipUpperRow4, shipUpperRow5]
	    });

        isc.Label.create({
        	ID: "shipLowerRow1",
            top: 320, padding: 10,
            width:"28%", height: 40,
            align:"center",
            border: "1px solid grey",
            contents: "",
            count: 0,
        });
        isc.Label.create({
        	ID: "shipLowerRow2",
            top: 320, padding: 10,
            width:"18%", height: 40,
            align:"center",
            border: "1px solid grey",
            contents: "",
            count: 0,
        });
        isc.Label.create({
        	ID: "shipLowerRow3",
            top: 320, padding: 10,
            width:"18%", height: 40,
            align:"center",
            border: "1px solid grey",
            contents: "<b>HONG KONG</b>",
            count: 0,
        });
        isc.Label.create({
        	ID: "shipLowerRow4",
            top: 320, padding: 10,
            width:"18%", height: 40,
            align:"center",
            border: "1px solid grey",
            contents: "",
            count: 0,
        });
        isc.Label.create({
        	ID: "shipLowerRow5",
            top: 320, padding: 10,
            width:"18%", height: 40,
            align:"center",
            border: "1px solid grey",
            contents: "",
            count: 0,
        });
	    isc.HLayout.create({
	    	ID:"shipLowerRow",
	    	width:"100%",
	    	//height:300,
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
	    	showEdges: false,
	    	membersMargin:0,
	    	//members:[ecertDicItemForm, ecertDicItemBtnBar]
    		members:[shipLowerRow1, shipLowerRow2, shipLowerRow3, shipLowerRow4, shipLowerRow5]
	    });
	    console.log("***exemptionCertReportVM.fetchData---form_type: " + formType);
	    exemptionCertReportVM.fetchData({jobno:exemptionJobno, form: formType},
	    		function (dsResponse, data, dsRequest){


	    			if(!isNull(data) && data.length > 0 && !isNull(data[0]) && data[0].imono != null){
		    			shipLowerRow5.setContents("<b>"+data[0].imono);

			    		isc.DataSource.get("fsqcShipDS").fetchData({Imono:data[0].imono},
			    				function (dsResponse, data, dsRequest){
			    					if (!isNull(data) && data.length > 0 && !isNull(data[0]) && !isNull(data[0].Spname) && !isNull(data[0].Regno) && !isNull(data[0].Gross)) {
			    						shipLowerRow1.setContents("<b>"+data[0].Spname);
				    					shipLowerRow2.setContents("<b>"+data[0].Regno);
				    					shipLowerRow4.setContents("<b>"+data[0].Gross);
			    					}
			    					
			    				}
			    		);
	    			}
	    			if(!isNull(data) && data.length > 0 && !isNull(data[0]) && !isNull(data[0].subheading)){
		    			if(data[0].subheading == "NO DATA,PLEASE UPDATE EXEMPTION CODE TABLE."){
		    				//RED color//headingForECertForm.setValue("subheading",data[0].subheading);
		    			}
		    			headingForECertForm.setValue("subheading",data[0].subheading);
		    			//console.log(data[0]);
		    			//console.log(data[0].subheading);
	    			}
//	    			if(data[0].content_1 != null){
//		    			exemptionCertContentForm.setValue("content_1",data[0].content_1);
//	    			}
//	    			if(data[0].issue_date != null){
//		    			exemptionCertbottomLeftForm.setValue("issue_date",data[0].issue_date);
//	    			}
//	    			if(data[0].cc != null){
//		    			exemptionCertbottomLeftForm.setValue("cc",data[0].cc);
//	    			}
	    	    	substituteTags();

	    		}
	    );
//	    eCertRecordDS.fetchData({id:exemptionJobno},
//	    		function (dsResponse, data, dsRequest){
//
//	    			if(data[0].valid_date != null){
//	    				exemptionCertValidDateForm.setContents("This exemption shall have effect until "+data[0].valid_date.toString().substring(4, 15));
//	    			}else {
//	    				exemptionCertValidDateForm.setContents("This exemption shall have effect until ");
//	    			}
//
//	    		}
//	    );


	    isc.VLayout.create({
	    	ID:"shipGroup",
	    	width:"100%",
	    	//height:300,
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
	    	showEdges: false,
	    	membersMargin:0,
	    	//members:[ecertDicItemForm, ecertDicItemBtnBar]
    		members:[shipUpperRow, shipLowerRow]
	    });

        isc.ControlledDynamicForm.create({
	        ID:"exemptionCertContentForm",
	        dataSource:"exemptionJobDS",
		    valuesManager:valueMan,
			width:"100%",
			height:400,
			align:"center",
			onControl:"FSQC_ALL||EXEMPT_WRITE",
			autoFetchData: false,
	        titleWidth:"100%",
	        canEdit:true,
	        //autoFocus: true,
	        items:[
	               {
	                   type: "textArea",
	                   name: "content_1",
	                   title: "",
	                   width:"100%",
	                   height:"100%",
	                   selectOnFocus:true,
	                   wrapTitle:false,
	                   showTitle:false,
	               },
	        ],
	        itemChanged:function(){
	        	unsaveFlag=true;
	        },
	    });
        /*
        isc.DynamicForm.create({
	        ID:"exemptionCertValidDateForm",
	        //dataSource:"ecertExemptionsCodeDS",
		    //valuesManager:valueMan,
			width:"100%",
			//height:500,
			align:"left",
			autoFetchData: false,
	        titleWidth:"100%",
	        canEdit:true,
	        numCols: 4,
	        //autoFocus: true,
	        fields: [
			              {name:"Com_cd", title:"Date:", type:"staticText", value:"This exemption shall have effect until 07 May 2019."},

			],
	        itemChanged:function(){

	        },
	    });
	    */

        
//        if(ecert_rec_valueman.getValue("valid_date") != null){
//        	effTilString = effTilString + ecert_rec_valueman.getValue("valid_date").toString().substring(4, 15);
//		}else {
//			// do nothing
//		}

	    isc.Label.create({
	        ID: "exemptionCertValidDateForm",
	        align:"left",
	        height:40,
	        valign:"top",
	        contents: effTilString
	    });
	    substituteTags();
        isc.ControlledDynamicForm.create({
	        ID:"exemptionCertbottomLeftForm",
	        dataSource:"exemptionJobDS",
		    valuesManager:valueMan,
			width:650,
			height:80,
			onControl:"EXEMPT_WRITE||FSQC_ALL",
			align:"left",
			valign:"top",
			defaultLayoutAlign: "left",
			autoFetchData: false,
	        titleWidth:"100%",
	        canEdit:true,
	        numCols: 10,
	        //autoFocus: true,
	        fields: [
			              {name:"issue_date", title:"Date:", type:"date", colSpan:8
			            	  , defaultValue: new Date()
			              },
			              {name:"cc", title:"c.c.:"},
			],
			cellPadding:2,
	        itemChanged:function(){

	        },
	    });

	    var data3_filter = "";
	    var data4_filter = "";
	    form_str = exemptionCertReportVM.getValue("form");
	    switch(form_str)
	    {
	    case "Letter":
	    	data4_filter = "Letter";
	    	break;
	    case "Exemption Certificate(CO2)":
	    	data4_filter = "Cert(CO2)";
	    	break;
	    default:
	    	data4_filter = "Cert";
	    	break;
	    }

        exemptType = ecert_rec_valueman.getValue("equipments");
	    switch(exemptType)
	    {
	    case "Equipment":
	    	data3_filter = "Exemption";
	    	break;
	    default:
	    	data3_filter = "Dispensation";
	    	data4_filter = "Letter";
	    	break;
	    }



        isc.ControlledDynamicForm.create({
	        ID:"exemptionCertbottomRightForm",
	        dataSource:"exemptionJobDS",
		    valuesManager:valueMan,
			width:300,
			height:80,
			onControl:"FSQC_ALL||EXEMPT_WRITE",
			align:"left",
			valign:"top",
			defaultLayoutAlign: "left",
			autoFetchData: false,
	        titleWidth:"100%",
	        canEdit:true,
	        numCols: 10,
	        //autoFocus: true,
	        fields: [
			              //{name:"data", title:"Surveyor:", defaultValue:"FSQCC", showTitle:false, endRow:false},
	        			  {name:"surveyor", title:"Prepared By:", defaultToFirstOption:true, showTitle:false,
	        				  editorType:"ComboBoxItem",
	        				  width:"200",
	        				  addUnknownValues:true, wrapTitle: false,
	        			 		optionDataSource: "codeExemptionCertIssueDS",
	        			 		displayField:"data",valueField:"data",
	        			 		//filterFields:["data4"],
	        			 		pickListCriteria:{data3: data3_filter, data4:data4_filter,operator:"equals"},
	        			 		//sortField:"sort",
	        			 		pickListHeaderHeight:0,
	        			 		pickListWidth:"200",
	        			 		pickListFields:[
		        			 		{name:"data", title:"Surveyor", width:200},
		        			 		{name:"dic_type", title:"dic_type",hidden:true},
		        			 		{name:"code", title:"code",hidden:true},
		        			 		//{name:"sort"}
	        			 		]
	        			 		,pickListProperties: {
	        			 			canEdit: false,
	        	                	canSelect: true,
	        	                	//editOnFocus: true,
	        	                	//canSelectCells: true,
	        	                	//editEvent: "click",
	        	                	autoOpenTree: true,
	        	                	autoConfirmSaveEdits: true,
	        	                	autoSaveEdits: false,
	        	      			  	saveLocally: true,
	        	      			  	saveByCell: false,
	        	                    canHover: true,
	        	                    showHover: true,
//	        	                    recordClick: function(viewer, record, recordNum, field, fieldNum, value, rawValue){
	        	                    	/*
	        	                    	console.log(viewer);
	        	                    	console.log(record);
	        	                    	console.log(recordNum);
	        	                    	console.log(field);
	        	                    	console.log(fieldNum);
	        	                    	console.log(value);
	        	                    	console.log(rawValue);
	        	                    	console.log("--------------------------------------------------------");
	        	                    	console.log(record.data2);
	        	                    	*/
	        	                    	
//	        	                    	exemptionCertbottomRightForm.setValue("surveyor", record.data);
//	        	                    	
//	        	                    	if (!isNull(record)) {
//	        	                    		exemptionCertbottomRightForm.setValue("issue_man_type", record.data2);
//	        	                    	}
//	        	                    	
//	        	                    	exemptionCertbottomRightForm.getField('surveyor').pickList.hide();
//	        	                    }
	        			 		}
	        			 		, changed : function(form, item, value){
//        	                    	exemptionCertbottomRightForm.setValue("surveyor", record.data);
        	                    	
        	                    	if (!isNull(this.getSelectedRecord())) {
        	                    		exemptionCertbottomRightForm.setValue("issue_man_type", this.getSelectedRecord().data2);
        	                    	}
        	                    	
//        	                    	exemptionCertbottomRightForm.getField('surveyor').pickList.hide();
	        			 		}
	        			 		
	        			  },
			              {name:"edit", title:"Edit", type:"button", align:"left", showTitle:false, endRow:true, startRow:false,
	        				  click : function() {
	        					  openExemptionCertIssue(data4_filter,function(isOK,objRecord){
	        						  if (isOK==true)
	        							  {

	        							  exemptionCertbottomRightForm.setValue("issue_man_type",objRecord.data2);
	        							  exemptionCertbottomRightForm.setValue("surveyor",objRecord.data);

	        							  }
	        					  });
	        				  }
	        			  },
			              {name:"issue_man_type", title:"Issue Man Type:", defaultToFirstOption:true, showTitle:false, 
//	        				  defaultValue: !isNull(currentSurveyor) ? currentSurveyor.data2 : null,
	        				  //editorType:"MultiComboBoxItem",
	        				  editorType:"ComboBoxItem",
	        				  width:"200",
	        			 		addUnknownValues:false, wrapTitle: false,
	        			 		optionDataSource: "codeExemptionCertIssueDS",
	        			 		displayField:"data2",valueField:"data2",
	        			 		//filterFields:["data4"],
	        			 		pickListCriteria:{data3: data3_filter, data4:data4_filter,operator:"equals"},
	        			 		//sortField:"sort",
	        			 		pickListWidth:"200",
	        			 		pickListFields:[
	        			 		{name:"data2", title:"Title", width:200},
	        			 		{name:"dic_type", title:"dic_type",hidden:true},
	        			 		{name:"code", title:"code",hidden:true},
	        			 		//{name:"sort"}
	        			 		]

			              },

			              //{name:"data2", title:"Issue Man Type:", type:"select", showTitle:false, defaultValue:"Director of Marine",
			            	  //valueMap: ["Director of Marine", "Director of Marine (Ag)"],
			              //},
			],
			cellPadding:2,
	        itemChanged:function(){

	        },
	    });
        
        console.log("issue_man_type item is drawn.");

	    isc.HLayout.create({
	    	ID:"exemptionCertbottomFormGroup",
	    	width:"100",
	    	//height:300,
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
	    	showEdges: false,
	    	membersMargin:5,
	    	//members:[ecertDicItemForm, ecertDicItemBtnBar]
    		members:[exemptionCertbottomLeftForm, exemptionCertbottomRightForm]
	    });

	    isc.VLayout.create({
	    	ID:"leftPage",
	    	width:"95%",
	    	//height:300,
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
	    	showEdges: false,
	    	membersMargin:5,
	    	//members:[ecertDicItemForm, ecertDicItemBtnBar]
    		members:[exemptionCertTitleForm, headingForECertForm, shipGroup, exemptionCertContentForm, exemptionCertValidDateForm, exemptionCertbottomFormGroup]
	    });

		isc.IButton.create({
			  ID: "selectExemptionbtn",
			  autoDraw: false,
			  width:70,
			  valign:"middle",
			  onControl:"EXEMPT_WRITE||FSQC_ALL",
			  layoutAlign:"left",
			  title: "Select",
			  click:function (){

			 		if (!hasAccess("EXEMPT_CODE_READ||FSQC_ALL")){
			 			 isc.say("Sorry you have no read access right to exemption code!");
			 		}else{
				 		 var exType = frmExemptionEdit_top.getValue("equipments");

				 		 if (exType !="Equipment"){
				 			 exType="Dispensation";
				 		 }else{
				 			 exType="Exemption";
				 		 }

				 	  	 openExemptionCode(exType, callback, null, ecert_rec_valueman.getValues());
			 		}


				  //openExemptionCode('exemption', 'cert', callback);
				  //openExemptionCode();
			  }
		});
	    isc.VLayout.create({
	    	ID:"rightPage",
	    	//width: "10%",
	    	height:700,
	    	align:"center",
	    	//layoutTopMargin:10,
	    	showEdges: false,
	    	membersMargin:5,
	    	members:[selectExemptionbtn]
	    });
	    isc.HLayout.create({
	    	ID:"lowerPage",
	    	width: "100%",
	    	//layoutTopMargin:10,
	    	showEdges: false,
	    	//isGroup:"true",
	    	//groupTitle:"Exemption Certificate",
	    	membersMargin:5,
	    	members:[leftPage, rightPage]
	    });


		isc.Window.create({
		    ID:"ExemptionCertReportWindow",
		    title: "Exemption Certificate",
		    width:900,
		    height:895,
		    autoSize:true,
		    autoCenter: true,
		    isModal: true,
		    showModalMask: true,
		    autoDraw: false,
			closeClick : function(){
				  if(unsaveFlag && ( exemptionCertContentForm.valuesHaveChanged() || headingForECertForm.valuesHaveChanged() || exemptionCertbottomLeftForm.valuesHaveChanged() ) ){

					  isc.ask("Edited content(s) is/are not saved. Are you sure to close?", function (value){
						  if (value){
							  ExemptionCertReportWindow.hide();
						  }
					  });

				  }else{
					  ExemptionCertReportWindow.hide();
				  }
			},
		    items: [

				    isc.VLayout.create({
				    	ID:"ExemptionCertReportFullPage",
				    	width:"100%",
				    	layoutTopMargin:0,
				    	defaultLayoutAlign: "center",
				    	showEdges: false,
				    	membersMargin:30,
				    	colWidths: ["90%", "10%"],
				    	members:[topBtnBar, lowerPage]
				    })

			]
		});

//--------------------------------------------------------------------------------------------------




	}
}

