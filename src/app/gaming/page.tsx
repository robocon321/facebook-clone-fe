"use client"

import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import { EditorState } from 'draft-js';
import React, { useMemo, useRef, useState } from 'react';


const MarketplacePage: React.FC = () => {
  const text = `Cool, we can have all sorts of Emojis here. 🙌
  🌿☃️🎉🙈 aaaand maybe a few more here 🐲☀️🗻 Quite fun!`;
  
  const [editorState, setEditorState] = useState<EditorState>(createEditorStateWithText(text));
  const editorRef = useRef<Editor>(null);

  const { EmojiSelect, plugins } = useMemo(() => {
    const emojiPlugin = createEmojiPlugin();
    // eslint-disable-next-line no-shadow
    const { EmojiSelect } = emojiPlugin;
    // eslint-disable-next-line no-shadow
    const plugins = [emojiPlugin];
    return { plugins, EmojiSelect };
  }, []);


  const focus = () => {
    editorRef.current?.focus();
  };

  const onChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <div onClick={() => focus()}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          ref={editorRef}
        />
      </div>
      <EmojiSelect />
    </div>
  );
};

export default MarketplacePage;
