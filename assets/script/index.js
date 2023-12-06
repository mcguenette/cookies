'use strict';

import { select, onEvent } from './utils.js';

const modal = select('.modal');
const frontModal = select('.modal-front');
const backModal = select('.modal-back');
const overlay = select('.overlay');
const settingsButton = select('#settings-btn');
const acceptButton = select('#accept-btn');
const savePreferences = select('#save-btn');
const browserInput = select('.browser-input');
const opInput = select('.op-system');
const width = select('.width');
const height = select('.height');

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
}

function closeModal() {
    frontModal.classList.add('hidden');
    backModal.classList.add('hidden');
    overlay.classList.add('hidden');
    modal.style.display = 'none';
}

function setCookie(name, value, seconds) {
    const expires = new Date();
    expires.setTime(expires.getTime() + seconds * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getBrowser() {
    const browser = navigator.userAgent;

    if (browser.includes('Firefox')) return 'Firefox';
    if (browser.includes('Edge')) return 'Edge';
    if (browser.includes('Chrome')) return 'Chrome';

    return 'Browser not found';
}

// Function to get OS name
function getOperatingSystem() {
    const os = navigator.userAgent;

    if (os.includes('Win')) return 'Windows';
    if (os.includes('Mac')) return 'MacOS';

    return 'OS not found';
}

function updateCookies() {
    const timestamp = new Date().toLocaleTimeString();
    const savedPreferences = getCookie('savedPreferences');

    if (savedPreferences) {
        const options = JSON.parse(savedPreferences);

        const browserInfo = options.browser ? `Browser: ${getBrowser()}` : '';
        const osInfo = options.os ? `OS: ${getOperatingSystem()}` : '';
        const screenInfo = (options.width || options.height) ? `Screen Width x Height: ${options.width ? ` Width:${screen.width}` : ''} ${options.height ? `& Height:${screen.height}` : ''}` : '';

        console.log(`${timestamp} - Cookies: ${browserInfo} ${osInfo} ${screenInfo}`);
    }
}

function hasCookies() {
    try {
        document.cookie = 'testCookie=temporary;expires=Fri, 31 Dec 2055 23:59:59 GMT;path=/';
        const cookiesEnabled = document.cookie.indexOf('testCookie=temporary') !== -1;
        document.cookie = 'testCookie=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';

        return cookiesEnabled;

    } catch (error) {
        return false;
    }
}

function cookiesAreStored() {
    const savedPreferences = getCookie('savedPreferences');
    return savedPreferences !== undefined;
}

function rejectedCookies() {
    const rejected = getCookie('rejectedCookies');
    return rejected !== undefined;
}

function showModal() {
    const cookiesEnabled = hasCookies();
    const cookiesStored = cookiesAreStored();
    const rejected = rejectedCookies();

    if (!cookiesEnabled || (!cookiesStored && !rejected)) {
        showFrontModal();
    }
}

function saveSettings() {
    const options = {
        browser: browserInput.checked,
        os: opInput.checked,
        width: width.checked,
        height: height.checked
    };

    setCookie('savedPreferences', JSON.stringify(options), 20);
    setCookie('rejectedCookies', 'true', 20);

    setTimeout(updateCookies, 100);
    closeModal();
}

updateCookies();

onEvent('click', overlay, closeModal);
onEvent('click', settingsButton, showBackModal);
setTimeout(showModal, 1100);
onEvent('click', acceptButton, () => {
    saveSettings();
    closeModal();
});

onEvent('click', savePreferences, () => {
    saveSettings();
    closeModal();
});
