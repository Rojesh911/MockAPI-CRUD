import CreateData from "./components/CreateData.tsx";
import ReadData from "./components/ReadData.tsx";
import ReadUpdateDeleteDate from "./components/ReadUpdateDeleteDate.tsx";

import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;  
  phoneNumber: string; 
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const readData = async () => {
    let response = await axios.get(
      "https://66fbb3218583ac93b40cca00.mockapi.io/crud/crud"
    );
    setUsers(response.data);
  };

  useEffect(() => {
    readData();
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full my-8">
      <h1 className="text-4xl font-extrabold">mockAPI CRUD</h1>
      <section className="border-t-2 pb-1 my-8 w-[70%]">
        <h1 className="text-xl font-semibold"> Create Data</h1>
        <CreateData userData={readData} />
      </section>

      {isEditable === false ? (
        <section className="border-t-2 pb-1 my-8 w-[70%]">
          <div className="flex flex-row justify-between mt-2">
            <h1 className="text-xl font-semibold">Read Data</h1>
            <button 
              onClick={() => setIsEditable(true)}
              className="px-4 py-1 rounded-md bg-sky-300 hover:bg-sky-400 text-sky-800"
              >
                Go To Edit Mode
            </button>
          </div>
          <ReadData userData={users} readData={readData} />
        </section>
      ) : (
        <section className="border-t-2 pb-1 my-8 w-[70%]">
          <div className="flex flex-row justify-between mt-2">
            <h1 className="text-xl font-semibold">Update Data</h1>
            <button onClick={() => setIsEditable(false)}
              className="px-4 py-1 text-green-800 bg-green-300 rounded-md hover:bg-green-400"
              >
                Go To Read Mode
              </button>
          </div>
          <ReadUpdateDeleteDate userData={users} readData={readData} />
        </section>
      )}
    </div>
  );
}

export default App;
