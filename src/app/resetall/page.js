'use client'
import React from 'react'

const Resetall = () => {

    const resetAll = async () => {
        try {
            await fetch('/api/reset', { method: "POST" })
                .then((res) => {
                    alert("Db Reset Sucessufuly!....")
                    console.log(("reset done"))
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Are you sure want to reset the data</h1>
            <button type="button" onClick={resetAll} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Reset All</button>
        </div>
    )
}

export default Resetall
