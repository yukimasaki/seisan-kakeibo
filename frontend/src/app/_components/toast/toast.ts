import Swal, { SweetAlertOptions } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type ToastType = "error" | "info" | "question" | "success" | "warning";

export const showToast = ({
  message,
  type,
  timerProgressBar = false,
  timer,
}: {
  message: string;
  type: ToastType;
  timerProgressBar?: boolean;
  timer?: number;
}) => {
  const MySwal = withReactContent(Swal);

  const swalTypeOptions: SweetAlertOptions = (() => {
    switch (type) {
      case "error":
        return {
          icon: type,
          customClass: {
            popup: "!bg-red-400",
            container: "!w-full",
            closeButton: "!text-white",
            icon: "!min-w-6 !max-h-6 !max-w-6",
          },
        };
      case "info":
        return {
          icon: type,
          customClass: {
            popup: "!bg-blue-400",
            container: "!w-full",
            closeButton: "!text-white",
            icon: "!min-w-6 !max-h-6 !max-w-6",
          },
        };
      case "question":
        return {
          icon: type,
          customClass: {
            popup: "!bg-orange-400",
            container: "!w-full",
            closeButton: "!text-white",
            icon: "!min-w-6 !max-h-6 !max-w-6",
          },
        };
      case "success":
        return {
          icon: type,
          customClass: {
            popup: "!bg-green-400",
            container: "!w-full",
            closeButton: "!text-white",
            icon: "!min-w-6 !max-h-6 !max-w-6",
          },
        };
      case "warning":
        return {
          icon: type,
          customClass: {
            popup: "!bg-yellow-400",
            container: "!w-full",
            closeButton: "!text-white",
            icon: "!min-w-6 !max-h-6 !max-w-6",
          },
        };
    }
  })();

  const swalBaseOptions: SweetAlertOptions = {
    toast: true,
    position: "bottom",
    iconColor: "white",
    color: "white",
    showConfirmButton: false,
    showCloseButton: true,
    text: message,
    timerProgressBar,
    timer,
  };

  const swalOptions: SweetAlertOptions = Object.assign(
    swalBaseOptions,
    swalTypeOptions
  );

  return MySwal.fire(swalOptions);
};
