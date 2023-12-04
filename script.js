// Инициализация игры
function initializeGame() {
    // Создаем переменные
    const width = 600;
    const height = 600;
    let clicks = 0;
    // Случайная позиция клада
    let target = {
        x: getRandomNumber(width),
        y: getRandomNumber(height)
    };

    // Задаем исходное значение информации для пользовантеля
    $("#distance").text("Подсказка");
    $("#clickInfo").text("Попытки");
    
    function handleClick(event) {
        clicks++
        $("#clickInfo").text(`Попытки: ${clicks}`);

        // Если игрок привысит колличество кликов
        if (clicks === 10) {
            Swal.fire("Вы програли! Конец игры.");
            clicks = 0;
            $("#distance").text("Подсказка");
            $("#clickInfo").text("Попытки");
            initializeGame();
            return;
        }

        // Получаем расстояние от места клика до клада
        let distance = getDistance(event, target);
        // Преобразуем расстояние в подсказку
        let distanceHit = getDistanceHit(distance);
        // Записываем в элемент #distance новую подсказку
        $("#distance").text(distanceHit);

        // Победа игрока
        if (distance < 20) {
            endGame(`Поздравляем, вы победили! Количество использованныз попыток: ${clicks}`);
        }
    } 

    function endGame(massege) {
        Swal.fire({
            title: massege,
            showClass: {
              popup: `animate__animated animate__fadeInUp animate__faster`
            },
            hideClass: {
                popup: `animate__animated animate__fadeOutDown animate__faster`
            }
        });

        clicks = 0;
        $("#distance").text("Подсказка");
        $("#clickInfo").text("Попытки");
        initializeGame(); // Начать новую игру после завершения текущей
    }

    // Добавляем элементу img обработчик клика
    $("#map").off("click").on("click", handleClick);
}

// Получить случайное число от 0 до size-1
let getRandomNumber = function (size) {
    return Math.floor(Math.random() * size);
};

// Вычислить расстояние от клика (event) до клада (target)
let getDistance = function (event, target) {
    let diffX = event.offsetX - target.x;
    let diffY = event.offsetY - target.y;
    return Math.sqrt((diffX * diffX) + (diffY * diffY));
};

// Получить для расстояния строку подсказки
let getDistanceHit = function (distance) {
    if (distance < 30) {
        return "Обожжешься!";
    } else if (distance < 50) {
        return "Очень горячо";
    } else if (distance < 100) {
        return "Горячо";
    } else if (distance < 200) {
        return "Тепло";
    } else if (distance < 400) {
        return "Холодно";
    } else if (distance < 600) {
        return "Очень холодно";
    } else if (distance < 848) {
        return "Замерзнешь!";
    };
};

// Вызываем initializeGame при загрузке страницы
$(document).ready(initializeGame);

// перезагрузка игры
$("#reset").click(initializeGame);

// Приветствие вызванное кнопкой "Подробнее об игре"
$("#infoGame").click(function () {
    Swal.fire({
        title: "Приветствую!",
        text: "Это моя первая серьезная игра написанная при помощи технологий: HTML, CSS JavaScript и Jquery!",
        imageUrl: "assets/3-0.jpg",
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: "Custom image"
      });
});