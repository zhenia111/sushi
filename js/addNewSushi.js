
const btnAddSushi = document.querySelector('.btn__addSushi');
const modalForm = document.querySelector('.modal-form');
const btnCloseModal = document.querySelector('.modal-form .modal__close');

btnAddSushi.addEventListener('click', () => {
    openModal(modalForm);
});

btnCloseModal.addEventListener('click', () => {
    closeModal(modalForm);
});

modalForm.addEventListener('click', (e) => {
    if (e.target == modalForm) {
        closeModal(modalForm);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modalForm.classList.contains('show')) {
        closeModal(modalForm);
    }
})

const modalBtn = document.querySelector('.modal__btn');

modalBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const newSushi = {
        title: document.querySelector('[data-id="title"]').value,
        weight: document.querySelector('[data-id="weight"]').value,
        muted: document.querySelector('[data-id="muted"]').value,
        count: document.querySelector('[data-id="count"]').value,
        price: document.querySelector('[data-id="price"]').value,
        img: "img/roll/philadelphia.jpg"
    }
    addSushiSet(newSushi);
    closeModal(modalForm);
});

function addSushiSet(obj) {
    tableWrapper.insertAdjacentHTML(
        'beforeEnd',
        `
        <div class="col-md-6">
        <div class="card mb-4" data-id="01">
            <img class="product-img" src="img/roll/california-tempura.jpg" alt="">
            <div class="card-body text-center">
                <h4 class="item-title">${obj.title}</h4>
                <p><small data-items-in-box class="text-muted">${obj.muted}шт.</small></p>

                <div class="details-wrapper">
                    <div class="items counter-wrapper">
                        <div class="items__control" data-action="minus">-</div>
                        <div class="items__current" data-counter>${obj.count}</div>
                        <div class="items__control" data-action="plus">+</div>
                    </div>

                    <div class="price">
                        <div class="price__weight">${obj.weight}г.</div>
                        <div class="price__currency">${obj.price}</div><span>₽</span>
                    </div>
                </div>
                <div class="fast-addition">
                    <div class="fast-addition-1">1</div>
                    <div class="fast-addition-5">5</div>
                    <div class="fast-addition-10">10</div>
                </div>
                <button data-cart type="button" class="btn btn-block btn-outline-warning">+ в
                    корзину</button>

            </div>
        </div>
    </div>
    `
    )

}

function openModal(targetModal) {
    targetModal.classList.add('show');
    targetModal.classList.remove('hide');
    //запрещает скролить пока открыто модальное окно
    document.body.style.overflow = 'hidden';
    //clearInterval(modalTimerId);
};

function closeModal(targetModal) {
    targetModal.classList.remove('show');
    targetModal.classList.add('hide');
    //запрещает скролить пока открыто модальное окно
    document.body.style.overflow = '';
    //clearInterval(modalTimerId);
};