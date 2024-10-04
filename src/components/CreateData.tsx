import axios from "axios";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";

interface User {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

interface UserDataProps {
    userData: () => void;
}

const CreateData: React.FC<UserDataProps> = ({ userData }) => {
    const [formData, setFormData] = useState<User>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newUser = { ...formData };
            await createUser(newUser);
            setFormData({ firstName: "", lastName: "", email: "", phoneNumber: "" });
            userData();
            toast.success("Successfully created a new user");
        } catch (error) {
            console.error("Error creating user: ", error);
            toast.error("Failed to create a new user");
        }
    };

    const createUser = async (user: User) => {
        await axios.post(
            "https://66fbb3218583ac93b40cca00.mockapi.io/crud/crud", user
        );
    };

    useEffect(() => {
        userData();
    }, [userData]);

    return (
        <div className="my-4">
            <form className="grid grid-cols-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block" htmlFor="firstName">
                        Enter First Name
                    </label>
                    <input 
                        className="px-6 py-2 border border-green-200 rounded-lg focus:outline-green-300"
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                
                <div>
                <label className="block" htmlFor="lastName">
                        Enter Last Name
                    </label>
                    <input 
                        className="px-6 py-2 border border-green-200 rounded-lg focus:outline-green-300"
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div>
                <label className="block" htmlFor="email">
                        Enter Email
                    </label>
                    <input 
                        className="px-6 py-2 border border-green-200 rounded-lg focus:outline-green-300"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                <label className="block" htmlFor="lastName">
                        Enter Phone Number
                    </label>
                    <input 
                        className="px-6 py-2 border border-green-200 rounded-lg focus:outline-green-300"
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>

                <button className="col-start-2 col-end-4 px-6 py-2 m-5 font-bold text-white uppercase bg-green-500 rounded-lg col-span-full hover:bg-green-600"
                type="submit">
                    Create User
                </button>
            </form>
        </div>
    );
};

export default CreateData;