function MyInformation({
  id,
  name,
  email,
}: {
  id: number;
  name: string;
  email?: string;
}) {
  return (
    <div>
      <h1>{name} Information</h1>
      <p>Id: {id}</p>
      <p style={{ backgroundColor: "red" }}>Name: {name}</p>
      {email ? <p>Email: {email}</p> : "No email found"}
    </div>
  );
}

export default MyInformation;
