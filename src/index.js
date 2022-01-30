const MOBILE_WIDTH_THRESHOLD = 500;

let isMobile = false;
/*
 * The auto window scroll that occurs when nav links are clicked takes place over many frames.
 * Keep track of whether this scrolling process is happening, because we don't want to test for
 * the current page section on every call to "onScollY"
 */
let isScrolling = false;
let sectionPositions = [];
let currentSection = "home";

const printScrollHeight = function () {
  let currentScrollHeight = window.scrollY;
  sectionPositions.forEach(sectionPosition => {
    if(window.scrollY >= sectionPosition.position){
      currentSection = sectionPosition.name;
      return;
    }
  })
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

  const sections = document.getElementsByClassName("section");
  sectionPositions = Array.prototype.map.call(sections, section => {
    console.log("section id: " + section.id);
    console.log("section position: " + section.getBoundingClientRect().top);
    let sectionName = section.id;
    return {name: sectionName, position: section.getBoundingClientRect().top};
  })

  document.addEventListener("scroll", printScrollHeight);
};
