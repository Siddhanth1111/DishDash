import { useUser } from "@clerk/clerk-react";

const Profile = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>You are not signed in</div>;

  return (
    <div className="p-4">
      <h2>Welcome, {user.fullName}</h2>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
      <p>Phone: {user.phoneNumbers[0]?.phoneNumber || "Not provided"}</p>
    </div>
  );
};

export default Profile;