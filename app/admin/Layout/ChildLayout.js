'use client'
import StoreProvider from '../../../redux/StoreProvider'
import StateContext from '../../../context/stateContext'
import App from '../../components/App'

export default function ChildLayout({ children }) {
  return (
    <StoreProvider>
      <StateContext>
        <App>{children}</App>
      </StateContext>
    </StoreProvider>
  )
}
