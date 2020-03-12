	var dsSelection = isc.DynamicForm.create({
	    width: 155,
	    height: 60,
	    align:"center",
		isGroup: true,
		layoutTopMargin:30,
		layoutLeftMargin:30,
		layoutRightMargin:20,
		groupTitle: "Audited Items",
		padding:10,
	    fields: [
	        {name:"selectDS", title:"", showTitle:false , type:"select",
	        	valueMap: ["Agent", "BCC CLC", "Certificate Code", "CompanyManagement", "CompanyManagement CSO", "CompanyManagement DOC",
	        	           "CompanyManagement DPA", "Company Owner", "Demise Charter", "DMLC", "Doc Audit", "Doc Cert Ship Type",
	        	           "Document Expect", "eCert", "Exemption Code", "Exemption Reason", "Exemption Condition",
	        	           "Incident", "Insurer", "Insurer Address", "ISM Audit", "MD Surveyor", "MSMC", "Passenger SubType Code", "Pollution Code", "Port Code",
	        	           "PSC", "PSC Acion", "PSC Definition", "RO", "Ship", "Ship Job No", "Ship Type", "HKmis Ship Type", "Work List"
	        	           ],
	            datasource: {
	            	"Agent": "companyRPHistory2DS",
	            	"BCC CLC": "certJobBccclcHistoryDS",
	            	"Certificate Code": "codeCertCodeHistoryDS",
	            	"CompanyManagement": "companyManagementHistoryDS",
		            "CompanyManagement CSO": "companyManagementCsoHistoryDS",
		            "CompanyManagement DOC": "companyManagementDocHistoryDS",
		            "CompanyManagement DPA": "companyManagementDpaHistoryDS",
		            "Company Owner": "companyOwnerCodeHistoryDS",
	            	"Demise Charter": "demiseCharterHistoryDS",
	            	"DMLC": "certJobDmlcHistoryDS",
	            	"Doc Audit": "docAuditHistoryDS",
	            	"Doc Cert Ship Type": "codeDocShipTypeHistoryDS",
	            	"Document Expect": "demiseCharterHistoryDS",
	            	"eCert": "eCertRecordHistoryDS",
	            	"Exemption Code": "ecertExemptionsCodeHistoryDS",
	            	"Exemption Reason": "ecertDicContentHistoryDS",
	            	"Exemption Condition": "ecertDicItemHistoryDS",
	            	"Incident": "incidentHistoryDS",
	            	"Insurer": "insurerHistoryDS",
	            	"Insurer Address": "insurerAddressHistoryDS",
	            	"ISM Audit": "ism_auditHistoryDS",
	            	"MD Surveyor": "codeMDSurveyorHistoryDS",
	            	"MSMC": "certJobMsmcHistoryDS",
	            	"Passenger SubType Code": "passengerShipSubTypeCodeHistoryDS",
	            	"Pollution Code": "PoL_CodeHistoryDS",
	            	"Port Code": "codePortHistoryDS",
	            	"PSC": "pscInspectionHistoryDS",
	            	"PSC Acion": "codePSCActionHistoryDS",
	            	"PSC Definition": "pscInspectionDefHistoryDS",
	            	"RO": "codeROHistoryDS",
	            	"Ship": "fsqcShipHistoryDS",
	            	"Ship Job No": "shipJobnoHistoryDS",
	            	"Ship Type": "shipTypeCodeHistoryDS",
	            	"HKmis Ship Type": "sptype_codeHistoryDS",
	            	"Work List": "worklistHistoryDS",
	            },
	            //changed: createAuditTable(.datasource[value], filterListGrid)
	        	//changed: "form.getField('department').setValueMap(item.datasource[value])"
	        }
	    ]
	});

	var _today = new Date();
	var _start = _today.getDate();
	var _month = _today.getMonth();
	var _year = _today.getFullYear();

	var criteriaSelection = isc.DynamicForm.create({
	    width: 200,
	    height: 80,
	    align:"center",
		isGroup: true,
		groupTitle: "Criteria",
		layoutTopMargin:30,
		layoutLeftMargin:30,
		layoutRightMargin:20,
		padding:10,
	    fields: [
	             {name:"userId", title:"User", type:"ComboBoxItem", optionDataSource:"userDS", valueField:"id", displayField:"id"},
	             {name:"changeDate_from", title:"Change Date(From)", type:"date", defaultValue:new Date(_year, _month, _start - 7)},
	             {name:"changeDate_to", title:"Change Date(To)", type:"date", defaultValue:new Date()}
	    ],
	    /*
	    initialCriteria: { _constructor: "AdvancedCriteria", operator: "and",
	        criteria: [
	            { fieldName: "changeDate_from", operator: "equals", value: { _constructor: "RelativeDate", value: "-1W" } }
	        ]
	    }
	    */
	});

	//criteriaSelection.getField("changeDate_from").setValue(new Date());


	var queryBtn = isc.IButton.create({
		  width:90,
		  align:"center",
		  layoutLeftMargin:0,
		  title:"Query",
		  click:function(){
			  			  
			  criteriaSelection.setValue("changeDate_from", new Date(criteriaSelection.getValue("changeDate_from")));
			  criteriaSelection.setValue("changeDate_to", new Date(criteriaSelection.getValue("changeDate_to")));			  

			  //console.log(dsSelection.getItem('selectDS').datasource[dsSelection.getValue('selectDS')]);
			  createAuditTable(dsSelection.getItem('selectDS').datasource[dsSelection.getValue('selectDS')], filterListGrid, criteriaSelection.getValues());

			  //createHistoryTable(demiseCharterHistoryDS);
		  }
	});

	var queryBtnGroup = isc.VLayout.create({
		height:"70",
		align:"center",
		members : [queryBtn]
	});

	var selectionbar = isc.HLayout.create({
		height:"180",
		membersMargin:20,
		members : [dsSelection, criteriaSelection, queryBtnGroup]
	});

	var filterListGrid = isc.FilterListGrid.create({
		height:"*",
	});

	var exportButtonsHLayout = isc.ButtonsHLayout.create({
		icon: "demand.png",
		members : [
			isc.IExportButton.create({
				title: "Export",
				width: 120,
				listGrid: filterListGrid
			})
		]
	});

	var resultUpVLayout = isc.VLayout.create({
		membersMargin:10,
		members : [selectionbar]
	});

	var resultDownVLayout = isc.VLayout.create({
		membersMargin:10,
		members : [filterListGrid, exportButtonsHLayout]
	});

	var sectionStackUp = isc.SectionStack.create({
		height:180,
		visibilityMode : "multiple",
		sections : [
				{title: "Search", expanded: true, resizeable: true, items:[resultUpVLayout]},
			]
	});

	var sectionStackDown = isc.SectionStack.create({
		visibilityMode : "multiple",
		sections : [
				{title: "Result", expanded: true, items:[resultDownVLayout]},
			]
	});

	var vlout = isc.VLayout.create({
		members : [sectionStackUp, sectionStackDown]
	});
