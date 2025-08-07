function MyInformation({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email?: string;
}) {
  return (
    <div className="p-2">
      <h1>{name} </h1>
      <p>Id: {id}</p>
      <p>Name: {name}</p>
      {email ? <p>Email: {email}</p> : "No email found"}
    </div>
  );
}

export default MyInformation;
