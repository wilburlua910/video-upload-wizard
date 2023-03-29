import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import ProgressBar from "./ProgressBar";
import { useProgress } from "../Hooks/useProgress";

type TermsAndConditionFormDetails = {
  hasAgreedTermsCondition: boolean;
  progress: number;
  totalByteSent: number;
};

type TermsAndConditionFormProps = TermsAndConditionFormDetails & {
  progress: number;
  totalByteSent: number;
  isUploadSuccess: boolean;
  isError: boolean;
  updateData: (updatedFields: Partial<TermsAndConditionFormDetails>) => void;
};

export default function TermsAndConditionForm({
  progress,
  isError,
  isUploadSuccess,
  totalByteSent,
  updateData,
}: TermsAndConditionFormProps) {
  const [open, setOpen] = useState(false);
  const onCheckBoxClicked = (e: any) => {
    updateData({
      hasAgreedTermsCondition: e.target.checked,
    });
  };

  const cancelButtonRef = useRef(null);
  return (
    <div className="flex flex-col flex-grow items-center">
      <p className="font-mono text-gray-900 text-2xl font-bold mt-10mb-5 text-center">
        Please view our terms & condition before submission
      </p>
      <div className="text-center row-span-3 flex flex-row mt-10 items-center">
        <input
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-5"
          id="cb-terms"
          type="checkbox"
          onChange={onCheckBoxClicked}
        />
        <p className="text-md text-gray-900 font-medium mr-1">
          I agree with the
        </p>

        <p className="text-md text-gray-900 font-bold">Terms and Conditions</p>
      </div>

      <button
        className="bg-blue-500 mt-10 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-12 w-1/3"
        type="button"
        onClick={() => {
          setOpen(true);
        }}
      >
        View Terms and Condition
      </button>

      <ProgressBar
        isUploadComplete={false}
        percentComplete={progress}
      ></ProgressBar>

      {isUploadSuccess ? (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <span className="font-medium">Successfully uploaded file! </span>
          Redirecting you back to home!
        </div>
      ) : (
        <></>
      )}
      {isError ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">Upload Fail</span> Please try submitting
          again!
        </div>
      ) : (
        <></>
      )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white sm:mx-0 sm:h-10 sm:w-10">
                        <InformationCircleIcon
                          className="h-10 w-10 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-bold text-xl leading-6 text-gray-900"
                        >
                          Terms and Conditions
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-md text-gray-500">
                            1. Ownership of Content: By uploading a video to our
                            web application, you affirm that you are the owner
                            of the content or have obtained the necessary
                            permissions to use and distribute the content.
                          </p>

                          <p className="text-sm text-gray-500">
                            2. Prohibited Content: You may not upload content
                            that is illegal, defamatory, discriminatory,
                            pornographic, or infringes upon the intellectual
                            property rights of others. We reserve the right to
                            remove any content that we deem inappropriate or
                            violates our terms and conditions.
                          </p>

                          <p className="text-sm text-gray-500">
                            License Grant: By uploading a video, you grant us a
                            non-exclusive, transferable, sub-licensable,
                            royalty-free, worldwide license to use, reproduce,
                            distribute, and display the video for the purposes
                            of operating and promoting our web application.
                          </p>

                          <p className="text-sm text-gray-500">
                            Copyright Infringement: We take copyright
                            infringement seriously and will remove any content
                            that infringes upon the intellectual property rights
                            of others. If you believe that your copyright has
                            been infringed upon by a video uploaded to our web
                            application, please notify us immediately.
                          </p>

                          <p className="text-sm text-gray-500"></p>

                          <p className="text-sm text-gray-500"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse justify-apart sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-100 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Okay
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setOpen(false);
                      }}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
