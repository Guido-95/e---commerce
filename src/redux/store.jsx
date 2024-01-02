import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/api-reducers'

export const store = configureStore({
    reducer: {
        products:reducer
    }
})