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
          svgAnimation.beginElement(); // ⬅️ trigger SVG stroke animation
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

  // set initial underline + active style + content
  moveUnderline(tabs[0]);
  tabs[0].classList.replace("text-[#6E6D6D]", "text-[#E0E0E0]");
  contents.forEach((c, i) => c.classList.toggle("hidden", i !== 0));

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // 👉 move underline here
      moveUnderline(tab);

      // update active tab styles
      tabs.forEach(t => {
        t.classList.remove("text-[#E0E0E0]");
        t.classList.add("text-[#6E6D6D]");
      });
      tab.classList.remove("text-[#6E6D6D]");
      tab.classList.add("text-[#E0E0E0]");

      // fade out all
      contents.forEach(c => {
        c.classList.add("opacity-0");
        setTimeout(() => c.classList.add("hidden"), 300);
      });

      // fade in selected
      setTimeout(() => {
        contents[index].classList.remove("hidden");
        requestAnimationFrame(() => {
          contents[index].classList.remove("opacity-0");
        });
      }, 300);
    });
  });
});

