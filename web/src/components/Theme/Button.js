export default function Button({ type, className, buttonText }) {
  return (
    <button type={type} className={className}>
      {buttonText}
    </button>
  );
}
