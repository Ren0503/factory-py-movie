import { useDispatch } from 'react-redux'
import { StoreType } from 'store'

let store: StoreType

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
