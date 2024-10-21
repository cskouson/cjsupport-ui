"use client"

export default function Home() {

  interface PostBody {
    UserEmail: string,
    Description: string,
    DueDate: string
  }

  //dynamic date range setup
  const getMaxDate = (date: Date) => {
    date.setFullYear(date.getFullYear() + 1)
    return date
  }
  const today = new Date();
  const minDate: string = today.toISOString().split('T')[0]
  const maxDate: string = getMaxDate(today).toISOString().split('T')[0]

  //format request date
  const apiFormattedDate = (date: string): string => {
    const newDateStr: string = ""
    const dateSplit: string[] = date.split("-")
    return newDateStr.concat(dateSplit[1], "-", dateSplit[2], "-", dateSplit[0])
  }

  //handle form data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const formData: FormData = new FormData(e.currentTarget)

    //create post obj
    const newBody: PostBody = {
      UserEmail: formData.get("email")!.toString(),
      Description: formData.get("description")!.toString(),
      DueDate: apiFormattedDate(formData.get("dueDate")!.toString())
    }

    try {
      const response = await fetch("http://localhost:5215/support-tickets/add-support-ticket", {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBody)
      })
      console.log(response.json())
    } catch (error) {
      alert(error)
    }

    console.log(formData.get("date"))
  }

  return (
    <main>
      <h1 className="px-4 py-4 text-2xl">Support Ticket Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="px-4 py-2">
          <input className="text-black w-96 p-1 rounded"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="px-4 py-2">
          <textarea
            className="w-96 h-48 p-1 text-black rounded"
            name="description"
            placeholder="Enter a description between 100-1000 characters"
            minLength={100}
            maxLength={1000}
            required>
          </textarea>
        </div>
        <div className="px-4 py-2">
          <input
            className="text-black w-96 p-1 rounded"
            name="dueDate"
            type="date"
            min={minDate}
            max={maxDate}
            placeholder="Due Date (MM-DD-YYYY)"
            required
          />
        </div>
        <div className="px-4 py-2">
          <button
            className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            type="submit">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
