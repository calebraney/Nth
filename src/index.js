//v1.0.0
// Webflow is initialized
window.Webflow ||= [];
window.Webflow.push(() => {
  // Run code once webflow is initialized

  // GSAP ANIMATIONS
  gsap.registerPlugin(ScrollTrigger);

  // Keep lenis and scrolltrigger in sync
  lenis.on('scroll', () => {
    if (!ScrollTrigger) return;
    ScrollTrigger.update();
  });

  let typeSplit = new SplitType('[split-text]', {
    types: 'lines, words, chars',
  });
  const heroLoad = function () {
    let tl = gsap.timeline({
      defaults: {
        // children inherit these defaults
        duration: 1,
        ease: 'power3.out',
      },
    });
    tl.from('.why-hero_grid-item', {
      opacity: 0,
      scale: 0.5,
      duration: 0.3,
      stagger: { each: 0.02, from: 'random' },
    });
    tl.from(
      '.why-hero_h1',
      {
        y: '50%',
        opacity: 0,
        rotateX: -45,
      },
      '<'
    );
    tl.from(
      '.why-hero_h2 .word',
      {
        y: '50%',
        opacity: 0,
        rotateX: -45,
        stagger: { each: 0.1, from: 'start' },
      },
      '<.4'
    );
  };

  const splitScroll = function () {
    const trigger = document.querySelector('.why-split_component');
    let typeSplit = new SplitType('.why-split_h2', {
      types: 'lines',
    });
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: 'top 80%',
        end: 'bottom 80%',
        ease: 'none',
        scrub: 1,
      },
      defaults: {
        duration: 1,
        ease: 'none',
      },
    });
    tl.from('.why-split_h2', {
      opacity: 0,
      duration: 0.5,
    });
    tl.from(
      '.why-split_h2-line',
      {
        x: '4rem',
      },
      '<'
    );
    tl.from(
      '.why-split_h2-highlight',
      {
        x: '-4rem',
      },
      '<'
    );
    tl.from(
      '.why-split_paragraph .line',
      {
        opacity: 0,
        y: '16px',
        duration: 1,
        stagger: { each: 0.1, from: 'start' },
      },
      '<'
    );
  };

  const marqueeScroll = function () {
    const trigger = document.querySelector('.why-marquee_title');
    let typeSplit = new SplitType('.why-marquee_h2', {
      types: 'lines, words',
    });
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: 'top 80%',
        end: 'bottom 20%',
        ease: 'none',
        scrub: 1,
      },
      defaults: {
        duration: 1,
        ease: 'none',
      },
    });
    tl.from(
      '.why-marquee_logo',
      {
        y: '4rem',
      },
      '<'
    );
    tl.from(
      '.why-marquee_h2 .word',
      {
        y: '-4rem',
      },
      '<'
    );
  };

  const slider = function () {
    const swiperEl = document.querySelector('.swiper');
    let slides = document.querySelectorAll('.swiper-slide');
    const ACTIVE_CLASS = 'is-active';
    const swiper = new Swiper('.swiper', {
      direction: 'horizontal',
      loop: true,
      speed: 400,
      slidesPerView: 3, // was auto for claycove
      initialSlide: 0,
      loopedSlides: 2,
      autoHeight: false, // used in claycove
      centeredSlides: true,
      followFinger: true,
      freeMode: false,
      preventInteractionOnTransition: true,
      slideToClickedSlide: true,
      spaceBetween: '10%',
      rewind: false,
      autoplay: {
        delay: 6000,
      },
      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      slideActiveClass: ACTIVE_CLASS,
      slideDuplicateActiveClass: ACTIVE_CLASS,
      navigation: {
        nextEl: swiperEl.querySelector('.swiper-next'),
        prevEl: swiperEl.querySelector('.swiper-prev'),
        disabledClass: 'is-disabled',
      },
    });
    // make the first item active
    slides[0].querySelector('.swiper-slide-trigger-in').click();
    const updateSlides = function () {
      //get all the slides
      slides = this.slides;
      console.log(swiper);
      console.log(slides);
      //loop through slides
      slides.forEach((slide) => {
        if (slide.classList.contains(ACTIVE_CLASS)) {
          slide.querySelector('.swiper-slide-trigger-in').click();
        } else {
          slide.querySelector('.swiper-slide-trigger-out').click();
        }
        // make sure the previous and next are disabled
        if (
          slide.classList.contains('swiper-slide-prev') ||
          slide.classList.contains('swiper-slide-next')
        ) {
          slide.querySelector('.swiper-slide-trigger-out').click();
        }
      });
    };
    // swiper.init(swiperEl);
    // swiper.on('afterInit', updateSlides);
    swiper.on('slideChangeTransitionStart', updateSlides);
    swiper.on('slideChangeTransitionEnd', updateSlides);
    //  slideChangeTransitionStart worked
  };

  slider();
  // GSAP Media Query
  let mm = gsap.matchMedia();
  mm.add(
    {
      //This is the conditions object
      isMobile: '(max-width: 767px)',
      isTablet: '(min-width: 768px)  and (max-width: 991px)',
      isDesktop: '(min-width: 992px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      let { isMobile, isTablet, isDesktop, reduceMotion } = context.conditions;
      // run regardless of breakpoint
      heroLoad();
      splitScroll();
      marqueeScroll();
      if (isDesktop) {
        //Run on desktop only
      }
      if (isMobile) {
        //Run on mobile only
      }
    }
  );
});
