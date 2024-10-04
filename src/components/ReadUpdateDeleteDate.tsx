import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

interface User {
  id: number;
  firstName: string;  
  lastName: string; 
  email: string;
  phoneNumber: string;
}

interface UpdateDataProps {
  userData: User[];
  readData: () => void;
}

const ReadUpdateDeleteDate: React.FC<UpdateDataProps> = ({
  userData, readData}) => {
    const [editData, setEditData] = useState<User[]>(userData);
    const [editableFields, setEditableFields] = useState(false);

    const handleInputChange = (id: number, name: string, value: string) => {
      setEditData((prevData) =>
      prevData.map((user) => 
      user.id === id ? { ...user, [name]: value } : user)
    );
  };

  const deleteData = async (id: number) => {
    try {
      await axios.delete(
        `https://66fbb3218583ac93b40cca00.mockapi.io/crud/crud/${id}`
      );
      readData();
      toast.success("Successfully deleted the selected user");
    } catch (error) {
      toast.error("Failed to delete the user");
    }
  };

  const updateData = async (id: number, user: User) => {
    try {
      await axios.put(
        `https://66fbb3218583ac93b40cca00.mockapi.io/crud/crud/${id}`, user
      );
      readData();
      setEditableFields(false);
      toast.success("Successfully updated the user");
  } catch (error) {
    toast.error("Failed to update the user");
  } 
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
        {editData.map((user) => (
          <tr key={user.id} className="border">
            <td className="px-6 py-2">{user.id}</td>

            {editableFields === false ? (
              <td className="px-6 py-2">{user.firstName}</td>
            ) : (
              <input className="px-3 py-1 border rounded-md border-emerald-200 focus:outline-emerald-300"
              type="text"
              value={user.firstName}
              onChange={(e) =>
                handleInputChange(user.id, "firstName", e.target.value)
              } />
            )}

            {editableFields === false ? (
              <td className="px-6 py-2">{user.lastName}</td>
            ) : (
              <td className="px-6 py-2">
                <input className="px-3 py-1 border rounded-md border-emerald-200 focus:outline-emereald-300"
                type="text"
                value={user.lastName}
                onChange={(e) =>
                handleInputChange(user.id, "lastName", e.target.value)} />
              </td>
            )}

            {editableFields === false ? (
              <td className="px-6 py-2">{user.email}</td>
            ) : (
              <td className="px-6 py-2">
                <input className="px-3 py-1 border rounded-md border-emerald-200 focus:outline-emereald-300"
                type="email"
                value={user.email}
                onChange={(e) =>
                handleInputChange(user.id, "email", e.target.value)} />
              </td>
            )}

            {editableFields === false ? (
              <td className="px-6 py-2">{user.phoneNumber}</td>
            ) : (
              <td className="px-6 py-2">
                <input className="px-3 py-1 border rounded-md border-emerald-200 focus:outline-emereald-300"
                type="text"
                value={user.phoneNumber}
                onChange={(e) =>
                handleInputChange(user.id, "phoneNumber", e.target.value)} />
              </td>
            )}

            <td className="flex gap-2 px-6 py-2">
              {editableFields === false ? (
                <button onClick={() => setEditableFields(true)}
                className="px-3 py-1 font-bold text-white rounded-md bg-sky-500 hover:bg-sky-600">
                  Update
                </button>
              ) : (
                <button onClick={() => updateData(user.id, user)}
                className="px-3 py-1 font-bold text-white rounded-md bg-sky-500 hover:bg-sky-600">
                  Update
                </button>
              )}
              <button onClick={() => deleteData(user.id)} className="px-3 py-1 font-bold text-white bg-red-500 rounded-md hover:bg-red-600">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default ReadUpdateDeleteDate;