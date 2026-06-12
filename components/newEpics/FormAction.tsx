import Loader from "../shared/Loader";

type Props = {
  loading: boolean;
  onCancel: () => void;
};

export default function FormActions({ loading, onCancel }: Props) {
  return (
    <div className="flex max-sm:flex-col-reverse sm:flex-row sm:justify-end gap-8 mt-8">
      <button
        type="button"
        onClick={onCancel}
        className="text-sm font-semibold hover:cursor-pointer text-[#4F5F7B]"
      >
        Cancel
      </button>

      <div className="sm:w-40 ">
        <button
          disabled={loading}
          type="submit"
          className="btn-primary px-8 rounded-sm w-full "
        >
          {loading ? <Loader /> : "Create Epic"}
        </button>
      </div>
    </div>
  );
}
