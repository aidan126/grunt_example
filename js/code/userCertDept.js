createCodeTable2(userCertDeptDS, 
	[
		{ name: "cert_dept_id"}, 
		{ name: "cert_dept_code"},
		{ name: "cert_dept_name"}
	],
	[
//		{ name: "cert_dept_id" }, 
		{ name: "cert_dept_code"},
		{ name: "cert_dept_name"}
	],
	["cert_dept_id", "cert_dept_code"], 'paged','CODE_DEPT_WRITE|CODETABLE_ALL');