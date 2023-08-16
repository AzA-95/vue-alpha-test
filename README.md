Проект запускался на Node 18.13.0 и Npm 9.2.0

Демо сайта находится тут https://vue-alpha.web.app

В файле .env находится базовый урл апи

В папке src/layouts/ находятся лайоуты для страниц. Инциализацией лайоутов занимается файл AppLayout.vue
Лайоуты грузятся по lazyload(грузятся когда только используются) по дефолту лайоут идет AppLayoutDefault.vue
Чтобы указать layout для определеный страницы надо прописать в /src/routes/index.ts в meta свойтсва для определеного роута названия layouta например meta: {layout: 'error'} и добавить название layouta в /src/router/middleware/layout.ts в переменую layoutToFileMap.
В /src/routes/index.ts указан пример layouta AppLayoutError.vue

Для показа страницы(Ошибок) 404, 500 и т.д
Например если апи вернул ответ 404 для динамической страницы то можно использовать
метод showErrorPage({statusCode: 404, message: 'Page not found'})
Метод showErrorPage находится по пути /src/helpers/showErrorPage.ts

В папке /src/middleware можно вставить middleware которые будут выполняться перед разрешением роута.
В данный момент находятся два middleware для примера all.global.ts выполняется при каждом разрешением роута.
Middleware который в конце имени файла имеет `global` например all.global.ts выполняется при разрешение каждого роута порядок выполнения `global` middleware выполняет по символьному знаку a-z или от 0-9
В примере В папке /src/middleware/auth.ts указан локальный middleware который указывается для определеного роута /src/routes/index.ts в meta middleware через масив(Можно указать несколько middleware в масиве порядок выполнения middleware идет по очередно по заданому порядку в массиве). Пример есть в /src/routes/index.ts у роута auth. Поведение middleware аналагично https://router.vuejs.org/guide/advanced/navigation-guards.html#Global-Before-Guards этому. Любой return кроме (undefined и true) приостанавливает выполнения последушего middleware указаного в цепочке. Middleware также может возрашать Promise. Пример middleware указан в коде /src/middleware/auth.ts и /src/middleware/all.global.ts
