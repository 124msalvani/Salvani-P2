// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();


//Img.moreIndicator click handler
$(document).ready(function(){
	$(".moreIndicator").click(function(){
		if ($(".moreIndicator").hasClass("rot90")){
			$(".moreIndicator").removeClass("rot90")
			$(".moreIndicator").addClass("rot270")
			$("div.details").fadeToggle("fast", "linear")
		} else {
			$(".moreIndicator").removeClass("rot270")
			$(".moreIndicator").addClass("rot90")
			$("div.details").fadeToggle("fast", "linear")
		}
		
	});

	///Offset #nextPhoto
	$("#nextPhoto").addClass("rightSide");



	//Hover Handles to nextPhoto and prevPhoto
	$("#nextPhoto").hover(function(){
		$(this).css('opacity', '0.8');
		}, function(){
		$(this).css('opacity', '1');
	  });
	  $("#prevPhoto").hover(function(){
		$(this).css('opacity', '0.8');
		}, function(){
		$(this).css('opacity', '1');
	  });



	//   TRY THESE INSTEAD... very similar to yours //
	
	//Click Handlers
	/*  
	$("#nextPhoto").click(function(){
		swapPhoto()
		if (mCurrentIndex >=mJson.images.length){
			mCurrentIndex = 0;
			swapPhoto()
			return;
		}
		});

		$("#prevPhoto").click(function(){
			
			mCurrentIndex= mCurrentIndex-2;
			if (mCurrentIndex > mJson.images.length){
				mCurrentIndex = 0;
				return;

			} else if (mCurrentIndex < 0){
				mCurrentIndex = 13;
				console.log(mCurrentIndex);
				return;
				
			}

			swapPhoto();
			
	}); */
}); 
 


var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	console.log("Current Index: " + mCurrentIndex);

	document.getElementById("photo").src = mImages[mCurrentIndex].url;
	document.getElementsByClassName("location")[0].innerHTML = "Location: " + mImages[mCurrentIndex].location;
	document.getElementsByClassName("description")[0].innerHTML = "Description: " + mImages[mCurrentIndex].description;
	document.getElementsByClassName("date")[0].innerHTML = "Date: " + mImages[mCurrentIndex].date;
	
	mCurrentIndex++;
	mLastFrameTime = 0;

	if (mCurrentIndex >=mJson.images.length){
		mCurrentIndex = 0;
		return;
	}
	//with a new image from your images array which is loaded 
	
	//from the JSON string
		console.log(swapPhoto)
	
	
	
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [
	
];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	//$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');
	fetchJSON()

}, false);

function GalleryImage() {
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	let location;
	//2. description of photo
	let description;
	//3. the date when the photo was taken
	let date;
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
	let url;
};


/*call to access the information in the JSON file. */
function fetchJSON(){
	mRequest.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			mJson = JSON.parse(mRequest.responseText);
			iterateJSON();
		};
		
	};
	mRequest.open("GET", mUrl, true)
	mRequest.send();
};

function iterateJSON(){
	for(let i = 0; i<mJson.images.length; i++){
		mImages[i] = new GalleryImage();
		mImages[i].location = mJson.images[i].imgLocation;
		mImages[i].description = mJson.images[i].description;
		mImages[i].date = mJson.images[i].date;
		mImages[i].url = mJson.images[i].imgPath;
	}
}
