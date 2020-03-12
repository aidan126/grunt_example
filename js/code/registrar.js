createCodeTable2(registrarDS,[
	{name:"id", width:100},
	{name:"name1", width:200},
	{name:"name2"}
],[
	{name:"id", type: "staticText"},
	{name:"name1", required: true, width:300},
	{name:"name2"}
],["id"]);