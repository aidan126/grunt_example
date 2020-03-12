hkcertCodeListView = createTreeGrid();
viewLoader.setView(hkcertCodeListView);
hkcertCodeListView.getMember(0).setData(isc.Tree.create({
			ID:"codeListTree",
			modelType: "children",
	        nameProperty: "categoryName",
	        childrenProperty: "sub",
				root:{sub:[
//				    {categoryName:"[FSQC] General",
				    {categoryName:"Code Tables",
				    	sub: [
				    	      {categoryName:"[FSQC] Ship Type Code",js:"js/fsqcdb_code/shipTypeCode.js",title:"[FSQC] Ship Type Code",  enabled: hasAccess("CODE_FSQC_SPTYPE_READ|CODE_FSQC_SPTYPE_WRITE|CODETABLE_ALL") }
				    	      , {categoryName:"[FSQC] Passenger Ship SubType Code",js:"js/fsqcdb_code/passengerShipSubTypeCode.js",title:"[FSQC] Passenger Ship SubType Code",  enabled: hasAccess("CODE_FSQC_SP_SUBTYPE_READ|CODE_FSQC_SP_SUBTYPE_WRITE|CODETABLE_ALL")}
				    	      , {categoryName:"[FSQC] Recognized Organisation", js:"js/ro/codeRO.js",title:"[FSQC] Recognized Organisation",  enabled: hasAccess("CODE_RO_READ|CODE_RO_WRITE|CODETABLE_ALL")}
				    	      , {categoryName:"[FSQC] Class Status Code",js:"js/fsqcdb_code/codeClassStatus.js",title:"[FSQC] Class Status Code",  enabled: hasAccess("CODE_RO_STATUS_READ|CODE_RO_STATUS_WRITE|CODETABLE_ALL")}
						      , {categoryName:"[FSQC] Certificate Code", js:"js/fsqcdb_code/codeCertCode.js",title:"[FSQC] Certificate Code",  enabled: hasAccess("CODE_FSQC_SP_CERT_READ|CODE_FSQC_SP_CERT_WRITE|CODETABLE_ALL")}
				    	      , {categoryName:"[FSQC] Country or Flag Code",js:"js/fsqcdb_code/countryOrFlagCode.js",title:"[FSQC] Country or Flag Code",  enabled: hasAccess("CODE_COUNTRY_READ|CODE_COUNTRY_WRITE|CODETABLE_ALL")}
				    	      , {categoryName:"[FSQC] HKMD Surveyors",js:"js/fsqcdb_code/codeMDSurveyor.js",title:"[FSQC] HKMD Surveyors",  enabled: hasAccess("CODE_MDSUREYORS_READ|CODE_MDSUREYORS_WRITE|CODETABLE_ALL")}
				    	      , {categoryName:"[FSQC] Survey Type Code",js:"js/fsqcdb_code/surTypeCode.js",title:"[FSQC] Survey Type Code",  enabled: hasAccess("CODE_SURVEY_TYPE_READ|CODE_SURVEY_TYPE_WRTIE|CODETABLE_ALL")}
				    	      , {categoryName:"[FSQC] Doc Cert. Ship Type",js:"js/fsqcdb_code/codeDocShipType.js",title:"[FSQC] Doc Cert. Ship Type",  enabled: hasAccess("CODE_DOCSPTYPE_READ|CODE_DOCSPTYPE_WRITE|CODETABLE_ALL")}
				    	      , {categoryName:"[FSQC] Deficiency Code",js:"js/fsqcdb_code/codeDef.js",title:"[FSQC] Deficiency Code",  enabled: hasAccess("CODE_DEFICIENCY_READ|CODE_DEFICIENCY_WRITE|CODETABLE_ALL")}
				    	      , {categoryName:"[FSQC] PSC Action Code",js:"js/fsqcdb_code/codePSCAction.js",title:"[FSQC] PSC Action Code",  enabled: hasAccess("CODE_PSC_ACTION_READ|CODE_PSC_ACTION_WRITE|CODETABLE_ALL")}
				    	      , {categoryName:"[FSQC] SSRS Status Code",js:"js/fsqcdb_code/codeCosInfoState.js",title:"[FSQC] SSRS Status Code",  enabled: hasAccess("CODE_SSRS_STATUS_READ|CODE_SSRS_STATUS_WRITE|CODETABLE_ALL")}
				    	      , {categoryName:"[FSQC] Exemption Cert Signature",js:"js/fsqcdb_code/codeExemptionCertIssue_UI.js",title:"[FSQC] Exemption Cert Signature", enabled: hasAccess("CODE_EXEMPT_CERT_SIGN_READ|CODE_EXEMPT_CERT_SIGN_WRITE|CODETABLE_ALL") }
				    	      , {categoryName:"[HKCert] Ship Type Code", 	js:"js/hkmis_cert/sptype_code.js",title:"[HKCert] Ship Type Code",  enabled: hasAccess("CODE_HKCERT_SP_TYPE_READ|CODE_HKCERT_SP_TYPE_WRITE|CODETABLE_ALL")}
							  , {categoryName:"[HKCert] Edit Insurer Data",js:"js/hkmis_cert/insurer.js",title:"[HKCert] Edit Insurer Data",  enabled: hasAccess("INSURER_READ|INSURER_WRITE|CODETABLE_ALL") }
							  , {categoryName:"[HKCert] Preset Data for BCC/CLC",js:"js/hkmis_cert/hkcertPresetBCC.js",title:"[HKCert] Preset Data for BCC/CLC", enabled: hasAccess("BCCCLC_PRESET_DATA_READ|BCCCLC_PRESET_DATA_WRITE|CODETABLE_ALL") }

			             ]
				    }
					,{categoryName:"Companies",sub: [
						{categoryName:"[FSQC] Representative Person",js:"js/fsqcdb_code/companyRP.js",title:"[FSQC] Representative Person",  enabled: hasAccess("CODE_REP_PER_READ|CODE_REP_PER_WRITE|CODETABLE_ALL")}
						, {categoryName:"[FSQC] Demise Charter Code",js:"js/fsqcdb_code/demiseCharter.js",title:"[FSQC] Demise Charter Code",  enabled: hasAccess("CODE_DEMISE_CHARTER_READ|CODE_DEMISE_CHARTER_WRITE|CODETABLE_ALL")}
					    , {categoryName:"[FSQC] Shipping Owners",js:"js/fsqcdb_code/companyOwnerCode.js",title:"[FSQC] Shipping Owners",  enabled: hasAccess("CODE_SHIP_OWNERS_READ|CODE_SHIP_OWNERS_WRITE|CODETABLE_ALL")}
					]},

					,{categoryName:"Incident Code Tables",sub: [
						{categoryName:"[FSQC] Environmental Code",js:"js/fsqcdb_incident/environmental_code.js",title:"[FSQC] Environmental Code",  enabled: hasAccess("CODE_ENVIRONMENT_READ|CODE_ENVIRONMENT_WRITE|CODETABLE_ALL")}
						, {categoryName:"[FSQC] External Object Code",js:"js/fsqcdb_incident/external_object_code.js",title:"[FSQC] External Object Code",  enabled: hasAccess("CODE_EXTOBJ_READ|CODE_EXTOBJ_WRITE|CODETABLE_ALL")}
					    , {categoryName:"[FSQC] Incident Type Code",js:"js/fsqcdb_incident/incident_type_code.js",title:"[FSQC] Incident Type Code",  enabled: hasAccess("CODE_INCIDENTTYPE_READ|CODE_INCIDENTTYPE_WRITE|CODETABLE_ALL")}
					    , {categoryName:"[FSQC] Pollution Type Code",js:"js/fsqcdb_incident/pollution_type_code.js",title:"[FSQC] Pollution Type Code",  enabled: hasAccess("CODE_POLLUTIONTYPE_READ|CODE_POLLUTIONTYPE_WRITE|CODETABLE_ALL")}
					    , {categoryName:"[FSQC] Weather Code",js:"js/fsqcdb_incident/weather_code.js",title:"[FSQC] Weather Code",  enabled: hasAccess("CODE_WEATHER_READ|CODE_WEATHER_WRITE|CODETABLE_ALL")}
					]},

//					{categoryName:"[HKCert] Configuration"
//						, sub:[
//						    {categoryName:"[HKCert] Edit Insurer Data",js:"js/hkmis_cert/insurer.js",  enabled: hasAccess("INSURER_READ|INSURER_WRITE")},
//							{categoryName:"[HKCert] Maintain Type of Ship Code", 		js:"js/hkmis_cert/sptype_code.js"},
////				    	      {categoryName:"Cert Management",js:"js/hkmis_cert/hkcertCertManagement.js",},
//				    	    {categoryName:"[HKCert] Preset Data for BCC",js:"js/hkmis_cert/hkcertPresetBCC.js", enabled: hasAccess("BCCCLC_PRESET_DATA")},
//						]
//					},
					,{categoryName:"System",sub: [
						{categoryName:"User Management",js:"js/code/staff.js",title:"User Management",  enabled: hasAccess("SYS_USER_READ|SYS_USER_WRITE|CODETABLE_ALL")}
						,{categoryName:"Role Maintenance",js:"js/code/role.js",title:"Role Maintenance",  enabled: hasAccess("SYS_USER_RESET_PWD|SYS_ROLEMAN_READ|SYS_ROLEMAN_WRITE|CODETABLE_ALL")}
						,{categoryName:"Department",js:"js/code/userCertDept.js",title:"Department",  enabled: hasAccess("CODE_DEPT_READ|CODE_DEPT_WRITE|CODETABLE_ALL")}
						,{categoryName:"User Access Log",js:"js/code/userAccessLog.js",title:"User Access Log",  enabled: hasAccess("SYS_USERLOG_READ|CODETABLE_ALL")}
						,{categoryName:"System Parameters",js:"js/fsqcdb_code/systemParameters.js",title:"System Parameters",  enabled: hasAccess("SYS_PARAMETERS_READ|SYS_PARAMETERS_WRITE|CODETABLE_ALL")}
						,{categoryName:"Audit Log",js:"js/fsqcdb_code/auditLog.js",title:"Audit Log",  enabled: hasAccess("SYS_AUDITLOG_READ|CODETABLE_ALL")}
						,{categoryName:"About FSQCMIS", script:"open_aboutWindow();"}
					]},
					,{categoryName:"Exemption Email",sub: [
					    {categoryName:"[FSQC] Testing Mode On/Off",js:"js/fsqcdb_code/ecertAlarmSet.js",title:"[FSQC] Testing Mode On/Off",  enabled: hasAccess("EXEMPT_EMAIL_MODE_READ|EXEMPT_EMAIL_MODE_WRITE|FSQC_ALL")}
					    ,{categoryName:"[FSQC] Exemption Email Template",js:"js/fsqcdb_code/ecertSendmailInfo.js",title:"[FSQC] Exemption Email Template",  enabled: hasAccess("EXEMPT_EMAIL_TEMPLATE_READ|EXEMPT_EMAIL_TEMPLATE_WRITE|FSQC_ALL")}
					]},
					,{categoryName:"RO Submission",sub: [
					    {categoryName:"[ROSubm] Data Dictionery",js:"js/ro/roDataDict.js",title:"[ROSubm] Data Dictionery",  enabled: hasAccess("RO_DATADICTIONERY_READ|RO_DATADICTIONERY_WRITE|RO_ALL")},
					    {categoryName:"RO Certificate",js:"js/ro/roCert.js",title:"RO Certificate",  enabled: hasAccess("RO_CERTIFICATE_READ|RO_CERTIFICATE_WRITE|RO_ALL")},
					    {categoryName:"RO Certificate Type",js:"js/ro/roCertType.js",title:"RO Certificate Type",  enabled: hasAccess("RO_CERTIFICATETYPE_READ|RO_CERTIFICATETYPE_WRITE|RO_ALL")}

					]},
//				    ,{categoryName:"Under construction...",
//				    	sub: [
//				    		{categoryName:"Operator",js:"js/hkmis_cert/operator.js"}
//				    		,{categoryName:"Operator2",js:"js/hkmis_cert/operator2.js"}
////							,{categoryName:"Type of Ship Code",js:"js/mmo/rec.js"}
//				    		,{categoryName:"Type of Role Code",js:"js/hkmis_cert/hkcertRoleCode.js"}
//				    	]
//				    }
/*
				    ,{categoryName:"Insurer",js:"js/hkmis_cert/insurer.js"}
				    ,{categoryName:"Operator",js:"js/hkmis_cert/operator.js"}
				    ,{categoryName:"Operator2",js:"js/hkmis_cert/operator2.js"}
				    ,{categoryName:"Type of Ship Code",js:"js/mmo/rec.js"}
				    ,{categoryName:"Type of Role Code",js:"js/hkmis_cert/hkcertRoleCode.js"}
				    ,{categoryName:"[FSQC] Class Status Code",js:"js/fsqcdb_code/codeClassStatus.js"}
				    ,{categoryName:"[FSQC] Particulars of Shipping Owners",js:"js/fsqcdb_code/companyOwnerCode.js"}
				    ,{categoryName:"[FSQC] Certificate Code",js:"js/fsqcdb_code/codeCertCode.js"}
*/
				           /*
					{categoryName:"fsqc Parameter",js:"js/code/fsqc_parameter.js",},
					{categoryName:"First Registration Fee",js:"js/code/first_rec_fee.js",},
					{categoryName:"Fee Code",js:"js/code/fee_code.js",},
					{categoryName:"Ship Type Code",js:"js/code/ship_type_code.js",},
					{categoryName:"Operation Type",js:"js/code/operation_type.js",},
					{categoryName:"Transaction Code",js:"js/code/trans_code.js",},
					{categoryName:"Reason Code",js:"js/code/reason_code.js",},
					{categoryName:"Mortgage Remark",js:"js/code/mortgage_remark.js",},
					{categoryName:"Class Society",js:"js/code/class_soc.js",},
					{categoryName:"Country Code",js:"js/code/country_code.js",},
					{categoryName:"Group Owner Code",js:"js/code/group_owner_code.js",},
					{categoryName:"Lawyer Information",js:"js/code/lawyer_info.js",},
					{categoryName:"Ship Manager",js:"js/code/ship_manager.js",},
					{categoryName:"Finance Company",js:"js/code/finance_company.js",},
					{categoryName:"Registrar",js:"js/code/registrar.js",},
					{categoryName:"Clinic Code",js:"js/code/clinic_code.js",},
					{categoryName:"English Offensive Word",js:"js/code/eng_offensive_word.js",},
					{categoryName:"Chinese Offensive Word",js:"js/code/chn_offensive_word.js",},
					{categoryName:"Document Remark",js:"js/code/doc_remark.js",},
					{categoryName:"Document Checklist",js:"js/code/doc_checklist.js",},
					{categoryName:"Maintain Seafarer Rank",js:"js/code/mmo_rank.js",},
					{categoryName:"Maintain Seafarer Nationality",js:"js/code/mmo_nationality.js",},
					{categoryName:"Province Name Maintenance",js:"js/code/province_name.js",},
					{categoryName:"Seafarer Certificate Name Maintenance",js:"js/code/mmo_certificate_name.js",},
					{categoryName:"Seafarer Certificate Issuing Authority Name Maintenance",js:"js/code/mmo_certificate_issue_authority_name.js",},
					{categoryName:"Seafarer Training Course Maintenance",js:"js/code/mmo_training_course.js",},
					*/
				]}}));

//codeListTreeClicked = true;

hkcertCodeListView.getMember(0).data.openAll();

/*
codeListTree.getRoot().addProperties({
	nodeClick:function(){
		isc.say("hi");
	}
});
*/
/*
codeListTree.get(0).addProperties({click:function(){
	initialOperatorWindow("Operating Company");
}});
*/




