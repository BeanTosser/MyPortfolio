const MOBILE_WIDTH_THRESHOLD = 500;

let isMobile = false;

let sectionHeights = [];

const printScrollHeight = function () {
  let currentScrollHeight = window.scrollY;
  console.log("Current scroll position: " + currentScrollHeight);
  console.log("current section: " + window.location.pathname + "     " + window.location.hash);
};

window.onload = () => {
  // Check if the window width indicates this is likely a mobile device
  if(window.innerWidth < MOBILE_WIDTH_THRESHOLD){
    isMobile = true;
  }
  
  const siteContainer = document.getElementById("site_container");
  let siteHeight = siteContainer.clientHeight;

  const sections = document.getElementsByClassName("section");
  sectionHeights = Array.prototype.map.call(sections, (section, index) => {
    let sectionName;
    switch(index){
      case 0:
        sectionName = "Landing";
        break;
      case 1:
        sectionName = "About";
        break;
      default:
        sectionName = "Error";
    }
    console.log("section height: " + section.clientHeight);
    return {name: sectionName, height: section.clientHeight};
  })

  document.addEventListener("scroll", printScrollHeight);
};
