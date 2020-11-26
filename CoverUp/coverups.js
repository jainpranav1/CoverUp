
// receives deploy signal from background script
chrome.runtime.onMessage.addListener(gotMessage);

// true if the user inteface has been deployed
var deployed = false;

// runs when signal received from background script
function gotMessage(message, sender, sendResponse) {
	
	// runs if the user interface has not been deployed
	// function deploys user interface
	if (deployed === false) {
		deployed = true;
		
		$(function(){
			
			// free coverup - free from page
			// fixed coverup - fixed to page
			
			// variable for toggling free button
			var free = false;
			
			// variables store user inteface buttons
			var coverup_button = $('<button class="coverup_button">Add new coverup</button>');
			var clear_button = $('<button class="clear_button">Clear all coverups</button>');
			var free_button = $('<button class="free_button">Fixed\n coverup</button>');
			var duplicate_button = $('<button class="duplicate_button">Duplicate coverup</button>');
			
			// variable for storing properties for duplicate button
			var height_store, width_store, free_store;

			// prepends buttons to beginning of body
			$('body').prepend(coverup_button.fadeIn(400));
			$('body').prepend(clear_button.fadeIn(400));
			$('body').prepend(free_button.fadeIn(400));
			$('body').prepend(duplicate_button.fadeIn(400));


			// function for toggling free button
			// free button determines whether coverup button creates free or fixed coverups
			$(".free_button").click(function(){
								
				if (free === false) {
					free = true;
					$(this).text("Free \n coverup");
				}
				else {
					free = false;
					$(this).text("Fixed \n coverup");
				}
				
				$(this).toggleClass("free_button_toggle", 1000);

			});

			// function for activating coverup button
			// coverup button creates coverups
			$(".coverup_button").click(function(){
				var x = $(".coverup_button").offset();		
				var newDiv = $('<div class="coverup"></div>');
				
				// creates free or fixed coverup
				if (free === true) {
					$(newDiv).css('position', 'fixed');
					$(newDiv).css('top', 60);
					$(newDiv).css("background-color", "#eb8f8f");
					$(newDiv).css("outline-color", "#ff414d");
				}
				else {
					$(newDiv).css('position', 'absolute');
					$(newDiv).css('top', 60 + x.top);
				}
				
				
				// appends coverup to body
				$('body').append(newDiv.fadeIn(400));
				
				// makes coverup draggable and resizable
				$(newDiv).draggable({snap: true});
				$(newDiv).resizable({handles:'all'});
				
				// makes coverup deletable when clicked when shift key pressed
				$(newDiv).click(function(evt) {
					if (evt.shiftKey) {
						$(this).fadeOut(400, function(){
							$(this).remove();
						});
					}
				});	
				
				// saves coverup properties to duplicate button when double clicked 
				$(newDiv).dblclick(function() {				
					height_store = $(this).height();
					width_store = $(this).width();
					if ($(this).css("position") === "absolute") {
						free_store = false;
					}
					else {
						free_store = true;
					}
								
					$(".duplicate_button").mouseover(function() {
						$(this).stop();
					});
					
					$(".duplicate_button").effect("pulsate",
					{times:1}, 800);
				});
				
			});
			
			// function for activating duplicate button
			// duplicate button creates duplicate coverups
			$(".duplicate_button").click(function() {
				var x = $(".coverup_button").offset();		
				var copyDiv = $('<div class="coverup"></div>');

				$(copyDiv).css("height", height_store);
				$(copyDiv).css("width", width_store);
				
				// creates free or fixed coverup
				if (free_store === true) {
					$(copyDiv).css('position', 'fixed');
					$(copyDiv).css('top', 60);
					$(copyDiv).css("background-color", "#eb8f8f");
					$(copyDiv).css("outline-color", "#ff414d");
				}
				else {
					$(copyDiv).css('position', 'absolute');
					$(copyDiv).css('top', 60 + x.top);
				}
				
				// appends coverup to body
				$('body').append(copyDiv.fadeIn(400));
				
				// makes coverup draggable and resizable
				$(copyDiv).draggable({snap: true});
				$(copyDiv).resizable({handles:'all'});
				
				
				// makes coverup deletable when clicked when shift key pressed
				$(copyDiv).click(function(evt) {
					if (evt.shiftKey) {
						$(this).fadeOut(400, function(){
							$(this).remove();
						});
					}
				});	
				
				
				// saves coverup properties to duplicate button when double clicked 
				$(copyDiv).dblclick(function() {
					height_store = $(this).height();
					width_store = $(this).width();
					if ($(this).css("position") === "absolute") {
						free_store = false;
					}
					else {
						free_store = true;
					}
					
					$(".duplicate_button").mouseover(function() {
						$(this).stop();
					});
					
					$(".duplicate_button").effect("pulsate",
					{times:1}, 800);
				});
				
				
			});
			
			// function for acivating clear button
			// clear button deletes all coverups
			$(".clear_button").click(function(){
				$(".coverup").fadeOut(400, function(){
					$(".coverup").remove();
				})
			});
			
		});
	}
	
	// runs if the user interface has been deployed
	// function deletes user interface
	else {
		deployed = false;
		
		// functions delete all user interface buttons and coverups
		$(function() {
			
			$(".coverup_button").fadeOut(400, function() {
				$(this).remove();
			});
			
			$(".clear_button").fadeOut(400, function() {
				$(this).remove();
			});
			
			$(".free_button").fadeOut(400, function() {
				$(this).remove();
			});
			
			$(".duplicate_button").fadeOut(400, function() {
				$(this).remove();
			});
			
			$(".coverup").fadeOut(400, function() {
				$(this).remove();
			});
			
		});
	}
};