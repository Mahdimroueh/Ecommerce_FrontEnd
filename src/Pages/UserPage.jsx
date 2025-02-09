import { customFetch } from "../api/AxiosFetch";

const UserPage = () => {
  const test = async () => {
    try {
      const response = await customFetch.get("/user/test");
      console.log(response)
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  const handleClicked = () => {
    console.log(test());
  };

  return (
    <div>
      <button onClick={handleClicked} className="btn btn-primary btn-outline">
        test
      </button>
    </div>
  );
};

export default UserPage;
