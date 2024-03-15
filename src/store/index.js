import Vuex from 'vuex'
import user from "./modules/user"
import getters from "./getters"
import permission from "./modules/premission"

const store = new Vuex.Store({
    modules: {
        user,
        permission,
    },
    getters
})

export default store
