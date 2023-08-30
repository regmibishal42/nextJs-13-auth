
const UserProfile = ({params}:any) => {
  return (
    <div className="flex flex-col items-center justify-center">
        <h1>User Profile</h1>
        <hr />
            <p>Profile Of User {params.userID}</p>
    </div>
  )
}

export default UserProfile
