import { Suspense } from 'react'
import { App } from './app'

export default function Arrow() {
    return (
        <>
            <Suspense fallback={null}>
                <App />
            </Suspense>
        </>
    )
}

