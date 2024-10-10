import "./KycForm.css";
import Nationality from "./components/Nationality.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function KYCForm() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    // event.preventDefault();
    try {
      //   let formData = new FormData(event.target);
      //   let response = await fetch("/submit-kyc", {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     method: "POST",
      //     body: data,
      //   });
      //   if (response.ok) {
      // } else {
      //     console.log("Error fetching");
      // }
      navigate("/confirmation"); // Redirect to confirmation page
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="container text-center">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input {...register("fullName", { required: true })} id="fullName" />
          {errors.fullName && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            {...register("dob", { required: true, valueAsDate: true })}
            id="dob"
          />
          {errors.dob && <span>This field is required</span>}
        </div>

        <Nationality />

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input {...register("address", { required: true })} id="address" />
          {errors.address && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input {...register("city", { required: true })} id="city" />
          {errors.city && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <label htmlFor="state">State / Province</label>
          <input {...register("state", { required: true })} id="state" />
          {errors.state && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input {...register("country", { required: true })} id="country" />
          {errors.country && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <label htmlFor="id-document">
            Upload Government ID (PDF or Image)
          </label>
          <input
            type="file"
            id="id-document"
            name="idDocument"
            accept=".pdf, image/*"
            {...register("file", { required: true })}
          />
          <span className="small-text">Acceptable formats: PDF, JPG, PNG</span>
          {errors.file && <span>This field is required</span>}
        </div>

        <button type="submit" className="submit-btn">
          Submit KYC
        </button>
      </form>
    </>
  );
}

function formDataToJson(formData) {
  const obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return JSON.stringify(obj);
}

export default KYCForm;
