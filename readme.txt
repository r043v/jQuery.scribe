 ------------------------------------------------------
--- scribe --- an html inline editor --- eof edition ---
 ------------------------------------------------------

© 2012 noferi mickaël (r043v/dph)  ...  noferov@gmail.com  ...  https://github.com/r043v/

This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  http://creativecommons.org/licenses/by-nc-sa/3.0/

-----------------------------------------------

to use jquery.scribe plugin you need :

* latest jQuery
* wysihtml5 editor, https://github.com/xing/wysihtml5
	with external event patch, https://github.com/r043v/wysihtml5/commit/35134ef13805c5eb9952fec93e9a018fda1d52a8
* ace source code editor, http://ace.ajax.org/

optional :

* js-beautifier html part (beautify-html.js) from http://jsbeautifier.org/

put all dependancy in your head, add jquery.scribe.js and here we go

-----------------------------------------------

init scribe,

$(document).ready(function()
{	var scribe = $("div.toedit").scribe({wysihtml5:{stylesheets:["/js/editor.css"],parserRules:wysihtml5ParserRules}}).scribe;
});

scribe only wrap wysihtml5, so you need init him

save, the easy way

scribe let you save in some manner,

easyest way is to let him do the get or post request, on success, editor will be released and original node filled with data

scribe.setSave("post","/save.php");

as this, save.php only receive "data" var in post, filled with editor html

hey you miss an identifier :/
you can set an argument more who will be a callback who must return a javascript object with all you need more to make your save
callback will receive an argument who refer to the original html node in edition, as a jquery object

scribe.setSave("post","/save.php",function($this)
{	return { md5:$this.data("md5") };
});

here we extract "data-md5" atribute from our source div and add his value to what will receive save.php

save, the second way

you call also set a unique argument at setSave, who will be a function

this function receive 3 args :

* html data
* original node element to edit, as a jquery object
* callback to save end

if your function return anything, callback will be not used, and data filled in original node will be your return !

scribe.setSave(function(data,$this)
{	var md5 = $this.data("md5"); // our custom editable zone identifier
	console.log(data); // here we save data into the console !
	return data + '<h1>save success on '+md5+"!</h1>"; // editable div will be filled with data and a success message
});

and if you need wait anything just use the callback

scribe.setSave(function(data,$this,callback)
{	var md5 = $this.data("md5");
	$.post({data:data,md5:md5},"/save.php",function(data)
	{	callback(data);
	});
	// or just $.post({data:data,md5:md5},"/save.php",callback);
});

here, original editable node will receive the return of your post request if your return is empty, data from editor will be inserted

-----------------------------------------------

bugs,

* chrome not fix iframe content position at top when animate
* firefox not use the same line height of original div
* first position of editor will be bad if done when page is scrolled down, next are goods
* iframe body not keep transparent background

-----------------------------------------------

next future,

* toolbar !
 
-----------------------------------------------
