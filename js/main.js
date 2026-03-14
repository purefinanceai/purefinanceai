/* =============================================
   PURE FINANCE AI — Main JavaScript
   Email form: MailerLite API integration
   ============================================= */

// ─── CONFIG ───────────────────────────────────
// Replace these with your actual values from MailerLite dashboard
const MAILERLITE_API_KEY = 'YOUR_MAILERLITE_API_KEY';
const MAILERLITE_GROUP_ID = 'YOUR_GROUP_ID'; // The group/segment to add subscribers to

// ─── EMAIL FORM ───────────────────────────────
const form = document.getElementById('emailForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!firstName || !email) return;

    // UI: loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').style.display = 'none';
    submitBtn.querySelector('.btn-loading').style.display = 'block';

    try {
      const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          fields: {
            name: firstName
          },
          groups: [MAILERLITE_GROUP_ID]
        })
      });

      if (response.ok || response.status === 201 || response.status === 200) {
        // Success
        form.style.display = 'none';
        formSuccess.style.display = 'block';

        // Optional: track conversion event for Cloudflare Analytics
        if (window.__cfBeacon) {
          window.__cfBeacon.push({ type: 'conversion', name: 'email_signup' });
        }
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Submission failed');
      }

    } catch (error) {
      console.error('Form error:', error);

      // Reset button
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').style.display = 'block';
      submitBtn.querySelector('.btn-loading').style.display = 'none';

      // Show inline error
      let errorEl = document.getElementById('formError');
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.id = 'formError';
        errorEl.style.cssText = 'color: #ff6b6b; font-size: 13px; text-align: center; margin-top: 8px;';
        form.appendChild(errorEl);
      }
      errorEl.textContent = 'Something went wrong. Please try again.';
    }
  });
}

// ─── SCROLL ANIMATIONS ────────────────────────
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.pillar-card, .resource-card, .about-card, .form-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .pillar-card:nth-child(2) { transition-delay: 0.1s; }
  .resource-card:nth-child(2) { transition-delay: 0.1s; }
  .resource-card:nth-child(3) { transition-delay: 0.2s; }
  .resource-card:nth-child(4) { transition-delay: 0.3s; }
  .about-card:nth-child(2) { transition-delay: 0.1s; }
  .about-card:nth-child(3) { transition-delay: 0.2s; }
`;
document.head.appendChild(style);

// ─── NAV ACTIVE STATE ─────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(8,11,16,0.95)';
  } else {
    nav.style.background = 'rgba(8,11,16,0.85)';
  }
});
