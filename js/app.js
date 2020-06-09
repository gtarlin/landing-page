/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

//create variable to contain list of all section elements
const allSections = document.querySelectorAll('section');

/**
 * End Global Variables

 * Begin Main Functions
 *
*/

// build the nav

//loop through each section and run function createNav
allSections.forEach(createNav);

function createNav(section) {
  var newLi = document.createElement("li");
  var newA = document.createElement("a");
  newA.innerHTML = (section.getAttribute("data-nav"));
  newA.href = `#${section.id}`;
  newA.classList.add("menu__link");
  newLi.id = (`li_${section.id}`);
  var ulElement = document.getElementById("navbar__list");
  newLi.appendChild(newA);
  ulElement.appendChild(newLi);

  //add scrolling feature when nav is clicked
  newA.addEventListener('click', (event) => {
    event.preventDefault();
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  });
}


// Add class 'isActive' to section when near top of viewport
//loop through all section elements, running addListener function for each one
allSections.forEach(addListener);

function addListener(section) {
  window.addEventListener('scroll', () => {
    var bbox = section.getBoundingClientRect();
    //instead should I calculate y value of centre of section BoundingClientRect
    //and look for the one closest to the centre of the window?
    var midSection = ((bbox.bottom - bbox.top) / 2) + bbox.top;
    var winHeight = window.innerHeight;
    var heightDiff = Math.abs(midSection - winHeight/2);
    console.log(`winHeight/2: ${winHeight/2}`);
    // console.log(`winHeight/2: ${winHeight/2}`);
    // console.log(`${section.id}   top: ${parseInt(bbox.top)} bottom: ${parseInt(bbox.bottom)}`);
    // console.log(`${section.id}   top: ${parseInt(bbox.top)} bottom: ${parseInt(bbox.bottom)}`);
    // console.log(`bottom: ${parseInt(bbox.bottom)}`);
    console.log(`${section.id}   distance from centre: ${Math.abs(parseInt(heightDiff))}`);

    // if ((bbox.bottom - bbox.top)/2 + bbox.top <= winHeight/2
    // if (bbox.top <= 175 && bbox.bottom >= 175 && !section.classList.contains("isActive")) {
    console.log(`active range: ${heightDiff <= winHeight/2}`);

    if ( heightDiff <= winHeight/2 && !section.classList.contains("isActive")) {
      // if (-400 <= heightDiff <= 400 && !section.classList.contains("isActive")) {
      section.classList.add("isActive");
      //also add class to anchor within li in nav
      const liActive = document.getElementById(`li_${section.id}`);
      liActive.firstChild.classList.add("activeLi");
    } else if (heightDiff > winHeight/2 && section.classList.contains("isActive")) {
      section.classList.remove("isActive");
      const liActive = document.getElementById(`li_${section.id}`);
      liActive.firstChild.classList.remove("activeLi");
    }
  })
}
