import clsx from "clsx";

export default function FormSubmitBtn({ className }: { className?: string }) {
  return (
    <input
      className={clsx(
        "transition ease-in-out delay-150 duration-300 hover:scale-110 mx-auto w-32 px-2 py-1 rounded-lg bg-blue-700 font-semibold hover:bg-blue-800",
        className
      )}
      type="submit"
    />
  );
}
