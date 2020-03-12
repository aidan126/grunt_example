/***************************************************************************************************************
* Qualified Name	 	/webui/src/main/webapp/js/hkmis_cert/msmc.js
* @author 				Jacky Ng
* @since				2019-05-30
* **************************************************************************************************************
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-05-30				Jacky Ng			Initial Implementation
* 00001		2019-07-20				Jacky Leong			Change to use ValueManager
* 00002		2019-11-27				Jacky Ng			always hide checkbox and show Engineer Surveyor and Engineer Date items
*
****************************************************************************************************************/


//var sfMSMCRhsPanelWidth = 860;
var sfMSMCRhsPanelWidth = 856;
var MSMCInfoRhsRowWidth = 550;
var showEdgesOfLayoutInTabs = false;
var msmcPagedRecordNum = 75;
var readingDataFromDBMode = true;
var msmcTabTextAreaHeight = 55;
var msmcEngineerClass1Label = "Engineer Class1: ";
var msmcEngineerClass2Label = "Engineer Class2: ";
var msmcEngineerClass3Label = "Engineer Class3: ";

var msmcUmsSpecReqTextEng1 = "If the UMS system becomes inoperative, in addition to the manning scale mentioned in the above table,";
var msmcUmsSpecReqTextEng2 = " one (1) ";
var msmcUmsSpecReqTextEng3 = " and";
var msmcUmsSpecReqTextEng4 = " shall be added further.";
var msmcUmsSpecReqTextEng5 = "The manning scale mentioned in the table above will suffice for non-UMS operation.";
var msmcUmsSpecReqTextEngRole1 = "Engineer Class 3";
var msmcUmsSpecReqTextEngRole2 = "Rating forming part of an engineering watch";

var msmcUmsSpecReqTextChi1 = "如果無人看管機艙系統不能操作，除上表所述的人手編配數目外，須增加";
var msmcUmsSpecReqTextChi2 = "一名";
var msmcUmsSpecReqTextChi3 = "和";
var msmcUmsSpecReqTextChi4 = "。";
var msmcUmsSpecReqTextChi5 = "上表所列的人手編配數目可滿足機艙以人手值班模式運作時的人手編配要求。";
var msmcUmsSpecReqTextChiRole1 = "三級輪機師";
var msmcUmsSpecReqTextChiRole2 = "機房值班普通船員";

var msmcTankSpecReqTextEng = "Any person with immediate responsibility for loading, discharging and care in transit or handling of dangerous cargo must hold a certificate or documentary evidence in accordance with Reg. V/1 of the STCW Convention.";
var msmcTankSpecReqTextChi = "在危險貨物的運輸或處理期間對其裝卸和保管負有直接責任的任何人員，必須按《STCW國際公約》附則第V/1條的規定持有證書或證明文件。";

var msmcCookSpecReqTextEng = "Where the total manning of not less than 10, there shall be a fully qualified cook in addition to the manning scale mentioned in the above table.";
var msmcCookSpecReqTextChi = "如總配員數目不少於十人，則除上表所述的人手編配數目外，須配備一名具有正式資格的廚師。";

var msmcSisterShipDeclTextEng = "This ship is a sister ship of  ";


var tankSpType = ["TANKER", "CHEMICAL", "OIL", "LIQUEFIED", "LPG", "ASPHALT", "GAS"];

var issueDateOmitReason1 = "Cargo Ships Safety Section upon approval by AD/S.";
var issueDateOmitReason2 = "shipping registry.";
var issueDateOmitReason3 = "Shipping Registry upon completion of ship registration process.";


var li_off_class1 = 0;
var li_off_class2 = 0;
var li_off_class3 = 0;

var li_eng_class1 = 0;
var li_eng_class2 = 0;
var li_eng_class3 = 0;

var ls_e_class1_text = "";
var ls_e_class2_text = "";

var li_rating_asd = 0;
var li_rating_rwd = 0;
var li_rating_ord = 0;

var li_rating_ase = 0;
var li_rating_rwe = 0;

var insufficient_Msmc_highlight = "#FFFF00";

console.log("entered msmc.js");
//============================================================================================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------

var msmc_saving = false;


function msmc__windowContent(){
    /*
    isc.ResultSet.create({
        ID: "certJobMsmcResultSet",
        dataSource : "certJobMsmcDS"
    });
    */
    console.log("msmc__windowContent");
    isc.IButton.create({
        ID:"sfMSMCUpdate",
        //	width:200,
        onControl: "MSMC_WRITE",
        width:"30%",
        title: "Update Data from FSQC",
        autoDraw: false,
        //icon: "icons/16/world.png",
        //iconOrientation: "right",
        click: "isc.say('Update!')"
    });

/* 00001 - Start Add */
var valueMan = isc.ValuesManager.create({
    ID: "certJobMsmcVM",
	dataSource: certJobMsmcDS
});
/* 00001 - End Add */





    isc.ControlledDynamicForm.create({
        ID: "sfMSMCJobNo",
        //dataSource: "hkCertDS",
        dataSource: "certJobMsmcDS",
/* 00001 - Start Add */
	valuesManager:valueMan,
/* 00001 - End Add */
		onControl: "MSMC_WRITE",

    //	width:550,
        width:"100%",
        colWidths: ["*","*","*", 150],
        align:"right",
        //autoFocus: true,
//        cellBorder: 1,
        numCols: 4,
        items:[
            {
                name: "form",
                title: "Form:",
                textAlign:"center",
                //selectOnFocus: true,
                wrapTitle: false,
                disabled:true,
                hidden:true
//                ,defaultValue: ""
            },
			{name: "cert_dept_code", title:"Dept:", onControl:"MSMC_WRITE", textAlign:"center", startRow: false, colSpan: 1, width: 200
                , disabled: false, hidden:false
				, type:"select", optionDataSource:"userCertDeptDS", displayField:"cert_dept_code"
					//, valueField:"cert_dept_id"
					, valueField:"cert_dept_code"
					, pickListFields:[
			              {name:"cert_dept_code"},
			              {name:"cert_dept_name"}
			          ],
					  defaultValue : current_cert_dept.cert_dept_code,
			          pickListWidth:350,
			},
			{
                //type: "text",

                //name: "jobNo",
                name: "jobno",
                title: "Job No.:",
                textAlign:"center",
                //selectOnFocus: true,
                wrapTitle: false,
                //readOnlyDisplay: "readOnly",
                //canEdit: false,
                disabled:true
                //,defaultValue: ""
            },

        ]
    });



    isc.HLayout.create({
        ID:"msmcHeader",
    //	width:sfMSMCRhsPanelWidth,
        width:"95%",
        //height:"7%",
        height: 26,
        showEdges: false,
        //layoutBottomMargin: 30,
        membersMargin:5, members:[
        							//sfMSMCUpdate,
        							sfMSMCJobNo
    							]
    });
    //----------------------------------------------------------------------------------------------------------------------------------------

    /*
    isc.DynamicForm.create({
        ID:"msmcHeader",
        dataSource: "hkCertDS",
        isGroup: "true",
        groupTitle: "Ship Information",
        numCols: 4,
        width:800,
        fields: [
            sfMSMCUpdate,sfMSMCJobNo


        ]
    });
    */


    //dd MMMM yyyy




//未用
//isc.DynamicForm.create({
//	ID:"msmcShipInfo",
//	//dataSource: "certJobMsmcResultSet",
//	//dataSource: "hkCertDS",
//	dataSource: "certJobMsmcDS",
///* 00001 - Start Add */
//	valuesManager:valueMan,
///* 00001 - End Add */
//	isGroup: "true",
//	groupTitle: "Ship Information",
//    //autoFetchData: true,
//	numCols: 8,
//    autoDraw: false,
//	//width:sfMSMCRhsPanelWidth,
//    width:"100%",
//    //colWidths:["*","*","*","*","*","*","*","*"],
//    //overflow:"auto",
//	cellPadding:2,
//	fields: [
//
//        //--------------for reading data from DB--------------
//		//{name: "shipInfoSpName", id:"shipInfoSpName",	title:"Name of Ship:", wrapTitle:false,startRow: true, colSpan: 3, width: 250},
//		{name: "spname", 	title:"Name of Ship:", wrapTitle:false,startRow: true, colSpan: 3
//			//, width: (sfMSMCRhsPanelWidth/2-80)
//			, width: "100%"
//		},
//		{name: "imono", title:"IMO NO.:",	wrapTitle:false,startRow: false, colSpan: 1
//            //, width: 120
//        },
//		{name: "distinctNo", title:"Distinct No:",	wrapTitle:false,startRow: false, endRow: true,colSpan: 1
//            //, width: 120
//        },
//
//		{name: "ship_jobno_sptype", id:"shipInfoSpType2", title:"Type of Ship:",	wrapTitle:false,startRow: true, colSpan: 3
//            //, width: (sfMSMCRhsPanelWidth/2-80)
//        	, width: "100%"
//        },
//
//		//{name: "shipInfoRegisterDate", title:"Register Date:", type:"datetime", datetimeFormatter: "toEuropeanShortDate", wrapTitle:false,startRow: false, colSpan: 1, width: 120
//		//{name: "shipInfoRegisterDate", title:"Register Date:", type:"date", wrapTitle:false,startRow: false, colSpan: 1, width: 120
//		//{name: "shipInfoRegisterDate", title:"Register Date:", type:"date", format:"dd MMM yyyy", useTextField:true, wrapTitle:false,startRow: false, colSpan: 1, width: 120
//        {name: "registerDate", title:"Register Date:", type:"date", useTextField:true, wrapTitle:false,startRow: false, textAlign:"center", colSpan: 1
//            //, width: 120
//            ,change:function(){
//
//                //this.setValue("31/12/1970");
//            }
//        },
//		//{name: "shipInfoRegisterDate", title:"Register Date:", type:"staticText", format: "dd MMMM yyyy"              , wrapTitle:false,startRow: false, colSpan: 1, width: 120},
//
//		{name: "tradingArea", title:"Trading Area:",	wrapTitle:false,startRow: false, colSpan: 1
//            //, width: 120
//        },
//		{name: "gross", 	title:"GT:", type:"float", format:",0", swrapTitle:false,tartRow: true, colSpan: 1
//            //, width: 120
//        },
//		{name: "enginePower", title:"PP:", type:"float", format:",0", align:true, wrapTitle:false,startRow: false, colSpan: 1
//            //, width: 120
//        },
//		{name: "spclass", title:"Class:",	wrapTitle:false,startRow: false, colSpan: 1
//            //, width: 120
//        },
//		{name: "registryPort", title:"Port of Registry:",	wrapTitle:false,startRow: false, colSpan: 1
//            //, width: 120
//        },
//		{name: "operator", 	title:"Operator:",	startRow: true, colSpan: 6
//            , width: 550
//        },
//		{
//	    	name: "expand_btn",
//	    	title:"More >>>", type:"button", showTitle:false, startRow: false, colSpan: 1, width: 100,
//			click : function () {
//				var ShipInfo_expand = msmcShipInfo.getItem('ShipInfo_expand');
//				var ShipInfo_btn = msmcShipInfo.getItem('expand_btn');
//				if(ShipInfo_expand.sectionExpanded)
//				{
//					ShipInfo_expand.collapseSection();
//					this.setTitle("More >>>");
//				}
//				else
//				{
//					ShipInfo_expand.expandSection();
//					ShipInfo_btn.setTitle("<<< Less");
//				}
//			}
//		},
//
//		{
//	    	name: "ShipInfo_expand",
//			defaultValue:"Ship Info",
//			startRow: false,
//			type:"section", sectionExpanded:false, hidden: true,
//			itemIds:[
//				"spnameCn",
//				"offno",
//				"flag",
//				"stat",
//				"loa",
//				"breadth",
//				"dw",
//				"depth",
//				"net",
//				"builder",
//				"builtDate",
//				"manager",
//				"owner",
//			],
//		},
//		{name: "spnameCn", wrapTitle:true, startRow: false, colSpan: 3, width: "*"
//            //, title:"no need"
//        },
//		{name: "offno", wrapTitle:false, startRow: false, colSpan: 1
//            //, width: 120, title:"no need"
//        },
//		{name: "flag", wrapTitle:false, startRow: false, colSpan: 1
//            //, width: 120, title:"no need"
//        },
//		{name: "stat", wrapTitle:false, startRow: false, colSpan: 1
//            //, width: 120, title:"no need"
//        },
//		{name: "loa", wrapTitle:false, startRow: false, colSpan: 1
//            //, width: 120, title:"no need"
//        },
//		{name: "breadth", wrapTitle:false, startRow: false, colSpan: 1
//            //, width: 120, title:"no need"
//        },
//		{name: "depth", wrapTitle:false, startRow: false, colSpan: 1
//            //, width: 120, title:"no need"
//        },
//		{name: "dw", wrapTitle:false, startRow: false, colSpan: 1
//            //, width: 120, title:"no need"
//        },
//		{name: "net", wrapTitle:false, startRow: false, colSpan: 1
//            //, width: 120, title:"no need"
//        },
//		{name: "builder", wrapTitle:false, startRow: false, colSpan: 1
//            //, width: 120, title:"no need"
//        },
//		{name: "builtDate", wrapTitle:false, startRow: false, colSpan: 1
//            //, width: 120, title:"no need"
//        },
//		{name: "manager", wrapTitle:false, startRow: false, colSpan: 7, width: "*"
//            //, title:"no need"
//        },
//		{name: "owner", wrapTitle:false, startRow: false, colSpan: 7, width: "*"
//            //, title:"no need"
//        },
//	]
//});

    certJobShipDF("msmcShipInfo", valueMan, "MSMC_WRITE", ["spname","imono","gross"]);

    msmcShipInfo.getItem("ship_jobno_sptype").changed = function(form, item, value){
    	console.log("type of ship is changed");
    	setTankSpecReq();
    };

        
//    //未用
//    isc.ControlledDynamicForm.create({
//        ID:"sfSisterShip",
//        //dataSource: "hkCertDS",
//        dataSource: "certJobMsmcDS",
///* 00001 - Start Add */
//        valuesManager:valueMan,
///* 00001 - End Add */
//        onControl: "MSMC_WRITE",
//        isGroup: "true",
//        groupTitle: "Sister Ship",
//        //width: "90%",
//        //colWidths:["*","90%"],
//    //	width:sfMSMCRhsPanelWidth,
//
//        autoDraw: false,
//        numCols: 2,
//        fields: [
//            {
//                name: "sisterShip",
//                title:"Sister Ship:", 
//                type:"select", optionDataSource:"shipManagementDS", valueField:"spname", displayField:"spname",
//                //type:"select",
//                canSelectText:true,
//                //valueMap:[null],
//                startRow: true, colSpan: 2
//                , width: 680
//                //,width: "50%"
//                ,changed:function(form, item, value){
//                    setSisterShipDecl();
//                }
//            }
//            /*
//            {name: "sisShipCmb", title:"Sister Ship:",	startRow: true, colSpan: 2, width: 680,
//            editorType: "MultiComboBoxItem",
//            autoDraw: false,
//            numCols: 2,
//            fields: [
//                {
//                    name: "sisterShip",
//                    title:"Sister Ship:", type:"select",
//                //type:"select",
//                canSelectText:true,
//                //valueMap:[null],
//                startRow: true, colSpan: 2
//                , width: 680
//                //,width: "50%"
//                ,changed:function(form, item, value){
//                    setSisterShipDecl();
//                }
//            }
//
//            //comboBoxProperties: {
//            //    pickListWidth: 290
//            //},
//            //optionDataSource: "supplyItem",
//            //displayField: "itemName",
//            //valueField: "SKU",
//
//
//            value: ["UNI AUC ONE", "XIN LIAN YANG", "YANGTZE AMBITION", "ZY HI SHENG"]
//            //,autoFetchData: true,
//            //layoutStyle: initialLayoutStyle,
//            //addUnknownValues: initialAddUnknownValues
//            }
//            */
//        ]
//    });
      


    //--------------------------------------------MSMC-----------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------------------------------------



    isc.ControlledDynamicForm.create({
        ID:"sfMSMCInfoLhs",
        //dataSource: "hkCertDS",
        dataSource: "certJobMsmcDS",
/* 00001 - Start Add */
        valuesManager:valueMan,
/* 00001 - End Add */
        onControl: "MSMC_WRITE",
        //isGroup: "true",
        //groupTitle: "HAHA",
            //showEdges:true,
        autoDraw: false,
        width:220,
        height:"*",
        numCols: 3,
//        draw: function(){
//        	console.log("sfMSMCInfoLhs extra code");
//        	this.Super("draw", arguments);
//        },
        fields: [
            //--------------for reading data from DB--------------
            {name: "issuance", 	title:"Issuance:", type:"select",
                valueMap:["New Issuance","Re-Issuance"],
                wrapTitle:false,startRow: true, textAlign:"center", colSpan: 1, width: 120,
                changed:function(form, item, value){
                	issuancePullDownHandler(value);
                	
                    if (!isNull(certJobMsmcVM) && !isNull(certJobMsmcVM.getValues()) && !isNull(certJobMsmcVM.getValues().jobno)) {
                        setFormList(certJobMsmcVM.getValues());
                    }
                }},
            {name: "previousMsmc", 	title:"Previous MSMC:",	type:"ComboBoxItem",
                valueMap:["encl. (?)","float"],
                wrapTitle:false,startRow: true, colSpan: 1, width: 120},
            {name: "cos", 	title:"COS:", type:"ComboBoxItem",
                valueMap:["encl. (?)","float"],
                wrapTitle:false,startRow: true, colSpan: 1, width: 120},
            {name: "issueAt", 	title:"Issue At:", wrapTitle:false,startRow: true, disabled:true, textAlign:"center", colSpan: 1, width: 120},
            {name: "nauticalSurveyor", 	title:"Nautical Surveyor:"
				, type:"SelectItem", optionDataSource:"userDS", displayField:"userName", valueField:"userName"
					, pickListFields:[
			              {name:"userName"}
//			              ,{name:"Com_name"}
//			              ,{name:"Com_fileno"}
			          ]
			          , optionCriteria:{
			        	  nautical_surveyor:true
			          }
			          , pickListWidth:350

            	/*
    //			type: "ComboBoxItem",
                //editorType: "ComboBoxItem",
                //optionDataSource: "operatorDS", valueField: "nameEn",
                */
                /*
                //******************************* working code *******************************
                editorType: "SelectItem",
                optionDataSource: "sysUserDS", valueField: "sysuser_username",
                //*********************************************************************************************
                */
                , wrapTitle:false,startRow: true, colSpan: 1, width: 120
            },
            {name: "engineer", 	title:"Engineer Surveyor:",	wrapTitle:false,startRow: true, textAlign:"center", colSpan: 1, width: 120
				, type:"SelectItem", optionDataSource:"userDS", displayField:"userName", valueField:"userName"
					, pickListFields:[
			              {name:"userName"}
//			              ,{name:"Com_name"}
//			              ,{name:"Com_fileno"}
			          ]
			          , optionCriteria:{
			        	  engineer_surveyor:true
			          }
			          , pickListWidth:350
            },
            
            {name: "showEngineer", title:"", type: "CheckboxItem",wrapTitle:false,showTitle:false,startRow: false, textAlign:"center", colSpan: 1, width: 25
            	,valueMap: {
                    "1": true,
                    "0": false
                }
            	// start #00002
            	,hidden: true
            	//,defaultValue: "1"
            	// end #00002
                ,changed:function(form, item, value){
                	showEngineerChkHandler(value);
                }
            },

            {name: "senior", 	title:"Senior Surveyor:", wrapTitle:false,startRow: true, textAlign:"center", colSpan: 1, width: 120
				, type:"SelectItem", optionDataSource:"userDS", displayField:"userName", valueField:"userName"
					, pickListFields:[
			              {name:"userName"}
//			              ,{name:"Com_name"}
//			              ,{name:"Com_fileno"}
			          ]
			          , optionCriteria:{
			        	  senior_surveyor:true
			          }
			          , pickListWidth:350

            },
            {name: "authorizedOfficial", 	title:"Authorized Official:", wrapTitle:false,startRow: true, textAlign:"center", colSpan: 1, width: 120
				, type:"SelectItem", optionDataSource:"userDS", displayField:"userName", valueField:"userName", defaultValue:"Q. SHI"
					, pickListFields:[
			              {name:"userName"}
//			              ,{name:"Com_name"}
//			              ,{name:"Com_fileno"}
			          ]
			          , optionCriteria:{
			        	  //authorized_official:true
			        	  ads: 1, userStatus: 10
			          }
			          , pickListWidth:350

            },
            {name: "nauticalDate", 	title:"Nautical Date:",	wrapTitle:false,startRow: true, textAlign:"center", colSpan: 1, width: 120},
            {name: "engineerDate", 	title:"Engineer Date:",	wrapTitle:false,startRow: true, textAlign:"center", colSpan: 1, width: 120},
            {name: "adsDate", 	title:"Official Date:",	wrapTitle:false,startRow: true, textAlign:"center", colSpan: 1, width: 120},
            {name: "applicationDate", 	title:"Application Date:",	wrapTitle:false,startRow: true, textAlign:"center", colSpan: 1, width: 120},
            {name: "docReceivedDate", 	title:"Doc. Received on:",	wrapTitle:false,startRow: true, textAlign:"center", colSpan: 1, width: 120}
        ]
    });



    //---------------MSMC Info RHS-------------------------------------------------------

    isc.ControlledDynamicForm.create({
        ID: "sfMSMCMod",
        dataSource: "certJobMsmcDS",
/* 00001 - Start Add */
	valuesManager:valueMan,
/* 00001 - End Add */
        //autoFocus: true,
        //numCols: 3,
		onControl: "MSMC_WRITE",
        width:MSMCInfoRhsRowWidth,
        //colWidths: [190, "*"],
        colWidths: ["*", 180],
        align:"right",
        autoDraw: false,
        items:[
            {
                type: "select",
                name: "mod",
                title: "MOD+-",
                selectOnFocus: true,
                wrapTitle: false,
                textAlign:"center",
                valueMap:["+MOD", "-MOD"]
                //,defaultValue: "+MOD"
            }
        ]
    });
    isc.ControlledDynamicForm.create({
        ID: "sfMSMCUms",
        dataSource: "certJobMsmcDS",
/* 00001 - Start Add */
	valuesManager:valueMan,
/* 00001 - End Add */
        //autoFocus: true,
        //numCols: 3,
		onControl: "MSMC_WRITE",
        width:MSMCInfoRhsRowWidth,
        colWidths: ["*", 180],
        align:"right",
        autoDraw: false,
        items:[
            {
                type: "select",
                name: "ums",
                title: "UMS Y.N",
                selectOnFocus: true,
                wrapTitle: false,
                textAlign:"center",
                valueMap:["YES", "NO"]
                //,defaultValue: "YES"
                ,changed:function(form, item, value){
                    //console.log("UMS pull down menu value changed");
                    //setUMSSpecReq();
                }
            }
        ]
    });


    isc.ControlledDynamicForm.create({
        ID:"sfMSMCInfoDeck",
        //dataSource: "hkCertDS",
        dataSource: "certJobMsmcDS",
/* 00001 - Start Add */
	valuesManager:valueMan,
/* 00001 - End Add */
		onControl: "MSMC_WRITE",
        isGroup: "true",
        groupTitle: "Deck Dept.",
        numCols: 8,
        width:MSMCInfoRhsRowWidth,
        colWidths: [140, "*", 40, 140, "*", 40],
        autoDraw: false,
        itemChanged: function(item, newValue) {
        	console.log("sfMSMCInfoDeck formitem's values changed");
        	setInsuffMsmcHighlight();
        },
        fields: [
            //--------------for reading data from DB--------------
            {name: "dClass1", 	title:"Deck Class 1:  II/2", wrapTitle:false,startRow: true, textAlign:"center", colSpan: 1, width: 120},
            {name: "deckClass1Label",     title:"", defaultValue:"0", showTitle:false, disabled: true, startRow: false, textAlign:"center", colSpan: 1, width: 32},
            {name: "dAbleseafarer", 	title:"Able Seafarer:", 					 startRow: false, textAlign:"center", colSpan: 1, width: 120},
            {name: "deckAbleSeafarerLabel",     title:"", defaultValue:"0", showTitle:false, disabled: true, startRow: false, textAlign:"center", colSpan: 1, width: 32},

            {name: "dClass2", 	title:"Deck Class 2:  II/2", wrapTitle:false,startRow: true, textAlign:"center", colSpan: 1, width: 120},
            {name: "deckClass2Label",     title:"", defaultValue:"0", showTitle:false, disabled: true, startRow: false, textAlign:"center", colSpan: 1, width: 32},
            {name: "dWatchrating", 	title:"Watch Ratings:",					  	 startRow: false, textAlign:"center", colSpan: 1, width: 120},
            {name: "deckWatchRatingsLabel",     title:"", defaultValue:"0", showTitle:false, disabled: true, startRow: false, textAlign:"center", colSpan: 1, width: 32},

            {name: "dClass3", 	title:"Deck Class 3:  II/1",wrapTitle:false, startRow: true, textAlign:"center", colSpan: 1, width: 120},
            {name: "deckClass3Label",     title:"", defaultValue:"0", showTitle:false, disabled: true, startRow: false, textAlign:"center", colSpan: 1, width: 32},
            {name: "dOtheratings", 	title:"Other Ratings:",						 startRow: false, textAlign:"center", colSpan: 1, width: 120},
            {name: "deckOtherRatingsLabel",     title:"", defaultValue:"0", showTitle:false, disabled: true, startRow: false, textAlign:"center", colSpan: 1, width: 32}
        ]
    });


    isc.ControlledDynamicForm.create({
        ID:"sfMSMCInfoEngineer",
        //dataSource: "hkCertDS",
        dataSource: "certJobMsmcDS",
/* 00001 - Start Add */
	valuesManager:valueMan,
/* 00001 - End Add */
		onControl: "MSMC_WRITE",
        isGroup: "true",
        groupTitle: "Engineer Dept.",
        numCols: 8,
        width:MSMCInfoRhsRowWidth,
        colWidths: [140, "*", 40, 140, "*", 40],
        autoDraw: false,
        itemChanged: function(item, newValue) {
        	console.log("sfMSMCInfoEngineer formitem's values changed");
        	setInsuffMsmcHighlight();
        },
        fields: [
            {name: "eClass1", 	title:"Engineer Class1:  III/2", wrapTitle:false,startRow: true, textAlign:"center", colSpan: 1, width: 120},
            {name: "engineerClass1Label",     title:"", defaultValue:"0", showTitle:false, disabled: true, showEdges: false, startRow: false, textAlign:"center", colSpan: 1, width: 32},
            {name: "eAbleseafarer", 	title:"Able Seafarer:", 					 startRow: false, textAlign:"center", colSpan: 1, width: 120},
            {name: "engineerAbleSeafarerLabel",     title:"", defaultValue:"0", showTitle:false, disabled: true, startRow: false, textAlign:"center", colSpan: 1, width: 32},

            {name: "eClass2", 	title:"Engineer Class2:  III/2", wrapTitle:false,startRow: true, textAlign:"center", colSpan: 1, width: 120},
            {name: "engineerClass2Label",     title:"", defaultValue:"0", showTitle:false, disabled: true, startRow: false, textAlign:"center", colSpan: 1, width: 32},
            {name: "eWatchrating", 	title:"Watch Ratings:",					  	 startRow: false, textAlign:"center", colSpan: 1, width: 120},
            {name: "engineerWatchRatingsLabel",     title:"", defaultValue:"0", showTitle:false, disabled: true, startRow: false, textAlign:"center", colSpan: 1, width: 32},

            {name: "eClass3", 	title:"Engineer Class3:  III/1",wrapTitle:false, startRow: true, textAlign:"center", colSpan: 1, width: 120},
            {name: "engineerClass3Label",     title:"", defaultValue:"0", showTitle:false, disabled: true, startRow: false, textAlign:"center", colSpan: 1, width: 32},
            {name: "eOtheratings", 	title:"Other Ratings:",						 startRow: false, textAlign:"center", colSpan: 1, width: 120},
            {name: "engineerOtherRatingsLabel",     title:"", defaultValue:"0", showTitle:false, disabled: true, startRow: false, textAlign:"center", colSpan: 1, width: 32},


            {name: "eTechofficer", 	title:"E-tech Officer:  III/6",wrapTitle:false, startRow: true, textAlign:"center", colSpan: 1, width: 120},
            {name: "engineerEtechOfficerLabel",     title:"", defaultValue:"0", showTitle:false, disabled: true, startRow: false, textAlign:"center", colSpan: 1, width: 32},
            {name: "eTechratings", 	title:"E-tech Ratings:",						 startRow: false, textAlign:"center", colSpan: 1, width: 120},
            {name: "engineerEtechRatingsLabel",     title:"", defaultValue:"0", showTitle:false, disabled: true, startRow: false, textAlign:"center", colSpan: 1, width: 32}
        ]
    });


    isc.ControlledDynamicForm.create({
        ID:"sfMSMCInfoSteward",
        //dataSource: "hkCertDS",
        dataSource: "certJobMsmcDS",
/* 00001 - Start Add */
	valuesManager:valueMan,
/* 00001 - End Add */
		onControl: "MSMC_WRITE",
        isGroup: "true",
        groupTitle: "Steward Dept.",
        numCols: 8,
        width:MSMCInfoRhsRowWidth,
        colWidths: [150, "*"],
        autoDraw: false,
        fields: [
            //{name: "mSMCInfoStewardTxt",  title:"Cook:", value:"YES", wrapTitle:false, startRow: true, textAlign:"center", colSpan: 1, width: 120}
            {name: "sCook",  title:"Cook:", type:"select",
            valueMap:["YES", "NO"],
            wrapTitle:false, startRow: true, textAlign:"center", colSpan: 1, width: 120
            ,changed:function(){
                //console
                setCookSpecReq();
            }
            }

        ]
    });


    //---------checkbox-------------------------------
    isc.ControlledDynamicForm.create({
        ID:"sfMSMCCB3dy",
        //dataSource: "hkCertDS",
        dataSource: "certJobMsmcDS",
/* 00001 - Start Add */
	valuesManager:valueMan,
/* 00001 - End Add */
		onControl: "MSMC_WRITE",
        autoDraw: false,
        fields: [
            //{name: "sfMSMCCB3dyChk", 	type: "checkbox", title:"Within 3 days:", wrapTitle:false, startRow: true, colSpan: 1, width: 120}
            {name: "within3days", 	type: "checkbox", title:"Within 3 days:", wrapTitle:false, startRow: true, colSpan: 1, width: 120
               	,valueMap: {
                    "1": true,
                    "0": false
                }
	            , transformInput: function(form, item, value, oldValue)
	            {
	            	if(!oldValue || oldValue == "0")
	        		{
	            		return "1";
	        		}
	            	else
	        		{
	            		return "0";
	        		}
	            	 
	            }

            }

        ]
    });


    isc.ControlledDynamicForm.create({
        ID:"sfMSMCCBReqTitle",
        //dataSource: "hkCertDS",
        dataSource: "certJobMsmcDS",
/* 00001 - Start Add */
	valuesManager:valueMan,
/* 00001 - End Add */
		onControl: "MSMC_WRITE",
        autoDraw: false,
        fields: [
            //{name: "sfMSMCCBReqTitleChk", 	type: "checkbox", title:"Requirements Title:", wrapTitle:false, startRow: true, colSpan: 1, width: 120}
            {name: "isRequirements", 	type: "checkbox", title:"Requirements Title:", wrapTitle:false, startRow: true, colSpan: 1, width: 120
               	,valueMap: {
                    "1": true,
                    "0": false
                }
	            , transformInput: function(form, item, value, oldValue)
	            {
	            	if(!oldValue || oldValue == "0")
	        		{
	            		return "1";
	        		}
	            	else
	        		{
	            		return "0";
	        		}
	            	 
	            }
            }

        ]
    });



    isc.HLayout.create({
        ID:"sfRecHLayoutMSMCChkBox", 
        membersMargin:5, members:[sfMSMCCB3dy,sfMSMCCBReqTitle]
    });



    isc.VLayout.create({
        ID:"sfMSMCInfoRhsVLayout", width:(MSMCInfoRhsRowWidth+20),
        showEdges:false,
        membersMargin:5, members:[sfMSMCMod,sfMSMCInfoDeck,sfMSMCUms,sfMSMCInfoEngineer,sfMSMCInfoSteward,sfRecHLayoutMSMCChkBox]
    });

    //----------------------------------------------------------------------------------------------------------------------------------

    isc.HLayout.create({
        ID:"sfRecHLayoutMSMCInfoUpper", height: 360, membersMargin:5, members:[sfMSMCInfoLhs,sfMSMCInfoRhsVLayout]
    });

    isc.VLayout.create({
        ID:"sfRecVLayoutMSMCInfoLower", membersMargin:5, members:[

            isc.Label.create({
                ID:"issueDateOmit",
                width:150,
                height: 5,
                //styleName: "helloWorldText",
                padding: 0,
                //backgroundColor: "#ffffd0",
                align: "left",
                valign: "center",
                wrap: false,
                showEdges: false,
                showShadow: false,
                //icon: "icons/16/world.png",
                contents: "The issue date on the certificate is omitted as it will be type by:"
            }),
            isc.ControlledDynamicForm.create({
                ID:"issueDateOmitReason",
                //dataSource: "hkCertDS",
                dataSource: "certJobMsmcDS",
                onControl: "MSMC_WRITE",
/* 00001 - Start Add */
			valuesManager:valueMan,
/* 00001 - End Add */
                width:550,
                fields: [
                    //{name: "issueDateOmitReasonPullDownMenu", type: "SelectItem", title:"", wrapTitle:false, showTitle:false, startRow: true, colSpan: 1, width: 550,
                    {name: "issueOmittedBy",
                        //type: "SelectItem",
                        type:"ComboBoxItem",
                        title:"", wrapTitle:false, showTitle:false, startRow: true, colSpan: 1, width: 550

                        ,valueMap:[ issueDateOmitReason1, issueDateOmitReason2, issueDateOmitReason3 ]
                        
                    }

                ]
            })
        ]
    });

    /*
    isc.DynamicForm.create({
        ID:"sfMSMCInfoGroup",
        dataSource: "hkCertDS",
        isGroup: "true",
        groupTitle: "MSMC Information",
        numCols: 8,
        width:700,
        height:550,
        padding:50,
        fields: [


        ]
    });
    */

    /*
    isc.Label.create({
        ID:"MSMCLabel",
        width:100,
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
        contents: "MSMC Information"
    });
    */

    isc.VLayout.create({
        ID:"sfRecVLayoutMSMCAll",
        //width:680, height:350,
        //height:"70%",
        //layoutTopMargin: 15,
        layoutTopMargin: 7,
        padding:10,
        /*top:20,*/
        isGroup: true, groupTitle: "MSMC Information",
        showEdges: false,
        membersMargin:5, members:[sfRecHLayoutMSMCInfoUpper,sfRecVLayoutMSMCInfoLower]
    });


    /*
    sfMSMCInfo.setFields(sfRecVLayoutMSMCAll);
    sfMSMCInfo.redraw();
    */



    //------------------------------------------------------------------------------------------------------------------------------------------------

    isc.ControlledDynamicForm.create({
        ID: "collectPopupDF",
        dataSource: certJobMsmcDS,
//        valuesManager:valueMan,		// Don't want to change the VM if user cancel
		onControl: "MSMC_CHANGE_ISSUE_DATE",
		items:[
			{name: "issueOn"}
		]
    });
    isc.ButtonToolbar.create({
        ID:"collectPopupToolBar",
        layoutAlign: "right",
//        width: "*",
        overflow : Canvas.VISIBLE,
        //height:30,
          //layoutBottomMargin: 5,
        buttons: [
        	{name:"saveBtn", title:"Save", autoFit: true, onControl:"MSMC_CHANGE_ISSUE_DATE",
                click : function () {
                    //isc.say(saveSuccessfulMessage);
                    //saveMsmcRec(0);
                	if(collectPopupDF.validate())
            		{
                		certJobMsmcVM.setValue("issueOn", collectPopupDF.getItem("issueOn").getValue() );
                        saveMsmcRecord(0);
                    	collectPopupWindow.close();
            		}
                	
                    
                }
            },
        	{name:"cancelBtn", title:"Cancel"
        		, autoFit: true
                , click : function () {
                	collectPopupWindow.close();
//                	collectPopupWindow.markForDestroy();
                    }
            }
        ]
    });
    isc.VLayout.create({
        ID: "collectPopupVL",
        defaultLayoutAlign: "centre",
        //width: "100%",
        members: [
    		collectPopupDF,
        ]
    });





    isc.Window.create({
        ID:"collectPopupWindow", isModal: true, showModalMask: true
//        , width: "50%"
    //	, height: "90%"
//        , height: "40%"
        , autoSize: true
        , title:"MSMC Collected",
        //layoutMargin:10,
        overflow : "auto",
        items: [
        	collectPopupVL,
    		collectPopupToolBar,
        ]

    });




    //------------------------------------------------------------------------------------------------------------------------------------------------





    //neo
    isc.ButtonToolbar.create({
        ID:"msmcToolBar",
        //height:30,
          //layoutBottomMargin: 5,
        buttons: [
    /*
                  {name:"addSeafarerBtn", title:"Add Seafarer", autoFit: true, onControl:"MMO_CREATE|MMO_UPDATE",
                    click : function () {
                        var vesselIdValue = crewListDetailForm.getValue('vesselId');
                        var coverYymmValue = crewListDetailForm.getValue('coverYymm');
                        crewListCoverAddSeafarerDynamicForm.setValue("vesselId", vesselIdValue);
                        crewListCoverAddSeafarerDynamicForm.setValue("coverYymm", coverYymmValue);
                        crewListCoverAddCrewWindow.show();
                    }
                },
    */
            /*
            {name:"addCclCertBtn", title:"Add CCL Cert" ,autoFit: true,
            },
            */
            {name:"changeIssueDateBtn", ID:"changeIssueDateBtn", title:"Change Issue Date", autoFit: true, onControl:"MSMC_CHANGE_ISSUE_DATE", 
                click : function () {
                	var tmp_issueOn = certJobMsmcVM.getValue("issueOn");
                	if(!tmp_issueOn)
            		{
                		tmp_issueOn = new Date();
            		}
                	collectPopupDF.getItem("issueOn").setValue(tmp_issueOn);
                	collectPopupWindow.show();
                }
            },
            {name:"cancelJobBtn", title:"Cancel Job", autoFit: true, onControl:"MSMC_WRITE",
                click : function () {
                    if (certJobMsmcVM.validate()) {
                        if (confirm(promptCancelJob)){
                           cancelMsmcJobWindow();
                        }
                    }
                }
            },
            {name:"processCloseBtn", title:"Process Close", autoFit: true, onControl:"MSMC_WRITE",
                click : function () {
                    if(certJobMsmcVM.validate()) {
                    	var btnTitle = this.getTitle().trim();
                    	if (isNull(btnTitle)) {
                    		console.log("processCloseBtn's title is empty");
                    		return;
                    	}
                    	if (btnTitle == processCloseTitle) {
                    		if (confirm(promptCloseJob)) {
    							var today = new Date();
    							//var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    							//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    							//var dateTime = date+' '+time;

    							certJobMsmcVM.setValue("status", "Complete");
    							certJobMsmcVM.setValue("completeDate", today);
    							certJobMsmcVM.setValue("msmcCompleteDate", today);

    							saveMsmcRecord(0, function(){
    								isc.say(closeSuccessfulMessage);
        							MsmcDetailWindow.hide();
    								
    							});
//    							certJobMsmcVM.saveData(function (dsResponse, data, dsRequest){
//    								  if(dsResponse.status==0){
//    									  isc.say(closeSuccessfulMessage);
//    									  enabledSection(true);
//    								  }
//    								}
//    							);
//    							MsmcDetailWindow.hide();
    						}
                    	}else if(btnTitle == reStartTitle) {
                    		if (confirm(promptRestartJob)) {
                    			certJobMsmcVM.setValue("status", "Process");

    							saveMsmcRecord(0, function(){
    								
    							});
    							
//                    			msmcToolBar.getButton("processCloseBtn").setTitle(processCloseTitle);
//                    			disableCertJobShipDFControls(msmcShipInfo, false);
//                    			disableMsmcWindowControls();
//                    			certJobMsmcVM.saveData(function (dsResponse, data, dsRequest){
//	  								  if(dsResponse.status==0){
//	  									  //isc.say(closeSuccessfulMessage);
//	  									  enabledSection(true);
//	  								  }
//	  								}
//	  							);
                    		}
                    	}
						
						
						
						
						
						
					}
                }
            },
            
            /*
            {name:"copySisterShipBtn", title:"Copy Sister Ship", autoFit: true, onControl:"MSMC_WRITE",
            	click : function () {
            		console.log("Copy Sister Ship");
            	}
            },
            */
            
            {name:"saveBtn", title:"Save", autoFit: true, onControl:"MSMC_WRITE",
                click : function () {
                    //isc.say(saveSuccessfulMessage);
                    //saveMsmcRec(0);
                    saveMsmcRecord(0);
                    
                }
            },
            {name:"cancelBtn", title:"Exit", autoFit: true,
                click : function () {
                    /*
                    crewListDetailForm.clearErrors(true);
                    crewListDetailForm.setValues({});
                    crewListDetailCrewList.setData([]);
                    */
                    MsmcDetailWindow.close();
                    MsmcDetailWindow.markForDestroy();
                    }
            }
           ]
    });

    isc.DynamicForm.create({
        ID:"msmcToolBarDynamicForm",
        //dataSource: "hkCertDS",
        align:"right",
        fields: [
            msmcToolBar

        ]
    });








    isc.VLayout.create({
        //ID:"sfMSMCRhsPanel", showEdges: true, membersMargin:5, members:[msmcHeader,msmcShipInfo,sfSisterShip,MSMCLabel,sfRecHLayoutMSMCInfoUpper,sfRecVLayoutMSMCInfoLower]
        ID:"sfMSMCRhsPanel"
    //	, showEdges: true
        , width:"*",
        overflow:"auto",
        //defaultLayoutAlign: "right",
        membersMargin: 3, members:[
                                  msmcHeader
                                  ,msmcShipInfo
                                  //,sfSisterShip
                                  ,sfRecVLayoutMSMCAll
                                  ]
    });


    //============================================================================================================================================================================================================



    /*
    isc.VLayout.create({
        ID:"spacer", showEdges: true,
        width:"60%",
        //defaultLayoutAlign: "right",
        membersMargin:5, members:[
                                  //msmcHeader,sfSisterShip
                                  ]
    });
    */


    //==============================================**************************

    //==============================================**************************


    isc.ListGrid.create({
        ID:"sfMSMCLhsPanel",
    //    width: "160",
        width: "15%",
        //height: "670",
    //height: "665",
   	showEdges: true,
    autoFetchData: false,
    filterLocalData: true,
    //dataSource: hkCertDS,
    dataSource: formlistDS,
	initialSort: [
        {property: "formlist_jobno", direction: "ascending"},
        {property: "formlist_form", direction: "descending"},
        {property: "formlist_ver", direction: "ascending"}
    ],
	fields:[
        /*
		{name: "sfMSMCLhsPanelForm", title: "Form", width:90},
		{name: "sfMSMCLhsPanelVer", title: "Ver", width:50}
        */
        {name: "formlist_form", title: "Form"
//        	, width:90
        },

		{name: "formlist_ver", title: "Ver"
//			, width:50
		}

	]
    /*
    ,data:[
        {form:"MSMC", ver:"1.0"},
        {form:"Declaration(Re)", ver:"1.0"}

    ]
    */
        ,rowDoubleClick:function(record, recordNum, fieldNum){
            //openMsmcCertRecDetail(record);
            //isc.say("Form: " + record.form + "<br>Ver: " + record.ver);

            console.log("formlist_rowDoubleClick()");

            var certName = "";
            var certPara = getCertPara();

            if (record.formlist_form == "MSMC"){
                certPara = getMsmcCertPara(certPara);
                certName = "RPT_Msmc_Min_Safe_Manning_Cert";
            }else if (record.formlist_form.includes("Declaration")){
                //certPara = getDeclarCertPara(certPara);
                certName = "RPT_Declaration_Reissuance_Cert";
            }



            var aboutToSetAsPrinted = showPrintOptionWindow(certName, certJobMsmcVM.values, certPara, setAsPrinted);
//            var aboutToSetAsPrinted = showPrintOptionWindow(certName, record, certPara, setAsPrinted);




                console.log("aboutToSetAsPrinted: " + aboutToSetAsPrinted);
            if (aboutToSetAsPrinted == 1){
                console.log("print to printer btn is pressed__@@@");
            }



            //MSMCCertPrintOptionWindow.selectedRec = record;
            //MSMCCertPrintOptionWindow.show();

        }
    });




    isc.HLayout.create({
        ID:"msmcRecFormDetailUpper",
        //width: "20%",
        membersMargin:5, members:[
                                  sfMSMCLhsPanel, sfMSMCRhsPanel
                                  ]
    });



    isc.VLayout.create({
        ID:"msmcRecFormDetail",
        //width: "80%",
        //width: 200,
    //	showEdges: true,
        overflow: true,
        membersMargin:5, members:[msmcRecFormDetailUpper]
    });




    /*
    isc.DynamicForm.create({
        ID:"msmcRecFormDetail",
        dataSource: "hkCertDS",
    //	cellBorder:1,
        numCols: 8,
        colWidths: ["1", "1", "1", "1", "1", "1", "1", "1"],
        fields: [
            sfRecVLayout
            ]
    });
    */





    isc.ControlledDynamicForm.create({
        ID:"msmcRemarkTab",
        dataSource: "certJobMsmcDS",
        valuesManager:valueMan,
        onControl: "MSMC_WRITE",
        //width:"100%",
        //autoFocus: true,
        autoDraw:false,
        //numCols: 3,
        itemLayout: "absolute",
        items:[
            {
                type: "textArea",
                name: "remark",
                title: "",
                width:"100%",
                //selectOnFocus: true,
                wrapTitle: false,
                showTitle:false
                //,backgroundColor:"#ffffff"
                //,defaultValue: ""
            }
        ]
    });





    isc.ControlledDynamicForm.create({
        ID:"msmcSisterShipDeclarTab",
        onControl: "MSMC_WRITE",
        dataSource: "certJobMsmcDS",
        valuesManager:valueMan,
        //width:"100%",
        //autoFocus: true,
        autoDraw:false,
        //numCols: 3,
        itemLayout: "absolute",
        items:[
            {
                type: "textArea",
                //name: "sfSisterShipDeclarTextArea",
                name: "sdc",
                title: "",
                width:"100%",
                //selectOnFocus: true,
                wrapTitle: false,
                showTitle:false,
                //backgroundColor:"#ffffff",
                //defaultValue: "This ship is a sister ship of  \" ANTWERP\"."
                //defaultValue: ""
            }
        ]
    });

    //---------------------------------------------------------------------------------------------------------------------------------------
    //----------------------Re-issuance Declaration Condition----------------------



    isc.Label.create({
        ID:"reIssuanceLabel",
    //	width:100,
        height: "20%",
        //styleName: "helloWorldText",
        padding: 10,
        //backgroundColor: "#ffffd0",
        align: "left",
        valign: "center",
        startRow: true,
        wrap: false,
        showEdges: false,
        showShadow: false,
        //icon: "icons/16/world.png",
        contents: "Re-issuance of the MSM Certificate due to:"
    });

    isc.ControlledDynamicForm.create({
        ID:"msmcReIssuanceDeclarSpName",
        dataSource: "certJobMsmcDS",
        valuesManager:valueMan,
        onControl: "MSMC_WRITE",
        autoDraw: false,
    //    width: 100,
            items: [
                {
                    //name: "sfReIssuanceDeclarSpNameChk",
                    name: "delDueto1",
                    editorType: "CheckboxItem",
                    title: "*Change of ship name",
                    valueMap: {
//                        "verified": "1",
//                        "unverified": "0"
                    	"1": true,
                        "0": false
                    },
	                transformInput: function(form, item, value, oldValue)
	                {
	                	if(!oldValue || oldValue == "0")
	            		{
	                		return "1";
	            		}
	                	else
	            		{
	                		return "0";
	            		}
	                	 
	                },

                }
            ]
    });

    isc.ControlledDynamicForm.create({
        ID:"msmcReIssuanceDeclarManaCom",
        dataSource: "certJobMsmcDS",
        valuesManager:valueMan,
        onControl: "MSMC_WRITE",
        autoDraw: false,
    //    width: 100,
        //itemLayout: "absolute",
        items: [{
            //name: "sfReIssuanceDeclarManaComChk",
            name: "delDueto2",
            editorType: "CheckboxItem",
            title: "*Change of management company",
            //width: "70%",
            valueMap: {
//                    "verified": "1",
//                    "unverified": "0"
	            	"1": true,
	                "0": false
            },
            transformInput: function(form, item, value, oldValue)
            {
            	if(!oldValue || oldValue == "0")
        		{
            		return "1";
        		}
            	else
        		{
            		return "0";
        		}
            	 
            },

            },
        ]
    });

    /*
    isc.DynamicForm.create({
        ID:"msmcReIssuanceDeclarOtherCustom",
        autoDraw: false,
        width: 300,
        //left:10,
        items: [

            {
            name: "msmcReIssuanceDeclarManaComChk1",
            editorType: "CheckboxItem",
            title: "*Change of management company",
            valueMap: {
                    "verified": true,
                    "unverified": false
                }
            }


            {
            name: "msmcReIssuanceDeclarOtherChk",
            //width: 10,
            //padding: 10,
            editorType: "CheckboxItem",
            title: "1231",
            //align:"left",
            //showTitle:false,
            valueMap: {
                "verified": true,
                "unverified": false
                }
            }


            ,{
                name: "msmcReIssuanceDeclarOtherTxt",
                width: 250,
                Type: "text",
                title: "12312312",
                showTitle:false
            }

        ]
    });
    */

    //-----------------------------------------------------

    isc.ControlledDynamicForm.create({
        ID:"msmcReIssuanceDeclarOtherChk",
        dataSource: "certJobMsmcDS",
        valuesManager:valueMan,
        onControl: "MSMC_WRITE",
        autoDraw: false,
        width: 125,
        //align:"right",
        items: [{
            //name: "sfReIssuanceDeclarOtherChkItem1",
            name: "delDueto3",
            width: 10,
            align:"right",
            editorType: "CheckboxItem",
            title: "",
            valueMap: {
                /*
                "verified": "1",
                "unverified": "0"
                */
                "1": true,
                "0": false
            },
            transformInput: function(form, item, value, oldValue)
            {
            	if(!oldValue || oldValue == "0")
        		{
            		return "1";
        		}
            	else
        		{
            		return "0";
        		}
            	 
            },
        }]
    });
    isc.ControlledDynamicForm.create({
        ID: "msmcReIssuanceDeclarOtherTxt",
        dataSource: "certJobMsmcDS",
        valuesManager:valueMan,
        onControl: "MSMC_WRITE",
        //autoFocus: true,
        //width:"40%",
        width:"*",
        //numCols: 3,
        //itemLayout: "absolute",
        items:[
            {
                type: "text",
                //name: "sfReIssuanceDeclarOtherTxtItem1",
                name: "reDuetoOther",
                title: "",
                width:450,
                selectOnFocus: true,
                wrapTitle: false,
                showTitle:false
                //,defaultValue: ""
            }
        ]
    });

    isc.HLayout.create({
        ID:"msmcReIssuanceDeclarOtherCustom"
            , width:"100%"
    //		, height:20
    //        ,itemLayout: "absolute"
            , membersMargin:5, members:[
        msmcReIssuanceDeclarOtherChk,msmcReIssuanceDeclarOtherTxt]
    });


    /*
    isc.DynamicForm.create({
        ID:"sfReIssuanceDeclarTextArea",
        width:1050,
        //autoFocus: true,
        //numCols: 3,
        items:[

            {
                type: "textArea",
                name: "you",
                title: "",
                width:1000,
                selectOnFocus: true,
                startRow: true,
                wrapTitle: false,
                showTitle:false,
                //backgroundColor:"#ffffff",
                defaultValue: "Help"
            }
        ]
    });
    */

    isc.VLayout.create({
        ID:"msmcReIssuanceDeclarAllCustom"
        , width:"100%"
//		, height:150
        , showEdges:showEdgesOfLayoutInTabs, membersMargin:0, members:[
        reIssuanceLabel,msmcReIssuanceDeclarSpName
        ,msmcReIssuanceDeclarManaCom,msmcReIssuanceDeclarOtherCustom
        ]
    });

    //---------------------------------------------------------------------------------------------------------------------------------------

    //---------------------------------------------------------------------------------------------------------------------------------------
    //----------------------UMS Spec. Requirement----------------------

    isc.ControlledDynamicForm.create({
        ID:"sfUMStextAreaEn",
        dataSource: "certJobMsmcDS",
        valuesManager:valueMan,
        onControl: "MSMC_WRITE",
        width:"100%",
        titleWidth: 50,
        //autoFocus: true,
        //numCols: 3,
        items:[
               {
                   type: "textArea",
                   name: "usr",
                   title: "EN:",
                   width:"100%",
                   height: msmcTabTextAreaHeight,
                   selectOnFocus: true,
                   wrapTitle: false,
                   showTitle:true,
                   //backgroundColor:"#ffffff",
                   //defaultValue: ""
               },
        ]
    });
    isc.ControlledDynamicForm.create({
        ID:"sfUMStextAreaTc",
        dataSource: "certJobMsmcDS",
        valuesManager:valueMan,
        onControl: "MSMC_WRITE",
        width:"100%",
        titleWidth: 50,
        //autoFocus: true,
        //numCols: 3,
        items:[
               {
                   type: "textArea",
                   name: "usrzh",
                   title: "CN:",
                   width:"100%",
                   height: msmcTabTextAreaHeight,
                   selectOnFocus: true,
                   wrapTitle: false,
                   showTitle:true,
                   //backgroundColor:"#ffffff",
                   //defaultValue: ""
               },
        ]
    });

    isc.ControlledDynamicForm.create({
        ID:"sfUMSSpecEn",
        //dataSource: certJobMsmcDS,
        //valuesManager:valueMan,
        onControl: "MSMC_WRITE",
        width:"100%",
        colWidths:[135,"*"],
        autoSize:true,
        autoFetchData: false,
        autoSaveEdits: false,
        autoCenter: true,
        canEdit: true,
        editOnFocus: true,
        canSelectCells: false,
        dataPageSize: 20,
        layoutAlign:"center",
        canRemoveRecords:false,
        //saveLocally: false,
        saveByCell: false,
        //border:"1px solid grey", padding:5,
        fields: [
                 {name:"ums_spec_req_en", title:"UMS Spec. Require.:" , 
                  //width:"1100",
            	  width:"100%",
               	  type:"SelectItem", startRow:true, multiple:false
               	  , displayField:"ums_spec_req_en"
               	  , valueField:"ums_spec_req_en",
               	  optionDataSource:"msmcUmsRemarksDS",
               	  wrap:true,
               	  multipleAppearance:"picklist",
               	  pickListWidth:"1100",

               	  pickListFields:[
                                   {name:'eng_class3', title:"Eng Class3", width:100}
                                   ,{name:'able_plus_watch', title:"Watch", width:70}
                                   ,{name:'ums_spec_req_en', title:"UMS Spec Requirement(EN)", width:"*"}
                                   ,{name:'ums_spec_req_tc', title:"UMS Spec Requirement(TC)", width:"*"}
                                  ],
                 },
              ]
    });

    isc.IButton.create({
  	  ID: "sfUMSSpecEnBtn",
  	  autoDraw: false,
  	  top: 1,
  	  width:60,
  	  layoutAlign:"center",
  	  title: "Show",
  	  click : function () {
			//console.log("sfUMSSpecEn changed to:" + sfUMSSpecEn.getValue('ums_spec_req_en'));
         	//sfUMSSpecEnGrid.deselectAllRecords();
         	//sfUMSSpecEnGrid.selectRecord(item.getSelectedRecord());
         	sfUMStextAreaEn.setValue('usr',sfUMSSpecEn.getValue('ums_spec_req_en'));
         	sfUMStextAreaTc.setValue('usrzh',sfUMSSpecEn.getItem("ums_spec_req_en").getSelectedRecord()["ums_spec_req_tc"]);
			//sfUMSSpecEn.getItem("ums_spec_req_en").getSelectedRecord()["ums_spec_req_tc"]
  	  }
  });
    
    isc.IButton.create({
    	  ID: "sfUMSSpecEnClearBtn",
    	  autoDraw: false,
    	  top: 1,
    	  width:60,
    	  layoutAlign:"center",
    	  title: "Clear",
    	  click : function () {
           	sfUMStextAreaEn.setValue('usr',"");
           	sfUMStextAreaTc.setValue('usrzh',"");
    	  }
    });
    

/* 00001 - Start Add */
//    isc.DynamicForm.create({
////        dataSource: msmcUmsRemarksDS,
////    dataSource: certJobMsmcDS,
////	valuesManager:valueMan,
//        width:"100%",
//        autoSize:true,
//        autoFetchData: false,
//        autoSaveEdits: false,
//        autoCenter: true,
//        canEdit: true,
//        editOnFocus: true,
//        canSelectCells: false,
//        dataPageSize: 20,
//        layoutAlign:"center",
//        canRemoveRecords:false,
//        //saveLocally: false,
//        saveByCell: false,
//        border:"1px solid grey", padding:5,
//        numCols: 4,
//
//                  fields: [
//                              {name:"ums_spec_req_en", title:"Choose!!!:" , width:800,
//                                  type:"selectItem", startRow:true, multiple:false
////                                  , displayField:"ums_spec_req_en"
//                                  , valueField:"ums_spec_req_en",
//			            	  	optionDataSource:"msmcUmsRemarksDS",
//                                  wrap:true,
//                                  multipleAppearance:"picklist",  pickListWidth:900,
//                                  pickListFields:[
//                                                  {name:'eng_class3', title:"Eng Class3"}
//                                                  ,{name:'able_plus_watch', title:"Watch"}
//                                                  ,{name:'ums_spec_req_tc', title:"UMS Spec Requirement(TC)", width:"*"}
//                                                  ,{name:'ums_spec_req_en', title:"UMS Spec Requirement(EN)", width:"*"}
//                                                 ]
//                              },
//                          ]
//
//    });
/* 00001 - End Add */



/* 00001 - Start Comment: Obsolete Code */
//    isc.ListGrid.create({
//        ID: "sfUMSSpecEnGrid",
//        dataSource: msmcUmsRemarksDS,
//        overflow:"auto",
//        autoFetchData: true,
//        autoSaveEdits: false,
//        //autoFitFieldWidths:true,
//        canEdit: false,
//        editOnFocus: true,
//        canSelectCells: true,
//        dataPageSize: 20,
//        //canRemoveRecords:true,
//        saveLocally: true,
//        saveByCell: false,
//        //editEvent: "doubleClick",
//        editEvent: "click",
//        //showFilterEditor:true,
//        width:1400,
//        height:100,
//        alternateRecordStyles:true,
//
//        fields:[
//            {name:"eng_class3", title:"Engineer Class 3", width:130},
//            {name:"ums_spec_req_en", title:"UMS Spec. Requirement", width:600},
//            {name:"ums_spec_req_tc", title:"UMS Spec. Requirement(CN)", width:600},
//        ],
//        recordClick: "sfUMSSpecEnDetail.setData(record)",
//        //recordDoubleClick: "isc.say('Double-clicked country: <b>'+record.countryName+'</b>')",
//        //rowContextClick: "isc.say('Context-clicked country: <b>'+record.countryName+'</b>'); return false;"
//    });
//
//
//    isc.DetailViewer.create({
//        ID:"sfUMSSpecEnDetail",
//        width:1400,
//        fields:[
//            {name:"eng_class3", title:"Engineer Class 3"},
//            {name:"ums_spec_req_en", title:"UMS Spec. Requirement"},
//            {name:"ums_spec_req_tc", title:"UMS Spec. Requirement(CN)"},
//        ],
//        //emptyMessage:"click a row in the grid"
//    });
/* 00001 - End Comment: Obsolete Code */

    /*
    isc.DynamicForm.create({
        ID:"sfUMSSpecCn",
        dataSource: docAuditDS,
        width:"100%",
        height:30,
        titleWidth: 50,
        //autoFocus: true,
        //numCols: 3,
        items:[
            {
                type: "textArea",
                //name: "sfUMSSpecCnTextArea",
                name: "ums_spec_req_tc",
                title: "CN:",
                width:"100%",
                height: msmcTabTextAreaHeight,
                selectOnFocus: true,
                wrapTitle: false,
                showTitle:true,
                //backgroundColor:"#ffffff",
                //defaultValue: ""
            }
        ]
    });
    */


    /*
    isc.Label.create({
        ID:"sfUMSSpecEnTextAreaLabel",
        width:100,
        height: 5,
        //styleName: "helloWorldText",
        padding: 0,
        //backgroundColor: "#ffffd0",
        align: "left",
        valign: "center",
        wrap: false,
        showEdges: false,
        showShadow: false,
        //icon: "icons/16/world.png",
        contents: "EN123123"
    });

    isc.Label.create({
        ID:"sfUMSSpecCnTextAreaLabel",
        width:100,
        height: 5,
        //styleName: "helloWorldText",
        padding: 0,
        //backgroundColor: "#ffffd0",
        align: "left",
        valign: "center",
        wrap: false,
        showEdges: false,
        showShadow: false,
        //icon: "icons/16/world.png",
        contents: "CN123123"
    });
    */

    /*
    isc.DynamicForm.create({
        ID:"sfUMSSpecVLayout",
        //autoFocus: true,
        numCols: 2,
        members:[
            //sfUMSSpecEnTextAreaLabel,sfUMSSpecEn,
            //sfUMSSpecCnTextAreaLabel,sfUMSSpecCn
            sfUMSSpecEn,sfUMSSpecCn
        ]


    });
    */



    isc.HLayout.create({
        ID:"sfUMSSpecHLayout"
            , width:"100%"
    //		, height:200
            , border:"1px solid grey", padding:10
            ,layoutAlign:"left"
            //, showEdges:showEdgesOfLayoutInTabs, membersMargin:5, members:[sfUMSSpecEn, sfUMSSpecEnGrid, sfUMSSpecEnDetail]
            , showEdges:showEdgesOfLayoutInTabs, members:[sfUMSSpecEn, sfUMSSpecEnBtn,sfUMSClearBtn]
        //,redrawOnResize:true
    });
    isc.VLayout.create({
        ID:"sfUMSSpecVLayout"
            , width:"100%"
    //		, height:200
            //, showEdges:showEdgesOfLayoutInTabs, membersMargin:5, members:[sfUMSSpecEn, sfUMSSpecEnGrid, sfUMSSpecEnDetail]
            , showEdges:showEdgesOfLayoutInTabs, members:[sfUMStextAreaEn, sfUMStextAreaTc, sfUMSSpecHLayout]
        //,redrawOnResize:true
    });


    //---------------------------------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------------------
    //----------------------Tanker Spec Requirement----------------------

    isc.ControlledDynamicForm.create({
        ID:"sfTankerSpecEn",
        dataSource: "certJobMsmcDS",
        valuesManager:valueMan,
        onControl: "MSMC_WRITE",
        width:"100%",
        titleWidth: 50,
        //autoFocus: true,
        //numCols: 3,
        items:[
            {
                type: "textArea",
                //name: "sfTankerSpecEnTextArea",
                name: "tsr",
                title: "EN:",
                width:"100%",
                height: msmcTabTextAreaHeight,
                selectOnFocus: true,
                wrapTitle: false,
                showTitle:true,
                //backgroundColor:"#ffffff",
                //defaultValue: ""
            }
        ]
    });

    isc.ControlledDynamicForm.create({
        ID:"sfTankerSpecCn",
        dataSource: "certJobMsmcDS",
        valuesManager:valueMan,
        onControl: "MSMC_WRITE",
        width:"100%",
        titleWidth: 50,
        //autoFocus: true,
        //numCols: 3,
        items:[
            {
                type: "textArea",
                //name: "sfTankerSpecCnTextArea",
                name: "tsrzh",
                title: "CN:",
                width:"100%",
                height: msmcTabTextAreaHeight,
                selectOnFocus: true,
                wrapTitle: false,
                showTitle:true,
                //backgroundColor:"#ffffff",
                //defaultValue: ""
            }
        ]
    });

    /*
    isc.DynamicForm.create({
        ID:"sfTankerSpecDynForm",
        width:950,
        //autoFocus: true,
        //numCols: 3,
        items:[
            {
                type: "textArea",
                name: "youTest",
                title: "EN:",
                width:950,
                selectOnFocus: true,
                wrapTitle: false,
                showTitle:true,
                //backgroundColor:"#ffffff",
                defaultValue: ""
            },{
                type: "textArea",
                name: "youTest1",
                title: "CN:",
                width:950,
                selectOnFocus: true,
                wrapTitle: false,
                showTitle:true,
                //backgroundColor:"#ffffff",
                defaultValue: ""
            }
        ]
    });
    */

    isc.VLayout.create({
        ID:"sfTankerSpecVLayout"
            , width:"100%"
    //		, height:200
            , showEdges: showEdgesOfLayoutInTabs, membersMargin:5, members:[sfTankerSpecEn,sfTankerSpecCn]
    });


    //---------------------------------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------------------
    //----------------------Cook Spec Requirement----------------------

    isc.ControlledDynamicForm.create({
        ID:"sfCookSpecEn",
        dataSource: "certJobMsmcDS",
        valuesManager:valueMan,
        onControl: "MSMC_WRITE",
        width:"100%",
        titleWidth: 50,
        //autoFocus: true,
        //numCols: 3,
        items:[
            {
                type: "textArea",
                //name: "sfCookSpecEnTextArea",
                name: "csr",
                title: "EN:",
                width:"100%",
                height: msmcTabTextAreaHeight,
                selectOnFocus: true,
                wrapTitle: false,
                showTitle:true,
                //backgroundColor:"#ffffff",
                //defaultValue: "Where the total manning of not less than 10, there shall be a fully qualified cook in addition to the manning scale mentioned in the above table."
                //defaultValue: ""
            }
        ]
    });

    isc.ControlledDynamicForm.create({
        ID:"sfCookSpecCn",
        dataSource: "certJobMsmcDS",
        valuesManager:valueMan,
        onControl: "MSMC_WRITE",
        width:"100%",
        titleWidth: 50,
        //autoFocus: true,
        //numCols: 3,
        items:[
            {
                type: "textArea",
                //name: "sfCookSpecCnTextArea",
                name: "csrzh",
                title: "CN:",
                width:"100%",
                height: msmcTabTextAreaHeight,
                selectOnFocus: true,
                wrapTitle: false,
                showTitle:true,
                //backgroundColor:"#ffffff",
                //defaultValue: "如總配員數目不少於十人，則除上表所述的人手編配數目外，須配備一名具有正式資格的廚師。"
                //defaultValue: ""
            }
        ]
    });

    isc.VLayout.create({

        ID:"sfCookSpecVLayout"
            , width:"100%"
    //		, height:200
            , showEdges: showEdgesOfLayoutInTabs, membersMargin:5, members:[sfCookSpecEn,sfCookSpecCn]
    });

    //---------------------------------------------------------------------------------------------------------------------------------------


    isc.TabSet.create({
        ID: "msmcTabSet",
        //tabBarPosition: "top",
        //tabBarAlign:"left",
        height: "25%",
        tabs: [
        {
            title: "Remark",
            //width: "100%",
            pane: msmcRemarkTab
        },
        {
            title: "Re-issuance Declaration Condition",
            //width: "100%",
            pane: msmcReIssuanceDeclarAllCustom
        },
        {
            title: "Sister Ship Declaration Condition",
            //width: "100%",
            pane: msmcSisterShipDeclarTab
        },
        {
            title: "UMS Spec. Requirement",
            //width: "100%",
            pane: sfUMSSpecVLayout
        },
        {
            title: "Tanker Spec. Requirement",
            //width: "100%",
            pane: sfTankerSpecVLayout
        },
        {
            title: "Cook Spec Requirement",
            //width: "100%",
            pane: sfCookSpecVLayout
        }
       ]
    });


    //
    //
    //isc.SectionStack.create({
    //	ID:"msmcRecSectionContent",
    //	//width: "100%",
    //    overflow : "auto",
    //    alwaysShowScrollbars:false,
    //	expandSection:function(sections){
    //        console.log('Debug info:\r\n' + arguments);
    //        console.log(arguments.length);
    //
    //		this.Super('expandSection', arguments);
    //		var secTitle = sections.title;
    //		if('MSMC Information'!=secTitle){
    //			//var resultLG = msmcRecSectionContent.getSection(sections.name).items[0].members[0];
    //			var resultLG = msmcRecSectionContent.getSection(sections.name).items[0].members[0];
    //
    //            /*
    //            //resultLG.refresh();
    //            seafarerTrainingCourse.refresh();
    //            sfUMSSpecVLayout.refresh();
    //            sfUMSSpecVLayout.redraw();
    //            my_A.refresh();
    //            my_A.redraw();
    //            my_A.adjustForContent(immediate);
    //            sfUMSSpecVLayout.adjustForContent(immediate);
    //            Canvas.adjustForContent(immediate);
    //            sfUMSSpecVLayout.redrawOnResize = true;
    //            */
    //
    //
    //			if('ListGrid'==resultLG.getClassName()){
    //				resultLG.refresh();
    //			}
    //		}
    //	},
    //	sections: [
    //	           {name:"seafarerPersonInfo", 	title: "MSMC Information", 	resizeable: false
    //	        	   , items: [
    //	        	              //msmcRecFormDetail,
    //
    //	        	   ]
    //	           }
    //
    ////	           isc.TabSet.create(
    ////	        		   {
    ////	        			    ID: "msmcTabSet1",
    ////	     //   			    tabBarPosition: "top",
    ////	     //   			    tabBarAlign:"left",
    ////	        			    width: 1500,
    ////	        			    showTabScroller: true,
    ////	     //   			    showTabPicker: true,
    ////	        			    tabs: [
    ////	        				{
    ////	        				    title: "Remark",
    ////	        				    pane: msmcRemarkTab
    ////	        				},
    ////	        				{
    ////	        				    title: "Re-issuance Declaration Condition",
    ////	        				    pane: msmcReIssuanceDeclarAllCustom
    ////	        				},
    ////	        				{
    ////	        				    title: "Sister Ship Declaration Condition",
    ////	        				    pane: msmcSisterShipDeclarTab
    ////	        				},
    ////	        				{
    ////	        				    title: "UMS Spec. Requirement",
    ////	        				    pane: sfUMSSpecVLayout
    ////	        				},
    ////	        				{
    ////	        				    title: "Tanker Spec. Requirement",
    ////	        				    pane: sfTankerSpecVLayout
    ////	        				},
    ////	        				{
    ////	        				    title: "Cook Spec Requirement",
    ////	        				    pane: sfCookSpecVLayout
    ////	        				}
    ////	        			   ]
    ////
    ////	        			}
    ////	        	)
    ////	           {name:"seafarerReg", 		title: "Remark",			resizeable: false, items: [ msmcRemarkTab ]},
    ////	           {name:"seafarerNextOfKin", 	title: "Re-issuance Declaration Condition",  			resizeable: false, items: [ msmcReIssuanceDeclarAllCustom ]},
    ////	           {name:"seafarerMedical",		title: "Sister Ship Declaration Condition", 				resizeable: false, items: [ msmcSisterShipDeclarTab ]},
    ////	           {name:"seafarerTrainingCourse",	title: "UMS Spec. Requirement", 	resizeable: false, items: [ sfUMSSpecVLayout ]},
    ////	           {name:"seafarerCert",		title: "Tanker Spec Requirement", 			resizeable: false, items: [ sfTankerSpecDynForm ]},
    ////	           {name:"seafarerCert",		title: "Tanker Spec Requirement", 			resizeable: false, items: [ sfTankerSpecVLayout ]},
    ////	           {name:"seafarerSeaService",	title: "Cook Spec Requirement", 			resizeable: false, items: [ sfCookSpecVLayout ]}
    //
    //               //,{name:"seafarerEmployment",	title: "Employment@@@", 			resizeable: false, items: [ seafarerEmploymentLayout ]},
    //	           //{name:"seafarerRank",		title: "Rank/Rating", 			resizeable: false, items: [ seafarerRatingLayout ]},
    //	           //{name:"seafarerSerb",		title: "Previous SERB Record", 	resizeable: false, items: [ seafarerPrevSerbLayout ]},
    //	           //{name:"seafarerDisciplinary",	title: "Disciplinary", 		resizeable: false, items: [ seafarerDiscLayout ]}
    //	         ]
    //
    //});


    isc.VLayout.create({
        ID: "MsmcDetailWindowContent",
        //width: "100%",
        members: [
                //isc.TitleLabel.create({ID:"msmcRecSectionTitle", contents: "<p><b><font size=15px>Maintain Seafarer Record <br /></font></b></p>"}),
                //isc.TitleLabel.create({ID:"msmcRecSectionTitle", contents: "<p><b>Maintain Seafarer Record <br/></b></p>"}),
                msmcToolBar,
                msmcRecFormDetail,
                msmcTabSet
                //msmcTabSet
              ]
    });





    isc.Window.create({
        ID:"MsmcDetailWindow", isModal: true, showModalMask: true
        , width: "90%"
    //	, height: "90%"
        , height: "100%"
        , title:"MSMC@1.0",
        //layoutMargin:10,
        overflow : "auto",
        items: [
                MsmcDetailWindowContent
                ],
        show:function(){
            //msmcRecFormDetail.setData({});
            //sfPhotoCanvas.setData(null);
            this.Super('show', arguments);
            //sfFingerprintCanvas.setData(null);
    //		msmcRecSectionContent.collapseSection([1,2,3,4,5,6,7,8,9,10]);

        }

    });



}

function issuancePullDownHandler(value){
	console.log("function issuancePullDownHandler(value){");
	
	if (isNull(value))
		return;
	if (value == "New Issuance") {
		// start #00002
    	//showEngineerFields(true);
    	//displayShowEngineerChk(false);
		// end #00002
    	
        issueDateOmitReason.setValue("issueOmittedBy", issueDateOmitReason3);
    }else if (value == "Re-Issuance") {
    	// start #00002
    	//displayShowEngineerChk(true);
    	//showEngineerChkHandler(certJobMsmcVM.getValue("showEngineer"));
    	// end #00002
    	
/*
//    	var showEngineerValue = certJobMsmcVM.getValue("showEngineer");
//    	showEngineerChkHandler(showEngineerValue);
*/
    	
    	
    }
}


function showEngineerChkHandler(value) {
	if (isNull(value) || value == "0") {
		showEngineerFields(false);
	}else if (value == "1") {
		showEngineerFields(true);
	}
} 


function displayShowEngineerChk(showFlag){
	//show / hide checkbox
	var visibilityValue = "";

    if (showFlag) visibilityValue = "visible";
    else visibilityValue = "hidden";
    
    var engineerDateDateTextField = document.querySelector("input[name=engineerDate_dateTextField]").parentNode.parentNode.parentNode.parentNode.parentNode;
	engineerDateDateTextField.parentNode.parentNode.getElementsByTagName("tr")[10].getElementsByTagName("td")[4].style.visibility = visibilityValue;
}

function showEngineerFields(showFlag){
	//show / hide Engineer Surveyor 
    var visibilityValue = "";

    if (showFlag) visibilityValue = "visible";
    else visibilityValue = "hidden";
    /*
    if (showFlag){
    	sfMSMCInfoLhs.getItem("engineer").enable();
    	sfMSMCInfoLhs.getItem("engineerDate").enable();
    }else{
    	sfMSMCInfoLhs.getItem("engineer").disable();
    	sfMSMCInfoLhs.getItem("engineerDate").disable();
    }
    */

    
    if (!readingDataFromDBMode){

    //--------------for using xml embedded with data--------------
    document.querySelector("input[name=mSMCInfoEngineerDate]").parentNode.parentNode.style.visibility = visibilityValue;
    document.querySelector("input[name=mSMCInfoEngineerSurveyor]").style.visibility = visibilityValue;

    } else{
    //--------------for reading data from DB--------------
    //document.querySelector("input[name=engineerDate]").parentNode.parentNode.style.visibility = visibilityValue;
    	
    //document.querySelector("input[name=engineerDate_dateTextField]").parentNode.parentNode.style.visibility = visibilityValue;
    //document.querySelector("input[name=engineer]").style.visibility = visibilityValue;
    
	var engineerDateDateTextField = document.querySelector("input[name=engineerDate_dateTextField]").parentNode.parentNode.parentNode.parentNode.parentNode;
	engineerDateDateTextField.parentNode.parentNode.getElementsByTagName("tr")[10].getElementsByTagName("td")[1].style.visibility = visibilityValue;
	engineerDateDateTextField.style.visibility = visibilityValue;
	engineerDateDateTextField.parentNode.getElementsByTagName("td")[0].style.visibility = visibilityValue;
	
    }
	
}


function getIntValue(value) {
    if (isNull(value) || value.toString().trim() == "" || !Number.isInteger(value))
        return 0;
    else return value;
}

function setInsuffMsmcHighlight() {
	console.log("setInsuffMsmcHighlight()");
    var bgcolor = "";
    if ( getIntValue(sfMSMCInfoDeck.getValue("dClass1")) < li_off_class1) {
        bgcolor = insufficient_Msmc_highlight;
    }else bgcolor = "";
    document.querySelector("div[eventproxy=sfMSMCInfoDeck] [name=deckClass1Label]").style.backgroundColor = bgcolor;
    
    if ( getIntValue(sfMSMCInfoDeck.getValue("dAbleseafarer")) < li_rating_asd) {
        bgcolor = insufficient_Msmc_highlight;
    }else bgcolor = "";
    document.querySelector("div[eventproxy=sfMSMCInfoDeck] [name=deckAbleSeafarerLabel]").style.backgroundColor = bgcolor;
    
    if ( getIntValue(sfMSMCInfoDeck.getValue("dClass2")) < li_off_class2) {
        bgcolor = insufficient_Msmc_highlight;
    }else bgcolor = "";
    document.querySelector("div[eventproxy=sfMSMCInfoDeck] [name=deckClass2Label]").style.backgroundColor = bgcolor;
    
    if ( getIntValue(sfMSMCInfoDeck.getValue("dWatchrating")) < li_rating_rwd) {
        bgcolor = insufficient_Msmc_highlight;
    }else bgcolor = "";
    document.querySelector("div[eventproxy=sfMSMCInfoDeck] [name=deckWatchRatingsLabel]").style.backgroundColor = bgcolor;
    
    if ( getIntValue(sfMSMCInfoDeck.getValue("dClass3")) < li_off_class3) {
        bgcolor = insufficient_Msmc_highlight;
    }else bgcolor = "";
    document.querySelector("div[eventproxy=sfMSMCInfoDeck] [name=deckClass3Label]").style.backgroundColor = bgcolor;
    
    if ( getIntValue(sfMSMCInfoDeck.getValue("dOtheratings")) < li_rating_ord) {
        bgcolor = insufficient_Msmc_highlight;
    }else bgcolor = "";
    document.querySelector("div[eventproxy=sfMSMCInfoDeck] [name=deckOtherRatingsLabel]").style.backgroundColor = bgcolor;
    
    //--------------------------------------------------------------------------------------------------------------------------------------------
    
    if ( getIntValue(sfMSMCInfoEngineer.getValue("eClass1")) < li_eng_class1) {
        bgcolor = insufficient_Msmc_highlight;
    }else bgcolor = "";
    document.querySelector("div[eventproxy=sfMSMCInfoEngineer] [name=engineerClass1Label]").style.backgroundColor = bgcolor;
    
    if ( getIntValue(sfMSMCInfoEngineer.getValue("eAbleseafarer")) < li_rating_ase) {
        bgcolor = insufficient_Msmc_highlight;
    }else bgcolor = "";
    document.querySelector("div[eventproxy=sfMSMCInfoEngineer] [name=engineerAbleSeafarerLabel]").style.backgroundColor = bgcolor;
    
    if ( getIntValue(sfMSMCInfoEngineer.getValue("eClass2")) < li_eng_class2) {
        bgcolor = insufficient_Msmc_highlight;
    }else bgcolor = "";
    document.querySelector("div[eventproxy=sfMSMCInfoEngineer] [name=engineerClass2Label]").style.backgroundColor = bgcolor;
    
    if ( getIntValue(sfMSMCInfoEngineer.getValue("eWatchrating")) < li_rating_rwe) {
        bgcolor = insufficient_Msmc_highlight;
    }else bgcolor = "";
    document.querySelector("div[eventproxy=sfMSMCInfoEngineer] [name=engineerWatchRatingsLabel]").style.backgroundColor = bgcolor;
    
    if ( getIntValue(sfMSMCInfoEngineer.getValue("eClass3")) < li_eng_class3) {
        bgcolor = insufficient_Msmc_highlight;
    }else bgcolor = "";
    document.querySelector("div[eventproxy=sfMSMCInfoEngineer] [name=engineerClass3Label]").style.backgroundColor = bgcolor;
    
}


function setSuggestedValForDeckEng(){
    console.log("setSuggestedValForDeckEng()");
    var sptype = msmcShipInfo.getItem("ship_jobno_sptype").getValue();
    var gross = msmcShipInfo.getItem("gross").getValue();
    var enginePower = msmcShipInfo.getItem("enginePower").getValue();
    var mod = sfMSMCMod.getItem("mod").getValue();
    var ums = sfMSMCUms.getItem("ums").getValue();
    //var ums = msmcShipInfo.getItem("ums").getValue();
    var target_sptype = "passenger";
    var today = Date.now();

    if (!isNull(sptype)) {
        if (sptype.toLowerCase().includes(target_sptype)) {
            li_off_class1 = 1;
            li_off_class2 = 1;
            li_off_class3 = 2;
        }else if (gross >= 1600){
            li_off_class1 = 1;
            li_off_class2 = 1;
            li_off_class3 = 2;
        }else if (gross < 1600){
            li_off_class1 = 1;
            li_off_class2 = 1;
            li_off_class3 = 1;
        }else {
            li_off_class1 = 0;
            li_off_class2 = 0;
            li_off_class3 = 0;
        }
    }

    if (!isNull(enginePower)) {
        if (enginePower >= 3000) {
            li_eng_class1 = 1;
            li_eng_class2 = 1;
            if (!isNull(ums) && ums === "YES")
                li_eng_class3 = 1;
            else li_eng_class3 = 2;
        }else if (enginePower >= 350 && enginePower < 3000) {
            li_eng_class1 = 1;
            li_eng_class2 = 0;
            if (!isNull(ums) && ums === "YES")
                li_eng_class3 = 2;
            else li_eng_class3 = 3;
        }else{
            li_eng_class1 = 0;
            li_eng_class2 = 0;
            li_eng_class3 = 0;
        }
    }

    if (!isNull(enginePower) && enginePower >= 3000) {
        ls_e_class1_text = 'III/2';
        ls_e_class2_text = 'III/2';
    }

    if (isNull(enginePower) || enginePower >= 750 && enginePower < 3000) {
        ls_e_class1_text = 'III/3';
        ls_e_class2_text = 'III/3';
    }

    if (today < new Date("2017-01-01")) {
        if (!isNull(gross)) {
            if (gross >= 500 && gross < 3000){
                if (!isNull(mod) && mod.includes("+"))
                    li_rating_ord = 1;
                else
                    li_rating_ord = 2;

                li_rating_rwd = 3;

                if (!isNull(ums) && ums === "YES")
                    li_rating_rwe = 1;
                else
                    li_rating_rwe = 2;
            }else if (gross >= 3000 && gross < 10000) {
                if (!isNull(mod) && mod.includes("+"))
                    li_rating_ord = 1;
                else
                    li_rating_ord = 2;

                li_rating_rwd = 3;

                if (!isNull(ums) && ums === "YES")
                    li_rating_rwe = 2;
                else
                    li_rating_rwe = 3;
            }else if (gross >= 10000) {
                if (!isNull(mod) && mod.includes("+"))
                    li_rating_ord = 1;
                else
                    li_rating_ord = 2;

                li_rating_rwd = 4;

                if (!isNull(ums) && ums === "YES")
                    li_rating_rwe = 2;
                else
                    li_rating_rwe = 3;
            }else{
                li_rating_ord = 0;
                li_rating_rwd = 0;
                li_rating_rwe = 0;
            }
        }
    }else{ //later than 2017/1/1
        if (!isNull(gross)) {
            if (gross >= 500 && gross < 3000){
                if (!isNull(mod) && mod.includes("+"))
                    li_rating_asd = 4;
                else
                    li_rating_asd = 5;

                if (!isNull(ums) && ums === "YES")
                    li_rating_ase = 1;
                else
                    li_rating_ase = 2;
            }else if (gross >= 3000 && gross < 10000) {
                if (!isNull(mod) && mod.includes("+"))
                    li_rating_asd = 4;
                else
                    li_rating_asd = 5;

                if (!isNull(ums) && ums === "YES")
                    li_rating_ase = 2;
                else
                    li_rating_ase = 3;
            }else if (gross >= 10000) {
                if (!isNull(mod) && mod.includes("+"))
                    li_rating_asd = 5;
                else
                    li_rating_asd = 6;

                if (!isNull(ums) && ums === "YES")
                    li_rating_ase = 2;
                else
                    li_rating_ase = 3;
            }else{
                li_rating_asd = 0;
                li_rating_ase = 0;
            }
        }
    }


    sfMSMCInfoDeck.getItem("deckClass1Label").setValue(li_off_class1);
    sfMSMCInfoDeck.getItem("deckClass2Label").setValue(li_off_class2);
    sfMSMCInfoDeck.getItem("deckClass3Label").setValue(li_off_class3);
    sfMSMCInfoDeck.getItem("deckAbleSeafarerLabel").setValue(li_rating_asd);
    sfMSMCInfoDeck.getItem("deckWatchRatingsLabel").setValue(li_rating_rwd);
    sfMSMCInfoDeck.getItem("deckOtherRatingsLabel").setValue(li_rating_ord);


    sfMSMCInfoEngineer.getItem("engineerClass1Label").setValue(li_eng_class1);
    sfMSMCInfoEngineer.getItem("engineerClass2Label").setValue(li_eng_class2);
    sfMSMCInfoEngineer.getItem("engineerClass3Label").setValue(li_eng_class3);
    sfMSMCInfoEngineer.getItem("engineerAbleSeafarerLabel").setValue(li_rating_ase);
    sfMSMCInfoEngineer.getItem("engineerWatchRatingsLabel").setValue(li_rating_rwe);

    sfMSMCInfoEngineer.getItem("eClass1").title = (msmcEngineerClass1Label + ls_e_class1_text);
    sfMSMCInfoEngineer.getItem("eClass2").title = (msmcEngineerClass2Label + ls_e_class2_text);

    sfMSMCInfoEngineer.getItem("eClass1").redraw();
    sfMSMCInfoEngineer.getItem("eClass2").redraw();
}

/*
function setUMSSpecReq(){
    console.log("setUMSSpecReq");

    var ums = sfMSMCUms.getItem("ums").getValue();
    var eClass3 = sfMSMCInfoEngineer.getItem("eClass3").getValue();
    var eWatchrating = sfMSMCInfoEngineer.getItem("eWatchrating").getValue();
    var umsSpecReqTextEng = "";
    var umsSpecReqTextChi = "";

    if (isNull(ums) || isNull(eClass3) || isNull(eWatchrating))
        return;
    if (ums === "YES") {
        if (eClass3 == 1){
            if (eWatchrating == 2){
                umsSpecReqTextEng = msmcUmsSpecReqTextEng1 + msmcUmsSpecReqTextEng2 + msmcUmsSpecReqTextEngRole1 + msmcUmsSpecReqTextEng3 + msmcUmsSpecReqTextEng2 + msmcUmsSpecReqTextEngRole2 + msmcUmsSpecReqTextEng4;
                umsSpecReqTextChi = msmcUmsSpecReqTextChi1 + msmcUmsSpecReqTextChi2 + msmcUmsSpecReqTextChiRole1 + msmcUmsSpecReqTextChi3 + msmcUmsSpecReqTextChi2 + msmcUmsSpecReqTextChiRole2 + msmcUmsSpecReqTextChi4;
            }else if (eWatchrating == 3){
                umsSpecReqTextEng = msmcUmsSpecReqTextEng1 + msmcUmsSpecReqTextEng2 + msmcUmsSpecReqTextEngRole1 + msmcUmsSpecReqTextEng4;
                umsSpecReqTextChi = msmcUmsSpecReqTextChi1 + msmcUmsSpecReqTextChi2 + msmcUmsSpecReqTextChiRole1 + msmcUmsSpecReqTextChi4;
            }
        }else if (eClass3 == 2 && eWatchrating == 2){
            umsSpecReqTextEng = msmcUmsSpecReqTextEng1 + msmcUmsSpecReqTextEng2 + msmcUmsSpecReqTextEngRole2 + msmcUmsSpecReqTextEng4;
            umsSpecReqTextChi = msmcUmsSpecReqTextChi1 + msmcUmsSpecReqTextChi2 + msmcUmsSpecReqTextChiRole2 + msmcUmsSpecReqTextChi4;
        }else if (eClass3 >= 2 && eWatchrating >= 3){
            umsSpecReqTextEng = msmcUmsSpecReqTextEng5;
            umsSpecReqTextChi = msmcUmsSpecReqTextChi5;
        }
    }
    sfUMStextAreaEn.getItem("usr").setValue(umsSpecReqTextEng);
    sfUMStextAreaTc.getItem("usrzh").setValue(umsSpecReqTextChi);
// 00001 - Start Comment: This cause js crash
//    sfUMSSpecCn.getItem("usrzh").setValue(umsSpecReqTextChi);
// 00001 - End Comment: This cause js crash

}
*/

function setTankSpecReq(){
	console.log("enter setTankSpecReq()");
    var isTank = false;
    var engText = "";
    var chiText = "";
    //var sptype = msmcShipInfo.getItem("ship_jobno_sptype").getValue();
    var sptype = certJobMsmcVM.getValue("ship_jobno_sptype");

    if (isNull(sptype))
    	return;
    for(var i = 0; i < tankSpType.length; i++){
        if (sptype.includes(tankSpType[i])){
            isTank = true;
            engText = msmcTankSpecReqTextEng;
            chiText = msmcTankSpecReqTextChi;
            break;
        }
    }
    if (isTank) {
        sfTankerSpecEn.getItem("tsr").setValue(engText);
        sfTankerSpecCn.getItem("tsrzh").setValue(chiText);
    }else{
    	sfTankerSpecEn.getItem("tsr").clearValue();
        sfTankerSpecCn.getItem("tsrzh").clearValue();
    }
}

function setCookSpecReq(){
    var engText = "";
    var chiText = "";
    if (sfMSMCInfoSteward.getItem("sCook").getValue() == "YES"){
        engText = msmcCookSpecReqTextEng;
        chiText = msmcCookSpecReqTextChi;
    }
    sfCookSpecEn.getItem("csr").setValue(engText);
    sfCookSpecCn.getItem("csrzh").setValue(chiText);
}
function setSisterShipDecl(){
    var engText = "";
    var sisterSp = sfSisterShip.getItem("sisterShip").getValue();
    if (!isNull(sisterSp) && sisterSp.trim() != ""){
        engText = msmcSisterShipDeclTextEng + "\"" + sisterSp + "\".";
    }
    msmcSisterShipDeclarTab.getItem("sdc").setValue(engText);
}

function setFormList(record){
    console.log("enter setFormList()");
    console.log(JSON.stringify(record));
    if (isNull(record) || isNull(record.form) || isNull(record.issuance)) {
        console.log("enter setFormList() since form or issuance is null");
        console.log(record.form);
        console.log(record.issuance);
        return;
    }
    
    sfMSMCLhsPanel.filterLocalData = true;
    
    var advCriteriaForFormList = {
        _constructor:"AdvancedCriteria",
        operator:"or",
        criteria:[
            // this is a Criterion
            { fieldName:"formlist_form", operator:"iEquals", value:record.form }
        ]
    };
    
    if (record.issuance == "New Issuance") {
        advCriteriaForFormList.criteria.push({ fieldName:"formlist_form", operator:"iEquals", value:"Declaration(New)" });
        sfMSMCLhsPanel.filterData(advCriteriaForFormList);
        console.log("get only Declaration(New) for formlist");
    }else if (record.issuance == "Re-Issuance") {
        advCriteriaForFormList.criteria.push({ fieldName:"formlist_form", operator:"iEquals", value:"Declaration(Re)" });
        sfMSMCLhsPanel.filterData(advCriteriaForFormList);
        console.log("get only Declaration(Re) for formlist");
    }
    sfMSMCLhsPanel.filterLocalData = false;
    console.log("leave setFormList()");
}

function openMsmcCertRecDetail(record){
	//Init the Forms and ListGrids

	msmc__windowContent();
	msmcShipInfo.getItem("spname").setDisabled(record!=null);
	msmcShipInfo.getItem("imono").setDisabled(record!=null);
	msmcShipInfo.getItem("distinctNo").setDisabled(record!=null);
	MsmcDetailWindow.show();

	msmc_saving = false;

	//showEngineerFields(false);


//	if(!isNull(record)){
	if(!isNull(record) && !isNull(record.jobno)){
		//Update record;

		//msmcRecFormDetail.getField('refNo').setDisabled(true);
		var seafarerId = record.id;
		var shipIMONo = record.imoNo;
		var shipNm = record.spName;
        console.log("the row user selected is captured");
        console.log("about to fetchData()");

        /*
		msmcRecFormDetail.fetchData({"id":seafarerId},function (dsResponse, data, dsRequest) {
			MsmcDetailWindow.setTitle("Seafarer Detail (ID: " + seafarerId + " )");

//			Note: refresh while click
//			sfRegListGrid.refresh();
//			sfRecFormNextOfKinLG.refresh();
//			sfRecFormMedicalLG.refresh();
//			sfRecFormSeaServiceLG.refresh();
//			sfRecFormEmploymentLG.refresh();
//			sfRecFormRatingLG.refresh();
//			sfRecFormDiscLG.refresh();
//			sfPreviousSerbListGrid.refresh();
		});
        */

/* 00001 - Start Add */
        certJobMsmcVM.fetchData({jobno:record.jobno},function (dsResponse, data, dsRequest) {
            console.log("callback of certJobMsmcVM.fetchData()");
            if (dsResponse.status != 0 || data.length < 1)
                return;
            
            sfMSMCLhsPanel.setData(data[0].formlists);
            
            enableCertJobShipDF(msmcShipInfo, data);
            if (!isNull(data[0].status) && data[0].status.trim() != "Process") {
            	msmcToolBar.getButton("processCloseBtn").setTitle(reStartTitle);
            }
        	disableMsmcWindowControls();
            
            var filteredData = msmcShipInfo.getData();


            //not works with valuesManager
            //msmcRemarkTab.editRecord(filteredData);
            //msmcSisterShipDeclarTab.editRecord(filteredData);
            //msmcReIssuanceDeclarSpName.editRecord(filteredData);
            //msmcReIssuanceDeclarManaCom.editRecord(filteredData);
            //msmcReIssuanceDeclarOtherChk.editRecord(filteredData);
            //msmcReIssuanceDeclarOtherTxt.editRecord(filteredData);

/* 00001 - Start Comment: this causes js crash */
//            sfUMSSpecEn.editRecord(filteredData);
//            sfUMSSpecCn.editRecord(filteredData);
/* 00001 - End Comment: this causes js crash */

            //sfUMSSpecEn.editRecord(filteredData);
            //sfTankerSpecEn.editRecord(filteredData);
            //sfTankerSpecCn.editRecord(filteredData);
            //sfCookSpecEn.editRecord(filteredData);
            //sfCookSpecCn.editRecord(filteredData);


            setFormList(data[0]);
            issuancePullDownHandler(data[0]["issuance"]);
            //showEngineerChkHandler(certJobMsmcVM.getValue("showEngineer"));

            sfUMSSpecEn.setValue("usr", certJobMsmcVM.getValue("usr"));
            sfUMSSpecEn.setValue("usrzh", certJobMsmcVM.getValue("usrzh"));
            console.log("usr: " + sfUMSSpecEn.getValue("usr"));
            console.log("usrzh: " + sfUMSSpecEn.getValue("usrzh"));

            setSuggestedValForDeckEng();
            console.log("setSuggestedValForDeckEng() finished");
            setTimeout(setInsuffMsmcHighlight, 300);
//            setUMSSpecReq();
//            console.log("setUMSSpecReq() finished");
//            setTankSpecReq();
//            console.log("setTankSpecReq() finished");
//            setCookSpecReq();
//            console.log("setCookSpecReq() finished");
            
            //setSisterShipDecl();
            //console.log("setSisterShipDecl() finished");

//            MsmcDetailWindow.onload = function(e){
//            	console.log("enter MsmcDetailWindow.onload event");
//            	issuancePullDownHandler(data[0]["issuance"]);
//            };
            
            sfUMSSpecEn.onload = function(e){
                console.log("inside sfUMSSpecEn.onload");
                console.log("usr inside sfUMSSpecEn.onload: " + sfUMSSpecEn.getValue("usr"));
                console.log("usrzh inside sfUMSSpecEn.onload: " + sfUMSSpecEn.getValue("usrzh"));
            };
            setTimeout(function(){issuancePullDownHandler(data[0]["issuance"]); }, 300);
        });
        
        
        
        
/* 00001 - End Add */

/* 00001 - Start Comment */
//        msmcShipInfo.fetchData({jobno:record.jobno},function (dsResponse, data, dsRequest) {
//        	console.log("msmcShipInfo.fetchData() entered");
//            var filteredData = msmcShipInfo.getData();
//
//            /*
//            console.log('@@@@spName: ' + shipNm);
//            console.log('dsResponse: ' + dsResponse);
//            console.log('retrieved data: ' + data);
//            console.log('imoNo of retrieved data: ' + data[0].imoNo);
//            console.log('spName of retrieved data: ' + data[0].spName);
//            console.log('dsRequest: ' + dsRequest);
//            */
//
//
//            MsmcDetailWindow.setTitle("MSMC@1.0 (ID: " + seafarerId + " )");
//
//            sfMSMCJobNo.editRecord(filteredData);
//            sfSisterShip.editRecord(filteredData);
//            sfMSMCInfoLhs.editRecord(filteredData);
//            sfMSMCMod.editRecord(filteredData);
//            sfMSMCInfoDeck.editRecord(filteredData);
//            sfMSMCUms.editRecord(filteredData);
//            sfMSMCInfoEngineer.editRecord(filteredData);
//            sfMSMCInfoSteward.editRecord(filteredData);
//            sfMSMCCB3dy.editRecord(filteredData);
//            sfMSMCCBReqTitle.editRecord(filteredData);
//            issueDateOmitReason.editRecord(filteredData);
//
//            msmcRemarkTab.editRecord(filteredData);
//            msmcSisterShipDeclarTab.editRecord(filteredData);
//            msmcReIssuanceDeclarSpName.editRecord(filteredData);
//            msmcReIssuanceDeclarManaCom.editRecord(filteredData);
//            msmcReIssuanceDeclarOtherChk.editRecord(filteredData);
//            msmcReIssuanceDeclarOtherTxt.editRecord(filteredData);
//            sfUMSSpecEn.editRecord(filteredData);
//            sfUMSSpecCn.editRecord(filteredData);
//            sfTankerSpecEn.editRecord(filteredData);
//            sfTankerSpecCn.editRecord(filteredData);
//            sfCookSpecEn.editRecord(filteredData);
//            sfCookSpecCn.editRecord(filteredData);
//
//
//
//
//            setSuggestedValForDeckEng();
//            console.log("setSuggestedValForDeckEng() finished");
//            setUMSSpecReq();
//            console.log("setUMSSpecReq() finished");
//            setTankSpecReq();
//            console.log("setTankSpecReq() finished");
//            setCookSpecReq();
//            console.log("setCookSpecReq() finished");
//            setSisterShipDecl();
//            console.log("setSisterShipDecl() finished");
//
//        });
        /*
        sfMSMCLhsPanel.fetchData({jobno:record.jobno},function (dsResponse, data, dsRequest) {

        });
        */
/* 00001 - End Comment */

//        sfMSMCLhsPanel.setData(record.formlists);
        



        //setMSMCShipInfo(record);


        //setMSMCLhsPanel(record);



        /*
		sfRecFormButton_ToolBar.getButton('uploadFingerprintBtn').setDisabled(false);
		sfRecFormButton_ToolBar.getButton('uploadPhotoBtn').setDisabled(false);
		*/
        //console.log("testing@");
		enabledSection(true);

		//sfPhotoCanvas.fetchData({"id":seafarerId, "type":"photo"});
		//sfFingerprintCanvas.fetchData({"id":seafarerId, "type":"fingerprint"});

	}else{
		//New record;
		console.log("New MSMC record");
		MsmcDetailWindow.setTitle("MSMC@1.0");
		if(!isNull(record)){
			certJobMsmcVM.setData(record);
		}else{
	        msmcShipInfo.setData([]);
		}

		//certJobMsmcVM.setValue("status", "Process");
        //sfMSMCJobNo.setValue("startPerson", loginData.userId);
        certJobMsmcVM.setValue("startPerson", loginData.userId);
        certJobMsmcVM.setValue("cert_dept_code", current_cert_dept.cert_dept_code);
        
        disableMsmcWindowControls();
        
        sfMSMCInfoLhs.setValue("issueAt", "HONG KONG");
        sfMSMCInfoLhs.getItem("issueAt").enable();
        sfMSMCInfoLhs.setValue("applicationDate", new Date());
        sfMSMCInfoSteward.setValue("sCook", "YES");
        
        setCookSpecReq();
        

//		msmcRecFormDetail.getField('refNo').setDisabled(false);
//		msmcRecFormDetail.setValues({});
//		msmcRecFormDetail.clearErrors(true);
//
		//sfRecFormButton_ToolBar.getButton('uploadFingerprintBtn').setDisabled(true);
		//sfRecFormButton_ToolBar.getButton('uploadPhotoBtn').setDisabled(true);
		//enabledSection(false);
	}
	
	console.log("end of openMsmcCertRecDetail()");

}

function enabledSection(isEnabled){
	var listOfSection = [
	      //'seafarerReg',
	      //'seafarerNextOfKin',
	     // 'seafarerMedical',
	     // 'seafarerTrainingCourse',
	     // 'seafarerCert',
	     // 'seafarerSeaService'
	      ];
	var i;
	for (i = 0; i < listOfSection.length; i++) {
//		msmcRecSectionContent.showSection(listOfSection[i]);
		//msmcRecSectionContent.getSection(listOfSection[i]).setDisabled(!isEnabled);
	}
}

function setMSMCShipInfo(record){
    msmcShipInfo.getField("spName").setValue(record.spName);

    msmcShipInfo.getField("shipInfoImoNo").setValue(record.imoNo);
    msmcShipInfo.getField("shipInfoOffNo").setValue(record.offNo);
    msmcShipInfo.getField("shipInfoSpType").setValue(record.spType);
    msmcShipInfo.getField("shipInfoRegisterDate").setValue(record.registerDate);
    msmcShipInfo.getField("shipInfoTradingArea").setValue(record.tradingArea);
    msmcShipInfo.getField("shipInfoGross").setValue(record.gross);
    msmcShipInfo.getField("shipInfoEnginePower").setValue(record.enginePower);
    msmcShipInfo.getField("shipInfoClass").setValue(record.class);
    msmcShipInfo.getField("shipInfoRegistryPort").setValue(record.registryPort);
    msmcShipInfo.getField("shipInfoOperator").setValue(record.operator);

    sfMSMCJobNo.getItem("jobNo").setValue(record.jobNo);

}




function setMSMCLhsPanel(record){
    /*
    sfMSMCLhsPanel.getField("sfMSMCLhsPanelForm").setValue(record.form);
    sfMSMCLhsPanel.getField("sfMSMCLhsPanelVer").setValue(record.ver);
    */

    //sfMSMCLhsPanel.setData([]);

/*
    sfMSMCLhsPanel.fetchData({"spName":record.spName},function (dsResponse, data, dsRequest) {
    });
*/
    sfMSMCLhsPanel.fetchData({jobNo:record.jobNo});

    console.log("record.form:" + record.form);
    console.log("record.ver:" + record.ver);
    console.log("record.jobNo:" + record.jobNo);
/*
    sfMSMCLhsPanel.addData({
            form: record.form,
            ver: record.ver
        });
*/


}

function extractedModifiedDataFromDF(dfObj){
    var dfFieldNames = dfObj.getItems().map(a=>a.name);
    //var msmcShipInfoDataToBeSaved = pick(dfObj.getValues(), ["spname","imono","offno","ship_jobno_sptype","registerDate","tradingArea","gross","enginePower","spclass","registryPort","operator"]);
    var dfDataToBeSaved = pick(dfObj.getValues(), dfFieldNames);
    console.log("dfDataToBeSaved: " + dfDataToBeSaved);
    return dfDataToBeSaved;
}

function getCertPara(){
    var params = {};
    Object.assign(params, {"e_class1_STCW_reg" : ls_e_class1_text});
    Object.assign(params, {"e_class2_STCW_reg" : ls_e_class2_text});
    return params;
}

function getMsmcCertPara(certPara){
    var params = {};

    var specialReq = [];
    var specialReqEng = [];
    var specialReqChi = [];

    var msmcUMSTextEng = sfUMStextAreaEn.getItem("usr").getValue();
    var msmcUMSTextChi = sfUMStextAreaTc.getItem("usrzh").getValue();
    var msmcTankTextEng = sfTankerSpecEn.getItem("tsr").getValue();
    var msmcTankTextChi = sfTankerSpecCn.getItem("tsrzh").getValue();
    var msmcCookTextEng = sfCookSpecEn.getItem("csr").getValue();
    var msmcCookTextChi = sfCookSpecCn.getItem("csrzh").getValue();
    
    //UMS
    if (!isNull(msmcUMSTextEng) && (msmcUMSTextEng = msmcUMSTextEng.trim()) != "" && !isNull(msmcUMSTextChi) && (msmcUMSTextChi = msmcUMSTextChi.trim()) != "") {
        specialReq.push(msmcUMSTextEng + "\r\n" + msmcUMSTextChi);
        //specialReq.push(msmcTankTextEng);
        specialReqEng.push(msmcUMSTextEng);
        specialReqChi.push(msmcUMSTextChi);
    }
    //Tanker
    if (!isNull(msmcTankTextEng) && (msmcTankTextEng = msmcTankTextEng.trim()) != "" && !isNull(msmcTankTextChi) && (msmcTankTextChi = msmcTankTextChi.trim()) != "") {
        specialReq.push(msmcTankTextEng + "\r\n" + msmcTankTextChi);
        //specialReq.push(msmcTankTextEng);
        specialReqEng.push(msmcTankTextEng);
        specialReqChi.push(msmcTankTextChi);
    }
    //Cook
    if (!isNull(msmcCookTextEng) && (msmcCookTextEng = msmcCookTextEng.trim()) != "" && !isNull(msmcCookTextChi) && (msmcCookTextChi = msmcCookTextChi.trim()) != "") {
        specialReq.push(msmcCookTextEng + "\r\n" + msmcCookTextChi);
        //specialReq.push(msmcCookTextEng);
        specialReqEng.push(msmcCookTextEng);
        specialReqChi.push(msmcCookTextChi);
    }
    
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /*
    //UMS
    if (!isNull(msmcUMSTextEng) && (msmcUMSTextEng = msmcUMSTextEng.trim()) != "" && !isNull(msmcUMSTextChi) && (msmcUMSTextChi = msmcUMSTextChi.trim()) != "") {
        specialReq.push(msmcUMSTextEng + "\r\n" + msmcUMSTextChi);
        //specialReq.push(msmcTankTextEng);
    }
    if (!isNull(msmcUMSTextEng) && (msmcUMSTextEng = msmcUMSTextEng.trim()) != "" && !isNull(msmcUMSTextChi) && (msmcUMSTextChi = msmcUMSTextChi.trim()) != "") {
        specialReq.push(msmcUMSTextEng + "\r\n" + msmcUMSTextChi);
        //specialReq.push(msmcTankTextEng);
    }
    //Tanker
    if (!isNull(msmcTankTextEng) && (msmcTankTextEng = msmcTankTextEng.trim()) != "" && !isNull(msmcTankTextChi) && (msmcTankTextChi = msmcTankTextChi.trim()) != "") {
        specialReq.push(msmcTankTextEng + "\r\n" + msmcTankTextChi);
        //specialReq.push(msmcTankTextEng);
    }
    if (!isNull(msmcTankTextEng) && (msmcTankTextEng = msmcTankTextEng.trim()) != "" && !isNull(msmcTankTextChi) && (msmcTankTextChi = msmcTankTextChi.trim()) != "") {
        specialReq.push(msmcTankTextEng + "\r\n" + msmcTankTextChi);
        //specialReq.push(msmcTankTextEng);
    }
    //Cook
    if (!isNull(msmcCookTextEng) && (msmcCookTextEng = msmcCookTextEng.trim()) != "" && !isNull(msmcCookTextChi) && (msmcCookTextChi = msmcCookTextChi.trim()) != "") {
        specialReq.push(msmcCookTextEng + "\r\n" + msmcCookTextChi);
        //specialReq.push(msmcCookTextEng);
    }
    if (!isNull(msmcCookTextEng) && (msmcCookTextEng = msmcCookTextEng.trim()) != "" && !isNull(msmcCookTextChi) && (msmcCookTextChi = msmcCookTextChi.trim()) != "") {
        specialReq.push(msmcCookTextEng + "\r\n" + msmcCookTextChi);
        //specialReq.push(msmcCookTextEng);
    }
    */
    
    
    
    var i = 0;
    for (i = 0; i < specialReq.length; i++) {
        if (i == 0) {
            Object.assign(certPara, {"specialReq_no_1" : "3."});
            Object.assign(certPara, {"specialReq_1" : specialReq[i]});
            Object.assign(certPara, {"specialReq_1_eng" : specialReqEng[i]});
            Object.assign(certPara, {"specialReq_1_chi" : specialReqChi[i]});
            console.log("*****specialReq_1_chi" + specialReqChi[i]);
        }
        if (i == 1) {
            Object.assign(certPara, {"specialReq_no_2" : "4."});
            Object.assign(certPara, {"specialReq_2" : specialReq[i]});
            Object.assign(certPara, {"specialReq_2_eng" : specialReqEng[i]});
            Object.assign(certPara, {"specialReq_2_chi" : specialReqChi[i]});
        }
        if (i == 2) {
            Object.assign(certPara, {"specialReq_no_3" : "5."});
            Object.assign(certPara, {"specialReq_3" : specialReq[i]});
            Object.assign(certPara, {"specialReq_3_eng" : specialReqEng[i]});
            Object.assign(certPara, {"specialReq_3_chi" : specialReqChi[i]});
        }
    }

    return certPara;
}

function getDeclarCertPara(certPara){
    var params = {};
    return certPara;
}



//function saveMsmcRec(saveMode){
//	//saveMode:
//	//0:normal save
//	//1:mark as printed
//
//                    if(msmcShipInfo.validate() && sfMSMCInfoLhs.validate()){
//
//    //        		TODO
//                        var requestParam = {"operationType":"update"};
//
//    //      			  	if(crewListDetailForm.getValue('version')==null){
//    //      			  		requestParam = {"operationType":"add"};
//    //      			  	}
//
//
//
//                        //msmcSaveDataDynamicForm.setData({});
//
//                        var allDataTobeSaved = {};
//
//                        if (!isNull(saveMode) && saveMode == 1) {
//                        	//printStatus
//                        	Object.assign(allDataTobeSaved, {"printStatus" : "Printed"});
//                        }
//
//                        Object.assign(allDataTobeSaved, msmcShipInfo.getData());
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfMSMCInfoLhs));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfMSMCJobNo));
//                        
//                        //Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfSisterShip));
//
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfMSMCInfoLhs));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfMSMCMod));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfMSMCInfoDeck));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfMSMCUms));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfMSMCInfoEngineer));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfMSMCInfoSteward));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfMSMCCB3dy));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfMSMCCBReqTitle));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(issueDateOmitReason));
//
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(msmcRemarkTab));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(msmcSisterShipDeclarTab));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(msmcReIssuanceDeclarSpName));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(msmcReIssuanceDeclarManaCom));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(msmcReIssuanceDeclarOtherChk));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(msmcReIssuanceDeclarOtherTxt));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfUMSSpecEn));
//                        //Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfUMSSpecCn));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfTankerSpecEn));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfTankerSpecCn));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfCookSpecEn));
//                        Object.assign(allDataTobeSaved, extractedModifiedDataFromDF(sfCookSpecCn));
//
//
//
//                        //msmcSaveDataDynamicForm.editRecord(allDataTobeSaved);
//                        msmcShipInfo.editRecord(allDataTobeSaved);
//                        msmcShipInfo.saveData(function(dsResponse, data, dsRequest) {
//                            console.log("msmcShipInfo.saveData() entered");
//                            if (dsResponse.status == 0) {
//                            	if (!isNull(saveMode) && saveMode == 0) {
//                            		isc.say(saveSuccessfulMessage);
//                            	}
//
//    //      			  			mmoDNDetailSectionForm_ToolBar.getButton('addFeeBtn').setDisabled(false);
//    //      			  			mmoDNDetailSectionForm_ToolBar.getButton('cancelDNBtn').setDisabled(false);
//
//                                //msmcToolBar.getButton('addSeafarerBtn').setDisabled(false);
//                            }
//                        }, requestParam);
//                    }
//
//}


function saveMsmcRecord(saveMode, callback_func){
	//saveMode:
	//0:normal save
	//1:mark as printed
    if (certJobMsmcVM.validate() && !msmc_saving){
    	msmc_saving = true;
        var requestParam = {"operationType":"update"};

        //certJobMsmcVM.setValue("usr befre before saving", sfUMSSpecEn.getValue("usr"));
        //certJobMsmcVM.setValue("usrzh", sfUMSSpecEn.getValue("usrzh"));
        
        console.log("usr before saving: " + certJobMsmcVM.getValue("usr"));
        console.log("usrzh before saving: " + certJobMsmcVM.getValue("usrzh"));

        
    	if( certJobMsmcVM.getValue("form")==undefined || certJobMsmcVM.getValue("form")=="" || certJobMsmcVM.getValue("form")== null )
    	{
    		certJobMsmcVM.getItem("form").setValue("MSMC");
    		certJobMsmcVM.setValue("ver", "1.0");
            //certJobMsmcVM.setValue("beginDate", new Date());
    		if( sfMSMCInfoLhs.getValue("applicationDate") == null )
			{
    			sfMSMCInfoLhs.setValue("applicationDate", new Date());
			}
    	}
    	certJobMsmcVM.setValue("showEngineer", "1");
        
        certJobMsmcVM.saveData(function(dsResponse, data, dsRequest) {
            console.log("certJobMsmcVM.saveData() entered in common save function");
            var save_result = false;

            if (dsResponse.status == 0) {
            	save_result = true;
                if (!isNull(saveMode) && saveMode == 0) {
//                    isc.say(saveSuccessfulMessage);
//                    setSuggestedValForDeckEng();
//                    setTimeout(setInsuffMsmcHighlight, 300);
//                    setTankSpecReq();
//                    setCookSpecReq();
                    var record = {jobno: certJobMsmcVM.getValue("jobno")};
                    openMsmcCertRecDetail(record);

                	isc.confirm(saveSuccessfulMessage, function(){
                    },{ buttons : [Dialog.OK] });
                }

//                sfMSMCLhsPanel.setData(data.formlists);
//                setFormList(data);

//      			  			mmoDNDetailSectionForm_ToolBar.getButton('addFeeBtn').setDisabled(false);
//      			  			mmoDNDetailSectionForm_ToolBar.getButton('cancelDNBtn').setDisabled(false);

                //msmcToolBar.getButton('addSeafarerBtn').setDisabled(false);
            }
            if(callback_func)
        	{
            	callback_func(save_result, data);
        	}
            msmc_saving = false;
        }, requestParam);
    }
    else if (msmc_saving)
	{
		console.log("Rapid Saves!" );
		isc.say("System is busy. Please try again later.");
	}
    else
    {
		console.log("validation fail!" );
		isc.say("Validation failed. Please check input and try again.");
	}
}

function setAsPrinted() {
	//saveMsmcRec(1);
    certJobMsmcVM.setValue("printStatus", "Printed");
    saveMsmcRecord(1);
}


function cancelMsmcJobWindow() {
    console.log("cancelMsmcJobWindow()");

    //var msmc_cancel_title = 
	isc.TitleLabel.create({
        ID:"msmc_cancel_title",
        contents: "<p><b><font size=2px>Cancel Box <br /></font></b></p>"
    });

    //var msmc_cancel_FormDetail = 
	isc.ControlledDynamicForm.create({
        ID:"msmc_cancel_FormDetail",
        dataSource: "certJobMsmcDS",
        onControl: "MSMC_WRITE",
        width:"100%",
        numCols: 8,
        fields:
        [
            {name: "cancelReason", title:"", type: "textArea", startRow: true, rowSpan: 18, colSpan: 3, width: 750},
        ]
    });

    //var msmc_cancel_ToolBar = 
	isc.ButtonToolbar.create({
        ID:"msmc_cancel_ToolBar",
        buttons: [
            {name:"saveBtn", title:"Save", autoFit: true,
	            onControl: "MSMC_WRITE",
              click : function (){
                if(certJobMsmcVM.validate()){
                    var cancelReason = msmc_cancel_FormDetail.getItem("cancelReason").getValue();
                    if (isNull(cancelReason) || (cancelReason = cancelReason.trim()) == "") {
                        isc.say(nullMessage);
                        return;
                    }

                    var today = new Date();
                    //var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    //var dateTime = date+' '+time;

                    // alert(dateTime);
                    console.log("loginData.userId: " + loginData.userId);
                    certJobMsmcVM.setValue('lastEditPerson', loginData.userId);
                    certJobMsmcVM.setValue('lastEditDate', today);

                    certJobMsmcVM.setValue('status', 'Cancel');
                    certJobMsmcVM.setValue('cancelDate', today);
                    certJobMsmcVM.setValue('cancelReason', cancelReason);
                    certJobMsmcVM.setValue('cancelPerson', loginData.userId);

                    console.log("status: " + certJobMsmcVM.getValue("status"));
                    saveMsmcRecord(0, function(){
                        msmc_cancel_DetailWindow.hide();
                        MsmcDetailWindow.hide();
                        isc.say(cancelSuccessfulMessage);
                    });
//                    certJobMsmcVM.saveData(
//                        function (dsResponse, data, dsRequest){
//                            if (dsResponse.status==0){
//                                isc.say(cancelSuccessfulMessage);
//                                enabledSection(true);
//                            }
//                        }
//                    );
//
//                    msmc_cancel_DetailWindow.hide();
//                    MsmcDetailWindow.hide();
                }
              }
            },
            {name:"closeBtn", title:"Close", autoFit: true,
              click : function (){
                msmc_cancel_FormDetail.setValues({});
                msmc_cancel_FormDetail.setData({});
                msmc_cancel_FormDetail.reset();
                msmc_cancel_FormDetail.clearErrors(true);
                  //TODO

                msmc_cancel_DetailWindow.hide();
              }
            }
        ]
    });

    // show content start
    isc.Window.create({
        ID:"msmc_cancel_DetailWindow",
        title: 'Cancel Box',
        isModal: true, showModalMask: true,
        width: 800, height: 400, layoutMargin:10,
        items: [
            isc.VLayout.create({
                members:[
                    msmc_cancel_ToolBar,
                    msmc_cancel_title,
                    msmc_cancel_FormDetail
                ]
            })
        ]
    });
    msmc_cancel_DetailWindow.show();
}

function closeJobWindow(){

}

function enableCertJobShipDF(certJobShipDFObj, data){
	//if (!isNull(data[0].status) && (data[0].status.trim() == "Complete" || data[0].status.trim() == "Cancel")) {
	if (isNull(data) || isNull(data[0]) || isNull(data[0].status))
		return;
	if (data[0].status.trim() != "Process") {
		disableCertJobShipDFControls(certJobShipDFObj, true);
    }else{
    	disableCertJobShipDFControls(certJobShipDFObj, false);
    }
}

function disableCertJobShipDFControls(certJobShipDFObj, disable){
	if (isNull(certJobShipDFObj) || isNull(disable))
		return;
	var msmcShipInfoMemberArray = certJobShipDFObj.getItems();
	if (isNull(msmcShipInfoMemberArray))
		return;
	if (disable){
		console.log("status is Complete or Cancel, all disabled");
		msmcShipInfoMemberArray.forEach(function(arrayItem){
    		if (!isNull(arrayItem.name) && arrayItem.name != "expand_btn"){
    			arrayItem.disable();
    		}
    	});
	}else{
		console.log("status is Process, all enabled");
		msmcShipInfoMemberArray.forEach(function(arrayItem){
    		arrayItem.enable();
    	});
	}
	
	
}

function disableMsmcWindowControls(){
	var disable = false;
	if(certJobMsmcVM.getValue("status")!= null && certJobMsmcVM.getValue("status").trim() != "Process")
	{
		disable = true;
	}
	msmcToolBar.getButton("cancelJobBtn").Super("setDisabled", disable);
	//msmcToolBar.getButton("copySisterShipBtn").Super("setDisabled", disable);
	msmcToolBar.getButton("saveBtn").Super("setDisabled", disable);
	sfMSMCUpdate.Super("setDisabled", disable);
	
    //sfMSMCJobNo.setDisabled(disable);
    sfMSMCJobNo.getItem("cert_dept_code").setDisabled(disable);
    
	//sfSisterShip.setDisabled(disable);
	sfRecVLayoutMSMCAll.setDisabled(disable);
	msmcRemarkTab.setDisabled(disable);
	msmcReIssuanceDeclarAllCustom.setDisabled(disable);
	msmcSisterShipDeclarTab.setDisabled(disable);
	sfUMSSpecVLayout.setDisabled(disable);
	sfTankerSpecVLayout.setDisabled(disable);
	sfCookSpecVLayout.setDisabled(disable);
	
	if(certJobMsmcVM.getValue("status")!= null && certJobMsmcVM.getValue("status").trim() == "Complete")
	{
		changeIssueDateBtn.show();
	}
	else
	{
		changeIssueDateBtn.hide();
	}
}


function getMsmcRecJobNo(){
	console.log(sfMSMCJobNo.getValue("jobno"));
}



console.log("leave msmc.js");

