
const state = {
    count: 0,
    user: null,
    access:{
        token:null,
        secret:null,
    }
};

const mutations = {
    'CHANGE_COUNT'(state) {
        state.count = state.count + 1;
    },
    C_setUser(state, user) {
        state.user = user.additionalUserInfo.profile;
        state.access.token = user.credential.accessToken;
        state.access.secret = user.credential.secret;

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
        if (localStorage.getItem("TwimaUser") && state.user ==null) {
            console.log('初期化処理をしました');
            commit('C_setUser', JSON.parse(localStorage.getItem("TwimaUser")));
        }
    }
};

const getters = {
    currentCount: state => {
        return state.count;
    },
    getUser: state => {
        // if (localStorage.getItem("TwimaUser")) state.user = JSON.parse(localStorage.getItem("TwimaUser"));
        return state.user;
    },
    getAccessKeys: state => {
        return state.access;
    }

};

export default {
    state,
    mutations,
    actions,
    getters
}
