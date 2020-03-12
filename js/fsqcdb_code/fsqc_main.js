fsqcView = createTreeGrid();
viewLoader.setView(fsqcView);
fsqcView.getMember(0).setData(
	isc.Tree.create
	(
		{
            ID:"fsqcNavTree",
	        modelType: "children",
	        nameProperty: "categoryName",
	        childrenProperty: "sub",
			root:
			{sub:[
					{
						categoryName:"Ship"
						, title:"Particulars of Ship"
						, js:"js/fsqcdb_ship/fsqcShipMain.js"
						, enabled: hasAccess("FSQC_ALL|FSQCSHIP_READ")
						, sub:[
				          {categoryName:"Particulars", title:"Particulars of Ship", js:"js/fsqcdb_ship/fsqcShipMain.js", enabled: hasAccess("FSQC_ALL|FSQCSHIP_READ"),},
						]
					},
					{
						categoryName:"Management Company"
						, title:"Particulars of Management Company"
						, js:"js/fsqcdb_code/companyManagement.js"
						, enabled: hasAccess("FSQC_ALL|MANCOMP_READ")
						, sub:[
				          {categoryName:"Particulars", title:"Particulars of Management Company", js:"js/fsqcdb_code/companyManagement.js", enabled: hasAccess("FSQC_ALL|MANCOMP_READ")},
						]
					},
//					{categoryName:"Configuration", sub:[
//					      {categoryName:"Certificate Code", js:"js/fsqcdb_code/codeCertCode.js",},
//					],},

					{
						categoryName:"Exemptions"
						, js:"js/fsqcdb_exemptions/fsqcExemptionsMain.js"
						, title:"Exemption and Dispensation"
						, enabled: hasAccess("FSQC_ALL|EXEMPT_CODE_READ|EXEMPT_READ")
						, sub:[
				          {categoryName:"Exemption and Dispensation", js:"js/fsqcdb_exemptions/fsqcExemptionsMain.js", enabled: hasAccess("FSQC_ALL|EXEMPT_READ")},
                          //{categoryName:"Trend of Exemption Certificate", js:"js/fsqcdb_exemptions/trendOfExemptionsCert.js",},
				          {categoryName:"Code Table", title:"Exemption and Dispensation", js:"js/fsqcdb_exemptions/fsqcExemptionsMain.js", script:"openExemptionCode();", enabled: hasAccess("FSQC_ALL|EXEMPT_CODE_READ")},
				          {categoryName:"Exemption Email History", title:"Exemption and Dispensation", js:"js/fsqcdb_code/ecertSendmailResult.js", enabled: hasAccess("FSQC_ALL|EXEMPT_EMAIL_HISTORY_READ")},
						]
					},
					{
				        categoryName:"Batch Input"
				        , sub:[
				        	{
				        		categoryName:"PSC Inspection Data Import", js:"js/fsqcdb_ship/fsqcShipPSCExcelImport.js", title:"PSC Inspection Data Import", enabled: hasAccess("FSQC_ALL|FSQCSHIP_WRITE_PSC_INSP")
				        	},
				        ]
					},
					{
				        categoryName:"Reports"
				        , sub:[
				        	{
				        		categoryName:"eMail Address Extraction", js:"js/fsqcdb_ship/emailExtraction.js", title:"eMail Address Extraction", enabled: hasAccess("FSQC_ALL|EMAIL_EXTRACTION_READ")
				        	},
				        ]
					},
				]
			}

		}
	)
);

fsqcView.getMember(0).data.openAll();
fsqcView.getMember(0).setWidth(250);

//hkmisCertTree.selectRecord("Add BCC");
while (fsqcView.getMember(1).getMember(0)) {
	var m = fsqcView.getMember(1).getMember(0);
	m.destroy();
	console.log( "fsqcView.getMember(1): member destroyed@. \r\n" );
}

fsqcjs = isc.ViewLoader.create(
		{
//			viewURL:"js/fsqcdb_code/companyManagement.js"
			viewURL:"js/fsqcdb_ship/fsqcShipMain.js"
			, viewLoaded:function(view)
			{
				//hkcertAllCertSearchToolBar.getButton('searchBtn').click();
			}
		}
);

//fsqcjs.setViewURL("js/mmo/stop_list.js");

fsqcView.getMember(1).addMember(isc.TitleLabel.create({contents: "<p><b><font size=3px>Particulars of Ship</font></b></p>"}));
fsqcView.getMember(1).addMember(fsqcjs);



console.log("fsqcView.getMember(0): \r\n"+fsqcView.getMember(0));
console.log("fsqcView.getMember(0).getMember(1): \r\n"+fsqcView.getMember(0).getMember(1));




//isc.say(view.getMember(0));
//

//isc.say(view.getMember(0));

//hkmisCertTree.getMember(0)




