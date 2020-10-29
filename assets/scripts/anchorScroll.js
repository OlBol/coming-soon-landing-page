export default function anchorScroll() {
    const links = document.querySelectorAll('a[href^="#"');
    const speed = 0.5;
    let coordAnchor;
    let windowY;
    let start;

    for(const link of links) {
        link.addEventListener('click', e => {
            e.preventDefault();

            const anchor = document.querySelector(link.getAttribute('href'));
            coordAnchor  = anchor.getBoundingClientRect().top;
            windowY = window.pageYOffset;
            start = null;

            requestAnimationFrame(countStep);
        });
    }

    function countStep(time) {
        if (start === null) start = time;

        const progress = time - start;

        const coordY =
            coordAnchor < 0
                ? Math.max(windowY - progress / speed, windowY + coordAnchor)
                : Math.min(windowY + progress / speed, windowY + coordAnchor);

        window.scrollTo(0, coordY);

        if (coordY !== windowY + coordAnchor) {
            requestAnimationFrame(countStep);

        }
    }
}
