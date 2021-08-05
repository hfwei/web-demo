import {createStore} from "vuex"

// 创建存储对象
export default createStore({
    // 需要存储的值都放在这里面
    state: {
        isLoading: false,	// 在视图中通过$store.state.isLoading来获取
        loadingCount: 0
    },
    // 在其他视图中通过 $store.commit('setState', 10) 使用，用于修改store存的值
    mutations: {
        showLoading(state) {
            if (0 === state.loadingCount) {
                state.isLoading = true

            }
            state.loadingCount++;
        },
        hideLoading(state) {
            state.loadingCount--;
            if (0 === state.loadingCount) {
                state.isLoading = false

            }
        },
        setLoadingState(state, isLoading) {	// 只能接受两个参数，用于修改store存的值
            state.isLoading = isLoading
        }
    },
    // 相当于组件的计算属性 通过 $store.getters.isLoading获取计算后的值
    getters: {
        isLoading(state) {
            return state.isLoading;
        }
    },
    // 异步任务 不会改变state 通过 $store.dispatch('showLoading') 使用
    actions: {
        showLoading(context) {
            context.commit('showLoading')
        },
        hideLoading(context) {
            context.commit('hideLoading')
        }
    },
    // store的下级store 方便大型项目复杂数据管理，这里面相当于可以在放置一个和外面这些一样的模块
    modules: {}
})