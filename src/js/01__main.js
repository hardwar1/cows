"use strict";

document.addEventListener("DOMContentLoaded", function (event) {

  // мой мини jquery 
  function qOne(selector) {
    return document.querySelector(selector);
  }

  function qAll(selector) {
    return document.querySelectorAll(selector);
  }

  function clAdd(coll, nameClass) {
    for (let i = 0; i < coll.length; i++) {
      coll[i].classList.add(nameClass);
    }
  }

  function clRem(coll, nameClass) {
    for (let i = 0; i < coll.length; i++) {
      coll[i].classList.remove(nameClass);
    }
  }

  function clTog(coll, nameClass) {
    for (let i = 0; i < coll.length; i++) {
      coll[i].classList.toggle(nameClass);
    }
  }

  // /мой мини jquery



  //Быки и коровы
  // основные задачи:
  // финальные тесты

  // возможные дополнения:

  // можно сделать количество ходов  
  // и если за это количество не справилсся то сделать проигрышь
  // сделать топовое количество ходов

  // выводить текущее время/погоду/местоположение
  // количество лайков в зависимости от скорости 5 	&#128077;
  // секундомер текущий
  // и сохранять топ результат по времени и прошлый

  if (qOne('.cows')) {
    let
      hideNum = '',
      enterNum,
      cows,
      bulls,
      jsStartNew,
      counterShow = 0,
      concoctNumber;

    const
      screenWidth = window.screen.width,
      jsRule = qOne('.js-rule'),
      jsLose = qOne('.js-lose'),
      cowsBoard = qOne('.cows__board--main'),
      cowsHelp = qOne('.js-help'),
      conceiveBtn = qOne('.js-conceive'),
      popapConcoct = qOne('.js-concoct'),
      handMadeHideBtn = qOne('.cows__hide-btn'),
      overlay = qOne('.overlay'),
      jsShow = qAll('.js-show'),
      answerPanelLeft = qOne('.cows__answer-panel--left'),
      answerPanelRight = qOne('.cows__answer-panel--right'),
      controlBtns = qAll('.cows__btn'),
      hideNumText = qOne('.cows__hide-num'),
      rule = qOne('.modal');

    //функционал контрольной панели (кнопок 1-9 и т.д.)
    for (let btn of controlBtns) {
      btn.addEventListener('click', function () {

        let numInput = btn.textContent;
        // console.log('ввел ' + numInput);
        if (numInput == 'Enter') {
          enterNum = cowsBoard.value;
          getNumber();
        } else if (numInput == 'Bspace') {
          cowsBoard.value = cowsBoard.value.substring(0, cowsBoard.value.length - 1);
        } else {
          cowsBoard.value = cowsBoard.value + numInput;
        }
      });
    }

    //старт игры / проигрышь / выигрышь
    let start = qOne('.js-start');
    start.addEventListener('click', startGame);

    function startGame() {

      for (let btn of controlBtns) {
        btn.removeAttribute('disabled');
      }
      hideNumText.innerHTML = 'XXXX';
      jsLose.removeAttribute('disabled');
      while (answerPanelLeft.children.length > 1) {
        answerPanelLeft.removeChild(answerPanelLeft.lastChild);
      }
      while (answerPanelRight.children.length > 1) {
        answerPanelRight.removeChild(answerPanelRight.lastChild);
      }
      conceiveBtn.setAttribute('disabled', true);
      if (hideNum.length != 4) {
        hideNumber();
      }
    }

    function winGame() {
      hideNumText.innerHTML = `<span>&#128077;</span> ` + enterNum + ` &#128077;`;

      answerPanelRight.innerHTML = answerPanelRight.innerHTML + `
      <div class="cows__text--win">Число отгадано!!</div>
      <button type="button" class="cow-btn js-start-new">Новая игра</button>`;
      scrollDown();
      hideNum = '';
      answerPanelLeft.innerHTML = answerPanelLeft.innerHTML + `
      <div class="cows__text--win">Число отгадано!!</div>
      <button type="button" class="cow-btn js-start-new">Новая игра</button>`;
      scrollDown();
      startsBtns();

      for (let btn of controlBtns) {
        btn.setAttribute('disabled', true);
      }
      jsLose.setAttribute('disabled', true);
      conceiveBtn.removeAttribute('disabled');
    }

    function loseGame(why = '(игрок сдался)') {
      hideNumText.innerHTML = hideNum;

      answerPanelRight.innerHTML = answerPanelRight.innerHTML + `
      <div class="lose">игра закончена ${why}</div>
      <button type="button" class="cow-btn js-start-new">Новая игра</button>`;
      scrollDown();
      answerPanelLeft.innerHTML = answerPanelLeft.innerHTML + `
      <div class="lose">игра закончена ${why}</div>
      <button type="button" class="cow-btn js-start-new">Новая игра</button>`;
      scrollDown();
      startsBtns();

      hideNum = '';
      for (let btn of controlBtns) {
        btn.setAttribute('disabled', true);
      }

      conceiveBtn.removeAttribute('disabled');

      jsLose.setAttribute('disabled', true);
    }

    function startsBtns() {
      jsStartNew = qAll('.js-start-new');
      for (let btn of jsStartNew) {
        btn.addEventListener('click', startGame);
      }
    }

    function show(item) {
      counterShow++;
      item.classList.remove('hide-block');
      overlay.classList.remove('hide-block');
    }

    function hide(item) {
      item.classList.add('hide-block');
      counterShow--
      if (!counterShow) {
        overlay.classList.add('hide-block');
      }
    }

    function scrollDown() {
      answerPanelLeft.scrollTop = answerPanelLeft.scrollHeight;
      answerPanelRight.scrollTop = answerPanelRight.scrollHeight;
    }

    // вывод ответа в таблицу
    function writeResult() {
      function write(panel) {
        panel.innerHTML = panel.innerHTML + `
          <div class="cows__answer-row">
            <span class="cows__text cows__text--num">${enterNum}</span>
            <span class="cows__text cows__text--bulls">${bulls}</span>
            <span class="cows__text cows__text--cows">${cows}</span>
          </div>
        `;
        scrollDown();
      }

      let rowsNumber = qAll('.cows__answer-row');
      let currentPanel = answerPanelLeft;
      if (rowsNumber.length < 17) {
        write(answerPanelLeft);
      } else if (rowsNumber.length < 35 && Number(screenWidth) > 800) {
        answerPanelRight.classList.remove('hide-block');
        write(answerPanelRight);
        currentPanel = answerPanelRight;
      } else {
        loseGame('(превышено 35 ходов)');
        scrollDown();
      }
    }

    jsLose.addEventListener('click', function () {
      loseGame();
    });

    // обработка введенного игроком числа
    function getNumber() {
      let numberSet = new Set(enterNum);

      if (enterNum.length == 4 && numberSet.size === 4) {
        if (enterNum != hideNum) {
          let num1 = 0,
            num2 = 0;
          cows = 0;
          bulls = 0;

          while (num1 < 4) {
            if (enterNum[num1] == hideNum[num1]) {
              bulls += 1;
              num1++;
            } else if (hideNum.indexOf(enterNum[num1]) != -1) {
              cows += 1;
              num1++;
            } else {
              num2++;
              if (num2 == 4) {
                num2 = 0;
                num1++;
              }
            }
          }
          writeResult();
          cowsBoard.value = '';
        } else {
          winGame()
        }
      } else {
        show(cowsHelp);
      }
    }

    overlay.addEventListener('click', function () {
      hide(overlay);
      clAdd(jsShow, 'hide-block');
    });

    jsRule.addEventListener('click', function () {
      rule.classList.contains('hide-block') ? show(rule) : hide(rule);
    });

    //слежка за нажатием клавиш
    document.addEventListener('keydown', function (e) {
      // console.log(e);
      enterNum = cowsBoard.value;

      if (e.key == 'Enter' && hideNumText.innerHTML == 'XXXX') {
        getNumber();
      }
      if (e.key == 'Escape') {
        clAdd(jsShow, 'hide-block');
      }
    });

    // компьютер загадывает число:
    function hideNumber() {
      while (hideNum.length < 4) {
        let randomNum = Math.floor(Math.random() * 10);
        if (!hideNum.includes(randomNum)) {
          hideNum += randomNum;
        }
      }
      console.log(hideNum);
    }

    // попап с ручным загадыванием числа
    conceiveBtn.addEventListener('click', function () {
      popapConcoct.classList.contains('hide-block') ? show(popapConcoct) : hide(popapConcoct);
    });

    handMadeHideBtn.addEventListener('click', function () {
      concoctNumber = qOne('.cows__board--concoct');
      let concoctNum = concoctNumber.value;
      let concoctNumSet = new Set(concoctNum);

      if (concoctNum.length == 4 && concoctNumSet.size == 4 && Number(concoctNum) > 4) {
        hideNum = concoctNum;
        concoctNum = '';
        concoctNumber.setAttribute('disabled', true);
        console.log(hideNum);
        startGame();
        hide(popapConcoct);
      }
    });

    // слайдер
    const cowsBg = qOne('.cows'),
      checkImg = new Image();
    let randomImg;

    setInterval(() => {
      chengeImg();
    }, 10000);

    function chengeImg() {
      let i = 0,
        c = 0;
      while (i < 1 && c < 10) {
        randomImg = randomI();
        checkImg.src = `images/cows/${randomImg}.jpg`;
        checkImg.onload = function () {
          cowsBg.style.backgroundImage = `url(images/cows/${randomImg}.jpg)`;
          i++;
        }
        c++;
      }
    }

    function randomI() {
      return Math.floor(Math.random() * 10);
    }

    // кнопка вызова мобильного меню
    let burger = qOne('.burger'),
      mobileMenu = qOne('.header__menu');

    burger.addEventListener('click', function () {
      this.classList.toggle('burger--close');
      mobileMenu.classList.toggle('header__menu--show');
    });

    mobileMenu.addEventListener('click', function () {
      this.classList.remove('header__menu--show');
    });



  }



});