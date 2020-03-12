//Exemption Code

isc.Label.create({
    ID: "ExemptionCertCO2Report",
    contents: "",
});

//var sort = 0;
//var reportRecord = [];
var reportContent = "";

function openExemptionCertCO2Report(exemptionJobno){
	console.log("start of ExemptionCertCO2Report page");
	ExemptionCertCO2Report();
	ExemptionCertCO2ReportWindow.show();

	function callback(action, return_data){

		headingForECertCO2Form.clearValues();
		ExemptionCertCO2ContentForm.clearValues();

	    isc.DataSource.get("ecertExemptionsCodeDS").fetchData({id:return_data.ex_code_id},
	    		function (dsResponse, data, dsRequest){
					//headingForECertCO2Form.setValue("subheading",data[0].subheading);
	    		}
	    );

	    isc.DataSource.get("ecertDicContentDS").fetchData({id:return_data.content_id, form_type:"Exemption Certificate(CO2)"},
	    		function (dsResponse, data, dsRequest){
	    		
	    			//console.log(data[0].content);
	    			//console.log(data[0].content);

	    			if (!isNull(data) && data.length > 0 && !isNull(data[0]) && !isNull(data[0].content) && data[0].content != null && data[0].content != undefined) {
		    			reportContent = data[0].content + "\n";
						//ExemptionCertCO2ContentForm.setValue("content_1",reportContent);
	    			}

					for (i = 0; i < return_data.conditions_ids.length; i++) {

		    		    isc.DataSource.get("ecertDicItemDS").fetchData({id:return_data.conditions_ids[i], form_type:"Exemption Certificate(CO2)"},
		    		    		function (dsResponse, itemData, dsRequest){
		    		    			//reportRecord.push({position:reportCount, content:itemData[0].content});
		    		    			//reportCount = reportCount + 1;
		    		    			//reportRecord.push(itemData[0]);
		    		    			console.log(itemData[0].content);
		    		    			if (!isNull(itemData) && itemData.length > 0 && !isNull(itemData[0]) && !isNull(itemData[0].content) && itemData[0].content != null){
		    		    				var reportContent = "";
		    		    				if(!isNull(ExemptionCertCO2ContentForm.getValue("content_1"))){
		    		    					reportContent = ExemptionCertCO2ContentForm.getValue("content_1");
	    		    					}
				    					reportContent = reportContent + itemData[0].content + "\n";
			    								    					
				    				//	ExemptionCertCO2ContentForm.setValue("content_1",reportContent);
		    		    			}
		    		    		}
		    		    );

					}
	    		}
	    );
	   

	}

	function showExemptionCertCO2Report(){
		//ReportViewWindow.displayReport(["RPT_Declaration_Reissuance_Cert", {"id" : ExemptionCertCO2ReportVM.getValue("id")}]);
		//print both original and office copy together
		console.log("jobno: " + ExemptionCertCO2ReportVM.getValue("jobno") + "; imono: " + ExemptionCertCO2ReportVM.getValue("imono"));
		console.log("before all");
		//ReportViewWindow.downloadReport(["RPT_ExemptionCert_CO2", {"jobno" : ExemptionCertCO2ReportVM.getValue("jobno"), "office_copy": true}]);
		//console.log("after copy");
		ReportViewWindow.downloadReport(["RPT_ExemptionCert_CO2", {"jobno" : ExemptionCertCO2ReportVM.getValue("jobno"), "office_copy": false}]);
		console.log("after original");
	}

	function ExemptionCertCO2Report(){

		var unsaveFlag = true;

	    var valueMan = isc.ValuesManager.create({
	        ID: "ExemptionCertCO2ReportVM",
	        dataSource: exemptionJobDS,
	        itemChanged: function(){
	        	unsaveFlag = true;
	        }
	        
	    });

	    //ExemptionCertCO2ReportVM.setValue("id", exemptionJobId);

		isc.IButton.create({
			  ID: "outputExemptionCO2Reportbtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  title: "Output",
			  onControl:"EXEMPT_PRINT||FSQC_ALL",
			  click:function (){
				  //callback(true, ExemptionCertCO2ReportVM.getValue("id"), ExemptionCertCO2ReportVM.getValue("form") );
				  console.log("outputExemptionCO2Reportbtn clicked");
				  
				  //if(unsaveFlag && ( ExemptionCertCO2ContentForm.valuesHaveChanged() || headingForECertCO2Form.valuesHaveChanged() || ExemptionCertCO2bottomLeftForm.valuesHaveChanged() ) ){
				  //if( ( ExemptionCertCO2ContentForm.valuesHaveChanged() || headingForECertCO2Form.valuesHaveChanged() || ExemptionCertCO2bottomLeftForm.valuesHaveChanged() ) ){
				  if (unsaveFlag && ExemptionCertCO2ReportVM.valuesHaveChanged())
					  {
					  isc.ask("Are you sure to save and output?", function (value){
						  if (value){
							  ExemptionCertCO2ReportVM.saveData(
									  function(dsResponse, data, dsRequest) {			        									        							
			        							unsaveFlag = false;
			        							showExemptionCertCO2Report();			        							
			        						
							  		  }

							  );					  
							  
						  }
					  });

				  }else{
					  showExemptionCertCO2Report();
				  }

			  }
		});
		isc.IButton.create({
			  ID: "saveExemptionCO2Reportbtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  onControl:"FSQC_ALL||EXEMPT_WRITE",
			  title: "Save",
			  click:function (){

				  //console.log(ExemptionCertCO2ReportVM.getValue("jobno"));
				  ExemptionCertCO2ReportVM.saveData(
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
			  ID: "closeExemptionCO2Reportbtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  title: "Close",
			  click:function (){

				  if(unsaveFlag && ExemptionCertCO2ReportVM.valuesHaveChanged()  ){

					  isc.ask("Edited content(s) is/are not saved. Are you sure to close?", function (value){
						  if (value){
							  ExemptionCertCO2ReportWindow.hide();
						  }
					  });

				  }else{
					  ExemptionCertCO2ReportWindow.hide();
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
	    	members:[outputExemptionCO2Reportbtn, saveExemptionCO2Reportbtn, closeExemptionCO2Reportbtn]
	    });
	    isc.TitleLabel.create({
	        ID: "ExemptionCertCO2TitleForm",
	        align:"center",
	        //wrap: true,
	        height: "*",
	        contents: "<b><font size=4px>Exemption Certificate<br>免 除 證 書</br></br></br>"
	    });
	    
	    
	    isc.TitleLabel.create({
	        ID:"headingForECertCO2Form",
	        	        
		    
			width:"100%",
			height:"*",
			align:"center",
			contents: "<font size=2px>Issued under the provisions of the International Convention for the Safety of Life at Sea, 1974, as modified by the Protocol of<br>1988 relating thereto under the authority of the Government of the Hong Kong Special Administrative Region</br>of the People's Republic of China by the Marine Department</br>經中華人民共和國香港特別行政區政府授權，由海事處根據《經１９８８年議定書</br>修定的１９７４年國際海上人命安全公約》的規定簽發</br>"
	        //titleWidth:"100%",
	        	        
	          });
      

        isc.Label.create({
        	ID: "shipUpperRow1",
            top: 320, padding: 10,
            width:"28%", height: 58,
            border: "1px solid grey",
            align:"center",
            contents: "Name of Ship</br></br>船名",
            count: 0,
           
        });
        isc.Label.create({
        	ID: "shipUpperRow2",
            top: 320, padding: 10,
            width:"18%", height: 58,
            align:"center",
            border: "1px solid grey",
            contents: "Distinctive No.</br>or letters</br>船舶編號或呼號",
            count: 0,
        });
        isc.Label.create({
        	ID: "shipUpperRow3",
            top: 320, padding: 10,
            width:"18%", height: 58,
            align:"center",
            border: "1px solid grey",
            contents: "Port of Registry</br></br>船籍港",
            count: 0,
        });
        isc.Label.create({
        	ID: "shipUpperRow4",
            top: 320, padding: 10,
            width:"18%", height: 58,
            align:"center",
            border: "1px solid grey",
            contents: "Gross Tonnage</br></br>總噸位",
            count: 0,
        });
        isc.Label.create({
        	ID: "shipUpperRow5",
            top: 320, padding: 10,
            width:"18%", height: 58,
            align:"center",
            border: "1px solid grey",
            contents: "IMO Number</br></br>國際海事組織編號",
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

	    ExemptionCertCO2ReportVM.fetchData({jobno:exemptionJobno, form:"Exemption Certificate(CO2)"},
	    		function (dsResponse, data, dsRequest){


	    			if(!isNull(data) && data.length > 0 && !isNull(data[0]) && data[0].imono != null){
		    			shipLowerRow5.setContents("<b>"+data[0].imono);

			    		isc.DataSource.get("fsqcShipDS").fetchData({Imono:data[0].imono},
			    				function (dsResponse, data, dsRequest){
			    					if (!isNull(data) && data.length > 0 && !isNull(data[0]) && !isNull(data[0].Spname) && !isNull(data[0].Regno) && !isNull(data[0].Gross))
			    					shipLowerRow1.setContents("<b>"+data[0].Spname);
			    					if (data[0].Regno!=null)
			    						shipLowerRow2.setContents("<b>"+data[0].Regno);
			    					shipLowerRow4.setContents("<b>"+data[0].Gross);
			    				}
			    		);
	    			}
//	    			if(data[0].subheading != null){
//		    			if(data[0].subheading == "NO DATA,PLEASE UPDATE EXEMPTION CODE TABLE."){
//		    				//RED color//headingForECertCO2Form.setValue("subheading",data[0].subheading);
//		    			}
//		    			//headingForECertCO2Form.setValue("subheading",data[0].subheading);
//		    			//console.log(data[0]);
//		    			//console.log(data[0].subheading);
//	    			}
//	    			if(data[0].content_1 != null){
//		    			ExemptionCertCO2ContentForm.setValue("content_1",data[0].content_1);
//	    			}
//	    			if(data[0].issue_date != null){
//		    			ExemptionCertCO2bottomLeftForm.setValue("issue_date",data[0].issue_date);
//	    			}
//	    			if(data[0].cc != null){
//		    			ExemptionCertCO2bottomLeftForm.setValue("cc",data[0].cc);
//	    			}

	    		}
	    );
	    eCertRecordDS.fetchData({id:exemptionJobno},
	    		function (dsResponse, data, dsRequest){
    			
	    				    	
	    		}
	    );


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
	        ID:"ExemptionCertCO2ContentForm",
	        dataSource:"exemptionJobDS",
		    valuesManager:valueMan,
			width:"100%",
			height:300,
			align:"center",
			//onControl:"FSQC_ALL||EXEMPT_WRITE",
			autoFetchData: false,
	        titleWidth:"100%",
	        canEdit:false,
	        //autoFocus: true,
	        items:[
	               {
	                   type: "textArea",
	                   name: "content_1",
	                   title: "",
	                   width:"100%",
	                   height:"100%",
	                   //selectOnFocus:true,
	                   wrapTitle:false,
	                   showTitle:false,
	                   canEdit:false,
	                   disabled:true
	               },
	        ],
	        itemChanged:function(){
	        	unsaveFlag=true;		
	        },
	    });
       
	   
        isc.ControlledDynamicForm.create({
	        ID:"ExemptionCertCO2bottomLeftForm",
	        dataSource:"exemptionJobDS",
		    valuesManager:valueMan,
			width:450,
			height:80,
			onControl:"EXEMPT_WRITE||FSQC_ALL",
			align:"left",
			valign:"top",
			defaultLayoutAlign: "left",
			autoFetchData: false,
	        titleWidth:"100%",
	        canEdit:true,
	        //numCols: 10,
	        //autoFocus: true,
	        fields: [
			              {name:"issue_date", title:"Date:", type:"date", hidden:true},
			              {name:"cc", title:"c.c.:",hidden:true},
			],
			cellPadding:2,
	        itemChanged:function(){
	        	
	        },
	    });
        isc.ControlledDynamicForm.create({
	        ID:"ExemptionCertCO2bottomRightForm",
	        dataSource:"exemptionJobDS",
		    valuesManager:valueMan,
			width:"100%",
			height:80,
			onControl:"FSQC_ALL||EXEMPT_WRITE",
			align:"left",
			valign:"top",
			//margin:150,
			defaultLayoutAlign: "right",
			autoFetchData: false,
	        titleWidth:"100%",
	        canEdit:true,
	        //numCols: 8,
	        //autoFocus: true,
	        fields: [			            
	        			  {name:"surveyor", title:"Signature of authorized official 授權官員簽字", defaultValue:loginData.userId,
	        				  type:"text",
	        			 		addUnknownValues:false, wrapTitle: false,margin:150 },
			             
//	        			 		isc.Label.create({
//	        			        	//ID: "shipUpperRow2",
//	        			            top: 20, padding: 10,
//	        			            width:"100%", height: 58,
//	        			            //align:"center",
//	        			            //border: "1px solid grey",
//	        			            contents: "Signature of authorized official 授權官員簽字",
	        			            
	        			      //  })
			],
			cellPadding:2,
	        itemChanged:function(){
	        	unsaveFlag = true;
	        },
	    });

	    isc.HLayout.create({
	    	ID:"ExemptionCertCO2bottomFormGroup",
	    	width:"80%",
	    	//height:300,
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
	    	showEdges: false,
	    	membersMargin:5,
	    	//members:[ecertDicItemForm, ecertDicItemBtnBar]
    		members:[ExemptionCertCO2bottomLeftForm, ExemptionCertCO2bottomRightForm]
	    });

	    isc.VLayout.create({
	    	ID:"leftPage",
	    	width:"100%",
	    	//height:300,
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
	    	showEdges: false,
	    	membersMargin:5,
	    	//members:[ecertDicItemForm, ecertDicItemBtnBar]
    		members:[ExemptionCertCO2TitleForm, headingForECertCO2Form, shipGroup, ExemptionCertCO2ContentForm, ExemptionCertCO2bottomFormGroup]
	    });

		 
	    isc.HLayout.create({
	    	ID:"lowerPage",
	    	width: "100%",
	    	//layoutTopMargin:10,
	    	showEdges: false,
	    	//isGroup:"true",
	    	//groupTitle:"Exemption Certificate",
	    	membersMargin:5,
	    	members:[leftPage]
	    });


		isc.Window.create({
		    ID:"ExemptionCertCO2ReportWindow",
		    title: "Exemption Certificate(CO2)",
		    width:900,
		    height:895,
		    autoSize:true,
		    autoCenter: true,
		    isModal: true,
		    showModalMask: true,
		    autoDraw: false,
			closeClick : function(){
				  if(unsaveFlag && ExemptionCertCO2ReportVM.valueHaveChanged() ){

					  isc.ask("Edited content(s) is/are not saved. Are you sure to close?", function (value){
						  if (value){
							  ExemptionCertCO2ReportWindow.hide();
						  }
					  });

				  }else{
					  ExemptionCertCO2ReportWindow.hide();
				  }
			},
		    items: [

				    isc.VLayout.create({
				    	ID:"ExemptionCertCO2ReportFullPage",
				    	width:"100%",
				    	layoutTopMargin:0,
				    	defaultLayoutAlign: "center",
				    	showEdges: false,
				    	membersMargin:30,
				    	colWidths: ["80%", "20%"],
				    	members:[topBtnBar, lowerPage]
				    })

			]
		});

//--------------------------------------------------------------------------------------------------
  	  

		


	}
}

