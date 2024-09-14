import { Loader2 } from 'lucide-react'
import React from 'react'

const loading = () => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-25 flex items-center justify-center z-50">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
    )
}

export default loading