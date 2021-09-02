// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Navbar Events
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

function navbarEventsOnClick() {
  const navLinks = document.querySelectorAll('.nav-link');
  let activeNavLink = document.querySelector('.nav-link.active');

  Array.from(navLinks).map((navLink) => {
    navLink.addEventListener("click", (event) => {
    activeNavLink.classList.remove("active");
    console.log(event.currentTarget);
    activeNavLink = event.currentTarget;
    activeNavLink.classList.add("active");
    })
  });
}

function navbarEventsOnScroll() {
  let activeNavLink = document.querySelector('.nav-link.active');
  const targets = document.querySelectorAll('.section');

  let options = {
    threshold: [0.5]
  }

  function handleIntersection(entries) {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        // console.log(entry.target.id + "is now visible");
        activeNavLink.classList.remove("active");
        activeNavLink = document.querySelector(`a[href="#${entry.target.id}"]`).parentNode;
        activeNavLink.classList.add("active");
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection, options);

  targets.forEach((target) => {
    observer.observe(target);
  });
}
