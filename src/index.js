const MOBILE_WIDTH_THRESHOLD = 500;

let isMobile = false;
/*
 * The auto window scroll that occurs when nav links are clicked takes place over many frames.
 * Keep track of whether this scrolling process is happening, because we don't want to test for
 * the current page section on every call to "onScollY"
 */
let isScrolling = false;

let sectionPositions = [];
// default current section to home
let currentSectionIndex = 0;
let sections = [];
let navLinks = [];

// When the window scroll position changes, check to see if the page section on screen has changed and change navlink styling accordingly
const onScroll = function () {
  console.log("Current scroll position: " + window.scrollY);
  let shouldSkip = false;
  sectionPositions.forEach((sectionPosition, index) => {
    
    // if we haven't already changed to a new section on this scroll instance:
    if(!shouldSkip){
      // If the top of the current window scroll position is between the top and bottom of this section
      console.log("checking section " + sectionPosition.name);
      console.log("window position: " + window.scrollY + "; section top: " + sectionPosition.boundingRect.top + "; bottom: " + sectionPosition.boundingRect.bottom);
      if(window.scrollY >= sectionPosition.boundingRect.top && window.scrollY <= sectionPosition.boundingRect.bottom){
        //This is the current section on screen. Style it's corresponding navlink accordingly...
        console.log("Found the current section: " + sections[index].id);
        // ... IF it is not already the current section
        if(currentSectionIndex != index){ 
          console.log("Crossed into a new section from " + sections[currentSectionIndex].id);
          navLinks[currentSectionIndex].className = "nav_link";
          console.log("current section is now: " + sections[index].id);
          currentSectionIndex = index;
          navLinks[currentSectionIndex].className += " current_section"
        }
        shouldSkip = true;  
      }
    }
  })
  // reset the "skip" flag so it won't interfere with the next scroll section check
  shouldSkip = false;
};

function handleClick(element){
  let rect = element.getBoundingClientRect();
  let position = rect.top;
  isScrolling = true;
  scrollWindowForDuration(position, 100, function() {isScrolling = false;});
}

window.onload = () => {
  // Check if the window width indicates this is likely a mobile device
  if(window.innerWidth < MOBILE_WIDTH_THRESHOLD){
    isMobile = true;
  }

  sections = document.getElementsByClassName("section");
  navLinks = document.getElementsByClassName("nav_link");
  console.log("nav links:");
  Array.prototype.forEach.call(navLinks, link => console.log(link.innerHTML));
  sectionPositions = Array.prototype.map.call(sections, section => {
    console.log("section id: " + section.id);
    console.log("section position: " + section.getBoundingClientRect().top);
    let sectionName = section.id;
    return {name: sectionName, boundingRect: section.getBoundingClientRect()};
  })

  document.addEventListener("scroll", onScroll);
};
