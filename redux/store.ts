import { configureStore } from '@reduxjs/toolkit'
import { themeReducer } from './slices/themeSlice'
import { modalReducer } from './slices/modalSlice'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
// import ratingsReducer from './slices/ratingsSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { cardReducer } from './slices/cardSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, cardReducer)
export const store = configureStore({
  reducer: {
    cardReducer: persistedReducer,
    themeReducer,
    modalReducer,
    // ratings: ratingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export let persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//modifying useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
