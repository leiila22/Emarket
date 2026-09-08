const menu = document.getElementById("menu");

function menuac() {
    menu.classList.remove("translate-x-full");
}

function closemenu() {
    menu.classList.add("translate-x-full");
}
const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

let current = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("opacity-100", i === index);
        slide.classList.toggle("opacity-0", i !== index);
    });

    current = index;
}
if (next && prev) {
    next.onclick = () => {
        showSlide((current + 1) % slides.length);
    };

    prev.onclick = () => {
        showSlide((current - 1 + slides.length) % slides.length);
    };
}

setInterval(() => {
    if (slides.length > 0) {
        showSlide((current + 1) % slides.length);
    }
}, 5000);

//  C A T E G O R I E S

const categories = document.getElementById("categories");
const products = document.getElementById("products");

let BASE_API = 'https://6a983d687160beda2292cfcb.mockapi.io/api/v1';
let AllProduct = [];

function getShowData() {
    fetch(`${BASE_API}/products`)
        .then(res => res.json())
        .then(data => {
            AllProduct = data;
            showProduct(AllProduct);
        });
}

function showProduct(list) {
    products.innerHTML = "";
    list.map(product => {
        products.innerHTML += `
        <div class="group" >
            <div  class="relative flex max-h-[410px] items-center justify-center bg-[#f7f7f7] overflow-hidden">
                <img src="${product.image}" alt="${product.title}" class="cursor-pointer max-h-[250px] lg:h-[300px] w-full object-cover transition duration-300 group-hover:scale-[1.02]">
                <div class="absolute left-[24px] top-1/2 flex -translate-y-1/2 flex-col gap-[8px]
                    opacity-0 translate-x-[-10px] transition-all duration-300
                    group-hover:translate-x-0 group-hover:opacity-100">
                    <button onclick="addcart(${product.id})" class="cursor-pointer flex h-[30px] w-[30px] lg:h-[48px] lg:w-[48px] items-center justify-center rounded-full bg-white text-[#333] shadow-sm transition hover:bg-[#222] hover:text-white">
                        <i class="fa-solid fa-basket-shopping"></i>
                    </button>

                    <button onclick="addwish(${product.id})" class="cursor-pointer flex h-[30px] w-[30px] lg:h-[48px] lg:w-[48px] items-center justify-center rounded-full bg-white text-[#333] shadow-sm transition hover:bg-[#222] hover:text-white">
                        <i class="fa-regular fa-heart"></i>
                    </button>

                    <button class="cursor-pointer flex h-[30px] w-[30px] lg:h-[48px] lg:w-[48px] items-center justify-center rounded-full bg-white text-[#333] shadow-sm transition hover:bg-[#222] hover:text-white">
                        <i class="fa-solid fa-arrows-rotate"></i>
                    </button>
                    <button onclick="openProductModal(${product.id})" class="cursor-pointer flex h-[30px] w-[30px] lg:h-[48px] lg:w-[48px] items-center justify-center rounded-full bg-white text-[#333] shadow-sm transition hover:bg-[#222] hover:text-white">
                        <i class="fa-solid fa-eye"></i>
                    </button>

                    
                </div>
            </div>

            <div class="bg-white py-[20px] text-center">
                <h3 class="text-[18px] font-normal text-[#222]">
                    ${product.title}
                </h3>
                <p class="mt-[12px] text-[22px] font-medium text-[#e85b7a]">
                    $${product.price}
                </p>
            </div>
        </div>
    `;
    });
}

function ShowCategory() {
    fetch(`${BASE_API}/category`)
        .then(res => res.json())
        .then(res => {
            res.forEach((item) => {
                categories.innerHTML += `
                    <button
                        data-category="${item.title}"
                        class="cursor-pointer rounded-full px-3 md:px-6 py-3 text-[13px] font-medium transition 
                        ${item.id == 1
                                ? "bg-[#222] text-white"
                                : "border border-[#e8e8e8] text-[#222]"
                        }"
                    >
                        ${item.title}
                    </button>
                `;
            });

            const buttons = categories.querySelectorAll("button");

            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    buttons.forEach(b => {
                        b.classList.remove("bg-[#222]", "text-white");
                        b.classList.add("border", "border-[#e8e8e8]", "text-[#222]");
                    });

                    btn.classList.remove("border", "border-[#e8e8e8]", "text-[#222]");
                    btn.classList.add("bg-[#222]", "text-white");

                    filtrCtgry(btn.dataset.category);
                });
            });
        });
}

function filtrCtgry(name) {
    if (name === 'All Product') {
        showProduct(AllProduct);
    } else {
        let newmehsul = AllProduct.filter(c => c.category === name);
        showProduct(newmehsul);
    }
}

ShowCategory();
getShowData();

// S E A R C H 

const mobileSearch = document.getElementById("mobileSearch");
let srch=document.getElementById("srch")

function openSearch() {
    mobileSearch.classList.toggle("opacity-0");
    mobileSearch.classList.toggle("invisible");
    mobileSearch.classList.toggle("-translate-y-2");
    
}

const srchcontainer = document.getElementById('srchcontainer');

function axtariset(txt) {
    let searchInput = txt.trim().toLowerCase();
    let axtarisSon = AllProduct.filter(s => 
        s.title.toLowerCase().includes(searchInput) || 
        s.category.toLowerCase().includes(searchInput)
    );

    searchInput === '' ? srchcontainer.style.display = 'none' : srchcontainer.style.display = 'flex';
    srcporduct(axtarisSon);
}

function srcporduct(axtarisSon) {
    
    srchcontainer.innerHTML = axtarisSon.map(item => {
        return `
            <li onclick="openProductModal(${item.id})">
                <a href="#" class="flex max-sm:flex-col items-center md:gap-6 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                    <div class="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden rounded-lg dark:bg-neutral-800">
                        <img src="${item.image}" alt="${item.title}" class="h-full w-full object-contain" />
                    </div>
                    <div class="text-center sm:text-left">
                        <h3 class="text-sm sm:text-base font-semibold text-slate-900 dark:text-black">
                            ${item.title}
                        </h3>
                        <p class="text-sm sm:text-base text-pink-700 font-bold lg:mt-2 dark:text-pink-600">
                            ${item.price} Azn
                        </p>
                    </div>
                </a>
            </li>`;
    }).join("");
}

// S E B E T   V E      S E V I M L I L E R
let cartmodal = document.getElementById('cartmodal');
let favorimodal = document.getElementById('favorimodal');
let cartcount = document.getElementById('cartcount');
let cartlist = document.getElementById('cartlist');
let Wishlistcount = document.getElementById('Wishlistcount');
let Wishlist = document.getElementById('Wishlist');

let SEBET = [];
let sevimliler = [];

function opencart() {
    cartmodal.style.display = (cartmodal.style.display === 'none' || !cartmodal.style.display) ? 'flex' : 'none';
}

function openfavori() {
    favorimodal.style.display = (favorimodal.style.display === 'none' || !favorimodal.style.display) ? 'flex' : 'none';
}

function addcart(id) {
    let item = SEBET.find(e => e.id === id);
    if (item) {
        item.say++;
    } else {
        SEBET.push({ id: id, say: 1 });
    }
    showBasket();
    updateSebetcount();
    cartcount.style.display = 'flex';
}

function increase(id) {
    let item = SEBET.find(e => e.id === id);
    if (item) {
        item.say++;
        showBasket();
        updateSebetcount();
    }
}

function decrease(id) {
    let item = SEBET.find(e => e.id === id);
    if (item) {
        item.say--;
        if (item.say <= 0) {
            SEBET = SEBET.filter(e => e.id !== id);
        }
    }

    if (SEBET.length === 0) {
        cartmodal.style.display = 'none';
        cartcount.style.display = 'none';
    }

    showBasket();
    updateSebetcount();
}

function updateSebetcount() {
    const totalCount = SEBET.reduce((sum, e) => sum + e.say, 0);
    cartcount.innerHTML = totalCount;
    if (totalCount === 0) {
        cartcount.style.display = 'none';
    }
}

function removeSebet(id) {
    SEBET = SEBET.filter(e => e.id !== id);
    if (SEBET.length === 0) {
        cartmodal.style.display = 'none';
        cartcount.style.display = 'none';
    }
    showBasket();
    updateSebetcount();
}

    function addwish(id) {
    if (!sevimliler.includes(id)) {
        sevimliler.push(id);

        showSevimliler();

        Wishlistcount.innerHTML = sevimliler.length;
        Wishlistcount.style.display = 'flex';
    }
}


function showSevimliler() {
    Wishlist.innerHTML = sevimliler.map((id) => {
        let product = AllProduct.find(p => p.id === id);
        if (!product) return '';
        return `
            <li class="flex gap-4 bg-white px-4 py-6 rounded-md border border-slate-300 dark:bg-neutral-800 dark:border-neutral-700">
                <div class="flex gap-6 sm:gap-4 max-sm:flex-col">
                    <div class="w-24 h-24 max-sm:w-24 max-sm:h-24 shrink-0">
                        <img src="${product.image}" onclick="openProductModal(${product.id})" class="w-full h-full object-contain" alt="${product.title}">
                    </div>
                    <div class="flex flex-col gap-4">
                        <div>
                            <h3 class="text-base font-semibold text-slate-900 dark:text-slate-50">${product.title}</h3>
                            <p class="text-[13px] text-slate-600 mt-2 flex items-center gap-2 dark:text-slate-400">
                                Kateqoriya: <span class="font-medium dark:text-slate-300">${product.category}</span>
                            </p>
                        </div>
                        <div class="mt-auto">
                            <p class="text-sm font-semibold text-slate-900 dark:text-slate-50">${product.price} Azn</p>
                        </div>
                    </div>
                </div>
                <div class="ml-auto flex items-start justify-end">
                    <button onclick="removeWish(${product.id})" type="button" aria-label="Remove from wishlist" class="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 fill-slate-400 hover:fill-red-600 inline-block dark:hover:fill-red-500" viewBox="0 0 24 24">
                            <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"></path>
                            <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"></path>
                        </svg>
                    </button>
                </div>
            </li>`;
    }).join('');
}

function removeWish(id) {
    sevimliler = sevimliler.filter(itemId => itemId !== id);
    showSevimliler();
    Wishlistcount.innerHTML = sevimliler.length;
    
    if (sevimliler.length === 0) {
        favorimodal.style.display = 'none';
    }
}
function showBasket() {
    cartlist.innerHTML = SEBET.map((item) => {
        let product = AllProduct.find(p => p.id === item.id);
        if (!product) return '';
        return `
            <li class="flex gap-4 bg-white px-4 py-6 rounded-md border border-slate-300 dark:bg-neutral-800 dark:border-neutral-700">
                <div class="flex gap-6 sm:gap-4 max-sm:flex-col">
                    <div class="w-24 h-24 max-sm:w-24 max-sm:h-24 shrink-0">
                        <img src="${product.image}" class="w-full h-full object-contain" alt="${product.title}">
                    </div>
                    <div class="flex flex-col gap-4">
                        <div>
                            <h3 class="text-base font-semibold text-slate-900 dark:text-slate-50">${product.title}</h3>
                            <p class="text-[13px] text-slate-600 mt-2 flex items-center gap-2 dark:text-slate-400">
                                Kateqoriya: <span class="font-medium dark:text-slate-300">${product.category}</span>
                            </p>
                        </div>
                        <div class="mt-auto">
                            <p class="text-sm font-semibold text-slate-900 dark:text-slate-50">${product.price} Azn</p>
                        </div>
                    </div>
                </div>

                <div class="ml-auto flex flex-col">
                    <div class="flex items-start gap-4 justify-end">
                        <button onclick="removeSebet(${product.id})" type="button" class="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-4 fill-slate-400 hover:fill-red-600 inline-block dark:hover:fill-red-500" viewBox="0 0 24 24">
                                <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"></path>
                                <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"></path>
                            </svg>
                        </button>
                    </div>

                    <div class="flex items-center mt-auto px-2.5 py-1.5 border border-slate-300 text-slate-900 font-medium text-xs rounded-md dark:border-neutral-700 dark:text-slate-50 dark:bg-neutral-800">
                        <button onclick="decrease(${product.id})" type="button" class="cursor-pointer focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 fill-current" viewBox="0 0 124 124">
                                <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"></path>
                            </svg>
                        </button>
                        <span class="mx-3">${item.say}</span>
                        <button onclick="increase(${product.id})" type="button" class="cursor-pointer focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 fill-current" viewBox="0 0 42 42">
                                <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </li>`;
    }).join('');
}

// D  E T A I L S

function openProductModal(id) {
    const product = AllProduct.find(p => p.id === id);
    if (!product) return;
    currentModalProductId = id;
    modalQuantity = 1;
    const images = product.images && product.images.length > 0 
        ? product.images 
        : [product.image, product.image, product.image, product.image];

    productModalContent.innerHTML = `
        <!-- Sol tərəf: Şəkillər və Qalereya -->
        <div class="flex flex-col gap-4">
            <div class="flex h-[200px] sm:h-[380px] w-full items-center justify-center rounded-lg bg-[#f7f7f7] p-4">
                <img id="mainModalImage" src="${product.image}" alt="${product.title}" class="max-h-full max-w-full object-contain">
            </div>
            <!-- Kiçik Şəkillər (Thumbnails) -->
            <div class="grid grid-cols-4 gap-2">
                ${images.map((img) => `
                    <button onclick="changeModalMainImage('${img}')" class="h-20 w-full overflow-hidden rounded-md border border-gray-200 bg-[#f7f7f7] p-1 hover:border-black focus:outline-none">
                        <img src="${img}" class="h-full w-full object-contain">
                    </button>
                `).join('')}
            </div>
        </div>
        <div class="flex flex-col justify-between">
            <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">${product.title}</h2>
                <!-- Reytinq və Satış Statı (API-dən gələn data) -->
                <div class="mt-2 flex items-centerflex sm:flex-row flex-col justify-between text-sm">
                    <div class="flex items-center gap-1 text-amber-400">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <span class="ml-1 text-xs text-gray-500">(${product.reviews || 0} reviews)</span>
                    </div>
                    <p class="text-xs font-semibold text-rose-500">
                        <i class="fa-solid fa-fire mr-1"></i>${product.sold || 0} sold. Only ${product.stock || 0} remain
                    </p>
                </div>
                <p class="mt-4 text-3xl font-bold text-[#e85b7a]">
                    $${product.price}
                </p>
                <div class="mt-4 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <p><span class="inline-block w-24 font-medium text-gray-700 dark:text-gray-300">Brand:</span> ${product.brand || 'N/A'}</p>
                    <p><span class="inline-block w-24 font-medium text-gray-700 dark:text-gray-300">Product Code:</span> ${product.productCode || 'N/A'}</p>
                    <p><span class="inline-block w-24 font-medium text-gray-700 dark:text-gray-300">Stock:</span> <span class="text-emerald-600"><i class="fa-regular fa-square-check mr-1"></i>${product.delivery || 'In Stock'}</span></p>
                </div>
                <div class="mt-6">
                    <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Qty
                    </label>
                    <div class="inline-flex items-center rounded-md border border-gray-300 dark:border-neutral-700">
                        <button 
                            onclick="modalDecrease()"
                            class="px-3 py-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-800">
                            -
                        </button>
                        <span 
                            id="modalQtyValue"
                            class="px-4 py-1.5 text-sm font-semibold text-gray-800 dark:text-white">
                            1
                        </span>
                        <button 
                            onclick="modalIncrease()"
                            class="px-3 py-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-800">
                            +
                        </button>
                    </div>
                </div>
                <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button onclick="addCartFromModal(${product.id})" class="rounded-md bg-[#d85b78] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c24c68] transition">
                        ADD TO CART
                    </button>
                    <button class="rounded-md bg-[#a3c843] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#91b339] transition">
                        BUY NOW
                    </button>
                </div>
                <div class="mt-4 flex flex-row flex-wrap items-center gap-6 text-xs text-gray-600 dark:text-gray-400">
                    <button onclick="addwish(${product.id})" class="flex items-center gap-2 hover:text-[#d85b78]">
                        <span class="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
                        <i class="fa-regular fa-heart"></i>
                        </span>
                        ADD TO WISHLIST
                    </button>
                    <button class="flex items-center gap-2 hover:text-black dark:hover:text-white">
                        <span class="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"><i class="fa-solid fa-arrows-rotate"></i></span>
                        ADD TO COMPARE
                    </button>
                </div>
            </div>
            <div class="mt-6 border-t border-gray-200 pt-4 text-xs text-gray-500 dark:border-neutral-800">
                <span class="mr-2">Tags:</span>
                <span class="rounded bg-gray-200 px-2.5 py-1 font-medium text-gray-700 dark:bg-neutral-800 dark:text-gray-300">${product.category}</span>
            </div>
        </div>
    `;
    productDetailModal.classList.remove('hidden');
    productDetailModal.classList.add('flex');
    openSearch()
}
let modalQuantity = 1;
let currentModalProductId = null;
function modalIncrease() {
    modalQuantity++;
    const qty = document.getElementById("modalQtyValue");
    if (qty) qty.innerText = modalQuantity
}

function modalDecrease() {
    if (modalQuantity > 1)  modalQuantity--
    const qty = document.getElementById("modalQtyValue");
    if (qty) qty.innerText = modalQuantity
}
function addCartFromModal(id) {
    const item = SEBET.find(e => e.id === id);
    if (item)  item.say += modalQuantity;
    else {
        SEBET.push({
            id: id,
            say: modalQuantity
        });
    }
    showBasket();
    updateSebetcount();
    cartcount.style.display = 'flex';
    // Modalı bağla
    productDetailModal.classList.add('hidden');
    productDetailModal.classList.remove('flex');
    // Quantity-ni sıfırla
    modalQuantity = 1;
}
function closeProductModal() {
    productDetailModal.classList.add('hidden');
    productDetailModal.classList.remove('flex');
    modalQuantity = 1;
    currentModalProductId = null;
}

// B R A N D S
const brandSlider = document.getElementById("brandSlider");
const brandslide = document.querySelectorAll(".brand-slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentIndex = 0;
function getItemsPerView() {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 992) return 3;
    if (window.innerWidth < 1200) return 5;
    return 7;
}
function updateSlider() {
    const itemsPerView = getItemsPerView();
    const slideWidth = 100 / itemsPerView;
    brandSlider.style.transform =
        `translateX(-${currentIndex * slideWidth}%)`;
}
function nextSlide() {
    const itemsPerView = getItemsPerView();
    const maxIndex = brandslide.length - itemsPerView;
    if (currentIndex >= maxIndex)currentIndex = 0 
    else  currentIndex++
    updateSlider();
}
function prevSlide() {
    const itemsPerView = getItemsPerView();
    const maxIndex = brandslide.length - itemsPerView;
    if (currentIndex <= 0)currentIndex = maxIndex 
    else  currentIndex--
    updateSlider();
}
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);


window.addEventListener("resize", () => {
    const itemsPerView = getItemsPerView();
    const maxIndex = brandslide.length - itemsPerView;
    if (currentIndex > maxIndex) currentIndex = Math.max(0, maxIndex)

    updateSlider();
});

updateSlider();


// N E W S
const blogData = [
    {
        day: "14",
        month: "February",
        date: "February 14th, 2025",
        title: "Kire Tuma Demons Vel Eum Iriure Dolor",
        description:
            "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum d..",
        id: 1
    },

    {
        day: "13",
        month: "February",
        date: "February 13th, 2025",
        title: "Biten Demons Lector In Henderit In Vulp",
        description:
            "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum d..",
        id: 2
    },

    {
        day: "13",
        month: "February",
        date: "February 13th, 2025",
        title: "Commodo Laoreet Semper Tincidun Sit",
        description:
            "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum d..",
        id: 3
    },

    {
        day: "14",
        month: "February",
        date: "February 14th, 2025",
        title: "Lorem Ipsum Dolor Sit Amet",
        description:
            "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum d..",
        id: 4
    }
];

const blogSlider = document.getElementById("blogSlider");

blogSlider.innerHTML = blogData.map(blog => `
    <article  class="blog-slide  border border-transparent hover:border-[#eee] hover:scale-105 py-4 lg:px-5 px-3  shrink-0">
        <div class="flex items-baseline mb-2 lg:mb-8">
            <span class="lg:text-6xl text-4xl font-bold leading-none text-[#ef5382]">
                ${blog.day}
            </span>
            <span class="text-[#aaa] lg:text-[18px] ml-2">
                / ${blog.month}
            </span>
        </div>
        <h4 class="lg:text-lg leading-[1.35] font-semibold text-[#222] mb-2 lg:mb-5">
            <a href="#" class="hover:text-[#ef5382] transition-colors">
                ${blog.title}
            </a>
        </h4>
        <p class=" text-[13px] leading-[1.8] text-[#888] mb-4 lg:mb-7">
            ${blog.description}
        </p>
        <a href="#" class="inline-flex  items-center gap-2 text-sm text-[#222] hover:text-[#ef5382] transition-colors">
            View more
            <i class="fa fa-angle-double-right"></i>
        </a>
    </article>
`).join("");

document.getElementById("blogNext").addEventListener("click", () => {
    const itemsPerView = getBlogItemsPerView();
    const maxIndex = Math.max(
        0,
        blogData.length - itemsPerView
    )
    if (blogIndex < maxIndex) blogIndex++
     else  blogIndex = 0
    updateBlogSlider()
})

document.getElementById("blogPrev").addEventListener("click", () => {
    const itemsPerView = getBlogItemsPerView();
    const maxIndex = Math.max(
        0,
        blogData.length - itemsPerView
    )
    if (blogIndex > 0) blogIndex--
    else blogIndex = maxIndex

    updateBlogSlider();
})
window.addEventListener("resize", updateBlogSlider);


