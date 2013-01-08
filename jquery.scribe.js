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
		ace:false, $ace:false, $toolbar:false, ifrm:false, ifrmContent:false,
		userSave:false, locked:false, wysihtml5_opt:false, command:{}, $css:$('<style/>',{id:"scribe-css"}),
		icons:{ toolbar:'data:image/png;base64,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'
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
				heading:{ icon:{y:3,x:0}, title:"heading!", group:"formatBlock",command:{
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
		}, log:function(s)
		{	if(console !== undefined) console.log(s);
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
			
			if(isinit !== undefined) var $html = $('<li/>',prop); else var $html = $('<div/>',{id:name+'-toolbar-commands',class:'icon-scribe'}).css({backgroundPosition:'-96px 0'});
			
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
					scribe.log("there is an error in your toolbar syntax."); return $();
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
				{	var $li = $(li), type = false, cmd = false, value = false, tmp = false;
					
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
						}
					}
					
					var title = $li.attr('title');
					
					if(scribe.command[type] === undefined) scribe.command[type] = {};
					
					if(value === false)
					{	if(scribe.command[type][cmd] === undefined)
							scribe.command[type][cmd] = {name:title,'$':$li};
						else
						{	scribe.command[type][cmd].name = title;
							scribe.command[type][cmd]['$'] = $li;
						}
					}
					else
					{	if(scribe.command[type][cmd] === undefined)
							scribe.command[type][cmd] = {group:true};
						scribe.command[type][cmd][value] = {name:title,'$':$li};
					}
				});
			}

			// set default icons set for toolbar the internal one
			scribe.toolbar.icon.url = scribe.icons.toolbar;
			
			var icon_sx = scribe.toolbar.icon.sx;
			
			// load &| create a toolbar 
			scribe.$toolbarCommands = (opt.toolbar instanceof jQuery)?opt.toolbar:($.isPlainObject(opt.toolbar))?scribe.parse(opt.toolbar):(undefined !== opt.toolbar.substring)?$(opt.toolbar):false;
			if(!(scribe.$toolbarCommands instanceof jQuery)) { scribe.log("i need a toolbar !"); return this; }
			
			// copie toolbar icons to access and move them without touch original's
			scribe.$toolbarIcons = scribe.$toolbarCommands.find('li[data-wysihtml5-command],li[data-wysihtml5-action]').clone(false);
			
			// extract from these one's, commands, atributed icon and title
			parseToolbar(scribe.$toolbarIcons);
			
			// include some css in head
			scribe.$css.append("\n\
.scribe:hover { box-shadow: 1px 1px 10px black; }\n\
#scribe { z-index:999; position:absolute; margin:0; padding:0; width:0; height:0; box-shadow: 1px 1px 10px white; overflow:visible !important; }\n\
#scribe > *, #scribe > * > * { position:absolute; top:0; right:0; margin:0; padding:0; height:100%; width:100%; background-color:''; }\n\
#scribe-command, #scribe-command > div { height:16px; width:16px; position:absolute; top:0; background:url("+scribe.icons.toolbar+"); cursor:pointer; }\
#scribe-command { z-index:9; overflow:visible; height:16px; width:16px; }\n\
#scribe-source { z-index:7; overflow:hidden; }\n\
#scribe-toolbar { z-index:6; height:16px; /*min-width:16px;*/ opacity:0; width:0; background:white; border-radius:2px; left:0; top:-16px; overflow:visible; }\n\
#scribe-toolbar * { float:left; list-style-type:none; }\n\
#scribe-toolbar-current { left:16px; position:absolute; height:"+icon_sx+"px; overflow:hidden; list-style-type:none; width:0; } \n\
#scribe-toolbar-current > li { list-style-type:none; height:"+icon_sx+"px; width:"+icon_sx+"px; float:left; cursor:pointer; } \n\
#scribe-editor { z-index:5; overflow:hidden; }\n\
#scribe-toolbar-commands { width:16px; height:16px; left:0; display:block; overflow:visible; }\n\
#scribe-toolbar-full { display:none; width:auto; height:auto; border-radius:2px; opacity:0; margin-top:16px; background:white; }\n\
#scribe-toolbar-full > ul { width:16px; float:left; height:auto; }\
#scribe-toolbar-full li { width:16px; height:16px; float:left; cursor:pointer; }\
\
");
			// create the needed html
			scribe.$scribe = $('<div/>',{id:"scribe"}).css("overflow","visible"); // master div
			scribe.$command = $('<div/>',{id:"scribe-command"}).css({background:"none"}); // container for document specific icons
			scribe.$command.$icon   = $("<div/>").css({backgroundPosition:"-48px -32px",top:0,right:0}).show(); // tool icon
			scribe.$command.$switch = $("<div/>",{title:"change view"}).css({backgroundPosition:"-32px -32px",display:"none"}).click(function(){ scribe.switchMe(); }); // switch view button
			scribe.$command.$save   = $("<div/>",{title:"save"}).css({backgroundPosition:"0 -32px",display:"none"}).click(function(){ scribe.save(); }); // save button
			scribe.$command.$cancel = $("<div/>",{title:"cancel"}).css({backgroundPosition:"-16px -32px",display:"none"}).click(function(){ scribe.release(); }); // cancel edit button			
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
			
			scribe.$toolbar.on('click','li',function()
			{	var t = $(this);
				var cmd = t.attr('data-wysihtml5-command');
				var value = t.attr('data-wysihtml5-command-value');
				scribe.editor.composer.commands.exec(cmd,value);
				scribe.ifrmContent.focus();
			});
			
			scribe.$toolbarCurrent.add(scribe.$toolbarCommands).appendTo(scribe.$toolbar);
			
			// append all of that and push it into the dom !
			scribe.$scribe.append(scribe.$source.hide(),scribe.$editor,scribe.$toolbar.hide(),scribe.$command).width(0).height(0).css({overflow:"hidden",visibility:"hidden"}).appendTo('body');
			
			scribe.$toolbarCommandsFull = scribe.$toolbarCommands.show().children("ul").attr("id","scribe-toolbar-full");
			
			{ scribe.$toolbarCommandsFull.width(16*scribe.$toolbarCommandsFull.children().length); // toolbar width
			  var numberH = 0; // toolbar height
			  scribe.$toolbarCommandsFull.find("ul").each(function(){ var h = $(this).children().length; if(h > numberH) numberH = h; });
			  scribe.$toolbarCommandsFull.height(numberH*16);
			}
			
			$("#scribe-toolbar-commands").hover(function()
			{	scribe.$toolbarCommandsFull.stop().show().animate({opacity:1},600);
			},function()
			{	scribe.$toolbarCommandsFull.stop().animate({opacity:0},600,function(){ scribe.$toolbarCommandsFull.hide(); });
			});
			
			// before init wysihtml5 copy all div style to textarea
			
			var $firstDiv = $(this).first();
			scribe.copyCss($firstDiv,scribe.$textarea,scribe.BOX_FORMATTING);
			scribe.copyCss($firstDiv,scribe.$textarea,scribe.TEXT_FORMATTING);
			
			scribe.editor = new wysihtml5.Editor("scribe-textarea",scribe.wysihtml5_opt); // init wysihtml5
			scribe.editor.on("external_change_view",scribe.on_switch); // place switch view event
			scribe.$host = this; // mean $('div.scribe')
			scribe.editor.on("load",function(){ // wysihtml5 loaded !
				// retreve wysihtml5 iframe
				scribe.ifrm = $(scribe.editor.composer.iframe).css({border:0,backgroundColor:''}).attr("allowTransparency", "true"); // remove his border !
				scribe.ifrmContent = $(scribe.ifrm[0].contentWindow.document); // select iframe document
				// apply some css inside, and set ifrmContent as body iframe
				scribe.ifrmContent = scribe.ifrmContent.find("html").css({width:"100%",height:"100%",margin:0,padding:0,overflow:"hidden"}).find("body").css({height:"auto",width:"100%",margin:0,padding:0,backgroundColor:'',background:'none'});
				
				scribe.editorCommands = new wysihtml5.Commands(scribe.editor);
				scribe.isSelection = function(n,v){ var s = scribe.editorCommands.state(n,v); return (s !== false && s !== null); };
				
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
				
				scribe.log("hello scribe !");
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

			scribe.copyCss($e,scribe.ifrm,scribe.BOX_FORMATTING);
			scribe.copyCss($e,scribe.ifrmContent,scribe.TEXT_FORMATTING);

			scribe.$toolbar.show();

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
						scribe.$currentIcons = scribe.$currentIcons.add(v.$);
				} else	$.each(scribe.command.command[cmd],function(val,z)
					{	if(val !== 'group' && true === scribe.isSelection(cmd,val) )
							scribe.$currentIcons = scribe.$currentIcons.add(z.$);
					});
			});
			
			// in dom node will get "indom" class for not made million append/detach/animate on caret move
			scribe.$toolbarIcons.not(scribe.$currentIcons).filter('.indom').removeClass('indom').stop().width(16).animate({width:0},300,function(){ $(this).detach(); });
			scribe.$currentIcons.not('.indom').addClass('indom').stop().width(0).appendTo(scribe.$toolbarCurrent).animate({width:16},300);
			
			var newCurrentWidth = 16 + scribe.$currentIcons.length * 16;
			if(newCurrentWidth !== scribe.$toolbarCurrentWidth)
			{	var opacity = 1; if(newCurrentWidth === 0) opacity=0;
				scribe.$toolbarCurrentWidth = newCurrentWidth;
				scribe.$toolbarCurrent.stop().animate({width:newCurrentWidth},300);
				scribe.$toolbar.stop().animate({width:newCurrentWidth,opacity:opacity}).css({overflow:"visible"});
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
				
				scribe.$toolbar.hide();
				
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
				scribe.$toolbar.show();
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
			
			// if we are in source, first back to composer
			if(scribe.view === "source")
			{	scribe.$toolbar.css({opacity:0});
				scribe.editor.fire("change_view","composer");
				window.setTimeout(scribe.release,60); return;
			}
			
			scribe.$current.css({visibility:"",height:""}); // redraw source div
			scribe.view = false;
			scribe.$toolbar.hide().css({opacity:1});
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
		{	if(jQuery.fn.jquery >= "1.9") $d.css($s.css($l));
			else	{ var css = {}; for( var n=0;n<$l.length;n++){ c = $l[n]; css[c] = $s.css(c); } $d.css(css); }
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