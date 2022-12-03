import { useSession } from "next-auth/react";

type Props = {
  seed?: string;
  large?: boolean;
};

function Avatar({ seed, large }: Props) {
  const { data: session } = useSession();
  return (
    <div
      className={`relative h-10 w-10 overflow-hidden rounded-full border border-gray-300 bg-white ${
        large && "h-20 w-20"
      } `}>
      <img
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed ?? session?.user.name
        }.svg`}
      />
    </div>
  );
}

export default Avatar;
