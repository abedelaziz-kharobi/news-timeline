// JavaScript code

window.addEventListener("DOMContentLoaded", () => {
    fetchNews();
});

async function fetchNews() {
    try {
        const response = await fetch('http://localhost:5000/getUrgentNews');
        const newsData = await response.json();
        renderNews(newsData);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function renderNews(newsData) {
    const timeline = document.getElementById('timeline');

    if (!timeline) {
        console.error('Timeline element not found');
        return;
    }

    newsData.forEach((news, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline__item');

        const timelineItemHeader = document.createElement('div');
        timelineItemHeader.classList.add('timeline__item-header');

        const button = document.createElement('button');
        button.classList.add('timeline__arrow');
        button.setAttribute('type', 'button');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', `item${index + 1}-ctrld`);
        button.setAttribute('aria-haspopup', 'true');
        button.setAttribute('data-item', `${index + 1}`);

        const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgIcon.classList.add('timeline__arrow-icon');
        svgIcon.setAttribute('viewBox', '0 0 24 24');
        svgIcon.setAttribute('width', '24px');
        svgIcon.setAttribute('height', '24px');

        const useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        useElement.setAttribute('href', '#arrow');

        svgIcon.appendChild(useElement);
        button.appendChild(svgIcon);

        const dot = document.createElement('span');
        dot.classList.add('timeline__dot');

        const meta = document.createElement('span');
        meta.classList.add('timeline__meta');

        const title = document.createElement('strong');
        title.classList.add('timeline__title');
        title.textContent = news.title;

        meta.appendChild(title);
        timelineItemHeader.appendChild(button);
        timelineItemHeader.appendChild(dot);
        timelineItemHeader.appendChild(meta);
        timelineItem.appendChild(timelineItemHeader);

        const timelineItemBody = document.createElement('div');
        timelineItemBody.classList.add('timeline__item-body');
        timelineItemBody.setAttribute('id', `item${index + 1}-ctrld`);
        timelineItemBody.setAttribute('role', 'region');
        timelineItemBody.setAttribute('aria-labelledby', `item${index + 1}`);
        timelineItemBody.setAttribute('aria-hidden', 'true');

        const bodyContent = document.createElement('div');
        bodyContent.classList.add('timeline__item-body-content');

        const contentParagraph = document.createElement('p');
        contentParagraph.classList.add('timeline__item-p');
        contentParagraph.textContent = news.content;

        bodyContent.appendChild(contentParagraph);
        timelineItemBody.appendChild(bodyContent);
        timelineItem.appendChild(timelineItemBody);

        timeline.appendChild(timelineItem);
    });

    const ctl = new CollapsibleTimeline("#timeline");
}

class CollapsibleTimeline {
    constructor(el) {
        this.el = document.querySelector(el);
        this.init();
    }

    init() {
        this.el?.addEventListener("click", this.itemAction.bind(this));
    }

    animateItemAction(button, ctrld, contentHeight, shouldCollapse) {
        const expandedClass = "timeline__item-body--expanded";
        const animOptions = {
            duration: 300,
            easing: "cubic-bezier(0.65,0,0.35,1)"
        };

        if (shouldCollapse) {
            button.setAttribute('aria-expanded', 'false');
            ctrld.setAttribute('aria-hidden', 'true');
            ctrld.classList.remove(expandedClass);
            animOptions.duration *= 2;
            this.animation = ctrld.animate([
                { height: `${contentHeight}px` },
                { height: `${contentHeight}px` },
                { height: "0px" }
            ], animOptions);
        } else {
            button.setAttribute('aria-expanded', 'true');
            ctrld.setAttribute('aria-hidden', 'false');
            ctrld.classList.add(expandedClass);
            this.animation = ctrld.animate([
                { height: "0px" },
                { height: `${contentHeight}px` }
            ], animOptions);
        }
    }

    itemAction(e) {
        const { target } = e;
        const action = target?.getAttribute("data-action");
        const item = target?.getAttribute("data-item");

        if (action) {
            const targetExpanded = action === "expand" ? "false" : "true";
            const buttons = Array.from(this.el?.querySelectorAll(`[aria-expanded="${targetExpanded}"]`));
            const wasExpanded = action === "collapse";

            for (let button of buttons) {
                const buttonID = button.getAttribute("data-item");
                const ctrld = this.el?.querySelector(`#item${buttonID}-ctrld`);
                const contentHeight = ctrld.firstElementChild?.offsetHeight;

                this.animateItemAction(button, ctrld, contentHeight, wasExpanded);
            }

        } else if (item) {
            const button = this.el?.querySelector(`[data-item="${item}"]`);
            const expanded = button?.getAttribute("aria-expanded");

            if (!expanded) return;

            const wasExpanded = expanded === "true";
            const ctrld = this.el?.querySelector(`#item${item}-ctrld`);
            const contentHeight = ctrld.firstElementChild?.offsetHeight;

            this.animateItemAction(button, ctrld, contentHeight, wasExpanded);
        }
    }
}
