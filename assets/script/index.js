'use strict';

import { select, selectAll, onEvent} from './utils.js';

const frontModal = select('#modal-front');
const backModal = select('#modal-back');
const settingsButton = select('#settings-btn');
const acceptButton = select('#accept-btn');

// Modal Functions
  function showFrontModal() {
    frontModal.classList.remove('hidden');
    backModal.classList.add('hidden');
    overlay.classList.remove('hidden');
    modal.style.display = 'flex';
  }
  
  function showBackModal() {
    frontModal.classList.add('hidden');
    backModal.classList.remove('hidden');
    modal.style.display = 'flex';
    startModalCountdown();
  }

  onEvent('click', settingsButton, showBackModal);
  setTimeout(showFrontModal, 100);

function getCookie() {
    
}

console.log(getCookie());