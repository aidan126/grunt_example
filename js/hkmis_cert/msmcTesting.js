createCodeTable2(certJobMsmcDS,
	[
		{name: "jobno", title: "jobno", width:80},
		{name: "form", title: "form", width:80},
//		{name: "imono", title: "imono", width:80},
		{name: "ship_jobno_id", title: "imono", width:80},
		{name: "nautical_date", title: "nautical_date", width:80},
		{name: "issuance", title: "issuance", width:80},
		{name: "spname", title: "spname", width:80}




	 /*
	 //	{name: "id", title: "id", width:80},
		{name: "jobno", title: "jobno", width:80},
		{name: "prepareDate", title: "prepareDate", width:80},
		{name: "shipId", title: "shipId", width:80},
		{name: "nauticalSurveyor", title: "nauticalSurveyor", width:100}
*/
	 	/*
		{ name: "id", width:30},
		{ name: "nameEn", width: 200},
		{ name: "address", width: 300},
		{ name: "nameCn", width: 200},
		{ name: "linkMan", width: 120},
		{ name: "tel", width: 80},
		{ name: "phone", width: 80},
		{ name: "email", width: 150},
		{ name: "zipcode", width: 80}
		*/
		//,{ name: "remark"}
	],
	[

//		{ name: "id", type: "staticText"},
		{ name: "jobno"},
		{ name: "form"},
//        { name: "imono"},
        { name: "ship_jobno_id"},
        { name: "nautical_date"},
        { name: "issuance"},
        { name: "spname"}

        /*
        ,
		{ name: "tel", length:8},
		{ name: "phone", length:8},
        { name: "email", length:40},
		{ name: "zipcode", length:5},
		{ name: "address", colSpan:4, required: true, width:500, length:160}
		*/

        //{ name: "address", required: true},
	],
	["jobno"], 'paged');