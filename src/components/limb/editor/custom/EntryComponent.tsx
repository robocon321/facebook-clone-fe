import { MentionData, MentionPluginTheme } from "@draft-js-plugins/mention";
import Image from "next/image";
import { MouseEvent, ReactElement } from "react";

export interface EntryComponentProps {
  className?: string;
  onMouseDown(event: MouseEvent): void;
  onMouseUp(event: MouseEvent): void;
  onMouseEnter(event: MouseEvent): void;
  role: string;
  id: string;
  "aria-selected"?: boolean | "false" | "true";
  theme?: MentionPluginTheme;
  mention: MentionData;
  isFocused: boolean;
  searchValue?: string;
}

function Entry(props: Readonly<EntryComponentProps>): ReactElement {
  const { mention, theme, searchValue, isFocused, ...parentProps } = props;

  return (
    <li
      {...parentProps}
      className="flex items-center p-2 hover:bg-gray-200 rounded"
    >
      <span className="mr-2 w-[20px] h-[20px]">
        <Image
          className="w-full h-full rounded-full"
          src="https://random.imagecdn.app/500/400"
          alt="Not found"
        />
      </span>
      <span>{mention.name}</span>
    </li>
  );
}

export default Entry;
