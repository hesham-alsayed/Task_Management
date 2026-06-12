import ExclamationIcon from "../icons/ExclamationIcon";

type Props = {
  message?: string;
  mobile?: boolean;
  isSubmitted: boolean;
};

export default function FormFieldError({
  message,
  mobile = false,
  isSubmitted,
}: Props) {
  if (!message) return null;

  if (mobile && isSubmitted) {
    return (
      <span className="sm:hidden bg-gray-300 flex mt-2 items-center gap-2 text-[#43465499] font-medium text-[10px]">
        {message}
      </span>
    );
  }

  if(isSubmitted) {
    return (
      <span className="hidden sm:flex items-center justify-end gap-2 text-[#BA1A1A] font-medium text-[12px]">
      <ExclamationIcon />
      {message}
    </span>
    )
  }
}
