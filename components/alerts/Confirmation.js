import { CheckCircleIcon } from "@heroicons/react/solid";

export default function Confirmation({ etherscanLink, dismiss }) {
  return (
    <div className="fixed bottom-0 right-[25px] h-[150px] w-[400px]">
      <div className="rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircleIcon
              className="h-5 w-5 text-black"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-black">
              Mint Completed, view link below on Etherscan
            </h3>
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <a
                  type="button"
                  className="bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-black hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                  href={etherscanLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Etherscan
                </a>
                <button
                  type="button"
                  className="ml-3 bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-black hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                  onClick={dismiss}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
