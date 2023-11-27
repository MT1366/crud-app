import logo from "../assets/images/default-news-image.webp";
import Modal from "./Modal";

export default function RightBar() {
  return (
    <div className="bg-bgsoft rounded-lg m-5 flex-3 h-full">
      <img src={logo} width={400} className="rounded"></img>
      <Modal />
    </div>
  );
}
