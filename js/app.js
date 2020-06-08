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
  //create new list item
  var newLi = document.createElement("li");
  //create new anchor tag
  var newA = document.createElement("a");
  //use data-nav attribute of section to get label for link
  newA.innerHTML = (section.getAttribute("data-nav"));
  //create link to section
  newA.href = `#${section.id}`;
  //add class of menu__link to turn on built in styling from css
  newA.classList.add("menu__link");
  //create id for the li based on section id
  newLi.id = (`li_${section.id}`);
  var ulElement = document.getElementById("navbar__list");
  //add anchor element to list element
  newLi.appendChild(newA);
  //add list element to UL
  ulElement.appendChild(newLi);
}


// Add class 'active' to section when near top of viewport

//loop through all section elements, running addListener function for each one
allSections.forEach(addListener);

function addListener(section) {
  //create event listener on window object
  window.addEventListener('scroll', () => {
    //find bounding box of section
    var bbox = section.getBoundingClientRect();
    //check to see if the bounding box is within limits and is not yet active
    if (bbox.top <= 130 && bbox.bottom >= 130 && !section.classList.contains("isActive")) {
      //add class isActive to section to turn on styling
      section.classList.add("isActive");
      //add activeLi class to anchor within li to turn on styling
      const liActive = document.getElementById(`li_${section.id}`);
      liActive.firstChild.classList.add("activeLi");
    //check to see if section if out of bounds but still has class isActive
    } else if ((bbox.top > 130 || bbox.bottom < 130) && section.classList.contains("isActive")) {
      //if so remove classes from section and from anchor within li
      section.classList.remove("isActive");
      const liActive = document.getElementById(`li_${section.id}`);
      liActive.firstChild.classList.remove("activeLi");
    }
  })
}
