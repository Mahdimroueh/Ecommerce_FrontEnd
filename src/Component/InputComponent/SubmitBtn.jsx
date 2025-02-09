import { useNavigate } from "react-router-dom";

const SubmitBtn = ({ text }) => {
  const navigation = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button className="btn btn-primary btn-block" disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner">sending...</span>
        </>
      ) : (
        text || "submit"
      )}
    </button>
  );
};

export default SubmitBtn;
