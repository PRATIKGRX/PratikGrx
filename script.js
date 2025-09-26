let lightboxOpener = document.querySelector('.lightboxopener');
let lightbox = document.querySelector('.lightbox');

lightboxOpener.addEventListener('click', () => {
  lightbox.classList.remove('hidden');
  lightbox.classList.add('block');
});

let closelightbox = document.querySelectorAll('.closelightbox');
closelightbox.forEach(close => {
  close.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('block');
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------
  // Counters + SVG animation
  // -------------------------
  let element1 = document.getElementById("counter1");
  let element2 = document.getElementById("counter2");
  let svgAnimation = document.getElementById("lineAnimation");

  const start1 = 0, end1 = 200, duration1 = 3000;
  const start2 = 0, end2 = 20, duration2 = 3000;

  function animate(el, start, end, dur) {
    let startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      let progress = Math.min((timestamp - startTime) / dur, 1);
      el.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (element1) {
    new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(element1, start1, end1, duration1);
          if (element2) animate(element2, start2, end2, duration2);
          if (svgAnimation) svgAnimation.beginElement();
          obs.disconnect();
        }
      });
    }, { threshold: 0.5 }).observe(element1);
  }

  // -------------------------
  // Tabs (main)
  // -------------------------
  const tabs = document.querySelectorAll(".tab");
  const underline = document.getElementById("underline");
  const contents = document.querySelectorAll(".tab-content");

  function moveUnderline(element, targetUnderline) {
    targetUnderline.style.width = element.offsetWidth + "px";
    targetUnderline.style.left = element.offsetLeft + "px";
  }

  // set initial underline + active style + content
  moveUnderline(tabs[0], underline);
  tabs[0].classList.replace("text-[#6E6D6D]", "text-[#E0E0E0]");

  contents.forEach((c, i) => {
    if (i === 0) {
      c.classList.remove("hidden");
      requestAnimationFrame(() => c.classList.remove("opacity-0")); // fade in first
    } else {
      c.classList.add("hidden", "opacity-0");
    }
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // move underline
      moveUnderline(tab, underline);

      // update active tab styles
      tabs.forEach((t) => {
        t.classList.remove("text-[#E0E0E0]");
        t.classList.add("text-[#6E6D6D]");
      });
      tab.classList.remove("text-[#6E6D6D]");
      tab.classList.add("text-[#E0E0E0]");

      // fade out all
      contents.forEach((c) => {
        c.classList.remove("opacity-100");
        c.classList.add("opacity-0");
        setTimeout(() => c.classList.add("hidden"), 300); // match duration-300/500
      });

      // fade in selected
      setTimeout(() => {
        contents[index].classList.remove("hidden");
        requestAnimationFrame(() => {
          contents[index].classList.remove("opacity-0");
          contents[index].classList.add("opacity-100");
        });
      }, 300);
    });
  });

  // -------------------------
  // Project filter
  // -------------------------
  const projectTabs = document.querySelectorAll(".project-tab");
  const projectItems = document.querySelectorAll(".project-item");
  const projectUnderline = document.getElementById("project-underline");

  function moveProjectUnderline(element) {
    projectUnderline.style.width = element.offsetWidth + "px";
    projectUnderline.style.left = element.offsetLeft + "px";
  }

  function filterProjects(tabName) {
    // fade out all first
    projectItems.forEach((item) => {
      item.classList.remove("opacity-100");
      item.classList.add("opacity-0");
      setTimeout(() => item.classList.add("hidden"), 300); // match CSS transition
    });

    // fade in selected after fade-out completes
    setTimeout(() => {
      projectItems.forEach((item) => {
        if (
          tabName === "all" ||
          item.classList.contains(tabName) ||
          (tabName === "features" && item.classList.contains("feature"))
        ) {
          item.classList.remove("hidden");
          requestAnimationFrame(() => {
            item.classList.remove("opacity-0");
            item.classList.add("opacity-100");
          });
        }
      });
    }, 300);
  }

  // default active tab = first one (Feature)
  const defaultTab = projectTabs[0];
  const defaultName = defaultTab.textContent.trim().toLowerCase();

  moveProjectUnderline(defaultTab);
  defaultTab.classList.add("text-white");

  // set initial state: hide all, then fade in defaults
  projectItems.forEach((item) => {
    item.classList.add("hidden", "opacity-0", "transition-opacity", "duration-300");
  });
  filterProjects(defaultName);

  // add click listeners
  projectTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabName = tab.textContent.trim().toLowerCase();
      moveProjectUnderline(tab);
      projectTabs.forEach((t) => t.classList.remove("text-white"));
      tab.classList.add("text-white");
      filterProjects(tabName);
    });
  });

  // -------------------------
  // Contact section
  // -------------------------
  let contactsection = document.getElementById('contactsection');
  let opencontact = document.querySelectorAll('.opencontact');
  let closecontact = document.querySelector('.closecontact');

  opencontact.forEach((open) => {
    open.addEventListener('click', () => {
      contactsection.classList.remove('hidden');
    });
  });

  if (closecontact) {
    closecontact.addEventListener('click', () => {
      contactsection.classList.add('hidden');
    });
  }

  // -------------------------
  // Fade-in observer + setup
  // -------------------------
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
        entry.target.classList.remove("opacity-0", "translate-y-10");
        // fadeInObserver.unobserve(entry.target); // uncomment if you only want once
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".fade-in").forEach(el => {
    el.classList.add(
      "opacity-0",
      "translate-y-10",
      "transition",
      "duration-700",
      "ease-out"
    );
    fadeInObserver.observe(el);
  });

  // -------------------------
  // Loader logic (wait for full load)
  // -------------------------
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.classList.add("opacity-0", "transition", "duration-700");

    setTimeout(() => {
      loader.style.display = "none";

      // Force re-check AFTER loader is gone so top elements animate
      document.querySelectorAll(".fade-in").forEach(el => {
        fadeInObserver.unobserve(el);
        fadeInObserver.observe(el);
      });
    }, 700); // match fade-out duration
  });
});
