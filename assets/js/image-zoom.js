document.addEventListener('DOMContentLoaded', function() {
    const modal = document.createElement('div');
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    modal.style.cursor = 'zoom-out';
    document.body.appendChild(modal);

    const modalImg = document.createElement('img');
    modalImg.style.margin = 'auto';
    modalImg.style.display = 'block';
    modalImg.style.maxWidth = '90%';
    modalImg.style.maxHeight = '90%';
    modalImg.style.position = 'absolute';
    modalImg.style.top = '50%';
    modalImg.style.left = '50%';
    modalImg.style.transform = 'translate(-50%, -50%)';
    modal.appendChild(modalImg);

    document.querySelectorAll('img').forEach(img => {
        if (!img.closest('.profile_inner') && !img.hasAttribute('data-no-zoom')) {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
            });
        }
    });

    modal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}); 