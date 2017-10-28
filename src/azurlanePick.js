var ownList = [];
var ddList = [5,6,7,8,9,10,11,13,14,15,16,17,18,19,26,27,28,29,30,31,32,33,34,35,36,37,39,40,41,42,43,44,45,49,52,53,54,55,58,59,65,70,71,72,73,74,75,76,77,78,80,81,82,83,86,87,88,89,90,91,92,94,101,102,103,104,105,106,114,115,116,117,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,135,140,142,144,145,148,149,150,155,159,161,162,163,164,165,167,168,170,171,176,179,182,183,187,190,191,192,193,196,197,200,201,202,208,209,210,211,220,222,224,225,226,227,228,229,232,233,236,238,239,240,241,242,244,245,248,249,251,252,257,258,259,262,263,264,265,266,267,272,295,299,300,301,303,306];

function init()
{
	for(var i=0;i<307;i++) ownList[i]=0;
}

function ChangeBGColor(line,color)
{
	var bgId = "#"+line+"BG";
	var bg = d3.select(bgId).attr("fill",color);
	
	var svgId = "#"+line+"SVG";
	var svg = d3.select(svgId);
	var group = svg.append("g");

	var width = 100;
	var height = 100;
	var x = width/2;
	var y = 150/2-height/2;//height/2 - imgHeight/2

	group.attr("onclick","RemoveElement(this)");
	group.append("svg:image")
	.attr('x', x)
	.attr('y', y)
	.attr('width', width)
	.attr('height', height)
	.attr("xlink:href", "./img/001.jpg")
	.attr("border-radius",10)
	.attr("clip-path","url(#clip)");
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
	.text("LV 100");		
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
		ownList[fullLink] = 0;
		op=0.3;
	}	
	d3.select(element).attr("opacity",op);
	updateOwnText(ownList);
}
function LoadSelectPicture()
{	
	var svgId = "#selectViewSVG";
	var svg = d3.select(svgId);	
	var background = d3.select("#selectViewBG");
	var svgHeight = d3.select(svgId).attr("height");

	var width = 100;
	var height = 100;
	var initX = width/2;
	var initY = 150/2-height/2;//height/2 - imgHeight/2
	var x = initX;
	var y = initY;
	
	var selectionTag = document.getElementById("filterTag");
	console.log(selectionTag.value);
	var chosenList;
	if(selectionTag.value == "alll")
	{			
		//doSomeThing		
	}
	else if(selectionTag.value == "dd")
	{
		chosenList=ddList;
	}
	else
	{
		chosenList="errorList"
	}
	if(chosenList!="errorList")
	{
		x = initX;
		y = initY;
		var i=0;
		console.log(chosenList.length);
		while(i<chosenList.length)
		{
			var number = chosenList[i];
			var picLink = 	"./img/";
			if( number<10 )	number="00"+number;
			else if( number<100) number = "0"+number;
			picLink=picLink+number+".jpg";

			var op;
			if( ownList[number]>0) op=1;
			else op=0.3

			var group = svg.append("g");
			group.append("svg:image")
			.attr('x', x)
			.attr('y', y)
			.attr('width', width)
			.attr('height', height)
			.attr("xlink:href", picLink)//"./img/001.jpg"
			.attr("border-radius",10)
			.attr("onerror","RemoveElement(this)")
			.attr("onclick","OwnOrNot(this)")
			.attr("opacity",op);
			x = x+width+10; 
			if(x+width>1000)
			{
				y=y+height+10;
				x=initX;
				svgHeight = d3.select(svgId).attr("height");
				var tempSVGHeight = parseInt(svgHeight) + parseInt(height) + 10;
				svg.attr("height",tempSVGHeight);
				background.attr("height",tempSVGHeight);
			}
			i++;			
		}
	}	
}
function saveJSONFile() {
	var jsonData = JSON.stringify(ownList);
	var name = "test.txt";
	var type = "text/plain"
    var a = document.createElement("a");
    var file = new Blob([jsonData], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
var loadJSONFile = function(event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function(){
	        var text = reader.result;
	        console.log(reader.result);
	        var oldOwnList = JSON.parse(text);
	        for(var i =0;i<ownList.length;i++)
	        {
	        	ownList[i]=oldOwnList[i];
	        }
	        //刷新當前畫面選單
	        updateOwnText(ownList);
        };
        reader.readAsText(input.files[0]);        
    };

function updateOwnText( targetList )
{
	var total = targetList.length-1;
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
	ownText.innerText="【持有數: " +own +" / "+ total +"】【持有率: "+ ownPercent + " %】"
}

init();