import { configureStore } from '@reduxjs/toolkit'
import counterlist from '../redux-files/counterlist'


export default configureStore({
    reducer: {
        counterList: counterlist
    },
})