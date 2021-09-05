// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Navbar Events
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export function navbarEventsOnClick() {
  const navbarContainer = document.getElementById('navigation');
  const navLinks = document.querySelectorAll('.nav-link');
  let activeNavLink = document.querySelector('.nav-link.active');

  Array.from(navLinks).map((navLink) => {
    navLink.addEventListener("click", (event) => {
    activeNavLink.classList.remove("active");
    activeNavLink = event.currentTarget;
    activeNavLink.classList.add("active");
    if(!location.href.includes('#home')) {
      navbarContainer.classList.add('nav-background');
    }
    // location.href = location.href.split('/#');
    })
  });
}

export function navbarEventsOnScroll() {
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

export function navbarBackgroundChangeOnScroll() {
  const navbarContainer = document.getElementById('navigation');
  // const target = document.getElementById('hero');
  const target = document.querySelector('.navigation-filler');

  let options = {
    threshold: [0.1]
  }

  function handleIntersection(entries) {
    entries.map((entry) => {
      document.getElementById('navigation').classList.toggle('nav-background');
    });
  }

  const observer = new IntersectionObserver(handleIntersection, options);
  observer.observe(target);
}
