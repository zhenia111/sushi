
const tableWrapper = document.querySelector('.table-content'); //Поменял row на другой класс так как 
//при делигировании цеплялись и кнопки с корзины,а у них должна быть другая логика(посмотрите куда добавил данный класс)
const basketCartWrapper = document.querySelector('.cart-wrapper');
const basketPlaceholder = document.querySelector('[data-cart-empty]');
//блок выводных данных корзины
const cartItem = document.querySelector('.cart-item');
//блоки доставки, беспланой доставки и сама цена 
const deliveryPrice = document.querySelector('.cart-total .total-price-delivery');
const deliveryPriceBlock = document.querySelector('.cart-total .delivery-price');
const deliveryFree = document.querySelector('.cart-total .delivery-cost');
//итоговая цена(блок) 
const totalPrice = document.querySelector('.cart-total .total-price');
//массив для хранения вводных данных 
const basketList = [];

tableWrapper.addEventListener('click', (event) => {
    if (event.target.getAttribute('data-action') == "plus") {
        const counterWrapper = event.target.closest('.counter-wrapper');
        const counter = counterWrapper.querySelector('[data-counter]');
        counter.innerText = +counter.innerText + 1;
        return;
    }

    if (event.target.getAttribute('data-action') == "minus") {
        const counterWrapper = event.target.closest('.counter-wrapper');
        const counter = counterWrapper.querySelector('[data-counter]');
        if (counter.innerText > 1) {
            counter.innerText = +counter.innerText - 1;
        }
        return;
    }

    if (event.target.classList.contains("btn-block")) {
        const cartWrapper = event.target.closest(".card");
        const counter = cartWrapper.querySelector('[data-counter]');
        // формируем новый объект который при клике добавим в исходный массив
        const newOrder = {
            title: cartWrapper.querySelector('.item-title').innerText,
            weight: cartWrapper.querySelector('.price__weight').innerText,
            muted: cartWrapper.querySelector('.text-muted').innerText,
            count: cartWrapper.querySelector('.items__current').innerText,
            price: cartWrapper.querySelector('.price__currency').innerText,
            img: cartWrapper.querySelector('.product-img').src
        };
        //фильтруем массив вход.данных по налиличию одинаковых заголовков
        const itemExistArr = basketList.filter(item => {
            if (item.title == newOrder.title) {
                return true;
            }
        });
        //в поле количетво входного массива добаляем количетво порций в новом заказе
        if (itemExistArr.length) {
            for (let i = 0; i < basketList.length; i++) {
                if (basketList[i].title == itemExistArr[0].title) {
                    basketList[i].count = +basketList[i].count + +newOrder.count; //тут поменял немного логику,так как 
                    break;                                                       //складывал не те числа))
                }
            }
        } else {                     //если нет совпадений по имени вставляем новый объект во входной массив
            basketList.push(newOrder);

        }
        //функция при клике на кнопку примет данные из нового заказа и выведет их в виде HTMl блока в нужное место (корзину)
        showItemsBasket();
        //скидываем значие счетчика после отправки в корзину данных 
        counter.innerText = 1;

        //task 1
        //при нажатии на копку считаем игововую сумму и выводим в корзину 
        getTotalPrice();
        console.log(basketList);
    }//если цель кнопка 
});
//вешаем обработчик на блок выводных данных в корзине 
basketCartWrapper.addEventListener('click', (event) => {
    if (event.target.getAttribute('data-action') == "plus") {
        const cartItem = event.target.closest('.cart-item');
        const counter = cartItem.querySelector('[data-counter]');
        const cartItemTitle = cartItem.querySelector('.cart-item__title');

        for (let i = 0; i < basketList.length; i++) {
            if (basketList[i].title == cartItemTitle.innerHTML) {
                basketList[i].count = +basketList[i].count + 1;
                break;
            }
        }
        showItemsBasket();
        getTotalPrice();
    }

    if (event.target.getAttribute('data-action') == "minus") {
        const cartItem = event.target.closest('.cart-item');
        const counter = cartItem.querySelector('[data-counter]');
        const cartItemTitle = cartItem.querySelector('.cart-item__title');

        for (let i = 0; i < basketList.length; i++) {
            if (basketList[i].title == cartItemTitle.innerHTML) {
                if (counter.innerHTML > 1) {
                    basketList[i].count = +basketList[i].count - 1;
                }
                else {
                    basketList.splice([i], 1);
                }
            }
            
        }
        showItemsBasket();
        getTotalPrice();
    }
});

function getTotalPrice() {
    
    const deliveryPrice =300;
    let sumTotal = 0;

    basketList.forEach((item) => {
        sumTotal = +sumTotal + (+item.price * +item.count);
    });

    if (sumTotal <= 600 && sumTotal > 0) {
        sumTotal = sumTotal + deliveryPrice;
        deliveryFree.classList.add('hide');
        deliveryPriceBlock.classList.remove('hide');
    } else if (sumTotal > 600) {
        deliveryPriceBlock.classList.add('hide');
        deliveryFree.classList.remove('hide');
    }
    totalPrice.innerHTML = sumTotal;
}

function showItemsBasket() {
    if (basketList.length == 0) {
        basketPlaceholder.classList.add('show');
        basketPlaceholder.classList.remove('hide');
        //скидываем сумарный прайс!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //getTotalPrice();
        totalPrice.innerHTML = 0;
        
    } else {
        basketPlaceholder.classList.remove('show');
        basketPlaceholder.classList.add('hide');
    }
    let basketItems = '';

    basketList.forEach((item) => {

        basketItems += `
        <div class="cart-item" data-id="2">
            <div class="cart-item__top">
                <div class="cart-item__img">
                    <img src="${item.img}" alt="">
                </div>
                <div class="cart-item__desc">
                    <div class="cart-item__title">${item.title}</div>
                    <div class="cart-item__weight">${item.muted} / ${item.weight}</div>
                    <!-- cart-item__details -->
                    <div class="cart-item__details">
                        <div class="items items--small counter-wrapper">
                            <div class="items__control" data-action="minus">-</div>
                            <div class="items__current" data-counter="">${item.count}</div>
                            <div class="items__control" data-action="plus">+</div>
                        </div>
                        <div class="price">
                            <div class="price__currency">${item.price}₽</div>
                        </div>
                    </div>
                    <!-- // cart-item__details -->
                </div>
            </div>
        </div>`;
    });
    basketCartWrapper.innerHTML = basketItems;
}

//Задания //Сделайте как можно больше задач,делайте сначала те задачи в которых больше уверены(самые простые задачи это 1 и 3.Задача 2
//очень похожа на текущую реализацию делигирования за несколькими исключениями)
/*
    1.У вас есть стоимость одного сетта сушь,в поле "ИТОГО" надо выводить сумму конечного заказа
    (при добавлении и удалении элементов пересчитывтаь сумму)
    2.Добавить для корзины делигирования и количество сушей можно уменьшать 
    до нуля,то есть если в корзине был один сет и при на минус он должен полностью удаляться
    3.После нажатия на кнопку "в корзину" сбрасывать счётчик данного товара обратно до единицы()
    4.У вас есть блоки с классами delivery-price и free .Блок free показывать только в топ случае,если сумма заказа 
    больше или равна 600р,если нет, то в итоговую сумму записывать сумму заказа + доставка 300р, 
    то есть если мы закажем на сумму 550,то итоговая сумма должна быть 850р,а если больше 600 р то 
    доставка бесплатная и соответственно в зависимости от заказа показывать блок delivery-price или free.
*/
