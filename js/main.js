document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    const themeButtons = document.querySelectorAll(
        "#themeToggle, #mobileThemeToggle"
    );
    const rtlToggle = document.getElementById("rtlToggle");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            const isOpen = mainNav.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute("aria-expanded", isOpen);

        });
    }


    /* =====================================================
       MOBILE DROPDOWN
    ===================================================== */

    const dropdownParents = document.querySelectorAll(
        ".nav-item.has-dropdown > .nav-link"
    );

    dropdownParents.forEach(function (link) {

        link.addEventListener("click", function (event) {

            if (window.innerWidth <= 991) {

                event.preventDefault();

                const parent = link.parentElement;

                parent.classList.toggle("dropdown-open");

            }

        });

    });


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICK
    ===================================================== */

    const navLinks = document.querySelectorAll(
        ".nav-dropdown a, .nav-list > .nav-item:not(.has-dropdown) > .nav-link"
    );

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 991) {

                mainNav.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

            }

        });

    });


    /* =====================================================
       DARK MODE
    ===================================================== */

    const savedTheme = localStorage.getItem("paperPaletteTheme");

    function updateThemeButtons() {

        themeButtons.forEach(function (button) {

            const icon = button.querySelector("i");

            if (!icon) return;

            const isDark =
                document.body.classList.contains("dark-mode");

            if (isDark) {

                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");

                button.setAttribute("title", "Light Mode");
                button.setAttribute("aria-label", "Switch to Light Mode");
                button.setAttribute("aria-pressed", "true");

            } else {

                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");

                button.setAttribute("title", "Dark Mode");
                button.setAttribute("aria-label", "Switch to Dark Mode");
                button.setAttribute("aria-pressed", "false");

            }

        });

    }


    function setTheme(isDark) {

        document.body.classList.toggle("dark-mode", isDark);

        localStorage.setItem(
            "paperPaletteTheme",
            isDark ? "dark" : "light"
        );

        updateThemeButtons();

    }


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }


    updateThemeButtons();


    themeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            setTheme(
                !document.body.classList.contains("dark-mode")
            );

        });

    });


    window.addEventListener("storage", function (event) {

        if (event.key === "paperPaletteTheme") {

            setTheme(event.newValue === "dark");

        }

    });


    /* =====================================================
       RTL MODE
    ===================================================== */

    const rtlButtons = document.querySelectorAll(
        "#rtlToggle, #mobileRtlToggle"
    );

    if (rtlButtons.length) {

        const savedDirection =
            localStorage.getItem("paperPaletteDirection");

        const initialDirection =
            savedDirection === "rtl" ? "rtl" : "ltr";

        document.documentElement.setAttribute(
            "dir",
            initialDirection
        );


        rtlButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const currentDirection =
                    document.documentElement.getAttribute("dir");

                if (currentDirection === "rtl") {

                    document.documentElement.setAttribute(
                        "dir",
                        "ltr"
                    );

                    localStorage.setItem(
                        "paperPaletteDirection",
                        "ltr"
                    );

                } else {

                    document.documentElement.setAttribute(
                        "dir",
                        "rtl"
                    );

                    localStorage.setItem(
                        "paperPaletteDirection",
                        "rtl"
                    );

                }

            });

        });

    }


    /* =====================================================
       REVEAL ANIMATIONS + COUNTERS
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const revealGroups = [
        [".section-title", 0],
        [".section-heading", 0],
        [".hero-content", 0],
        [".hero-editorial-content", 0],
        [".hero-image-wrap", 0],
        [".hero-visual", 0],
        [".hero-side-info", 0],
        [".hero-bottom", 0],
        [".categories-heading", 0],
        [".home-two-hero-content", 0],
        [".home-two-hero-visual", 0],
        [".arrivals-heading", 0],
        [".arrival-item", 36],
        [".edit-layout", 0],
        [".create-heading", 0],
        [".create-item", 36],
        [".desk-layout", 0],
        [".picked-heading", 0],
        [".picked-item", 36],
        [".value-heading", 0],
        [".final-cta-content", 0],
        [".inner-page-hero-content", 0],
        [".about-story-intro", 0],
        [".about-story-content", 0],
        [".about-story-image", 0],
        [".about-vm-content", 0],
        [".about-vm-block", 0],
        [".about-journey-heading", 0],
        [".about-journey-item", 36],
        [".about-numbers-heading", 0],
        [".about-team-heading", 0],
        [".about-beliefs-intro", 0],
        [".about-final-content", 0],
        [".school-bundle-section", 0],
        [".trust-section", 0],
        [".trust-point", 36],
        [".bulk-showcase-section", 0],
        [".creative-inspiration-heading", 0],
        [".creative-inspiration-stage", 0],
        [".creative-inspiration-image", 0],
        [".creative-inspiration-panel", 0],
        [".customer-favorites-heading", 0],
        [".shop-hero-content", 0],
        [".shop-section-heading", 0],
        [".shop-featured-section", 0],
        [".shop-stationery-visual", 0],
        [".shop-stationery-content", 0],
        [".shop-art-content", 0],
        [".shop-art-visual", 0],
        [".shop-art-floating-card", 0],
        [".shop-offers-section", 0],
        [".school-needs-heading", 0],
        [".school-needs-feature", 0],
        [".school-filter-section", 0],
        [".school-kit-section", 0],
        [".school-kit-product", 36],
        [".school-bulk-section", 0],
        [".school-enquiry-section", 0],
        [".bulk-intro", 0],
        [".bulk-workspace", 0],
        [".bulk-form-panel", 0],
        [".value-panel", 36],
        [".creative-cta-content", 0],
        [".cta-content", 0],
        [".stories-intro", 0],
        [".stories-testimonial", 0],
        [".stories-layout", 0],
        [".footer-grid", 0],
        [".contact-info-section", 0],
        [".contact-info-card", 36],
        [".contact-message-section", 0],
        [".contact-location-section", 0],
        [".product-card", 36],
        [".category-card", 36],
        [".about-number-item", 36],
        [".about-team-member", 36],
        [".about-belief-row", 36],
        [".bulk-benefit", 36],
        [".customer-review-card", 36],
        [".stories-mini", 36],
        [".shop-stationery-categories a", 32],
        [".shop-art-categories > a", 32],
        [".school-needs-nav li", 28],
        [".bulk-showcase-card", 32],
        [".desk-stat", 32],
        [".shop-art-stats > div", 32]
    ];

    const revealElements = [];

    revealGroups.forEach(function ([selector, stagger]) {

        document.querySelectorAll(selector).forEach(function (element, index) {

            if (!element.classList.contains("reveal-on-scroll")) {

                element.classList.add("reveal-on-scroll");

                revealElements.push(element);

            }

            if (stagger > 0) {

                element.style.setProperty(
                    "--reveal-delay",
                    `${Math.min(index, 3) * stagger}ms`
                );

            }

        });

    });


    function formatCountValue(value, meta) {

        const decimals =
            meta.decimals || 0;


        if (meta.compact) {

            if (value >= 1000) {

                const compactValue =
                    value / 1000;

                const rounded =
                    compactValue >= 10
                        ? Math.round(compactValue)
                        : Math.round(compactValue * 10) / 10;

                return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1)}K${meta.suffix}`;

            }

            const base =
                decimals > 0
                    ? value.toFixed(decimals)
                    : Math.round(value).toString();

            return `${base}${meta.suffix}`;

        }


        const base =
            decimals > 0
                ? value.toFixed(decimals)
                : Math.round(value).toString();


        return `${base}${meta.suffix}`;

    }


    function parseCounterText(text) {

        const cleaned =
            text.replace(/\s+/g, "");


        const compactMatch =
            cleaned.match(/^(\d+(?:\.\d+)?)([KMB])(\+)?$/i);


        if (compactMatch) {

            const numeric =
                Number(compactMatch[1]);

            const unit =
                compactMatch[2].toUpperCase();

            const suffix =
                compactMatch[3] || "";


            return {
                target: unit === "K"
                    ? numeric * 1000
                    : unit === "M"
                        ? numeric * 1000000
                        : numeric * 1000000000,
                decimals: compactMatch[1].includes(".") ? 1 : 0,
                compact: true,
                suffix
            };

        }


        const decimalMatch =
            cleaned.match(/^(\d+)\.(\d+)$/);


        if (decimalMatch) {

            return {
                target: Number(cleaned),
                decimals: decimalMatch[2].length,
                compact: false,
                suffix: ""
            };

        }


        const plusMatch =
            cleaned.match(/^(\d+)\+$/);


        if (plusMatch) {

            return {
                target: Number(plusMatch[1]),
                decimals: 0,
                compact: false,
                suffix: "+"
            };

        }


        const plainMatch =
            cleaned.match(/^(\d+)$/);


        if (plainMatch) {

            return {
                target: Number(plainMatch[1]),
                decimals: 0,
                compact: false,
                suffix: ""
            };

        }


        return null;

    }


    function animateCounter(element) {

        if (element.dataset.counterAnimated === "true") {
            return;
        }


        const meta =
            parseCounterText(
                element.textContent || ""
            );


        if (!meta) {
            return;
        }


        element.dataset.counterAnimated = "true";

        const target =
            meta.target;

        const duration =
            Math.min(
                1100,
                Math.max(
                    750,
                    target * 22
                )
            );

        const start =
            performance.now();


        function step(now) {

            const progress =
                Math.min(
                    1,
                    (now - start) / duration
                );

            const eased =
                1 - Math.pow(1 - progress, 3);

            const current =
                target * eased;


            element.textContent =
                formatCountValue(
                    current,
                    meta
                );


            if (progress < 1) {

                requestAnimationFrame(step);

            } else {

                element.textContent =
                    formatCountValue(
                        target,
                        meta
                    );

            }

        }


        element.textContent =
            formatCountValue(
                0,
                meta
            );


        requestAnimationFrame(step);

    }


    const counterGroups = [
        {
            container: ".about-numbers-section",
            items: ".about-number-item strong"
        },
        {
            container: ".desk-stats",
            items: ".desk-stat strong"
        },
        {
            container: ".shop-art-stats",
            items: ".shop-art-stats strong"
        },
        {
            container: ".product-card",
            items: ".product-rating span:last-child"
        },
        {
            container: ".stories-testimonial",
            items: ".stories-rating span"
        }
    ];

    const counterTargets = [];

    counterGroups.forEach(function (group) {

        document.querySelectorAll(group.container).forEach(function (container) {

            counterTargets.push({
                container: container,
                items: group.items
            });

        });

    });


    if (
        prefersReducedMotion
    ) {

        revealElements.forEach(function (element) {

            element.classList.add("is-revealed");

        });

        counterTargets.forEach(function (target) {

            target.container.classList.add(
                "is-revealed"
            );

            target.container
                .querySelectorAll(target.items)
                .forEach(animateCounter);

        });

    } else {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add(
                            "is-revealed"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -8% 0px"
                }
            );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

            const rect = element.getBoundingClientRect();

            if (
                rect.top < window.innerHeight &&
                rect.bottom > 0
            ) {

                element.classList.add("is-revealed");

                revealObserver.unobserve(element);

            }

        });


        const counterObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const targetItems =
                            entry.target.dataset.counterItems;


                        if (targetItems) {

                            entry.target.classList.add(
                                "is-revealed"
                            );

                            entry.target
                                .querySelectorAll(targetItems)
                                .forEach(animateCounter);

                        }


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.2,
                    rootMargin: "0px 0px -10% 0px"
                }
            );


        counterTargets.forEach(function (target) {

            target.container.dataset.counterItems =
                target.items;

            counterObserver.observe(target.container);

        });

    }


    /* =====================================================
       CLOSE MENU WHEN RESIZING TO DESKTOP
    ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 991) {

            mainNav.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document
                .querySelectorAll(".nav-item.has-dropdown")
                .forEach(function (item) {

                    item.classList.remove("dropdown-open");

                });

        }

    });

});

/* =========================================================
   SCROLL TO TOP
========================================================= */

const scrollTopBtn =
    document.getElementById("scrollTopBtn");


window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

        scrollTopBtn.classList.add("show");

    } else {

        scrollTopBtn.classList.remove("show");

    }

});


scrollTopBtn.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// =========================================================
// SCHOOL DEALS — SHOP BY NEED
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const needItems = document.querySelectorAll(".school-need-item");

    const featureImage = document.querySelector(
        ".school-needs-image img"
    );

    const featureLabel = document.querySelector(
        ".school-needs-feature-content span"
    );

    const featureTitle = document.querySelector(
        ".school-needs-feature-content h3"
    );

    const featureLink = document.querySelector(
        ".school-needs-feature-content a"
    );


    if (
        !needItems.length ||
        !featureImage ||
        !featureLabel ||
        !featureTitle ||
        !featureLink
    ) {
        return;
    }


    const needData = {

        "Everyday Writing": {

            number: "01",

            label: "01 / EVERYDAY WRITING",

            title:
                "Everything needed for a better school day.",

            image:
                "images/school-writing.jpg",

            link:
                "shop.html?category=writing"

        },


        "Classroom Essentials": {

            number: "02",

            label: "02 / CLASSROOM ESSENTIALS",

            title:
                "Reliable essentials for everyday learning.",

            image:
                "images/school-classroom.jpg",

            link:
                "shop.html?category=classroom"

        },


        "Drawing & Colouring": {

            number: "03",

            label: "03 / DRAWING & COLOURING",

            title:
                "Bring imagination to every blank page.",

            image:
                "images/school-colouring.jpg",

            link:
                "shop.html?category=drawing-colouring"

        },


        "Painting & Craft": {

            number: "04",

            label: "04 / PAINTING & CRAFT",

            title:
                "Colour, create and make something memorable.",

            image:
                "images/school-painting.jpg",

            link:
                "shop.html?category=painting-craft"

        },


        "Complete Art Kits": {

            number: "05",

            label: "05 / COMPLETE ART KITS",

            title:
                "Everything young creators need in one place.",

            image:
                "images/school-art-kits.jpg",

            link:
                "shop.html?category=art-kits"

        }

    };


    needItems.forEach((item) => {

        item.addEventListener("click", () => {

            const itemName =
                item.querySelector(".school-need-name")
                    ?.textContent
                    .trim();


            const selectedData =
                needData[itemName];


            if (!selectedData) {
                return;
            }


            // Remove active state

            needItems.forEach((need) => {

                need.classList.remove("active");

            });


            // Add active state

            item.classList.add("active");


            // Small fade transition

            featureImage.style.opacity = "0";

            featureTitle.style.opacity = "0";

            featureLabel.style.opacity = "0";


            setTimeout(() => {

                featureImage.src =
                    selectedData.image;

                featureImage.alt =
                    itemName;


                featureLabel.textContent =
                    selectedData.label;

                featureTitle.textContent =
                    selectedData.title;

                featureLink.href =
                    selectedData.link;


                featureImage.style.opacity = "1";

                featureTitle.style.opacity = "1";

                featureLabel.style.opacity = "1";

            }, 180);

        });

    });

});

// =========================================================
// SCHOOL DEALS — ADVANCED PRODUCT FILTER
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const products = [
        ...document.querySelectorAll(
            ".school-filter-product"
        )
    ];

    const categorySelect =
        document.getElementById(
            "schoolCategory"
        );

    const typeSelect =
        document.getElementById(
            "schoolType"
        );

    const priceSelect =
        document.getElementById(
            "schoolPrice"
        );

    const sortSelect =
        document.getElementById(
            "schoolSort"
        );

    const applyButton =
        document.querySelector(
            ".school-filter-apply"
        );

    const resetButton =
        document.querySelector(
            ".school-filter-reset"
        );

    const resultCount =
        document.querySelector(
            ".school-result-count strong"
        );

    const filterTags =
        document.querySelector(
            ".school-filter-tags"
        );

    const emptyState =
        document.querySelector(
            ".school-filter-empty"
        );


    if (
        !products.length ||
        !categorySelect ||
        !typeSelect ||
        !priceSelect ||
        !sortSelect
    ) {
        return;
    }


    // =====================================================
    // PRICE CHECK
    // =====================================================

    function checkPrice(price, range) {

        const productPrice =
            Number(price);


        if (range === "all") {
            return true;
        }


        if (range === "under-100") {

            return productPrice < 100;

        }


        if (range === "100-250") {

            return (
                productPrice >= 100 &&
                productPrice <= 250
            );

        }


        if (range === "250-500") {

            return (
                productPrice > 250 &&
                productPrice <= 500
            );

        }


        if (range === "above-500") {

            return productPrice > 500;

        }


        return true;

    }


    // =====================================================
    // FILTER PRODUCTS
    // =====================================================

    function filterProducts() {

        const category =
            categorySelect.value;

        const type =
            typeSelect.value;

        const price =
            priceSelect.value;

        const sort =
            sortSelect.value;


        let visibleProducts =
            products.filter((product) => {

                const productCategory =
                    product.dataset.category;

                const productType =
                    product.dataset.type;

                const productPrice =
                    product.dataset.price;


                const categoryMatch =
                    category === "all" ||
                    productCategory === category;


                const typeMatch =
                    type === "all" ||
                    productType === type;


                const priceMatch =
                    checkPrice(
                        productPrice,
                        price
                    );


                return (
                    categoryMatch &&
                    typeMatch &&
                    priceMatch
                );

            });


        // =================================================
        // SORT
        // =================================================

        visibleProducts.sort(
            (a, b) => {

                const priceA =
                    Number(a.dataset.price);

                const priceB =
                    Number(b.dataset.price);

                const popularA =
                    Number(a.dataset.popular);

                const popularB =
                    Number(b.dataset.popular);


                if (sort === "low") {

                    return priceA - priceB;

                }


                if (sort === "high") {

                    return priceB - priceA;

                }


                if (sort === "new") {

                    return (
                        Number(
                            b.dataset.new === "true"
                        ) -
                        Number(
                            a.dataset.new === "true"
                        )
                    );

                }


                return popularB - popularA;

            }
        );


        // =================================================
        // HIDE ALL FIRST
        // =================================================

        products.forEach((product) => {

            product.classList.add(
                "school-product-hidden"
            );

            product.classList.remove(
                "school-product-show"
            );

        });


        // =================================================
        // SHOW FILTERED PRODUCTS
        // =================================================

        visibleProducts.forEach(
            (product, index) => {

                product.classList.remove(
                    "school-product-hidden"
                );

                product.classList.add(
                    "school-product-show"
                );

                product.style.animationDelay =
                    `${index * 50}ms`;

            }
        );


        // =================================================
        // RESULT COUNT
        // =================================================

        resultCount.textContent =
            visibleProducts.length;


        // =================================================
        // EMPTY STATE
        // =================================================

        if (
            visibleProducts.length === 0
        ) {

            emptyState.classList.add(
                "show"
            );

        } else {

            emptyState.classList.remove(
                "show"
            );

        }


        updateFilterTags();

    }


    // =====================================================
    // FILTER TAGS
    // =====================================================

    function updateFilterTags() {

        filterTags.innerHTML = "";


        const filters = [

            {
                value: categorySelect.value,
                label:
                    categorySelect.options[
                        categorySelect.selectedIndex
                    ].text
            },

            {
                value: typeSelect.value,
                label:
                    typeSelect.options[
                        typeSelect.selectedIndex
                    ].text
            },

            {
                value: priceSelect.value,
                label:
                    priceSelect.options[
                        priceSelect.selectedIndex
                    ].text
            }

        ];


        const activeFilters =
            filters.filter(
                filter =>
                    filter.value !== "all"
            );


        activeFilters.forEach(
            (filter) => {

                const tag =
                    document.createElement(
                        "button"
                    );

                tag.type = "button";

                tag.innerHTML = `
                    ${filter.label}
                    <i class="fa-solid fa-xmark"></i>
                `;


                tag.addEventListener(
                    "click",
                    () => {

                        if (
                            filter.value ===
                            categorySelect.value
                        ) {

                            categorySelect.value =
                                "all";

                        }


                        if (
                            filter.value ===
                            typeSelect.value
                        ) {

                            typeSelect.value =
                                "all";

                        }


                        if (
                            filter.value ===
                            priceSelect.value
                        ) {

                            priceSelect.value =
                                "all";

                        }


                        filterProducts();

                    }
                );


                filterTags.appendChild(tag);

            }
        );


        if (
            activeFilters.length > 0
        ) {

            const clearButton =
                document.createElement(
                    "button"
                );

            clearButton.type = "button";

            clearButton.textContent =
                "Clear all";


            clearButton.addEventListener(
                "click",
                resetFilters
            );


            filterTags.appendChild(
                clearButton
            );

        }

    }


    // =====================================================
    // RESET
    // =====================================================

    function resetFilters() {

        categorySelect.value =
            "all";

        typeSelect.value =
            "all";

        priceSelect.value =
            "all";

        sortSelect.value =
            "popular";


        filterProducts();

    }


    // =====================================================
    // APPLY BUTTON
    // =====================================================

    applyButton?.addEventListener(
        "click",
        filterProducts
    );


    // =====================================================
    // RESET BUTTON
    // =====================================================

    resetButton?.addEventListener(
        "click",
        resetFilters
    );


    // =====================================================
    // AUTO FILTER ON SELECT CHANGE
    // =====================================================

    [
        categorySelect,
        typeSelect,
        priceSelect,
        sortSelect
    ].forEach((select) => {

        select.addEventListener(
            "change",
            filterProducts
        );

    });


    // =====================================================
    // WISHLIST
    // =====================================================

    document
        .querySelectorAll(
            ".school-product-wishlist"
        )
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.toggle(
                        "active"
                    );


                    const icon =
                        button.querySelector(
                            "i"
                        );


                    if (
                        button.classList.contains(
                            "active"
                        )
                    ) {

                        icon.className =
                            "fa-solid fa-heart";

                    } else {

                        icon.className =
                            "fa-regular fa-heart";

                    }

                }
            );

        });


    // =====================================================
    // ADD TO KIT
    // =====================================================

    document
        .querySelectorAll(
            ".school-product-add"
        )
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.toggle(
                        "added"
                    );


                    if (
                        button.classList.contains(
                            "added"
                        )
                    ) {

                        button.innerHTML = `
                            Added
                            <i class="fa-solid fa-check"></i>
                        `;

                    } else {

                        button.innerHTML = `
                            Add to Kit
                            <i class="fa-solid fa-plus"></i>
                        `;

                    }

                }
            );

        });


    // =====================================================
    // INITIAL STATE
    // =====================================================

    filterProducts();

});


// =========================================================
// SCHOOL DEALS — SCHOOL KIT BUILDER
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const kitProducts =
        document.querySelectorAll(
            "[data-kit-product]"
        );

    const categoryButtons =
        document.querySelectorAll(
            ".school-kit-category"
        );

    const kitCount =
        document.querySelector(
            ".school-kit-count"
        );

    const selectedCount =
        document.querySelector(
            ".school-kit-selected-count"
        );

    const kitTotal =
        document.querySelector(
            ".school-kit-total"
        );

    const clearKit =
        document.querySelector(
            ".school-kit-clear"
        );


    if (
        !kitProducts.length ||
        !kitCount ||
        !selectedCount ||
        !kitTotal
    ) {
        return;
    }


    // =====================================================
    // UPDATE SUMMARY
    // =====================================================

    function updateKitSummary() {

        let count = 0;

        let total = 0;


        kitProducts.forEach((product) => {

            const checkbox =
                product.querySelector(
                    "input[type='checkbox']"
                );


            if (checkbox.checked) {

                count++;

                total += Number(
                    product.dataset.kitPrice
                );

            }

        });


        kitCount.textContent = count;

        selectedCount.textContent = count;

        kitTotal.textContent =
            `₹${total.toLocaleString("en-IN")}`;

    }


    // =====================================================
    // PRODUCT SELECTION
    // =====================================================

    kitProducts.forEach((product) => {

        const checkbox =
            product.querySelector(
                "input[type='checkbox']"
            );


        checkbox.addEventListener(
            "change",
            updateKitSummary
        );

    });


    // =====================================================
    // CATEGORY FILTER
    // =====================================================

    categoryButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                categoryButtons.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const selectedCategory =
                    button.dataset.kitCategory;


                kitProducts.forEach(
                    (product) => {

                        const productCategory =
                            product.dataset.kitCategory;


                        if (
                            selectedCategory ===
                            "all" ||
                            productCategory ===
                            selectedCategory
                        ) {

                            product.style.display =
                                "flex";

                        } else {

                            product.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    });


    // =====================================================
    // CLEAR KIT
    // =====================================================

    clearKit?.addEventListener(
        "click",
        () => {

            kitProducts.forEach(
                (product) => {

                    const checkbox =
                        product.querySelector(
                            "input[type='checkbox']"
                        );

                    checkbox.checked = false;

                }
            );


            updateKitSummary();

        }
    );


    // =====================================================
    // INITIAL STATE
    // =====================================================

    updateKitSummary();

});

// =========================================================
// SCHOOL DEALS — BULK SAVINGS CALCULATOR
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const range =
        document.getElementById(
            "schoolBulkRange"
        );

    const quantity =
        document.querySelector(
            ".school-bulk-quantity-value"
        );

    const standardPrice =
        document.querySelector(
            ".school-bulk-standard"
        );

    const discountedPrice =
        document.querySelector(
            ".school-bulk-discounted"
        );

    const saving =
        document.querySelector(
            ".school-bulk-saving"
        );

    const percentage =
        document.querySelector(
            ".school-bulk-percent"
        );

    const progress =
        document.querySelector(
            ".school-bulk-progress-fill"
        );


    if (
        !range ||
        !quantity ||
        !standardPrice ||
        !discountedPrice ||
        !saving ||
        !percentage ||
        !progress
    ) {
        return;
    }


    function updateBulkSavings() {

        const items =
            Number(range.value);


        /*
         * Estimated average item value.
         * This is only for the visual savings calculator.
         */

        const itemPrice = 100;

        const standard =
            items * itemPrice;


        let discount = 0;


        if (items >= 150) {

            discount = 15;

        } else if (items >= 100) {

            discount = 12;

        } else if (items >= 50) {

            discount = 8;

        } else if (items >= 25) {

            discount = 5;

        } else {

            discount = 0;

        }


        const saved =
            standard * (discount / 100);


        const finalPrice =
            standard - saved;


        quantity.textContent =
            items;


        standardPrice.textContent =
            `₹${standard.toLocaleString("en-IN")}`;


        discountedPrice.textContent =
            `₹${finalPrice.toLocaleString("en-IN")}`;


        saving.textContent =
            `₹${saved.toLocaleString("en-IN")}`;


        percentage.textContent =
            `${discount}%`;


        const progressValue =
            Math.max(
                5,
                (discount / 15) * 100
            );


        progress.style.width =
            `${progressValue}%`;

    }


    range.addEventListener(
        "input",
        updateBulkSavings
    );


    updateBulkSavings();

});


// =========================================================
// SHOP PAGE — WISHLIST
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    document
        .querySelectorAll(".shop-product-wishlist")
        .forEach((button) => {

            button.addEventListener("click", () => {

                button.classList.toggle("active");

                const icon =
                    button.querySelector("i");

                if (
                    button.classList.contains("active")
                ) {

                    icon.className =
                        "fa-solid fa-heart";

                } else {

                    icon.className =
                        "fa-regular fa-heart";

                }

            });

        });

});
