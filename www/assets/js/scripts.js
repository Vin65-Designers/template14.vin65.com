﻿var v65 = {
	global : {
		mainMenuHover : function(){
			$(".mainMenu ul li:last-child").css("margin-right", "0");
			$(".mainMenu ul li ul li").hover(function(){
				$(this).parent().parent().children("a").toggleClass("hover");
			});
		}
	},
	home : {
		initPhotoGallery : function(){
			if($("#slider").length){
				$("#slider").v65PhotoGallery({
					galleryHeight : 350, // This changes the height of the homepage photogallery
					galleryWidth : null, // This changes the width of the homepage photogallery
					galleryId : "964891e4-a231-7b8c-5b46-2cc64a607476"	//	This is where you add the homepage photogallery id
				});
			}
		}
	},
	page : {
		initPhotoGallery : function(){
			if($("#pagePhotoGallery").length){
				$("#pagePhotoGallery").v65PhotoGallery({
					/*
						Uncomment the code below if you want to change how the photo gallery is displayed.

						galleryHeight : 420, // This value is translated to 420px and will change the photogallery height
						galleryWidth : 630, // This value is translated to 630px and will change the photogallery width
						pauseTime : 5000, // Adjust how long the image is displayed for. Value is in milliseconds
						animSpeed : 1000, // Adjust the transition speed between images. Value is in milliseconds
						controlNav : false, // hide the 1,2,3 navigation
						directionNav : false // hide the arrow navigation
					*/
				});
			}
		}
	}
}

;(function($,undefined){
	$.fn.v65PhotoGallery = function(options){
		var defaults = {
			galleryId : $("#pagePhotoGallery").attr("v65jsphotogalleryid"),
			galleryHeight : $("#pagePhotoGallery").attr("v65jsphotogalleryheight"),
			galleryWidth : $("#pagePhotoGallery").attr("v65jsphotogallerywidth"),
			timestamp : "&timestamp="+ new Date().getTime(),
			effect:'fade', // Specify sets like: 'fold,fade,sliceDown'
			slices:15, // For slice animations
			animSpeed:500, // Slide transition speed
			pauseTime:5000, // How long each slide will show
			startSlide:0, // Set starting Slide (0 index)
			directionNav:true, // Next & Prev navigation
			directionNavHide:true, // Only show on hover
			controlNav:true // 1,2,3... navigation
		},
		gallery = $(this),
		settings = $.extend(defaults, options);
		gallery.html("").css({
			"height":settings.galleryHeight,
			"width":settings.galleryWidth,
			"overflow":"hidden"
		});
		$.ajax({
	    		type: "GET",
			url: "/index.cfm?method=pages.showPhotoGalleryXML&photogalleryid="+settings.galleryId+defaults.timestamp,
			dataType: "xml",
			success: function(xml) {
				var images = "";
				$(xml).find('img').each(function() {
					var location = '/assets/images/photogallery/images/large/',
						photo = $(this).attr('src'),
						caption = $(this).attr('caption'),
						url = $(this).attr('link');
					if (url === undefined) {
						images += '<img src="'+location+photo+'" title="'+caption+'"/>';
					} else{
						images += '<a href="'+url+'"><img src="'+location+photo+'" title="'+caption+'"/></a>';
					}
				});
				gallery.append(images);
			},
			complete: function(){
	   			gallery.nivoSlider({
					effect:settings.effect,
					slices:settings.slices,
					animSpeed:settings.animSpeed,
					pauseTime:settings.pauseTime,
					startSlide:settings.startSlide,
					directionNav:settings.directionNav,
					directionNavHide:settings.directionNavHide,
					controlNav:settings.controlNav
				});
	   		}
	   	});
	}
})(jQuery);

v65.global.mainMenuHover();
v65.home.initPhotoGallery();
v65.page.initPhotoGallery();