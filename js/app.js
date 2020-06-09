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

//create variable to contain list of all section elements
const allSections = document.querySelectorAll('section');

allSections.forEach(section => {

  // build the nav
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

  //make sections and menu items active when scrolling
  //comparing abs() of difference between middle of section and middle of window
  window.addEventListener('scroll', () => {
    const bbox = section.getBoundingClientRect();
    const winHeight = window.innerHeight;
    const midSection = ((bbox.bottom - bbox.top) / 2) + bbox.top;
    const heightDiff = Math.abs(midSection - winHeight / 2);
    if (heightDiff <= winHeight / 2 && !section.classList.contains("isActive")) {
      section.classList.add("isActive");
      const liActive = document.getElementById(`li_${section.id}`);
      liActive.firstChild.classList.add("activeLi");
    } else if (heightDiff > winHeight / 2 && section.classList.contains("isActive")) {
      section.classList.remove("isActive");
      const liActive = document.getElementById(`li_${section.id}`);
      liActive.firstChild.classList.remove("activeLi");
    }
  });
});
