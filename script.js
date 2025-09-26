let lightboxOpener = document.querySelector('.lightboxopener');
let lightbox = document.querySelector('.lightbox');
let lightboximg = document.getElementById('lightboximg');
let closelightbox = document.querySelectorAll('.closelightbox');

// Open lightbox
lightboxOpener.addEventListener('click', () => {
  lightbox.classList.remove('hidden');
  lightbox.classList.add('block');

  // reset to invisible first
  lightboximg.classList.remove('opacity-100');
  lightboximg.classList.add('opacity-0');

  // trigger fade-in on next frame
  requestAnimationFrame(() => {
    lightboximg.classList.remove('opacity-0');
    lightboximg.classList.add('opacity-100');
  });
});

// Close lightbox
closelightbox.forEach(close => {
  close.addEventListener('click', () => {
    // fade out
    lightboximg.classList.remove('opacity-100');
    lightboximg.classList.add('opacity-0');

    // hide container after fade
    setTimeout(() => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('block');
    }, 300); // match your transition duration
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
        setTimeout(() => c.classList.add("hidden"), 300);
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
      setTimeout(() => item.classList.add("hidden"), 300);
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

  // set initial state
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
  // Fade-in & Fade-top observer
  // -------------------------
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
        entry.target.classList.remove("opacity-0", "translate-y-10", "-translate-y-10");
        // fadeObserver.unobserve(entry.target); // uncomment for one-time only
      }
    });
  }, { threshold: 0.2 });

  // fade-in (bottom)
  document.querySelectorAll(".fade-in").forEach(el => {
    el.classList.add(
      "opacity-0",
      "translate-y-10",
      "transition",
      "duration-700",
      "ease-out"
    );
    fadeObserver.observe(el);
  });

  // fade-top (top)
  document.querySelectorAll(".fade-top").forEach(el => {
    el.classList.add(
      "opacity-0",
      "-translate-y-10",
      "transition",
      "duration-700",
      "ease-out"
    );
    fadeObserver.observe(el);
  });

  // -------------------------
  // Loader logic
  // -------------------------
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.classList.add("opacity-0", "transition", "duration-700");

    setTimeout(() => {
      loader.style.display = "none";

      // re-check fades after loader disappears
      document.querySelectorAll(".fade-in, .fade-top").forEach(el => {
        fadeObserver.unobserve(el);
        fadeObserver.observe(el);
      });
    }, 700);
  });
});
