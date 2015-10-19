/*! nanoScrollerJS - (c) 2015 James Florentino; Licensed MIT */
(function(e,t,n){"use strict";var r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x;S={paneClass:"pane",sliderClass:"slider",contentClass:"content",iOSNativeScrolling:!1,preventPageScrolling:!1,disableResize:!1,alwaysVisible:!1,flashDelay:1500,sliderMinHeight:20,sliderMaxHeight:null},y="scrollbar",g="scroll",l="mousedown",c="mousemove",p="mousewheel",h="mouseup",m="resize",u="drag",w="up",v="panedown",s="DOMMouseScroll",o="down",E="wheel",a="keydown",f="keyup",b="touchmove",r=t.navigator.appName==="Microsoft Internet Explorer"&&/msie 7./i.test(t.navigator.appVersion)&&t.ActiveXObject,i=null,x=function(){var e,t,r;return e=n.createElement("div"),t=e.style,t.position="absolute",t.width="100px",t.height="100px",t.overflow=g,t.top="-9999px",n.body.appendChild(e),r=e.offsetWidth-e.clientWidth,n.body.removeChild(e),r},d=function(){function a(r,s){this.el=r,this.options=s,i||(i=x()),this.$el=e(this.el),this.doc=e(n),this.win=e(t),this.generate(),this.createEvents(),this.addEvents(),this.reset()}return a.prototype.preventScrolling=function(e,t){if(!this.isActive)return;if(e.type===s)(t===o&&e.originalEvent.detail>0||t===w&&e.originalEvent.detail<0)&&e.preventDefault();else if(e.type===p){if(!e.originalEvent||!e.originalEvent.wheelDelta)return;(t===o&&e.originalEvent.wheelDelta<0||t===w&&e.originalEvent.wheelDelta>0)&&e.preventDefault()}},a.prototype.updateScrollValues=function(){var e;e=this.content,this.maxScrollTop=e.scrollHeight-e.clientHeight,this.contentScrollTop=e.scrollTop,this.maxSliderTop=this.paneHeight-this.sliderHeight,this.sliderTop=this.contentScrollTop*this.maxSliderTop/this.maxScrollTop},a.prototype.createEvents=function(){var e=this;this.events={down:function(t){return e.isBeingDragged=!0,e.offsetY=t.pageY-e.slider.offset().top,e.pane.addClass("active"),e.doc.bind(c,e.events[u]).bind(h,e.events[w]),!1},drag:function(t){return e.sliderY=t.pageY-e.$el.offset().top-e.offsetY,e.scroll(),e.updateScrollValues(),e.contentScrollTop>=e.maxScrollTop?e.$el.trigger("scrollend"):e.contentScrollTop===0&&e.$el.trigger("scrolltop"),!1},up:function(t){return e.isBeingDragged=!1,e.pane.removeClass("active"),e.doc.unbind(c,e.events[u]).unbind(h,e.events[w]),!1},resize:function(t){e.reset()},panedown:function(t){return e.sliderY=(t.offsetY||t.originalEvent.layerY)-e.sliderHeight*.5,e.scroll(),e.events.down(t),!1},scroll:function(t){if(e.isBeingDragged)return;e.updateScrollValues(),e.sliderY=e.sliderTop,e.slider.css({top:e.sliderTop});if(t==null)return;e.contentScrollTop>=e.maxScrollTop?(e.options.preventPageScrolling&&e.preventScrolling(t,o),e.$el.trigger("scrollend")):e.contentScrollTop===0&&(e.options.preventPageScrolling&&e.preventScrolling(t,w),e.$el.trigger("scrolltop"))},wheel:function(t){if(t==null)return;return e.sliderY+=-t.wheelDeltaY||-t.delta,e.scroll(),!1}}},a.prototype.addEvents=function(){var e;this.removeEvents(),e=this.events,this.options.disableResize||this.win.bind(m,e[m]),this.slider.bind(l,e[o]),this.pane.bind(l,e[v]).bind(""+p+" "+s,e[E]),this.$content.bind(""+g+" "+p+" "+s+" "+b,e[g])},a.prototype.removeEvents=function(){var e;e=this.events,this.win.unbind(m,e[m]),this.slider.unbind(),this.pane.unbind(),this.$content.unbind(""+g+" "+p+" "+s+" "+b,e[g])},a.prototype.generate=function(){var e,t,n,r,s;return n=this.options,r=n.paneClass,s=n.sliderClass,e=n.contentClass,!this.$el.find(""+r).length&&!this.$el.find(""+s).length&&this.$el.append('<div class="'+r+'"><div class="'+s+'" /></div>'),this.$content=this.$el.children("."+e),this.$content.attr("tabindex",0),this.content=this.$content[0],this.slider=this.$el.find("."+s),this.pane=this.$el.find("."+r),i&&(t=this.$el.css("direction")==="rtl"?{left:-i}:{right:-i},this.$el.addClass("has-scrollbar")),n.iOSNativeScrolling&&(t||(t={}),t.WebkitOverflowScrolling="touch"),t!=null&&this.$content.css(t),this},a.prototype.restore=function(){this.stopped=!1,this.pane.show(),this.addEvents()},a.prototype.reset=function(){var e,t,n,s,o,u,a,f,l;return this.$el.find("."+this.options.paneClass).length||this.generate().stop(),this.stopped&&this.restore(),e=this.content,n=e.style,s=n.overflowY,r&&this.$content.css({height:this.$content.height()}),t=e.scrollHeight+i,u=this.pane.outerHeight(),f=parseInt(this.pane.css("top"),10),o=parseInt(this.pane.css("bottom"),10),a=u+f+o,l=Math.round(a/t*a),l<this.options.sliderMinHeight?l=this.options.sliderMinHeight:this.options.sliderMaxHeight!=null&&l>this.options.sliderMaxHeight&&(l=this.options.sliderMaxHeight),s===g&&n.overflowX!==g&&(l+=i),this.maxSliderTop=a-l,this.contentHeight=t,this.paneHeight=u,this.paneOuterHeight=a,this.sliderHeight=l,this.slider.height(l),this.events.scroll(),this.pane.show(),this.isActive=!0,e.scrollHeight===e.clientHeight||this.pane.outerHeight(!0)>=e.scrollHeight&&s!==g?(this.pane.hide(),this.isActive=!1):this.el.clientHeight===e.scrollHeight&&s===g?this.slider.hide():this.slider.show(),this.pane.css({opacity:this.options.alwaysVisible?1:"",visibility:this.options.alwaysVisible?"visible":""}),this},a.prototype.scroll=function(){if(!this.isActive)return;return this.sliderY=Math.max(0,this.sliderY),this.sliderY=Math.min(this.maxSliderTop,this.sliderY),this.$content.scrollTop((this.paneHeight-this.contentHeight+i)*this.sliderY/this.maxSliderTop*-1),this.slider.css({top:this.sliderY}),this},a.prototype.scrollBottom=function(e){if(!this.isActive)return;return this.reset(),this.$content.scrollTop(this.contentHeight-this.$content.height()-e).trigger(p),this},a.prototype.scrollTop=function(e){if(!this.isActive)return;return this.reset(),this.$content.scrollTop(+e).trigger(p),this},a.prototype.scrollTo=function(t){if(!this.isActive)return;return this.reset(),this.scrollTop(e(t).get(0).offsetTop),this},a.prototype.stop=function(){return this.stopped=!0,this.removeEvents(),this.pane.hide(),this},a.prototype.flash=function(){var e=this;if(!this.isActive)return;return this.reset(),this.pane.addClass("flashed"),setTimeout(function(){e.pane.removeClass("flashed")},this.options.flashDelay),this},a}(),e.fn.nanoScroller=function(t){return this.each(function(){var n,r;(r=this.nanoscroller)||(n=e.extend({},S,t),this.nanoscroller=r=new d(this,n));if(t&&typeof t=="object"){e.extend(r.options,t);if(t.scrollBottom)return r.scrollBottom(t.scrollBottom);if(t.scrollTop)return r.scrollTop(t.scrollTop);if(t.scrollTo)return r.scrollTo(t.scrollTo);if(t.scroll==="bottom")return r.scrollBottom(0);if(t.scroll==="top")return r.scrollTop(0);if(t.scroll&&t.scroll instanceof e)return r.scrollTo(t.scroll);if(t.stop)return r.stop();if(t.flash)return r.flash()}return r.reset()})}})(jQuery,window,document);
/**
 * Ajax upload
 * Project page - http://valums.com/ajax-upload/
 * Copyright (c) 2008 Andris Valums, http://valums.com
 * Licensed under the MIT license (http://valums.com/mit-license/)
 * Version 3.6 (26.06.2009)
 */
(function(){var h=document,l=window;function b(d){if(typeof d=="string"){d=h.getElementById(d)}return d}function e(q,p,d){if(l.addEventListener){q.addEventListener(p,d,false)}else{if(l.attachEvent){var r=function(){d.call(q,l.event)};q.attachEvent("on"+p,r)}}}var c=function(){var d=h.createElement("div");return function(p){d.innerHTML=p;var q=d.childNodes[0];d.removeChild(q);return q}}();function f(p,d){return p.className.match(new RegExp("(\\s|^)"+d+"(\\s|$)"))}function g(p,d){if(!f(p,d)){p.className+=" "+d}}function m(q,d){var p=new RegExp("(\\s|^)"+d+"(\\s|$)");q.className=q.className.replace(p," ")}if(document.documentElement.getBoundingClientRect){var n=function(d){var t=d.getBoundingClientRect(),x=d.ownerDocument,u=x.body,p=x.documentElement,s=p.clientTop||u.clientTop||0,v=p.clientLeft||u.clientLeft||0,y=1;if(u.getBoundingClientRect){var r=u.getBoundingClientRect();y=(r.right-r.left)/u.clientWidth}if(y>1){s=0;v=0}var w=t.top/y+(window.pageYOffset||p&&p.scrollTop/y||u.scrollTop/y)-s,q=t.left/y+(window.pageXOffset||p&&p.scrollLeft/y||u.scrollLeft/y)-v;return{top:w,left:q}}}else{var n=function(d){if(l.jQuery){return jQuery(d).offset()}var q=0,p=0;do{q+=d.offsetTop||0;p+=d.offsetLeft||0}while(d=d.offsetParent);return{left:p,top:q}}}function a(q){var s,p,r,d;var t=n(q);s=t.left;r=t.top;p=s+q.offsetWidth;d=r+q.offsetHeight;return{left:s,right:p,top:r,bottom:d}}function j(r){if(!r.pageX&&r.clientX){var q=1;var d=document.body;if(d.getBoundingClientRect){var p=d.getBoundingClientRect();q=(p.right-p.left)/d.clientWidth}return{x:r.clientX/q+h.body.scrollLeft+h.documentElement.scrollLeft,y:r.clientY/q+h.body.scrollTop+h.documentElement.scrollTop}}return{x:r.pageX,y:r.pageY}}var i=function(){var d=0;return function(){return"ValumsAjaxUpload"+d++}}();function o(d){return d.replace(/.*(\/|\\)/,"")}function k(d){return(/[.]/.exec(d))?/[^.]+$/.exec(d.toLowerCase()):""}Ajax_upload=AjaxUpload=function(q,d){if(q.jquery){q=q[0]}else{if(typeof q=="string"&&/^#.*/.test(q)){q=q.slice(1)}}q=b(q);this._input=null;this._button=q;this._disabled=false;this._submitting=false;this._justClicked=false;this._parentDialog=h.body;if(window.jQuery&&jQuery.ui&&jQuery.ui.dialog){var r=jQuery(this._button).parents(".ui-dialog");if(r.length){this._parentDialog=r[0]}}this._settings={action:"upload.php",name:"userfile",data:{},autoSubmit:true,responseType:false,onChange:function(s,t){},onSubmit:function(s,t){},onComplete:function(t,s){}};for(var p in d){this._settings[p]=d[p]}this._createInput();this._rerouteClicks()};AjaxUpload.prototype={setData:function(d){this._settings.data=d},disable:function(){this._disabled=true},enable:function(){this._disabled=false},destroy:function(){if(this._input){if(this._input.parentNode){this._input.parentNode.removeChild(this._input)}this._input=null}},_createInput:function(){var p=this;var d=h.createElement("input");d.setAttribute("type","file");d.setAttribute("name",this._settings.name);var r={position:"absolute",margin:"-5px 0 0 -175px",padding:0,width:"220px",height:"30px",fontSize:"14px",opacity:0,cursor:"hand",display:"none",zIndex:2147483583};for(var q in r){d.style[q]=r[q]}if(!(d.style.opacity==="0")){d.style.filter="alpha(opacity=0)"}this._parentDialog.appendChild(d);e(d,"change",function(){var s=o(this.value);if(p._settings.onChange.call(p,s,k(s))==false){return}if(p._settings.autoSubmit){p.submit()}});e(d,"click",function(){p.justClicked=true;setTimeout(function(){p.justClicked=false},2500)});this._input=d},_rerouteClicks:function(){var p=this;var q,d={top:0,left:0},r=false;e(p._button,"mouseover",function(s){if(!p._input||r){return}r=true;q=a(p._button);if(p._parentDialog!=h.body){d=n(p._parentDialog)}});e(document,"mousemove",function(u){var t=p._input;if(!t||!r){return}if(p._disabled){m(p._button,"hover");t.style.display="none";return}var v=j(u);if((v.x>=q.left)&&(v.x<=q.right)&&(v.y>=q.top)&&(v.y<=q.bottom)){t.style.top=v.y-d.top+"px";t.style.left=v.x-d.left+"px";t.style.display="block";g(p._button,"hover")}else{r=false;var s=setInterval(function(){if(p.justClicked){return}if(!r){t.style.display="none"}clearInterval(s)},25);m(p._button,"hover")}})},_createIframe:function(){var p=i();var d=c('<iframe src="javascript:false;" name="'+p+'" />');d.id=p;d.style.display="none";h.body.appendChild(d);return d},submit:function(){var d=this,r=this._settings;if(this._input.value===""){return}var p=o(this._input.value);if(!(r.onSubmit.call(this,p,k(p))==false)){var q=this._createIframe();var t=this._createForm(q);t.appendChild(this._input);t.submit();h.body.removeChild(t);t=null;this._input=null;this._createInput();var s=false;e(q,"load",function(w){if(q.src=="javascript:'%3Chtml%3E%3C/html%3E';"||q.src=="javascript:'<html></html>';"){if(s){setTimeout(function(){h.body.removeChild(q)},0)}return}var v=q.contentDocument?q.contentDocument:frames[q.id].document;if(v.readyState&&v.readyState!="complete"){return}if(v.body&&v.body.innerHTML=="false"){return}var u;if(v.XMLDocument){u=v.XMLDocument}else{if(v.body){u=v.body.innerHTML;if(r.responseType&&r.responseType.toLowerCase()=="json"){if(v.body.firstChild&&v.body.firstChild.nodeName.toUpperCase()=="PRE"){u=v.body.firstChild.firstChild.nodeValue}if(u){u=window["eval"]("("+u+")")}else{u={}}}}else{var u=v}}r.onComplete.call(d,p,u);s=true;q.src="javascript:'<html></html>';"})}else{h.body.removeChild(this._input);this._input=null;this._createInput()}},_createForm:function(q){var p=this._settings;var r=c('<form method="post" enctype="multipart/form-data"></form>');r.style.display="none";r.action=p.action;r.target=q.name;h.body.appendChild(r);for(var s in p.data){var d=h.createElement("input");d.type="hidden";d.name=s;d.value=p.data[s];r.appendChild(d)}return r}}})();
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
/**
 * Farbtastic Color Picker 1.2
 * © 2008 Steven Wittens
 */
jQuery.fn.farbtastic=function(a){jQuery.farbtastic(this,a);return this};jQuery.farbtastic=function(a,b){var a=jQuery(a).get(0);return a.farbtastic||(a.farbtastic=new jQuery._farbtastic(a,b))};jQuery._farbtastic=function(a,d){var b=this;jQuery(a).html('<div class="farbtastic"><div class="color"></div><div class="wheel"></div><div class="overlay"></div><div class="h-marker marker"></div><div class="sl-marker marker"></div></div>');var c=jQuery(".farbtastic",a);b.wheel=jQuery(".wheel",a).get(0);b.radius=84;b.square=100;b.width=194;if(navigator.appVersion.match(/MSIE [0-6]\./)){jQuery("*",c).each(function(){if(this.currentStyle.backgroundImage!="none"){var e=this.currentStyle.backgroundImage;e=this.currentStyle.backgroundImage.substring(5,e.length-2);jQuery(this).css({backgroundImage:"none",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='"+e+"')"})}})}b.linkTo=function(e){if(typeof b.callback=="object"){jQuery(b.callback).unbind("keyup",b.updateValue)}b.color=null;if(typeof e=="function"){b.callback=e}else{if(typeof e=="object"||typeof e=="string"){b.callback=jQuery(e);b.callback.bind("keyup",b.updateValue);if(b.callback.get(0).value){b.setColor(b.callback.get(0).value)}}}return this};b.updateValue=function(e){if(this.value&&this.value!=b.color){b.setColor(this.value)}};b.setColor=function(e){var f=b.unpack(e);if(b.color!=e&&f){b.color=e;b.rgb=f;b.hsl=b.RGBToHSL(b.rgb);b.updateDisplay()}return this};b.setHSL=function(e){b.hsl=e;b.rgb=b.HSLToRGB(e);b.color=b.pack(b.rgb);b.updateDisplay();return this};b.widgetCoords=function(i){var g,m;var h=i.target||i.srcElement;var f=b.wheel;if(typeof i.offsetX!="undefined"){var l={x:i.offsetX,y:i.offsetY};var j=h;while(j){j.mouseX=l.x;j.mouseY=l.y;l.x+=j.offsetLeft;l.y+=j.offsetTop;j=j.offsetParent}var j=f;var k={x:0,y:0};while(j){if(typeof j.mouseX!="undefined"){g=j.mouseX-k.x;m=j.mouseY-k.y;break}k.x+=j.offsetLeft;k.y+=j.offsetTop;j=j.offsetParent}j=h;while(j){j.mouseX=undefined;j.mouseY=undefined;j=j.offsetParent}}else{var l=b.absolutePosition(f);g=(i.pageX||0*(i.clientX+jQuery("html").get(0).scrollLeft))-l.x;m=(i.pageY||0*(i.clientY+jQuery("html").get(0).scrollTop))-l.y}return{x:g-b.width/2,y:m-b.width/2}};b.mousedown=function(e){if(!document.dragging){jQuery(document).bind("mousemove",b.mousemove).bind("mouseup",b.mouseup);document.dragging=true}var f=b.widgetCoords(e);b.circleDrag=Math.max(Math.abs(f.x),Math.abs(f.y))*2>b.square;b.mousemove(e);return false};b.mousemove=function(h){var i=b.widgetCoords(h);if(b.circleDrag){var g=Math.atan2(i.x,-i.y)/6.28;if(g<0){g+=1}b.setHSL([g,b.hsl[1],b.hsl[2]])}else{var f=Math.max(0,Math.min(1,-(i.x/b.square)+0.5));var e=Math.max(0,Math.min(1,-(i.y/b.square)+0.5));b.setHSL([b.hsl[0],f,e])}return false};b.mouseup=function(){jQuery(document).unbind("mousemove",b.mousemove);jQuery(document).unbind("mouseup",b.mouseup);document.dragging=false};b.updateDisplay=function(){var e=b.hsl[0]*6.28;jQuery(".h-marker",c).css({left:Math.round(Math.sin(e)*b.radius+b.width/2)+"px",top:Math.round(-Math.cos(e)*b.radius+b.width/2)+"px"});jQuery(".sl-marker",c).css({left:Math.round(b.square*(0.5-b.hsl[1])+b.width/2)+"px",top:Math.round(b.square*(0.5-b.hsl[2])+b.width/2)+"px"});jQuery(".color",c).css("backgroundColor",b.pack(b.HSLToRGB([b.hsl[0],1,0.5])));if(typeof b.callback=="object"){jQuery(b.callback).css({backgroundColor:b.color,color:b.hsl[2]>0.5?"#000":"#fff"});jQuery(b.callback).each(function(){if(this.value&&this.value!=b.color){this.value=b.color}})}else{if(typeof b.callback=="function"){b.callback.call(b,b.color)}}};b.absolutePosition=function(f){var g={x:f.offsetLeft,y:f.offsetTop};if(f.offsetParent){var e=b.absolutePosition(f.offsetParent);g.x+=e.x;g.y+=e.y}return g};b.pack=function(f){var i=Math.round(f[0]*255);var h=Math.round(f[1]*255);var e=Math.round(f[2]*255);return"#"+(i<16?"0":"")+i.toString(16)+(h<16?"0":"")+h.toString(16)+(e<16?"0":"")+e.toString(16)};b.unpack=function(e){if(e.length==7){return[parseInt("0x"+e.substring(1,3))/255,parseInt("0x"+e.substring(3,5))/255,parseInt("0x"+e.substring(5,7))/255]}else{if(e.length==4){return[parseInt("0x"+e.substring(1,2))/15,parseInt("0x"+e.substring(2,3))/15,parseInt("0x"+e.substring(3,4))/15]}}};b.HSLToRGB=function(m){var o,n,e,j,k;var i=m[0],p=m[1],f=m[2];n=(f<=0.5)?f*(p+1):f+p-f*p;o=f*2-n;return[this.hueToRGB(o,n,i+0.33333),this.hueToRGB(o,n,i),this.hueToRGB(o,n,i-0.33333)]};b.hueToRGB=function(f,e,g){g=(g<0)?g+1:((g>1)?g-1:g);if(g*6<1){return f+(e-f)*g*6}if(g*2<1){return e}if(g*3<2){return f+(e-f)*(0.66666-g)*6}return f};b.RGBToHSL=function(m){var i,o,p,j,q,f;var e=m[0],k=m[1],n=m[2];i=Math.min(e,Math.min(k,n));o=Math.max(e,Math.max(k,n));p=o-i;f=(i+o)/2;q=0;if(f>0&&f<1){q=p/(f<0.5?(2*f):(2-2*f))}j=0;if(p>0){if(o==e&&o!=k){j+=(k-n)/p}if(o==k&&o!=n){j+=(2+(n-e)/p)}if(o==n&&o!=e){j+=(4+(e-k)/p)}j/=6}return[j,q,f]};jQuery("*",c).mousedown(b.mousedown);b.setColor("#000000");if(d){b.linkTo(d)}};