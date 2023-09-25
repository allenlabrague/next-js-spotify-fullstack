"use client";

import { AiOutlineQuestion } from "react-icons/ai";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

const DialogInstruction = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition cursor-pointer">
          <AiOutlineQuestion className="text-black" size={15} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
        <Dialog.Content className="fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px] focus:outline-none">
          <Dialog.Title className="text-xl text-center font-bold mb-4">
            Welcome to Spotify Clone!
          </Dialog.Title>
          <Dialog.Description className="mb-5 text-sm leading-normal text-center">
            Created by: <span className="font-semibold">Allen</span>
          </Dialog.Description>
          <ul className="flex flex-col items-start gap-y-2 md:gap-y-5 list-disc list-inside text-sm md:text-base">
            <li>
              To play songs, you first need to create an account. You can use
              your Spotify or Facebook credentials to continue, or even use a
              dummy email for testing purposes on Spotify Clone.
            </li>
            <li>
              You can upload your favorite music by simply clicking the plus
              icon. When uploading music, please make sure to provide all the
              required information. I recommend filling out all fields, using
              the correct image and song, and don't forget to enter your name or
              username in the Creator field. This way, you will own the song,
              and your name will be displayed in the lyrics below.
            </li>
            <li>
              To edit your profile and name, click the icon on the right side,
              and once you're there, click "Edit Profile." Please note that you
              can only edit it once as we are still developing the profile and
              adding some features. Make sure your information is correct.
            </li>
            <li>
              To add a new liked song, click the heart icon. Once you've clicked
              it, you can go to "Liked Songs" and see all the songs you've
              liked.
            </li>
            <li>
              You can also search for your favorite songs by clicking the search
              icon on the left.
            </li>
            <li>Last but not least, you can listen for free without ads.</li>
          </ul>
          <Dialog.Close asChild>
            <button className="text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none cursor-pointer">
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogInstruction;
