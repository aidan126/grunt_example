//Exemption Code

isc.Label.create({
    ID: "ExemptionCertMin",
    contents: "",
});

//var unsaveFlag2 = true;
var minuteContent = "";

function openExemptionCertMin(exemptionJobno){
	isc.DataSource.get("userDS").fetchData({id: loginData.userId}, function (dsResponse, data, dsRequest) {
		if (dsResponse.status != 0) {
            console.log("dsResponse.status != 0");
            return;
        }
		if (!isNull(data) && data.length > 0 && !isNull(data[0])) {
			loginData.currentUser = data[0];
		}
	});

    var ecert_rec_valueman = isc.ValuesManager.create({
//    	ID: "ecert_rec_VM",
        dataSource: eCertRecordDS
    });
    
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
    	}
    	
    	for(var k in tagValueStringArr)
    	{
    		if(tagValueStringArr[k] == null)
    		{
    			continue;
    		}
    		var tmpStr = "";
    		var tag = "<" + k + ">";
    		if( exemptionMinContentForm.getValue("content_1") )
    		{
    			tmpStr = exemptionMinContentForm.getValue("content_1").replace(tag, tagValueStringArr[k]);
    			exemptionMinContentForm.setValue("content_1",tmpStr);
    		}
    	}
    }
    
    ecert_rec_valueman.fetchData({id:exemptionJobno}, function (dsResponse, data, dsRequest){
    		substituteTags();
    	}
    );

	
	ExemptionCertMin();
	ExemptionCertMinWindow.show();
	setTimeout(setDefaultValue, 300);
	//setDefaultValue();
	
	
	function setDefaultValue() {
//		console.log("setDefaultValue(); is called@");
//		console.log(isNull(ExemptionCertMinVM.getValue("surveyor")));
//		console.log(isNull(ExemptionCertMinVM.getValue("duty")));
//		console.log(isNull(ExemptionCertMinVM.getValue("issue_date")));
		
		if (isNull(ExemptionCertMinVM.getValue("surveyor")))
			ExemptionCertMinVM.setValue("surveyor", loginData.currentUser.userName);
		if (isNull(ExemptionCertMinVM.getValue("duty")))
			ExemptionCertMinVM.setValue("duty", loginData.currentUser.title);
		if (isNull(ExemptionCertMinVM.getValue("issue_date")))
			ExemptionCertMinVM.setValue("issue_date", new Date());
	}

	function editSurveyor()
	{


	}


	function callback(action, return_data){
		//exemptionMinTitleForm.clearValues();
		headingForEMinForm.clearValues();
		exemptionMinContentForm.clearValues();

	    isc.DataSource.get("ecertExemptionsCodeDS").fetchData({id:return_data.ex_code_id},
	    		function (dsResponse, data, dsRequest){
					//headingForEMinForm.setValue("subheading",data[0].subheading);
	    			headingForEMinForm.setValue("exemption_for",data[0].exemption_for);
	    		}
	    );

	    isc.DataSource.get("ecertDicContentDS").fetchData({id:return_data.min_content_id},
	    		function (dsResponse, data, dsRequest){

	    			minuteContent = data[0].content + "\n";
					exemptionMinContentForm.setValue("content_1",minuteContent);

					for (i = 0; i < return_data.min_conditions_ids.length; i++) {

		    		    isc.DataSource.get("ecertDicItemDS").fetchData({id:return_data.min_conditions_ids[i]},
		    		    		function (dsResponse, data, dsRequest){

			    					minuteContent = exemptionMinContentForm.getValue("content_1") + data[0].content + "\n";
		    						exemptionMinContentForm.setValue("content_1",minuteContent);
		    						substituteTags();
		    		    		}
		    		    );

					}
	    		}
	    );


	}


	function showExemptionMinReport(){
		console.log("jobno: " + ExemptionCertMinVM.getValue("jobno") + "; imono: " + ExemptionCertMinVM.getValue("imono"));
		ReportViewWindow.downloadReport(["RPT_ExemptionMin", {"jobno" : ExemptionCertMinVM.getValue("jobno")}]);
	}

	function ExemptionCertMin(){
		


	    var valueManMin = isc.ValuesManager.create({
	        ID: "ExemptionCertMinVM",
	        dataSource: exemptionJobDS,
//	        itemChanged: function(){
//	        	unsaveFlag2 = true;
//	        }
	    });

	   	isc.IButton.create({
			  ID: "outputExemptionMinbtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  onControl:"EXEMPT_PRINT||FSQC_ALL",
			  title: "Output",
			  click:function (){
				 // if(unsaveFlag2 && ( exemptionMinContentForm.valuesHaveChanged() || headingForEMinForm.valuesHaveChanged() ) ){
				  if( ExemptionCertMinVM.valuesHaveChanged()){
					  isc.ask("Are you sure to save and output?", function (value){
						  if (value){
							  		ExemptionCertMinVM.saveData(
									  function(dsResponse, data, dsRequest) {
//		        							unsaveFlag2 = false;
		        							showExemptionMinReport();

						  		  }

						  );
						  }
					  });

				  }else{
					  showExemptionMinReport();

				  }

			  }
		});
		isc.IButton.create({
			  ID: "saveExemptionMinbtn",
			  autoDraw: false,
			  width:90,
			  onControl:"EXEMPT_WRITE||FSQC_ALL",
			  layoutAlign:"center",
			  title: "Save",
			  click:function (){

				  ExemptionCertMinVM.saveData(
						  function(dsResponse, data, dsRequest) {
        						if (dsResponse.status == 0) {
        							isc.say("Successfully Saved");
//        							unsaveFlag2 = false;
        						}
				  		  }

				  );

			  }
		});
		isc.IButton.create({
			  ID: "closeExemptionMinbtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  title: "Close",
			  click:function (){

//				  if(unsaveFlag2 && ( exemptionMinContentForm.valuesHaveChanged() || headingForEMinForm.valuesHaveChanged() ) ){
				  if( ExemptionCertMinVM.valuesHaveChanged() ){

					  isc.ask("Edited content(s) is/are not saved. Are you sure to close?", function (value){
						  if (value){
							  ExemptionCertMinWindow.hide();
						  }
					  });

				  }else{
					  ExemptionCertMinWindow.hide();
				  }
			  }
		});
	    isc.HLayout.create({
	    	ID:"topExMinBtnBar",
	    	width:"100%",
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign:"left",
	    	align:"right",
	    	showEdges: false,
	    	membersMargin:5,
	    	members:[outputExemptionMinbtn, saveExemptionMinbtn, closeExemptionMinbtn]
	    });

	    isc.ControlledDynamicForm.create({
	    	 ID:"exemptionMinTitleForm",
		     dataSource:"exemptionJobDS",
		     valuesManager:valueManMin,
		     onControl:"FSQC_ALL||EXEMPT_WRITE",
		     height: 20,
		     align:"center",
//		     itemChanged:function(){
//		        	unsaveFlag2=true;
//		        },
		     items:[
		    	 {name:"form_name",
		    	  type:"text",
		    	  selectOnFocus:true,
		    	  showTitle:false,
		    	  textBoxStyle:"bigTextStyle",
		    	  textAlign:"center",
		    	  align:"center",
		    	  width:200,		    	 }

		     ],

	    });

	    isc.HLayout.create({
        	ID:"exemptionMinTitleForm_hl",
            height:"*",
            align:"center",
            width:"100%",
            members:[exemptionMinTitleForm


            ]

        })

        isc.HLayout.create({
        	ID:"attnTitle_hl",
            height:"*",
            align:"left",
            width:"100%",
            members:[
                isc.Label.create({ID:"attnTitle",contents:"DM<br>AD/S<br>GM/SSB<br>SS/CSS"})

            ]

        })

        isc.HLayout.create({
        	ID:"exemption_for_hl",
            height:"*",
            align:"center",
            width:"100%",
            members:[
                isc.Label.create({ID:"lblExemption_For",contents:"<b>Exemption For</b>",align:"center",width:"*"})

            ]

        })


//
//	    isc.TitleLabel.create({
//	        ID: "exemptionMinTitleForm",
//	        align:"center",
//	        //wrap: true,
//	        height: 20,
//	        contents: "<b><font size=4px>Exemption Certificate<br> Issued by</br>The Government of the Hong Kong Special Administrative Region</br> of the People's Republic of China</br></br>"
//	    });

        isc.ControlledDynamicForm.create({
	        ID:"headingForEMinForm",
	        dataSource:"exemptionJobDS",
		    valuesManager:valueManMin,
			width:"100%",
			height:70,
			onControl:"EXEMPT_WRITE||FSQC_ALL",
			align:"center",
			autoFetchData: false,
	        titleWidth:"100%",
	        canEdit:true,
	        //autoFocus: true,
	        items:[
	               {
	                   type: "textArea",
	                   name: "exemption_for",
	                   title: "",
	                   width:"100%",
	                   height:"100%",
	                   selectOnFocus:true,
	                   wrapTitle:false,
	                   showTitle:false,
	                   textAlign:"center",
	                   textBoxStyle:"bigTextStyle",
	               },
	        ],
//	        itemChanged:function(){
//	        	unsaveFlag2=true;
//	        },
	    });


	    ExemptionCertMinVM.fetchData({jobno:exemptionJobno, form:"Minute"},
	    		function (dsResponse, data, dsRequest){

//	    			headingForEMinForm.setValue("exemption_for",data[0].exemption_for);
//	    			if (isNull(data[0].exemption_for) || data[0].exemption_for=='')
//	    			{
//	    				console.log("no subheading");
//	    				headingForEMinForm.getItem("exemption_for").textBoxStyle="redTextStyle";
//
//	    			}

	    			exemptionMinContentForm.setValue("content_1",data[0].content_1);
	    			substituteTags();
	    		}
	    );


        isc.ControlledDynamicForm.create({
	        ID:"exemptionMinContentForm",
	        dataSource:"exemptionJobDS",
		    valuesManager:valueManMin,
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
//	        itemChanged:function(){
//	        	unsaveFlag2=true;
//	        },
	    });


        isc.ControlledDynamicForm.create({
	        ID:"exemptionCertMinbottomRightForm",
	        //dataSource:"dicPublicDS",
	        dataSource:"exemptionJobDS",
		    valuesManager:valueManMin,
			width:200,
			onControl:"EXEMPT_WRITE||FSQC_ALL",
			height:80,
			align:"left",
			valign:"top",
			defaultLayoutAlign: "left",
			autoFetchData: false,
	        titleWidth:"100%",
	        canEdit:true,
	        numCols: 3,
	        //autoFocus: true,
	        fields: [
	        			  {name:"surveyor", title:"Prepared By:", defaultValue:null,
	        				  editorType:"ComboBoxItem",
	        			 		addUnknownValues:false, wrapTitle: false,
	        			 		 optionDataSource: "userDS",
	        			 		displayField:"userName",valueField:"userName",
	        			 		sortField:"userName",
	        			 		filterFields:["userName"],
	        			 		pickListCriteria:{fieldName:"userName",operator:"notNull"},
	        			 		pickListWidth:"150",
	        			 		pickListFields:[
	        			 			{name:"userName",width:150}
	        			 		]
	        			 		,pickListProperties: {
	        			 			canEdit: true,
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
	        	                    recordClick: function(viewer, record, recordNum, field, fieldNum, value, rawValue){
	        	                    	/*
	        	                    	console.log(viewer);
	        	                    	console.log(record);
	        	                    	console.log(recordNum);
	        	                    	console.log(field);
	        	                    	console.log(fieldNum);
	        	                    	console.log(value);
	        	                    	console.log(rawValue);
	        	                    	console.log("--------------------------------------------------------");
	        	                    	console.log(record.userName);
	        	                    	*/
	        	                    	
	        	                    	exemptionCertMinbottomRightForm.setValue("surveyor", record.userName);
	        	                    	
	        	                    	if (!isNull(record)) {
	        	                    		isc.DataSource.get("codeMDSurveyorDS").fetchData({"Surveyor_cd": record.id}, function (dsResponse, data, dsRequest) {
	        	                    			if (dsResponse.status != 0) {
	        	                    	            console.log("dsResponse.status != 0");
	        	                    	            return;
	        	                    	        }
	        	                    			var surveyor_title = "";
	        	                    			if (!isNull(data) && data.length > 0 && !isNull(data[0])) {
	        	                    				console.log(data[0]);
	        	                    				surveyor_title = data[0].surveyor_title;
	        	                    			}
	        	                    			
	        	                    			console.log(surveyor_title);
	        	                    			exemptionCertMinbottomRightForm.setValue("duty", surveyor_title);
	        	                    			
	        	                    			exemptionCertMinbottomRightForm.getField('surveyor').pickList.hide();
	        	                    		});
	        	                    	}
	        	                    }
	        			 		}
	        			  },
			              {name:"duty", title:"Surveyor Title:", defaultValue:null,
	        				  editorType:"ComboBoxItem",
	        			 		addUnknownValues:false, wrapTitle: false,
	        			 		optionDataSource: "codeMDSurveyorDS",
	        			 		displayField:"surveyor_title",valueField:"surveyor_title",
	        			 		sortField:"surveyor_title",
	        			 		pickListWidth:"150",
	        			 		pickListFields:[
	        			 			{name:"surveyor_title",title:"Title",width:150},
	        			 		],
	        			 		pickListProperties: {
	        			 			saveLocally : true,
		        			  		dataArrived: function(startRow, endRow, data){
//		        			  			exemptionCertMinbottomRightForm.getField("duty").pickList.data.allRows.getItem(0)["Surveyor_Enam"]
	        			  				console.log(this.data);
		        			  			for (i = endRow-1; i >= startRow; i--)
		        					    {
		        			  				if(
		        			  						this.data.allRows[i]["surveyor_title"] == null
		        			  						|| this.data.allRows[i]["surveyor_title"].trim() == ""
		        			  				)
	        			  					{
		        			  					this.data.localData.removeAt(i);
	        			  					}
		        					    }
		        			  		}

	        			 		}

			              },
//			              {name:"duty", title:"Surveyor Title:",
//	        				  editorType:"ComboBoxItem",
//	        			 		addUnknownValues:false, wrapTitle: false,
//	        			 		optionDataSource: "codeDicPublicDS",
//	        			 		displayField:"data",valueField:"data",
//	        			 		pickListCriteria:{dic_type:"surveyortitle"},
//	        			 		sortField:"sort",
//	        			 		pickListWidth:"150",
//	        			 		pickListFields:[
//
//	        			 		{name:"data",title:"Title",width:150},
//	        			 		{name:"sort"}
//	        			 		]
//
//			              },			              {name:"edit", title:"Edit", type:"button",hidden:true, align:"left", showTitle:false,startRow:false},
			              {name:"issue_date", title:"Issue Date:",wrapTitle:false, defaultValue:null}

			],
			cellPadding:2,
//	        itemChanged:function(){
//	        	unsaveFlag2=true;
//	        },
	    });

        isc.VLayout.create({
	    	ID:"exMinBottomLeft",
	    	width:"80%"
		 });

		  isc.VLayout.create({
			    	ID:"exMinBottomRight",
		                members:[exemptionCertMinbottomRightForm]
		  });



	    isc.HLayout.create({
	    	ID:"exemptionMinbottomFormGroup",
	    	width:"100%",
	    	//height:300,
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
	    	showEdges: false,
	    	membersMargin:5,
	    	//members:[ecertDicItemForm, ecertDicItemBtnBar]
    		members:[exMinBottomLeft,exMinBottomRight]
	    });

	    isc.VLayout.create({
	    	ID:"exMinleftPage",
	    	width:"95%",
	    	//height:300,
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
	    	showEdges: false,
	    	membersMargin:5,
	    	//members:[ecertDicItemForm, ecertDicItemBtnBar]
    		members:[exemptionMinTitleForm_hl,attnTitle_hl,exemption_for_hl,headingForEMinForm, exemptionMinContentForm, exemptionMinbottomFormGroup]
	    });


		isc.IButton.create({
			  ID: "selectExemptionMinbtn",
			  autoDraw: false,
			  width:70,
			  valign:"middle",
			  onControl:"FSQC_ALL||EXEMPT_WRITE",
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

				  //openExemptionCode('exemption', 'minute', callback);

			  }
		});
	    isc.VLayout.create({
	    	ID:"exMinRightPage",
	    	//width: "10%",
	    	height:700,
	    	align:"center",
	    	//layoutTopMargin:10,
	    	showEdges: false,
	    	membersMargin:5,
	    	members:[selectExemptionMinbtn]
	    });
	    isc.HLayout.create({
	    	ID:"exMinLowerPage",
	    	width: "100%",
	    	//layoutTopMargin:10,
	    	showEdges: false,
	    	//isGroup:"true",
	    	//groupTitle:"",
	    	membersMargin:5,
	    	members:[exMinleftPage, exMinRightPage]
	    });


		isc.Window.create({
		    ID:"ExemptionCertMinWindow",
		    title: "Exemption Minutes",
		    width:900,
		    height:895,
		    autoSize:true,
		    autoCenter: true,
		    isModal: true,
		    showModalMask: true,
		    autoDraw: false,
		    items: [

				    isc.VLayout.create({
				    	ID:"ExemptionCertMinFullPage",
				    	width:"100%",
				    	layoutTopMargin:0,
				    	defaultLayoutAlign: "center",
				    	showEdges: false,
				    	membersMargin:30,
				    	colWidths: ["90%", "10%"],
				    	members:[topExMinBtnBar, exMinLowerPage]
				    })

			]
		});


	}
}

