import EmpPopup from '@/components/forms/empFiles/Popup/EmpPopup';

interface HButtonsProps {
  onCreate?: () => void;
}

function HButtons({ onCreate }: HButtonsProps) {
  return (
    <div className="flex flex-1 gap-3">
      <button
        type="button"
        onClick={() => {
          if (onCreate) {
            try {
              onCreate();
            } catch (error) {
              console.error("Error during onCreate:", error);
            }
          } else {
            console.warn("onCreate function is not provided.");
          }
        }}
        className="px-3 py-0.5 text-subtle-medium inline-flex items-center text-white bg-green-1 rounded-md hover:bg-green-2 transition-colors duration-300 ease-in-out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="100 -960 960 960" width="16px" fill="#FFFFFF">
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
        Create
      </button>

      {/* Search Button */}
      <EmpPopup />
    </div>
  );
}

export default HButtons;
