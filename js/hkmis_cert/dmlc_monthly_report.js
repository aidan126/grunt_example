/***************************************************************************************************************
* Qualified Name	 	/webui/src/main/webapp/js/hkmis_cert/dmlc_monthly_report.js
* @author 				Dicky Lee
* @since				2019-08-01
* **************************************************************************************************************
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-08-01				Dicky Lee			Initial Implementation
* 00001		2019-08-08				Dicky Lee			remote hard coded title
* 00002     2019-08-13				Dicky Lee			add issue date caption and fixed total record count when use built in search
* 00003		2019-08-14				Dicky Lee			change search button caption to query for standardization
****************************************************************************************************************/



console.log("dmlc_monthly_report.js loaded.  \r\n");

isc.ButtonToolbar.create({
	ID:"dmlc_report_SearchToolBar",align: "right",valign:"top",
	width:180,
	//height:50,
	//showEdges: true,
    autoDraw:false, membersMargin:5,
	buttons: [
        {   name:"searchBtn", title:"Query", disabled: false,valign:"top",
            click : function () {
                // sfRecWindow.show();
                dmlc_report_SearchResultListLG.setData([]);
                dmlc_report_SearchMainCriteria.setValue("issue_dateFrom", new Date(dmlc_report_SearchMainCriteria.getValue("issue_dateFrom")));
                dmlc_report_SearchMainCriteria.setValue("issue_dateTo", new Date(dmlc_report_SearchMainCriteria.getValue("issue_dateTo")));			  
                
                //var criteria_main = dmlc_report_SearchMainCriteria.getValuesAsCriteria(false);
               // var criteria_main = dmlc_report_SearchMainCriteria.getField("issue_date").getCriterion();
                
                var criteria_main = {
        		        _constructor:"AdvancedCriteria",
        		        //operator:"and",
        		        criteria:[
        		        	//{ fieldName:"issue_date", operator:"greaterOrEqual", value: dmlc_report_SearchMainCriteria.getValue('issue_dateFrom')},
        		            { fieldName:"issue_date", operator:"greaterOrEqual", value: new Date(dmlc_report_SearchMainCriteria.getValue('issue_dateFrom')) },
        		            { operator:"and",
        		            	criteria:[
        		                  //{ fieldName:"issue_date", operator:"lessOrEqual", value: dmlc_report_SearchMainCriteria.getValue('issue_dateTo') },
        		                  { fieldName:"issue_date", operator:"lessOrEqual", value: new Date(dmlc_report_SearchMainCriteria.getValue('issue_dateTo')) },
        		                  
        		                  //{ fieldName:"completeDate", operator:"greaterOrEqual", value:numberCompleteCertQueryform.getValue('criteria_start_date') }
        		                 // { fieldName:"reports", operator:"notNull" }
        		              ]
        		            },
        		        ]
        		    };
                dmlc_report_SearchResultListLG.fetchData(criteria_main
                , function(dsResponse, data, dsRequest) {
                    var c = "<p> Total no. of search item: <b> "+ dsResponse.totalRows +" </b> </p>";
                    dmlcSearchResultListLGSummary.setContents(c);
                
                
                });

            }
        },
        {   name: "clearBtn", title: "Clear", disabled: false,valign:"top",
            click : function () {
                            
            	// set the date range to btw last month date and today	
               // dmlc_report_SearchMainCriteria.getItem("issue_date").setValue("");
            	dmlc_report_SearchMainCriteria.getItem("issue_dateFrom").clearValue();
            	dmlc_report_SearchMainCriteria.getItem("issue_dateTo").clearValue();
            }
        }
	    
    ]
});


isc.HLayout.create({
	ID:"dmlc_report_searchR1HL", 
    //width:680, 
	height:60,
    //layoutTopMargin:10, 
    //layoutBottomMargin:10,
    //padding:10,
    /*top:20,*/
    width:300,
    //backgroundColor:"lightblue",
    defaultLayoutAlign: "right",
    align:"right",
    valign:"top",
    //isGroup: true, groupTitle: "Type of Report",
    //showEdges: true,
    autoDraw:false,
    //contents:"dmlc_report_searchR1HL",
    membersMargin:5, members:[dmlc_report_SearchToolBar]
});

isc.DynamicForm.create({
	ID: "dmlc_report_SearchMainCriteria",
    
    //dataSource : "certJobDmlcDS",
    
    width:400,
    height:60,
    numCols: 6,
    isGroup:true,
    groupTitle:"Issue Date",
    colWidths: [40, "*", 20, "*", 20, "*"],
    autoDraw:false,
    saveOnEnter: true,
    submit: function(){
    	dmlc_report_SearchToolBar.getButton("searchBtn").click();
    },
    fields: [
        //{name: "issue_date", showTitle:false, editorType: "DateRangeItem"},
       // {name: "issue_dateFrom", Title:"From", editorType: "DateItem",useTextField: true, type:"yyyy/MM/dd" , inputFormat:"yyyy/MM/dd" },
    	 {name: "issue_dateFrom", title:"From", editorType: "DateItem",useTextField: true, type:"Date"  },
    	 {name: "issue_dateTo", title:"To", editorType: "DateItem",useTextField: true, type:"Date" },
        //{name: "issue_dateTo", Title:"To", editorType: "DateItem",useTextField: true, type:"yyyy/MM/dd" , inputFormat:"yyyy/MM/dd"},
    ]

});

isc.HLayout.create({
	ID:"dmlc_report_SearchMainCriteriaHLayout",
    //width:950,
	//width:"100%",
    width:500,
    height:60,
  	//layoutMargin:5,
    //contents:"dmlc_report_SearchMainCriteriaHLayout",
  	membersMargin:5,
    autoDraw:false,
  	members:[           
            dmlc_report_SearchMainCriteria
            ]
});


isc.HLayout.create({
	//ID:"dmlc_report_searchCriteriaLayout",
	ID:"dmlc_report_SearchMainCriteriaVLayout",
  	layoutMargin:5,
  	//width:950,
  	//width:1080,
  	
  	width:"100%",
  	height:60,
  	membersMargin:150,
    autoDraw:false,
    //contents:"dmlc_report_SearchMainCriteriaVLayout",
  	members:[
  		 dmlc_report_SearchMainCriteriaHLayout,dmlc_report_searchR1HL
    ]
});

isc.HLayout.create({
	ID:"dmlc_report_searchCriteriaLayout",
    //width:950,
	width:"100%",
    height:60,
  	//layoutMargin:5,
  	membersMargin:5,
    autoDraw:false,
    //overflow:"auto",
   // contents:"dmlc_report_searchCriteriaLayout",
  	members:[
  	        dmlc_report_SearchMainCriteriaVLayout                     
  	         ]
});

isc.ListGrid.create({
	ID:"dmlc_report_SearchResultListLG",
	dataSource : certJobDmlcDS,
    showFilterEditor:true,
    filterOnKeypress:true,
    autoFetchData:false,
    height:"*",
    autoDraw:false,
    autoFitFieldWidths:true,
    autoFitWidthApproach :"title",
	fields: [
        {name: "refno", title: "Ref No.", width:80},
        {name: "imono", title: "IMO NO.", width:80},
        //{name: "form", title: "Form", width:50},
        //{name: "ver", title: "Ver", width:40},
        {name: "spname", title: "Name of Ship", width:200},       
        {name: "manager", title: "Ship Management Company", width:300},
        {name: "remarks", title: "Remarks", width:300},
        {name: "gross", title: "Gross Tonnage", width:200},
        {name: "issue_date", title: "Issue Date", width:200},
        {name: "startPerson", title: "Done By", width:200},
        {name: "cert_sig_name", title: "Print with Signature", width:200},
        //{name: "reissued",title:"Re-issued", valueMap: {null:"NO" ,"Y":"YES" }},
        {name: "reissued",title:"Re-issued"},
    ],
});


isc.TitleLabel.create({
	ID:"dmlcSearchResultListLGSummary", contents: "<p> Total no. of search item: <b> 0 </b> </p>"
    ,autoDraw:false
});

var DMLCLGSummaryBar = isc.HLayout.create({
    height:20,
    members: [
    	dmlcSearchResultListLGSummary	
		, isc.IExportButton.create({
			title: "Export",
			width: 120,
			listGrid: dmlc_report_SearchResultListLG
		})
    		
    ]
});  

isc.VLayout.create({
    ID: "mainLayoutDmlc_report",
    //contents:"mainLayoutDmlc_report",
    membersMargin: 10,
    members: [
        //isc.TitleLabel.create({ID:"sectionTitle", contents: "<p><b><font size=3px>Seafarer Registration Maintenance - Record [Ver 0.1.1]</font></b></p>"}),
        isc.TitleLabel.create({ID:"sectionTitle", contents: ""}),
        
        isc.SectionStack.create({
            height:"100%",
           
            sections: [
                //20190715 decided to eliminate advanced search section
                {title: "Search", expanded: true, resizeable: false,
                	items: [ dmlc_report_searchCriteriaLayout  ]}                  
                
                ,
                {title: "Result", expanded: true, items: 
					[ 
						dmlc_report_SearchResultListLG        
				        , DMLCLGSummaryBar				
					]
				}
            ]
        }),
        
    ]
});












