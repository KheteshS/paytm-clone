const AppBar = () => {
  return (
    <>
      <div className="shadow h-14 flex justify-between items-center">
        <div className="ml-4">PayTm App</div>
        <div className="flex items-center">
          <div className="mr-4">User</div>
          <div className="rounded-full bg-slate-200 flex justify-center items-center h-12 w-12 mr-2">
            <div className="text-xl">U</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppBar;
