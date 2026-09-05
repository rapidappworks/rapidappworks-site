document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.shot-carousel').forEach(function (carousel) {
    new Splide(carousel, {
      type: 'slide',
      perPage: 1,
      perMove: 1,
      rewind: true,
      drag: true,
      speed: 450,
      gap: '20px',
      pagination: true,
      arrows: true,
      keyboard: 'focused',
    }).mount();
  });
});
