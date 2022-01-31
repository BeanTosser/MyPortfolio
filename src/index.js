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
let currentSectionIndex;
let sections = [];
let navLinks = [];

// When the window scroll position changes, check to see if the page section on screen has changed and change navlink styling accordingly
const onScroll = function () {
  let shouldSkip = false;
  sectionPositions.forEach((sectionPosition, index) => {
    
    // if we haven't already changed to a new section on this scroll instance:
    if(!shouldSkip){
      // If the top of the current window scroll position is between the top and bottom of this section
      if(window.scrollY >= sectionPosition.boundingRect.top && window.scrollY <= sectionPosition.boundingRect.bottom){
        //This is the current section on screen. Style it's corresponding navlink accordingly...
        console.log("Found the current section: " + sections[index].id);
        // ... IF it is not already the current section or if the current section has not been set yet
        console.log("currentSectionIndex: " + currentSectionIndex + "; index: " + index);
        if(currentSectionIndex !== index || currentSectionIndex === undefined){ 
          // No need to reset the classname if it was never changed in the first place
          if(currentSectionIndex !== undefined){
            navLinks[currentSectionIndex].className = "nav_link";
          }
          currentSectionIndex = index;
          navLinks[currentSectionIndex].className += " current_section"
          console.log("Just set current section link");
        }
        shouldSkip = true;  
      }
    }
  })
  // reset the "skip" flag so it won't interfere with the next scroll section check
  shouldSkip = false;
};

function handleLinkClick(element){
  let sectionName = element.id;
  let position;
  console.log("clicked link name: " + sectionName);
  for(let i = 0; i < sections.length; i++){
    console.log("Checking against section with name " + sections[i].id);
    if(sections[i].id === sectionName){
      position = sections[i].getBoundingClientRect().top;
      console.log("position to scroll to: " + position);
      isScrolling = true;
      scrollWindowForDuration(position, 100, function() {isScrolling = false});
      return;
    }
  }
  throw new Error("Can't scroll to a nonexistant section");
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
  // Run onScroll to find out which section is the current section and style its link accordingly
  onScroll();
};
