const SendMoney = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-md w-96 bg-white p-6 shadow-lg rounded-lg space-y-8">
          <h2 className="text-3xl font-bold text-center">Send Money</h2>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-2xl text-white">A</span>
            </div>
            <h3 className="text-2xl font-semibold">Friend's Name</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium" for="amount">
                Amount (in Rs)
              </label>
              <input
                min={1}
                type="number"
                className="h-10 w-full rounded-md border px-3 py-2 text-sm"
                id="amount"
                placeholder="Enter amount"
              />
            </div>
            <button className="w-full h-10 bg-green-500 text-white rounded-md text-sm font-medium">
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendMoney;
