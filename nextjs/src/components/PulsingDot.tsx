import React from 'react'

export default function PulsingDot() {
    return (
        <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandBlue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brandBlue"></span>
        </span>
    )
}
