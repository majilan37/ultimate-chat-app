import { Dialog, Transition } from "@headlessui/react";
import { Button, Input } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { useAddChatMutation } from "../generated/graphql";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const { data: session } = useSession();

  // * Apollo hooks
  const [addChat, { loading, data }] = useAddChatMutation({});

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Button type="button" onClick={openModal} color="green" fullWidth>
        Add chat
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await addChat({
                  variables: {
                    users: [session?.user.email as string, value],
                  },
                });

                closeModal();
              }}
              className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-5 text-lg font-medium leading-6 text-gray-900">
                    Enter the email of who <br /> you want to chat with
                  </Dialog.Title>
                  <div className="mt-2">
                    <Input
                      variant="outlined"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      label="Email"
                      type="email"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                      {loading ? "Loading..." : "Add chat"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </form>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
