// Shared navigation and footer for EAS PTO site
// Include this script on every page

(function() {
  // Redirect the old .com domain to the primary .org site.
  // Only fires when the page is served under easpto.com / www.easpto.com.
  const host = window.location.hostname.toLowerCase();
  if (host === 'easpto.com' || host === 'www.easpto.com') {
    window.location.replace('https://www.easpto.org' + window.location.pathname + window.location.search + window.location.hash);
    return;
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  function isActive(page) {
    return currentPage === page ? ' class="active"' : '';
  }

  const navHTML = `
  <nav>
    <div class="nav-inner">
      <a href="index.html" class="nav-brand">
        <img src="https://eas.lwsd.org/fs/click?id=2Oej5P9_7r3GFVcf5P5ioQ&returnid=Lg7bnuriS2OCXFHV_lyD7A" 
             alt="EAS Logo"
             onerror="this.style.display='none'">
        <div class="nav-brand-text">
          <span class="nav-brand-name">Environmental &amp; Adventure School</span>
          <span class="nav-brand-sub">Parent Teacher Organization</span>
        </div>
      </a>
      <button class="nav-hamburger" onclick="document.querySelector('.nav-links').classList.toggle('open')" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links">
        <li><a href="index.html"${isActive('index.html')}>Home</a></li>
        <li><a href="about.html"${isActive('about.html')}>About</a></li>
        <li><a href="programs.html"${isActive('programs.html')}>Programs</a></li>
        <li><a href="meetings.html"${isActive('meetings.html')}>Meetings</a></li>
        <li><a href="staff-favorites.html"${isActive('staff-favorites.html')}>Staff Favorites</a></li>
        <li><a href="payments.html" class="nav-donate">Donate / Pay</a></li>
      </ul>
    </div>
  </nav>`;

  const footerHTML = `
  <footer>
    <p>© ${new Date().getFullYear()} EAS PTO &nbsp;|&nbsp; Environmental &amp; Adventure School, Kirkland WA &nbsp;|&nbsp; <a href="mailto:president@easpto.org">president@easpto.org</a></p>
    <p style="margin-top:6px"><a href="https://eas.lwsd.org" target="_blank">Visit the EAS School Website →</a></p>
  </footer>`;

  function injectSharedLayout() {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  // Wait for the full body to be parsed so footer is placed at the true bottom.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSharedLayout);
  } else {
    injectSharedLayout();
  }
})();
