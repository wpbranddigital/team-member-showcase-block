/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
(function () {
  'use strict';

  function initTeamMemberBlocks() {
    var blocks = document.querySelectorAll('.wbd-tm');
    if (!blocks.length) {
      return;
    }
    blocks.forEach(function (block) {
      var showFilter = block.getAttribute('data-show-filter') === 'true';
      if (showFilter) {
        initFilter(block);
      }
      if (block.getAttribute('data-animation') === 'fade-stagger') {
        initAnimation(block);
      }
    });
  }
  function initFilter(block) {
    var filterContainer = block.querySelector('.wbd-tm-filter');
    if (!filterContainer) {
      return;
    }
    var buttons = filterContainer.querySelectorAll('.wbd-tm-filter__btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = this.getAttribute('data-filter');

        /* Update active button */
        buttons.forEach(function (b) {
          b.classList.remove('wbd-tm-filter__btn--active');
        });
        this.classList.add('wbd-tm-filter__btn--active');
        filterGrid(block, filter);
      });
    });
  }
  function filterGrid(block, filter) {
    var cards = block.querySelectorAll('.wbd-tm-grid > .wbd-tm-card');
    cards.forEach(function (card) {
      var category = card.getAttribute('data-category') || '';
      if (filter === 'all' || category === filter) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(function () {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 20);
      } else {
        card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(function () {
          card.style.display = 'none';
        }, 200);
      }
    });
  }
  function initAnimation(block) {
    var cards = block.querySelectorAll('.wbd-tm-card');
    cards.forEach(function (card) {
      card.setAttribute('data-animated', 'false');
    });
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var cardElements = entry.target.querySelectorAll('.wbd-tm-card[data-animated="false"]');
            cardElements.forEach(function (card, index) {
              setTimeout(function () {
                card.setAttribute('data-animated', 'true');
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15
      });
      observer.observe(block);
    } else {
      cards.forEach(function (card) {
        card.setAttribute('data-animated', 'true');
      });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTeamMemberBlocks);
  } else {
    initTeamMemberBlocks();
  }
})();
/******/ })()
;
//# sourceMappingURL=view.js.map