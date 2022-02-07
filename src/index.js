const MOBILE_WIDTH_THRESHOLD = 500;

let isMobile = false;
/*
 * The auto window scroll that occurs when nav links are clicked takes place over many frames.
 * Keep track of whether this scrolling process is happening, because we don't want to test for
 * the current page section on every call to "onScollY"
 */
let isScrolling = false;
let currentSectionIndex;
let sections = [];
let sectionScrollDestinations = [];
let navLinks = [];

/*
 * Needs to be taken into account when using the window height, as the bottom of the navbar is effectively
 * the top of the window.
 */
let headerBarHeight;

// When the window scroll position changes, check to see if the page section on screen has changed and change navlink styling accordingly
const onScroll = function () {
  let shouldSkip = false;
  // Sections != true array; instead, it is "array-like". Foreach must be run as array.prototype.forEach.call
  Array.prototype.forEach.call(sectionScrollDestinations, (section, index) => {
    // if we haven't already changed to a new section on this scroll instance:
    if(!shouldSkip){
      // If the top of the current window scroll position is between the top and bottom of this section
      if(section.getBoundingClientRect().top <= 0 && 
      sections[index].getBoundingClientRect().bottom - headerBarHeight > 0){
        //This is the current section on screen. Style its corresponding navlink accordingly...
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
  console.log("Sections: " + JSON.stringify(sections));
  for(let i = 0; i < sections.length; i++){
    console.log("");
    console.log("section id: " + sections[i].id);
    console.log("sectionScrollDest id: " + sectionScrollDestinations[i].id);
    if(sectionScrollDestinations[i].id === element.id + "_anchor"){
      sectionScrollDestinations[i].scrollIntoView({behavior: "smooth"});
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
  
  // Workaround for unsuppored "target-densitydpi" meta attribute
  const viewPortScale = 1 / window.devicePixelRatio;
  const meta = document.getElementById("viewport");
  meta.setAttribute("content", "user-scalable=no, initial-scale="+viewPortScale+", width=device-width")
  
  let headerBar = document.getElementById("nav_header");
  headerBarHeight = headerBar.offsetHeight;
  headerBarHeight += parseInt(window.getComputedStyle(headerBar).getPropertyValue('margin-top'));
  headerBarHeight += parseInt(window.getComputedStyle(headerBar).getPropertyValue('margin-bottom'));

  sections = document.getElementsByClassName("main_section");
  sectionScrollDestinations = document.getElementsByClassName("section_anchor");
  navLinks = document.getElementsByClassName("nav_link");

  // Burger menu button toggles nav menu in mobile mode
  let burgerButton = document.getElementById("burger_menu");
  let navMenu = document.getElementById("nav_menu");
  burgerButton.addEventListener("click", () => {
    console.log("Burger clicked");
    if(navMenu.class === "open") {
      navMenu.class = "";
      console.log("closing menu");
    } else {
      navMenu.class = "open";
      console.log("Opening menu");
    }
  })

  document.documentElement.style.setProperty('--nav-header-height', headerBarHeight.toString() + "px");

  document.addEventListener("scroll", onScroll);
  // Run onScroll to find out which section is the current section and style its link accordingly
  onScroll();
};
