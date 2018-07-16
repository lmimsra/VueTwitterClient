import Vue from 'vue'

const state = {
    count: 0,
    user: null,
    image: null
};

const mutations = {
    'CHANGE_COUNT'(state) {
        state.count = state.count + 1;
    },
    C_setUser(state, user) {
        state.user = user.additionalUserInfo.profile.name;
        state.image = user.additionalUserInfo.profile.profile_image_url;
    }
};

const actions = {
    plusCount: ({commit}) => {
        commit('CHANGE_COUNT');
    },
    setUser: ({commit}, user) => {
        commit('C_setUser', user);
    },
    initializeUser: ({commit, state}) => {
        if (localStorage.getItem("TwimaUser")) {
            commit('C_setUser', JSON.parse(localStorage.getItem("TwimaUser")));
        }
    }
};

const getters = {
    currentCount: state => {
        return state.count;
    },
    isLogin: state => {
        // if (localStorage.getItem("TwimaUser")) state.user = JSON.parse(localStorage.getItem("TwimaUser"));
        return state.user;
    },

};

export default {
    state,
    mutations,
    actions,
    getters
}
