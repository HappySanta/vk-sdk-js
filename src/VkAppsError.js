export default class VkAppsError extends Error {

    constructor(message, id, stringCode = null) {
        super(message, id)
        this.stringCode = stringCode
    }
}