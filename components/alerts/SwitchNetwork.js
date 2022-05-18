import { XCircleIcon } from '@heroicons/react/solid'

export default function Switch({ switchNetwork }) {
  return (
    <div className="fixed bottom-0 right-[25px] h-[150px] w-[400px]">
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Please switch to ETH Rinkeby Testnet.</h3>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                className="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600 bg-red-100"
                onClick={switchNetwork}
              >
                Switch Network
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}