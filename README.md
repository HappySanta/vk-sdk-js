# @happysanta/vk-sdk

JS SDK для VK.

## Установка

```sh
$ npm i @happysanta/vk-sdk
```

## Настройка

В начале файла, который является отправной точкой приложения.

```javascript
import VkSdk from "@happysanta/vk-sdk"

VkSdk.init()
    .then(() => {
        console.log('success')
        // Здесь рендерится основной компонент приложения
    })
    .catch(e => {
        console.log(e)
        // Здесь рендерится основной компонент с сообщением об ошибке
    })
```


## Методы

* [.apiVersion](#apiversion)
* [.getStartParams()](#getstartparams)
* [.resize(w, h)](#resizew-h)
* [.setLocation(location, fireEvent)](#setlocationlocation-fireevent)
* [.addCallback(name, fn)](#addcallbackname-fn)
* [.removeCallback()](#removecallback)
* [.getWindowHeightAndOffset(callback)](#getwindowheightandoffsetcallback)
* [.api(method, params, raw)](#apimethod-params-raw)
* [.requestToken(scope)](#requesttokenscope)
* [.showSettingsBox(scope)](#showsettingsboxscope)
* [.setScroll(y)](#setscrolly)
* [.allowGroupMessage()](#allowgroupmessage)
* [.scrollTop(callback, time)](#scrolltopcallback-time)
* [.getScrollPosition(callback)](#getscrollpositioncallback)
* [.callWithToken(method, params)](#callwithtokenmethod-params)
* [.callToCode(call)](#calltocodecall)
* [.apiExecute(calls, onSuperFail, onAllCallback)](#apiexecutecalls-onsuperfail-onallcallback)
* [.getLinkToApp(defaultGroupId)](#getlinktoappdefaultgroupid)
* [.mobileShare(url, image, title)](#mobileshareurl-image-title)
* [.desktopShare(url, image, title)](#desktopshareurl-image-title)
* [._inlineShare(popup, surl, params, popupName, popupParams)](#_inlinesharepopup-surl-params-popupname-popupparams)
* [.setWidget(type, code)](#setwidgettype-code)


### apiVersion

Возвращает текущую версию API.

```javascript
VkSdk.apiVersion
```


### .getStartParams()

Возвращает набор начальных параметров (accessToken, apiId, groupId и т.д.).

```javascript
VkSdk.getStartParams()
```


### .resize(w, h)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| w          | number    | yes       |
| h          | number    | yes       |

Изменяет размеры фрейма.

```javascript
VkSdk.resize(w, h)
```


### .setLocation(location, fireEvent)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| location   | string    | yes       |
| fireEvent  | boolean   | yes       |

Изменяет хеш текущего адреса страницы, который записывается в адресной строке браузера после символа #. Используется для поддержки кнопок "назад" и "вперед" в браузере. Параметр fireEvent определяет, нужно ли вызывать событие onLocationChanged сразу после запуска метода.

```javascript
VkSdk.setLocation(location, fireEvent = false)
```


### .shareBox(url, image, text)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| url        | string    | yes       |
| image      | string    | yes       |
| text       | string    | yes       |

Публикует запись на стене. Параметр url — URL изображения для сниппета, image — URL изображения для сниппета, text — заголовок сниппета.

```javascript
VkSdk.shareBox(url, image, text)
```


### .addCallback(name, fn)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| name       | string    | yes       |
| fn         | function  | yes       |

Добавляет функцию fn в качестве обработчика события с названием name.

```javascript
VkSdk.addCallback(name, fn)
```

### .removeCallback()

Удаляет функцию из обработчика события. 

```javascript
VkSdk.removeCallback()
```


### .getWindowHeightAndOffset(callback)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| callback   | function  | yes       |

Добавляет функцию callback с тремя параметрами (текущее положение прокрутки окна ВКонтакте, высота окна ВКонтакте в браузере, отступ от начала страницы до объекта с приложением.) в качестве обработчика события onScrollTop и вызывает это событие.

```javascript
VkSdk.getWindowHeightAndOffset(callback)
```


### .api(method, params, raw)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| method     | string    | yes       |
| params     | object    | yes       |
| raw        | boolean   | no       |

Вызывает метод API с названием method и набором параметров params.

```javascript
VkSdk.api(method, params, raw = false)
```


### .requestToken(scope)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| scope      | number    | yes       |

Запрашивает API ключ сообщества. Парметр scope — биютовая маска прав доступа.

```javascript
VkSdk.requestToken(scope)
```


### .showSettingsBox(scope)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| scope      | number    | yes       |

Запрашивает права доступа у пользователя. Парметр scope — биютовая маска прав доступа.

```javascript
VkSdk.showSettingsBox(scope)
```


### .setScroll(y)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| y          | number    | yes       |

Инициирует скроллинг окна браузера по вертикали. Параметр y задает смещение скролла относительно нулевой координаты окна.

```javascript
VkSdk.setScroll(y)
```


### .allowGroupMessage()

Запрашивает разрешение на отправку сообщений текущему пользователю.

```javascript
VkSdk.allowGroupMessage()
```


### .scrollTop(callback, time)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| callback   | function  | yes       |
| time       | number    | yes       |

??

```javascript
VkSdk.scrollTop(callback, time = 100)
```


### .getScrollPosition(callback)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| callback   | function  | yes       |

??

```javascript
VkSdk.getScrollPosition(callback)
```


### .callWithToken(method, params)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| method     | string    | yes       |
| params     | object    | yes       |

??

```javascript
VkSdk.callWithToken(method, params)
```


### .callToCode(call)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| call       | ?         | yes       |

??

```javascript
VkSdk.callToCode(call)
```


### .apiExecute(calls, onSuperFail, onAllCallback)

| Parameter     | Type      | Required  |
| --------------|:---------:| ---------:|
| call          | ?         | yes       |
| onSuperFail   | function  | yes       |
| onAllCallback | function  | yes       |

??

```javascript
VkSdk.apiExecute(calls, onSuperFail, onAllCallback)
```


### .getLinkToApp(defaultGroupId)

| Parameter      | Type      | Required  |
| ---------------|:---------:| ---------:|
| defaultGroupId | number    | no        |

Возвращает ссылку на приложение.

```javascript
VkSdk.getLinkToApp(defaultGroupId = null)
```


### .mobileShare(url, image, title)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| url        | string    | yes       |
| image      | string    | yes       |
| title      | string    | yes       |

Открывает оконо шаринга в мобильной версии приложения.

```javascript
VkSdk.mobileShare(url, image, title)
```


### .desktopShare(url, image, title)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| url        | string    | yes       |
| image      | string    | yes       |
| title      | string    | yes       |

Открывает оконо шаринга в десктопной версии приложения также как и скрипт https://vk.com/js/api/share.js

```javascript
VkSdk.desktopShare(url, image, title)
```


### ._inlineShare(popup, surl, params, popupName, popupParams)

| Parameter   | Type      | Required  |
| ------------|:---------:| ---------:|
| popup       | ?         | yes       |
| surl        | ?         | yes       |
| params      | ?         | yes       |
| popupName   | ?         | yes       |
| popupParams | ?         | yes       |

????

```javascript
VkSdk._inlineShare(popup, surl, params, popupName, popupParams)
```


### .setWidget(type, code)

| Parameter  | Type      | Required  |
| -----------|:---------:| ---------:|
| type       | string    | yes       |
| code       | string    | yes       |

Устанавливает виджета сообщества.

```javascript
VkSdk.setWidget(type, code)
    .then( res => res ? console.log('Виджет установлен') : console log('Пользователь отказался от установле') )
    .catch( error => console.log('Cообщение об ошибке: ', error) )
```

## Как обновить пакет в npm

Обновить код, в package.json изменить версию, затем:

```sh
$ npm whoami // проверить авторизован ли пользователь, если нет, то следующая команда авторизует
$ npm adduser
$ npm publish
```


## License

MIT.


