import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

const createMentionEntities = ( editorState: EditorState, tag: { id: number, name: string, avatar: string } ) =>
{
  const rawContent = convertToRaw( editorState.getCurrentContent() );
  let rawState: any = {};
  rawState[ 0 ] = {
    type: 'mention',
    mutability: 'IMMUTABLE',
    data: {
      id: tag.id,
      name: tag.name,
      avatar: tag.avatar
    }
  }

  rawContent.entityMap = rawState;

  rawContent.blocks = rawContent.blocks.map( block =>
  {
    const entityRanges = [ {
      key: 0,
      length: tag.name.length,
      offset: 0
    } ];
    block.entityRanges = entityRanges;
    block.text = tag.name;
    return block;
  } );

  return convertFromRaw( rawContent );
};


export default createMentionEntities;