var Mobify=window.Mobify=window.Mobify||{};Mobify.$=Mobify.$||window.Zepto||window.jQuery;Mobify.UI=Mobify.UI||{classPrefix:''};(function($,d){$.support=$.support||{};$.extend($.support,{'touch':'ontouchend'in d})})(Mobify.$,document);Mobify.UI.Utils=(function($){var a={},h=$.support;a.events={down:'touchstart mousedown',move:'touchmove mousemove',up:'touchend touchcancel mouseup'};a.getCursorPosition=function(e){e=e.originalEvent||e;var T=e.touches&&e.touches[0];return{x:T?T.clientX:e.clientX,y:T?T.clientY:e.clientY}};a.getProperty=function(n){var p=['Webkit','Moz','O','ms',''],c=document.createElement('div').style;for(var i=0;i<p.length;++i){if(c[p[i]+n]!==undefined){return p[i]+n}}return};$.extend(h,{'transform':!!(a.getProperty('Transform')),'transform3d':!!(window.WebKitCSSMatrix&&'m11'in new WebKitCSSMatrix())});var t=a.getProperty('Transform');if(h.transform3d){a.translateX=function(e,c){if(typeof c=='number')c=c+'px';e.style[t]='translate3d('+c+',0,0)'}}else if(h.transform){a.translateX=function(e,c){if(typeof c=='number')c=c+'px';e.style[t]='translate('+c+',0)'}}else{a.translateX=function(e,c){if(typeof c=='number')c=c+'px';e.style.left=c}}var b=a.getProperty('Transition'),d=a.getProperty('TransitionDuration');a.setTransitions=function(e,c){if(c){e.style[d]=''}else{e.style[d]='0s'}};a.requestAnimationFrame=(function(){var p=(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(c){window.setTimeout(c,1000/60)});var r=function(){p.apply(window,arguments)};return r})();return a})(Mobify.$);Mobify.UI.Carousel=(function($,U){var d={dragRadius:10,moveRadius:20,classPrefix:undefined,classNames:{outer:'sapMCrsl',inner:'sapMCrslInner',item:'sapMCrslItem',center:'sapMCrslCenter',touch:'has-touch',dragging:'dragging',active:'sapMCrslActive'}},h=$.support;var C=function(e,o){this.setOptions(o);this.initElements(e);this.initOffsets();this.initAnimation();this.bind()};C.defaults=d;C.prototype.setOptions=function(o){var a=this.options||$.extend({},d,o);a.classNames=$.extend({},a.classNames,o.classNames||{});a.classPrefix=a.classPrefix||Mobify.UI.classPrefix;this.options=a};C.prototype.initElements=function(e){this._index=1;this.element=e;this.$element=$(e);this.$inner=this.$element.find('.'+this._getClass('inner'));this.$items=this.$inner.children();this.$start=this.$items.eq(0);this.$sec=this.$items.eq(1);this.$current=this.$items.eq(this._index);this._length=this.$items.length;this._alignment=this.$element.hasClass(this._getClass('center'))?0.5:0};C.prototype.initOffsets=function(){this._offset=0;this._offsetDrag=0};C.prototype.initAnimation=function(){this.animating=false;this.dragging=false;this._needsUpdate=false;this._enableAnimation()};C.prototype._getClass=function(i){return this.options.classPrefix+this.options.classNames[i]};C.prototype._enableAnimation=function(){if(this.animating){return}U.setTransitions(this.$inner[0],true);this.$inner.removeClass(this._getClass('dragging'));this.animating=true};C.prototype._disableAnimation=function(){if(!this.animating){return}U.setTransitions(this.$inner[0],false);this.$inner.addClass(this._getClass('dragging'));this.animating=false};C.prototype.update=function(){if(this._needsUpdate){return}var s=this;this._needsUpdate=true;U.requestAnimationFrame(function(){s._update()})};C.prototype._update=function(){if(!this._needsUpdate){return}var x=Math.round(this._offset+this._offsetDrag);if(this.$inner){U.translateX(this.$inner[0],x)}this._needsUpdate=false};C.prototype.setLoop=function(l){this._bLoop=l};C.prototype.getLoop=function(){return this._bLoop};C.prototype.setRTL=function(r){this._bRTL=r};C.prototype.getRTL=function(){return this._bRTL};C.prototype.changeAnimation=function(t,c,o,a){if(!(jQuery.browser.msie&&jQuery.browser.fVersion<10)&&this.$inner){var b=this.$inner,T='transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';var f=function(){b.unbind(T,f);b.removeClass(t);if(c){c.apply(o,a)}};b.addClass(t);b.bind(T,f)}};C.prototype.resize=function(){this.changeAnimation('sapMCrslHideNonActive');var a=this.$items.eq(this._index-1);var c=a.prop('offsetLeft')+a.prop('clientWidth')*this._alignment,s=this.$start.prop('offsetLeft')+this.$start.prop('clientWidth')*this._alignment;this._offset=-(c-s);this.update()};C.prototype.bind=function(){var a=Math.abs,b=false,c=false,f=this.options.dragRadius,x,g,i,j,s=this,k=this.$element,l=this.$inner,o=this.options,m=this.$element.width(),n=false,p=false;function q(e){if(e.isMarked("delayedMouseEvent")){return}var E=jQuery(e.target).control(0);if(E instanceof sap.m.Slider||E instanceof sap.m.Switch||E instanceof sap.m.IconTabBar){c=true;return}b=true;c=false;x=U.getCursorPosition(e);g=0;i=0;j=false;s._disableAnimation();n=s._index==1;p=s._index==s._length}function r(e){if(!b||c||e.isMarked("delayedMouseEvent")){return}var v=U.getCursorPosition(e);g=x.x-v.x;i=x.y-v.y;if(j||a(g)>a(i)&&(a(g)>f)){j=true;e.preventDefault();if(n&&(g<0)){g=g*(-m)/(g-m)}else if(p&&(g>0)){g=g*(m)/(g+m)}s._offsetDrag=-g;s.update()}else if((a(i)>a(g))&&(a(i)>f)){c=true}}function t(e){if(!b||e.isMarked("delayedMouseEvent")){return}b=false;s._enableAnimation();if(!c&&a(g)>o.moveRadius){if(g>0){s.getRTL()?s.prev():s.next()}else{s.getRTL()?s.next():s.prev()}}else{s._offsetDrag=0;s.update()}}function u(e){if(j){e.preventDefault();e.stopPropagation();e.setMarked()}}l.on(U.events.down,q).on(U.events.move,r).on(U.events.up,t).on('click.carousel',u).on('mouseout.carousel',t);k.on('click','[data-slide]',function(e){e.preventDefault();var v=$(this).attr('data-slide'),w=parseInt(v,10);if(isNaN(w)){s[v]()}else{}});k.on('afterSlide',function(e,v,w){s.$items.eq(v-1).removeClass(s._getClass('active'));s.$items.eq(w-1).addClass(s._getClass('active'));s.$element.find('[data-slide=\''+v+'\']').removeClass(s._getClass('active'));s.$element.find('[data-slide=\''+w+'\']').addClass(s._getClass('active'))});k.trigger('beforeSlide',[1,1]);k.trigger('afterSlide',[1,1]);s.update()};C.prototype.unbind=function(){this.$inner.off()};C.prototype.destroy=function(){this.unbind();this.$element.trigger('destroy');this.$element.remove();this.$element=null;this.$inner=null;this.$start=null;this.$current=null};C.prototype.move=function(n,o){if(this._length===0){return}var a=this.$element,b=this.$inner,c=this.$items,e=this.$start,f=this.$current,l=this._length,i=this._index;o=o||{};if(n<1){if(this._bLoop){this.changeAnimation('sapMCrslNoTransition');n=this._length}else{n=1}}else if(n>this._length){if(this._bLoop){this.changeAnimation('sapMCrslNoTransition');n=1}else{n=l}}var t=true;if(n==this._index){t=false}if(t){a.trigger('beforeSlide',[i,n])}this.$current=f=c.eq(n-1);var g=f.prop('offsetLeft')+f.prop('clientWidth')*this._alignment,s=e.prop('offsetLeft')+e.prop('clientWidth')*this._alignment;var j=-(g-s);this._offset=j;this._offsetDrag=0;this._index=n;this.update();if(t){a.trigger('afterSlide',[i,n])}};C.prototype.next=function(){this.move(this._index+1)};C.prototype.prev=function(){this.move(this._index-1)};return C})(Mobify.$,Mobify.UI.Utils);(function($){$.fn.carousel=function(a,o){var i=$.extend({},$.fn.carousel.defaults);if(typeof a=='object'){i=$(i,a);o=null;a=null}this.each(function(){var b=$(this),c=this._carousel;if(!c){c=new Mobify.UI.Carousel(this,i)}if(a){c[a](o);if(a==='destroy'){c=null}}this._carousel=c});return this};$.fn.carousel.defaults={}})(Mobify.$);