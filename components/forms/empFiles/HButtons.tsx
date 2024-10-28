import EmpPopup from '@/components/forms/empFiles/Popup/EmpPopup'

function HButtons() {

  return (
    <div className="flex flex-1 gap-3">
      <button
        type="button"
        className="px-3 py-0.5 text-subtle-medium inline-flex items-center text-white bg-green-1 rounded-md hover:bg-green-2 transition-colors duration-300 ease-in-out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="100 -960 960 960" width="16px" fill="#FFFFFF">
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
        Create
      </button>

      {/* <button
        type="button"
        className="px-3 py-0.5 text-subtle-medium inline-flex items-center text-white bg-blue-1 rounded-md hover:bg-blue transition-colors duration-300 ease-in-out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="100 -960 960 960" width="16px" fill="#FFFFFF">
          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
        </svg>
        Edit
      </button>

      <button
        type="button"
        className="px-2 py-0.5 text-subtle-medium inline-flex items-center text-white bg-red-1 rounded-md hover:bg-red-2 transition-colors duration-300 ease-in-out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="100 -960 960 960" width="16px" fill="#FFFFFF">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
        Delete
      </button> */}

      {/* Search Button */}
      <EmpPopup />
    </div>
  );
}

export default HButtons;
