(function() {
  const config = window.EAS_YEARBOOK_ACCESS;
  const form = document.getElementById('yearbook-access-form');
  const passwordInput = document.getElementById('yearbook-password');
  const showPasswordInput = document.getElementById('show-password');
  const message = document.getElementById('password-message');
  const submitButton = form.querySelector('button[type="submit"]');
  let destinationPromise;

  function normalizePassword(value) {
    return value.trim().toLocaleLowerCase('en-US');
  }

  function getStoredAccess() {
    try {
      const storedAccess = JSON.parse(localStorage.getItem(config.storageKey));
      return storedAccess && Number.isFinite(storedAccess.expiresAt) ? storedAccess : null;
    } catch (error) {
      localStorage.removeItem(config.storageKey);
      return null;
    }
  }

  function hasValidAccess() {
    const storedAccess = getStoredAccess();
    if (!storedAccess || storedAccess.expiresAt <= Date.now()) {
      localStorage.removeItem(config.storageKey);
      return false;
    }

    return true;
  }

  function loadDestination() {
    if (!destinationPromise) {
      destinationPromise = new Promise(function(resolve, reject) {
        const script = document.createElement('script');
        script.src = 'js/yearbook-destination.js';
        script.onload = function() {
          const destination = window.EAS_YEARBOOK_DESTINATION;
          if (destination && destination.sharePointUrl) {
            resolve(destination.sharePointUrl);
          } else {
            reject(new Error('Yearbook destination is not configured.'));
          }
        };
        script.onerror = function() {
          reject(new Error('Yearbook destination could not be loaded.'));
        };
        document.head.appendChild(script);
      });
    }

    return destinationPromise;
  }

  async function redirectToPhotos() {
    try {
      const sharePointUrl = await loadDestination();
      window.location.replace(sharePointUrl);
      return true;
    } catch (error) {
      message.textContent = 'The photo repository is temporarily unavailable. Please try again later.';
      return false;
    }
  }

  if (hasValidAccess()) {
    redirectToPhotos();
    return;
  }

  showPasswordInput.addEventListener('change', function() {
    passwordInput.type = showPasswordInput.checked ? 'text' : 'password';
  });

  passwordInput.addEventListener('input', function() {
    passwordInput.removeAttribute('aria-invalid');
    message.textContent = '';
  });

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    if (normalizePassword(passwordInput.value) !== normalizePassword(config.password)) {
      passwordInput.setAttribute('aria-invalid', 'true');
      message.textContent = 'That password didn’t match. Check your school communication and try again.';
      passwordInput.focus();
      return;
    }

    const expiresAt = Date.now() + (config.authenticationDays * 24 * 60 * 60 * 1000);
    localStorage.setItem(config.storageKey, JSON.stringify({ expiresAt }));
    submitButton.disabled = true;
    submitButton.textContent = 'Opening photo repository...';

    if (!await redirectToPhotos()) {
      submitButton.disabled = false;
      submitButton.textContent = 'Continue to photos';
    }
  });
})();