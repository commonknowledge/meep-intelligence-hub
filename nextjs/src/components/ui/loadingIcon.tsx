import { Oval } from "react-loader-spinner";

export function LoadingIcon({ size = "80" }: { size?: string }) {
  return (
    <Oval
      visible={true}
      height={size.toString()}
      width={size.toString()}
      color="white"
      secondaryColor="#111"
      strokeWidth={10}
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
