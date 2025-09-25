let lightboxOpener=document.querySelector('.lightboxopener');
let lightbox =document.querySelector('.lightbox');
lightboxOpener.addEventListener('click',()=>{
    lightbox.classList.remove('hidden');
    lightbox.classList.add('block')
});
let closelightbox = document.querySelectorAll('.closelightbox');
closelightbox.forEach(close => {
  close.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('block');
  });
});
document.addEventListener("DOMContentLoaded", function () {
  let element1 = document.getElementById("counter1");
  let element2 = document.getElementById("counter2");

  let start1 = 0, end1 = 200, duration1 = 3000;
  let start2 = 0, end2 = 20, duration2 = 3000;

  // your SVG <animate> element
  let svgAnimation = document.getElementById("lineAnimation");

  function animateCounters() {
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;

      // counter1
      let progress1 = Math.min((timestamp - startTime) / duration1, 1);
      element1.textContent = Math.floor(progress1 * (end1 - start1) + start1);

      // counter2
      let progress2 = Math.min((timestamp - startTime) / duration2, 1);
      element2.textContent = Math.floor(progress2 * (end2 - start2) + start2);

      if (progress1 < 1 || progress2 < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // observe when counters enter view
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();

        if (svgAnimation) {
          svgAnimation.beginElement(); // ⬅ trigger SVG stroke animation
        }

        obs.disconnect(); // run once, stop observing
      }
    });
  }, { threshold: 0.5 });

  observer.observe(element1);
});
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const underline = document.getElementById("underline");
  const contents = document.querySelectorAll(".tab-content");

  function moveUnderline(element) {
    underline.style.width = element.offsetWidth + "px";
    underline.style.left = element.offsetLeft + "px";
  }

  // ✅ set initial underline + active style + content
  moveUnderline(tabs[0]);
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
      // 👉 move underline
      moveUnderline(tab);

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
});
document.addEventListener("DOMContentLoaded", () => {
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

  // ✅ set default active tab = first one (Feature)
  const defaultTab = projectTabs[0];
  const defaultName = defaultTab.textContent.trim().toLowerCase();

  moveProjectUnderline(defaultTab);
  defaultTab.classList.add("text-white");

  // set initial state: hide all, then fade in defaults
  projectItems.forEach((item) => {
    item.classList.add("hidden", "opacity-0", "transition-opacity", "duration-300");
  });
  filterProjects(defaultName);

  // ✅ add click listeners
  projectTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabName = tab.textContent.trim().toLowerCase();

      moveProjectUnderline(tab);

      projectTabs.forEach((t) => t.classList.remove("text-white"));
      tab.classList.add("text-white");

      filterProjects(tabName);
    });
  });
});
