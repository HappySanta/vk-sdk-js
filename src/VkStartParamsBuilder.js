import VkStartParams from "./VkStartParams"
export default class VkStartParamsBuilder {


	static fromQueryParams( params ) {

		let TYPE_INTEGER = 'integer'
		let TYPE_STRING = 'string'
		let TYPE_BOOLEAN = 'boolean'
		let TYPE_OBJECT_FROM_JSON = 'json_to_object'

		function snakeToCamel(s){
			return s.replace(/(_\w)/g, function(m){return m[1].toUpperCase();});
		}

		function ss( target, source, key, type, def ) {
			let value = def
			if (source[key] !== undefined) {
				value = source[key]
			}

			if (type === TYPE_STRING) {
				value = value.toString()
			} else if (type === TYPE_INTEGER) {
				value = parseInt(value, 10)
			} else if (type === TYPE_BOOLEAN) {
				value = !!value
			} else if (type === TYPE_OBJECT_FROM_JSON) {
				value = value ? JSON.parse(value) : null
			}

			target[ snakeToCamel( key ) ] = value
		}

		let v = new VkStartParams()

		ss(v, params, 'api_url', TYPE_STRING, '')
		ss(v, params, 'api_id', TYPE_INTEGER, 0)
		ss(v, params, 'api_settings', TYPE_INTEGER, 0)
		ss(v, params, 'viewer_id', TYPE_INTEGER, 0)
		ss(v, params, 'viewer_type', TYPE_INTEGER, 0)
		ss(v, params, 'access_token', TYPE_STRING, '')
		ss(v, params, 'user_id', TYPE_INTEGER, 0)
		ss(v, params, 'group_id', TYPE_INTEGER, 0)
		ss(v, params, 'is_app_user', TYPE_BOOLEAN, false)
		ss(v, params, 'auth_key', TYPE_STRING, '')
		ss(v, params, 'language', TYPE_INTEGER, 0)
		ss(v, params, 'parent_language', TYPE_INTEGER, 0)
		ss(v, params, 'is_secure', TYPE_BOOLEAN, true)
		ss(v, params, 'api_result', TYPE_OBJECT_FROM_JSON, '')
		ss(v, params, 'referrer', TYPE_STRING, 'unknown')
		ss(v, params, 'hash', TYPE_STRING, '')

		return v

	}

}
