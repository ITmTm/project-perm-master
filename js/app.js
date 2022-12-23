"use strict";

// Mask

let selector = document.querySelectorAll('.feed-phone, .consultation__input, .modal__input');
let im = new Inputmask('+7 (999) 999 - 99 - 99');
im.mask(selector);


const swiper = new Swiper(".swiper", {
    loop: !0,
    watchSlidesVisibility: !0,
    pagination: {
        el: ".swiper-pagination",
        clickable: !0,
        dynamicBullets: !0,
    },
    breakpoints: {
        220: {
            slidesPerView: 1
        },
        300: {
            slidesPerView: 1
        },
        320: {
            slidesPerView: 1
        },
        700: {
            slidesPerView: 2
        },
        900: {
            slidesPerView: 2
        },
        1200: {
            slidesPerView: 3
        }
    },
    effect: "slide",
    slidesPerView: 3,
    spaceBetween: 40,
    scrollbar: {
        el: ".swiper-scrollbar"
    },
    grabCursor: true,

});

// Modal


const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');

// Функция модального окна
function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
}

modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
});


// Функция закрытия модального окна
function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// вызов по функции (если выполню про блок о отправке можно удалить)
// modalCloseBtn.addEventListener('click', closeModal);

// Событие клика по подложке окна и выход
modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == "") {
        closeModal();
    }
});

// Закрытие по Esc если в таргете модальное окно
document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
        closeModal();
    }
});

// Показ окна через таймаут
const modalTimerId = setTimeout(openModal, 1200000000);

// Функция при скролинге конца сайта вывод модального окна без повторения
function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

// Вывод функциии при скролинге до конца сайта
window.addEventListener('scroll', showModalByScroll);


// WOW
new WOW().init();


// отслеживание поворот экрана
// screen.addEventListener("orientationchange", function () {
//     console.log("The orientation of the screen is: " + screen.orientation);
// });

    // Boorger
    
    const burger = document.querySelector('.burger'),
          menu = document.querySelector('.mobile-menu'),
          menuItem = document.querySelectorAll('.mobile-menu-body li');

        burger.addEventListener('click', () => {
            menu.classList.toggle('active');
            burger.classList.toggle('active-burger');
        });

        menuItem.forEach(item => {
            item.addEventListener('click', () => {
                menu.classList.toggle('active');
                burger.classList.toggle('active-burger');
            });
    });





    // Переход по ссылкам без# в адресной строке
    // const aClick = (e) => {
    //     e.preventDefault();
    //     const target = e.target.href.split('#')[1];
    //     console.log(target);
    //     const offsetTop = document.getElementById(target).offsetTop;
    //     window.scrollTo(0, offsetTop);
    // };
    // [...document.getElementsByTagName('a')].forEach(i => {
    //     i.addEventListener('click', aClick);
    // });

    // document.ondragstart = noselect;
    // // запрет на перетаскивание 
    // document.onselectstart = noselect;
    // // запрет на выделение элементов страницы 
    // document.oncontextmenu = noselect;
    // // запрет на выведение контекстного меню 
    // function noselect() {
    //     return false;
    // }


//Forms

const ajaxSend = (formData) => {
    fetch('server.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded : charset=utf-8',
            },
            body: JSON.stringify({
                phone: formData
            }),
        })
        .then(response => alert("Заявка успешно отправлена"))
        .catch(error => console.error("Ошибка"))

};

var forms = document.getElementById('form1');

function sendToServer(name_form, name_class_phone) {
    // console.log("Название формы:", name_form)                            |
    // console.log("name class phone:", name_class_phone)                   |  проверка
    // console.log("html код формы", document.getElementById(name_form))    |
    var phone = document.getElementById(name_form).getElementsByClassName(name_class_phone)[0].value;
    // console.log(phone)
    let newstr = phone.replaceAll("_", '');
    let newstr1 = newstr.replaceAll("-", '');
    let newstr2 = newstr1.replaceAll("(", '');
    let newstr3 = newstr2.replaceAll(")", '');
    let newstr4 = newstr3.replace(/ /g, '')

    // console.log(newstr4)
    // console.log(newstr4.length)
    // console.log(phone.length)
    if (newstr4.length == 12) {
        axios.post("server.php", {
            phone: phone,
        }).then((response) => {
            success: Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Спасибо! В ближайшее время наш менеджер свяжется с Вами.',
                showConfirmButton: false,
                timer: 2500
            });
            closeModal();
            document.getElementById(name_form).reset();

        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Что-то пошло не так..!',
            timer: 3500
        });
    }
}
