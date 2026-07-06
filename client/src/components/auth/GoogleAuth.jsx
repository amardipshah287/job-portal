import IconGoogle from "../../assets/IconGoogle.png";
import apis from "../../common/api";

export function GoogleAuth() {
  const handleGoogleLogin = () => {
    window.open(apis.googleLogin.url, "_self");
  };

  return (
    <div
      className=" flex justify-evenly rounded-md border-2 border-primary py-3 text-primary font-medium  cursor-pointer"
      onClick={handleGoogleLogin}
    >
      <img src={IconGoogle} alt="Google Icon" />
      <span>Sign up with Google</span>
    </div>
  );
}
