const MOBILE_WIDTH_THRESHOLD = 500;

let isMobile = false;

let sectionHeights = [];
let navBar;

const printScrollHeight = function () {
  let currentScrollHeight = window.scrollY;
  console.log("Current scroll position: " + currentScrollHeight);
  console.log("current section: " + window.location.pathname + "     " + window.location.hash);
};

window.onresize = () => {
  if(window.innerWidth < MOBILE_WIDTH_THRESHOLD && !isMobile){
    isMobile = true;
    updateNavBar();
  } else if(window.innerWidth >= MOBILE_WIDTH_THRESHOLD && isMobile){
    isMobile = false;
    updateNavBar();
  }
}

function updateNavBar(){
  console.log("Updating nav bar");
  console.log("Old innerHTML: " + navBar.innerHTML)
  if(isMobile){
    navBar.innerHTML = `
	    <a name="home"></a>
      	    <img src="./images/Burger.png" alt="Burger Menu" id="burger_menu" />  
    `
  } else {
    navBar.innerHTML = `
    	<a name="home"></a>
        <ul id="nav_menu">
	  <li class="nav_link_container">
            <a href="#home">Home</a>
	  </li>
	  <li class="nav_link_container">
            <a href="#about">About</a>
	  </li>
	    <li class="nav_link_container">
          <a href="#work">Work</a>
	    </li>
	  <li class="nav_link_container">
            <a href="#contact">Contact</a>
	  </li>
        </ul>
      </nav>  
    `
  }
  console.log("New navbar html: " + navBar.innerHTML);
}

window.onload = () => {
  // Check if the window width indicates this is likely a mobile device
  if(window.innerWidth < MOBILE_WIDTH_THRESHOLD){
    isMobile = true;
  }
  
  navBar = document.getElementById("nav_bar");
  updateNavBar();
  
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
