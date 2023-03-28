import { Fragment, useRef, useState } from "react";
import { FormWrapper } from "./FormWrapper";

import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type TermsAndConditionFormDetails = {
  hasAgreedTermsCondition: boolean;
};

type TermsAndConditionFormProps = TermsAndConditionFormDetails & {
  updateData: (updatedFields: Partial<TermsAndConditionFormDetails>) => void;
};

export default function TermsAndConditionForm({
  hasAgreedTermsCondition,
  updateData,
}: TermsAndConditionFormProps) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  return (
    <FormWrapper title="Step 2 - Terms and Conditions">
      <div className="text-center row-span-3">
        <div>
          <input type="checkbox" />
          <label>I agree to the terms and conditions</label>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              setOpen(true);
            }}
          >
            View Terms and Condition
          </button>
        </div>
      </div>

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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Terms and Conditions
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Proin quis lacus vulputate, interdum elit eu,
                            ultrices sapien. Praesent iaculis ornare elementum.
                            Pellentesque nisi orci, finibus ut diam eget, dictum
                            vehicula nulla. Nullam at congue velit. Vivamus ac
                            lacus pulvinar, ornare erat et, porta nibh.
                            Suspendisse eget lorem in metus tristique tempus in
                            ac odio. Proin eget pharetra nisl. Fusce vel auctor
                            quam. Phasellus ut dui ut lorem consectetur dictum.
                            Donec eget tellus quis eros porttitor ultrices non
                            quis nisi. Phasellus sit amet tortor mattis,
                            fermentum ex eget, luctus erat. Fusce imperdiet
                            neque at risus laoreet, vitae porttitor sapien
                            iaculis. Ut sed volutpat lorem, eget ullamcorper
                            nisi. Pellentesque non ullamcorper augue. Morbi vel
                            egestas orci. Mauris tempor nisl nec neque aliquam,
                            ac ullamcorper lorem molestie. Ut urna est, varius
                            sed vehicula ac, auctor at odio. Ut magna metus,
                            posuere eget bibendum ut, fringilla eu enim. Nulla
                            facilisis cursus sagittis. Praesent vestibulum neque
                            eget pharetra facilisis. Suspendisse auctor
                            tincidunt condimentum. Mauris sagittis facilisis
                            egestas. Integer euismod mauris libero, quis
                            tincidunt arcu eleifend quis. Aliquam eu eros at
                            nulla malesuada venenatis. Vestibulum non nisl
                            pellentesque, porta ligula vel, molestie metus.
                            Curabitur eu justo eleifend ante porta cursus
                            lobortis ut augue. Nullam ac diam sit amet ligula
                            aliquam pellentesque posuere sed erat. Ut convallis
                            quam risus, in aliquam neque hendrerit eu. Ut
                            vestibulum, urna a blandit rutrum, libero ante
                            euismod lacus, et posuere metus leo sit amet diam.
                            Pellentesque habitant morbi tristique senectus et
                            netus et malesuada fames ac turpis egestas. In
                            dictum non leo in fringilla. Praesent tristique eu
                            quam vitae aliquam. Nullam sit amet volutpat metus.
                            Aliquam ac ex scelerisque, commodo lacus in,
                            dignissim mauris. Fusce laoreet sagittis leo, sit
                            amet molestie lorem scelerisque sed. Aliquam nec
                            eleifend lectus, at consectetur nulla. Nam luctus,
                            sem at faucibus scelerisque, tellus magna pretium
                            lorem, id molestie lectus quam non urna. Duis
                            elementum leo non ipsum tincidunt, at vestibulum
                            augue feugiat. In vestibulum ex sed tempor euismod.
                            Fusce eget neque imperdiet, eleifend nunc porttitor,
                            varius lectus. Cras accumsan, mi vel luctus
                            pellentesque, ligula tortor consectetur justo, vel
                            convallis tellus sem nec velit. Phasellus semper
                            iaculis lectus at efficitur. Aliquam dictum at mi
                            nec tristique. Curabitur porta, leo a accumsan
                            interdum, diam ex pellentesque ligula, gravida
                            imperdiet nunc magna quis nibh. Fusce dapibus
                            tincidunt sodales. Sed eget lectus eget orci
                            suscipit suscipit eget at orci. Suspendisse sodales
                            pharetra rutrum. Aenean semper orci eu est
                            condimentum facilisis. In hac habitasse platea
                            dictumst. Vestibulum et posuere ante.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
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
    </FormWrapper>
  );
}
