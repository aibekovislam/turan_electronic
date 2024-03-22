import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function notify(msg: any) {
	return toast.success(msg, {
		position: "top-center",
		autoClose: 2500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
}

export function notifyError(msg: string) {
	return toast.error(msg, {
		position: "top-center",
		autoClose: 2500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
		transition: Bounce,
	});
}

function Toastify() {
	return (
		<ToastContainer
			position="top-center"
			autoClose={2000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="light"
		/>
	);
}

export default Toastify;