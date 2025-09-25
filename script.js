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