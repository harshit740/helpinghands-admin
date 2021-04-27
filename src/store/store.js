import Vuex from "vuex";
import Vue from 'vue'
import {axiosApi} from '@/middilwares/interceptors'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        selectedCity:{},
        posts: {},
        city: {},
        resources: {},
        drawer: false,
        loader: {
            loading: false,
            loadCount: 0
        },
        username: 'anonymous'
    },
    getters: {
        isLoading: state => {
            return state.loader.loading;
        },
        getLoadCount: state => {
            return state.loader.loadCount;
        },
        isOpened: state => {
            return state.drawer;
        },
        isSelectedCity: state => {
            return state.selectedCity;
        }
    },
    mutations: {
        async setLoading(state) {
            state.loader.loading = !state.loader.loading;
        },
        async setLoadCount(state) {
            state.loader.loadCount++
        },
        async setDrawer(state) {
            console.log("Set drawer called inside store")
            state.drawer = !state.drawer;
            console.log("Drawer Value " + state.drawer)
        },
        async setUsername(state) {
            console.log(state.username)
        },
        async setPosts(state, items) {
            state.posts = items
        },
        async setCity(state, items) {
            state.city = items
        },
        async setResources(state, items) {
            state.resources = items
        },
        async setSelectedCity(state,payload){
            console.log(payload)
            state.selectedCity = payload
        },
    }, actions: {
        loadPosts({commit, state}, payload) {
            console.log("Payload inside store" + payload + state)
            axiosApi
                .post('https://helpinghands-backedn.herokuapp.com/posts/', payload)
                .then(response => response.data)
                .then(items => {
                    console.log(items);
                    commit('setPosts', items)
                })
        },
        loadCity({commit}) {
            axiosApi
                .post('https://helpinghands-backedn.herokuapp.com/getCity/', {
                    headers: {'Content-Type': 'application/json'}
                })
                .then(response => response.data)
                .then(items => {
                    console.log(items);
                    commit('setCity', items)
                })
        },
        loadResources({commit}) {
            axiosApi
                .post('https://helpinghands-backedn.herokuapp.com/getResources/', {
                    headers: {'Content-Type': 'application/json'}
                })
                .then(response => response.data)
                .then(items => {
                    console.log(items);
                    commit('setResources', items)
                })
        }
    },
})
