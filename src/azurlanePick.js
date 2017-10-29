var ownList = [];
var ddList = [5,6,7,8,9,10,11,13,14,15,16,17,18,19,26,27,28,29,81,82,83,86,87,88,89,90,91,92,94,101,102,103,155,159,161,162,163,164,165,167,168,170,171,176,233,236,263,264,265,266,267,269,271,272,295,299,300,301,306];
var clList = [29,30,31,32,33,34,35,36,37,104,105,106,114,115,116,117,179,182,183,187,238,239,240,241,257,258,259,262,303]
var caList = [39,40,41,42,43,44,45,49,119,120,121,122,123,124,125,126,190,191,192,193,196,197,200,201,202,242,244,245]
var bcList = [127,128,129,248,249]
var bbList = [52,53,54,55,58,59,65,130,131,132,133,135,208,209,210,211,251]
var cvlList= [70,71,72,75,140,142,220,222]
var cvList = [73,74,76,77,78,144,145,148,224,225,226,227,228,229,252]
var bmList = [149,150]
var arList = [80,232]
var allList = ddList.concat(clList,caList,bcList,bbList,cvlList,cvList,bmList,arList);
var imgWidth = 100;
var imgHeight = 100;

function init()
{
	for(var i=0;i<307;i++) ownList[i]=0;
	LoadSelectPicture();
	/*//bubble sort
	var i=0,j=0,temp;
	for (i = 0; i < allList.length - 1; i++)
		for (j = 0; j < allList.length - 1 - i; j++)
			if (allList[j] > allList[j + 1]) {
				temp = allList[j];
				allList[j] = allList[j + 1];
				allList[j + 1] = temp;
			}*/
}
function ChangeBGColor(line,color)
{
	var bgId = "#"+line+"BG";
	var bg = d3.select(bgId).attr("fill",color);
	
	/*
	//一開始寫來測試新增用
	var svgId = "#"+line+"SVG";
	var svg = d3.select(svgId);
	var group = svg.append("g");

	var x = imgWidth/2;
	var y = 150/2-imgHeight/2;//height/2 - imgHeight/2

	group.attr("onclick","RemoveElement(this)");
	group.append("svg:image")
	.attr('x', x)
	.attr('y', y)
	.attr('width', imgWidth)
	.attr('height', imgHeight)
	.attr("xlink:href", "./img/001.jpg")
	.attr("border-radius",10)
	.attr("clip-path","url(#clip)");*/
	/*
	//顯示等級用
	group.append("svg:rect")
	.attr('x', x)
	.attr('y', parseInt(y)+height )
	.attr('width', width)
	.attr('height', 20)
	.attr('rx', 10)
	.attr('ry', 10)
	.attr('stroke', "black")
	.attr("fill", "#EEEEEE");
	group.append("text")
	.attr('x', x+25)
	.attr('y', parseInt(y)+parseInt(height)+20)
	.attr('color','#FFFFFF')
	.text("LV 100");*/		
}
function RemoveElement(element)
{
	d3.select(element).remove();
}
function OwnOrNot(element)
{
	var fullLink = d3.select(element).attr("xlink:href");
	fullLink = fullLink.slice(6);
	fullLink = fullLink.slice(0,3);
	fullLink = parseInt(fullLink);	
	var op = d3.select(element).attr("opacity");
	if(op == 0.3)
	{
		ownList[fullLink] = 1;
		op = 1;		
	} 
	else
	{
		if(addCharacterModeOn)//新增角色
		{
			var numberOfLine = addTargetSVG.node().childNodes.length-2;
			if(addTargetSVG.attr("id")=="deafaultLineSVG") numberOfLine-=2;			
			var x;
			var y;
			var picLink = d3.select(element).attr("xlink:href");

			if(numberOfLine==0)
			{
				x = imgWidth/2;
				y = 150/2-imgHeight/2;
			}
			else
			{
				x = imgWidth/2 + (numberOfLine%11)*(parseInt(imgWidth)+10);
				y = 150/2-imgHeight/2 + (parseInt(numberOfLine/11))*(parseInt(imgHeight)+10);
				if( numberOfLine%11==0 && numberOfLine)
				{
					addTargetSVG.attr("height",parseInt(y+100)+imgHeight/2);
				}
			}
			var group = addTargetSVG.append("g");
			group.append("svg:image")
			.attr('x', x)
			.attr('y', y)
			.attr('width', imgWidth)
			.attr('height', imgHeight)
			.attr("xlink:href", picLink)//"./img/001.jpg"
			.attr("onclick","RemoveElement(this.parentNode)")
			.attr("opacity",op);
		}
		else
		{
			ownList[fullLink] = 0;
			op=0.3;			
		}		
	}	
	d3.select(element).attr("opacity",op);
	updateOwnText(ownList);
}
function LoadSelectPicture()
{		
	var svgId = "#selectViewSVG";
	var svg = d3.select(svgId);	
	clearSVGContent("selectViewSVG");
	var background = d3.select("#selectViewBG");
	var svgHeight = d3.select(svgId).attr("height");

	var imgWidth = 100;
	var imgHeight = 100;
	var initX = imgWidth/2;
	var initY = 150/2-imgHeight/2;//height/2 - imgHeight/2
	var x = initX;
	var y = initY;
	
	var selectionTag = document.getElementById("filterTag");
	var chosenList;
	if(selectionTag.value == "all") chosenList=allList;
	else if(selectionTag.value == "dd")	chosenList=ddList;
	else if(selectionTag.value == "cl")	chosenList=clList;
	else if(selectionTag.value == "ca")	chosenList=caList;
	else if(selectionTag.value == "bc")	chosenList=bcList;
	else if(selectionTag.value == "bb")	chosenList=bbList;
	else if(selectionTag.value == "cvl")chosenList=cvlList;
	else if(selectionTag.value == "cv")	chosenList=cvList;
	else if(selectionTag.value == "bm")	chosenList=bmList;
	else if(selectionTag.value == "ar")	chosenList=arList;
	else	chosenList="errorList"

	if(chosenList!="errorList")
	{
		x = initX;
		y = initY;
		var i=0;
		while(i<chosenList.length)
		{
			var number = chosenList[i];
			var picLink = 	"./img/";
			if( number<10 )	number="00"+number;
			else if( number<100) number = "0"+number;
			picLink=picLink+number+".jpg";

			var op;
			if( ownList[parseInt(number)]>0) op=1;
			else op=0.3;

			var group = svg.append("g");
			group.append("svg:image")
			.attr('x', x)
			.attr('y', y)
			.attr('width', imgWidth)
			.attr('height', imgHeight)
			.attr("xlink:href", picLink)//"./img/001.jpg"
			.attr("border-radius",10)
			.attr("onerror","RemoveElement(this.parentNode)")
			.attr("onclick","OwnOrNot(this)")
			.attr("opacity",op);
			x = x+imgWidth+10; 
			var selectViewSVGWidth = d3.select("#selectViewSVG").attr("width");
			if(x+imgWidth>selectViewSVGWidth)
			{
				y=y+imgHeight+10;
				x=initX;
				svgHeight = d3.select(svgId).attr("height");
				var tempSVGHeight = parseInt(svgHeight) + parseInt(imgHeight) + 10;
				svg.attr("height",tempSVGHeight);
				background.attr("height",tempSVGHeight);
			}
			i++;			
		}
	}	
}
function saveJSONFile()
{	
	var jsonData = 
	{
		"ownList":ownList,
		/*"deafaultLine":
		{
			"name":d3.select("#deafaultLineName").text(),
			"backgroundColor":d3.select("#deafaultLineBGC").attr("value"),
			"characters":charList,
		},*/
	}

	var lineAllDiv = d3.select(lineView).selectAll("div");
	var charList = [];
	var lineID ;
	for(var j=0; j<lineAllDiv[0].length;j++)//所有的line
	{
		lineID = d3.select(lineAllDiv[0][j]).attr("id");
		var linesvg = d3.select(lineAllDiv[0][j]).selectAll("svg");
		var charInLine = d3.select(linesvg[0][0]).selectAll("g");
		for(var i in charInLine[0])
		{
			if(charInLine[0][i].tagName=="g")
			{
				var image = d3.select(charInLine[0][i]).selectAll("image");
				var number = d3.select(image[0][0]).attr("xlink:href");
				number = number.slice(6);
				number = number.slice(0,3)
				number = parseInt(number);
				charList.push(number);
			}
		}
		var lineName = "#"+lineID+"Name";
		var lineBG = "#"+lineID+"BG";
		jsonData[lineID]={"name":d3.select(lineName).text(),
			"backgroundColor":d3.select(lineBG).attr("fill"),
			"characters":charList};
		charList=[];
	}

	var jsonFinData = JSON.stringify(jsonData);
	var name = "azurlane_record.txt";
	var type = "text/plain"
    var a = document.createElement("a");
    var file = new Blob([jsonFinData], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
/*//舊的
function saveJSONFile() {
	var jsonData = JSON.stringify(ownList);
	var name = "test.txt";
	var type = "text/plain"
    var a = document.createElement("a");
    var file = new Blob([jsonData], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}*/
var loadJSONFile = function(event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function(){
	        var text = reader.result;
	        var oldData = JSON.parse(text);
	        for(var key in oldData) {
			    var item = oldData[key];
			    if(key =="ownList") ownList = oldData[key];
			    else if(key=="deafaultLine")//讀取資料到預設行
			    {
			    	d3.select("#deafaultLineBGC").node().value=oldData[key]["backgroundColor"];
			    	d3.select("#deafaultLineBG").attr("fill",oldData[key]["backgroundColor"]);
			    	d3.select("#deafaultLineName").text(oldData[key]["name"]);
			    	//匯入角色
					var oldcharacterList = oldData[key]["characters"];
					var addtoSVG = d3.select("#deafaultLineSVG");
			    	for(var characterNo=0;characterNo<oldcharacterList.length;characterNo++)
					{
						var x;
						var y;						
						var number = oldcharacterList[characterNo];
						var picLink = 	"./img/";

						if( number<10 )	number="00"+number;
						else if( number<100) number = "0"+number;
						picLink=picLink+number+".jpg";
						var op;
						if( ownList[parseInt(number)]>0) op=1;
						else op=0.3;

						if(characterNo==0)
						{
							x = imgWidth/2;
							y = 150/2-imgHeight/2;
						}
						else
						{
							x = imgWidth/2 + (characterNo%11)*(parseInt(imgWidth)+10);
							y = 150/2-imgHeight/2 + (parseInt(characterNo/11))*(parseInt(imgHeight)+10);
							if( characterNo%11==0 && characterNo)
							{
								addtoSVG.attr("height",parseInt(y+100)+imgHeight/2);
							}
						}
						var group = addtoSVG.append("g");
						group.append("svg:image")
						.attr('x', x)
						.attr('y', y)
						.attr('width', imgWidth)
						.attr('height', imgHeight)
						.attr("xlink:href", picLink)//"./img/001.jpg"
						.attr("onclick","RemoveElement(this.parentNode)")
						.attr("opacity",op);
					}
			    } 
			    else//新增行
			    {
			    	//創建行
			    	var lineView = d3.select("#lineView");
					var lineID = key;
					var lineIDName = lineID+"Name";
					var lineBGC = lineID+"BGC"
					var lineDiv = lineView.append("div").attr("id",lineID);
					customLine+=1;
					var lineName = oldData[key]["name"];
					lineDiv.append("text")
						.attr("contentEditable","true")
						.attr("style","font-size:20pt")
						.attr("size","15")
						.attr("id",lineIDName)
						.text(lineName);
					lineDiv.append("input")
						.attr("type","color")
						.attr("value",oldData[key]["backgroundColor"])
						.attr("id",lineBGC)
						.attr("onchange","ChangeBGColor(this.parentNode.id,this.value)")
						.attr("style","margin:5px");
					lineDiv.append("button")
						.text("削除")
						.attr("onclick","RemoveElement(this.parentNode)")
						.attr("style","margin:5px");
					lineDiv.append("br")
					var lineSVGID = lineID+"SVG";
					var lineSVG = lineDiv.append("svg")
						.attr("id",lineSVGID) 
						.attr("width","1300")
						.attr("height","150");

					var lineBGID = lineID+"BG";
						lineSVG.append("svg:rect")
						.attr("id",lineBGID) 
						.attr("width","1300")
						.attr("height","150")
						.attr("stroke","black")
						.attr("stroke-width","5pt")
						.attr("fill",oldData[key]["backgroundColor"])
						.attr("onclick","addCharacterMode(this.parentNode.id)");
					//匯入角色
					var oldcharacterList = oldData[key]["characters"];
					var addtoSVG = d3.select("#"+lineSVGID);
					for(var characterNo=0;characterNo<oldcharacterList.length;characterNo++)
					{
						var x;
						var y;						
						var number = oldcharacterList[characterNo];
						var picLink = 	"./img/";

						if( number<10 )	number="00"+number;
						else if( number<100) number = "0"+number;
						picLink=picLink+number+".jpg";
						var op;
						if( ownList[parseInt(number)]>0) op=1;
						else op=0.3;

						if(characterNo==0)
						{
							x = imgWidth/2;
							y = 150/2-imgHeight/2;
						}
						else
						{
							x = imgWidth/2 + (characterNo%11)*(parseInt(imgWidth)+10);
							y = 150/2-imgHeight/2 + (parseInt(characterNo/11))*(parseInt(imgHeight)+10);
							if( characterNo%11==0 && characterNo)
							{
								addtoSVG.attr("height",parseInt(y+100)+imgHeight/2);
							}
						}
						var group = addtoSVG.append("g");
						group.append("svg:image")
						.attr('x', x)
						.attr('y', y)
						.attr('width', imgWidth)
						.attr('height', imgHeight)
						.attr("xlink:href", picLink)//"./img/001.jpg"
						.attr("onclick","RemoveElement(this.parentNode)")
						.attr("opacity",op);
					}					
			    }
			}
	        /*
	        for(var i =0;i<ownList.length;i++)
	        {
	        	ownList[i]=oldData[i];
	        }*/
	        //刷新當前畫面選單
	        updateOwnText(ownList);
	        LoadSelectPicture();
        };
        reader.readAsText(input.files[0]);        
    };

function updateOwnText( targetList )
{
	var total = allList.length;
	var own = 0 ;
	for(var i=0;i<targetList.length;i++)
	{
		if(targetList[i]!=0) own=own+1;
	}	
	var ownText = document.getElementById("ownText");
	var ownPercent;
	if( parseInt(own)==0) ownPercent=0;
	else ownPercent= own/total*100;
	ownPercent = ownPercent.toFixed(2);
	ownText.innerText="【全キャラ: " +own +" / "+ total +"】【所有率: "+ ownPercent + " %】"
}

function clearSVGContent(svgId)
{
	var targetSVG = document.getElementById(svgId);
	var allChild = targetSVG.children;

	while(allChild.length>1)
	{
		for(var i in allChild)
		{
			if(allChild[i].id!="selectViewBG") RemoveElement(allChild[i]);
		}
	}
	var idString = "#"+svgId;
	var svg = d3.select(idString);
	var svgBG = d3.select(selectViewBG);
	svg.attr("height","150")
	   .attr("width","1300");
	svgBG.attr("height","150")
	   .attr("width","1300");
}
var addCharacterModeOn=false;
var addTargetSVG;//要加東西的SVG
function addCharacterMode(svgId)
{
	if(document.getElementById("selectRect"))
	{
		if(svgId==document.getElementById("selectRect").parentNode.id)
		{
			addCharacterModeOn=!addCharacterModeOn;			
		}
		else
		{
			d3.select("#selectRect").remove();
		}
	}
	else
	{
		addCharacterModeOn=!addCharacterModeOn;
	}
	
	if(addCharacterModeOn)
	{
		var SVGDom = document.getElementById(svgId);
		svgId = "#"+svgId;
		addTargetSVG = d3.select(svgId);
		var width = addTargetSVG.attr("width")*0.95;
		var height = addTargetSVG.attr("height")*0.8;
		var x = addTargetSVG.attr("width")*0.025;
		var y = addTargetSVG.attr("height")*0.1;

		d3.select(svgId).append("svg:rect")
		.attr("width",width)
		.attr("height",height)
		.attr("x",x)
		.attr("y",y)
		.attr("fill","None")
		.attr("stroke","red")
		.attr("stroke-width","10")
		.attr("id","selectRect");
	}
	else
	{
		d3.select("#selectRect").remove();
	}
}
var customLine = 0;
function addNewLine()
{
	var lineView = d3.select("#lineView");
	var lineID = "customLine"+customLine;
	var lineIDName = lineID+"Name";
	var lineBGC = lineID+"BGC"
	var lineDiv = lineView.append("div").attr("id",lineID);
	customLine+=1;
	var lineName = "第"+(customLine+1)+"艦隊"
	lineDiv.append("text")
		.attr("contentEditable","true")
		.attr("style","font-size:20pt")
		.attr("size","15")
		.attr("id",lineIDName)
		.text(lineName);
	lineDiv.append("input")
		.attr("type","color")
		.attr("value","#FFFFFF")
		.attr("id",lineBGC)
		.attr("onchange","ChangeBGColor(this.parentNode.id,this.value)")
		.attr("style","margin:5px");
	lineDiv.append("button")
		.text("削除")
		.attr("onclick","RemoveElement(this.parentNode)")
		.attr("style","margin:5px");
	lineDiv.append("br")
	var lineSVGID = lineID+"SVG";
	var lineSVG = lineDiv.append("svg")
		.attr("id",lineSVGID) 
		.attr("width","1300")
		.attr("height","150");

	var lineBGID = lineID+"BG";
		lineSVG.append("svg:rect")
		.attr("id",lineBGID) 
		.attr("width","1300")
		.attr("height","150")
		.attr("stroke","black")
		.attr("stroke-width","5pt")
		.attr("fill","#FFFFFF")
		.attr("onclick","addCharacterMode(this.parentNode.id)");
}
init();