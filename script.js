document.addEventListener("DOMContentLoaded", () => {
  // -------------------------
  // Lightbox
  // -------------------------
  const lightboxOpener = document.querySelector('.lightboxopener');
  const lightbox = document.querySelector('.lightbox');
  const lightboximg = document.getElementById('lightboximg');
  const closelightbox = document.querySelectorAll('.closelightbox');

  if (lightboxOpener) {
    lightboxOpener.addEventListener('click', () => {
      lightbox.classList.replace('hidden', 'block');
      lightboximg.classList.replace('opacity-100', 'opacity-0');
      document.body.classList.add('overflow-hidden');
      requestAnimationFrame(() => {
        lightboximg.classList.replace('opacity-0', 'opacity-100');
      });
    });
  }

  closelightbox.forEach(close => {
    close.addEventListener('click', () => {
      lightboximg.classList.replace('opacity-100', 'opacity-0');
      document.body.classList.remove('overflow-hidden');
      setTimeout(() => {
        lightbox.classList.replace('block', 'hidden');
      }, 300);
    });
  });

  // -------------------------
  // Tabindex for touch devices
  // -------------------------
  const cards = document.querySelectorAll('.project-item.feature');
  const setTabIndexForTouchDevices = enable => {
    cards.forEach(card => enable ? card.setAttribute('tabindex','0') : card.removeAttribute('tabindex'));
  };
  const isTouch = matchMedia('(hover: none) and (pointer: coarse)').matches || 'ontouchstart' in window;
  setTabIndexForTouchDevices(isTouch);
  window.addEventListener('orientationchange', () => setTabIndexForTouchDevices(matchMedia('(hover: none) and (pointer: coarse)').matches || 'ontouchstart' in window));

  // -------------------------
  // Counters + SVG animation
  // -------------------------
  const element1 = document.getElementById("counter1");
  const element2 = document.getElementById("counter2");
  const svgAnimation = document.getElementById("lineAnimation");

  const animate = (el, start, end, dur) => {
    let startTime = null;
    const step = timestamp => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / dur, 1);
      el.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (element1) {
    new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(element1, 0, 200, 3000);
          if (element2) animate(element2, 0, 20, 3000);
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

  const moveUnderline = (el, underlineEl) => {
    underlineEl.style.width = `${el.offsetWidth}px`;
    underlineEl.style.left = `${el.offsetLeft}px`;
  };

  // Initial setup
  moveUnderline(tabs[0], underline);
  tabs[0].classList.replace("text-[#6E6D6D]", "text-[#E0E0E0]");
  contents.forEach((c, i) => i === 0 ? c.classList.remove("hidden", "opacity-0") : c.classList.add("hidden", "opacity-0"));

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      moveUnderline(tab, underline);
      tabs.forEach(t => t.classList.replace("text-[#E0E0E0]", "text-[#6E6D6D]"));
      tab.classList.replace("text-[#6E6D6D]", "text-[#E0E0E0]");

      contents.forEach(c => c.classList.replace("opacity-100","opacity-0"));
      setTimeout(() => {
        contents.forEach(c => c.classList.add("hidden"));
        contents[index].classList.remove("hidden");
        requestAnimationFrame(() => contents[index].classList.add("opacity-100"));
      }, 300);
    });
  });

  // -------------------------
  // Project filter
  // -------------------------
  const projectTabs = document.querySelectorAll(".project-tab");
  const projectItems = document.querySelectorAll(".project-item");
  const projectUnderline = document.getElementById("project-underline");

  const moveProjectUnderline = el => {
    projectUnderline.style.width = `${el.offsetWidth}px`;
    projectUnderline.style.left = `${el.offsetLeft}px`;
  };

  const filterProjects = tabName => {
    projectItems.forEach(item => {
      item.classList.replace("opacity-100", "opacity-0");
      setTimeout(() => item.classList.add("hidden"), 300);
    });

    setTimeout(() => {
      projectItems.forEach(item => {
        if (tabName === "all" || item.classList.contains(tabName) || (tabName === "features" && item.classList.contains("feature"))) {
          item.classList.remove("hidden");
          requestAnimationFrame(() => item.classList.add("opacity-100"));
        }
      });
    }, 300);
  };

  const defaultTab = projectTabs[0];
  moveProjectUnderline(defaultTab);
  defaultTab.classList.add("text-white");
  projectItems.forEach(item => item.classList.add("hidden","opacity-0","transition-opacity","duration-300"));
  filterProjects(defaultTab.dataset.tab);

  projectTabs.forEach(tab => tab.addEventListener("click", () => {
    moveProjectUnderline(tab);
    filterProjects(tab.dataset.tab);
  }));

  // -------------------------
  // Contact section
  // -------------------------
  const contactsection = document.getElementById('contactsection');
  const opencontact = document.querySelectorAll('.opencontact');
  const closecontact = document.querySelector('.closecontact');

  opencontact.forEach(open => open.addEventListener('click', () => {
    contactsection.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }));

  closecontact?.addEventListener('click', () => {
    contactsection.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  });

  // -------------------------
  // Fade-in & Fade-top observer
  // -------------------------
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.replace("opacity-0","opacity-100");
        entry.target.classList.replace("translate-y-10","translate-y-0");
        entry.target.classList.replace("-translate-y-10","translate-y-0");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".fade-in").forEach(el => {
    el.classList.add("opacity-0","translate-y-10","transition","duration-700","ease-out");
    fadeObserver.observe(el);
  });

  document.querySelectorAll(".fade-top").forEach(el => {
    el.classList.add("opacity-0","-translate-y-10","transition","duration-700","ease-out");
    fadeObserver.observe(el);
  });

  // -------------------------
  // Loader logic
  // -------------------------
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.classList.add("opacity-0","transition","duration-700");
    setTimeout(() => {
      loader.style.display = "none";
      // re-check fades
      document.querySelectorAll(".fade-in,.fade-top").forEach(el => {
        fadeObserver.unobserve(el);
        fadeObserver.observe(el);
      });
    }, 700);
  });

  // -------------------------
  // Contact form submission
  // -------------------------
  const form = document.getElementById("myform");
  const formstatus = document.getElementById("formstatus");
  const submitBtn = document.getElementById("submitBtn");

  form?.addEventListener("submit", async e => {
    e.preventDefault();
    const data = new FormData(form);
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    formstatus.classList.remove("opacity-0");
    formstatus.textContent = " Sending...";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formstatus.textContent = "Message sent successfully!";
        form.reset();
        contactsection.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      } else {
        formstatus.textContent = "Oops! Something went wrong.";
      }
    } catch {
      formstatus.textContent = "Network error! Try again later.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
      setTimeout(() => formstatus.classList.add("opacity-0"), 1500);
    }
  });

});
