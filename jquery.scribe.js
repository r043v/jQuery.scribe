/*****
 * 
 * jQuery.scribe *
 * 
 * © 2012 noferi mickaël (r043v/dph)  ...  noferov@gmail.com  ...  https://github.com/r043v/
 * 
 * This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
 *   http://creativecommons.org/licenses/by-nc-sa/3.0/
 * 
 * * */(function($){
	var scribe = {
		name:'scribe',version:'eof', sourceMinHeight:111, sourceMinWidth:600,
		$scribe:false, view:false, editor:false, $textarea:false, $current:false, onRelease:false,
		ace:false, $ace:false, $toolbar:false, ifrm:false, ifrmContent:false,// attach:false,
		userSave:false, locked:false, wysihtml5_opt:false, command:{}, $css:$('<style/>',{id:"scribe-css"}),
		icons:{ commands:'data:image/png;base64,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',
			 toolbar:'data:image/png;base64,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'
		}, toolbar: // toolbar object
		{	icon: { sx:16,sy:16 }, css:{},
			child:{
				style:  { icon:{y:4},
					  child:{	gras:{ command:"bold", icon:{x:0}},
							italique:{ command:"italic",icon:{x:1} },
							"souligné":{ command:"underline",icon:{x:2} }
					  }
				},
				align:	{ icon:{y:6},
					  child:{	"aligné à gauche":{command:"justifyLeft",icon:{x:2}},
							"centré":{command:"justifyCenter",icon:{x:1}},
							"aligné à droite":{command:"justifyRight",icon:{x:0}}
					  }
					},
				heading:{ icon:{y:3,x:3}, title:"heading!", group:"formatBlock",command:{
						h1:{icon:{x:0}},
						h2:{icon:{x:1}},
						h3:{icon:{x:2}},
						h4:{icon:{x:3}},
						h5:{icon:{x:4}},
						h6:{icon:{x:5}}
					  }
					},
				bgColor:{ title:"couleur du texte", icon:{x:1,y:0}, group:"foreColor", command:{
						bleu:{ icon:{x:0,y:0},  css:{background:"blue"} },
						pink:{ title:'rose',icon:{x:0,y:0},  css:{background:"#ff00ff"} },
						rouge:{ icon:{x:0,y:0}, css:{background:"red"} }
					}
				}
			}
		}, getSelection:function($e)
		{	if(undefined === window.getSelection) return false;
			var range = window.getSelection().getRangeAt(0);

			function getTreeOffset($root,$node)
			{	if($node.parents($root).length === 0) return false; // is node child of root ?
				var tree = [], treesize = 0;
				while(1)
				{	if($node.is($root)) break;
					var index, $parent = $node.parent();
					index = $parent.contents().index($node);
					if(index !== -1) { tree[treesize++] = index; } $node = $parent;
				};	return tree.reverse();
			}
			
			var start = getTreeOffset($e,$(range.startContainer));
			var end   = getTreeOffset($e,$(range.endContainer));
			
			if(start & end === false) return false;
			
			return {start:start,end:end,startOffset:range.startOffset,endOffset:range.endOffset};
		}, setSelection:function($e,s,win)
		{	$e.focus(); if(s === false) return; var sel = win.getSelection(); sel.removeAllRanges();

			function getNode($e,s)
			{	var node = $e;
				for( var n=0;n<s.length;n++ )
				{	var index = s[n]; if(index < 0) break;
					node = node.contents(':eq('+index+')');
				}	return node.get(0);
			}
			
			var start = getNode($e,s.start), end = getNode($e,s.end), range = win.document.createRange();
			range.setStart(start,s.startOffset); range.setEnd(end,s.endOffset); sel.addRange(range);
		}, parse:function(node,opt,name,isinit) // toolbar object to html
		{	if(undefined === name) name = scribe.name;
			
			if(!$.isPlainObject(opt)) opt = {};

			var childs = false, prop={title:name}, direct_command="";

			if($.isPlainObject(node))
			{	if(undefined !== node.title) prop.title = node.title;
				
				if($.isPlainObject(node.icon))
				{	$.extend(true,opt,{icon:node.icon});
					if(undefined !== node.icon.url)
					{	if(undefined !== opt.klass) opt.klass += '-'+name; else opt.klass="icon-"+name;
						scribe.$css.append('.'+opt.klass+' { background-image:url('+node.icon.url+'); }');
					}
				}
				
				if(undefined !== node.group)
					{ opt.group = node.group; } else if(opt.group === false || opt.group === undefined) opt.group = false;
				
				if($.isPlainObject(node.css)) opt.css = node.css; else opt.css = {};
				
				if(!$.isPlainObject(node.child))
				{	if($.isPlainObject(node.command))
					{	opt.type = "command";
						node.child = node.command;
					}
					else
					{ if(node.command !== undefined)
					  {	 // command is direct string
						  opt.type = "command";
						  node.child = false;
						  direct_command = node.command;
					  }
					}
					  
					  if($.isPlainObject(node.action))
					{	opt.type = "action";
						node.child = node.action;
					} else {
					  if(node.action !== undefined)
					  {	 // command is direct string
						  opt.type = "action";
						  node.child = false;
						  direct_command = node.action;
					  }
					}
				}
				
				if(node.child !== undefined) { childs = node.child; if($.isEmptyObject(childs)) childs = false; }
				
				if(undefined !== node.type) opt.type = node.type;
					
				if($.isPlainObject(node.prop)) { prop = node.prop; prop.title = name; }
					
				delete node.icon; delete node.prop; delete node.style; delete node.group;
				delete node.command; delete node.action; delete node.child; delete node.type;
			}

			if(!$.isPlainObject(opt.icon)) opt.icon = { x:0, y:0, sx:16, sy:16 };
			if(undefined === opt.icon.x) opt.icon.x = 0;
			if(undefined === opt.icon.y) opt.icon.y = 0;
			
			if(isinit !== undefined) var $html = $('<li/>',prop); else var $html = $('<div/>',{id:name+'-toolbar-commands'});
			
			if(opt.icon !== undefined)
			{	var i = opt.icon;
				if(i.x !== 0 || 0 !== i.y) // draw icon, [0,0] mean no icon
				{	opt.css.backgroundPosition = (-i.x*i.sx)+"px "+(-i.y*i.sy)+"px";
					$html.css(opt.css).addClass(opt.klass);
				} else	$html.css(opt.css);
			}
			
			if(opt.type !== undefined && opt.type !== false)
			{	var str = 'data-wysihtml5-'+opt.type;
			
				if(opt.group !== undefined && opt.group !== false)
				{	if(false !== childs) $html.attr(str + '-group',opt.group);
					else { $html.attr(str,opt.group).attr( str + '-value',name); }
				} else 	if(false === childs) {
					if($.isPlainObject(node))
						$html.attr(str,direct_command);
					else	$html.attr(str,node);
				}
			}
			
			if(false !== childs)
			{		var $ul = $('<ul/>',prop);
					$.each(childs,function(key,nod){ $ul.append( scribe.parse(nod,opt,key,true) ); });
					$ul.appendTo($html);
					opt.group = false;
					return $html;
			} else {	if(opt.type !== undefined && opt.type !== false) return $html;
					//console.log("there is an error in your toolbar syntax."); return $();
			}
		}, init:function(opt)
		{	if(!$.isPlainObject(opt)) opt = {toolbar:scribe.toolbar,wysihtml5:{}};
			else {
				if(undefined === opt.toolbar) opt.toolbar = scribe.toolbar;
				if($.isPlainObject(opt.wysihtml5)) scribe.wysihtml5_opt = opt.wysihtml5;
			}
			
			scribe.$css.appendTo('head');

			function parseToolbar($lis)
			{	scribe.command = {};
				$lis.each(function(key,li)
				{	var $li = $(li);
					var type = false, cmd = false, value = false, tmp = false;
					
					tmp = $li.attr('data-wysihtml5-command');
					if(tmp !== undefined)
					{	type = 'command'; cmd = tmp;
						tmp = $li.attr('data-wysihtml5-command-value');
						if(tmp !== undefined) value = tmp;
					} else {
						tmp = $li.attr('data-wysihtml5-action');
						if(tmp  !== undefined)
						{	type = 'action'; cmd = tmp;
							tmp = $li.attr('data-wysihtml5-action-value');
							if(tmp !== undefined) value = tmp;
						} else {
							tmp = $li.attr('data-wysihtml5-command-group');
							if(tmp !== undefined) { type = 'command'; cmd = tmp; } else { $li.remove(); return; }
							//$li.remove();
						}
					}	//if(type&cmd === false) return;
					
					//if(value !== false) return; // only groups & direct command/action allowed, not group part
					
					var title = $li.attr('title');
					
					if(scribe.command[type] === undefined) scribe.command[type] = {};
					
					if(value === false)
					{	if(scribe.command[type][cmd] === undefined)
							scribe.command[type][cmd] = {name:title,'$':$li};
						else
						{	scribe.command[type][cmd].name = title;
							scribe.command[type][cmd]['$'] = $li;
						}
						//console.log(type+':'+cmd+':'+title+' jquery : '+scribe.command[type][cmd]['$']);
					}
					else
					{	if(scribe.command[type][cmd] === undefined)
							scribe.command[type][cmd] = {group:true};
						scribe.command[type][cmd][value] = {name:title,'$':$li};
						//console.log(type+':'+cmd+':'+value+':'+title+' jquery : '+scribe.command[type][cmd][value]['$']);
					}
				});
			}

			// set default icons set for toolbar the internal one
			scribe.toolbar.icon.url = scribe.icons.toolbar;
			
			var icon_sx = scribe.toolbar.icon.sx;
			
			// load &| create a toolbar 
			scribe.$toolbarCommands = (opt.toolbar instanceof jQuery)?opt.toolbar:($.isPlainObject(opt.toolbar))?scribe.parse(opt.toolbar):(undefined !== opt.toolbar.substring)?$(opt.toolbar):false;
			if(!(scribe.$toolbarCommands instanceof jQuery)) { console.log("i need a toolbar !"); return this; }
			
			// copie toolbar icons to access and move them without touch original's
			scribe.$toolbarIcons = scribe.$toolbarCommands.find('li[data-wysihtml5-command],li[data-wysihtml5-action]').clone(false); //,li[data-wysihtml5-command-group]
			
			// extract from these one's, commands, atributed icon and title
			parseToolbar(scribe.$toolbarIcons);
			
			// include some css in head
			scribe.$css.append("\n\
.scribe:hover { box-shadow: 1px 1px 10px black; }\n\
#scribe:hover, #scribe > *:focus { box-shadow: 1px 1px 10px white; }\
#scribe { z-index:999; position:absolute; margin:0; padding:0; width:0; height:0; overflow: visible !important; }\n\
#scribe > *, #scribe > * > * { position:absolute; top:0; right:0; margin:0; padding:0; height:100%; width:100%; background-color:''; }\n\
#scribe-command, #scribe-command > div { height:16px; width:16px; position:absolute; top:0; background:url("+scribe.icons.commands+"); cursor:pointer; }\
#scribe-command { z-index:9; overflow:visible; height:16px; width:16px; }\n\
#scribe-source { z-index:7; overflow:hidden; }\n\
#scribe-toolbar { z-index:6; height:16px; /*min-width:16px;*/ opacity:0; width:0; background:white; border-radius:2px; left:0; top:-16px; }\n\
//#scribe-toolbar > * { float:left; }\n\
#scribe-toolbar-current { left:0; position:absolute; height:"+icon_sx+"px; overflow:hidden; list-style-type:none; width:0; } \n\
#scribe-toolbar-current > li { list-style-type:none; height:"+icon_sx+"px; width:"+icon_sx+"px; float:left; cursor:pointer; } \n\
#scribe-editor { z-index:5; overflow:hidden; }\n\
#scribe-toolbar-commands { width:16px; height:16px; right:0; display:none; }\n");/*
#scribe-toolbar-commands * , #scribe-toolbar-current * { width:16px; height:16px; list-style-type: none; float:left; }\n\
#scribe-toolbar-commands li, #scribe-toolbar-current li { width:16px; height:16px; }\n\
#scribe-toolbar-commands ul, #scribe-toolbar-current ul { width:auto; height:auto; }\n\
#scribe-toolbar-commands ul ul, #scribe-toolbar-current ul ul { display:none; }\n\
");*/
			// create the needed html
			scribe.$scribe = $('<div/>',{id:"scribe"}).css("overflow","visible"); // master div
			scribe.$command = $('<div/>',{id:"scribe-command"}).css({background:"none"}); // container for document specific icons
			scribe.$command.$icon   = $("<div/>").css({backgroundPosition:"-48px 0",top:0,right:0}).show(); // tool icon
			scribe.$command.$switch = $("<div/>",{title:"change view"}).css({backgroundPosition:"-32px 0",display:"none"}).click(function(){ scribe.switchMe(); }); // switch view button
			scribe.$command.$save   = $("<div/>",{title:"save"}).css({backgroundPosition:"0 0",display:"none"}).click(function(){ scribe.save(); }); // save button
			scribe.$command.$cancel = $("<div/>",{title:"cancel"}).css({backgroundPosition:"-16px 0",display:"none"}).click(function(){ scribe.release(); }); // cancel edit button			
			scribe.$command.append(scribe.$command.$icon)
			.hover(function(){ // mouse enter/leave support in icons
				scribe.$command.$icon.stop().animate({opacity:0},function(){ scribe.$command.$icon.css({zIndex:0}); });
				scribe.$command.append(scribe.$command.$switch,scribe.$command.$cancel,scribe.$command.$save);
				scribe.$command.$switch.css({opacity:0}).show().stop().animate({opacity:1},350);
				scribe.$command.$save.css(  {opacity:0}).show().stop().animate({right:18,top:0,opacity:1},350);
				scribe.$command.$cancel.css({opacity:0}).show().stop().animate({right:0,top:18,opacity:1},350);
				scribe.$command.css({height:34,width:34});
			},function(){
				scribe.$command.$icon.stop().css({zIndex:10}).animate({opacity:1},500);
				scribe.$command.$switch.stop().animate({opacity:0},function(){ scribe.$command.$switch.detach(); });
				scribe.$command.$save.stop().animate({right:18,top:0,opacity:0},function(){ scribe.$command.$save.detach(); });
				scribe.$command.$cancel.stop().animate({right:0,top:18,opacity:0},function(){ scribe.$command.$cancel.detach(); });
				scribe.$command.css({height:16,width:16});
			});
			
			// source editor container (currently, ace)
			scribe.$source = $('<div/>',{id:"scribe-source"});
			if($.isPlainObject(ace)) // if ace editor detected, use it !
			{	scribe.source = 'ace';
				scribe.$ace = $("<div/>",{id:"ace-editor"}).appendTo(scribe.$source);
			} else	scribe.source = 'text';
			
			// composer editor container (currently wysihtml5)
			scribe.$editor = $('<div/>',{id:"scribe-editor"});
			scribe.$textarea = $('<textarea/>',{id:"scribe-textarea",spellcheck:"false",wrap:"off",placeholder:""}).val("hello").css({border:0,backgroundColor:''}).appendTo(scribe.$editor);
			
			scribe.$toolbar = $('<div/>',{id:"scribe-toolbar"});
			scribe.$toolbarCurrent = $('<ul/>',{id:"scribe-toolbar-current"});
			
			scribe.$toolbarCurrent.on('click','li',function()
			{	var t = $(this);
				var cmd = t.attr('data-wysihtml5-command');
				var value = t.attr('data-wysihtml5-command-value');
				scribe.editor.composer.commands.exec(cmd,value);
				scribe.ifrmContent.focus();
			});
			
			//scribe.$toolbarCurrent.append( $('<div/>',{id:"scribe-toolbar"}).width(16).height(16).css({backgroundColor:"blue"}) );
			scribe.$toolbarCurrent.add(scribe.$toolbarCommands).appendTo(scribe.$toolbar);
			
			// append all of that and push it into the dom !
			scribe.$scribe.append(scribe.$source.hide(),scribe.$editor,scribe.$toolbar.hide(),scribe.$command).width(0).height(0).css({overflow:"hidden",visibility:"hidden"}).appendTo('body');
			
			scribe.wysihtml5_opt.toolbar = "wysihtml5-toolbar"; // set toolbar id
			scribe.$toolbarCommands.children("ul").attr("id",scribe.wysihtml5_opt.toolbar);
			
			// before init wysihtml5 copy all div style to textarea
			
			var $firstDiv = $(this).first();
			scribe.copyCss($firstDiv,scribe.$textarea,scribe.BOX_FORMATTING);
			scribe.copyCss($firstDiv,scribe.$textarea,scribe.TEXT_FORMATTING);
			
			scribe.editor = new wysihtml5.Editor("scribe-textarea",scribe.wysihtml5_opt); // init wysihtml5
			scribe.editor.on("external_change_view",function(v){ scribe.on_switch(v); }); // place switch view event
			scribe.$host = this; // mean $('div.scribe')
			scribe.editor.on("load",function(){ // wysihtml5 loaded !
				// retreve wysihtml5 iframe
				scribe.ifrm = $(scribe.editor.composer.iframe).css({border:0,backgroundColor:''}).attr("allowTransparency", "true"); // remove his border !
				scribe.ifrmContent = $(scribe.ifrm[0].contentWindow.document); // select iframe document
				// apply some css inside, and set ifrmContent as body iframe
				scribe.ifrmContent = scribe.ifrmContent.find("html").css({width:"100%",height:"100%",margin:0,padding:0,overflow:"hidden"}).find("body").css({height:"auto",width:"100%",margin:0,padding:0,backgroundColor:'',background:'none'});
				
				scribe.editorCommands = new wysihtml5.Commands(scribe.editor);
				scribe.isSelection = function(n,v){ var s = scribe.editorCommands.state(n,v); /*console.log("command "+n+" value:"+v+" return : "+s);*/ return (s !== false && s !== null); };

				scribe.$scribe.hide().css({visibility:"visible",overflow:"visible"});
				
				// place some event
				scribe.editor.composer.element.addEventListener("keyup",scribe.onChange);
				scribe.editor.on("aftercommand:composer", scribe.onChange);
				scribe.editor.composer.element.addEventListener("mouseup",scribe.selectionChange);
				scribe.editor.composer.element.addEventListener("click",scribe.selectionChange);
				
				// affect edit event
				scribe.$host.addClass('scribe').hover(function()
				{ $(this).attr('contenteditable','true');
				},function()
				{ $(this).removeAttr('contenteditable');
				}).mouseup(function()
				{	var t = $(this);
					var sel = scribe.getSelection(t);
					t.removeAttr('contenteditable');

					scribe.edit(t,sel);
				});
				
				console.log("hello scribe !");
			});
			
			scribe.selection = new wysihtml5.Selection(scribe.editor);
			
			this.scribe = scribe;
			return this;
		}, onChange:function()
		{	scribe.resize();
			scribe.selectionChange();
		}, edit:function($e,sel) // edit an element !
		{	if($e === undefined) $e = $(this);
		
			if(scribe.$current !== false) // anybody else in edition ?
			{	if(scribe.onRelease !== false) return;
				scribe.onRelease = function(){ scribe.edit($e,sel); }; // editor saved and released callback
				scribe.save(); // call save
				return; // and bye
			}
	
			//console.log($e.css('text-align'));
	
			scribe.copyCss($e,scribe.ifrm,scribe.BOX_FORMATTING);
			scribe.copyCss($e,scribe.ifrmContent,scribe.TEXT_FORMATTING);

			scribe.$toolbar.show();
			//scribe.ifrmContent.css('background-color','');

			scribe.$current = $e; // current target div
			var off = $e.offset(), $w=$(window); off.hh = $e.outerHeight(); off.ww = $e.outerWidth(); // get div sizes & position
			off.top  -= $w.scrollTop();
			off.left -= $w.scrollLeft();
			
			$e.css("visibility","hidden"); // hide source div (but keep him in place !)
			scribe.$scribe.show().height(off.hh).width(off.ww).offset(off); // set same sizes
			scribe.$source.hide(); // direct hide source code div
			
			var data = $e.html();
			scribe.$textarea.val(data)
			scribe.editor.setValue(data,true);
			scribe.resize();

			scribe.setSelection(scribe.ifrmContent,sel,scribe.ifrm[0].contentWindow);
			
			scribe.$toolbarCurrentWidth = 1; // will force a width animate refresh
			scribe.selectionChange();
			//scribe.editor.on('blur',scribe.save); // auto save and release on blur
		}, selectionChange:function()
		{	scribe.$currentIcons = $();
			$.each(scribe.command.command,function(cmd,v)
			{	//if(undefined !== v.value
				if(undefined === v.group)
				{	if( true === scribe.isSelection(cmd) )
					{	//console.log("this is in "+v.name+" ("+cmd+") jquery:"+(v.$ instanceof jQuery)+" ("+v.$.length+")");
						scribe.$currentIcons = scribe.$currentIcons.add(v.$);
					}
				} else	$.each(scribe.command.command[cmd],function(val,z)
					{	
						if(val !== 'group' && true === scribe.isSelection(cmd,val) )
						{	//console.log("this is in "+z.name+" ("+cmd+")");
							scribe.$currentIcons = scribe.$currentIcons.add(z.$);
						}
					});
			});
			
			// in dom node will get "indom" class for not made million append/detach/animate on caret move
			scribe.$toolbarIcons.not(scribe.$currentIcons).filter('.indom').removeClass('indom').stop().width(16).animate({width:0},300,function(){ $(this).detach(); });
			scribe.$currentIcons.not('.indom').addClass('indom').stop().width(0).appendTo(scribe.$toolbarCurrent).animate({width:16},300);
			
			var newCurrentWidth = scribe.$currentIcons.length * 16;
			if(newCurrentWidth !== scribe.$toolbarCurrentWidth)
			{	var opacity = 1; if(newCurrentWidth === 0) opacity=0;
				scribe.$toolbarCurrentWidth = newCurrentWidth;
				scribe.$toolbarCurrent.stop().animate({width:newCurrentWidth},300);
				scribe.$toolbar.stop().animate({width:newCurrentWidth,opacity:opacity});
			}
		}, resize:function(opt) // resize the composer view, will accept min value, callback and additional resizer/style
		{	if(opt !== undefined)
			{	if(opt.min === undefined) opt.min=16;
				if(opt.minx === undefined) opt.minx=16;
				if(opt.src === undefined) opt.src = scribe.$current;
				if(opt.callback === undefined) opt.callback = false;
				if(opt.data === undefined) opt.data = {};
			} else opt = {min:16,minx:16,src:scribe.$current,callback:false,data:{}};
			if(scribe.ifrm === false || scribe.ifrmContent === false) return;
			opt.data.height = scribe.ifrmContent.height(); // get iframe body height
			
			if(opt.min > opt.data.height) opt.data.height = opt.min; // apply min height
			opt.data.width = scribe.$current.width(); // get div width
			if(opt.minx > opt.data.width) opt.data.width = opt.minx; // apply min width
			scribe.$scribe.add(opt.src).stop().animate(opt.data,function(){ if(false !== opt.callback) opt.callback(); }); // and animate targets
			return opt.data.height; // return future height
		}, switchMe:function(view) // call a scribe switch view
		{	if(false === scribe.view) scribe.view='composer';
			view = (undefined !== view)?view:(scribe.view === "composer")?"source":(scribe.view === "source")?"composer":false;
			if(view === false) return;
			if(view === "composer" && "source" === scribe.view) { scribe.editor.fire("change_view","composer"); return; }
			if(view === "source" && "composer" === scribe.view) { scribe.editor.fire("change_view","textarea"); return; }
		}, on_switch:function(view) // called on each view flip
		{	if(view == "source" || view == "textarea")
			{	scribe.view = 'source';
				// check if style_html function from jsbeautifier.org [ https://github.com/einars/js-beautify ] is here, and present a much human parsing
				var data; if($.isFunction(style_html)) data = style_html(scribe.$textarea.val(),{'indent_size': 1,'indent_char': "\t"}); else data = scribe.$textarea.val();
				
				if(scribe.source === 'ace') // is ace here ?
				{	scribe.$source.css({opacity:0.1,height:scribe.resize()}).show();
					// show source div, opacified and resized as source min height or current iframe height
					
					if(undefined === scribe.ace || false === scribe.ace) // is ace not init ?
					{	scribe.$ace.css({zIndex:8,background:"white"}); // init him cleared
						scribe.$ace.html("");
						scribe.ace = ace.edit("ace-editor");
						scribe.ace.setTheme("ace/theme/chrome");
						scribe.ace.getSession().setMode("ace/mode/html");
					}

					scribe.ace.setValue(data);
					scribe.ace.clearSelection();
					scribe.$editor.hide();
					scribe.$command.stop().animate({marginTop:18}).mouseleave();
					scribe.resize({min:scribe.sourceMinHeight,minx:scribe.sourceMinWidth,src:scribe.$source,data:{opacity:1},callback:function()
					{	scribe.ace.resize();
					}});
				} else	{ scribe.$textarea.val(data); scribe.resize({min:scribe.sourceMinHeight,minx:scribe.sourceMinWidth}); } // else use classic textarea
			} else {
				scribe.view = 'composer';

				if(scribe.source === 'ace')
				{	scribe.$textarea.val(scribe.ace.getValue()); scribe.ace.setValue("");
					scribe.$editor.show();
					scribe.$source.animate({height:scribe.$current.height(),width:scribe.$current.width(),opacity:0},function(){	$(this).hide().css({height:"100%"}); });
					scribe.$command.stop().animate({marginTop:0}).mouseleave();
					window.setTimeout(scribe.resize,50);
				} else	scribe.resize();
			}
		}, save:function(f,url,obj){ // save content and release edit mode
			if(true === scribe.locked) return; scribe.locked = true;
			if(scribe.view === "source") scribe.editor.fire("change_view","composer");
			if(false === scribe.userSave) scribe.setSave();
			var userSave = scribe.userSave; if(f !== undefined) scribe.setSave(f,url,obj);
			scribe.userSave(scribe.$textarea.val()); scribe.userSave = userSave;
		}, setSave:function(f,url,obj){ // declare action &| callback to do on save
			if($.isFunction(f))
			{	scribe.userSave = function(data)
				{	var originalData = data;
					var callback = function(data){ if(data === undefined) data = originalData; scribe.saveRelease(data); };
					var rtn = f(originalData,scribe.$current,callback);
					if(rtn !== undefined) callback(rtn);
				};	return;
			}
			
			if(f === "post" || f === "get")
			{	scribe.saveOpt = { url:url, obj:obj };
				scribe.userSave = function(data)
				{	var o = scribe.saveOpt.obj; if($.isFunction(o)) o = o(scribe.$current);
					var nfo = { data:data }; if($.isPlainObject(o)) $.extend(nfo,o);
					$[f](scribe.saveOpt.url,nfo,function(data)
					{	if(data === undefined) data = nfo.data;
						if(data === "") scribe.saveRelease(nfo.data); else scribe.saveRelease(data);
					}).error(function(){ scribe.saveRelease('<h2>error while saving :- /</h2>'+nfo.data); });
				};	return;
			}
			scribe.setSave(function(d){return d;});
		}, release:function(){
			if(!scribe.$current instanceof jQuery) return;
			
			// if any children animated, wait a bit more
			if(scribe.$scribe.children().add(scribe.$scribe).filter(':animated').length !== 0)
			{	window.setTimeout(scribe.release,60); return;
			}
			
			scribe.$current.css({visibility:"",height:""}); // redraw source div
			if(scribe.view === "source") scribe.editor.fire("change_view","composer");

			scribe.view = false;
			scribe.$toolbar.hide();
			scribe.$scribe.hide();
			scribe.$current = false;
			var f = false; if($.isFunction(scribe.onRelease)) f = scribe.onRelease; scribe.onRelease = false; if(f !== false) f();
		}, saveRelease:function(data){
			if(false === scribe.locked) return;
			scribe.$current.html(data);
			scribe.locked = false;
			scribe.release();
		}, flip:function($e) // untestesded , in target of drag and drop between editable zone
		{	var $c  = scribe.$current;
			var ch = $c.html();
			var eh = $e.html();
			scribe.$current = $e;
			$e.html(ch);
			$c.html(eh)
			scribe.save();
			scribe.$textarea.val(eh);
			scribe.$current = $c;
			scribe.save();
		}, copyCss:function($s,$d,$l)
		{	var css = {}; for( var n=0;n<$l.length;n++){ c = $l[n]; css[c] = $s.css(c); } $d.css(css);
		}, TEXT_FORMATTING : [
		"background-color",
		"color", "cursor",
		"font-family", "font-size", "font-style", "font-variant", "font-weight",
		"line-height", "letter-spacing",
		"text-align", "text-decoration", "text-indent", "text-rendering",
		"word-break", "word-wrap", "word-spacing"
		], BOX_FORMATTING : [
		"background-color",
		"border-collapse",
		"border-bottom-color", "border-bottom-style", "border-bottom-width",
		"border-left-color", "border-left-style", "border-left-width",
		"border-right-color", "border-right-style", "border-right-width",
		"border-top-color", "border-top-style", "border-top-width",
		"clear", "display", "float",
		"margin-bottom", "margin-left", "margin-right", "margin-top",
		"outline-color", "outline-offset", "outline-width", "outline-style",
		"padding-left", "padding-right", "padding-top", "padding-bottom",
		"position", "top", "left", "right", "bottom", "z-index",
		"vertical-align", "text-align",
		"-webkit-box-sizing", "-moz-box-sizing", "-ms-box-sizing", "box-sizing",
		"-webkit-box-shadow", "-moz-box-shadow", "-ms-box-shadow","box-shadow",
		"-webkit-border-top-right-radius", "-moz-border-radius-topright", "border-top-right-radius",
		"-webkit-border-bottom-right-radius", "-moz-border-radius-bottomright", "border-bottom-right-radius",
		"-webkit-border-bottom-left-radius", "-moz-border-radius-bottomleft", "border-bottom-left-radius",
		"-webkit-border-top-left-radius", "-moz-border-radius-topleft", "border-top-left-radius"
		]
	};

	$.fn.scribe = function(method,t){
		if(method === undefined) return scribe;
		if(scribe[method]) return scribe[method].apply(this,Array.prototype.slice.call(arguments,1));
		if(typeof method === 'object' || ! method) return scribe.init.apply(this,arguments);
		$.error('Method '+method+' does not exist on jQuery.scribe');
	};
})(jQuery);