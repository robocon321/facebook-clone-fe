"use client"

import Editor, { EditorPlugin } from '@draft-js-plugins/editor';
import createMentionPlugin, {
  MentionData
} from '@draft-js-plugins/mention';
import '@draft-js-plugins/mention/lib/plugin.css';
import { EditorState } from 'draft-js';
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react';
import Entry from './custom/EntryComponent';

type MentionEditorProps = {
  className: string,
  placeholder?: string,  
  suggestions: MentionData[],
  onSearch: (value: string) => void,
  editorState: EditorState,
  setEditorState: Dispatch<SetStateAction<EditorState>>,
  otherPlugins?: EditorPlugin[]
}

export default function SimpleMentionEditor(props: MentionEditorProps): ReactElement {
  const ref = useRef<Editor>(null);
  const [open, setOpen] = useState(false);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      mentionComponent(mentionProps) {
        return (
          <span
            className={mentionProps.className}
            onClick={() => alert('Clicked on the Mention!')}
          >
            {mentionProps.children}
          </span>
        );
      },
    });
    const { MentionSuggestions } = mentionPlugin;
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }: { value: string }) => {
    // setSuggestions(defaultSuggestionsFilter(value, mentions));
    props.onSearch(value);
  }, []);

  return (
    <div
      className={props.className}
      onClick={() => {
        ref.current!.focus();
      }}
    >
      <Editor
        editorState={props.editorState}
        onChange={props.setEditorState}
        plugins={props.otherPlugins ? [...plugins, ...props.otherPlugins] : [...plugins]}
        placeholder={props.placeholder}
        ref={ref}
      />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={props.suggestions}
        onSearchChange={onSearchChange}
        onAddMention={() => {
          // get the mention object selected
        }}
        entryComponent={Entry}
      />      
    </div>
  );
}
