const createNavBar = (intoEl) => {
  // Create navbar elements
  var navbar = document.createElement("nav");
  navbar.className = "navbar navbar-expand-lg navbar-light bg-light";

  var containerFluid = document.createElement("div");
  containerFluid.className = "container-fluid";
  /*
      <a class="navbar-brand" href="#">YourBrand</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
              <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="#">About</a></li>
              <li class="nav-item"><a class="nav-link" href="#">Services</a></li>
              <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
          </ul>
      </div>
    */

  const navbarBrand = document.createElement("a");
  navbarBrand.className = "navbar-brand";
  navbarBrand.href = "index.html";
  navbarBrand.textContent = "Metabolism";
  containerFluid.appendChild(navbarBrand);
  // Create the toggle button
  const navbarToggler = document.createElement("button");
  navbarToggler.className = "navbar-toggler";
  navbarToggler.type = "button";
  navbarToggler.setAttribute("data-bs-toggle", "collapse");
  navbarToggler.setAttribute("data-bs-target", "#navbarNav");
  navbarToggler.setAttribute("aria-controls", "navbarNav");
  navbarToggler.setAttribute("aria-expanded", "false");
  navbarToggler.setAttribute("aria-label", "Toggle navigation");
  const span = document.createElement("span");
  span.className = "navbar-toggler-icon";
  navbarToggler.appendChild(span);
  containerFluid.appendChild(navbarToggler);
  // Create the collapsible part of the navbar
  const collapseDiv = document.createElement("div");
  collapseDiv.className = "collapse navbar-collapse";
  collapseDiv.id = "navbarNav";
  const ul = document.createElement("ul");
  ul.className = "navbar-nav";
  const navItems = [
    {
      name: "Anyang",
      href: "annyang.html",
    },
    {
      name: "SpeechKITT",
      href: "speechkitt.html",
    },
    {
      name: "Artyom",
      href: "artyom.html",
    },
  ];
  for (let item of navItems) {
    const li = document.createElement("li");
    li.className = "nav-item";
    const a = document.createElement("a");
    a.className = "nav-link";
    a.href = item.href;
    a.textContent = item.name;
    li.appendChild(a);
    ul.appendChild(li);
  }
  collapseDiv.appendChild(ul);
  containerFluid.appendChild(collapseDiv);

  navbar.appendChild(containerFluid);

  intoEl.insertBefore(navbar, intoEl.firstChild);
};
window.addEventListener("DOMContentLoaded", function () {
  let el = document.body; //getElementById("top-level-div");
  if (el) {
    createNavBar(el);
  } else {
    console.error("Element with ID 'top-level-div' not found.");
  }
});
