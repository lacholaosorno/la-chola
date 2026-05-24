document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector("[data-prep-modal]");
    const close = document.querySelector("[data-modal-close]");
    const continueButton = document.querySelector("[data-modal-continue]");
    let onContinue = null;

    window.openPrepModal = (callback) => {
        onContinue = callback;
        if (typeof modal.showModal === "function") {
            modal.showModal();
        } else {
            callback();
        }
    };

    close?.addEventListener("click", () => modal.close());
    continueButton?.addEventListener("click", () => {
        modal.close();
        onContinue?.();
    });
});
