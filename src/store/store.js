import Vuex from "vuex";
import Vue from 'vue'
import {axiosApi} from '@/middilwares/interceptors'
import {host} from '@/config'
import payload from '../assets/paylod.json'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        mutating: false,
        selected: {
            selectedCity: null,
            selectedResource: null,
        },
        posts: {},
        city: {},
        resources: {},
        drawer: false,
        loader: {
            loading: false,
            loadCount: 0
        },
        model: payload,
        username: 'Anonymous',
        users: []
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
        getSelectedCity: state => {
            return state.selected.selectedCity;
        },
        getSelectedResource: state => {
            return state.selected.selectedResource;
        },
        getUsers: state => state.model.users,
        getModel: state => state.model
    },
    mutations: {
        async setLoading(state, payload) {
            state.loader.loading = payload
        },
        async setLoadCount(state) {
            state.loader.loadCount++
        },
        async setDrawer(state) {
            state.drawer = !state.drawer;
        },
        async setUsername(state, username) {
            state.username = username
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
        async setSelectedCity(state, payload) {
            state.selected.selectedCity = payload
        },
        async setSelectedResource(state, payload) {
            state.selected.selectedResource = payload
        },
        async setModel(state, payload) {
            state.model[payload.key]['data'] = payload['data']
            state.model = {...state.model}
        },
        async setPrerequisites(state, payload) {
            state.model[payload.Name]['prerequisites'][payload.key] = payload.data['data']
            state.model = {...state.model}

        },
        async dummyCommit() {
        }
    }, actions: {
        loadPosts({commit, state}, payload) {
            console.log("Payload inside store" + payload + state)
            axiosApi
                .post(host + '/posts/', payload)
                .then(response => response.data)
                .then(items => {
                    commit('setPosts', items)
                })
        },
        loadCity({commit}) {
            axiosApi
                .post(host + '/getCity/', {
                    headers: {'Content-Type': 'application/json'}
                })
                .then(response => response.data)
                .then(items => {
                    commit('setCity', items)
                })
        },
        loadResources({commit}) {
            axiosApi
                .post(host + '/getResources/', {
                    headers: {'Content-Type': 'application/json'}
                })
                .then(response => response.data)
                .then(items => {
                    commit('setResources', items)
                })
        },
        getUsers({commit}) {
            axiosApi
                .post(host + '/manageAdmin/getUsers/', {
                    headers: {'Content-Type': 'application/json'}
                })
                .then(response => response.data)
                .then(items => {
                    commit('setModel', {data: items['data'], key: 'Users'})
                })
        },
        getResources({commit}) {
            axiosApi
                .post(host + '/getResources/', {
                    headers: {'Content-Type': 'application/json'}
                })
                .then(response => response.data)
                .then(items => {
                    commit('setModel', {data: items, key: 'Resources'})
                })
        },
        getData({commit}, payload) {
            axiosApi
                .post(host + '' + payload.api,)
                .then(response => response.data)
                .then(items => {
                    commit('setModel', {data: items['data'], key: payload.key})
                })
        },
        async approvePost({commit}, payload) {
            axiosApi
                .post(host + '/manageMod/approvePost', payload)
                .then(response => response.data)
                .then(items => {
                    console.log(items)
                    this.dispatch('loadPosts', {})
                })
            commit('dummyCommit')
        }
    },
})