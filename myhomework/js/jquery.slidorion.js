/*
* Slidorion, An Image Slider and Accordion Combined
* Intructions: http://www.slidorion.com
* Created by Ben Holland - http://www.ben-holland.co.uk
* Version: 0.94
* Copyright 2011 Ben Holland <benholland99@gmail.com>
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
(function($){
	$.fn.extend({
		slidorion: function(options) {
			var defaults = {
				autoPlay: true,
				easing: '',
				effect: 'fade',
				first: "section1",
				interval: 7000,
				hoverPause: false,
				speed: 1000
			};
			
			var options = $.extend(defaults, options);
			
			return this.each(function() {
				
				var o = options;
				var current = o.first;
				var section = "";
				var speed = o.speed;
				var effect = o.effect;
				var easingOption = o.easing;
				var interval = o.interval;
				var hoverPause = o.hoverPause;
				var autoPlay = o.autoPlay;
				var zPos = 1;
				var sliderCount = 0;
				var accordionCount = 0;
				var intervalPause = false;
				var active = false;
				var loaded = false;
				var previousEffect = '';
				var obj = $(this);
				
				if(sliderCount==accordionCount){
					$('.slider-image', obj).each(function(){
						sliderCount++;
						obj.data('slideCount', sliderCount);
					});
					$('.slider-link', obj).each(function(){
						accordionCount++;
						obj.data('accordCount', accordionCount);
					});
					
					//obj.data('accordCount', accordionCount);
					if(autoPlay==true){
						var autoPlaying = setInterval(function(){playSlider(current, effect, speed, easingOption);}, interval);
						obj.data('interval', autoPlaying);
					}
					if(hoverPause==true && autoPlay==true){
						obj.hover(function(){
							intervalPause = true;
							stopAuto();
						}, function(){
							intervalPause = false;
							startAuto();
						});
					}
					
					var items = $(".slider-link", obj);
					$('.content', obj).hide();
					$('.header a[rel="'+current+'"]', obj).addClass('active').parent().next().show();
					centerImages(current);
					items.click(sectionClicked);
				}else{
					console.log("The number of slider images does not match the number of accordion sections.");
				}
				
				$(window).load(function(){
					loaded = true;
				});
				
				function animation(current, section, effect, speed, easingOption){
					if(!active && loaded){
						restartAuto();
						$current = $('.slider-image[rel="'+current+'"] img', obj);
						$new = $('.slider-image[rel="'+section+'"] img', obj);
						var imgWidth = $current.outerWidth();
						var imgHeight = $current.outerHeight();
						switch(effect){
							case 'fade':
								$new.css({'z-index':zPos,'display':'none'}).fadeIn(speed);
								break;
							case 'slideLeft':
								$new.css({'left':imgWidth,'opacity':'1'});
								$current.animate({'left':'-='+imgWidth,'top':'0','opacity':'1'}, {queue:true, duration:speed, easing:easingOption});
								$new.animate({'left':'-='+imgWidth,'top':'0','opacity':'1'}, {queue:true, duration:speed, easing:easingOption});
								break;
							case 'slideRight':
								$new.css({'left':'-'+imgWidth+'px','opacity':'1'});
								$current.animate({'left':'+='+imgWidth,'top':'0','opacity':'1'}, {queue:true, duration:speed, easing:easingOption});
								$new.animate({'left':'+='+imgWidth,'top':'0','opacity':'1'}, {queue:true, duration:speed, easing:easingOption});
								break;
							case 'slideUp':
								$new.css({'top':imgHeight,'opacity':'1'});
								$current.animate({'top':'-='+imgHeight,'left':'0','opacity':'1'}, {queue:true, duration:speed, easing:easingOption});
								$new.animate({'top':'-='+imgHeight,'left':'0','opacity':'1'}, {queue:true, duration:speed, easing:easingOption});
								break;
							case 'slideDown':
								$new.css({'top':'-'+imgHeight+'px','opacity':'1'});
								$current.animate({'top':'+='+imgHeight,'left':'0','opacity':'1'}, {queue:true, duration:speed, easing:easingOption});
								$new.animate({'top':'+='+imgHeight,'left':'0','opacity':'1'}, {queue:true, duration:speed, easing:easingOption});
								break;
							case 'overLeft':
								$new.css({'left':imgWidth,'top':'0','opacity':'1','z-index':zPos});
								$new.animate({'left':'-='+imgWidth,'top':'0','opacity':'1'}, {queue:true, duration:speed, easing:easingOption});
								break;
							case 'overRight':
								$new.css({'left':'-'+imgWidth+'px','top':'0','opacity':'1','z-index':zPos});
								$new.animate({'left':'+='+imgWidth,'top':'0','opacity':'1'}, {queue:true, duration:speed, easing:easingOption});
								break;
							case 'overUp':
								$new.css({'top':imgHeight,'left':'0','opacity':'1','z-index':zPos});
								$new.animate({'top':'-='+imgHeight,'left':'0','opacity':'1'}, {queue:true, duration:speed, easing:easingOption});
								break;
							case 'overDown':
								$new.css({'top':'-'+imgHeight+'px','left':'0','opacity':'1','z-index':zPos});
								$new.animate({'top':'+='+imgHeight,'left':'0','opacity':'1'}, {queue:true, duration:speed, easing:easingOption});
								break;
							case 'none':
								$new.css({'z-index':zPos});
								break;
						}
					}
				}
				
				function sectionClicked(){
					$objHeader = $(this, obj);
					section = $(this, obj).attr('rel');
					if(section==current){
						return false;
					}else{
						if($objHeader.parent().next().is(':hidden')) {
							$('.slider-link.active', obj).removeClass('active').parent().next().slideUp();
							$objHeader.addClass('active').parent().next().slideDown();
						}
						animation(current, section, effect, speed, easingOption);
					}
					zPos++;
					current = section;
					return false;
				}
				
				function playSlider(current, effect, speed, easingOption){
					if(intervalPause==false){
						var slideNum = current.substr(current.length - 1);
						var sCount = obj.data('slideCount')+1;
						slideNum++;
						if(slideNum==sCount){
							$('.slider-link[rel="section1"]', obj).trigger('click', sectionClicked);
						}else{
							section = "section"+slideNum;
							$('.slider-link[rel="'+section+'"]', obj).trigger('click', sectionClicked);
						}
					}
				}
				
				function startAuto(){
					autoPlaying = setInterval(function(){playSlider(current, effect, speed, easingOption);}, interval);
					obj.data('interval', autoPlaying);
				}
				
				function stopAuto(){
					clearInterval(obj.data('interval'));
				}
				
				function restartAuto(){
					clearInterval(obj.data('interval'));
					autoPlaying = setInterval(function(){playSlider(current, effect, speed, easingOption);}, interval);
					obj.data('interval', autoPlaying);
				}
				
				function centerImages(current){
					var sHeight = $('#slider', obj).outerHeight();
					var sWidth = $('#slider', obj).outerWidth();
					var iHeight, iWidth, padTop, padLeft = 0;
					var bgColor = obj.css('backgroundColor');
					$('.slider-image img', obj).each(function(){
						iHeight = $(this).outerHeight();
						iWidth = $(this).outerWidth();
						padTop = (sHeight-iHeight)*0.5;
						padLeft = (sWidth-iWidth)*0.5;
						$(this).css({'padding-top':padTop,'padding-bottom':padTop,'padding-left':padLeft,'padding-right':padLeft,'background-color':bgColor,'position':'absolute'});
						$(this).css({'z-index':zPos});
						zPos++;
					});
					$('.slider-image[rel="'+current+'"] img', obj).css({'z-index':zPos});
					zPos++;
				}
				
			});
		}
	});
	
})(jQuery);





















