import { Oval } from "react-loader-spinner";

export function LoadingIcon() {
  return (
    <Oval
      visible={true}
      height="60"
      width="60"
      color="white"
      secondaryColor="#111"
      strokeWidth={10}
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
