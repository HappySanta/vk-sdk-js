
export default class VkStartParams {

	static LANG_RUS = 0
	static LANG_UKR = 1
	static LANG_BEL = 2
	static LANG_ENG = 3

	static VIEWER_TYPE_GROUP_ADMIN = 4
	static VIEWER_TYPE_GROUP_EDITOR = 3
	static VIEWER_TYPE_GROUP_MODERATOR = 2
	static VIEWER_TYPE_GROUP_MEMBER = 1
	static VIEWER_TYPE_GROUP_NOBODY = 0

	static VIEWER_TYPE_USER_OWNER = 2
	static VIEWER_TYPE_USER_FRIEND = 1
	static VIEWER_TYPE_USER_NOBODY = 0


	/**
	 *	api_id (integer) — идентификатор запущенного приложения.
	 * @returns {number}
	 */
	get apiId() {
		return this._apiId;
	}

	/**
	 * @param {number} value
	 */
	set apiId(value) {
		this._apiId = value;
	}

	/**
	 * api_url (string) — URL сервиса API, по которому необходимо осуществлять запросы.
	 * @returns {string}
	 */
	get apiUrl() {
		return this._apiUrl;
	}

	/**
	 * @param {string} value
	 */
	set apiUrl(value) {
		this._apiUrl = value;
	}

	/**
	 * api_settings — битовая маска настроек прав доступа текущего пользователя в приложении.
	 * прав доступа – https://vk.com/dev/permissions
	 * @returns {number}
	 */
	get apiSettings() {
		return this._apiSettings;
	}

	/**
	 *
	 * @param {number} value
	 */
	set apiSettings(value) {
		this._apiSettings = value;
	}

	/**
	 * viewer_id (integer) — идентификатор пользователя, который запустил приложение.
	 * @returns {number}
	 */
	get viewerId() {
		return this._viewerId;
	}

	/**
	 * @param {number} value
	 */
	set viewerId(value) {
		this._viewerId = value;
	}

	/**
	 * viewer_type — тип пользователя, который просматривает приложение
	 * 4 — если пользователь является создателем или администратором сообщества;
	 * 3 — если пользователь является редактором сообщества;
	 * 2 — если пользователь является модератором сообщества;
	 * 1 — если пользователь является участником сообщества;
	 * 0 — если пользователь не состоит в сообществе.
	 * Если приложение запущено со страницы пользователя (user_id != 0), параметр viewer_type может принимать следующие значения:
	 * 2 — если пользователь является владельцем страницы;
	 * 1 — если пользователь является другом владельца страницы;
	 * 0 — если пользователь не состоит в друзьях владельца страницы.
	 * @returns {number}
	 */
	get viewerType() {
		return this._viewerType;
	}

	/**
	 * @param {number} value
	 */
	set viewerType(value) {
		this._viewerType = value;
	}

	/**
	 * access_token — ключ доступа для вызова методов API по классической схеме.
	 * https://vk.com/dev/api_requests
	 * @returns {string}
	 */
	get accessToken() {
		return this._accessToken;
	}

	/**
	 * @param {string} value
	 */
	set accessToken(value) {
		this._accessToken = value;
	}

	/**
	 * user_id (integer) — идентификатор пользователя, со страницы которого было запущено приложение. Если приложение запущено не со страницы пользователя, содержит 0.
	 * @returns {number}
	 */
	get userId() {
		return this._userId;
	}

	/**
	 * @param {number} value
	 */
	set userId(value) {
		this._userId = value;
	}

	/**
	 * group_id (integer) — идентификатор сообщества, со страницы которого было запущено приложение. Если приложение запущено не со страницы сообщества, содержит 0.
	 * @returns {number}
	 */
	get groupId() {
		return this._groupId;
	}

	/**
	 * @param {number} value
	 */
	set groupId(value) {
		this._groupId = parseInt(value, 10);
	}

	/**
	 * is_app_user (integer, [0,1]) — если пользователь установил приложение, содержит 1, иначе — 0.
	 * @returns {boolean}
	 */
	get isAppUser() {
		return this._isAppUser;
	}

	/**
	 * @param {boolean} value
	 */
	set isAppUser(value) {
		this._isAppUser = value;
	}

	/**
	 * auth_key (string) — ключ, необходимый для авторизации пользователя на стороннем сервере.
	 * https://vk.com/dev/apps_init?f=3.%20auth_key
	 * @returns {string}
	 */
	get authKey() {
		return this._authKey;
	}

	/**
	 * @param {string} value
	 */
	set authKey(value) {
		this._authKey = value;
	}

	/**
	 * language (integer) — идентификатор языка пользователя, просматривающего приложение (см. список языков ниже).
	 * @returns {number}
	 */
	get language() {
		return this._language;
	}

	/**
	 * @param {number} value
	 */
	set language(value) {
		this._language = value;
	}

	/**
	 * parent_language (integer) — идентификатор языка, которым можно заменить язык пользователя (возвращается для неофициальных языковых версий).
	 * @returns {number}
	 */
	get parentLanguage() {
		return this._parentLanguage;
	}

	/**
	 * @param {number} value
	 */
	set parentLanguage(value) {
		this._parentLanguage = value;
	}

	/**
	 * is_secure (integer, [0,1]) — если пользователем используется защищенное соединение – 1, иначе — 0.
	 * @returns {boolean}
	 */
	get isSecure() {
		return this._isSecure;
	}

	/**
	 * @param {boolean} value
	 */
	set isSecure(value) {
		this._isSecure = value;
	}

	/**
	 * api_result (string) — результат первого запроса к API, который выполняется при загрузке приложения.
	 * https://vk.com/dev/apps_init?f=5.%20api_result
	 * @returns {Object|null}
	 */
	get apiResult() {
		return this._apiResult;
	}

	/**
	 * @param {Object|null} value
	 */
	set apiResult(value) {
		this._apiResult = value;
	}

	/**
	 * referrer (string) — обозначение места, откуда пользователь перешёл в приложение.
	 * https://vk.com/dev/apps_init?f=6.%20referrer
	 * @returns {string}
	 */
	get referrer() {
		return this._referrer;
	}

	/**
	 * @param {string} value
	 */
	set referrer(value) {
		this._referrer = value;
	}

	/**
	 * hash (string) — хэш запроса (данные после символа # в строке адреса).
	 * @returns {string}
	 */
	get hash() {
		return this._hash;
	}

	/**
	 * @param {string} value
	 */
	set hash(value) {
		this._hash = value;
	}

	isInGroup() {
		return this.groupId > 0
	}

	isInUser() {
		return this.userId > 0
	}

	isAdmin() {
		return this.isInGroup() && this.viewerType === VkStartParams.VIEWER_TYPE_GROUP_ADMIN
	}

	isModerator() {
		return this.isInGroup() && this.viewerType === VkStartParams.VIEWER_TYPE_GROUP_MODERATOR
	}

	isEditor() {
		return this.isInGroup() && this.viewerType === VkStartParams.VIEWER_TYPE_GROUP_EDITOR
	}

	isMember() {
		return this.isInGroup() && this.viewerType === VkStartParams.VIEWER_TYPE_GROUP_MEMBER
	}

	isNobody() {
		return (this.isInGroup() && this.viewerType === VkStartParams.VIEWER_TYPE_GROUP_NOBODY)
				||
			(this.isInUser() && this.viewerType === VkStartParams.VIEWER_TYPE_USER_NOBODY)
	}

	isMyPage() {
		return this.isInUser() && this.viewerType === VkStartParams.VIEWER_TYPE_USER_OWNER
	}

	isMyFriend() {
		return this.isInUser() && this.viewerType === VkStartParams.VIEWER_TYPE_USER_FRIEND
	}

	getOfficialLanguage() {
		let l = this.language
		let pl = this.parentLanguage
		let officialLangages = [
			VkStartParams.LANG_BEL,
			VkStartParams.LANG_ENG,
			VkStartParams.LANG_UKR,
			VkStartParams.LANG_RUS,
			//тут языки СНГ которые будут русскими если что
            97 //Казахстан
		]
		if ( officialLangages.indexOf(l) === -1 ) {
			return pl
		} else {
			return l
		}
	}

    /**
	 * @return string
     */
	getLangCode() {
		let code = this.getOfficialLanguage()
		if (code === VkStartParams.LANG_RUS) {
			return 'ru'
		} else if (code === VkStartParams.LANG_BEL) {
			return 'by'
		} else if (code === VkStartParams.LANG_UKR) {
			return 'ua'
        } else if (code === VkStartParams.LANG_ENG) {
			return 'en'
        } else {
			return 'ru'
		}
	}

    _apiId
    _apiUrl
    _apiSettings
    _viewerId
    _viewerType
    _accessToken
    _userId
    _groupId
    _isAppUser
    _authKey
    _language
    _parentLanguage
    _isSecure
    _apiResult
    _referrer
    _hash
}
