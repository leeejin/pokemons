import Image from "next/image";
import SpinnerIcon from "../../images/spinner-icon.gif";
function Lazy() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Image src={SpinnerIcon} alt="로딩중" width={100} height={100} />
    </div>
  );
}
export default Lazy;
