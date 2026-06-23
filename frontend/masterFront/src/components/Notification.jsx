export default function Notification({ type, message, onClose }) {
  return (
    <div className={`notification ${type}`}>
      <div>{message}</div>
      <button className="close-notification" onClick={onClose}>
        ×
      </button>
    </div>
  );
}
