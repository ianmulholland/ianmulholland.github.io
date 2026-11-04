(() => {
    const pageUrl = new URL(window.location.href);
    pageUrl.search = '';
    pageUrl.hash = '';
    const fallback = document.getElementById('copy-fallback');
    const fallbackText = document.getElementById('copy-value');
    const shareStatus = document.getElementById('share-status');
    const introStatus = document.getElementById('intro-status');

    async function copyText(text, status, successMessage) {
        shareStatus.textContent = '';
        introStatus.textContent = '';
        try {
            await navigator.clipboard.writeText(text);
            fallback.hidden = true;
            status.textContent = successMessage;
        } catch {
            fallbackText.value = text;
            fallback.hidden = false;
            fallbackText.focus();
            fallbackText.select();
            status.textContent = 'Automatic copying isn’t available. Use the copy box to select and copy the text.';
        }
    }

    const copyLink = document.getElementById('copy-link');
    const copyIntro = document.getElementById('copy-intro');
    copyLink.hidden = false;
    copyIntro.hidden = false;
    copyLink.addEventListener('click', () => copyText(pageUrl.href, shareStatus, 'Page link copied.'));
    copyIntro.addEventListener('click', () => {
        const intro = document.getElementById('forward-intro').textContent.trim();
        copyText(`${intro}\n\n${pageUrl.href}`, introStatus, 'Introduction and page link copied.');
    });
})();
