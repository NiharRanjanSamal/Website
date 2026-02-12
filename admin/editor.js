(function() {
  function getByPath(obj, path) {
    if (!obj || !path) return undefined;
    var parts = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      cur = cur ? cur[parts[i]] : undefined;
    }
    return cur;
  }

  function setByPath(obj, path, value) {
    if (!obj || !path) return;
    var parts = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);
    var cur = obj;
    for (var i = 0; i < parts.length - 1; i++) {
      var key = parts[i];
      var nextKey = parts[i + 1];
      var isNum = /^\d+$/.test(nextKey);
      if (!(key in cur)) cur[key] = isNum ? [] : {};
      cur = cur[key];
    }
    cur[parts[parts.length - 1]] = value;
  }

  function deepMerge(target, source) {
    if (!source || typeof source !== 'object') return target;
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) && target[key] && typeof target[key] === 'object') {
          deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
    return target;
  }

  var content = {};

  // Templates for dynamic items
  var templates = {
    whatWeDo: function(index) {
      return '<div class="item-card" data-index="' + index + '">' +
        '<div class="item-header"><h4>Service ' + (index + 1) + '</h4><button type="button" class="remove-btn" title="Remove">&times;</button></div>' +
        '<div class="field"><label>Title (use | to separate lines)</label><input type="text" data-field="index.whatWeDo.' + index + '.titleLines" data-type="lines" /></div>' +
        '<div class="field"><label>Description</label><textarea data-field="index.whatWeDo.' + index + '.description" rows="2"></textarea></div>' +
        '<div class="field"><label>Image URL</label><input type="url" data-field="index.whatWeDo.' + index + '.image" /></div>' +
        '</div>';
    },
    industry: function(index) {
      return '<div class="item-card" data-index="' + index + '">' +
        '<div class="item-header"><h4>Industry ' + (index + 1) + '</h4><button type="button" class="remove-btn" title="Remove">&times;</button></div>' +
        '<div class="field"><label>Title</label><input type="text" data-field="index.industries.items.' + index + '.title" /></div>' +
        '<div class="field"><label>Description</label><textarea data-field="index.industries.items.' + index + '.description" rows="2"></textarea></div>' +
        '<div class="field"><label>Image URL</label><input type="url" data-field="index.industries.items.' + index + '.image" /></div>' +
        '<div class="field"><label>Color (hex)</label><input type="text" data-field="index.industries.items.' + index + '.color" placeholder="#8B4789" /></div>' +
        '</div>';
    },
    team: function(index) {
      return '<div class="item-card" data-index="' + index + '">' +
        '<div class="item-header"><h4>Team Member ' + (index + 1) + '</h4><button type="button" class="remove-btn" title="Remove">&times;</button></div>' +
        '<div class="field-row">' +
        '<div class="field"><label>Name</label><input type="text" data-field="index.team.members.' + index + '.name" /></div>' +
        '<div class="field"><label>Role</label><input type="text" data-field="index.team.members.' + index + '.role" /></div>' +
        '</div>' +
        '<div class="field"><label>Image URL</label><input type="url" data-field="index.team.members.' + index + '.image" /></div>' +
        '</div>';
    },
    serviceArea: function(index) {
      return '<div class="item-card" data-index="' + index + '">' +
        '<div class="item-header"><h4>Service Area ' + (index + 1) + '</h4><button type="button" class="remove-btn" title="Remove">&times;</button></div>' +
        '<div class="field"><label>Title</label><input type="text" data-field="services.serviceAreas.items.' + index + '.title" /></div>' +
        '<div class="field"><label>Description</label><textarea data-field="services.serviceAreas.items.' + index + '.description" rows="2"></textarea></div>' +
        '</div>';
    },
    socialLink: function(index) {
      return '<div class="item-card" data-index="' + index + '">' +
        '<div class="item-header"><h4>Social Link ' + (index + 1) + '</h4><button type="button" class="remove-btn" title="Remove">&times;</button></div>' +
        '<div class="field-row">' +
        '<div class="field"><label>Label (shown in UI)</label><input type="text" data-field="shared.footer.socialLinks.' + index + '.label" placeholder="LinkedIn" /></div>' +
        '<div class="field"><label>URL (redirect link)</label><input type="url" data-field="shared.footer.socialLinks.' + index + '.url" placeholder="https://linkedin.com/..." /></div>' +
        '</div>' +
        '</div>';
    }
  };

  function renderDynamicList(listEl, arrayPath, templateName) {
    var arr = getByPath(content, arrayPath) || [];
    listEl.innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
      listEl.insertAdjacentHTML('beforeend', templates[templateName](i));
    }
    populateFormInContainer(listEl);
    attachRemoveHandlers(listEl, arrayPath, templateName);
  }

  function attachRemoveHandlers(listEl, arrayPath, templateName) {
    listEl.querySelectorAll('.remove-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var card = btn.closest('.item-card');
        var index = parseInt(card.getAttribute('data-index'), 10);
        var arr = getByPath(content, arrayPath) || [];
        arr.splice(index, 1);
        setByPath(content, arrayPath, arr);
        renderDynamicList(listEl, arrayPath, templateName);
      });
    });
  }

  function populateFormInContainer(container) {
    container.querySelectorAll('[data-field]').forEach(function(el) {
      var path = el.getAttribute('data-field');
      var value = getByPath(content, path);
      if (value === undefined) return;
      var type = el.getAttribute('data-type');
      if (type === 'lines' && Array.isArray(value)) {
        el.value = value.join(' | ');
      } else if (typeof value === 'string') {
        el.value = value;
      }
    });
  }

  function populateForm() {
    // Populate static fields
    document.querySelectorAll('[data-field]').forEach(function(el) {
      if (el.closest('.dynamic-list')) return; // Skip dynamic list items
      var path = el.getAttribute('data-field');
      var value = getByPath(content, path);
      if (value === undefined) return;
      var type = el.getAttribute('data-type');
      if (type === 'lines' && Array.isArray(value)) {
        el.value = value.join(' | ');
      } else if (typeof value === 'string') {
        el.value = value;
      }
    });

    // Render dynamic lists
    document.querySelectorAll('.dynamic-list').forEach(function(listEl) {
      var arrayPath = listEl.getAttribute('data-array');
      var btn = document.querySelector('[data-target="' + listEl.id + '"]');
      var templateName = btn ? btn.getAttribute('data-template') : null;
      if (templateName) {
        renderDynamicList(listEl, arrayPath, templateName);
      }
    });
  }

  function collectForm() {
    var out = JSON.parse(JSON.stringify(content));
    document.querySelectorAll('[data-field]').forEach(function(el) {
      var path = el.getAttribute('data-field');
      var type = el.getAttribute('data-type');
      var val = el.value;
      if (type === 'lines') {
        val = val.split(/[|\n]/).map(function(s) { return s.trim(); }).filter(Boolean);
      }
      // Don't overwrite existing URL values with empty strings
      if (val === '' && el.type === 'url') {
        var existing = getByPath(out, path);
        if (existing && typeof existing === 'string' && existing !== '') {
          return; // Keep existing value
        }
      }
      setByPath(out, path, val);
    });
    return out;
  }

  var statusTimeout = null;
  function showStatus(msg, isError) {
    var el = document.getElementById('saveStatus');
    // Clear any existing timeout
    if (statusTimeout) {
      clearTimeout(statusTimeout);
    }
    // Reset state
    el.classList.remove('show', 'success', 'error');
    el.textContent = msg;
    el.classList.add(isError ? 'error' : 'success');
    
    // Trigger reflow to restart animation
    void el.offsetWidth;
    
    // Show the toast
    el.classList.add('show');
    
    // Auto-hide after 3 seconds
    statusTimeout = setTimeout(function() {
      el.classList.remove('show');
    }, 3000);
  }

  function api(path, options) {
    options = options || {};
    options.credentials = 'include';
    options.headers = options.headers || {};
    if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(options.body);
    }
    return fetch(path, options);
  }

  // Auth check and redirect
  api('/api/auth/check')
    .then(function(r) {
      if (!r.ok) throw new Error('Not authenticated');
    })
    .catch(function() {
      window.location.href = 'index.html';
      throw new Error('Redirecting');
    })
    .then(function() {
      return api('/api/content').then(function(r) { return r.json(); });
    })
    .then(function(data) {
      content = data;
      populateForm();
    })
    .catch(function(e) {
      if (e.message !== 'Redirecting') console.error(e);
    });

  // Add item buttons
  document.querySelectorAll('.add-item-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var listId = btn.getAttribute('data-target');
      var templateName = btn.getAttribute('data-template');
      var listEl = document.getElementById(listId);
      var arrayPath = listEl.getAttribute('data-array');
      var arr = getByPath(content, arrayPath) || [];
      
      // Default new item based on template
      var newItem = {};
      if (templateName === 'whatWeDo') {
        newItem = { titleLines: ['New Service'], description: '', image: '' };
      } else if (templateName === 'industry') {
        newItem = { title: 'New Industry', description: '', image: '', color: '#666666' };
      } else if (templateName === 'team') {
        newItem = { name: 'New Member', role: '', image: '' };
      } else if (templateName === 'serviceArea') {
        newItem = { title: 'New Service Area', description: '' };
      } else if (templateName === 'socialLink') {
        newItem = { label: 'Social Media', url: '' };
      }
      
      arr.push(newItem);
      setByPath(content, arrayPath, arr);
      renderDynamicList(listEl, arrayPath, templateName);
    });
  });

  document.getElementById('saveBtn').addEventListener('click', function() {
    var collected = collectForm();
    api('/api/content', { method: 'PUT', body: collected })
      .then(function(r) {
        if (!r.ok) return r.json().then(function(d) { throw new Error(d.error || 'Save failed'); });
        showStatus('Content saved successfully.');
        content = collected;
        // Auto-refresh preview after saving
        var previewFrame = document.getElementById('previewFrame');
        if (previewFrame) {
          setTimeout(function() {
            var currentSrc = previewFrame.src;
            previewFrame.src = '';
            setTimeout(function() {
              previewFrame.src = currentSrc;
            }, 100);
          }, 500);
        }
      })
      .catch(function(e) {
        showStatus(e.message || 'Save failed', true);
      });
  });

  document.getElementById('logoutBtn').addEventListener('click', function() {
    api('/api/auth/logout', { method: 'POST' })
      .then(function() { window.location.href = 'index.html'; });
  });

  document.getElementById('changePasswordBtn').addEventListener('click', function() {
    var newPw = document.getElementById('newPassword').value;
    var confirm = document.getElementById('confirmPassword').value;
    var errEl = document.getElementById('passwordError');
    errEl.textContent = '';
    if (!newPw || !confirm) {
      errEl.textContent = 'All fields required';
      return;
    }
    if (newPw !== confirm) {
      errEl.textContent = 'New passwords do not match';
      return;
    }
    api('/api/auth/change-password', { method: 'POST', body: { newPassword: newPw } })
      .then(function(r) {
        if (!r.ok) return r.json().then(function(d) { throw new Error(d.error || 'Failed'); });
        errEl.textContent = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        showStatus('Password changed successfully.');
      })
      .catch(function(e) {
        errEl.textContent = e.message || 'Failed to change password';
      });
  });

  document.getElementById('imageUpload').addEventListener('change', function() {
    var file = this.files[0];
    if (!file) return;
    var fd = new FormData();
    fd.append('image', file);
    var resultEl = document.getElementById('uploadResult');
    resultEl.textContent = 'Uploading...';
    fetch('/api/upload', {
      method: 'POST',
      credentials: 'include',
      body: fd
    })
      .then(function(r) {
        if (!r.ok) return r.json().then(function(d) { throw new Error(d.error || 'Upload failed'); });
        return r.json();
      })
      .then(function(data) {
        var url = data.url;
        resultEl.innerHTML = 'URL: <input type="text" readonly value="' + url + '" style="width:100%;" onclick="this.select()" />';
      })
      .catch(function(e) {
        resultEl.textContent = 'Error: ' + (e.message || 'Upload failed');
      });
  });

  document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(function(l) { l.classList.remove('active'); });
      this.classList.add('active');
      var id = this.getAttribute('href').slice(1);
      document.querySelectorAll('.editor-section').forEach(function(s) { s.classList.remove('active'); });
      var sec = document.getElementById(id);
      if (sec) sec.classList.add('active');
    });
  });

  document.querySelectorAll('.editor-section').forEach(function(s, i) {
    s.classList.toggle('active', i === 0);
  });

  // Collapsible form groups
  document.querySelectorAll('.form-group h3').forEach(function(header) {
    header.addEventListener('click', function() {
      var formGroup = this.closest('.form-group');
      formGroup.classList.toggle('collapsed');
    });
  });

  // Toggle password visibility
  document.querySelectorAll('.toggle-password').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var targetId = btn.getAttribute('data-target');
      var passwordInput = document.getElementById(targetId);
      if (!passwordInput) return;
      
      var type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      
      var eyeOpen = btn.querySelectorAll('.eye-open');
      var eyeClosed = btn.querySelectorAll('.eye-closed');
      
      if (type === 'text') {
        eyeOpen.forEach(function(el) { el.style.display = 'none'; });
        eyeClosed.forEach(function(el) { el.style.display = 'block'; });
      } else {
        eyeOpen.forEach(function(el) { el.style.display = 'block'; });
        eyeClosed.forEach(function(el) { el.style.display = 'none'; });
      }
    });
  });

  // Preview panel functionality
  var previewFrame = document.getElementById('previewFrame');
  var previewPanel = document.querySelector('.preview-panel');
  var previewSelect = document.getElementById('previewPage');
  var refreshBtn = document.getElementById('refreshPreview');
  var toggleBtn = document.getElementById('togglePreview');
  var adminMain = document.querySelector('.admin-main');
  var laptopScreenInner = document.querySelector('.laptop-screen-inner');

  // Scale iframe to fit container
  function scalePreviewFrame() {
    if (!previewFrame || !laptopScreenInner) return;
    var containerWidth = laptopScreenInner.offsetWidth;
    var iframeWidth = 1440;
    var scale = containerWidth / iframeWidth;
    previewFrame.style.transform = 'scale(' + scale + ')';
    // Set container height based on scaled iframe
    var iframeHeight = 900;
    laptopScreenInner.style.height = (iframeHeight * scale) + 'px';
  }

  // Initial scale and on resize
  window.addEventListener('resize', scalePreviewFrame);
  setTimeout(scalePreviewFrame, 100);

  function refreshPreview() {
    if (previewFrame) {
      var currentSrc = previewFrame.src;
      previewFrame.src = '';
      setTimeout(function() {
        previewFrame.src = currentSrc;
      }, 100);
    }
  }

  function setPreviewPage(page) {
    if (previewFrame) {
      previewFrame.src = page;
    }
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', refreshPreview);
  }

  if (previewSelect) {
    previewSelect.addEventListener('change', function() {
      setPreviewPage(this.value);
    });
  }

  if (toggleBtn && previewPanel && adminMain) {
    toggleBtn.addEventListener('click', function() {
      previewPanel.classList.toggle('hidden');
      adminMain.classList.toggle('has-preview');
      setTimeout(scalePreviewFrame, 350);
    });
  }

  // Sync preview page with current editor section
  document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
      var id = this.getAttribute('href').slice(1);
      var pageMap = {
        'home': '/',
        'services': '/services.html',
        'contact': '/contact.html',
        'footer': '/',
        'settings': '/'
      };
      if (previewSelect && pageMap[id]) {
        previewSelect.value = pageMap[id];
        setPreviewPage(pageMap[id]);
      }
    });
  });
})();
