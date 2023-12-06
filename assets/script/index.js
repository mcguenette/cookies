'use strict';

import { select, selectAll, onEvent} from './utils.js';

const modal = select('.modal');
const frontModal = select('.modal-front');
const backModal = select('.modal-back');
const overlay = select('.overlay');
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
  
  function closeModal() {
    frontModal.classList.add('hidden');
    backModal.classList.add('hidden');
    overlay.classList.add('hidden');
    modal.style.display = 'none';
  }
  

  onEvent('click', overlay, closeModal);
  onEvent('click', settingsButton, showBackModal);
  setTimeout(showFrontModal, 100);

// function getCookie() {
    
// }

// console.log(getCookie());