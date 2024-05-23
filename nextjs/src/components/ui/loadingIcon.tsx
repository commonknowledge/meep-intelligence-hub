import { Oval } from "react-loader-spinner";

export function LoadingIcon({
  className,
  size = "80",
}: {
  size?: string;
  className?: string;
}) {
  return (
    <div className={className}>
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
    </div>
  );
}
