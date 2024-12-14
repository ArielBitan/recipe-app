import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navbar } from "@/components/Navbar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center  mt-20 h-96 ">
        <h1 className="text-3xl mb-4">My Profile</h1>
        <div className="flex flex-col gap-6 p-6 bg-secondary w-96 h-96 rounded-xl">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="font-secondary">
            <h2 className="font-bold text-xl mb-4">My basic info : </h2>
            <div>Username: User</div>
            <h4>Email : email123@email.com</h4>
            <h4>First Name : Name</h4>
            <h4>Last Name : Last</h4>
            <h4>Birth Date : 15/03/15</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
