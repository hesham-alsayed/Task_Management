import LinkIcon from "@/components/icons/LinkIcon";

interface Props {
  onClose: () => void;
}

export default function TaskFooter({ onClose }: Props) {
  return (
    <div className="bg-[#F1F3FF] py-4 mt-auto px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LinkIcon />
        <span className="text-sm text-[#434654] font-medium">
          Copy Link
        </span>
      </div>

      <button
        onClick={onClose}
        className="bg-[#D7E2FF] hover:cursor-pointer text-main px-4 py-2 rounded-md"
      >
        Close
      </button>
    </div>
  );
}