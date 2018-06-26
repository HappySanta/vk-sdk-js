import queryString from 'query-string'
import VkStartParamsBuilder from "./VkStartParamsBuilder"
import VkScope from "./VkScope"
import VkAppsError from "./VkAppsError"

export default class VkSdk {

    static startParams = null
    static startSearch = ""
    static limitActionInterval = 3000
    static apiVersion = '5.78'

    /**
     * @returns {VkStartParams}
     */
    static getStartParams() {
        if (VkSdk.startParams === null) {
            VkSdk.startParams = VkStartParamsBuilder.fromQueryParams(queryString.parse(window.location.search))
			VkSdk.startSearch = window.location.search
        }
        return VkSdk.startParams
    }

    static init() {
        return new Promise((resolve, reject) => {
            let vk = window['VK']
            if (vk) {
                try {
                    vk.init(
                        () => resolve(this.getStartParams()),
                        error => reject(error || new VkAppsError("Unknown error", 2)),
                        VkSdk.apiVersion
                    )
                } catch (e) {
                    if (process.env.NODE_ENV === 'development') {
                        resolve(this.getStartParams())
                    } else {
                        reject(e)
                    }
                }
            } else {
                reject( new VkAppsError("Javascript SDK not found, see this vk.com/dev/Javascript_SDK", 1) )
            }
        })
    }

    /**
     * @param w
     * @param h
     * @return {Promise.<*,*>}
     */
    static resize(w, h) {
        return new Promise( resolve => {
            let vk = window['VK']
            let ttl = null
            let proxyCallback = (width, height) => {
                vk.removeCallback('onWindowResized', proxyCallback)
                resolve({width, height})
                clearTimeout(ttl)
            }
            vk.addCallback('onWindowResized', proxyCallback)
            vk.callMethod("resizeWindow", w, h)
            ttl = setTimeout(() => proxyCallback(w, h), 1000)
        } )

    }

    static setLocation(location, fireEvent = false) {
        let vk = window['VK']
        vk.callMethod("setLocation", location, fireEvent)
    }

    static shareBox(url, image, text) {
        let vk = window['VK']
        vk.callMethod("shareBox", url, image, text)
    }

    static addCallback(name, fn) {
        let vk = window['VK']
        vk.addCallback(name, fn)
    }

    static removeCallback() {
        let vk = window['VK']
        vk.removeCallback.apply(vk, arguments)
    }

    static getWindowHeightAndOffset(callback) {
        let vk = window['VK']
        let proxyCallback = (scrollY, windowHeight, topOffset) => {
            vk.removeCallback('onScrollTop', proxyCallback)
            callback(scrollY, windowHeight, topOffset)
        }
        vk.addCallback('onScrollTop', proxyCallback)
        vk.callMethod("scrollTop")
    }

    static api(method, params, raw = false) {
        return new Promise( (resolve,reject) => {
            let vk = window['VK']
            if (params.v === undefined) {
                params.v = VkSdk.apiVersion
            }
            vk.api(method, params, res => {
                if (res.response !== undefined) {
                    raw ? resolve(res) : resolve(res.response)
                } else if (res.error !== undefined) {
                    // Обработка ситуации когда слишком много запросов в секунду
                    if (res.error.error_code === 6) {
                        setTimeout( () => {
                            VkSdk.api(method, params,raw).then(resolve).catch(reject)
                        }, 999 )
                    } else {
                        reject(new Error(JSON.stringify(res.error)))
                    }
                } else {
                    reject(new Error(JSON.stringify(res)))
                }
            })
        } )

    }

    /**
     * Запрушивает API ключ сообщества
     * @param scope – биютовая маска прав доступа
     * @return {Promise}
     */
    static requestToken(scope) {
        return new Promise( (resolve, reject) => {
            let vk = window['VK']
            let allowCallback, rejectCallback

            allowCallback = (scope, token) => {
                vk.removeCallback("onGroupSettingsChanged", allowCallback)
                vk.removeCallback("onGroupSettingsCancel", rejectCallback)
                resolve({scope, token})
            }
            rejectCallback = () => {
                vk.removeCallback("onGroupSettingsChanged", allowCallback)
                vk.removeCallback("onGroupSettingsCancel", rejectCallback)
                reject()
            }
            vk.addCallback("onGroupSettingsChanged", allowCallback)
            vk.addCallback("onGroupSettingsCancel", rejectCallback)
            vk.callMethod("showGroupSettingsBox", scope)
        } )
    }


    static lastLimitedAction = 0

    /**
     * Запрашивает права доступа у пользователя
     * @param scopes – Битовая маска прав доступа
     * @returns {Promise}
     */
    static showSettingsBox(scopes) {
        return new Promise((resolve, reject) => {
            if (VkScope.hasScope(VkSdk.getStartParams().apiSettings, scopes)) {
                resolve()
            } else {
                let vk = window['VK']
                let rejectVkCallback = () => {
                }
                let allowVkCallback = (settings) => {
                    VkSdk.getStartParams().apiSettings = settings
                    vk.removeCallback('onSettingsChanged', allowVkCallback)
                    vk.removeCallback('onWindowFocus', rejectVkCallback)
                    resolve(settings)
                }
                rejectVkCallback = () => {
                    vk.removeCallback('onSettingsChanged', allowVkCallback)
                    vk.removeCallback('onWindowFocus', rejectVkCallback)
                    reject({code: 403, message: 'User not allow access to ' + scopes, showSettingsBox: true})
                }
                vk.addCallback('onSettingsChanged', allowVkCallback)
                vk.addCallback('onWindowFocus', rejectVkCallback)
                let now = (new Date()).getTime()
                if ((now - VkSdk.lastLimitedAction) > VkSdk.limitActionInterval) {
                    VkSdk.lastLimitedAction = now
                    vk.callMethod("showSettingsBox", scopes)
                } else {
                    setTimeout(() => vk.callMethod("showSettingsBox", scopes), VkSdk.limitActionInterval)
                }
            }
        })
    }

    static setScroll(y) {
        let vk = window['VK']
        vk.callMethod('scrollWindow', y, 100)
    }

    /**
     * Запрос разрешения на отправку сообщений текущему пользователю
     * @return {Promise}
     */
    static allowGroupMessage() {
        return new Promise( (resolve, reject) => {
            let vk = window['VK']

            let rejectCallback, allowCallback

            rejectCallback = () => {
                vk.removeCallback('onAllowMessagesFromCommunity', allowCallback)
                vk.removeCallback('onAllowMessagesFromCommunityCancel', rejectCallback)
                reject(null)
            }

            allowCallback = () => {
                vk.removeCallback('onAllowMessagesFromCommunity', allowCallback)
                vk.removeCallback('onAllowMessagesFromCommunityCancel', rejectCallback)
                resolve()
            }

            vk.addCallback('onAllowMessagesFromCommunity', allowCallback)
            vk.addCallback('onAllowMessagesFromCommunityCancel', rejectCallback)

            vk.callMethod('showAllowMessagesFromCommunityBox')
        } )
    }

    static scrollTop(callback, time = 100) {
        let vk = window['VK']
        let proxyCallback = (scrollY, windowHeight, topOffset) => {
            vk.removeCallback('onScrollTop', proxyCallback)
            vk.callMethod('scrollWindow', topOffset - 57, time)
            if (callback) {
                callback(scrollY, windowHeight, topOffset)
            }
        }
        vk.addCallback('onScrollTop', proxyCallback)
        vk.callMethod("scrollTop")
    }

    static getScrollPosition(callback) {
        let vk = window['VK']
        let proxyCallback = (scrollY, windowHeight, topOffset) => {
            vk.removeCallback('onScrollTop', proxyCallback)
            callback(scrollY, windowHeight, topOffset)
        }
        vk.addCallback('onScrollTop', proxyCallback)
        vk.callMethod("scrollTop")
    }


    static callbackIds = 10

    static callWithToken(method, params) {
        let callbackId = VkSdk.callbackIds++
        let callbackName = 'VkApiCallback' + callbackId
        params.callback = callbackName
        let src = 'https://api.vk.com/method/' + method + '?' + queryString.stringify(params)
        return new Promise((resolve) => {
            let s = document.createElement("script")
            window[callbackName] = (r) => {
                resolve(r)
                try {
                    document.body.removeChild(s)
                } catch (e) {
                }
            }
            s.type = "text/javascript"
            s.async = true
            s.src = src
            s.id = callbackName
            document.body.appendChild(s)
        })
    }

    static callToCode(call) {
        let method = call[0]
        let params = call[1] || {}
        return "r.push(API." + method + "( " + JSON.stringify(params) + " ))"
    }

    static apiExecute(calls, onSuperFail, onAllCallback) {
        let code = ["var r = []"]
        code = code.concat(calls.map(VkSdk.callToCode))
        code.push("return r")
        VkSdk.api('execute', {code: code.join(';') + ';', v: '5.62'}, r => {
            if (r.response) {
                let {response, execute_errors} = r
                let errorIndex = 0
                response.forEach((res, index) => {
                    let call = calls[index]
                    if (call.length >= 3 && typeof call[2] === 'function') {
                        let callback = call[2]
                        if (res !== false) {
                            callback({response: res})
                        } else {
                            let error = execute_errors ? execute_errors[errorIndex] : {
                                error_code: 0,
                                error_message: 'Execute error'
                            }
                            if (error !== undefined) {
                                errorIndex++
                                callback({error})
                            }
                        }
                    }
                })
                if (onAllCallback) {
                    onAllCallback()
                }
            } else {
                if (onSuperFail) {
                    onSuperFail(r.error || r)
                }
            }
        })
    }

    /**
     * Возвращает ссылку на приложение
     * @param defaultGroupId
     * @return {string}
     */
    static getLinkToApp(defaultGroupId = null) {
        let url = "https://vk.com/app" + VkSdk.getStartParams().apiId
        if (VkSdk.getStartParams().groupId) {
            url += '_-' + VkSdk.getStartParams().groupId
        } else if (defaultGroupId) {
            url += '_-' + Math.abs(defaultGroupId)
        }
        return url
    }

    /**
     * @param {String} url
     * @param {String} image
     * @param {String} title
     * https://vk.com/dev/community_apps_docs?f=2.6.%20%D0%9F%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B8%20%D0%BD%D0%B0%20%D1%81%D1%82%D0%B5%D0%BD%D0%B5
     * Открывает оконо шаринга в МОБИЛЬНОЙ версии приложения
     */
    static mobileShare(url, image, title) {
        let vk = window['VK']
        vk.callMethod("shareBox", url, image, title);
    }

    /**
     * @param {String} url
     * @param {String} image
     * @param {String} title
     * https://vk.com/dev/widget_share
     * Открывает оконо шаринга в ДЕСКТОП версии приложения также как и скрипт https://vk.com/js/api/share.js
     */
    static desktopShare(url, image, title) {
        let params = {
            title: title,
            image: image,
            noparse: "1",
        }

        let popupName = '_blank',
            width = 650,
            height = 610,
            left = Math.max(0, (window.screen.width - width) / 2),
            top = Math.max(0, (window.screen.height - height) / 2),
            surl = 'https://vk.com/share.php?url=' + encodeURIComponent(url),
            popupParams = 'width='+width+',height='+height+',left='+left+',top='+top+',menubar=0,toolbar=0,location=0,status=0',
            popup = false;

        try {
            let doc_dom = '', loc_hos = '';
            try {
                doc_dom = document.domain;
                loc_hos = window.location.host;
            } catch (e) {
            }
            if (doc_dom !== loc_hos) {
                let ua = window.navigator.userAgent.toLowerCase();
                if (!/opera/i.test(ua) && /msie/i.test(ua)) {
                    VkSdk._inlineShare(popup, surl, params)
                }
            }
            popup = window.open('', popupName, popupParams);
            let text = '<form accept-charset="UTF-8" action="' + surl + '" method="POST" id="share_form">';
            for (let i in params) {
                text += '<input type="hidden" name="' + i + '" value="' + params[i].toString().replace(/"/g, '&myquot;').replace(/&quot/ig, '&myquot') + '" />';
            }
            text += '</form>';
            text += '<script type="text/javascript">document.getElementById("share_form").submit()</script>';

            text = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">' +
                '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">' +
                '<head><meta http-equiv="content-type" content="text/html; charset=windows-1251" /></head>' +
                '<body>' + text + '</body></html>';
            popup.document.write(text);
            popup.focus();
        } catch (e) { // ie with changed domain.
            VkSdk._inlineShare(popup, surl, params, popupName, popupParams)
        }
    }

    static _inlineShare(popup, surl, params, popupName, popupParams) {
        try {
            if (popup) {
                popup.close();
            }
            surl += '?';
            for (let i in params) {
                surl += encodeURIComponent(i) + '=' + encodeURIComponent(params[i]) + '&';
            }
            popup = window.open(surl, popupName, popupParams);
            popup.focus();
        } catch (e) {
            alert("Sharing error: " + e.message)
        }
    }

    static setWidgetLock = 0

    /**
     * Установка виджета сообщества
     * VkSdk.setWidget(type, code)
     *  .then( res => res ? Виджет установлен : Пользователь отказался от установле )
     *  .catch( error => в error сообщение об ошибке )
     * @param type
     * @param code
     * @return {Promise}
     */
    static setWidget(type, code) {
        return new Promise((resolve, reject) => {
            let rr = () => {
            }
            let onAppWidgetPreviewFail = error => {
                rr()
                reject("Что-то сломалось, пришлите скриншот этой ошибки и ссылку на вашу группу нам vk.com/hs. " + error)
            }
            let onAppWidgetPreviewCancel = () => {
                rr()
                resolve(false)
            }
            let onAppWidgetPreviewSuccess = () => {
                rr()
                resolve(true)
            }

            rr = () => {
                VkSdk.setWidgetLock = Date.now()
                VkSdk.removeCallback('onAppWidgetPreviewFail', onAppWidgetPreviewFail)
                VkSdk.removeCallback('onAppWidgetPreviewCancel', onAppWidgetPreviewCancel)
                VkSdk.removeCallback('onAppWidgetPreviewSuccess', onAppWidgetPreviewSuccess)
            }

            VkSdk.addCallback('onAppWidgetPreviewFail', onAppWidgetPreviewFail)
            VkSdk.addCallback('onAppWidgetPreviewCancel', onAppWidgetPreviewCancel)
            VkSdk.addCallback('onAppWidgetPreviewSuccess', onAppWidgetPreviewSuccess)

            if (Date.now() - VkSdk.setWidgetLock < 3000) {
                reject("Вы вызываете обновление виджета слишком часто, подождите 5 секунд и попробуйте снова")
            } else {
                let vk = window['VK']
                vk.callMethod('showAppWidgetPreviewBox', type, code)
            }
        })
    }

}
