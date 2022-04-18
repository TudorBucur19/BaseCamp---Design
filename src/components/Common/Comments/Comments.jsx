import React, { useContext } from 'react';

import { CampgroundsContext } from 'contexts/CampgroundsContext';
import CommentItem from 'components/Common/Comments/CommentItem';

const Comments = ({comments, id}) => {
    const { handleCommentsUpdate } = useContext(CampgroundsContext);

    return ( 
        <>
            {comments.map((comment, index) => 
                <CommentItem 
                key={index}
                comment={comment}
                removeComment={handleCommentsUpdate}
                campgroundID = {id}
                />
            )}
        </>
     );
}
 
export default Comments;