function smoothScroll(div) {
    closeNav();
    var element = document.getElementById(div.id);
    var position = element.getBoundingClientRect();
    var y = position.top;
    if (window.innerWidth > 600) {
        y = y - 100;
    }
    window.scrollTo({
        top: y + window.scrollY,
        behavior: 'smooth'
    });

}


document.body.style.zoom="100%"


function openNav() {
    document.body.style.overflow = 'hidden';
    document.getElementById("nav").style.width = "100%";
}

function closeNav() {
    document.body.style.overflow = 'auto';
    document.getElementById("nav").style.width = "0%";
}


var slideIndexes = new Map([
  ["sweets", 0],
  ["coffee", 0],
  ["gallery", 0]
]);

var timeOutIndexes = new Map();

function showSlides(type, increment = 1, auto = true) {
    var className = type + 'Slides';
    var i;
    var slides = document.getElementsByClassName(className);
    slideIndex = slideIndexes.get(type);
    for (i = 0; i < slides.length; i++) {
	slides[i].style.display = "none";
    }
    slideIndex += increment;
    if (slideIndex >= slides.length) {slideIndex = 0}
    if (slideIndex < 0 ) { slideIndex = slides.length - 1 }

    slides[slideIndex].style.display = "block";
    if(auto) {
	index =
	    setTimeout(function() { showSlides(type, slideIndex + 1)}, 2000);
	timeOutIndexes[type] = index;
    } else {
	index = timeOutIndexes[type];
	if(index) {
	    clearTimeout(index);
	}
    }
    slideIndexes.set(type, slideIndex);
}


var slideIndex = 0;
showSlides("coffee");
showSlides("sweets");
showSlides("gallery");
