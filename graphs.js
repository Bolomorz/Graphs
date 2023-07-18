/**
 * vertex of graph
 */
class vertex{

    /**
     * create vertex of graph.
     * @param {string} name unique name of vertex
     * @param {int} posx x position on canvas
     * @param {int} posy y position on canvas
     */
    constructor(name, posx, posy){
        /**
         * unique name of vertex
         */
        this.name = name;
        /**
         * list of adjacents (targets of edges from vertex) of vertex
         */
        this.adjacents = [];
        /**
         * x position on canvas of vertex
         */
        this.x = posx;
        /**
         * y position on canvas of vertex
         */
        this.y = posy;
    }

    /**
     * add adjacent vertex of vertex to adjacentlist.
     * edge this -> adjacent.
     * @param {vertex} adjacent end vertex of edge: this -> adjacent
     */
    AddNewAdjacent(adjacent)
    {
        this.adjacents.push(adjacent);
    }
	
    /**
     * remove adjacent from adjacentlist.
     * @param {vertex} adjacent vertex to remove from adjacentlist
     */
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

/**
 * edge of graph
 */
class edge{

    /**
     * create edge of graph.
     * @param {vertex} v1 source vertex of edge
     * @param {vertex} v2 target vertex of edge
     * @param {int} val weighting of edge
     */
    constructor(v1, v2, val){
        /**
         * source vertex of edge
         */
        this.vertex1 = v1;
        /**
         * target vertex of edge
         */
        this.vertex2 = v2;
        /**
         * weighting of edge
         */
        this.value = val;
        /**
         * unique name of edge
         */
        this.name = v1.name + "->" + v2.name;
        /**
         * x position on canvas of edge
         */
		this.x = (v2.x + v1.x) / 2;
        /**
         * y position on canvas of edge
         */
		this.y = (v2.y + v1.y) / 2;
    }
}

/**
 * graph displayed on canvas
 */
class graph{ 
    
    /**
     * create new graph
     */
    constructor()
    {
        /**
         * list of vertices of graph
         */
        this.vertices = [];
        /**
         * list of edges of graph
         */
        this.edges = [];
    }

    /**
     * add new vertex to graph.
     * @param {vertex} vertex vertex to add to verticeslist
     */
    AddNewVertex(vertex)
    {
        this.vertices.push(vertex);
    }

    /**
     * add new edge to graph if edge doesnt exist.
     * @param {vertex} ver1 source vertex of edge
     * @param {vertex} ver2 target vertex of edge
     */
    AddNewEdge(ver1, ver2)
    {
        if(!this.IsEdgeInGraph(ver1, ver2))
        {
            ver1.AddNewAdjacent(ver2);
            this.edges.push(new edge(ver1, ver2, 1));
        }
    }

    /**
     * test if edge with name already exists in graph.
     * @param {string} name 
     * @returns boolean
     */
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

    /**
     * test if edge with vertices ver1, ver2 already exists in graph.
     * @param {vertex} ver1 source vertex of edge
     * @param {vertex} ver2 target vertex of edge
     * @returns boolean
     */
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

    /**
     * test if vertex with name already exists in graph.
     * @param {string} name 
     * @returns boolean
     */
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

    /**
     * find vertex with name in graph.
     * @param {string} name name of vertex
     * @returns vertex. returns null if not found
     */
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

    /**
     * find index of vertex in verticeslist.
     * @param {vertex} ver vertex to find
     * @returns index of vertex. return -1 if not found
     */
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

    /**
     * find index of edge in edgeslist.
     * @param {edge} edg edge to find
     * @returns index of edge. return -1 if not found
     */
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

    /**
     * remove edge from edgeslist if edge exists in graph.
     * @param {edge} edg edge to remove
     */
    RemoveEdge(edg)
    {
        var index = this.IndexOfEdge(edg);
        if(index > -1)
        {
            this.edges.splice(index, 1);
			edg.vertex1.RemoveAdjacent(edg.vertex2);
        }
    }

    /**
     * remove vertex from verticeslist if vertex exists in graph.
     * remove edges from verticeslist if vertex is source or target of edge.
     * @param {vertex} ver vertex to remove
     */
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

/**
 * position on canvas
 */
class pos{

    /**
     * create new position
     */
    constructor()
    {
        /**
         * x position on canvas
         */
        this.x = 0;
        /**
         * y position on canvas
         */
        this.y = 0;
    }
}

/**
 * dijkstra class to calculate shortest paths from startvertex with dijkstra algorithm
 */
class dijkstra{

    /**
     * create new dijkstra class
     * @param {graph} graph graph 
     * @param {vertex} startvertex source vertex
     */
	constructor(graph, startvertex)
	{
		/**
         * list of distance from startvertex to each vertex
         */
        this.distance = [];
        /**
         * list of predecessor of each vertex
         */
		this.predecessor = [];
        /**
         * list of vertices in graph
         */
		this.vertices = [];
        /**
         * list of vertices in graph not calculated yet
         */
		this.Q = [];
        /**
         * list of shortestpaths from startvertex to each vertex
         */
		this.shortestpaths = [];
		this.Init(graph, startvertex);
		this.DijkstraCalculation(graph, startvertex);
		for(let i in this.vertices)
		{
			this.shortestpaths.push(this.ShortestPath(this.vertices[i]));
		}
	}
	
    /**
     * calculate shortest path to target vertex
     * @param {vertex} endvertex target vertex
     * @returns shortest path as list of vertices
     */
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
	
    /**
     * calculate each distance for each vertex in Q 
     * @param {graph} graph graph to calculate
     * @param {vertex} startvertex source vertex
     * @returns 0
     */
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
	
    /**
     * calculate new distance from source vertex to target vertex
     * @param {vertex} u source vertex
     * @param {vertex} v target vertex
     * @param {graph} graph graph with vertices
     */
	DistanceUpdate(u, v, graph)
	{
		var alt = this.distance[this.FindIndexOfVertex(u)] + this.FindWeightingOfEdge(u, v, graph);
		if(alt < this.distance[this.FindIndexOfVertex(v)])
		{
			this.distance[this.FindIndexOfVertex(v)] = alt;
			this.predecessor[this.FindIndexOfVertex(v)] = u;
		}
	}
	
    /**
     * find weighting of edge u -> v in edgeslist of graph
     * @param {vertex} u source vertex
     * @param {vertex} v target vertex
     * @param {graph} graph graph with vertices
     * @returns weighting of edge. return -1 if not found
     */
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
	
    /**
     * initialize lists distance, predecessor, vertices, Q
     * @param {graph} graph graph to calculate
     * @param {vertex} startvertex source vertex
     */
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
	
    /**
     * find index of vertex with smallest distance in Q
     * @returns index of vertex
     */
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
	
    /**
     * find index of vertex in vertices
     * @param {vertex} vertex vertex to find
     * @returns index in verticeslist. return -1 if not found
     */
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
	
    /**
     * test if vertex is in Qlist
     * @param {vertex} vertex vertex to find
     * @returns boolean
     */
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

    /**
     * print solution of each vertex in graph to lineslist
     * @param {vertex} startvertex source vertex 
     * @returns list of lines
     */
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

    /**
     * print solution of endvertex to lineslist
     * @param {vertex} startvertex source vertex
     * @param {vertex} endvertex target vertex
     * @returns list of lines
     */
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

/**
 * current graph which is displayed in canvas
 */
var current = new graph();

//
//*
//Canvas

/**
 * canvas to display graph
 */
var canvas = document.getElementById("canvas");
canvas.style.width = 1700 + 'px';
canvas.style.height = 850 + 'px';
/**
 * double resolution of canvas
 */
canvas.width = 1700 * 2;
canvas.height = 850 * 2;

/**
 * position of mouse in canvas
 */
var mouse = new pos();

/**
 * active vertex. null if no vertex active
 */
var activever = null;
/**
 * active edge. null if no edge active
 */
var activeedg = null;
/**
 * boolean if weight is active
 */
var activeweight = false;

/**
 * count of vertices in graph. to name new created vertices with unique names
 */
var count = 1;

/**
 * text displayed in inputelement on canvas
 */
var inputtext = "";
/**
 * boolean if inputelement on canvas is active
 */
var inputelementisactive = false;
/**
 * boolean if cursor in inputelement on canvas is active
 */
var cursoractive = false;

/**
 * interval of SwitchCursor function
 */
var interval = setInterval(SwitchCursor, 250);

/**
 * eventlistener for keydown event. add text to inputelement if inputelement is active. [backspace] to delete character from inputtext. [enter] to accept inputtext in inputelement.
 */
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

/**
 * eventlistener for mouseclickevent. different codepath if theres is an active vertex or edge (activever, activeedg)
 */
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

/**
 * returns vertex of current mouse position on canvas
 * @returns vertex of mouse position on canvas. return null if no vertex on current position
 */
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

/**
 * returns edge of current mouse position on canvas
 * @returns edge of mouse position on canvas. return null if no edge on current position.
 */
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

/**
 * test if position p is in rectangle of weighting of edge e on canvas
 * @param {pos} p position of mouse
 * @param {edge} e edge on canvas
 * @returns boolean
 */
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

/**
 * test if position p is in rectangle of edge e on canvas
 * @param {pos} p position of mouse
 * @param {edge} e edge on canvas
 * @returns boolean
 */
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

/**
 * test if position p is in circle of vertex v on canvas
 * @param {pos} p position of mouse
 * @param {vertex} v vertex of canvas
 * @param {int} r radius of circle
 * @returns boolean
 */
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

/**
 * write current mouse position on canvas in mouse variable
 * @param {*} e mouse position
 */
function GetMousePos(e)
{
    var rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouse.y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
}

/**
 * create new vertex and add to current graph
 * @param {string} name name of vertex
 * @param {int} posx x position on canvas
 * @param {int} posy y position on canvas
 */
function BuildNewVertex(name, posx, posy)
{
    var v = new vertex(name, posx, posy);
    current.AddNewVertex(v);
    ShowGraph();
}

/**
 * create new edge and add to current graph
 * @param {string} name1 name of source vertex
 * @param {string} name2 name of target vertex
 */
function BuildNewEdge(name1, name2)
{
    var v1 = current.FindVertexByName(name1);
    var v2 = current.FindVertexByName(name2);
    current.AddNewEdge(v1, v2);
    ShowGraph();
}

/**
 * delete current graph. create new graph
 */
function Delete()
{
    current = new graph();
    ShowGraph();
}

/**
 * delete last character from inputtext in inputelement
 */
function DeleteLastFromInputElement()
{
    inputtext = inputtext.substring(0, inputtext.length - 1);
}

/**
 * add text to inputtext in inputelement
 * @param {string} text text to add
 */
function AddTextToInputElement(text)
{
    inputtext += text;
}

/**
 * activate inputelement on current active edge or vertex
 */
function ActivateInputElement()
{
    inputelementisactive = true;
    inputtext = "";
    cursoractive = true;
}

/**
 * make cursorcharacter inactive or active
 */
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

/**
 * display graph (vertices and edges) on canvas. display only if second canvas is inactive
 * @returns 0 if second canvas is active
 */
function ShowGraph()
{
    /**
     * skip printing to canvas if second canvas window is opened
     */
    if(windowopened)
    {
        return 0;
    }

    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,canvas.width, canvas.height);

    /**
     * display vertices of graph
     */
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

    /**
     * display edges of graph
     */
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

    /**
     * display inputelement on active edge or vertex
     */
    if(inputelementisactive)
    {
        ctx.fillStyle = "#0000FF";
        ctx.font = "italic 25px Consolas";
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

/**
 * inputelement above canvas
 */
var headtextinput = document.getElementById("headtext");

/**
 * boolean if second canvas is active
 */
var windowopened = false;

/**
 * div element with second canvas and button
 */
var div = document.createElement("div");
div.style.position = "absolute";
div.style.left = "1000px";
div.style.top = "150px";
div.style.width = "720px";
div.style.maxWidth = "720px";
div.style.maxHeight = "800px";
div.style.overflow = "scroll";
div.style.border = "1px solid black";
document.body.appendChild(div);

/**
 * second canvas to display solutions of calculations
 */
var second = document.createElement("canvas");
second.style.position = "relative";
second.style.left = "0px";
second.style.top = "0px";
second.style.width = "700px";
second.style.border = "1px solid black"
second.style.pointerEvents = "none";
/**
 * double resolution of canvas
 */
second.width = 1400;
div.appendChild(second);

/**
 * button to close second canvas
 */
var button = document.createElement("button");
button.style.position = "absolute";
button.style.left = "680px";
button.style.top = "0px";
button.style.width = "20px";
button.style.height = "20px";
button.style.border = "1px solid black";
button.innerHTML = "x";
div.appendChild(button);

/**
 * eventlistener on button to close second canvas on click
 */
button.addEventListener("click", 
function(e)
{
    HideSecond();
}
)

/**
 * eventlistener on inputelement to accept text in inputelement on pressing [enter] while inputelement is focused
 */
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

/**
 * hide second canvas, div and button
 */
function HideSecond()
{
    div.setAttribute("hidden", "hidden");
    second.setAttribute("hidden", "hidden");
    button.setAttribute("hidden", "hidden");
    windowopened = false;
}

/**
 * show second canvas, div and button
 */
function ShowSecond()
{
    div.removeAttribute("hidden");
    second.removeAttribute("hidden");
    button.removeAttribute("hidden");
    windowopened = true;
}

/**
 * read string from inputelement headtextinput. issue command in string. display solution in second canvas.
 */
function ReadString()
{
    var input = headtextinput.value;

    var strings = input.split(" ");
    var lines = [];

    /**
     * switch command in inputelement
     */
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
    /**
     * double resolution of canvas
     */
    second.height = h * 2;

    /**
     * write solution of command to second canvas
     */
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
