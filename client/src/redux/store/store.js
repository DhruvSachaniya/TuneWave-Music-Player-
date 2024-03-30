import { configureStore } from '@reduxjs/toolkit'
import counterlist from '../redux-files/counterlist'
import countersearch from '../redux-files/countersearch'

export default configureStore({
    reducer: {
        counterList: counterlist,
        counterSearch: countersearch 
    },
})