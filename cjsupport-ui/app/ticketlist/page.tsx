"use client"

import { useEffect, useState } from "react"

export default function TicketList() {

    interface TableEntry {
        id: string
        userEmail: string
        description: string
        dueDate: Date
        isComplete: boolean
    }

    const [listData, setListData] = useState<TableEntry[]>([])

    useEffect(() => {
        try {
            fetch("http://localhost:5215/support-tickets/get-all-support-tickets")
            .then(response => response.json())
            .then(json => {
                const formattedData = json.data.map((entry) => ({
                    id: entry.id,
                    userEmail: entry.userEmail,
                    description: entry.description,
                    dueDate: new Date(Date.parse(entry.dueDate.split(" ")[0])),
                    isComplete: entry.isComplete
                }))
            formattedData.sort((a, b) => a.dueDate - b.dueDate)
            setListData(formattedData)
            })
        } catch(error) {
            console.log(error)
        }
    }, [])



    return (
        <div>
            <h1 className="px-4 py-4 text-2xl">Support Ticket Display</h1>
            <table className="w-full bg-gray-500 py-8">
                <thead className="">
                    <tr className="text-left">
                        <th className="p-1">ID</th>
                        <th className="p-1">User Email</th>
                        <th className="p-1">Description</th>
                        <th className="p-1">Due Date</th>
                        <th className="p-1">Complete</th>
                    </tr>
                </thead>
                <tbody>
                    {listData.map((row, index: number) => (
                        <tr key={index}>
                            <td className="p-1">{row.id}</td>
                            <td className="p-1">{row.userEmail}</td>
                            <td className="p-1 text-nowrap overflow-hidden text-ellipsis max-w-36">{row.description}</td>
                            <td className="p-1">{row.dueDate.toUTCString()}</td>
                            <td className="p-1">{row.isComplete.toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}