import Vuex from 'vuex'
import user from "./modules/user"
import getters from "./getters"
import permission from "./modules/premission"
import app from "./modules/app"

const store = new Vuex.Store({
    modules: {
        user,
        permission,
        app,
    },
    getters
})

export default store
