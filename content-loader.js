(function () {
  function getByPath(obj, path) {
    if (!obj || !path) return undefined;
    var parts = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      cur = cur ? cur[parts[i]] : undefined;
    }
    return cur;
  }

  function escapeHtml(s) {
    if (typeof s !== 'string') return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  // Add additional "What We Do" items beyond the static HTML (which has 3)
  function addExtraWhatWeDoItems(items) {
    var container = document.querySelector('.what-we-do-section');
    if (!container || !items || !Array.isArray(items)) return;
    
    // Only add items beyond index 2 (0, 1, 2 are in static HTML)
    for (var i = 3; i < items.length; i++) {
      var item = items[i];
      var titleHtml = '';
      if (Array.isArray(item.titleLines)) {
        titleHtml = item.titleLines.map(function(line) {
          return '<span class="title-line">' + escapeHtml(line) + '</span>';
        }).join('');
      }
      
      var row = document.createElement('div');
      row.className = 'what-row';
      row.innerHTML = 
        '<h2 class="what-title">' + titleHtml + '</h2>' +
        '<p class="what-description">' + escapeHtml(item.description || '') + '</p>' +
        '<div class="what-image-wrapper">' +
          '<img src="' + (item.image || '') + '" alt="" class="what-image" />' +
        '</div>';
      container.appendChild(row);
    }
  }

  // Add additional industry items beyond the static HTML (which has 4)
  function addExtraIndustryItems(data) {
    var container = document.querySelector('.industries-grid');
    if (!container || !data || !Array.isArray(data.items)) return;
    
    // Only add items beyond index 3 (0, 1, 2, 3 are in static HTML)
    for (var i = 4; i < data.items.length; i++) {
      var item = data.items[i];
      var card = document.createElement('div');
      card.className = 'industry-card';
      card.setAttribute('data-color', item.color || '#666');
      card.innerHTML = 
        '<div class="industry-tab" style="background: ' + (item.color || '#666') + ';"></div>' +
        '<div class="industry-image">' +
          '<img src="' + (item.image || '') + '" alt="' + escapeHtml(item.title || '') + '" />' +
        '</div>' +
        '<div class="industry-content">' +
          '<h3>' + escapeHtml(item.title || '') + '</h3>' +
          '<p>' + escapeHtml(item.description || '') + '</p>' +
        '</div>';
      container.appendChild(card);
      
      // Trigger GSAP animation for dynamically added card
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
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
          delay: i * 0.15,
          ease: 'power3.out'
        });
        
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
            delay: i * 0.15 + 0.2,
            ease: 'power2.out'
          });
        }
        
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
            delay: i * 0.15 + 0.1,
            ease: 'power2.out'
          });
        }
      } else {
        // Fallback: manually set styles if GSAP not loaded yet
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    }
  }

  // Add additional team members beyond the static HTML (which has 3)
  function addExtraTeamMembers(data) {
    var container = document.querySelector('.team-grid');
    if (!container || !data || !Array.isArray(data.members)) return;
    
    // Only add members beyond index 2 (0, 1, 2 are in static HTML)
    for (var i = 3; i < data.members.length; i++) {
      var member = data.members[i];
      var card = document.createElement('div');
      card.className = 'team-card';
      card.innerHTML = 
        '<div class="team-image">' +
          '<img src="' + (member.image || '') + '" alt="' + escapeHtml(member.name || '') + '" />' +
          '<div class="team-info">' +
            '<h3>' + escapeHtml(member.name || '') + '</h3>' +
            '<p>' + escapeHtml(member.role || '') + '</p>' +
          '</div>' +
        '</div>';
      container.appendChild(card);
    }
  }

  // Add additional service areas beyond the static HTML (which has 4)
  function addExtraServiceAreas(data) {
    var container = document.querySelector('.service-area-list');
    if (!container || !data || !Array.isArray(data.items)) return;
    
    // Only add items beyond index 3 (0, 1, 2, 3 are in static HTML)
    for (var i = 4; i < data.items.length; i++) {
      var item = data.items[i];
      var article = document.createElement('article');
      article.className = 'service-area';
      article.innerHTML = 
        '<h3>' + escapeHtml(item.title || '') + '</h3>' +
        '<p>' + escapeHtml(item.description || '') + '</p>';
      container.appendChild(article);
      
      // Trigger GSAP animation for dynamically added service area
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(article, 
          { opacity: 0, y: 60 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: article,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      } else {
        // Fallback: manually set styles if GSAP not loaded
        article.style.opacity = '1';
        article.style.transform = 'translateY(0)';
      }
    }
  }

  // Add social media links dynamically
  function addSocialLinks(socialLinks) {
    var container = document.querySelector('.footer-social');
    if (!container || !socialLinks || !Array.isArray(socialLinks)) return;
    
    // Clear existing static social links
    container.innerHTML = '';
    
    // Add all social links from data
    for (var i = 0; i < socialLinks.length; i++) {
      var link = socialLinks[i];
      if (!link.url || !link.label) continue;
      
      var anchor = document.createElement('a');
      anchor.href = link.url;
      anchor.textContent = link.label;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      container.appendChild(anchor);
    }
  }

  function applyContent(content) {
    if (!content) return;

    // First, apply content to static elements via data attributes
    document.querySelectorAll('[data-content-id]').forEach(function (el) {
      var path = el.getAttribute('data-content-id');
      var value = getByPath(content, path);
      if (value === undefined || value === '') return;

      if (Array.isArray(value)) {
        el.innerHTML = value.map(function (line) {
          return '<span class="title-line">' + escapeHtml(line) + '</span>';
        }).join('');
        return;
      }

      if (el.tagName === 'IMG') {
        el.src = value;
      } else if (el.tagName === 'A') {
        el.textContent = value;
      } else {
        el.innerHTML = typeof value === 'string' ? value : String(value);
      }
    });

    document.querySelectorAll('[data-content-src]').forEach(function (el) {
      var path = el.getAttribute('data-content-src');
      var value = getByPath(content, path);
      if (value !== undefined && value !== '' && el.tagName === 'IMG') el.src = value;
    });

    document.querySelectorAll('[data-content-href]').forEach(function (el) {
      var path = el.getAttribute('data-content-href');
      var value = getByPath(content, path);
      if (value !== undefined && el.tagName === 'A') el.href = value;
    });

    document.querySelectorAll('[data-content-bg]').forEach(function (el) {
      var path = el.getAttribute('data-content-bg');
      var value = getByPath(content, path);
      if (value !== undefined && value !== '') el.style.backgroundImage = "url('" + value.replace(/'/g, "\\'") + "')";
    });

    document.querySelectorAll('[data-content-color]').forEach(function (el) {
      var path = el.getAttribute('data-content-color');
      var value = getByPath(content, path);
      if (value !== undefined && value !== '') {
        el.style.backgroundColor = value;
        el.setAttribute('data-color', value);
      }
    });

    // Then, add any extra dynamic items beyond the static HTML
    if (content.index) {
      if (content.index.whatWeDo) addExtraWhatWeDoItems(content.index.whatWeDo);
      if (content.index.industries) addExtraIndustryItems(content.index.industries);
      if (content.index.team) addExtraTeamMembers(content.index.team);
    }
    if (content.services) {
      if (content.services.serviceAreas) addExtraServiceAreas(content.services.serviceAreas);
    }
    if (content.shared && content.shared.footer) {
      if (content.shared.footer.socialLinks) addSocialLinks(content.shared.footer.socialLinks);
    }
  }

  var apiBase = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  fetch(apiBase + '/api/content')
    .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
    .then(applyContent)
    .catch(function () {});
})();
