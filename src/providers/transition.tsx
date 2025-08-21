import { createContext, FC, PropsWithChildren } from "react"
import { useState } from "react"

export const TransitionContext = createContext({
    completed: false,
    toggleCompleted: (v: boolean) => {},
})

export const TransitionProvider: FC<PropsWithChildren> = ({ children }) => {
    const [completed, setCompleted] = useState(false)
    const toggleCompleted = (value: boolean) => {
        setCompleted(value)
    }
    return (
        <TransitionContext.Provider
            value={{
                toggleCompleted,
                completed,
            }}
        >
            {children}
        </TransitionContext.Provider>
    )
}

export default TransitionContext
