class vertex{
    constructor(name, posx, posy){
        this.name = name;
        this.adjacents = [];
        this.x = posx;
        this.y = posy;
    }

    AddNewAdjacent(adjacent)
    {
        this.adjacents.push(adjacent);
    }
	
	RemoveAdjacent(adjacent)
	{
		var index = -1;
		var count = 0;
		for(let adj of this.adjacents)
		{
			if(adj.name == adjacent.name)
			{
				index = count;
			}
			count++;
		}
		if(index != -1)
		{
			this.adjacents.splice(index);
		}
	}
}

class edge{
    constructor(v1, v2, val){
        this.vertex1 = v1;
        this.vertex2 = v2;
        this.value = val;
        this.name = v1.name + "->" + v2.name;
		this.x = (v2.x + v1.x) / 2;
		this.y = (v2.y + v1.y) / 2;
    }
}

class graph{                                                                                                                                                                                                                                                                                                                          
    constructor()
    {
        this.vertices = [];
        this.edges = [];
    }

    AddNewVertex(vertex)
    {
        this.vertices.push(vertex);
    }

    AddNewEdge(ver1, ver2)
    {
        if(!this.IsEdgeInGraph(ver1, ver2))
        {
            ver1.AddNewAdjacent(ver2);
            this.edges.push(new edge(ver1, ver2, 1));
        }
    }

    IsEdgeInGraphByName(name)
    {
        for(let edg of this.edges)
        {
            if(edg.name == name)
            {
                return true;
            }
        }
        return false;
    }

    IsEdgeInGraph(ver1, ver2)
    {
        for(let edg of this.edges)
        {
            if((edg.vertex1.name == ver1.name) && (edg.vertex2.name == ver2.name))
            {
                return true;
            }
        }
        return false;
    }

    IsVertexInGraph(name)
    {
        for(let ver of this.vertices)
        {
            if(ver.name == name)
            {
                return true;
            }
        }
        return false;
    }

    FindVertexByName(name)
    {
        for(let ver of this.vertices)
        {
            if(ver.name == name)
            {
                return ver;
            }
        }
		return null;
    }

    IndexOfVertex(ver)
    {
        for(let i = 0; i < this.vertices.length; i++)
        {
            if(ver.name == this.vertices[i].name)
            {
                return i;
            }
        }
        return -1;
    }

    IndexOfEdge(edg)
    {
        for(let i = 0; i < this.edges.length; i++)
        {
            if(edg.name == this.edges[i].name)
            {
                return i;
            }
        }
        return -1;
    }

    RemoveEdge(edg)
    {
        var index = this.IndexOfEdge(edg);
        if(index > -1)
        {
            this.edges.splice(index, 1);
			edg.vertex1.RemoveAdjacent(edg.vertex2);
        }
    }

    RemoveVertex(ver)
    {
        for(let edg of this.edges)
        {
            if(edg.vertex1.name == ver.name || edg.vertex2.name == ver.name)
            {
                this.RemoveEdge(edg);
            }
        }
        var index = this.IndexOfVertex(ver);
        if(index > -1)
        {
            this.vertices.splice(index, 1);
        }
    }
}

class pos{
    constructor()
    {
        this.x = 0;
        this.y = 0;
    }
}

class dijkstra{
	constructor(graph, startvertex)
	{
		this.distance = [];
		this.predecessor = [];
		this.vertices = [];
		this.Q = [];
		this.shortestpaths = [];
		this.Init(graph, startvertex);
		this.DijkstraCalculation(graph, startvertex);
		for(let i in this.vertices)
		{
			this.shortestpaths.push(this.ShortestPath(this.vertices[i]));
		}
	}
	
	ShortestPath(endvertex)
	{
		var path = [];
		path.push(endvertex);
		var u = endvertex;
		var index = this.FindIndexOfVertex(endvertex);
		while(this.predecessor[index] != null)
		{
			u = this.predecessor[index];
			path.unshift(u);
			index = this.FindIndexOfVertex(u);
		}
		return path;
	}
	
	DijkstraCalculation(graph, startvertex)
	{
		while(this.Q.length > 0)
		{
			var index = this.FindVertexWithSmallestDistanceInQ();
			if(index == -1)
			{
				return 0;
			}
			var u = this.Q[index];
			this.Q.splice(index, 1);
			for(let i in u.adjacents)
			{
				if(this.IsInQ(u.adjacents[i]))
				{
					this.DistanceUpdate(u, u.adjacents[i], graph);
				}
			}
		}
	}
	
	DistanceUpdate(u, v, graph)
	{
		var alt = this.distance[this.FindIndexOfVertex(u)] + this.FindWeightingOfEdge(u, v, graph);
		if(alt < this.distance[this.FindIndexOfVertex(v)])
		{
			this.distance[this.FindIndexOfVertex(v)] = alt;
			this.predecessor[this.FindIndexOfVertex(v)] = u;
		}
	}
	
	FindWeightingOfEdge(u, v, graph)
	{
		for(let i in graph.edges)
		{
			if(graph.edges[i].vertex1.name == u.name && graph.edges[i].vertex2.name == v.name)
			{
				return graph.edges[i].value;
			}
		}
		return -1;
	}
	
	Init(graph, startvertex)
	{
		for(let i in graph.vertices)
		{
			if(graph.vertices[i].name == startvertex.name)
			{
				this.distance.push(0);
			}
			else
			{
				this.distance.push(Number.MAX_VALUE);
			}
			this.predecessor.push(null);
			this.vertices.push(graph.vertices[i]);
			this.Q.push(graph.vertices[i]);
		}
	}
	
	FindVertexWithSmallestDistanceInQ()
	{
		var dist = Number.MAX_VALUE;
		var index = -1;
		var count = 0;
		for(let ver in this.Q)
		{
			var i = this.FindIndexOfVertex(this.Q[ver]);
			if(this.distance[i] < dist)
			{
				index = count;
				dist = this.distance[i];
			}
			count++;
		}
		return index;
	}
	
	FindIndexOfVertex(vertex)
	{
		var index = 0;
		for(let ver in this.vertices)
		{
			if(this.vertices[ver].name == vertex.name)
			{
				return index;
			}
			index++;
		}
		return -1;
	}
	
	IsInQ(vertex)
	{
		for(let ver in this.Q)
		{
			if(this.Q[ver].name == vertex.name)
			{
				return true;
			}
		}
		return false;
	}

	Print1(startvertex)
	{
		var lines = [];
		var index = 0;
		lines.push(">>> [dijkstra]");
		lines.push(">>> startvertex: " + startvertex.name);
		for(let ver of this.vertices)
		{
			lines.push(">>> -----------------------------------------------------------------------");
			lines.push(">>> vertex: " + ver.name);
			if(this.distance[index] == Number.MAX_VALUE)
			{
				lines.push(">>> distance: -");
				lines.push(">>> predecessor: -");
				lines.push(">>> shortest path: -");
			}
			else
			{
			lines.push(">>> distance: " + this.distance[index]);
			if(this.predecessor[index] != null)
			{
				lines.push(">>> predecessor: " + this.predecessor[index].name);
			}
			else
			{
				lines.push(">>> predecessor: " + "-");
			}
			var path = this.shortestpaths[index];
			var out = [];
			out.push(">>> shortest path:");
			var i = 0;
			for(let v of path)
			{
				var str = " ";
				str += out[i];
				if(str.length + v.name.length + 3 <= 75)
				{
					out[i] += " | " + v.name;
				}
				else
				{
					i++;
					out.push(">>>     " + v.name );
				}
			}
			for(let line of out)
			{
				lines.push(line);
			}
			}
			index++;
		}
		return lines;
	}

    Print2(startvertex, endvertex)
    {
        var lines = [];
		lines.push(">>> [dijkstra]");
		lines.push(">>> startvertex: " + startvertex.name);
        var index = this.FindIndexOfVertex(endvertex);
		lines.push(">>> endvertex: " + endvertex.name);
        if(this.distance[index] == Number.MAX_VALUE)
		{
			lines.push(">>> distance: -");
			lines.push(">>> predecessor: -");
			lines.push(">>> shortest path: -");
		}
        else
        {
            lines.push(">>> distance: " + this.distance[index]);
			if(this.predecessor[index] != null)
			{
				lines.push(">>> predecessor: " + this.predecessor[index].name);
			}
			else
			{
				lines.push(">>> predecessor: " + "-");
			}
            var path = this.shortestpaths[index];
			var out = [];
			out.push(">>> shortest path:");
			var i = 0;
			for(let v of path)
			{
				var str = " ";
				str += out[i];
				if(str.length + v.name.length + 3 <= 75)
				{
					out[i] += " | " + v.name;
				}
				else
				{
					i++;
					out.push(">>>     " + v.name );
				}
			}
			for(let line of out)
			{
				lines.push(line);
			}
        }
        return lines;
    }
}

var current = new graph();

//
//*
//Canvas

var canvas = document.getElementById("canvas");
canvas.style.width = 1700 + 'px';
canvas.style.height = 850 + 'px';
canvas.width = 1700 * 2;
canvas.height = 850 * 2;

var mouse = new pos();

var activever = null;
var activeedg = null;
var activeweight = false;

var count = 1;

var inputtext = "";
var inputelementisactive = false;
var cursoractive = false;

var interval = setInterval(SwitchCursor, 250);

canvas.addEventListener("keydown",
function(e)
{
	e = e || window.event;
	var key = e.key;
	if(inputelementisactive)
	{
		if(key == "Enter")
		{
			if(activever != null)
			{
				if(!current.IsVertexInGraph(inputtext) && inputtext != "")
				{
					activever.name = inputtext;
				}
				activever = null;
				inputelementisactive = false;
			}
			else if(activeedg != null && inputtext != "" && !activeweight)
			{
				if(!current.IsEdgeInGraphByName(inputtext) && inputtext != "")
                {
                    activeedg.name = inputtext;
                }
				activeedg = null;
				inputelementisactive = false;
			}
            else if(activeedg != null && inputtext != "" && activeweight)
            {
                activeedg.value = parseInt(inputtext);
                activeedg = null;
                inputelementisactive = false;
                activeweight = false;
            }
		}
        else if(key == "Backspace")
        {
            DeleteLastFromInputElement();
        }
        else if(activeweight)
        {
            if(key == "1" || key == "2" || key == "3" || key == "4" || key == "5" || key == "6" || key == "7" || key == "8" || key == "9" || key == "0")
            {
                AddTextToInputElement(key);
            }
        }
		else if(key.length === 1)
		{
			AddTextToInputElement(key);
		}
	}
    else if(key == "Delete")
    {
        if(activever != null)
        {
            current.RemoveVertex(activever);
        }
        else if(activeedg != null)
        {
            current.RemoveEdge(activeedg);
        }
        activeedg = null;
        activever = null;
        ShowGraph();
    }
}
);

canvas.addEventListener("click",
function(e)
{
    e = e || window.event;
    GetMousePos(e);
	if(inputelementisactive)
	{
		inputelementisactive = false;
		activeedg = null;
		activever = null;
		return 0;
	}
    if(activever != null)
    {
        var ver = VertexOfPos();
        if(ver != null && activever.name != ver.name)
        {
            BuildNewEdge(activever.name, ver.name);
			activever = null;
        }
        else if(ver != null && activever.name === ver.name)
        {
            console.log("dblclick on " + ver.name);
			ActivateInputElement();
        }
        else
        {
            activever.x = mouse.x;
            activever.y = mouse.y;
            ShowGraph();
			activever = null;
        }
    }
    else if(activeedg != null)
    {
        var edg = EdgeOfPos();
        if(edg != null && (activeedg.vertex1.name === edg.vertex1.name || activeedg.vertex1.name === edg.vertex2.name) && (activeedg.vertex2.name === edg.vertex1.name || activeedg.vertex2.name === edg.vertex2.name))
        {
            console.log("dblclick on " + edg.name);
            
            if(IsInRectangleOfWeighting(mouse, edg))
            {
                activeweight = true;
            }
            else
            {
                activeweight = false;
            }
			ActivateInputElement();
        }
		else
		{
			activeedg.x = mouse.x;
			activeedg.y = mouse.y;
			ShowGraph();
			activeedg = null;
		}
    }
    else
    {
        var ver = VertexOfPos();
        var edg = EdgeOfPos();
        if(ver != null)
        {
            activever = ver;
        }
        else if(edg != null)
        {
            activeedg = edg;
        }
        else
        {
            BuildNewVertex("vertex" + count, mouse.x, mouse.y);
            count++;
        }
    }
}
);

function VertexOfPos()
{
    for(let ver of current.vertices)
    {
        if(IsInCircleOfVertex(mouse, ver, canvas.height/20))
        {
            return ver;
        }
    }
    return null;
}

function EdgeOfPos()
{
    for(let edg of current.edges)
    {
        if(IsInRectangleOfEdge(mouse, edg))
        {
            return edg;
        }
    }
    return null;
}

function IsInRectangleOfWeighting(p, e)
{
    var out = e.name + ": " + e.value;
    var weight = e.value;
    var ctx = canvas.getContext("2d");
    ctx.font = "25px Consolas";
    var lengthout = ctx.measureText(out);
    var widthout = lengthout.width;
    var height = 40;
    var lengthweight = ctx.measureText(weight);
    var widthweight = lengthweight.width;

    var x = e.x;
    var y = e.y;
    
    var right = x + widthout/2;
    var left = right - widthweight;
    var top = y + height/2;
    var bottom = y - height/2;

    if(p.x >= left && p.x <= right && p.y <= top && p.y >= bottom)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function IsInRectangleOfEdge(p, e)
{
    var out = e.name + ": " + e.value;
    var ctx = canvas.getContext("2d");
    ctx.font = "25px Consolas";
    var met = ctx.measureText(out);
    var width = met.width;
    var height = 40;
    var x = e.x;
    var y = e.y;
    var left = x - width/2;
    var right = x + width/2;
    var top = y + height/2;
    var bottom = y - height/2;
    if(p.x >= left && p.x <= right && p.y <= top && p.y >= bottom)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function IsInCircleOfVertex(p, v, r)
{
    var lhs = Math.pow(v.x - p.x, 2) + Math.pow(v.y - p.y, 2);
    var rhs = Math.pow(r, 2);

    if(lhs <= rhs)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function GetMousePos(e)
{
    var rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouse.y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
}

function BuildNewVertex(name, posx, posy)
{
    var v = new vertex(name, posx, posy);
    current.AddNewVertex(v);
    ShowGraph();
}

function BuildNewEdge(name1, name2)
{
    var v1 = current.FindVertexByName(name1);
    var v2 = current.FindVertexByName(name2);
    current.AddNewEdge(v1, v2);
    ShowGraph();
}

function Delete()
{
    current = new graph();
    ShowGraph();
}

function DeleteLastFromInputElement()
{
    inputtext = inputtext.substring(0, inputtext.length - 1);
}

function AddTextToInputElement(text)
{
    inputtext += text;
}

function ActivateInputElement()
{
    inputelementisactive = true;
    inputtext = "";
    cursoractive = true;
}

function SwitchCursor()
{
    if(cursoractive)
    {
        cursoractive = false;
    }
    else
    {
        cursoractive = true;
    }
    ShowGraph();
}

function ShowGraph()
{
    if(windowopened)
    {
        return 0;
    }

    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,canvas.width, canvas.height);

    for(let ver of current.vertices)
    {
        if(activever != null)
        {
            if(activever.name == ver.name)
            {
                ctx.strokeStyle = "#0000FF";
                ctx.fillStyle= "#0000FF";
            }
            else
            {
                ctx.strokeStyle = "#000000";
                ctx.fillStyle= "#000000";
            }
        }
        else
        {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle= "#000000";
        }
        ctx.beginPath();
        ctx.arc(ver.x, ver.y, canvas.height/30, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.font = "25px Consolas";
        ctx.textAlign = "center";
		
        if(!inputelementisactive)
        {
            ctx.fillText(ver.name, ver.x, ver.y+12);
        }
		else if(activever != null)
		{
			if(activever.name != ver.name)
			{
				ctx.fillText(ver.name, ver.x, ver.y+12);
			}
		}
		else
		{
			ctx.fillText(ver.name, ver.x, ver.y+12);
		}
    }

    for(let edg of current.edges)
    {
        if(activeedg != null)
        {
            if(activeedg.name == edg.name)
            {
                ctx.fillStyle = "#0000FF";
                ctx.strokeStyle = "#0000FF";
            }
            else
            {
                ctx.fillStyle = "#000000";
                ctx.strokeStyle = "#000000";
            }
        }
        else
        {
            ctx.fillStyle = "#000000";
            ctx.strokeStyle = "#000000";
        }
        ctx.beginPath();
        ctx.moveTo(edg.vertex1.x, edg.vertex1.y);
		ctx.lineTo(edg.x, edg.y);
        ctx.lineTo(edg.vertex2.x, edg.vertex2.y);
        ctx.stroke();

        ctx.font = "25px Consolas";
        ctx.textAlign = "center";
        var out = edg.name + ": " + edg.value;
        if(!inputelementisactive)
        {
            ctx.fillText(out, edg.x, edg.y);
        }
		else if(activeedg != null)
		{
			if(activeedg.name != edg.name)
			{
				ctx.fillText(out, edg.x, edg.y);
			}
		}
		else
		{
			ctx.fillText(out, edg.x, edg.y);
		}
    }

    if(inputelementisactive)
    {
        ctx.fillStyle = "#0000FF";
        ctx.font = "25px Consolas";
        ctx.textAlign = "center";
        if(activever != null)
        {
            if(cursoractive)
            {
                ctx.fillText(inputtext + "|", activever.x, activever.y+12);
            }
            else
            {
                ctx.fillText(inputtext + " ", activever.x, activever.y+12);
            }
        }
        else if(activeedg != null)
        {
            if(cursoractive && activeweight)
            {
                ctx.fillText(activeedg.name + ": " + inputtext + "|", activeedg.x, activeedg.y);
            }
            else if(activeweight)
            {
                ctx.fillText(activeedg.name + ": " + inputtext + " ", activeedg.x, activeedg.y);
            }
            else if(cursoractive)
            {
                ctx.fillText(inputtext + "|", activeedg.x, activeedg.y);
            }
            else
            {
                ctx.fillText(inputtext + " ", activeedg.x, activeedg.y);
            }
        }
    }
}

//*
//

//
//*
//textcommands

var headtextinput = document.getElementById("headtext");

var windowopened = false;

var div = document.createElement("div");
div.style.position = "absolute";
div.style.left = "1000px";
div.style.top = "150px";
div.style.width = "720px";
div.style.maxWidth = "720px";
div.style.maxHeight = "800px";
div.style.overflow = "scroll";
document.body.appendChild(div);

var second = document.createElement("canvas");
second.style.position = "relative";
second.style.left = "0px";
second.style.top = "0px";
second.style.width = "700px";
second.style.border = "1px solid black"
second.style.pointerEvents = "none";
second.width = 1400;
div.appendChild(second);

var button = document.createElement("button");
button.style.position = "absolute";
button.style.left = "680px";
button.style.top = "0px";
button.style.width = "20px";
button.style.height = "20px";
button.style.border = "1px solid black";
button.innerHTML = "x";
div.appendChild(button);

button.addEventListener("click", 
function(e)
{
    HideSecond();
}
)

headtextinput.addEventListener("keypress", 
function(e)
{
    e = e || window.event;
	var key = e.key;
    if(key == "Enter")
    {
        ReadString();
    }
}
)

HideSecond();

function HideSecond()
{
    div.setAttribute("hidden", "hidden");
    second.setAttribute("hidden", "hidden");
    button.setAttribute("hidden", "hidden");
    windowopened = false;
}

function ShowSecond()
{
    div.removeAttribute("hidden");
    second.removeAttribute("hidden");
    button.removeAttribute("hidden");
    windowopened = true;
}

function ReadString()
{
    var input = headtextinput.value;

    var strings = input.split(" ");
    var lines = [];

    switch(strings[0])
    {
        case "help":
            lines.push(">>> [help]");
			lines.push(">>> press enter to execute command");
			lines.push(">>> [controls]");
			lines.push(">>> syntax: controls");
			lines.push(">>> [algorithms]");
			lines.push(">>> calculate algorithms -> enter vertices by name");
            lines.push(">>> [dijkstra]");
			lines.push(">>> syntax: dijkstra startvertex");
            lines.push(">>> syntax: dijkstra startvertex endvertex");
            break;
        case "controls":
			lines.push(">>> [controls]");
            lines.push(">>> click on canvas to create vertex");
            lines.push(">>>   if no vertex or edge is active new vertex will be created on click");
            lines.push(">>> click on vertex to activate vertex");
            lines.push(">>>   active vertex will be highlighted as blue");
            lines.push(">>> -> if vertex is active/highlighted:");
            lines.push(">>>   click on active vertex to rename vertex");
            lines.push(">>>   click on free space to relocate vertex");
            lines.push(">>>   click on other vertex to create edge between vertices");
			lines.push(">>>   press 'DELETE' to delete active vertex");
            lines.push(">>> click on description of edge to activate edge");
            lines.push(">>>   active edge will be highlighted as blue");
            lines.push(">>> -> if edge is active/highlighted:");
            lines.push(">>>   click on name of active edge to rename edge");
            lines.push(">>>   click on value of active edge to set value of edge");
			lines.push(">>>   click on free space to relocate description of edge");
			lines.push(">>>   press 'DELETE' to delete active edge");
            break;
		case "dijkstra":
			if(strings.length == 2)
			{
				if(current.IsVertexInGraph(strings[1]))
				{
					var djk = new dijkstra(current, current.FindVertexByName(strings[1]));
					for(let line of djk.Print1(current.FindVertexByName(strings[1])))
					{
						lines.push(line);
					}
				}
				else
				{
					lines.push(">>> [dijkstra]");
					lines.push(">>> syntax: dijkstra startvertex");
					lines.push(">>> error: vertex <" + strings[1] + "> not found!");
				}
			}
            else if(strings.length == 3)
            {
                if(current.IsVertexInGraph(strings[1]) && current.IsVertexInGraph(strings[2]))
                {
                    var djk = new dijkstra(current, current.FindVertexByName(strings[1]));
                    for(let line of djk.Print2(current.FindVertexByName(strings[1]), current.FindVertexByName(strings[2])))
                    {
                        lines.push(line);
                    }
                }
                else if(current.IsVertexInGraph(strings[1]))
                {
                    lines.push(">>> [dijkstra]");
					lines.push(">>> syntax: dijkstra startvertex endvertex");
					lines.push(">>> error: vertex <" + strings[2] + "> not found!");
                }
                else
                {
                    lines.push(">>> [dijkstra]");
					lines.push(">>> syntax: dijkstra <startvertex> <endvertex>");
					lines.push(">>> error: vertex <" + strings[1] + "> not found!");
                }
            }
			else
			{
				lines.push(">>> [dijkstra]");
				lines.push(">>> syntax: dijkstra startvertex");
                lines.push(">>> syntax: dijkstra startvertex endvertex");
			}
			break;
        case "loop":
            for(let i = 0; i < 100; i++)
            {
                lines.push(">>> " + i);
            }
            break;
        default:
            lines.push(">>> enter 'help' for help");
            lines.push(">>> enter 'controls' for controls");
            break;
    }
    var h = lines.length * 30 + 30;
    h /= 2;
    second.style.height = h.toString() + "px";
    second.height = h * 2;

    var stx = second.getContext("2d");

    stx.fillStyle = "#CCCCCC";
    stx.fillRect(0,0,second.width, second.height);

    stx.font = "25px Consolas";
    stx.textAlign = "left";
    stx.fillStyle = "#000000";
    stx.strokeStyle = "#000000";

    var x = 30;
    for(let line of lines)
    {
        stx.fillText(line, 10, x);
        x += 30;
    }
	
	ShowSecond();
}

//*
//
