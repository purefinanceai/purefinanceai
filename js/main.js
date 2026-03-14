/* =============================================
   PURE FINANCE AI — Main JavaScript
   Email form: MailerLite API integration
   ============================================= */

// ─── CONFIG ───────────────────────────────────
// Replace these with your actual values from MailerLite dashboard
const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNjIyZTcwNzQ0NTAxZDFiNmI3ODM4MWVhNzRiZTE5MmE0OTliM2ZjODM4YjhiOGY1OGI4ZmZiNGJhMzAyYzZlMGI1Y2Y4YmZjMGQzOTJkYzkiLCJpYXQiOjE3NzM0NjEwMDUuOTk5NTU0LCJuYmYiOjE3NzM0NjEwMDUuOTk5NTU2LCJleHAiOjQ5MjkxMzQ2MDUuOTkyMDI2LCJzdWIiOiIyMjA5MTgxIiwic2NvcGVzIjpbXX0.j2gNPe8XO58RlZyQ05iluVa7GXUfUavJlraXfubEP6OpJaIQmSPQiXMNIpEfOmgfgKvGvEkoWY2lPY6kmXaOanNxpqud14CUyX_K4vtOlA6Q9rMAldiSPWts69gTohqRrhVDvOz1kF6BWS4QZpntrrEA6QNtDUSFrl7KEvQRv-38vljZ1yufpHMdjJiBRpGOj16cVZy_S7zCB6FLcGHAnWMzrHagHzbOqUZhpJYug22bHR9R3uGYlR8YJufNZZ686XybkpjOufdq-KnG-zwH-DLugpjwEvc8PrmgBwJLqQKliTdLxNqoo_Utu3RscQTMrEazupLS2lBz1FmN1qTYoEUq2rr_zmkeWlhuUm6mCGtjubmn9hlVXOtYYX9aC0JNjpa3aCo6_vGfA_Mpp3dZSyUzo1B2RHnW5lI3NWjcmYOA8eG926EC6yaubJrOm3ZYZZWw0Ux7xclbjhHbUtaHU7Lyyg_7xxA_QUWBUGiHx3j3haslmX28LX6XkD1zgXP9KQKyPTBmlG7ccXLCPl4v06xAffnbsGrHu3atOxW0jefi7eW2vLE6JLzKTKWbBxhj7dWde1SmMnt62nlJqdhtlwjE_38P3Wpqs7TG3hzSEg6oSHqpzzasK5KHV51jgzuv_ROuXY8yVTUDISmAEWoVa4GiW3GSH9FYt_TpUI8eTS0';
const MAILERLITE_GROUP_ID = '181886920556545788'; // The group/segment to add subscribers to

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
