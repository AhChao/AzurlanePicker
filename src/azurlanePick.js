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

		group.attr("onclick","removeElement(this)");
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
	function removeElement(element)
	{
		d3.select(element).remove();
	}