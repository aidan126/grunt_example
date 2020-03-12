hkmisCertView = createTreeGrid();
viewLoader.setView(hkmisCertView);
hkmisCertView.getMember(0).setData(
	isc.Tree.create
	(
		{
            ID:"hkmisCertTree",
	        modelType: "children",
	        nameProperty: "categoryName",
	        childrenProperty: "sub",
			root:
			{
				sub:
					[
//						     {categoryName:"Seafarer Registration Maintenance",
//						    	 sub:[ {categoryName:"Maintain Seafarer Record", js:"js/mmo/sf/rec.js",},],
//						     },
					//{categoryName:"Current Certificate", sub:[
						//{categoryName:"All", 	js:"js/mmo/current_cert.js"},
	                    //{categoryName:"All", 	js:"js/mmo/all_cert.js"},
						{
							categoryName:"Certificate Jobs"
							, title:"Current Work"
							, js:"js/hkmis_cert/all_cert.js"
							, sub:[
			                    {categoryName:"Current Work", 	js:"js/hkmis_cert/all_cert.js",title:"Current Work", enabled: hasAccess("BCC_READ|CLC_READ|MSMC_READ|DMLC_READ")},
			                    {categoryName:"Pending Check", 	js:"js/hkmis_cert/all_cert.js",title:"Pending Check", script:"supervisorSeacrhMode = true;", enabled: hasAccess("SUPERVISOR_READ")},
			                    {categoryName:"Add BCC",	js:"js/hkmis_cert/all_cert.js",title:"Add BCC", script:"addBccclcCert(null, ['BCC']);",  enabled: hasAccess("BCC_WRITE")},
								{categoryName:"Add CLC", 	js:"js/hkmis_cert/all_cert.js",title:"Add CLC", script:"addBccclcCert(null, ['CLC']);", enabled: hasAccess("CLC_WRITE")},
								{categoryName:"Add MSMC", 	js:"js/hkmis_cert/all_cert.js",title:"Add MSMC", script:"openMsmcCertRecDetail(null);", enabled: hasAccess("MSMC_WRITE")},
								{categoryName:"Add DMLC-I", 	js:"js/hkmis_cert/all_cert.js", title:"Add DMLC-I",script:"openDmlcCertRecDetail(null);", enabled: hasAccess("DMLC_WRITE")},
							]
							, enabled: hasAccess("BCC_READ|CLC_READ|MSMC_READ|DMLC_READ")
						},
						{categoryName:"Basic Data"
							, sub:[
							    {categoryName:"Batch Print",js:"js/hkmis_cert/batch_print.js",title:"Batch Print",  enabled: hasAccess("BCC_PRINT|CLC_PRINT")}
							]
						},
						{categoryName:"Query"
							, sub:[
			                    {categoryName:"BCC/CLC Statistic", js:"js/hkmis_cert/bccclc_statistic.js",title:"BCC/CLC Statistic", enabled: hasAccess("BCC_READ|CLC_READ")},
			                    {categoryName:"MSMC Statistic", 	js:"js/hkmis_cert/msmc_stat.js",title:"MSMC Statistic", enabled: hasAccess("MSMC_READ")},
			                    {categoryName:"DMLC Part I Monthly Report", js:"js/hkmis_cert/dmlc_monthly_report.js",title:"DMLC Part I Monthly Report", enabled: hasAccess("DMLC_READ")},
			                    {categoryName:"History of Work", 	js:"js/hkmis_cert/all_cert.js",title:"History of Work", script:"msmcCalledFrHistoryOfWork = true;", enabled: hasAccess("BCC_READ|CLC_READ|MSMC_READ|DMLC_READ")},
								{categoryName:"Number of Completed Certificate", js:"js/hkmis_cert/numberCompleteCert.js",title:"Number of Completed Certificate"},
							]
						},
//						{categoryName:"Configuration"
//							, sub:[
//								{categoryName:"Maintain Type of Ship Code", 		js:"js/hkmis_cert/sptype_code.js"},
////					    	      {categoryName:"Cert Management",js:"js/hkmis_cert/hkcertCertManagement.js",},
//					    	      {categoryName:"Preset Data for BCC",js:"js/hkmis_cert/hkcertPresetBCC.js", enabled: hasAccess("BCCCLC_PRESET_DATA")},
//							]
//						},


				]
			}
		}
	)
);

hkmisCertView.getMember(0).data.openAll();

//hkmisCertTree.selectRecord("Add BCC");
while (hkmisCertView.getMember(1).getMember(0)) {
	var m = hkmisCertView.getMember(1).getMember(0);
	m.destroy();
	console.log( "hkmisCertView.getMember(1): member destroyed@. \r\n" );
}

bccjs = isc.ViewLoader.create(
		{
			viewURL:"js/hkmis_cert/all_cert.js"
			, viewLoaded:function(view)
			{
				console.log("all before clicking searchBtn in all_cert.js: ");
//				hkcertAllCertSearchToolBar.getButton('searchBtn').click();
				console.log("all before hkcertAllCertUserProfile.fetchData: ");
			}
		}
);

//bccjs.setViewURL("js/mmo/stop_list.js");

hkmisCertView.getMember(1).addMember(isc.TitleLabel.create({contents: "<p><b><font size=3px>Current Work</font></b></p>"}));
hkmisCertView.getMember(1).addMember(bccjs);



console.log("hkmisCertView.getMember(0): \r\n"+hkmisCertView.getMember(0));
console.log("hkmisCertView.getMember(0).getMember(1): \r\n"+hkmisCertView.getMember(0).getMember(1));




//isc.say(view.getMember(0));
//

//isc.say(view.getMember(0));

//hkmisCertTree.getMember(0)




