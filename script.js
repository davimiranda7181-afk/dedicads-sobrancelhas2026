/**
 * Landing Page - Aprenda Design de Sobrancelhas em 7 Dias
 * Marca: @delicadas.delic
 * Checkout: https://pay.kiwify.com.br/TZCqieL
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     1. FAQ ACCORDION INTERACTION
     ========================================================= */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Opcional: fechar outros itens para comportamento de sanfona limpo
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const btn = otherItem.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Alternar o item clicado
      if (isActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* =========================================================
     2. MOBILE STICKY BOTTOM BAR (Aparece ao rolar)
     ========================================================= */
  const mobileStickyBar = document.getElementById('mobileStickyBar');
  const heroSection = document.getElementById('hero');

  if (mobileStickyBar && heroSection) {
    const checkScrollPosition = () => {
      // Exibir quando o usuário rolar 350px ou ultrapassar a Hero
      const scrollPosition = window.scrollY || window.pageYOffset;
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - 200;

      if (scrollPosition > 350) {
        mobileStickyBar.classList.add('visible');
      } else {
        mobileStickyBar.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    checkScrollPosition(); // Executa verificação inicial
  }

  /* =========================================================
     3. SMOOTH SCROLL PARA LINKS INTERNOS
     ========================================================= */
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* =========================================================
     4. SCROLL REVEAL ANIMATIONS (Intersection Observer)
     ========================================================= */
  const animatedElements = document.querySelectorAll(
    '.target-card, .benefit-box, .day-card, .material-item, .mistake-card, .testimonial-card, .bonus-card, .offer-box'
  );

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(25px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      revealObserver.observe(el);
    });
  }

  /* =========================================================
     5. MONITORAMENTO DE CONVERSÃO / CLIQUE NO CHECKOUT KIWIFY
     ========================================================= */
  const checkoutButtons = document.querySelectorAll('a[href*="pay.kiwify.com.br"]');
  checkoutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('Lead redirecionado para o checkout oficial Kiwify: https://pay.kiwify.com.br/TZCqieL');
    });
  });

});
