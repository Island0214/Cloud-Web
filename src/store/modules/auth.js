import * as authApi from '../../api/auth'

// initial state
const state = {
  isLogin: false
}

// getters
const getters = {
  isLogin: state => state.isLogin
}

// actions
const actions = {
  'userLogin' ({state, commit}, {body, onSuccess, onError}) {
    console.log('userLogin')
    authApi.userLogIn(data => {
      console.log(data)
      if (data.error !== undefined) {
        // console.log(data.error)
        onError(data)
      } else {
        onSuccess()
        localStorage.setItem('key', data.key)
        localStorage.setItem('name', body.username)
        localStorage.setItem('email', body.email)
        console.log(data.key)
        commit('setLoginStatus', true)
      }
    }, body, data => {
      onError(data)
    })
  },
  'userSignin' ({state, commit}, {body, onSuccess, onError}) {
    console.log('userSignin')
    authApi.userSignin(data => {
      console.log(data)
      if (data.error !== undefined) {
          // console.log(data.error)
        onError(data)
      } else {
        onSuccess()
        localStorage.setItem('key', data.key)
        localStorage.setItem('name', body.username)
        localStorage.setItem('email', body.email)
        commit('setLoginStatus', true)
          // on-success
      }
    },
    body, data => {
      onError(data)
    })
  },
  'userInfo' ({state, commit}, {onSuccess, onError}) {
    console.log('userInfo')
    authApi.userInfo(data => {
      console.log(data)
      if (data.error !== undefined) {
        // console.log(data.error)
        onError(data)
      } else {
        onSuccess(data)
        // on-success
      }
    })
  },
  'changePassword' ({state, commit}, {onSuccess, onError, body}) {
    console.log('changePassword')
    authApi.changePassword(
      data => {
        console.log(data)
        if (data.error !== undefined) {
          // console.log(data.error)
          onError(data)
        } else {
          onSuccess(data)
          // on-success
        }
      },
      body,
      data => {
        onError(data)
      }
    )
  }
}

// mutations
const mutations = {
  'setLoginStatus' (state, status) {
    state.isLogin = status
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
