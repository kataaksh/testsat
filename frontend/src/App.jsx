

const App = () => {
  return (
    <>
      <div>
        <nav>
          <h1 className="h-10 bg-blue-500 text-center font0bold text-white ">
            Nav
          </h1>
        </nav>
        <div className="flex bg-amber-50 h-[calc(100vh-2.5rem)]">
          <div className="w-1/2 bg-slate-200 p-4">
            <p>
              Question:
              What is the value of
              (
              12
              ÷
              3
              )
              +
              (
              5
              ×
              2
              )
              (12÷3)+(5×2) ?
            </p>
          </div>
          <div className="p-4 relative">

            <div className="bg-white border-2 w-fit border-black m-2 p-2">
              A) 10
            </div>
            <div className="bg-white border-2 w-fit border-black m-2 p-2">
              B) 14
            </div>
            <div className="bg-white border-2 w-fit border-black m-2 p-2">
              C) 16
            </div>
            <div className="bg-white border-2 w-fit border-black m-2 p-2">
              D) 20
            </div>



            <div className="flex justify-between gap-56 absolute bottom-0 p-4">
              <button className="bg-blue-500 text-white p-2 rounded">
                Previous
              </button>
              <button className="bg-blue-500 text-white p-2 rounded">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

