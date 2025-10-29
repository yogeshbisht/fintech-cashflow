import RegisterForm from "./components/register-form";

const RegisterPage = () => {
  return (
    <div className="relative z-0 flex flex-col px-8 py-4 wrap-break-word bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="text-center border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 mb-2">
        <h5>Create a New Account</h5>
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
