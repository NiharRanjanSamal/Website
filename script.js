(function () {
  // Navbar scroll hide/show
  var header = document.querySelector('.header');
  var lastScrollTop = 0;
  var scrollThreshold = 5; // Minimum scroll distance to trigger
  
  window.addEventListener('scroll', function() {
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ignore small scrolls
    if (Math.abs(currentScroll - lastScrollTop) < scrollThreshold) {
      return;
    }
    
    if (currentScroll > lastScrollTop && currentScroll > 100) {
      // Scrolling down & past threshold
      header.classList.add('hidden');
      header.classList.remove('visible');
    } else {
      // Scrolling up or at top
      header.classList.remove('hidden');
      header.classList.add('visible');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  // Mobile menu toggle
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      menuToggle.setAttribute('aria-label', nav.classList.contains('open') ? 'Close menu' : 'Open menu');
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }

  // GSAP Animations for Industry Cards
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate industry cards with stagger effect
    gsap.utils.toArray('.industry-card').forEach(function(card, index) {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 60%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out'
      });

      // Animate the colored tab on scroll
      var tab = card.querySelector('.industry-tab');
      if (tab) {
        gsap.from(tab, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.6,
          delay: index * 0.15 + 0.2,
          ease: 'power2.out'
        });
      }

      // Animate image with subtle zoom
      var image = card.querySelector('.industry-image img');
      if (image) {
        gsap.from(image, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          scale: 1.2,
          duration: 1,
          delay: index * 0.15 + 0.1,
          ease: 'power2.out'
        });
      }
    });

    // Animate section title
    var sectionTitle = document.querySelector('.industries-section .section-title');
    if (sectionTitle) {
      gsap.from(sectionTitle, {
        scrollTrigger: {
          trigger: sectionTitle,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  }

  // Contact form submit - open mailto with form data
  var form = document.getElementById('contactForm');
  var formMessage = document.getElementById('formMessage');
  var contactEmail = 'nihar08ranjansamal@gmail.com';
  if (form && formMessage) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      formMessage.classList.remove('success', 'error');
      formMessage.textContent = '';

      var name = (form.name && form.name.value) || '';
      var company = (form.company && form.company.value) || '';
      var role = (form.role && form.role.value) || '';
      var email = (form.email && form.email.value) || '';
      var phone = (form.phone && form.phone.value) || '';
      var area = (form.area && form.area.value) || '';
      var message = (form.message && form.message.value) || '';

      var subject = 'Kespra Advisory Inquiry - ' + (name || 'Contact Form');
      var body = 'Full Name: ' + name + '\n';
      body += 'Company Name: ' + company + '\n';
      body += 'Role / Title: ' + role + '\n';
      body += 'Email: ' + email + '\n';
      body += 'Phone: ' + phone + '\n';
      body += 'Area of Interest: ' + area + '\n\n';
      body += 'Message:\n' + message;

      var mailto = 'mailto:' + contactEmail +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      window.location.href = mailto;

      formMessage.classList.add('success');
      formMessage.textContent = 'Your email client will open. Send the message to submit your inquiry.';
    });
  }
})();
