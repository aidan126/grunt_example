function getCertJobShip(i_fsqcShip, callback)
{
	var o_certJobShip = {};
	if(i_fsqcShip === Object(i_fsqcShip))  
	{

		o_certJobShip.spname 			= i_fsqcShip.Spname;
		o_certJobShip.imono				= i_fsqcShip.Imono;
		o_certJobShip.distinctNo		= i_fsqcShip.Regno;
//		shipTypeCodeDS.fetchData({ sptyp_cd: i_fsqcShip.Sptype }, "o_certJobShip.ship_jobno_sptype = data.sptyp_nam");
//		o_certJobShip.ship_jobno_sptype	= i_fsqcShip.Sptype_obj.sptyp_nam;
		o_certJobShip.registerDate		= i_fsqcShip.Regdate;
		o_certJobShip.gross				= i_fsqcShip.Gross;
		o_certJobShip.enginePower		= i_fsqcShip.engine;
		o_certJobShip.spclass			= i_fsqcShip.Cs;
		o_certJobShip.spnameCn			= i_fsqcShip.csname ;
		o_certJobShip.offno				= i_fsqcShip.Regno ;
		o_certJobShip.flag				= "Hong Kong, China";
		//o_certJobShip.stat				= i_fsqcShip. ;
		o_certJobShip.loa				= i_fsqcShip.length_ll;
		o_certJobShip.breadth			= i_fsqcShip.B ;
		o_certJobShip.dw				= i_fsqcShip.Dw ;
		o_certJobShip.depth				= i_fsqcShip.D ;
		o_certJobShip.net				= i_fsqcShip.Net ;
		o_certJobShip.tradingArea		= "WORLDWIDE";
		o_certJobShip.registryPort		= "HONG KONG";
		o_certJobShip.builder			= i_fsqcShip.Builder ;
		o_certJobShip.builtDate			= i_fsqcShip.Builtdate ;
//		o_certJobShip.manager			= i_fsqcShip.Manager_obj.Com_name ;
//		o_certJobShip.operator			= fsqcShipProfileManagerVM.getValue("Com_name");
//		o_certJobShip.owner				= i_fsqcShip.Owner;
		o_certJobShip.file_no			= i_fsqcShip.Fileno ;
		o_certJobShip.ship_jobno_sptype = i_fsqcShip.SR_SPTYPE;
	}

	companyManagementDS.fetchData(
		{Com_cd: i_fsqcShip.Manager} 
		, function(dsResponse, data, dsRequest)
		{
			if(data.length > 0)
			{
				o_certJobShip.manager = data[0].Com_name;
				o_certJobShip.operator = data[0].Com_name;
			}

			companyOwnerCodeDS.fetchData(
				{Owner_cd: i_fsqcShip.Owner} 
				, function(dsResponse, data, dsRequest)
				{
					console.log("Owner:");
					console.log(data);
					if(data.length > 0)
					{
						o_certJobShip.owner = data[0].Owner_des;
						/*** for BCC/CLC ***/
						o_certJobShip.owner_name1 = data[0].Owner_des;
						o_certJobShip.address1 = data[0].add1;
						o_certJobShip.address2 = data[0].add2;
						o_certJobShip.address3 = data[0].add3;
					}

					callback( o_certJobShip );
				}
			);
		}
	);
}

function certJobShipDF(df_id, valueMan, editControl, requiredFieldsArr){
 
	var shipDF = isc.ControlledDynamicForm.create({
		ID:df_id,
		//dataSource: "certJobMsmcResultSet",
		//dataSource: "hkCertDS",
//		dataSource: "certJobMsmcDS",
	/* 00001 - Start Add */
		valuesManager:valueMan,
		onControl: editControl,
	/* 00001 - End Add */	
		isGroup: "true",
		groupTitle: "Ship Information",
	    //autoFetchData: true,
		numCols: 8,
	    autoDraw: false,
		//width:sfMSMCRhsPanelWidth,
	    width:"100%",
	    //colWidths:["*","*","*","*","*","*","*","*"],
	    //overflow:"auto",
		cellPadding:2,
		fields: [

	        //--------------for reading data from DB--------------
			//{name: "shipInfoSpName", id:"shipInfoSpName",	title:"Name of Ship:", wrapTitle:false,startRow: true, colSpan: 3, width: 250},
			{name: "spname", 	title:"Name of Ship:", wrapTitle:false,startRow: true, colSpan: 3
				//, width: (sfMSMCRhsPanelWidth/2-80)
				, width: "100%"
//				, required: true
				// , type:"ComboBoxItem", optionDataSource:"fsqcShipDS", displayField:"Imono", valueField:"Imono",
				//   type: 'ComboBoxItem',
				//   optionDataSource: 'fsqcShipDS',
				//   displayField: 'Imono',
				//   valueField: 'Imono',
				//   pickListFields: [{ name: 'Imono' }, { name: 'Regno' }, { name: 'Spname' }],
				//   pickListWidth: 500,
				//   pickListProperties: {
				//         showFilterEditor: true
				//     },
				//   changed: function(form, item, value) {
				//         var record1 = item.getSelectedRecord();
				//         if (record1 != null) {
				//             if (confirm('Overwrite with latest Ship Information?')) {
				//                 getCertJobShip(record1, function(certJobShip) {
				//                     var DfData = shipDF.getData();
				//                     Object.assign(DfData, certJobShip);
				//                     shipDF.setData(DfData);
				//                 });
				//             }
				//         }
				//         //			            	counter = counter + 1;
				//     }
			},
			{name: "imono", title:"IMO NO.:",	wrapTitle:false,startRow: false, colSpan: 1
	            //, width: 120
//				, required: true
				, type:"ComboBoxItem", optionDataSource:"fsqcShipDS", displayField:"Imono", valueField:"Imono"
				, pickListFields:[
		              {name:"Imono"}
		              ,{name:"Regno"}
		              ,{name:"Spname"}
		          ]
		        , pickListWidth:500
		        , pickListProperties: {
		            showFilterEditor:true		            
		        }
		        , changed: function(form, item, value){
		        	var record1 = item.getSelectedRecord();
	            	if(record1!=null ){
	            		if(confirm("Overwrite with latest Ship Information?"))
	            		{
	            			getCertJobShip(record1, function(certJobShip){
		            			var DfData = shipDF.getData();
		            			Object.assign(DfData, certJobShip);
		            			shipDF.setData(DfData);
		            		});
	            				
	            		}
	            		
	        		}
//	            	counter = counter + 1;
		        },
			},
			{name: "distinctNo", title:"Official No:",	wrapTitle:false,startRow: false, endRow: true,colSpan: 1
	            //, width: 120
	        },
//			{name: "offno", title:"Official No:", wrapTitle:false, startRow: false, endRow: true, colSpan: 1
//	            //, width: 120, title:"no need"
//	        },

			{name: "ship_jobno_sptype", id:"shipInfoSpType2", title:"Type of Ship:",	wrapTitle:false,startRow: true, colSpan: 3
	            //, width: (sfMSMCRhsPanelWidth/2-80)
	        	, width: "100%"
				, type:"ComboBoxItem", optionDataSource:"sptype_codeDS", displayField:"sptype_name", valueField:"sptype_name"
					, pickListFields:[
			              {name:"sptype_name"}
//			              ,{name:"remark"}
			          ],
			          pickListWidth:350,
	        },

			//{name: "shipInfoRegisterDate", title:"Register Date:", type:"datetime", datetimeFormatter: "toEuropeanShortDate", wrapTitle:false,startRow: false, colSpan: 1, width: 120
			//{name: "shipInfoRegisterDate", title:"Register Date:", type:"date", wrapTitle:false,startRow: false, colSpan: 1, width: 120
			//{name: "shipInfoRegisterDate", title:"Register Date:", type:"date", format:"dd MMM yyyy", useTextField:true, wrapTitle:false,startRow: false, colSpan: 1, width: 120
	        {name: "registerDate", title:"Register Date:", type:"date", useTextField:true, wrapTitle:false,startRow: false, textAlign:"center", colSpan: 1
	            //, width: 120
	            ,change:function(){

	                //this.setValue("31/12/1970");
	            }
	        },
			//{name: "shipInfoRegisterDate", title:"Register Date:", type:"staticText", format: "dd MMMM yyyy"              , wrapTitle:false,startRow: false, colSpan: 1, width: 120},

			{name: "tradingArea", title:"Trading Area:",	wrapTitle:false,startRow: false, colSpan: 1
	            , width: 150
				, type:"ComboBoxItem"
	        },
			{name: "gross", 	title:"GT:", type:"float", format:",0", wrapTitle:false,startRow: true, colSpan: 1
	            //, width: 120
//				, required: true
	        },
			{name: "enginePower", title:"PP:", type:"float", format:",0", align:true, wrapTitle:false,startRow: false, colSpan: 1
	            //, width: 120
	        },
			{name: "spclass", title:"Class:",	wrapTitle:false, startRow: false, colSpan: 1
	            //, width: 120
				, type:"ComboBoxItem", optionDataSource:"codeRODS", displayField:"Cs_cd", valueField:"Cs_cd"
					, pickListFields:[
			              {name:"Cs_cd"}
			              ,{name:"Cs_name"}
			              ,{name:"hide"}
			          ]
			          , optionCriteria:{
			        	  hide:"2"
			          }

			          , pickListWidth:350,

	        },
			{name: "registryPort", title:"Port of Registry:",	wrapTitle:false,startRow: false, colSpan: 1
	            //, width: 120
	        },
			{name: "operator", 	title:"Operator:",	startRow: true, colSpan: 6
	            , width: 550
				, type:"ComboBoxItem", optionDataSource:"companyManagementDS", displayField:"Com_name", valueField:"Com_name",
					 pickListFields:[
						{name:"Com_name"}
						,{name:"imo_comno"}
			              ,{name:"Com_fileno"}
			          ],
			          pickListWidth:650,
					  sortField: "Com_name",
					  sortDirection: "ascending",
			          
	        },
			{
		    	name: "expand_btn",
		    	title:"More >>>", type:"button", showTitle:false, startRow: false, colSpan: 1, width: 100,
				click : function () {
					var ShipInfo_expand = shipDF.getItem('ShipInfo_expand');
					var ShipInfo_btn = shipDF.getItem('expand_btn');
					if(ShipInfo_expand.sectionExpanded)
					{
						ShipInfo_expand.collapseSection();
						this.setTitle("More >>>");
					}
					else
					{
						ShipInfo_expand.expandSection();
						ShipInfo_btn.setTitle("<<< Less");
					}
				}
			},

			{
		    	name: "ShipInfo_expand", 	
				defaultValue:"Ship Info", 
				startRow: false, 
				width: 100,
				type:"section", sectionExpanded:false, visible: false, hidden: true,
				itemIds:[
					"spnameCn",
					"spacer1",
					"flag",
					"stat",
					"loa",
					"breadth",
					"dw",
					"depth",
					"net",
					"builder",
					"builtDate",
					"manager",
					"owner",
				],
			},
			{name: "spnameCn", wrapTitle:true, startRow: false, colSpan: 3, width: "*"
	            //, title:"no need"
	        },
	        {name: "spacer1", type: "SpacerItem", wrapTitle:false, startRow: false, colSpan: 2
	            //, title:"no need"
	        },
	        
			{name: "flag", wrapTitle:false, startRow: false, colSpan: 1
	            //, width: 120, title:"no need"
				, type:"ComboBoxItem", optionDataSource:"countryOrFlagCodeDS", displayField:"Countryname", valueField:"Countryname"
					, editorProperties : { sortField:"Countryname" }
					, pickListFields:[
			              {name:"Countryname"}
//			              ,{name:"Com_name"}
//			              ,{name:"Com_fileno"}
			          ],
			          pickListWidth:350,
	        },
			{name: "stat", wrapTitle:false, startRow: false, colSpan: 1
	            //, width: 120, title:"no need"
	        },
			{name: "loa", wrapTitle:false, startRow: false, colSpan: 1
	            //, width: 120, title:"no need"
	        },
			{name: "breadth", wrapTitle:false, startRow: false, colSpan: 1
	            //, width: 120, title:"no need"
	        },
			{name: "depth", wrapTitle:false, startRow: false, colSpan: 1
	            //, width: 120, title:"no need"
	        },
			{name: "dw", wrapTitle:false, startRow: false, colSpan: 1
	            //, width: 120, title:"no need"
	        },
			{name: "net", wrapTitle:false, startRow: false, colSpan: 1
	            //, width: 120, title:"no need"
	        },
			{name: "builder", wrapTitle:false, startRow: false, colSpan: 1
	            //, width: 120, title:"no need"
	        },
			{name: "builtDate", wrapTitle:false, startRow: false, colSpan: 1
	            //, width: 120, title:"no need"
	        },
			{name: "manager", wrapTitle:false, startRow: false, colSpan: 7, width: "*"
	            //, title:"no need"
				, type:"ComboBoxItem", optionDataSource:"companyManagementDS", displayField:"Com_name", valueField:"Com_name"
					, pickListFields:[
			              {name:"imo_comno"}
			              ,{name:"Com_name"}
			              ,{name:"Com_fileno"}
			          ],
			          pickListWidth:650,
	        },
			{name: "owner", wrapTitle:false, startRow: false, colSpan: 7, width: "*"
	            //, title:"no need"
				, type:"ComboBoxItem", optionDataSource:"companyOwnerCodeDS", displayField:"Owner_des", valueField:"Owner_des"
					, pickListFields:[
			              {name:"Owner_des"}
//			              ,{name:"Com_name"}
//			              ,{name:"Com_fileno"}
			          ],
			          pickListWidth:650,
	        },
		]
	});
	
//	var allFields = shipDF.getAllFields();
	
	var req_arr = [];
	req_arr = req_arr.concat(requiredFieldsArr);

	console.log(req_arr);
	for(var i = 0; i < req_arr.length; i++) {
		var reqField = shipDF.getField(req_arr[i]);
		if(reqField != null){
			reqField.setRequired( true );
		}
		else
		{
		}
	}

	return shipDF;
}