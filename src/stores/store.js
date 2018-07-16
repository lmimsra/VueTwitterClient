import Vue from 'vue'
import Vuex from 'vuex'

import twima from './modules/twima'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        twima
    }
})
