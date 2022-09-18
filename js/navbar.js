const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".item");

/* Toggle mobile menu */
function toggleMenu() {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");

    // adds the menu (hamburger) icon
    toggle.querySelector("a").innerText = "";
  } else {
    menu.classList.add("active");

    // adds the close (x) icon
    toggle.querySelector("a").innerText = "";
  }
}

/* Event Listener */
toggle.addEventListener("click", toggleMenu);
items.forEach(function (item) {
  item.addEventListener("click", toggleMenu);
});
