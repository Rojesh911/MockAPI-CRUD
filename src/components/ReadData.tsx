import axios from "axios";
import { toast } from "react-toastify";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;  
  phoneNumber: string;
}

interface ReadDataProps {
  userData: User[];
  readData: () => void;
}

const ReadData: React.FC<ReadDataProps> = ({ userData, readData }) => {
  const deleteData = async (id: number) => {
    await axios.delete(
      `https://66fbb3218583ac93b40cca00.mockapi.io/crud/crud/${id}`
    );
    readData();
    toast.success("Successfully deleted the selected user");
  };

  return (
    <table className="w-full mt-6 border border-collapse border-green-500 table-auto">
      <thead className="bg-green-100">
        <tr className="border">
          <th className="px-6 py-2">SN</th>
          <th className="px-6 py-2">FIRSTNAME</th>
          <th className="px-6 py-2">LASTNAME</th>
          <th className="px-6 py-2">EMAIL</th>
          <th className="px-6 py-2">PHONENUMBER</th>
          <th className="px-6 py-2">ACTION</th>
        </tr>
      </thead>

      <tbody>
        {userData?.map((user) => {
          return (
            <tr key={user?.id} className="border">
              <td className="px-6 py-2">{user?.id}</td>
              <td className="px-6 py-2">{user?.firstName}</td>
              <td className="px-6 py-2">{user?.lastName}</td>
              <td className="px-6 py-2">{user?.email}</td>
              <td className="px-6 py-2">{user?.phoneNumber}</td>
              <td className="flex gap-2 px-6 py-2">
                <button
                onClick={() => deleteData(user?.id)} className="px-3 py-1 font-bold text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReadData